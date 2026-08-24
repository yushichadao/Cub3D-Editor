// Cub3D Editor 管理后台服务
// 三大子系统接口（全部挂在 /admin 子路径下，nginx 部署前缀为 /admin）：
//   1) 后台门户      /admin/api/portal   → 登录 / 鉴权校验 / 改密
//   2) 发布更新信息  /admin/api/release  → 版本发布 / 状态 / 删除 / 安装包上传下载 + 公开更新探测
//   3) 打包分发      /admin/api/packer   → 本地打包 / 在线分发 / 版本号 / 登记
// 客户端（PC / Android / Web）更新探测统一走 /admin/api/release/update，安装包走 /admin/downloads/
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerPortalRouter } from './portalRouter.mjs';
import { registerReleaseRouter } from './releaseRouter.mjs';
import { registerPackerRouter } from './packerRouter.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(__dirname, 'public');
const DOWNLOADS_DIR = path.join(ROOT, 'downloads');
const GITHUB_DIR = path.join(ROOT, 'github-releases');
const UPDATE_DOC = path.join(DOWNLOADS_DIR, 'update-doc.json');
const VERSIONS_JSON = path.join(DOWNLOADS_DIR, 'versions.json');
const VERSION_TXT = path.join(DOWNLOADS_DIR, 'version.txt');
const ADMIN_JSON = path.join(__dirname, 'admin.json');
const TMP_DIR = path.join(__dirname, '.upload-tmp');

// 暴露全局句柄给 router 模块（保持单一数据源，避免重复计算路径）
global.__fs = fs;
global.__path = path;
global.__DOWNLOADS_DIR = DOWNLOADS_DIR;
global.__GITHUB_DIR = GITHUB_DIR;
global.__UPDATE_DOC = UPDATE_DOC;
global.__VERSIONS_JSON = VERSIONS_JSON;
global.__VERSION_TXT = VERSION_TXT;
global.__ADMIN_JSON = ADMIN_JSON;
global.__TMP_DIR = TMP_DIR;
global.__ROOT = ROOT;

// update-doc 统一读写（portal/release/packer 三系统共用，保证元数据一致）
function readDoc() {
  try { return JSON.parse(fs.readFileSync(UPDATE_DOC, 'utf8')); } catch { return { versions: [] }; }
}
function writeDoc(doc) {
  fs.writeFileSync(UPDATE_DOC, JSON.stringify(doc, null, 2));
  // 同步轻量级端点：versions.json / version.txt（客户端备选探测）
  const arr = (doc.versions || []).filter(v => !String(v.version).includes('-'));
  const latest = arr.length ? arr.sort((a, b) => {
    const pa = String(a.version).split('.').map(Number), pb = String(b.version).split('.').map(Number);
    return (pb[0]-pa[0]) || (pb[1]-pa[1]) || (pb[2]-pa[2]);
  })[0] : null;
  if (latest) {
    fs.writeFileSync(VERSIONS_JSON, JSON.stringify({ version: latest.version, date: latest.date, notes: latest.notes, assets: latest.assets || [] }, null, 2));
    fs.writeFileSync(VERSION_TXT, latest.version + '\n');
  }
}
global.__readDoc = readDoc;
global.__writeDoc = writeDoc;

// 兼容旧路径：把 /api/*（管理/公开）与 /packer/api/* 重定向到新分区，避免线上旧客户端/缓存失效
const LEGACY_REDIRECT = {
  '/api/update': '/admin/api/release/update',
  '/api/state': '/admin/api/release/state',
  '/api/gh-releases': '/admin/api/release/gh-releases',
  '/api/publish': '/admin/api/release/publish',
  '/api/status': '/admin/api/release/status',
  '/api/delete': '/admin/api/release/delete',
  '/api/upload': '/admin/api/release/upload',
  '/api/delete-file': '/admin/api/release/delete-file',
  '/api/login': '/admin/api/portal/login',
  '/api/auth-check': '/admin/api/portal/auth-check',
  '/api/passwd': '/admin/api/portal/passwd',
  '/packer/api/state': '/admin/api/packer/state',
  '/packer/api/version': '/admin/api/packer/version',
  '/packer/api/pack': '/admin/api/packer/pack',
  '/packer/api/distribute': '/admin/api/packer/distribute',
  '/packer/api/register': '/admin/api/packer/register',
};
function redirectLegacy(req, res, target) {
  const q = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  res.writeHead(308, { 'Location': target + q, 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'moved', location: target }));
}

// 首启确保 downloads 与轻量级端点存在
if (!fs.existsSync(DOWNLOADS_DIR)) fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
if (!fs.existsSync(ADMIN_JSON)) fs.writeFileSync(ADMIN_JSON, JSON.stringify({ user: 'yushichadao', pass: 'admin123' }, null, 2));
if (!fs.existsSync(UPDATE_DOC)) fs.writeFileSync(UPDATE_DOC, JSON.stringify({ versions: [] }, null, 2));

function sendFile(req, res, filePath, type) {
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-store',
      ...(filePath.endsWith('.html') ? { 'X-Frame-Options': 'DENY' } : {})
    });
    res.end(data);
  });
}

// GitHub Releases 代理（供 release 子系统公开只读 /api/release/gh-releases 复用）
async function handleGhReleases(req, res) {
  const https = await import('https');
  const endpoints = [
    'https://api.github.com/repos/cub3d-editor/cub3d-editor/releases?per_page=50',
    'https://ghproxy.com/https://api.github.com/repos/cub3d-editor/cub3d-editor/releases?per_page=50',
    'https://mirror.ghproxy.com/https://api.github.com/repos/cub3d-editor/cub3d-editor/releases?per_page=50',
  ];
  for (const url of endpoints) {
    try {
      const data = await new Promise((resolve, reject) => {
        const r = https.get(url, { headers: { 'User-Agent': 'Cub3D-Manager', 'Accept': 'application/vnd.github+json' } }, resp => {
          if (resp.statusCode !== 200) return reject(new Error('status ' + resp.statusCode));
          let buf = ''; resp.on('data', d => buf += d); resp.on('end', () => resolve(buf));
        });
        r.on('error', reject); r.setTimeout(8000, () => r.destroy(new Error('timeout')));
      });
      const releases = JSON.parse(data);
      const assets = (releases || []).slice(0, 50).flatMap(rel => (rel.assets || []).map(a => ({
        name: a.name, size: a.size, browser_download_url: a.browser_download_url, tag: rel.tag_name
      })));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, releases: assets }));
      return;
    } catch {}
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, releases: [], error: 'all_mirrors_failed' }));
}
global.__handleGhReleases = handleGhReleases;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.exe': 'application/octet-stream', '.apk': 'application/vnd.android.package-archive',
  '.zip': 'application/zip', '.dmg': 'application/octet-stream', '.deb': 'application/octet-stream',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, 'http://localhost');
  let pathname = decodeURIComponent(parsed.pathname);

  // CORS（全接口允许跨域，便于客户端三端直接对接）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // 旧路径兼容重定向
  if (LEGACY_REDIRECT[pathname]) return redirectLegacy(req, res, LEGACY_REDIRECT[pathname]);

  // 安装包静态下载（公开）：/admin/downloads/<file> 或 /downloads/<file>
  if (pathname.endsWith('/downloads') || /\/downloads\//.test(pathname)) {
    const name = pathname.slice(pathname.lastIndexOf('/') + 1);
    if (name) return sendFile(req, res, path.join(DOWNLOADS_DIR, name.replace(/[\/\\]/g, '')), MIME[path.extname(name)] || 'application/octet-stream');
  }

  // 轻量级更新探测备选端点（公开）
  if (pathname === '/admin/version.json' || pathname === '/version.json') {
    return sendFile(req, res, VERSIONS_JSON, 'application/json; charset=utf-8');
  }
  if (pathname === '/admin/version.txt' || pathname === '/version.txt') {
    return sendFile(req, res, VERSION_TXT, 'text/plain; charset=utf-8');
  }

  // 管理后台静态页面（门户 / 发布更新信息 / 打包分发 三入口）
  if (pathname === '/admin' || pathname === '/admin/') {
    return sendFile(req, res, path.join(PUBLIC_DIR, 'index.html'), MIME['.html']);
  }
  if (pathname === '/admin/update' || pathname === '/admin/update/') {
    return sendFile(req, res, path.join(PUBLIC_DIR, 'update.html'), MIME['.html']);
  }
  if (pathname === '/admin/build' || pathname === '/admin/build/') {
    return sendFile(req, res, path.join(PUBLIC_DIR, 'build.html'), MIME['.html']);
  }
  if (pathname === '/admin/distribute' || pathname === '/admin/distribute/') {
    return sendFile(req, res, path.join(PUBLIC_DIR, 'distribute.html'), MIME['.html']);
  }
  if (pathname.startsWith('/admin/') && !pathname.startsWith('/admin/api/')) {
    const rel = pathname.slice('/admin/'.length);
    const fp = path.join(PUBLIC_DIR, rel);
    if (fs.existsSync(fp) && fs.statSync(fp).isFile()) {
      return sendFile(req, res, fp, MIME[path.extname(fp)] || 'application/octet-stream');
    }
  }

  // API 路由（portal / release / packer 三个子系统）
  if (pathname.startsWith('/admin/api/')) {
    // 把 /admin/api/* 归一为 /api/* 供 router 内部匹配（router 以 /api/<system>/ 注册）
    req.url = req.url.replace('/admin/api/', '/api/');
    return server.emit('api', req, res, parsed);
  }

  // 根路径兜底（便于直接 IP:3000 访问时给出提示）
  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h2>Cub3D Editor 管理后台</h2><p>请访问 <a href="/admin/">/admin/</a></p>');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'not_found' }));
});

// 注册三个子系统路由
const app = { _routes: {}, get(p, h) { (this._routes[p] = this._routes[p] || []).push(['GET', h]); }, post(p, h) { (this._routes[p] = this._routes[p] || []).push(['POST', h]); } };
registerPortalRouter(app);
registerReleaseRouter(app);
registerPackerRouter(app);

server.on('api', (req, res, parsed) => {
  const key = req.url.split('?')[0];
  const route = app._routes[key];
  if (!route) { res.writeHead(404, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: 'no_route', path: key })); }
  const m = route.find(r => r[0] === req.method);
  if (!m) { res.writeHead(405, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: 'method_not_allowed' })); }
  m[1](req, res, parsed);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`[admin] listening on :${PORT}  (prefix /admin, systems: portal/release/packer)`));
