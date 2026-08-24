// admin/fsRouter.mjs — 三端文件系统编排（本地电脑 / 国内服务器 / 国际 GitHub）
// 挂载前缀：/admin/api/fs
// 以国内服务器（downloads/）为中枢，联通：
//   本地电脑 —— 本机打包代理 local-packer.mjs 定期上报 release/ 文件快照，
//               管理端可派发「代传任务」让代理把本地文件分块上传到 downloads/
//   国内服务器 —— downloads/ 目录浏览（安装包权威副本，直链 /admin/downloads/<name>）
//   国际      —— GitHub Releases（创建 Release / 上传 asset / 删除 asset），实现「国内 → 国际」分发闭环
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { requireAuth } from './auth.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function registerFsRouter(app) {
  const ROOT = global.__ROOT;
  const DOWNLOADS = global.__DOWNLOADS_DIR;
  const DATA_DIR = path.join(__dirname, 'data');
  const LOCAL_FILES_FILE = path.join(DATA_DIR, 'local-files.json');
  const TASK_FILE = path.join(DATA_DIR, 'agent-task.json');
  const GH_REPO = process.env.GH_REPO || 'cub3d-editor/cub3d-editor';
  const GH_TOKEN = process.env.GH_TOKEN || '';

  function readJson(file, fallback) { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } }
  function writeJson(file, obj) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n', 'utf8'); }
  function loadLocalFiles() { return readJson(LOCAL_FILES_FILE, null); }
  function loadAgent() { return readJson(path.join(DATA_DIR, 'agent.json'), null); }
  function agentOnline() {
    const a = loadAgent();
    if (!a || !a.online) return false;
    try { return (Date.now() - new Date(a.lastSeen).getTime()) < 60 * 1000; } catch { return false; }
  }
  function listDownloads() {
    let files = [];
    try {
      files = fs.readdirSync(DOWNLOADS)
        .filter(f => { try { return fs.statSync(path.join(DOWNLOADS, f)).isFile(); } catch { return false; } })
        .map(f => {
          const s = fs.statSync(path.join(DOWNLOADS, f));
          return { name: f, size: s.size, mtime: s.mtime.toISOString(), url: '/admin/downloads/' + encodeURIComponent(f) };
        })
        .sort((a, b) => b.mtime.localeCompare(a.mtime));
    } catch {}
    return files;
  }
  function sendJson(res, code, obj) { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(obj)); }
  function readBody(req, cb) { let body = ''; req.on('data', c => body += c); req.on('end', () => cb(body)); req.on('error', () => cb('')); }

  // ---------- 三端状态汇总（本地快照 / 国内 downloads / 国际能力） ----------
  app.get('/api/fs/status', (req, res) => {
    const ok = requireAuth(req, res); if (!ok) return;
    const a = loadAgent();
    const lf = loadLocalFiles();
    const cnFiles = listDownloads();
    sendJson(res, 200, {
      ok: true,
      local: { online: agentOnline(), name: a ? a.name : null, os: a ? a.os : null, lastSeen: a ? a.lastSeen : null,
        root: path.join(ROOT, 'release'), snapshot: lf ? lf.files : [], snapshotAt: lf ? lf.at : null },
      cn: { dir: DOWNLOADS, files: cnFiles },
      intl: { ghEnabled: !!GH_TOKEN, repo: GH_REPO, releasesUrl: `https://github.com/${GH_REPO}/releases` },
    });
  });

  // ---------- 国内 downloads 列表 ----------
  app.get('/api/fs/cn', (req, res) => {
    const ok = requireAuth(req, res); if (!ok) return;
    sendJson(res, 200, { ok: true, files: listDownloads() });
  });

  // ---------- 本地 → 国内：派发代传任务（代理在线时） ----------
  app.post('/api/fs/local/upload', (req, res) => {
    const ok = requireAuth(req, res); if (!ok) return;
    readBody(req, body => {
      try {
        const b = JSON.parse(body || '{}');
        const files = Array.isArray(b.files) ? b.files : [];
        const list = [];
        for (const f of files) {
          const name = String(f.name || '').trim();
          const rel = String(f.path || f.name).replace(/\\/g, '/');
          if (!/^[\w.\-]+$/.test(name)) continue;
          if (!rel || rel.length > 300 || rel.startsWith('/') || rel.split('/').some(seg => !seg || seg === '.' || seg === '..')) continue;
          list.push({ name, path: rel });
        }
        if (!list.length) return sendJson(res, 400, { ok: false, error: '没有可选的上传文件' });
        if (!agentOnline()) return sendJson(res, 409, { ok: false, error: '本地电脑代理离线，无法代传。请在本机运行 admin/local-packer.mjs' });
        const task = { id: 'task-' + Date.now(), kind: 'upload', files: list, createdAt: new Date().toISOString() };
        writeJson(TASK_FILE, task);
        sendJson(res, 200, { ok: true, message: `已派发 ${list.length} 个文件给本地代理上传，代理将在数秒内开始传输`, task });
      } catch (e) { sendJson(res, 500, { ok: false, error: String(e.message || e) }); }
    });
  });

  // ---------- 国际 GitHub Releases ----------
  async function ghApi(method, url, body) {
    if (!GH_TOKEN) throw new Error('服务器未配置 GH_TOKEN，GitHub 写操作不可用');
    const headers = { 'Authorization': 'Bearer ' + GH_TOKEN, 'User-Agent': 'cub3d-fs', 'Accept': 'application/vnd.github+json' };
    const init = { method, headers };
    if (body !== undefined) { headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(body); }
    const r = await fetch(url, init);
    const text = await r.text();
    let j = null; try { j = JSON.parse(text); } catch {}
    if (!r.ok) throw new Error((j && j.message) || text.slice(0, 200) || ('HTTP ' + r.status));
    return j;
  }

  // GitHub Releases 列表（含资产）；无 GH_TOKEN 时走 GitHub 公开只读 API（写操作不可用）
  async function fetchGhReleases() {
    const headers = { 'User-Agent': 'cub3d-fs', 'Accept': 'application/vnd.github+json' };
    if (GH_TOKEN) headers['Authorization'] = 'Bearer ' + GH_TOKEN;
    const r = await fetch(`https://api.github.com/repos/${GH_REPO}/releases?per_page=30`, { headers });
    const text = await r.text();
    let j = null; try { j = JSON.parse(text); } catch {}
    if (!r.ok) throw new Error((j && j.message) || text.slice(0, 200) || ('HTTP ' + r.status));
    return (j || []).map(rel => ({
      id: rel.id, tag: rel.tag_name, name: rel.name, body: rel.body || '', draft: !!rel.draft,
      prerelease: !!rel.prerelease, created_at: rel.created_at,
      assets: (rel.assets || []).map(a => ({ id: a.id, name: a.name, size: a.size, url: a.browser_download_url })),
    }));
  }
  app.get('/api/fs/gh', async (req, res) => {
    const ok = requireAuth(req, res); if (!ok) return;
    try {
      const releases = await fetchGhReleases();
      sendJson(res, 200, { ok: true, source: GH_TOKEN ? 'api' : 'public', releases });
    } catch (e) { sendJson(res, 500, { ok: false, error: String(e.message || e).slice(0, 300) }); }
  });

  // 创建 Release
  app.post('/api/fs/gh/release', (req, res) => {
    const ok = requireAuth(req, res); if (!ok) return;
    readBody(req, async body => {
      try {
        const b = JSON.parse(body || '{}');
        const tag = String(b.tag || '').trim();
        if (!tag) return sendJson(res, 400, { ok: false, error: '缺少 Release 标签（如 v1.0.0）' });
        const rel = await ghApi('POST', `https://api.github.com/repos/${GH_REPO}/releases`,
          { tag_name: tag, name: String(b.name || tag).slice(0, 200), body: String(b.body || '').slice(0, 8000), draft: false, prerelease: false });
        sendJson(res, 200, { ok: true, message: `Release ${tag} 已创建`, tag: rel.tag_name });
      } catch (e) { sendJson(res, 500, { ok: false, error: String(e.message || e).slice(0, 300) }); }
    });
  });

  // 从国内 downloads 上传文件到指定 Release（国内 → 国际分发核心）
  app.post('/api/fs/gh/asset', (req, res) => {
    const ok = requireAuth(req, res); if (!ok) return;
    readBody(req, async body => {
      try {
        const b = JSON.parse(body || '{}');
        const tag = String(b.tag || '').trim();
        const name = String(b.file || '').trim();
        if (!tag) return sendJson(res, 400, { ok: false, error: '缺少目标 Release 标签' });
        if (!/^[\w.\-]+$/.test(name)) return sendJson(res, 400, { ok: false, error: '文件名不合法' });
        const fp = path.join(DOWNLOADS, name);
        if (!fs.existsSync(fp)) return sendJson(res, 404, { ok: false, error: `downloads/ 中不存在 ${name}（请先上传到国内）` });
        let rel = null;
        try { rel = await ghApi('GET', `https://api.github.com/repos/${GH_REPO}/releases/tags/${encodeURIComponent(tag)}`); }
        catch { rel = await ghApi('POST', `https://api.github.com/repos/${GH_REPO}/releases`, { tag_name: tag, name: tag }); }
        const uploadUrl = rel.upload_url.replace('{?name,label}', '');
        const data = fs.readFileSync(fp);
        const r = await fetch(`${uploadUrl}?name=${encodeURIComponent(name)}`, {
          method: 'POST', headers: { 'Authorization': 'Bearer ' + GH_TOKEN, 'User-Agent': 'cub3d-fs', 'Content-Type': 'application/octet-stream' }, body: data,
        });
        if (!r.ok) { const t = await r.text(); throw new Error(t.slice(0, 200)); }
        sendJson(res, 200, { ok: true, message: `${name} 已上传到 GitHub Release ${tag}` });
      } catch (e) { sendJson(res, 500, { ok: false, error: String(e.message || e).slice(0, 300) }); }
    });
  });

  // 删除 GitHub asset
  app.post('/api/fs/gh/asset-delete', (req, res) => {
    const ok = requireAuth(req, res); if (!ok) return;
    readBody(req, async body => {
      try {
        const b = JSON.parse(body || '{}');
        const assetId = parseInt(b.assetId, 10);
        if (!assetId) return sendJson(res, 400, { ok: false, error: '缺少 assetId' });
        await ghApi('DELETE', `https://api.github.com/repos/${GH_REPO}/releases/assets/${assetId}`);
        sendJson(res, 200, { ok: true, message: '国际资产已删除' });
      } catch (e) { sendJson(res, 500, { ok: false, error: String(e.message || e).slice(0, 300) }); }
    });
  });
}
