#!/usr/bin/env node
/**
 * admin/local-packer.mjs — 本机打包代理（遥控本地打包）
 *
 * 在本机（Windows/macOS/Linux 开发机，需已具备 PC/Android 出包环境）常驻运行：
 *
 *   node admin/local-packer.mjs --server http://139.196.104.56/admin --pass <管理密码>
 *
 * 运行后：注册到服务器 → 周期轮询打包任务 → 服务器管理后台点「开始打包」
 * 即被本机领取 → 本机自动执行构建（自动注入长版本号 YYYYMMDD + 短版本号 X.X.X）→
 * 每步进度实时回传管理后台 → 产物自动分块上传到服务器 downloads/ → 继续在线分发。
 *
 * 依赖：Node ≥18（自带 fetch），本机已能本地出包（PC: npm run dist:*；Android: npm run apk:release）。
 */
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ---------- 命令行参数 ----------
function arg(name, def) {
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--' + name && args[i + 1]) return args[i + 1];
    if (args[i].startsWith('--' + name + '=')) return args[i].slice(name.length + 3);
  }
  return def;
}
const SERVER = String(arg('server', process.env.CUB3D_SERVER || 'http://139.196.104.56/admin')).replace(/\/+$/, '');
const RC_FILE = path.join(__dirname, '.packerrc');
// 凭据持久化：--pass 优先，否则读 .packerrc（免每次敲密码）
let PASS = String(arg('pass', process.env.CUB3D_ADMIN_PASS || ''));
let USER = String(arg('user', process.env.CUB3D_ADMIN_USER || 'yushichadao'));
let cachedToken = '';
try {
  const rc = JSON.parse(fs.readFileSync(RC_FILE, 'utf8'));
  if (!PASS && rc.pass) PASS = rc.pass;
  if (rc.user) USER = rc.user;
  if (rc.token) cachedToken = rc.token;
} catch {}
function saveRc() {
  try { fs.writeFileSync(RC_FILE, JSON.stringify({ user: USER, pass: PASS, token: TOKEN }, null, 2) + '\n', 'utf8'); } catch {}
}
const NAME = String(arg('name', '本机打包代理'));
const INTERVAL = parseInt(arg('interval', '5000'), 10);
const CHUNK = 8 * 1024 * 1024; // 上传分块 8MB（避开 Nginx body 限制）

if (!PASS) {
  console.error('[packer-agent] 缺少管理后台密码：--pass <密码>（或环境变量 CUB3D_ADMIN_PASS）');
  process.exit(2);
}
let TOKEN = PASS; // 初始回退：兼容服务端旧明文格式（令牌即密码）；登录成功后替换为会话令牌

// 用账号密码登录换取会话令牌（服务端新格式下必须；旧格式下同样返回令牌并自动迁移）
async function acquireToken() {
  const r = await fetch(`${SERVER}/api/portal/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: USER, pass: PASS }),
  });
  const j = await r.json().catch(() => ({}));
  if (j.ok && j.token) { TOKEN = j.token; saveRc(); return true; }
  return false;
}
// 优先复用缓存令牌：auth-check 通过则免重新登录；失败再用密码登录（密码改了也能自动续）
async function ensureToken() {
  if (cachedToken) {
    try {
      const r = await fetch(`${SERVER}/api/portal/auth-check`, { headers: { 'X-Admin-Token': cachedToken } });
      if (r.ok) { TOKEN = cachedToken; return true; }
    } catch {}
  }
  return acquireToken();
}

// ---------- 包类型定义（与服务器 packerRouter 保持一致） ----------
// realDir：各端构建脚本实际产物目录（electron-builder/build-apk 写死输出，不读 CUB3D_RELEASE_OUT）
// outDir：统一归档目录 downloads/<版本>/<平台>，构建后把产物复制过来再上传
const PKG_TYPES = {
  'pc-setup': { label: 'PC 安装版', cwd: path.join(ROOT, 'PC'), cmd: ['run', 'dist:setup'],
    artifact: (v) => `Cub3D-Editor-Setup-${v}-x64.exe`,
    realDir: () => path.join(ROOT, 'PC', 'dist'), outDir: (out) => path.join(out, 'PC') },
  'pc-portable': { label: 'PC 便携版', cwd: path.join(ROOT, 'PC'), cmd: ['run', 'dist:portable'],
    artifact: (v) => `Cub3D-Editor-Portable-${v}-x64.exe`,
    realDir: () => path.join(ROOT, 'PC', 'dist'), outDir: (out) => path.join(out, 'PC') },
  'android-apk': { label: 'Android APK', cwd: path.join(ROOT, 'Android'), cmd: ['run', 'apk:release'],
    artifact: (v) => `Cub3D-Editor-${v}-release.apk`,
    realDir: () => path.join(ROOT, 'Android', 'dist'), outDir: (out) => path.join(out, 'Android') },
};
function guessApkName(outDir, version) {
  try {
    const files = fs.readdirSync(outDir).filter(f => /\.apk$/i.test(f) && /release/i.test(f));
    if (!files.length) return null;
    const exact = files.find(f => f.indexOf(version) >= 0);
    return exact || files.sort().pop();
  } catch { return null; }
}

// ---------- 版本号写入（根 / PC / Android package.json + shared/version.json，与服务器 applyVersion 一致） ----------
function applyVersion(ver) {
  let n = 0;
  for (const f of [path.join(ROOT, 'package.json'), path.join(ROOT, 'PC', 'package.json'), path.join(ROOT, 'Android', 'package.json')]) {
    if (!fs.existsSync(f)) continue;
    try { const j = JSON.parse(fs.readFileSync(f, 'utf8')); if (j.version !== ver) { j.version = ver; fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n', 'utf8'); n++; } } catch (e) { console.warn('[packer-agent] 写版本号跳过', f, e.message); }
  }
  const sv = path.join(ROOT, 'shared', 'version.json');
  if (fs.existsSync(sv)) {
    try { const j = JSON.parse(fs.readFileSync(sv, 'utf8')); if (j.version !== ver) j.version = ver;
      if (j.platforms) for (const k of Object.keys(j.platforms)) if (j.platforms[k].version !== ver) j.platforms[k].version = ver;
      j.updatedAt = new Date().toISOString(); fs.writeFileSync(sv, JSON.stringify(j, null, 2) + '\n', 'utf8'); n++;
    } catch (e) { console.warn('[packer-agent] 写 shared/version.json 跳过', e.message); }
  }
  console.log(`[packer-agent] 版本号已写入 ${n} 处：${ver}`);
  return n;
}

// ---------- 服务器 API ----------
async function api(pathname, opts = {}) {
  const headers = { 'X-Admin-Token': TOKEN, ...(opts.headers || {}) };
  const init = { method: opts.method || 'GET', headers };
  if (opts.body != null) {
    if (typeof opts.body === 'object') { headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(opts.body); }
    else init.body = opts.body;
  }
  let r = await fetch(SERVER + pathname, init);
  // 令牌失效（改密 / 他处登录导致 tokenHash 变更）时自动重新登录并重试一次
  if (r.status === 401) {
    try {
      if (await acquireToken()) {
        headers['X-Admin-Token'] = TOKEN;
        r = await fetch(SERVER + pathname, init);
      }
    } catch (e) { console.error('[packer-agent] 重新登录失败：', e.message); }
  }
  const text = await r.text();
  let j; try { j = JSON.parse(text); } catch { j = { ok: false, error: text.slice(0, 200) }; }
  if (!r.ok && !j.ok) throw new Error(j.error || ('HTTP ' + r.status));
  return j;
}

async function report(taskId, steps, extra = {}) {
  try { await api('/api/packer/agent/report', { method: 'POST', body: { taskId, steps, ...extra } }); }
  catch (e) { console.error('[packer-agent] 上报失败：', e.message); }
}

async function uploadFile(name, filePath) {
  const buf = await fsp.readFile(filePath);
  const total = Math.max(1, Math.ceil(buf.length / CHUNK));
  for (let seq = 0; seq < total; seq++) {
    const chunk = buf.slice(seq * CHUNK, Math.min((seq + 1) * CHUNK, buf.length));
    const r = await fetch(`${SERVER}/api/packer/agent/upload?name=${encodeURIComponent(name)}&seq=${seq}&total=${total}`, {
      method: 'POST', headers: { 'X-Admin-Token': TOKEN, 'Content-Type': 'application/octet-stream' }, body: chunk,
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.ok) throw new Error('上传分块 ' + (seq + 1) + '/' + total + ' 失败：' + (j.error || r.status));
    if (total > 1) console.log(`[packer-agent]    ${name} 分块 ${seq + 1}/${total}`);
  }
  return buf.length;
}

// ---------- 本地文件快照（供管理后台「文件」页浏览本机 release/ 目录）----------
function scanReleaseFiles() {
  const base = path.join(ROOT, 'downloads');
  const out = [];
  if (!fs.existsSync(base)) return out;
  const SKIP = new Set(['node_modules', '.git', '.cache', 'dist', 'build', '.vite', 'coverage', 'logs', 'obj', 'bin', 'out']);
  (function walk(dir, rel) {
    let entries = [];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (out.length >= 800) return;
      if (SKIP.has(e.name) || e.name.startsWith('.')) continue;
      const full = path.join(dir, e.name);
      const r = rel ? rel + '/' + e.name : e.name;
      if (e.isDirectory()) walk(full, r);
      else if (e.isFile()) {
        try {
          const st = fs.statSync(full);
          if (!/^[\w.\-]+$/.test(e.name)) continue; // 仅收集可上传的 ASCII 文件名
          out.push({ name: e.name, path: r, size: st.size, mtime: st.mtime.toISOString() });
        } catch {}
      }
    }
  })(base, '');
  return out;
}
let lastSnapshotHash = '';
async function sendSnapshot() {
  try {
    const files = scanReleaseFiles();
    const hash = files.map(f => f.path + '|' + f.size + '|' + f.mtime).join('\n');
    if (hash === lastSnapshotHash) return;
    await api('/api/packer/agent/snapshot', { method: 'POST', body: { files } });
    lastSnapshotHash = hash;
    console.log(`[packer-agent] 本地文件快照已上报（${files.length} 个文件，downloads/ 目录）`);
  } catch (e) { console.error('[packer-agent] 快照上报失败：', e.message); }
}

// ---------- 文件代传任务（管理后台「文件」页：本地 → 国内 downloads/）----------
async function handleUploadTask(task) {
  console.log(`\n[packer-agent] 收到代传任务 ${task.id}：${task.files.length} 个文件 → 服务器 downloads/`);
  const done = [];
  try {
    for (const f of task.files) {
      const rel = String(f.path || f.name).replace(/\\/g, '/');
      if (rel.startsWith('/') || rel.split('/').some(seg => !seg || seg === '.' || seg === '..')) throw new Error('非法路径：' + rel);
      const abs = path.join(ROOT, 'downloads', rel);
      if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) throw new Error('文件不存在：' + rel);
      console.log('[packer-agent] 上传：' + f.name + ' ← downloads/' + rel);
      const size = await uploadFile(f.name, abs);
      done.push({ name: f.name, size });
    }
    await report(task.id, [], { kind: 'upload', finished: true, ok: true, done });
    console.log(`[packer-agent] 代传任务 ${task.id} 完成（${done.length} 个文件已进入服务器 downloads/）`);
  } catch (e) {
    await report(task.id, [], { kind: 'upload', finished: true, ok: false, error: String(e.message || e).slice(0, 400) });
    console.error('[packer-agent] 代传任务失败：', e.message);
  }
}

// 构建前清理该端产物目录，避免 Windows 下 win-unpacked 被杀毒/残留进程锁定导致 electron-builder rmdir EBUSY 卡死
function cleanDist(cwd) {
  for (const d of ['dist', 'out', 'release']) {
    const p = path.join(cwd, d);
    try { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true, maxRetries: 3, retryDelay: 300 }); } catch (e) { console.warn('[packer-agent] 清目录失败 ' + p + '：' + e.message); }
  }
}

function runBuild(cwd, cmdArgs, timeoutMs = 20 * 60 * 1000) {
  return new Promise((resolve, reject) => {
    cleanDist(cwd); // 防 EBUSY：先清该端旧产物
    // Windows 用 shell:true + 数组参数跑 npm.cmd（之前验证可用；cmd /c 手动包裹会产生引号嵌套问题）
    const isWin = process.platform === 'win32';
    const npm = isWin ? 'npm.cmd' : 'npm';
    const nodeOpts = [process.env.NODE_OPTIONS, '--use-system-ca'].filter(Boolean).join(' ');
    console.log('[packer-agent] 构建：' + npm + ' ' + cmdArgs.join(' ') + ' @ ' + cwd);
    const child = spawn(npm, cmdArgs, {
      cwd,
      env: { ...process.env, CUB3D_RELEASE_OUT: outDir, NODE_OPTIONS: nodeOpts },
      stdio: ['ignore', 'pipe', 'pipe'],
      ...(isWin ? { shell: true, windowsHide: true } : {}),
    });
    currentChild = child; // 供强制取消 SIGKILL
    let stdout = '', stderr = '', log = '';
    const acc = d => { const s = d.toString(); log += s; stdout += s; };
    if (child.stdout) child.stdout.on('data', acc);
    if (child.stderr) child.stderr.on('data', d => { const s = d.toString(); log += s; stderr += s; process.stderr.write('[build] ' + s); });
    const timer = setTimeout(() => {
      try { child.kill('SIGKILL'); } catch (e) {}
      const m = Math.round(timeoutMs / 60000);
      reject(new Error(`构建超时（${m} 分钟），进程已终止`));
    }, timeoutMs);
    child.on('error', e => { clearTimeout(timer); reject(e); });
    child.on('close', code => {
      clearTimeout(timer);
      resolve({ status: code ?? 1, stdout, stderr, log });
    });
  });
}

// ---------- 任务处理 ----------
let outDir = '';
let currentChild = null; // 当前构建子进程，供强制取消时 SIGKILL
const CANCEL_FILE = path.join(ROOT, 'admin', 'data', 'cancel.json');
function loadCancel() { try { return JSON.parse(fs.readFileSync(CANCEL_FILE, 'utf8')); } catch (e) { return null; } }
function clearCancel() { try { fs.rmSync(CANCEL_FILE, { force: true }); } catch (e) {} }
function isCancelled(taskId) { const c = loadCancel(); return c && c.taskId === taskId; }
function killChild() { try { if (currentChild) { currentChild.kill('SIGKILL'); } } catch (e) {} }

async function handleTask(task) {
  console.log(`\n[packer-agent] 收到任务 ${task.id}：版本 ${task.version}，包类型 ${task.types.join(' / ')}`);
  outDir = path.join(ROOT, 'downloads', task.version);
  fs.mkdirSync(outDir, { recursive: true });

  applyVersion(task.version); // 统一短版本号写入三个 package.json + shared/version.json

  let okCount = 0, cancelled = false;
  for (const type of task.types) {
    if (isCancelled(task.id)) { cancelled = true; break; } // 强制取消：不再启动后续包
    const def = PKG_TYPES[type];
    const timeout = type === 'android-apk' ? 10 * 60 * 1000 : 8 * 60 * 1000;
    const step = { type, status: 'running', msg: '构建中…（' + (timeout / 60000) + ' 分钟超时保护）', log: '' };
    await report(task.id, [step]);
    try {
      const r = await runBuild(def.cwd, def.cmd, timeout);
      if (isCancelled(task.id)) throw new Error('已强制取消');
      step.log = (r.log || '').slice(-4000); // 回传最近日志，便于后台查看进度
      if (r.status !== 0) { const tail = (r.stderr || '').split('\n').slice(-12).join('\n'); throw new Error('构建退出码 ' + r.status + '\n' + tail); }
      // 各端实际产物在 realDir，复制到统一归档目录 downloads/<版本>/<平台>/ 再上传
      let artifact = def.artifact(task.version);
      let srcPath = path.join(def.realDir(), artifact);
      if (!fs.existsSync(srcPath) && type === 'android-apk') { const g = guessApkName(def.realDir(), task.version); if (g) { artifact = g; srcPath = path.join(def.realDir(), g); } }
      if (!fs.existsSync(srcPath)) throw new Error('未找到产物：' + srcPath);
      const archiveDir = def.outDir(outDir);
      fs.mkdirSync(archiveDir, { recursive: true });
      const archivePath = path.join(archiveDir, artifact);
      fs.copyFileSync(srcPath, archivePath);

      console.log('[packer-agent] 上传产物：' + artifact);
      const size = await uploadFile(artifact, archivePath);
      step.status = 'ok'; step.msg = '✓ ' + artifact + '（已归档 downloads/' + task.version + '/ 并上传服务器）'; step.uploaded = true; step.name = artifact; step.size = size;
      okCount++;
    } catch (e) {
      if (isCancelled(task.id)) { step.status = 'fail'; step.msg = '🛑 已强制取消'; }
      else { step.status = 'fail'; step.msg = String(e.message || e).slice(0, 600); }
      if (!step.log) step.log = String(e.message || e).slice(0, 4000);
    }
    await report(task.id, [step]);
    if (isCancelled(task.id)) { cancelled = true; killChild(); break; } // 当前包取消后立即停止
    // 单个包失败不中断整体任务：其余类型继续构建，避免一个失败导致其余卡死在 pending
  }

  clearCancel();
  await report(task.id, [], { finished: true, cancelled });
  console.log(`[packer-agent] 任务 ${task.id} ${cancelled ? '已被强制取消' : '完成'}，成功 ${okCount}/${task.types.length}（产物已上传服务器 downloads/）`);
}

// ---------- 主循环 ----------
async function main() {
  const agent = await api('/api/packer/agent/register', {
    method: 'POST', body: { name: NAME, os: process.platform, arch: process.arch },
  });
  console.log(`[packer-agent] 已注册到 ${SERVER}（${agent.agent ? agent.agent.name + ' / ' + agent.agent.os + ' ' + agent.agent.arch : ''}）`);
  console.log('[packer-agent] 开始轮询任务（Ctrl+C 退出）…');

  while (true) {
    try {
      const res = await api('/api/packer/agent/poll');
      if (res.task) {
        if (res.task.kind === 'upload') await handleUploadTask(res.task);
        else await handleTask(res.task);
      }
      await sendSnapshot();
    } catch (e) {
      console.error('[packer-agent] 轮询出错：', e.message);
    }
    await new Promise(r => setTimeout(r, INTERVAL));
  }
}

async function start() {
  try {
    if (await ensureToken()) { console.log('[packer-agent] 已就绪（复用缓存或新登录获取会话令牌）'); saveRc(); }
    else console.log('[packer-agent] 登录失败（服务端可能仍为旧明文格式），回退使用密码直连');
  } catch (e) {
    console.log('[packer-agent] 登录换取令牌失败：' + e.message + '（回退使用密码直连）');
  }
  await main();
}
start().catch(e => { console.error('[packer-agent] 启动失败：', e.message); process.exit(1); });
