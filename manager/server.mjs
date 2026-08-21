import express from 'express';
import multer from 'multer';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');          // 仓库根（含 downloads/）
// 下载目录：服务器部署时用环境变量 CUB3D_DOWNLOADS 显式指定（例如
// /www/wwwroot/139.196.104.56/downloads，主站 /www/wwwroot/cub3d-editor.cn/downloads 同一逻辑）；
// 未指定则默认取仓库根下 downloads/（与本目录并列，仓库内联布局无需额外配置）。
const DOWNLOADS = path.resolve(process.env.CUB3D_DOWNLOADS || path.join(ROOT, 'downloads'));
const PUBLIC = path.join(__dirname, 'public');        // 管理器前端静态目录
const DOC_FILE = path.join(DOWNLOADS, 'update-doc.json');
const VER_FILE = path.join(DOWNLOADS, 'versions.json');
const VERTXT_FILE = path.join(DOWNLOADS, 'version.txt');

const PORT = Number(process.env.PORT || 3000);
// 管理后台登录账号（默认 yushichadao），可用环境变量 ADMIN_USER 覆盖
const ADMIN_USER = process.env.ADMIN_USER || 'yushichadao';
// 管理后台登录令牌（即后台密码）的默认值；部署时建议用环境变量覆盖：ADMIN_TOKEN=<你的强令牌> node server.mjs
const DEFAULT_ADMIN_TOKEN = 'YushiCub3D@2026';
// 部署子路径前缀：nginx 将 /manager/ 透传给本服务时设 BASE=/manager；空=监听站点根（IP:3000 直连）
const BASE = (process.env.BASE || '').replace(/\/+$/, '');
// 运行时私有数据（后台修改后的密码等）存于 manager/data/（已 gitignore，绝不入库）
const SRV_DATA_DIR = path.join(__dirname, 'data');
const ADMINPASS_FILE = path.join(SRV_DATA_DIR, 'adminpass.json');
// 有效管理令牌解析顺序：data/adminpass.json（后台「修改密码」写入）> 环境变量 ADMIN_TOKEN > 默认值
function currentToken(){
  try {
    if (fs.existsSync(ADMINPASS_FILE)) {
      const d = JSON.parse(fs.readFileSync(ADMINPASS_FILE, 'utf8'));
      if (d && d.pass) return String(d.pass);
    }
  } catch (e) {}
  return process.env.ADMIN_TOKEN || DEFAULT_ADMIN_TOKEN;
}

// ---------- 工具 ----------
function nowDate(){ return new Date().toISOString().slice(0, 10); }
function nowISO(){ return new Date().toISOString(); }
function lanIp(){
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return null;
}
function ensureDir(p){ fs.mkdirSync(p, { recursive: true }); return p; }

async function loadDoc(){
  try {
    const raw = await fsp.readFile(DOC_FILE, 'utf8');
    const doc = JSON.parse(raw);
    if (!doc || typeof doc !== 'object') throw new Error('bad doc');
    if (!Array.isArray(doc.versions)) doc.versions = [];
    if (typeof doc.schema !== 'number') doc.schema = 2;
    return doc;
  } catch (e) {
    return { schema: 2, updatedAt: nowISO(), versions: [] };
  }
}
async function saveDoc(doc){
  doc.updatedAt = nowISO();
  await fsp.writeFile(DOC_FILE, JSON.stringify(doc, null, 2) + '\n', 'utf8');
}
function cmpVersion(a, b){
  const pa = String(a).replace(/^v/i, '').split('.').map(n => parseInt(n, 10) || 0);
  const pb = String(b).replace(/^v/i, '').split('.').map(n => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const x = pa[i] || 0, y = pb[i] || 0;
    if (x !== y) return x > y ? 1 : -1;
  }
  return 0;
}

// 同步生成 versions.json 与 version.txt（与 downloads 目录实际文件比对，仅收录存在的安装包）
async function syncMeta(doc){
  let files = [];
  try { files = await fsp.readdir(DOWNLOADS); } catch (e) {}
  const assets = {};
  (doc.versions || []).forEach(v => {
    (v.assets && v.assets.pc || []).forEach(a => { if (files.includes(a.name)) assets[a.name] = null; });
    (v.assets && v.assets.android || []).forEach(a => { if (files.includes(a.name)) assets[a.name] = null; });
  });
  // 附加任意真实存在的安装包文件（未登记的也收录，便于手工上传后直接可用）
  files.forEach(f => {
    if (/\.(exe|apk|msi|dmg)$/i.test(f) && !(f in assets)) assets[f] = null;
  });
  const latest = [...doc.versions]
    .filter(v => v.status === 'published')
    .sort((x, y) => cmpVersion(y.version, x.version))[0];
  // 统计文件大小
  for (const name of Object.keys(assets)) {
    try { const st = await fsp.stat(path.join(DOWNLOADS, name)); assets[name] = st.size; } catch (e) { delete assets[name]; }
  }
  const meta = { version: latest ? 'v' + latest.version : 'v0.0.0', assets };
  await fsp.writeFile(VER_FILE, JSON.stringify(meta, null, 2) + '\n', 'utf8');
  await fsp.writeFile(VERTXT_FILE, (latest ? latest.version : '0.0.0') + '\n', 'utf8');
  return meta;
}

// ---------- Express ----------
const app = express();
app.use(express.json({ limit: '2mb' }));

// 管理鉴权：非 GET 请求需带 X-Admin-Token，与当前有效令牌匹配
function adminAuth(req, res, next){
  const tok = req.headers['x-admin-token'];
  if (tok !== currentToken()) return res.status(401).json({ ok: false, error: 'unauthorized' });
  next();
}

// 管理后台登录：账号 + 当前有效令牌（默认 YushiCub3D@2026，后台修改后立即生效）
app.post(BASE + '/api/login', (req, res) => {
  const b = req.body || {};
  const user = String(b.user || '').trim();
  const pass = String(b.pass || '');
  if (user === ADMIN_USER && pass === currentToken()) return res.json({ ok: true });
  return res.status(401).json({ ok: false, error: '账号或密码错误' });
});

// 修改管理后台登录密码：校验当前密码，写入 data/adminpass.json，登录/鉴权立即生效（无需重启）
app.post(BASE + '/api/passwd', adminAuth, (req, res) => {
  const b = req.body || {};
  const old = String(b.old || '');
  const next = String(b.next || '');
  if (!old || !next) return res.status(400).json({ ok: false, error: '缺少当前密码或新密码' });
  if (next.length < 6) return res.status(400).json({ ok: false, error: '新密码至少 6 位' });
  if (old !== currentToken()) return res.status(401).json({ ok: false, error: '当前密码错误' });
  if (old === next) return res.status(400).json({ ok: false, error: '新密码不能与当前密码相同' });
  try {
    fs.mkdirSync(SRV_DATA_DIR, { recursive: true });
    fs.writeFileSync(ADMINPASS_FILE, JSON.stringify({ pass: next, ts: new Date().toISOString() }, null, 2) + '\n', 'utf8');
    return res.json({ ok: true });
  } catch (e) { return res.status(500).json({ ok: false, error: e.message }); }
});

// 轻量鉴权校验（自动登录时验证令牌是否仍有效）
app.get(BASE + '/api/auth-check', adminAuth, (req, res) => res.json({ ok: true }));

// ---------- GitHub Releases 代理：客户端浏览器直连 api.github.com 在境内不稳/被墙，改由服务端抓取转发（多镜像重试） ----------
const GH_RELEASES_URL = 'https://api.github.com/repos/yushichadao/Cub3D-Editor/releases?per_page=50';
const GH_MIRRORS = [
  GH_RELEASES_URL,
  'https://gh-proxy.com/' + GH_RELEASES_URL,
  'https://ghfast.top/' + GH_RELEASES_URL,
  'https://ghproxy.net/' + GH_RELEASES_URL
];
app.get(BASE + '/api/gh-releases', async (req, res) => {
  for (const u of GH_MIRRORS) {
    const ctl = (typeof AbortSignal !== 'undefined' && AbortSignal.timeout) ? AbortSignal.timeout(8000) : undefined;
    try {
      const r = await fetch(u, {
        headers: { 'User-Agent': 'cub3d-manager', 'Accept': 'application/vnd.github+json' },
        signal: ctl
      });
      if (r.ok) {
        const j = await r.json();
        const releases = (Array.isArray(j) ? j : []).map(x => ({
          tag: x.tag_name,
          // 仅保留安装包资产（.exe/.apk/.msi/.dmg），排除 update-doc.json 等元数据附件
          assets: (x.assets || [])
            .filter(a => /\.(exe|apk|msi|dmg)$/i.test(a.name))
            .map(a => ({ name: a.name, size: a.size }))
        }));
        return res.json({ ok: true, releases: releases });
      }
    } catch (e) { /* 当前源失败 → 尝试下一镜像 */ }
  }
  return res.status(502).json({ ok: false, error: 'GitHub Releases 不可达（直连与镜像均失败）' });
});

// ---------- 公开只读接口（客户端更新检测用） ----------
app.get(BASE + '/api/state', async (req, res) => {
  const doc = await loadDoc();
  const files = [];
  try {
    for (const f of await fsp.readdir(DOWNLOADS)) {
      if (/\.(exe|apk|msi|dmg)$/i.test(f)) {
        try { const st = await fsp.stat(path.join(DOWNLOADS, f)); files.push({ name: f, size: st.size }); } catch (e) {}
      }
    }
  } catch (e) {}
  res.json({ ok: true, doc, files });
});

// 客户端更新探测入口：返回完整 update-doc（含 versions 全量，供 PC/Android 更新模块做
// 强制更新链解析）+ 精简的最新/目标信息（向后兼容精简客户端）。
app.get(BASE + '/api/update', async (req, res) => {
  const doc = await loadDoc();
  const current = String(req.query.current || '0.0.0').replace(/^v/i, '');
  const published = [...doc.versions]
    .filter(v => v.status === 'published')
    .sort((x, y) => cmpVersion(y.version, x.version));
  const target = published.find(v => cmpVersion(v.version, current) > 0) || null;
  res.json({
    ok: true,
    doc,                                  // 全量文档（客户端自行解析强制链与安装包）
    latest: published[0] ? published[0].version : null,
    update: target
  });
});

// 下载重定向：/downloads/<file> 直连
app.use(BASE + '/downloads', express.static(DOWNLOADS, { dotfiles: 'deny', fallthrough: true }));

// ---------- 管理接口（写操作，需鉴权） ----------
// 同版本增选合并：新旧 assets 合并。key = 平台::文件名（来源不同视作不同包，但同文件名的 srcs 并集）
function mergeAssets(oldA, newA){
  const out = { pc: [], android: [] };
  ['pc', 'android'].forEach(pl => {
    const map = {};
    (oldA && oldA[pl] || []).forEach(p => {
      const name = (p && p.name) || p;
      map[name] = { name, kind: (p && p.kind) || '', size: (p && p.size != null) ? String(p.size) : '', srcs: Array.isArray(p && p.srcs) ? p.srcs.slice() : [] };
    });
    (newA && newA[pl] || []).forEach(p => {
      const name = (p && p.name) || p;
      const s = Array.isArray(p && p.srcs) ? p.srcs : [];
      if (map[name]) {
        const merged = new Set((map[name].srcs || []).concat(s));
        map[name].srcs = Array.from(merged);
        if (p && p.kind) map[name].kind = p.kind;
        if (p && p.size != null) map[name].size = String(p.size);
      } else {
        map[name] = { name, kind: (p && p.kind) || '', size: (p && p.size != null) ? String(p.size) : '', srcs: s.slice() };
      }
    });
    out[pl] = Object.keys(map).map(k => map[k]);
  });
  return out;
}

// 发布 / 更新版本：body = { version, date?, type?, status?, targets?, notes?, assets? }
app.post(BASE + '/api/publish', adminAuth, async (req, res) => {
  try {
    const b = req.body || {};
    const ver = String(b.version || '').trim();
    if (!ver) return res.status(400).json({ ok: false, error: '缺少 version' });
    const doc = await loadDoc();
    let rec = doc.versions.find(v => v.version === ver);
    const newRec = {
      version: ver,
      date: b.date || nowDate(),
      publishedAt: rec ? rec.publishedAt : nowISO(),
      type: b.type === 'force' ? 'force' : 'optional',
      status: b.status === 'stopped' ? 'stopped' : 'published',
      targets: Array.isArray(b.targets) && b.targets.length ? b.targets : ['github', 'cn'],
      notes: b.notes && typeof b.notes === 'object' ? b.notes : { all: [] },
      assets: b.assets && typeof b.assets === 'object' ? b.assets : { pc: [], android: [] }
    };
    if (rec) {
      // 同版本再次发布 = 增选合并：保留该版本已有安装包，新勾选的包追加/合并到 assets
      newRec.assets = mergeAssets(rec.assets, b.assets);
      Object.assign(rec, newRec);
    } else {
      doc.versions.push(newRec);
    }
    doc.versions.sort((x, y) => cmpVersion(y.version, x.version));
    await saveDoc(doc);
    await syncMeta(doc);
    res.json({ ok: true, version: ver });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// 停止 / 重新发布
app.post(BASE + '/api/status', adminAuth, async (req, res) => {
  try {
    const { version, status } = req.body || {};
    if (!version || !['published', 'stopped'].includes(status)) {
      return res.status(400).json({ ok: false, error: '参数错误' });
    }
    const doc = await loadDoc();
    const rec = doc.versions.find(v => v.version === version);
    if (!rec) return res.status(404).json({ ok: false, error: '版本不存在' });
    rec.status = status;
    if (status === 'published' && !rec.publishedAt) rec.publishedAt = nowISO();
    await saveDoc(doc);
    await syncMeta(doc);
    res.json({ ok: true, version, status });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// 删除版本
app.post(BASE + '/api/delete', adminAuth, async (req, res) => {
  try {
    const { version } = req.body || {};
    if (!version) return res.status(400).json({ ok: false, error: '缺少 version' });
    const doc = await loadDoc();
    doc.versions = doc.versions.filter(v => v.version !== version);
    await saveDoc(doc);
    await syncMeta(doc);
    res.json({ ok: true, version });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// 上传安装包（多文件）
const upload = multer({ dest: path.join(os.tmpdir(), 'cub3d-uploads') });
app.post(BASE + '/api/upload', adminAuth, upload.array('files', 20), async (req, res) => {
  try {
    ensureDir(DOWNLOADS);
    const saved = [];
    for (const f of req.files || []) {
      const target = path.join(DOWNLOADS, f.originalname);
      await fsp.rename(f.path, target);
      saved.push(f.originalname);
    }
    await syncMeta(await loadDoc());
    res.json({ ok: true, saved });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// 删除安装包
app.post(BASE + '/api/delete-file', adminAuth, async (req, res) => {
  try {
    const { name } = req.body || {};
    if (!name) return res.status(400).json({ ok: false, error: '缺少 name' });
    const target = path.join(DOWNLOADS, path.basename(name));
    try { await fsp.unlink(target); } catch (e) { return res.status(404).json({ ok: false, error: '文件不存在' }); }
    await syncMeta(await loadDoc());
    res.json({ ok: true, name });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

// 管理器前端静态托管（no-cache：确保刷新即拿到最新版，避免缓存旧逻辑）
if (fs.existsSync(path.join(PUBLIC, 'index.html'))) {
  app.use(BASE + '/', express.static(PUBLIC, {
    etag: false,
    setHeaders(res){
      res.setHeader('Cache-Control', 'no-store, max-age=0');
      res.setHeader('Pragma', 'no-cache');
    }
  }));
} else {
  app.get(BASE + '/', (req, res) => res.send('管理器前端未构建（public/index.html 不存在）'));
}

app.listen(PORT, '0.0.0.0', async () => {
  ensureDir(DOWNLOADS);
  ensureDir(PUBLIC);
  try { if (!fs.existsSync(DOC_FILE)) await saveDoc({ schema: 2, updatedAt: nowISO(), versions: [] }); } catch (e) {}
  const ip = lanIp();
  console.log('===== Cub3D Editor 更新管理器已启动 =====');
  console.log('本机:      http://localhost:' + PORT + '/');
  if (ip) console.log('局域网/IP: http://' + ip + ':' + PORT + '/');
  console.log('下载目录:  ' + DOWNLOADS);
  console.log('更新探测:  /api/update?current=<版本>');
  console.log('状态接口:  /api/state');
  if (!process.env.ADMIN_TOKEN) console.log('[提示] 当前使用默认管理令牌（后台登录密码 YushiCub3D@2026），部署时请用环境变量 ADMIN_TOKEN 覆盖。');
  console.log('========================================');
});
