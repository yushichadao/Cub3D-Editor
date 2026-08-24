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
import { spawnSync } from 'child_process';

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
const PASS = String(arg('pass', process.env.CUB3D_ADMIN_PASS || ''));
const NAME = String(arg('name', '本机打包代理'));
const INTERVAL = parseInt(arg('interval', '5000'), 10);
const CHUNK = 8 * 1024 * 1024; // 上传分块 8MB（避开 Nginx body 限制）

if (!PASS) {
  console.error('[packer-agent] 缺少管理后台密码：--pass <密码>（或环境变量 CUB3D_ADMIN_PASS）');
  process.exit(2);
}
const TOKEN = PASS; // 后台令牌即当前密码

// ---------- 包类型定义（与服务器 packerRouter 保持一致） ----------
const PKG_TYPES = {
  'pc-setup': { label: 'PC 安装版', cwd: path.join(ROOT, 'PC'), cmd: ['run', 'dist:setup'],
    artifact: (v) => `Cub3D-Editor-Setup-${v}-x64.exe`, outDir: (out) => path.join(out, 'PC', 'dist') },
  'pc-portable': { label: 'PC 便携版', cwd: path.join(ROOT, 'PC'), cmd: ['run', 'dist:portable'],
    artifact: (v) => `Cub3D-Editor-Portable-${v}-x64.exe`, outDir: (out) => path.join(out, 'PC', 'dist') },
  'android-apk': { label: 'Android APK', cwd: path.join(ROOT, 'Android'), cmd: ['run', 'apk:release'],
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
  const r = await fetch(SERVER + pathname, init);
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

function runBuild(cwd, cmdArgs) {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  console.log('[packer-agent] 构建：npm ' + cmdArgs.join(' ') + ' @ ' + cwd);
  return spawnSync(npm, cmdArgs, { cwd, env: { ...process.env, CUB3D_RELEASE_OUT: outDir }, stdio: 'pipe', timeout: 40 * 60 * 1000 });
}

// ---------- 任务处理 ----------
let outDir = '';
async function handleTask(task) {
  console.log(`\n[packer-agent] 收到任务 ${task.id}：版本 ${task.version}，包类型 ${task.types.join(' / ')}`);
  outDir = path.join(ROOT, 'release', task.version);
  fs.mkdirSync(outDir, { recursive: true });

  applyVersion(task.version); // 统一短版本号写入三个 package.json + shared/version.json

  let okCount = 0;
  for (const type of task.types) {
    const def = PKG_TYPES[type];
    const step = { type, status: 'running', msg: '构建中…' };
    await report(task.id, [step]);
    try {
      const r = runBuild(def.cwd, def.cmd);
      if (r.error) throw r.error;
      if (r.status !== 0) { const tail = (Buffer.isBuffer(r.stderr) ? r.stderr.toString() : '').split('\n').slice(-12).join('\n'); throw new Error('构建退出码 ' + r.status + '\n' + tail); }
      const dir = def.outDir(outDir);
      let artifact = def.artifact(task.version);
      let artifactPath = path.join(dir, artifact);
      if (!fs.existsSync(artifactPath) && type === 'android-apk') { const g = guessApkName(dir, task.version); if (g) { artifact = g; artifactPath = path.join(dir, g); } }
      if (!fs.existsSync(artifactPath)) throw new Error('未找到产物：' + artifactPath);

      console.log('[packer-agent] 上传产物：' + artifact);
      const size = await uploadFile(artifact, artifactPath);
      step.status = 'ok'; step.msg = '✓ ' + artifact + '（已上传服务器）'; step.uploaded = true; step.name = artifact; step.size = size;
      okCount++;
    } catch (e) { step.status = 'fail'; step.msg = String(e.message || e).slice(0, 600); }
    await report(task.id, [step]);
    if (step.status === 'fail') break;
  }

  await report(task.id, [], { finished: true });
  console.log(`[packer-agent] 任务 ${task.id} 完成，成功 ${okCount}/${task.types.length}（产物已上传服务器 downloads/）`);
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
      if (res.task) await handleTask(res.task);
    } catch (e) {
      console.error('[packer-agent] 轮询出错：', e.message);
    }
    await new Promise(r => setTimeout(r, INTERVAL));
  }
}

main().catch(e => { console.error('[packer-agent] 启动失败：', e.message); process.exit(1); });
