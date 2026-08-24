#!/usr/bin/env node
// ===== 本地工具部署脚本（利用本地构建环境打包，自动部署到服务器）=====
// 适用：服务器未部署完整仓库/构建环境时，由本机（有 Node/SDK）打包，
//       再把产物上传到服务器 admin，并登记版本（境内分发，更新话术系统立即可见）。
//
// 用法（在仓库根目录或任意处，需 Node >=18）：
//   node deploy/deploy-local.mjs \
//     --server https://139.196.104.56/admin \
//     --user yushichadao --pass zich963yu \
//     --ver 1.3.0 \
//     --types pc-setup,pc-portable,android-apk \
//     --out release/1.3.0 \
//     --github --web \
//     --gh-token ghp_xxx --gh-repo cub3d-editor/cub3d-editor
//
// 说明：
//   --out 为本地构建产物根目录（packer 的 CUB3D_RELEASE_OUT）。脚本会递归查找其中的
//   .exe / .apk 文件，逐个上传到服务器 downloads/，并登记到版本 <ver>（境内分发）。
//   若未传 --out，脚本会先在本机执行构建（npm run dist:*），再收集产物。
//
//   --github  把产物上传到境外 GitHub Releases（需 GH_TOKEN，可用 --gh-token 或环境变量 GH_TOKEN 传入，
//             repo 用 --gh-repo 或环境变量 GH_REPO，默认 cub3d-editor/cub3d-editor，tag = v<ver>）。
//   --web     发布 Web 端：更新 web/index.html 的 BOOTV（长序号）+ web/version.txt，
//             并把 web/ 与 downloads/ 一起 git push origin main（触发 GitHub Pages）。
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const args = process.argv.slice(2);
const opt = (k, def) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : def; };
const has = (k) => args.includes(k);

const SERVER = (opt('--server') || 'http://139.196.104.56/admin').replace(/\/$/, '');
const USER = opt('--user', 'yushichadao');
const PASS = opt('--pass', 'zich963yu');
const VER = opt('--ver') || '';
const TYPES = (opt('--types') || 'pc-setup,pc-portable,android-apk').split(',').map(s => s.trim()).filter(Boolean);
const OUT = opt('--out');
const NO_BUILD = has('--no-build');
const DO_GITHUB = has('--github');
const DO_WEB = has('--web');
const GH_TOKEN = opt('--gh-token') || process.env.GH_TOKEN || '';
const GH_REPO = opt('--gh-repo') || process.env.GH_REPO || 'cub3d-editor/cub3d-editor';

if (!/^\d+\.\d+\.\d+$/.test(VER)) { console.error('✗ 请用 --ver 指定合法版本号，如 1.3.0'); process.exit(1); }
if (DO_GITHUB && !GH_TOKEN) { console.error('✗ 启用 --github 但缺少 GH_TOKEN（用 --gh-token 或环境变量 GH_TOKEN 传入）'); process.exit(1); }

// PC / Android 构建命令（与 packerRouter PKG_TYPES 对齐）
const BUILD = {
  'pc-setup': { cwd: 'PC', cmd: ['npm', ['run', 'dist:setup']] },
  'pc-portable': { cwd: 'PC', cmd: ['npm', ['run', 'dist:portable']] },
  'android-apk': { cwd: 'Android', cmd: ['npm', ['run', 'apk:release']] },
};

async function req(method, p, { token, body, isForm } = {}) {
  const headers = {};
  if (token) headers['X-Admin-Token'] = token;
  const init = { method, headers };
  if (body) {
    if (isForm) init.body = body;
    else { headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(body); }
  }
  const r = await fetch(SERVER + p, init);
  const text = await r.text();
  let json; try { json = JSON.parse(text); } catch (e) { json = { raw: text }; }
  return { status: r.status, body: json };
}

function collectArtifacts(dir) {
  const out = [];
  (function walk(d) {
    let ents; try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
    for (const e of ents) {
      const fp = path.join(d, e.name);
      if (e.isDirectory()) walk(fp);
      else if (/\.(exe|apk)$/i.test(e.name)) out.push(fp);
    }
  })(dir);
  return out;
}

(async () => {
  // 1) 登录拿 token
  console.log('① 登录服务器 ' + SERVER);
  const lg = await req('POST', '/admin/api/portal/login', { body: { user: USER, pass: PASS } });
  if (!lg.body || !lg.body.ok) { console.error('✗ 登录失败：' + (lg.body && lg.body.error || lg.status)); process.exit(1); }
  const token = PASS;
  console.log('  ✓ 登录成功');

  let artifacts = [];
  if (OUT) {
    console.log('② 从本地构建产物目录收集安装包：' + OUT);
    artifacts = collectArtifacts(OUT);
    if (!artifacts.length) { console.error('✗ 在 ' + OUT + ' 未找到任何 .exe/.apk'); process.exit(1); }
  } else if (NO_BUILD) {
    console.error('✗ 未指定 --out 且未构建，无法收集产物'); process.exit(1);
  } else {
    console.log('② 本机执行构建：' + TYPES.join(', '));
    const outDir = path.join(ROOT, 'release', VER);
    fs.mkdirSync(outDir, { recursive: true });
    for (const t of TYPES) {
      const b = BUILD[t]; if (!b) { console.warn('  ⚠ 未知类型 ' + t + '，跳过'); continue; }
      console.log('  ▸ 构建 ' + t + '（' + b.cwd + '）…');
      const r = spawnSync(b.cmd[0], b.cmd[1], { cwd: path.join(ROOT, b.cwd), env: { ...process.env, CUB3D_RELEASE_OUT: outDir }, stdio: 'inherit' });
      if (r.status !== 0) { console.error('  ✗ ' + t + ' 构建失败（退出码 ' + r.status + '），请检查本地构建环境'); process.exit(1); }
    }
    artifacts = collectArtifacts(outDir);
    if (!artifacts.length) { console.error('✗ 构建完成但未找到产物，请检查构建输出路径'); process.exit(1); }
  }
  console.log('  找到 ' + artifacts.length + ' 个安装包：');
  artifacts.forEach(a => console.log('    - ' + path.basename(a) + '  (' + (fs.statSync(a).size / 1048576).toFixed(1) + ' MB)'));

  // 3) 上传到服务器 downloads/
  console.log('③ 上传到服务器 downloads/');
  const names = [];
  for (const a of artifacts) {
    const form = new FormData();
    form.append('files', new Blob([await fsp.readFile(a)], { type: 'application/octet-stream' }), path.basename(a));
    const up = await req('POST', '/admin/api/release/upload', { token, body: form, isForm: true });
    if (!up.body || !up.body.ok) { console.error('  ✗ 上传失败 ' + path.basename(a) + '：' + (up.body && up.body.error || up.status)); process.exit(1); }
    names.push(path.basename(a));
    console.log('  ✓ ' + path.basename(a));
  }

  // 4) 登记版本（写入 update-doc.json，更新话术系统立即可见 = 境内分发）
  console.log('④ 登记版本 ' + VER + ' 到服务器');
  const reg = await req('POST', '/admin/api/packer/register', { token, body: { version: VER, files: names.map(n => ({ name: n })) } });
  if (!reg.body || !reg.body.ok) { console.error('  ✗ 登记失败：' + (reg.body && reg.body.error || reg.status)); process.exit(1); }
  console.log('  ✓ ' + (reg.body.message || '已登记') + '（境内分发完成，更新话术系统已可见）');

  // 5) 境外 GitHub Releases（可选）
  if (DO_GITHUB) {
    console.log('⑤ 境外 GitHub Releases（repo=' + GH_REPO + '，tag=v' + VER + '）');
    try {
      await ghPublish(artifacts, 'v' + VER);
      console.log('  ✓ 境外 GitHub Releases 发布完成');
    } catch (e) {
      console.error('  ✗ 境外 GitHub 发布失败：' + (e.message || e));
      process.exit(1);
    }
  }

  // 6) Web 端自动发布（可选）：更新 BOOTV + version.txt，并 git push 触发 GitHub Pages
  if (DO_WEB) {
    console.log('⑥ Web 端自动发布（更新 BOOTV + git push origin main）');
    try {
      await webPublish();
      console.log('  ✓ Web 端已发布（GitHub Pages 将在数分钟内更新）');
    } catch (e) {
      console.error('  ✗ Web 端发布失败：' + (e.message || e));
      process.exit(1);
    }
  }

  console.log('\n✅ 本地部署完成：版本 ' + VER + ' 已上线' +
    (DO_GITHUB ? ' 境内+境外分发' : ' 境内分发') + (DO_WEB ? '，Web 端已发布' : '') + '。');
  console.log('   更新话术系统：' + SERVER + '/  管理后台发布页可立即看到该版本。');
})().catch(e => { console.error('部署异常：' + (e.message || e)); process.exit(1); });

/* ===== 境外 GitHub Releases 发布（与后端 packerRouter 同一套 API） ===== */
async function ghReq(method, url, { body, isBinary } = {}) {
  const headers = { 'Authorization': 'Bearer ' + GH_TOKEN, 'User-Agent': 'cub3d-packer', 'Accept': 'application/vnd.github+json' };
  const init = { method, headers };
  if (body) {
    if (isBinary) { init.body = body; headers['Content-Type'] = 'application/octet-stream'; }
    else { headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(body); }
  }
  const r = await fetch(url, init);
  const text = await r.text();
  let json; try { json = JSON.parse(text); } catch (e) { json = { raw: text }; }
  return { status: r.status, body: json };
}

async function ghPublish(files, tag) {
  // 5.1 取得或创建 release
  let rel = await ghReq('GET', `https://api.github.com/repos/${GH_REPO}/releases/tags/${tag}`);
  if (rel.status === 404) {
    rel = await ghReq('POST', `https://api.github.com/repos/${GH_REPO}/releases`, {
      body: { tag_name: tag, name: tag, body: `Cub3D Editor ${tag}`, draft: false, prerelease: false }
    });
  }
  if (!rel.body || !rel.body.id) throw new Error('无法获取/创建 release（' + rel.status + ' ' + (rel.body && rel.body.message || '') + '）');
  const relId = rel.body.id;
  const existing = new Set((rel.body.assets || []).map(a => a.name));

  // 5.2 逐个上传资产（已存在则先删后传）
  for (const a of files) {
    const name = path.basename(a);
    if (existing.has(name)) {
      const old = rel.body.assets.find(x => x.name === name);
      await ghReq('DELETE', `https://api.github.com/repos/${GH_REPO}/releases/assets/${old.id}`);
      console.log('    覆盖已存在资产 ' + name);
    }
    const buf = await fsp.readFile(a);
    const up = await ghReq('POST',
      `https://api.github.com/repos/${GH_REPO}/releases/${relId}/assets?name=${encodeURIComponent(name)}`,
      { body: buf, isBinary: true });
    if (up.status < 200 || up.status >= 300) throw new Error('上传 ' + name + ' 失败（' + up.status + ' ' + (up.body && up.body.message || '') + '）');
    console.log('    ✓ ' + name);
  }
}

/* ===== Web 端自动发布 ===== */
function todayBOOTV() {
  const d = new Date();
  const p = x => String(x).padStart(2, '0');
  return '' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate());
}

async function webPublish() {
  const bootv = todayBOOTV();
  const idx = path.join(ROOT, 'web', 'index.html');
  let s = await fsp.readFile(idx, 'utf8');
  s = s.replace(/<meta name="bootv" content="\d+">/, `<meta name="bootv" content="${bootv}">`);
  s = s.replace(/const BOOTV = '\d+';/, `const BOOTV = '${bootv}';`);
  await fsp.writeFile(idx, s, 'utf8');
  await fsp.writeFile(path.join(ROOT, 'web', 'version.txt'), bootv, 'utf8');

  const git = (...a) => {
    const r = spawnSync('git', a, { cwd: ROOT, stdio: 'inherit' });
    if (r.status !== 0) throw new Error('git ' + a.join(' ') + ' 失败（退出码 ' + r.status + '）');
  };
  git('add', 'web', 'downloads');
  git('commit', '-m', `chore: publish web bootv ${bootv} + release ${VER}`);
  git('push', 'origin', 'main');
}
