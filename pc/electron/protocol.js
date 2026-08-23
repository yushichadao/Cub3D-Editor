'use strict';
/**
 * 自定义 app:// 协议。
 *
 * 为什么不用 file://：
 *   - 说明书面板通过 fetch('docs/xxx.md') 读文档，file:// 下会被 CORS 拦截；
 *   - importmap 与 ES Module 在 file:// 下同样受限；
 *   - localStorage / IndexedDB 在 file:// 下不稳定。
 * 为什么不起本地 HTTP 服务：
 *   - 会占端口、可能被防火墙拦截、也不算真正的「离线自包含」。
 *
 * 路由：
 *   app://local/...     -> 应用只读资源（index.html / three / language / docs / shell）
 *   app://userdata/...  -> 用户可写目录（语言包附带的说明书、插件的静态资源）
 */
const { protocol, net } = require('electron');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const P = require('./paths');

const SCHEME = 'app';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.wasm': 'application/wasm'
};

/** 必须在 app ready 之前调用，赋予 app:// 与 https 同等的能力 */
function registerScheme() {
  protocol.registerSchemesAsPrivileged([{
    scheme: SCHEME,
    privileges: {
      standard: true,       // 拥有正常的 origin，localStorage 可用
      secure: true,         // 视为安全上下文，WebGL / Worker / Clipboard 正常
      supportFetchAPI: true,// 说明书面板的 fetch 可用
      stream: true,
      codeCache: true,
      bypassCSP: false
    }
  }]);
}

function roots() {
  return {
    local: P.webRoot,
    userdata: P.dataRoot
  };
}

function notFound(msg) {
  return new Response(msg || 'Not Found', { status: 404, headers: { 'content-type': 'text/plain; charset=utf-8' } });
}

function asciiHeaders(ext, extra) {
  const headers = new Headers();
  headers.set('content-type', MIME[ext] || 'application/octet-stream');
  headers.set('cache-control', 'no-cache');
  if (extra) {
    for (const k of Object.keys(extra)) headers.set(k, extra[k]);
  }
  return headers;
}

/**
 * 把 Node Buffer 交给 Chromium 自定义协议。
 * 直接 `new Response(Buffer)` 在 Electron 43 下常收不到结束信号，
 * 导航会卡约 30 秒。Uint8Array + Content-Length 才能立刻结束。
 */
function bufferResponse(buf, ext) {
  // 拷到独立 ArrayBuffer：Node Buffer 底层存储 Chromium 认不全，会等到超时才结束。
  const copy = Uint8Array.from(buf);
  return new Response(copy, {
    status: 200,
    headers: asciiHeaders(ext, { 'content-length': String(copy.byteLength) })
  });
}

/**
 * 优先用 net.fetch(file://) 的原生流（带结束信号，不会卡 30 秒）。
 * 不拷贝上游 headers：非 ASCII 文件名会触发 ByteString 异常。
 * asar / 中文路径失败时再读盘回退。
 */
async function serveFile(file, ext) {
  try {
    const res = await net.fetch(pathToFileURL(file).toString(), {
      bypassCustomProtocolHandlers: true
    });
    if (res && res.body) {
      return new Response(res.body, { status: 200, headers: asciiHeaders(ext) });
    }
  } catch (_) {}
  try {
    return bufferResponse(fs.readFileSync(file), ext);
  } catch (err) {
    console.error('[app://] 读取失败:', file, err && err.message);
    return new Response('Failed to load resource\n' + (err && err.message || ''), {
      status: 500,
      headers: { 'content-type': 'text/plain; charset=utf-8' }
    });
  }
}

/** app ready 之后调用，挂载实际的文件处理器 */
function handle() {
  const R = roots();

  protocol.handle(SCHEME, async (request) => {
    try {
      return await handleOne(request, R);
    } catch (err) {
      console.error('[app://] handler', request.url, err && err.stack || err);
      return new Response('Internal error', { status: 500 });
    }
  });
}

// ASCII 校验：资源请求路径若含非 ASCII 字符，Chromium 的 ByteString 会静默失败并卡加载页。
// 工程已统一 ASCII 路径（见 paths.js 的 Cub3DEditor / .runtime），此处显式拦截并给出可读错误。
function assertAscii(rel) {
  // 允许 % 编码（后续 decodeURIComponent 已解开）；仅检测解码后的非 ASCII 字符
  for (let i = 0; i < rel.length; i++) {
    const c = rel.charCodeAt(i);
    if (c > 127) return rel[i];
  }
  return null;
}

async function handleOne(request, R) {
  const t0 = Date.now();
  let url;
  try { url = new URL(request.url); } catch (_) { return notFound('Bad URL'); }

  const host = url.hostname || 'local';
  const root = R[host];
  if (!root) return notFound('Unknown host: ' + host);

  // 去掉查询串与锚点，解码中文路径（docs 下全是中文文件名）
  let rel;
  try {
    rel = decodeURIComponent(url.pathname || '/');
  } catch (_) {
    return new Response('Bad path encoding: ' + url.pathname, { status: 400, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }
  // ASCII 校验中间件（F）：非 ASCII 资源路径显式报错，不静默卡加载页
  const bad = assertAscii(rel);
  if (bad) {
    const msg = '[app://] 非 ASCII 资源路径被拦截: ' + rel + ' (非法字符: ' + bad + ')\n' +
      '工程资源路径必须全 ASCII（见 docs/STANDARDS.md）。请检查资源命名或路径拼接。';
    console.error(msg);
    return new Response(msg, { status: 400, headers: { 'content-type': 'text/plain; charset=utf-8' } });
  }
  if (rel === '/' || rel === '') rel = '/index.html';
  // 归一化，杜绝 ../ 穿越
  const target = path.join(root, path.normalize(rel).replace(/^([/\\])+/, ''));
  const resolvedRoot = path.resolve(root);
  if (path.resolve(target) !== resolvedRoot && !path.resolve(target).startsWith(resolvedRoot + path.sep)) {
    return new Response('Forbidden', { status: 403 });
  }

  let stat;
  try { stat = fs.statSync(target); } catch (_) { return notFound('Not Found: ' + rel); }

  let file = target;
  if (stat.isDirectory()) {
    file = path.join(target, 'index.html');
    if (!fs.existsSync(file)) return notFound('Directory listing disabled');
  }

  const res = await serveFile(file, path.extname(file).toLowerCase());
  const cost = Date.now() - t0;
  if (cost > 500) console.warn('[app://] slow request', cost + 'ms', rel);
  return res;
}

const INDEX_URL = SCHEME + '://local/index.html';

module.exports = { registerScheme, handle, SCHEME, INDEX_URL };
