#!/usr/bin/env node
// ===== 本地工具部署脚本（利用本地构建环境打包，自动部署到服务器）=====
// 适用：服务器未部署完整仓库/构建环境时，由本机（有 Node/SDK）打包，
//       再把产物上传到服务器 manager，并登记版本（境内分发，更新话术系统立即可见）。
//
// 用法（在仓库根目录或任意处，需 Node >=18）：
//   node deploy/deploy-local.mjs \
//     --server https://139.196.104.56/manager \
//     --user yushichadao --pass zich963yu \
//     --ver 1.3.0 \
//     --types pc-setup,pc-portable,android-apk \
//     --out release/1.3.0
//
// 说明：
//   --out 为本地构建产物根目录（packer 的 CUB3D_RELEASE_OUT）。脚本会递归查找其中的
//   .exe / .apk 文件，逐个上传到服务器 downloads/，并登记到版本 <ver>。
//   若未传 --out，脚本会先在本机执行构建（npm run dist:*），再收集产物。
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const args = process.argv.slice(2);
const opt = (k, def) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : def; };
const has = (k) => args.includes(k);

const SERVER = (opt('--server') || 'http://139.196.104.56/manager').replace(/\/$/, '');
const USER = opt('--user', 'yushichadao');
const PASS = opt('--pass', 'zich963yu');
const VER = opt('--ver') || '';
const TYPES = (opt('--types') || 'pc-setup,pc-portable,android-apk').split(',').map(s => s.trim()).filter(Boolean);
const OUT = opt('--out');
const NO_BUILD = has('--no-build');

if (!/^\d+\.\d+\.\d+$/.test(VER)) { console.error('✗ 请用 --ver 指定合法版本号，如 1.3.0'); process.exit(1); }

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
  const lg = await req('POST', '/api/login', { body: { user: USER, pass: PASS } });
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
    const up = await req('POST', '/api/upload', { token, body: form, isForm: true });
    if (!up.body || !up.body.ok) { console.error('  ✗ 上传失败 ' + path.basename(a) + '：' + (up.body && up.body.error || up.status)); process.exit(1); }
    names.push(path.basename(a));
    console.log('  ✓ ' + path.basename(a));
  }

  // 4) 登记版本（写入 update-doc.json，更新话术系统立即可见 = 境内分发）
  console.log('④ 登记版本 ' + VER + ' 到服务器');
  const reg = await req('POST', '/packer/api/register', { token, body: { version: VER, files: names.map(n => ({ name: n })) } });
  if (!reg.body || !reg.body.ok) { console.error('  ✗ 登记失败：' + (reg.body && reg.body.error || reg.status)); process.exit(1); }
  console.log('  ✓ ' + (reg.body.message || '已登记') + '（境内分发完成，更新话术系统已可见）');

  // 5) 境外 GitHub（可选）
  if (has('--github')) {
    console.log('⑤ 境外 GitHub Releases（需服务器配置 GH_TOKEN，由 /packer/api/distribute 处理）');
    console.warn('  提示：当前脚本通过 register 完成境内分发；境外请在管理后台「打包分发」页勾选 GitHub 后点分发，或后续扩展本脚本直连 GitHub API。');
  }

  console.log('\n✅ 本地部署完成：版本 ' + VER + ' 已上线境内分发。');
  console.log('   更新话术系统：' + SERVER.replace(/\/manager$/, '/') + '  管理后台发布页可立即看到该版本。');
})().catch(e => { console.error('部署异常：' + (e.message || e)); process.exit(1); });
