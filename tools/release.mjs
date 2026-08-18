// 发布脚本：构建三端产物并作为 GitHub Release 附件上传。
// 用法：
//   node tools/release.mjs            # 按 package.json 的 version 发布（如 v1.0.0）
//   node tools/release.mjs 1.1.0      # 指定版本
//   node tools/release.mjs --replace  # 同名 Release 已存在时删除重建
//
// 构建产物统一集中到仓库根目录 release/（Cub3D-Editor-Setup.exe / Portable.exe / .apk），
// 上传时直接从 release/ 读取。该目录在 .gitignore 中忽略，不入库；
// 本脚本用 `gh` 把产物发布到 Releases，宣传页/说明书的「下载」按钮
// 会跳转到 releases/latest/download/<文件>。

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 某些环境下系统根 CA 未纳入 Node 默认信任库（如存在 HTTPS 拦截代理），
// 导致 electron-builder 下载 Electron 时报 “unable to verify the first certificate”。
// 让 Node 改用系统 CA 存储来修复。
process.env.NODE_OPTIONS = [process.env.NODE_OPTIONS, '--use-system-ca'].filter(Boolean).join(' ');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); // 脚本置于 tools/ 下，反推仓库根
const PC_DIR = path.join(ROOT, 'PC');
const AND_DIR = path.join(ROOT, 'Android');
const RELEASE_DIR = path.join(ROOT, 'release'); // 产物集中目录（不入库）
const REPO = 'yushichadao/Cub3D-Editor';

const args = process.argv.slice(2);
const replace = args.includes('--replace');
const versionArg = args.find(a => !a.startsWith('--'));
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const version = (versionArg || pkg.version).replace(/^v/, '');
const tag = `v${version}`;

function q(p) { return `"${p}"`; }
function run(cmd, cwd = ROOT) {
  console.log(`\n$ ${cmd}${cwd !== ROOT ? '  (cwd: ' + path.basename(cwd) + ')' : ''}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}
function globOne(baseDir, sub, re) {
  const dir = path.join(baseDir, sub);
  if (!fs.existsSync(dir)) return null;
  const f = fs.readdirSync(dir).find(n => re.test(n));
  return f ? path.join(dir, f) : null;
}
function releaseExists(t) {
  try { execSync(`gh release view ${t}`, { stdio: 'ignore' }); return true; }
  catch { return false; }
}
function tagExistsLocal(t) {
  return execSync(`git tag -l ${t}`, { cwd: ROOT }).toString().trim() === t;
}

// 1) 检查 gh 登录
try { run('gh auth status'); }
catch { console.error('❌ 请先运行 `gh auth login` 登录 GitHub CLI。'); process.exit(1); }

// 2) 同步共享资源
run('node tools/sync-shared.mjs');

// 3) 构建 PC 版（安装版 + 便携版）
if (!fs.existsSync(path.join(PC_DIR, 'node_modules'))) run('npm install --no-audit --no-fund', PC_DIR);
run('npm run dist', PC_DIR);

// 4) 构建 Android 版（release 签名 apk）
if (!fs.existsSync(path.join(AND_DIR, 'node_modules'))) run('npm install --no-audit --no-fund', AND_DIR);
run('npm run apk:release', AND_DIR);

// 5) 收集产物，统一复制到根目录 release/（集中存放）
const setupSrc = globOne(PC_DIR, 'dist', /^Cub3D-Editor-Setup-.*\.exe$/);
const portableSrc = globOne(PC_DIR, 'dist', /^Cub3D-Editor-Portable-.*\.exe$/);
const apkSrc = globOne(AND_DIR, 'dist', /^Cub3D-Editor-release-.*\.apk$/);
if (!setupSrc || !portableSrc || !apkSrc) {
  console.error('❌ 找不到构建产物，发布中止。');
  process.exit(1);
}
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cub3d-release-')); // 仅用于 NOTES.md
const artifacts = {
  'Cub3D-Editor-Setup.exe': setupSrc,
  'Cub3D-Editor-Portable.exe': portableSrc,
  [`Cub3D-Editor-release-${version}-universal.apk`]: apkSrc,
};
fs.mkdirSync(RELEASE_DIR, { recursive: true });
const assetPaths = [];
for (const [name, src] of Object.entries(artifacts)) {
  const dest = path.join(RELEASE_DIR, name);
  fs.copyFileSync(src, dest);
  assetPaths.push(dest);
  console.log(`✓ 已更新 release/${name}  (${(fs.statSync(dest).size / 1e6).toFixed(1)} MB)`);
}

// 6) 处理已存在的 Release / 标签
if (releaseExists(tag)) {
  if (!replace) {
    console.error(`❌ Release ${tag} 已存在。如需覆盖请加 --replace。`);
    process.exit(1);
  }
  run(`gh release delete ${tag} -y`);
}
if (replace) {
  try { run(`git push origin :refs/tags/${tag}`); } catch { /* 远程可能无此 tag */ }
}
if (tagExistsLocal(tag)) run(`git tag -d ${tag}`);

// 7) 打标签并推送
run(`git tag -a ${tag} -m ${q('Release ' + tag)}`);
run(`git push origin ${tag}`);

// 8) 创建 Release 并上传附件
const notesFile = path.join(tmp, 'NOTES.md');
fs.writeFileSync(notesFile,
  `Cub3D Editor ${version}\n\n` +
  `- \`Cub3D-Editor-Setup.exe\` — Windows 安装版\n` +
  `- \`Cub3D-Editor-Portable.exe\` — Windows 便携版（免安装）\n` +
  `- \`Cub3D-Editor-release-${version}-universal.apk\` — Android 安装包（release 签名）\n`);
run(`gh release create ${tag} --title ${q('Cub3D Editor ' + version)} --notes-file ${q(notesFile)} ${assetPaths.map(q).join(' ')}`);

// 9) 同步安装包到境内站点 downloads/ 镜像目录，并更新 versions.json
const dlDir = path.join(ROOT, 'downloads');
fs.mkdirSync(dlDir, { recursive: true });
const versions = { version: tag, assets: {} };
for (const [name, src] of Object.entries(artifacts)) {
  const dest = path.join(dlDir, name);
  fs.copyFileSync(src, dest);
  versions.assets[name] = fs.statSync(dest).size;
  console.log(`✓ 已同步 downloads/${name}  (${(versions.assets[name] / 1e6).toFixed(1)} MB)`);
}
fs.writeFileSync(path.join(dlDir, 'versions.json'), JSON.stringify(versions, null, 2) + '\n');
console.log(`✓ 已更新 downloads/versions.json (${tag})`);

// 10) 清理临时文件
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n✅ 已发布 ${tag}：${`https://github.com/${REPO}/releases/tag/${tag}`}`);
