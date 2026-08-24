// 打包分发系统接口（本地打包 / 在线分发 / 统一版本号 / 登记）
// 挂载前缀：/admin/api/packer
// 与发布更新信息系统（release）共用 update-doc.json / downloads/，实现「打包 → 分发 → 更新话术发布」闭环。
// 登录态与后台门户（portal）共享同一账号密码（令牌即当前密码）。
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync, spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 令牌鉴权（与 portal 同源）
function requireAuth(req, res) {
  let admin = { user: 'yushichadao', pass: 'admin123' };
  try { admin = JSON.parse(global.__fs.readFileSync(global.__ADMIN_JSON, 'utf8')); } catch {}
  if ((req.headers['x-admin-token'] || '') !== admin.pass) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: false, error: 'unauthorized' }));
    return false;
  }
  return true;
}

export function registerPackerRouter(app) {
  const ROOT = global.__ROOT;
  const DOWNLOADS = global.__DOWNLOADS_DIR;
  const GH_REPO = process.env.GH_REPO || 'cub3d-editor/cub3d-editor';
  const GH_TOKEN = process.env.GH_TOKEN || '';

  const PACK_STATE_FILE = path.join(__dirname, 'data', 'pack-state.json');
  const VERSION_STATE_FILE = path.join(__dirname, 'data', 'version.json');
  const VERSION_FILES = [path.join(ROOT, 'package.json'), path.join(ROOT, 'PC', 'package.json'), path.join(ROOT, 'Android', 'package.json')];

  const PKG_TYPES = {
    'pc-setup': { label: 'PC 安装版', platform: 'pc', kind: '安装版',
      cwd: path.join(ROOT, 'PC'), cmd: ['npm', ['run', 'dist:setup']],
      artifact: (v) => `Cub3D-Editor-Setup-${v}-x64.exe`, outDir: (out) => path.join(out, 'PC', 'dist') },
    'pc-portable': { label: 'PC 便携版', platform: 'pc', kind: '便携版',
      cwd: path.join(ROOT, 'PC'), cmd: ['npm', ['run', 'dist:portable']],
      artifact: (v) => `Cub3D-Editor-Portable-${v}-x64.exe`, outDir: (out) => path.join(out, 'PC', 'dist') },
    'android-apk': { label: 'Android APK', platform: 'android', kind: 'APK',
      cwd: path.join(ROOT, 'Android'), cmd: ['npm', ['run', 'apk:release']],
      artifact: (v) => `Cub3D-Editor-${v}-release.apk`, outDir: (out) => path.join(out, 'Android', 'app', 'build', 'outputs', 'apk', 'release') },
  };
  function guessApkName(outDir, version) {
    try {
      const files = fs.readdirSync(outDir).filter(f => /\.apk$/i.test(f) && /release/i.test(f));
      if (!files.length) return null;
      const exact = files.find(f => f.indexOf(version) >= 0);
      return exact || files.sort().pop();
    } catch { return null; }
  }

  function readCurrentVersion() {
    try { const j = JSON.parse(fs.readFileSync(VERSION_STATE_FILE, 'utf8')); if (j && j.version) return j.version; } catch {}
    for (const f of VERSION_FILES) {
      if (fs.existsSync(f)) { try { const j = JSON.parse(fs.readFileSync(f, 'utf8')); if (j.version) return j.version; } catch {} }
    }
    return '';
  }
  function applyVersion(ver) {
    let n = 0;
    try { fs.mkdirSync(path.dirname(VERSION_STATE_FILE), { recursive: true });
      fs.writeFileSync(VERSION_STATE_FILE, JSON.stringify({ version: ver, updatedAt: new Date().toISOString() }, null, 2) + '\n', 'utf8'); n++; } catch {}
    for (const f of VERSION_FILES) {
      if (!fs.existsSync(f)) continue;
      try { const j = JSON.parse(fs.readFileSync(f, 'utf8')); if (j.version !== ver) { j.version = ver; fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n', 'utf8'); n++; } } catch {}
    }
    return n;
  }

  function loadPackState() { try { return JSON.parse(fs.readFileSync(PACK_STATE_FILE, 'utf8')); } catch { return null; } }
  function savePackState(s) { fs.mkdirSync(path.dirname(PACK_STATE_FILE), { recursive: true }); fs.writeFileSync(PACK_STATE_FILE, JSON.stringify(s, null, 2) + '\n', 'utf8'); }
  function fmtSize(n) {
    if (n == null) return '';
    if (n >= 1073741824) return (n/1073741824).toFixed(2) + ' GB';
    if (n >= 1048576) return (n/1048576).toFixed(1) + ' MB';
    if (n >= 1024) return (n/1024).toFixed(0) + ' KB';
    return n + ' B';
  }

  // 状态（公开只读部分：含打包进度与版本号，供下辖页面拉取）
  app.get('/api/packer/state', (req, res) => {
    const st = loadPackState();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, version: readCurrentVersion(),
      pkgTypes: Object.keys(PKG_TYPES).map(k => ({ key: k, label: PKG_TYPES[k].label, platform: PKG_TYPES[k].platform, kind: PKG_TYPES[k].kind })),
      ghEnabled: !!GH_TOKEN, downloadsDir: DOWNLOADS, pack: st }));
  });

  app.post('/api/packer/version', (req, res) => {
    const ok = requireAuth(req, res); if (!ok) return;
    let body = ''; req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const ver = String((JSON.parse(body || '{}').version) || '').trim();
        if (!/^\d+\.\d+\.\d+$/.test(ver)) { res.writeHead(400, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: '版本号格式应为 X.X.X' })); }
        const n = applyVersion(ver);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, version: ver, filesUpdated: n }));
      } catch (e) { res.writeHead(500, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: false, error: e.message })); }
    });
  });

  let running = false;
  app.post('/api/packer/pack', (req, res) => {
    const ok = requireAuth(req, res); if (!ok) return;
    let body = ''; req.on('data', c => body += c);
    req.on('end', () => {
      const b = JSON.parse(body || '{}');
      const ver = String(b.version || '').trim();
      const types = Array.isArray(b.types) ? b.types.filter(t => PKG_TYPES[t]) : [];
      let outDir = String(b.outDir || '').trim();
      if (!/^\d+\.\d+\.\d+$/.test(ver)) { res.writeHead(400, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: '版本号格式应为 X.X.X' })); }
      if (!types.length) { res.writeHead(400, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: '请至少选择一种包类型' })); }
      if (!outDir) outDir = path.join(ROOT, 'release', ver);
      outDir = path.resolve(outDir);
      if (running) { res.writeHead(409, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: '已有打包任务进行中，请稍候' })); }
      try { applyVersion(ver); } catch (e) { res.writeHead(500, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: '写版本号失败：' + e.message })); }

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
            if (!fs.existsSync(def.cwd)) {
              step.status = 'needs-local';
              step.msg = '⚠ 服务器未部署构建环境（缺少 ' + path.basename(def.cwd) + ' 源码），请在本机打包后通过「上传安装包」汇入';
              savePackState(state); continue;
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

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, message: '打包任务已启动', outDir }));
    });
  });

  app.post('/api/packer/distribute', (req, res) => {
    const ok = requireAuth(req, res); if (!ok) return;
    let body = ''; req.on('data', c => body += c);
    req.on('end', async () => {
      const st = loadPackState();
      if (st && st.running) { res.writeHead(409, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: '仍有进行中的任务，请稍候' })); }
      const okSteps = st && st.steps ? st.steps.filter(s => s.status === 'ok' && s.path) : [];
      const b = JSON.parse(body || '{}');
      const doWeb = b.web !== false; // 默认分发 Web 端
      const targets = Array.isArray(b.targets) ? b.targets : [];
      // 仅当确实需要包分发（含 cn/github 且需要包）而无产物时报错；纯 Web 分发放行
      const needPkg = targets.some(t => t === 'cn' || t === 'github');
      if (needPkg && !okSteps.length) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ok: false, error: '没有可分发（构建成功）的包，请先打包' }));
      }
      const tag = String(b.tag || ('v' + (st ? st.version : '')));
      if (!st) { st = { dist: { cn: { status: 'idle', msg: '' }, gh: { status: 'idle', msg: '' }, web: { status: 'idle', msg: '' } } }; }
      if (!st.dist) st.dist = { cn: { status: 'idle', msg: '' }, gh: { status: 'idle', msg: '' }, web: { status: 'idle', msg: '' } };
      if (!st.dist.web) st.dist.web = { status: 'idle', msg: '' };
      const dist = st.dist;

      if (doWeb && dist.web.status !== 'ok') {
        dist.web.status = 'running'; dist.web.msg = '构建 Web 发布副本并登记版本…'; savePackState(st);
        try {
          const WEB = path.join(ROOT, 'web');
          if (!fs.existsSync(WEB)) throw new Error('未找到 web/ 目录');
          const bootv = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD 长序号
          const idx = path.join(WEB, 'index.html');
          if (!fs.existsSync(idx)) throw new Error('未找到 web/index.html');
          let html = fs.readFileSync(idx, 'utf8');
          html = html.replace(/const BOOTV = '[^']*'/, `const BOOTV = '${bootv}'`);
          html = html.replace(/<meta name="bootv" content="[^"]*">/, `<meta name="bootv" content="${bootv}">`);
          fs.writeFileSync(idx, html, 'utf8');
          fs.writeFileSync(path.join(WEB, 'version.txt'), bootv + '\n', 'utf8');
          const doc = global.__readDoc();
          let w = doc.versions.find(x => x.version === bootv && x.platform === 'web');
          if (!w) { w = { version: bootv, date: new Date().toISOString().slice(0, 10), status: 'published', platform: 'web', targets: ['cn', 'github'], notes: {}, assets: [] }; doc.versions.push(w); }
          w.assets = collectWebFiles(WEB).map(f => ({ name: f.rel, size: f.size, platform: 'web', channel: 'web' }));
          global.__writeDoc(doc);
          let pushed = 'skipped';
          if (targets.indexOf('github') >= 0) {
            pushed = gitCommitPush(`chore(web): publish web ${bootv}`);
          }
          dist.web.status = 'ok'; dist.web.msg = `✓ Web 发布副本已生成（BOOTV ${bootv}），已登记并${pushed === 'pushed' ? '推送 Pages' : pushed === 'no-changes' ? '无变更' : '待手动推送'}`;
        } catch (e) { dist.web.status = 'fail'; dist.web.msg = 'Web 分发失败：' + String(e.message || e); }
        savePackState(st);
      }

      if (targets.indexOf('cn') >= 0 && dist.cn.status !== 'ok') {
        dist.cn.status = 'running'; dist.cn.msg = '复制到境内 downloads/ 并登记版本…'; savePackState(st);
        try {
          fs.mkdirSync(DOWNLOADS, { recursive: true });
          for (const s of okSteps) await fsp.copyFile(s.path, path.join(DOWNLOADS, s.artifact));
          const doc = global.__readDoc();
          const ver = st.version;
          let v = doc.versions.find(x => x.version === ver);
          if (!v) { v = { version: ver, date: new Date().toISOString().slice(0, 10), status: 'published', targets: ['cn', 'github'], notes: {}, assets: [] }; doc.versions.push(v); }
          for (const s of okSteps) {
            const a = { name: s.artifact, size: s.size || 0, platform: s.platform, channel: 'cn' };
            if (!v.assets.find(x => x.name === a.name)) v.assets.push(a);
          }
          global.__writeDoc(doc);
          dist.cn.status = 'ok'; dist.cn.msg = `✓ 已分发 ${okSteps.length} 个包到 ${DOWNLOADS}，并登记版本 ${ver}`;
        } catch (e) { dist.cn.status = 'fail'; dist.cn.msg = '境内分发失败：' + String(e.message || e); }
        savePackState(st);
      }

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

      // 境内分发完成后异步上云（deploy.sh 已 rsync web/ 与 downloads/）
      if (targets.indexOf('cn') >= 0 && dist.cn.status === 'ok') {
        const sh = path.join(ROOT, 'deploy', 'deploy.sh');
        if (fs.existsSync(sh)) {
          dist.deploy = { status: 'running', msg: '已触发境内云部署（deploy.sh）…' };
          savePackState(st);
          const cp = spawn('bash', [sh], { cwd: ROOT, stdio: 'pipe', detached: true, env: process.env });
          const logFile = path.join(__dirname, 'data', 'deploy.log');
          const log = fs.createWriteStream(logFile, { flags: 'a' });
          if (cp.stdout) cp.stdout.pipe(log);
          if (cp.stderr) cp.stderr.pipe(log);
          cp.on('exit', (code) => {
            dist.deploy = { status: code === 0 ? 'ok' : 'fail', msg: `境内云部署${code === 0 ? '完成' : '失败（退出码 ' + code + '）'}`, at: new Date().toISOString() };
            savePackState(st);
          });
          cp.unref();
        }
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, dist }));
    });
  });

  app.post('/api/packer/register', (req, res) => {
    const ok = requireAuth(req, res); if (!ok) return;
    let body = ''; req.on('data', c => body += c);
    req.on('end', async () => {
      const b = JSON.parse(body || '{}');
      const ver = String(b.version || '').trim();
      const files = Array.isArray(b.files) ? b.files : [];
      if (!/^\d+\.\d+\.\d+$/.test(ver)) { res.writeHead(400, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: '版本号格式应为 X.X.X' })); }
      if (!files.length) { res.writeHead(400, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: false, error: '请至少提供一个已上传的安装包文件名' })); }
      try {
        const doc = global.__readDoc();
        let v = doc.versions.find(x => x.version === ver);
        if (!v) { v = { version: ver, date: new Date().toISOString().slice(0, 10), status: 'published', targets: ['cn', 'github'], notes: {}, assets: [] }; doc.versions.push(v); }
        let added = 0;
        for (const f of files) {
          const name = String(f.name || '').trim();
          if (!name) continue;
          const fp = path.join(DOWNLOADS, name);
          if (!fs.existsSync(fp)) continue;
          const size = (f.size != null) ? f.size : fs.statSync(fp).size;
          const platform = /\.apk$/i.test(name) ? 'android' : 'pc';
          const a = { name, size: size || 0, platform, channel: 'cn' };
          if (!v.assets.find(x => x.name === name)) { v.assets.push(a); added++; }
        }
        if (!added) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(JSON.stringify({ ok: true, message: '无新增（该版本安装包已登记）', registered: 0 })); }
        global.__writeDoc(doc);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, message: `已登记 ${added} 个安装包到版本 ${ver}`, registered: added }));
      } catch (e) { res.writeHead(500, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ ok: false, error: String(e.message || e) })); }
    });
  });

  // GitHub 辅助
  async function ghApi(method, url, body, isBinary) {
    const headers = { 'Authorization': 'Bearer ' + GH_TOKEN, 'User-Agent': 'cub3d-packer', 'Accept': 'application/vnd.github+json' };
    if (body && !isBinary) headers['Content-Type'] = 'application/json';
    const init = { method, headers };
    if (body) init.body = isBinary ? body : JSON.stringify(body);
    const r = await fetch(url, init);
    const text = await r.text();
    let json = null; try { json = JSON.parse(text); } catch {}
    if (!r.ok) throw new Error((json && json.message) || text.slice(0, 200) || ('HTTP ' + r.status));
    return json;
  }
  async function ghEnsureRelease(tag) {
    const url = `https://api.github.com/repos/${GH_REPO}/releases`;
    try { return await ghApi('POST', url, { tag_name: tag, name: tag, body: 'Release ' + tag, draft: false, prerelease: false }); }
    catch (e) { const list = await ghApi('GET', url + '?per_page=100'); const ex = (list || []).find(x => x.tag_name === tag); if (ex) return ex; throw e; }
  }
  async function ghUploadAsset(release, filePath, fileName) {
    const uploadUrl = (typeof release === 'string' ? release : release.upload_url).replace('{?name,label}', '');
    const url = `${uploadUrl}?name=${encodeURIComponent(fileName)}`;
    const data = fs.readFileSync(filePath);
    const headers = { 'Authorization': 'Bearer ' + GH_TOKEN, 'User-Agent': 'cub3d-packer', 'Content-Type': 'application/octet-stream' };
    const r = await fetch(url, { method: 'POST', headers, body: data });
    if (!r.ok) { const t = await r.text(); throw new Error(t.slice(0, 200)); }
    return true;
  }

  // 递归收集 web/ 下需发布的文件（排除构建缓存/依赖/版本控制）
  function collectWebFiles(webDir) {
    const SKIP = new Set(['node_modules', '.git', '.cache', 'dist', 'build', '.vite', 'coverage']);
    const out = [];
    (function walk(dir, rel) {
      let entries = [];
      try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
      for (const e of entries) {
        if (SKIP.has(e.name)) continue;
        const full = path.join(dir, e.name);
        const r = rel ? path.join(rel, e.name) : e.name;
        if (e.isDirectory()) walk(full, r);
        else if (e.isFile()) { try { out.push({ rel: r.replace(/\\/g, '/'), size: fs.statSync(full).size }); } catch {} }
      }
    })(webDir, '');
    return out;
  }

  // git 提交并推送 web/ 与 downloads/ 的改动（触发 GitHub Pages 自动部署）
  function gitCommitPush(message) {
    const run = (args) => spawnSync('git', args, { cwd: ROOT, stdio: 'pipe', timeout: 5 * 60 * 1000 });
    const add = run(['add', 'web', 'downloads']);
    if (add.status !== 0) throw new Error('git add 失败：' + (add.stderr ? add.stderr.toString() : add.status));
    const status = run(['status', '--porcelain']);
    const dirty = status.stdout ? status.stdout.toString().trim() : '';
    if (!dirty) return 'no-changes';
    const cm = run(['commit', '-m', message]);
    if (cm.status !== 0) throw new Error('git commit 失败：' + (cm.stderr ? cm.stderr.toString() : cm.status));
    const ps = run(['push', 'origin', 'main']);
    if (ps.status !== 0) throw new Error('git push 失败：' + (ps.stderr ? ps.stderr.toString() : ps.status));
    return 'pushed';
  }
}
