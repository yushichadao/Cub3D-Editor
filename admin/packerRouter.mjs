// 打包分发 Router —— 作为 manager 的下辖子模块挂载（/packer）
// 复用 manager 的登录态（adminAuth / currentToken）、境内 downloads/ 目录与
// update-doc.json / versions.json 元数据，实现「打包 → 分发 → 更新话术发布」闭环打通。
import express from 'express';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

export function createPackerRouter(deps){
  const { ROOT, DOWNLOADS, GH_REPO, GH_TOKEN, loadDoc, saveDoc, syncMeta, adminAuth, currentToken } = deps;
  const router = express.Router();
  const PACK_STATE_FILE = path.join(ROOT, 'admin', 'data', 'pack-state.json');

  // ---------- 包类型定义（自由选择） ----------
  const PKG_TYPES = {
    'pc-setup': { label: 'PC 安装版', platform: 'pc', kind: '安装版',
      cwd: path.join(ROOT, 'PC'), cmd: ['npm', ['run', 'dist:setup']],
      artifact: (v) => `Cub3D-Editor-Setup-${v}-x64.exe`,
      outDir: (out) => path.join(out, 'PC', 'dist') },
    'pc-portable': { label: 'PC 便携版', platform: 'pc', kind: '便携版',
      cwd: path.join(ROOT, 'PC'), cmd: ['npm', ['run', 'dist:portable']],
      artifact: (v) => `Cub3D-Editor-Portable-${v}-x64.exe`,
      outDir: (out) => path.join(out, 'PC', 'dist') },
    'android-apk': { label: 'Android APK', platform: 'android', kind: 'APK',
      cwd: path.join(ROOT, 'Android'), cmd: ['npm', ['run', 'apk:release']],
      artifact: (v) => `Cub3D-Editor-${v}-release.apk`,
      outDir: (out) => path.join(out, 'Android', 'app', 'build', 'outputs', 'apk', 'release') },
  };
  function guessApkName(outDir, version){
    try {
      const files = fs.readdirSync(outDir).filter(f => /\.apk$/i.test(f) && /release/i.test(f));
      if (!files.length) return null;
      const exact = files.find(f => f.indexOf(version) >= 0);
      return exact || files.sort().pop();
    } catch (e) { return null; }
  }

  // ---------- 统一版本号（两端适配） ----------
  // 版本号权威存储：manager/data/version.json（本地与服务器都存在，始终可读写）。
  // 同时尽量同步写入根 / PC / Android 的 package.json（本地有完整仓库时），
  // 服务器未部署源码时跳过，不报错——保证两端都能获取/设置版本号。
  const VERSION_STATE_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data', 'version.json');
  const VERSION_FILES = [ path.join(ROOT, 'package.json'), path.join(ROOT, 'PC', 'package.json'), path.join(ROOT, 'Android', 'package.json') ];
  function readCurrentVersion(){
    // 1) 优先读 manager/data/version.json
    try { const j = JSON.parse(fs.readFileSync(VERSION_STATE_FILE, 'utf8')); if (j && j.version) return j.version; } catch (e) {}
    // 2) 回退：读根 / PC / Android 的 package.json（本地有仓库时）
    for (const f of VERSION_FILES) {
      if (fs.existsSync(f)) { try { const j = JSON.parse(fs.readFileSync(f, 'utf8')); if (j.version) return j.version; } catch (e) {} }
    }
    return '';
  }
  function applyVersion(ver){
    let n = 0;
    // 始终写入 manager/data/version.json（两端通用）
    try {
      fs.mkdirSync(path.dirname(VERSION_STATE_FILE), { recursive: true });
      fs.writeFileSync(VERSION_STATE_FILE, JSON.stringify({ version: ver, updatedAt: new Date().toISOString() }, null, 2) + '\n', 'utf8');
      n++;
    } catch (e) {}
    // 同步写入仓库内 package.json（仅本地有完整仓库时；不存在则跳过）
    for (const f of VERSION_FILES) {
      if (!fs.existsSync(f)) continue;
      try {
        const j = JSON.parse(fs.readFileSync(f, 'utf8'));
        if (j.version !== ver) { j.version = ver; fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n', 'utf8'); n++; }
      } catch (e) {}
    }
    return n;
  }

  // ---------- 打包状态 ----------
  function loadPackState(){ try { return JSON.parse(fs.readFileSync(PACK_STATE_FILE, 'utf8')); } catch (e) { return null; } }
  function savePackState(s){ fs.mkdirSync(path.dirname(PACK_STATE_FILE), { recursive: true }); fs.writeFileSync(PACK_STATE_FILE, JSON.stringify(s, null, 2) + '\n', 'utf8'); }
  function fmtSize(n){
    if (n == null) return '';
    if (n >= 1073741824) return (n/1073741824).toFixed(2) + ' GB';
    if (n >= 1048576) return (n/1048576).toFixed(1) + ' MB';
    if (n >= 1024) return (n/1024).toFixed(0) + ' KB';
    return n + ' B';
  }

  // ---------- 状态接口（下辖页面拉取） ----------
  router.get('/api/state', adminAuth, (req, res) => {
    const st = loadPackState();
    res.json({ ok: true, version: readCurrentVersion(),
      pkgTypes: Object.keys(PKG_TYPES).map(k => ({ key: k, label: PKG_TYPES[k].label, platform: PKG_TYPES[k].platform, kind: PKG_TYPES[k].kind })),
      ghEnabled: !!GH_TOKEN, downloadsDir: DOWNLOADS, pack: st });
  });

  // 统一版本号写入
  router.post('/api/version', adminAuth, (req, res) => {
    try {
      const ver = String((req.body && req.body.version) || '').trim();
      if (!/^\d+\.\d+\.\d+$/.test(ver)) return res.status(400).json({ ok: false, error: '版本号格式应为 X.X.X' });
      const n = applyVersion(ver);
      res.json({ ok: true, version: ver, filesUpdated: n });
    } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
  });

  // ---------- 本地打包（异步） ----------
  let running = false;
  router.post('/api/pack', adminAuth, async (req, res) => {
    const b = req.body || {};
    const ver = String(b.version || '').trim();
    const types = Array.isArray(b.types) ? b.types.filter(t => PKG_TYPES[t]) : [];
    let outDir = String(b.outDir || '').trim();
    if (!/^\d+\.\d+\.\d+$/.test(ver)) return res.status(400).json({ ok: false, error: '版本号格式应为 X.X.X' });
    if (!types.length) return res.status(400).json({ ok: false, error: '请至少选择一种包类型' });
    if (!outDir) outDir = path.join(ROOT, 'release', ver);
    outDir = path.resolve(outDir);
    if (running) return res.status(409).json({ ok: false, error: '已有打包任务进行中，请稍候' });
    try { applyVersion(ver); } catch (e) { return res.status(500).json({ ok: false, error: '写版本号失败：' + e.message }); }

    running = true;
    const state = { running: true, version: ver, outDir, startedAt: new Date().toISOString(), finishedAt: null,
      steps: types.map(t => ({ type: t, label: PKG_TYPES[t].label, platform: PKG_TYPES[t].platform, kind: PKG_TYPES[t].kind, status: 'pending', msg: '' })),
      dist: null };
    savePackState(state);

    (async () => {
      for (const step of state.steps) {
        const def = PKG_TYPES[step.type];
        step.status = 'running'; step.msg = '构建中…'; savePackState(state);
        try {
          // 两端适配：服务器未部署源码（无 PC/Android 目录）→ 跳过本地构建，提示改由本地打包后上传
          if (!fs.existsSync(def.cwd)) {
            step.status = 'needs-local';
            step.msg = '⚠ 服务器未部署构建环境（缺少 ' + path.basename(def.cwd) + ' 源码），请在本机打包后通过「上传安装包」汇入';
            savePackState(state);
            continue;
          }
          const r = spawnSync(def.cmd[0], def.cmd[1], { cwd: def.cwd, env: { ...process.env, CUB3D_RELEASE_OUT: outDir }, stdio: 'pipe', timeout: 30 * 60 * 1000 });
          if (r.error) throw r.error;
          if (r.status !== 0) { const tail = (Buffer.isBuffer(r.stderr) ? r.stderr.toString() : '').split('\n').slice(-12).join('\n'); throw new Error('构建退出码 ' + r.status + '\n' + tail); }
          const dir = def.outDir(outDir);
          let artifact = def.artifact(ver); let artifactPath = path.join(dir, artifact);
          if (!fs.existsSync(artifactPath) && step.type === 'android-apk') { const g = guessApkName(dir, ver); if (g) { artifact = g; artifactPath = path.join(dir, g); } }
          if (!fs.existsSync(artifactPath)) throw new Error('未找到产物：' + artifactPath);
          const sz = fs.statSync(artifactPath).size;
          step.status = 'ok'; step.msg = `✓ ${artifact}（${fmtSize(sz)}）`; step.artifact = artifact; step.size = sz; step.path = artifactPath;
        } catch (e) { step.status = 'fail'; step.msg = String(e.message || e).slice(0, 600); }
        savePackState(state);
      }
      state.dist = { pending: true, cn: { status: 'idle', msg: '' }, gh: { status: 'idle', msg: '' } };
      state.running = false; state.finishedAt = new Date().toISOString(); savePackState(state);
    })().catch(e => { state.running = false; state.finishedAt = new Date().toISOString(); state.error = String(e.message || e); savePackState(state); })
      .finally(() => { running = false; });

    res.json({ ok: true, message: '打包任务已启动', outDir });
  });

  // ---------- 分发（打通更新话术系统） ----------
  router.post('/api/distribute', adminAuth, async (req, res) => {
    const st = loadPackState();
    if (!st || !st.steps || st.running) return res.status(409).json({ ok: false, error: '当前无已完成（或仍在进行）的打包任务' });
    const okSteps = st.steps.filter(s => s.status === 'ok' && s.path);
    if (!okSteps.length) return res.status(400).json({ ok: false, error: '没有可分发（构建成功）的包' });
    const targets = Array.isArray(req.body && req.body.targets) ? req.body.targets : [];
    const tag = String((req.body && req.body.tag) || ('v' + st.version));

    if (!st.dist) st.dist = { cn: { status: 'idle', msg: '' }, gh: { status: 'idle', msg: '' } };
    const dist = st.dist;

    // 境内：复制到 downloads/ 并登记进 update-doc.json（打通更新话术发布）
    if (targets.indexOf('cn') >= 0 && dist.cn.status !== 'ok') {
      dist.cn.status = 'running'; dist.cn.msg = '复制到境内 downloads/ 并登记版本…'; savePackState(st);
      try {
        fs.mkdirSync(DOWNLOADS, { recursive: true });
        for (const s of okSteps) await fsp.copyFile(s.path, path.join(DOWNLOADS, s.artifact));
        // 打通：登记到 update-doc.json（与更新话术系统同一份数据）
        const doc = await loadDoc();
        const ver = st.version;
        let v = doc.versions.find(x => x.version === ver);
        if (!v) { v = { version: ver, date: new Date().toISOString().slice(0,10), status: 'published', targets: ['cn', 'github'], notes: { zh: '（由打包分发系统生成）' }, assets: { pc: [], android: [] } }; doc.versions.push(v); }
        for (const s of okSteps) {
          const a = { name: s.artifact, size: s.size || 0, srcs: ['cn'] };
          if (s.platform === 'pc') { if (!v.assets.pc.find(x => x.name === a.name)) v.assets.pc.push(a); }
          else { if (!v.assets.android.find(x => x.name === a.name)) v.assets.android.push(a); }
        }
        await saveDoc(doc);
        await syncMeta(doc);   // 同步生成 versions.json / version.txt，更新话术系统立即可见
        dist.cn.status = 'ok'; dist.cn.msg = `✓ 已分发 ${okSteps.length} 个包到 ${DOWNLOADS}，并登记版本 ${ver}`;
      } catch (e) { dist.cn.status = 'fail'; dist.cn.msg = '境内分发失败：' + String(e.message || e); }
      savePackState(st);
    }

    // 境外：GitHub Releases
    if (targets.indexOf('github') >= 0 && dist.gh.status !== 'ok') {
      if (!GH_TOKEN) { dist.gh.status = 'fail'; dist.gh.msg = '未配置 GH_TOKEN 环境变量，无法分发 GitHub'; savePackState(st); }
      else {
        dist.gh.status = 'running'; dist.gh.msg = `上传到 GitHub Releases ${tag} …`; savePackState(st);
        try {
          const created = await ghEnsureRelease(tag);
          for (const s of okSteps) await ghUploadAsset(created, s.path, s.artifact);
          dist.gh.status = 'ok'; dist.gh.msg = `✓ 已上传 ${okSteps.length} 个包到 GitHub ${tag}`;
        } catch (e) { dist.gh.status = 'fail'; dist.gh.msg = 'GitHub 分发失败：' + String(e.message || e).slice(0, 300); }
        savePackState(st);
      }
    }
    res.json({ ok: true, dist });
  });

  // ---------- 上传安装包登记（两端适配：服务器无构建环境时，本机打包后上传再登记） ----------
  // 入参：{ version, files:[{name,size}], tag? } —— files 为 downloads/ 中已存在的文件名
  router.post('/api/register', adminAuth, async (req, res) => {
    const b = req.body || {};
    const ver = String(b.version || '').trim();
    const files = Array.isArray(b.files) ? b.files : [];
    if (!/^\d+\.\d+\.\d+$/.test(ver)) return res.status(400).json({ ok: false, error: '版本号格式应为 X.X.X' });
    if (!files.length) return res.status(400).json({ ok: false, error: '请至少提供一个已上传的安装包文件名' });
    try {
      const doc = await loadDoc();
      let v = doc.versions.find(x => x.version === ver);
      if (!v) { v = { version: ver, date: new Date().toISOString().slice(0,10), status: 'published', targets: ['cn', 'github'], notes: { zh: '（由打包分发系统登记）' }, assets: { pc: [], android: [] } }; doc.versions.push(v); }
      let added = 0;
      for (const f of files) {
        const name = String(f.name || '').trim();
        if (!name) continue;
        const fp = path.join(DOWNLOADS, name);
        if (!fs.existsSync(fp)) continue;
        const size = (f.size != null) ? f.size : fs.statSync(fp).size;
        const platform = /\.apk$/i.test(name) ? 'android' : 'pc';
        const a = { name, size: size || 0, srcs: ['cn'] };
        const arr = platform === 'android' ? v.assets.android : v.assets.pc;
        if (!arr.find(x => x.name === name)) { arr.push(a); added++; }
      }
      if (!added) return res.json({ ok: true, message: '无新增（该版本安装包已登记）', registered: 0 });
      await saveDoc(doc);
      await syncMeta(doc);
      res.json({ ok: true, message: `已登记 ${added} 个安装包到版本 ${ver}`, registered: added });
    } catch (e) { res.status(500).json({ ok: false, error: String(e.message || e) }); }
  });

  // ---------- GitHub 辅助 ----------
  async function ghApi(method, url, body, isBinary){
    const headers = { 'Authorization': 'Bearer ' + GH_TOKEN, 'User-Agent': 'cub3d-packer', 'Accept': 'application/vnd.github+json' };
    if (body && !isBinary) headers['Content-Type'] = 'application/json';
    const init = { method, headers };
    if (body) init.body = isBinary ? body : JSON.stringify(body);
    const r = await fetch(url, init);
    const text = await r.text();
    let json = null; try { json = JSON.parse(text); } catch (e) {}
    if (!r.ok) throw new Error((json && json.message) || text.slice(0, 200) || ('HTTP ' + r.status));
    return json;
  }
  async function ghEnsureRelease(tag){
    const url = `https://api.github.com/repos/${GH_REPO}/releases`;
    try { return await ghApi('POST', url, { tag_name: tag, name: tag, body: 'Release ' + tag, draft: false, prerelease: false }); }
    catch (e) { const list = await ghApi('GET', url + '?per_page=100'); const ex = (list || []).find(x => x.tag_name === tag); if (ex) return ex; throw e; }
  }
  async function ghUploadAsset(release, filePath, fileName){
    const uploadUrl = (typeof release === 'string' ? release : release.upload_url).replace('{?name,label}', '');
    const url = `${uploadUrl}?name=${encodeURIComponent(fileName)}`;
    const data = fs.readFileSync(filePath);
    const headers = { 'Authorization': 'Bearer ' + GH_TOKEN, 'User-Agent': 'cub3d-packer', 'Content-Type': 'application/octet-stream' };
    const r = await fetch(url, { method: 'POST', headers, body: data });
    if (!r.ok) { const t = await r.text(); throw new Error(t.slice(0, 200)); }
    return true;
  }

  return router;
}
