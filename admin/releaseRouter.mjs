// 发布更新信息系统接口（版本发布 / 状态变更 / 删除 / 安装包上传下载 / 公开更新探测）
// 挂载前缀：/admin/api/release
//   - 公开只读（无需鉴权）：update(探测) / state / gh-releases
//   - 管理写操作（X-Admin-Token 鉴权）：publish / status / delete / upload / delete-file
import crypto from 'crypto';

// 百度翻译为可选能力：模块缺失或凭证未配置时自动回退中文，不阻断发布流程
let _baidu = null;
async function baiduTranslate(text, to) {
  if (!_baidu) {
    try { _baidu = (await import('./baiduTranslate.mjs')).baiduTranslate; }
    catch { _baidu = null; }
  }
  if (typeof _baidu === 'function') {
    try { return await _baidu(text, to); } catch { return null; }
  }
  return null; // 回退中文
}

// 与 server.mjs / portalRouter.mjs 共享的全局句柄
function fs() { return global.__fs; }
function DOWNLOADS_DIR() { return global.__DOWNLOADS_DIR; }
function GITHUB_DIR() { return global.__GITHUB_DIR; }
function UPDATE_DOC() { return global.__UPDATE_DOC; }
function VERSIONS_JSON() { return global.__VERSIONS_JSON; }
function VERSION_TXT() { return global.__VERSION_TXT; }
function ADMIN_JSON() { return global.__ADMIN_JSON; }
function TMP_DIR() { return global.__TMP_DIR; }

// 简单 in-memory 上传速率限制
const uploadCounts = {};
function checkUploadLimit(ip) {
  const now = Date.now();
  const w = uploadCounts[ip] || { count: 0, ts: now };
  if (now - w.ts > 60000) { w.count = 0; w.ts = now; }
  if (w.count >= 40) return false;
  w.count++; uploadCounts[ip] = w; return true;
}

function requireAuth(req, res) {
  let admin = { user: 'admin', pass: 'admin123' };
  try { admin = JSON.parse(fs().readFileSync(ADMIN_JSON(), 'utf8')); } catch {}
  if ((req.headers['x-admin-token'] || '') !== admin.pass) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: 'unauthorized' }));
    return false;
  }
  return true;
}

// ===== 版本比较 / 解析工具 =====
function parseVersion(v) {
  const m = String(v || '').match(/^(\d+)\.(\d+)\.(\d+)/);
  if (!m) return null;
  return { major: +m[1], minor: +m[2], patch: +m[3], raw: v };
}
function cmpVersion(a, b) {
  const pa = parseVersion(a), pb = parseVersion(b);
  if (!pa || !pb) return 0;
  return (pa.major - pb.major) || (pa.minor - pb.minor) || (pa.patch - pb.patch);
}
function isNewer(current, candidate) {
  if (!current) return true;
  const d = cmpVersion(candidate, current);
  return d > 0;
}
function matchesChannel(version, channel) {
  if (!channel || channel === 'stable') return true;
  return String(version).includes('-' + channel);
}
function resolveChannelFilter(channel) {
  if (!channel || channel === 'stable') return v => !String(v).includes('-');
  return v => String(v).includes('-' + channel);
}
function pickLatest(versions, filter) {
  const arr = (versions || []).filter(v => filter(String(v.version)));
  if (!arr.length) return null;
  return arr.sort((a, b) => cmpVersion(b.version, a.version))[0];
}

// ===== update-doc 读写（统一复用 server.mjs 暴露的全局实现，保证三系统写同一份）=====
// 数据结构兼容：旧 packer 曾把 v.assets 写成 {pc:[],android:[]} 对象，
// 三系统统一为数组 [{name,size,platform,channel}]，读取时做归一避免崩溃。
function normalizeAssets(doc) {
  for (const v of (doc.versions || [])) {
    const a = v.assets;
    if (Array.isArray(a)) continue;
    const arr = [];
    if (a && typeof a === 'object') {
      for (const plat of ['pc', 'android', 'web']) {
        if (Array.isArray(a[plat])) for (const f of a[plat]) {
          if (f && f.name) arr.push({ name: f.name, size: f.size || 0, platform: plat, channel: f.channel || 'cn' });
        }
      }
    }
    v.assets = arr;
  }
  return doc;
}
function readDoc() { return normalizeAssets(global.__readDoc()); }
function writeDoc(doc) { normalizeAssets(doc); global.__writeDoc(doc); }

// ===== 公开只读：更新探测 =====
function handleUpdate(req, res, url) {
  const current = url.searchParams.get('current') || '';
  const channel = url.searchParams.get('channel') || 'stable';
  const doc = readDoc();
  const filter = resolveChannelFilter(channel);
  const target = pickLatest(doc.versions, filter);
  let update = null;
  if (target && isNewer(current, target.version) && filter(target.version) && target.status !== 'stopped') {
    update = {
      version: target.version,
      date: target.date,
      type: target.type,
      status: target.status,
      notes: target.notes || {},
      assets: (target.assets || []).map(a => ({
        name: a.name,
        size: a.size,
        platform: a.platform,
        channel: a.channel,
        url: (a.url && a.url.startsWith('http')) ? a.url : ('/admin/downloads/' + encodeURIComponent(a.name))
      }))
    };
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, current, channel, update, latest: target ? target.version : null }));
}

// ===== 公开只读：完整状态 =====
function handleState(req, res) {
  const doc = readDoc();
  let files = [];
  try { files = fs().readdirSync(DOWNLOADS_DIR()).map(n => {
    let size = 0; try { size = fs().statSync(global.__path.join(DOWNLOADS_DIR(), n)).size; } catch {}
    return { name: n, size };
  }); } catch {}
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, doc, files, latest: pickLatest(doc.versions, v => !String(v).includes('-')) }));
}

// ===== 公开只读：GitHub Releases 代理 =====
function handleGhReleases(req, res) {
  // 复用 server.mjs 中已实现的代理逻辑（通过全局函数）
  if (global.__handleGhReleases) return global.__handleGhReleases(req, res);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, releases: [] }));
}

// ===== 管理写：发布 / 更新版本 =====
function handlePublish(req, res) {
  const ok = requireAuth(req, res); if (!ok) return;
  let body = '';
  req.on('data', c => body += c);
  req.on('end', async () => {
    try {
      const p = JSON.parse(body || '{}');
      if (!p.version) { res.writeHead(400, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: 'version_required' })); }
      const doc = readDoc();
      let v = doc.versions.find(x => x.version === p.version);
      const isNew = !v;
      if (isNew) v = { version: p.version, date: p.date || new Date().toISOString().slice(0, 10), status: 'published', notes: {}, assets: [] };
      if (p.date) v.date = p.date;
      if (p.type) v.type = p.type;
      if (p.status) v.status = p.status;
      if (p.targets) v.targets = p.targets;
      // notes：支持中文数组自动翻译为多语言分桶；也支持已翻译的分桶对象
      if (p.notes != null) {
        if (Array.isArray(p.notes)) {
          // 整体中文数组 → 各端公共话术
          const langs = ['en', 'ja', 'ko', 'ru', 'es', 'fr', 'ar', 'zh-TW'];
          const bucket = { pc: [], android: [], web: [] };
          for (const line of p.notes) {
            bucket.pc.push(line); bucket.android.push(line); bucket.web.push(line);
          }
          v.notes = { pc: bucket.pc.map(l => ({ lang: 'zh', text: l })), android: bucket.android.map(l => ({ lang: 'zh', text: l })), web: bucket.web.map(l => ({ lang: 'zh', text: l })) };
          for (const platform of ['pc', 'android', 'web']) {
            for (const item of v.notes[platform]) {
              for (const lg of langs) {
                try { const t = await baiduTranslate(item.text, lg); if (t) item[lg] = t; }
                catch { /* 翻译失败回退中文 */ }
              }
            }
          }
        } else if (typeof p.notes === 'object') {
          // 已翻译的分桶对象（pc/android/web 各自数组）
          for (const platform of ['pc', 'android', 'web']) {
            if (Array.isArray(p.notes[platform])) {
              v.notes[platform] = p.notes[platform].map(line =>
                (typeof line === 'string') ? { lang: 'zh', text: line } : line);
            }
          }
        }
      }
      if (p.assets && Array.isArray(p.assets)) {
        const existing = new Set((v.assets || []).map(a => a.name));
        for (const a of p.assets) {
          if (!existing.has(a.name)) { v.assets.push(a); existing.add(a.name); }
          else { const idx = v.assets.findIndex(x => x.name === a.name); v.assets[idx] = { ...v.assets[idx], ...a }; }
        }
      }
      if (isNew) doc.versions.push(v);
      doc.versions.sort((a, b) => cmpVersion(b.version, a.version));
      writeDoc(doc);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, version: v.version, isNew, version_count: doc.versions.length }));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'bad_request', detail: String(e) }));
    }
  });
}

// ===== 管理写：状态变更 =====
function handleStatus(req, res) {
  const ok = requireAuth(req, res); if (!ok) return;
  let body = '';
  req.on('data', c => body += c);
  req.on('end', () => {
    try {
      const { version, status } = JSON.parse(body || '{}');
      const doc = readDoc();
      const v = doc.versions.find(x => x.version === version);
      if (!v) { res.writeHead(404, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: 'version_not_found' })); }
      v.status = status;
      writeDoc(doc);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, version, status }));
    } catch { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: false, error: 'bad_request' })); }
  });
}

// ===== 管理写：删除版本 =====
function handleDelete(req, res) {
  const ok = requireAuth(req, res); if (!ok) return;
  let body = '';
  req.on('data', c => body += c);
  req.on('end', () => {
    try {
      const { version } = JSON.parse(body || '{}');
      const doc = readDoc();
      const before = doc.versions.length;
      doc.versions = doc.versions.filter(x => x.version !== version);
      if (doc.versions.length === before) { res.writeHead(404, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: 'version_not_found' })); }
      writeDoc(doc);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, version, version_count: doc.versions.length }));
    } catch { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: false, error: 'bad_request' })); }
  });
}

// ===== 管理写：上传安装包 =====
function handleUpload(req, res) {
  const ok = requireAuth(req, res); if (!ok) return;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  if (!checkUploadLimit(ip)) { res.writeHead(429, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: 'too_many_uploads' })); }
  const boundary = req.headers['content-type'] && req.headers['content-type'].match(/boundary=(?:"([^"]+)"|([^;]+))/);
  if (!boundary) { res.writeHead(400, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: 'no_multipart' })); }
  const b = '--' + (boundary[1] || boundary[2]);
  const chunks = [];
  req.on('data', c => chunks.push(c));
  req.on('end', () => {
    try {
      const buf = Buffer.concat(chunks);
      const parts = buf.toString('binary').split(b).map(s => s.trim());
      const files = [];
      let count = 0;
      for (const part of parts) {
        if (part === '--' || part === '' || part === '--\r\n') continue;
        const m = part.match(/name="files"; filename="([^"]*)"/i);
        if (!m) continue;
        if (count >= 20) break;
        const fn = m[1].replace(/[\/\\]/g, '');
        const idx = part.indexOf('\r\n\r\n');
        if (idx === -1) continue;
        let content = part.slice(idx + 4);
        content = content.replace(/\r\n$/, '');
        fs().writeFileSync(global.__path.join(DOWNLOADS_DIR(), fn), Buffer.from(content, 'binary'));
        let size = 0; try { size = fs().statSync(global.__path.join(DOWNLOADS_DIR(), fn)).size; } catch {}
        files.push({ name: fn, size });
        count++;
      }
      // 上传即同步生成轻量级端点
      const doc = readDoc();
      writeDoc(doc);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, files, count: files.length }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'upload_failed', detail: String(e) }));
    }
  });
}

// ===== 管理写：删除安装包文件 =====
function handleDeleteFile(req, res) {
  const ok = requireAuth(req, res); if (!ok) return;
  let body = '';
  req.on('data', c => body += c);
  req.on('end', () => {
    try {
      const { name } = JSON.parse(body || '{}');
      const fp = global.__path.join(DOWNLOADS_DIR(), String(name).replace(/[\/\\]/g, ''));
      if (!fs().existsSync(fp)) { res.writeHead(404, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: 'file_not_found' })); }
      fs().unlinkSync(fp);
      // 同步清理各版本 assets 引用
      const doc = readDoc();
      for (const v of doc.versions) v.assets = (v.assets || []).filter(a => a.name !== name);
      writeDoc(doc);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, name }));
    } catch { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: false, error: 'bad_request' })); }
  });
}

export function registerReleaseRouter(app) {
  // 公开只读（无需鉴权）
  app.get('/api/release/update', handleUpdate);
  app.get('/api/release/state', handleState);
  app.get('/api/release/gh-releases', handleGhReleases);
  // 管理写（X-Admin-Token 鉴权）
  app.post('/api/release/publish', handlePublish);
  app.post('/api/release/status', handleStatus);
  app.post('/api/release/delete', handleDelete);
  app.post('/api/release/upload', handleUpload);
  app.post('/api/release/delete-file', handleDeleteFile);
}
