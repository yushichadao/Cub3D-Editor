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
const { protocol } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
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

/** 诊断：落盘日志（stderr/stdout 重定向会丢缓冲，这里直接写文件确保完整） */
function diagLog(msg) {
  try {
    const line = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFileSync(path.join(os.tmpdir(), 'cub3d-app-proto.log'), line, 'utf8');
  } catch (_) {}
}

/** app ready 之后调用，挂载实际的文件处理器 */
function handle() {
  const R = roots();

  protocol.handle(SCHEME, async (request) => {
    diagLog('请求 ' + request.url);
    try {
      return await handleOne(request, R);
    } catch (err) {
      diagLog('HANDLER 异常 ' + request.url + ' :: ' + (err && err.stack || err));
      return new Response('Internal error', { status: 500 });
    }
  });
}

async function handleOne(request, R) {
    let url;
    try { url = new URL(request.url); } catch (_) { return notFound('Bad URL'); }

    const host = url.hostname || 'local';
    const root = R[host];
    if (!root) return notFound('Unknown host: ' + host);

    // 去掉查询串与锚点，解码中文路径（docs 下全是中文文件名）
    let rel = decodeURIComponent(url.pathname || '/');
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

    const ext = path.extname(file).toLowerCase();
    // 直接用 fs 读文件（Electron 的 fs 原生支持 asar 内路径）。
    // 不采用 net.fetch(file://) + 拷贝上游 headers：net.fetch 对含非 ASCII
    // 路径/header 的文件会抛出 `Cannot convert argument to a ByteString`，
    // 且该异常发生在 try 之外，会导致所有 app:// 资源请求失败（页面只加载
    // HTML、内部脚本全部 404）。这里自行构造 headers，完全规避。
    let body;
    try {
      body = fs.readFileSync(file);
    } catch (err) {
      // 文件读取失败（asar 路径异常 / 权限等问题）时给出明确错误，避免请求静默挂起
      console.error('[app://] 读取失败:', file, err && err.message);
      return new Response('Failed to load resource: ' + rel + '\n' + (err && err.message || ''), {
        status: 500,
        headers: { 'content-type': 'text/plain; charset=utf-8' }
      });
    }
    const headers = new Headers();
    headers.set('content-type', MIME[ext] || 'application/octet-stream');
    headers.set('cache-control', 'no-cache');
    try {
      return new Response(body, { status: 200, headers });
    } catch (err) {
      diagLog('响应构造失败 ' + rel + ' :: ' + (err && err.stack || err));
      return new Response('Internal error: ' + rel, { status: 500 });
    }
}

const INDEX_URL = SCHEME + '://local/index.html';

module.exports = { registerScheme, handle, SCHEME, INDEX_URL };
