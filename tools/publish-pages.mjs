// GitHub Pages 更新源核对 / 同步脚本：
// 境外更新源由 .github/workflows/pages.yml 从 main 自动构建部署（Pages build_type=workflow），
// downloads/update-doc.json 等元数据随 main 推送自动上线：
//   https://yushichadao.github.io/Cub3D-Editor/downloads/update-doc.json
// 本脚本核对「本地 downloads/ → 远端 main → 线上 Pages」三者是否一致，并支持触发重部署。
//
// 用法：
//   node tools/publish-pages.mjs                 # 核对三者一致性
//   node tools/publish-pages.mjs --dispatch      # 线上落后于 main 时触发 workflow 重部署
//   node tools/publish-updates.mjs ... --pages   # 发布版本后调用本脚本核对
//
// 前置条件：gh 已登录（gh auth login）。
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOCAL = path.join(ROOT, 'downloads', 'update-doc.json');
const REPO = 'yushichadao/Cub3D-Editor';
const [OWNER, REPO_NAME] = REPO.split('/');
const PAGES_URL = 'https://' + OWNER + '.github.io/' + REPO_NAME + '/downloads/update-doc.json';
const RAW_URL = 'https://raw.githubusercontent.com/' + REPO + '/main/downloads/update-doc.json';
const args = process.argv.slice(2);

function sh(cmd, cwd = ROOT){ return execSync(cmd, { cwd, encoding: 'utf8' }).trim(); }

try { sh('gh auth status'); }
catch { console.error('❌ 请先运行 `gh auth login` 登录 GitHub CLI。'); process.exit(1); }

if (!fs.existsSync(LOCAL)) { console.error('❌ 缺少 downloads/update-doc.json'); process.exit(1); }
const localTxt = fs.readFileSync(LOCAL, 'utf8');

async function get(url){
  try {
    const r = await fetch(url, { cache: 'no-store' });
    return r.ok ? await r.text() : null;
  } catch { return null; }
}

const [liveTxt, mainTxt] = await Promise.all([get(PAGES_URL), get(RAW_URL)]);
const norm = s => (s || '').replace(/\s+/g, '');
const localOk = norm(localTxt);
const mainOk = norm(mainTxt || '');
const liveOk = norm(liveTxt || '');

console.log('本地 downloads/update-doc.json : ' + (localOk ? '存在' : '缺失'));
console.log('远端 main (raw.github)         : ' + (mainOk ? (mainOk === localOk ? '与本地一致' : '与本地不一致（未推送）') : '获取失败'));
console.log('线上 Pages（境外源）           : ' + (liveOk ? (liveOk === mainOk ? '与 main 一致' : '落后于 main') : '404 / 获取失败'));
console.log('境外源地址: ' + PAGES_URL);

if (mainOk && mainOk !== localOk) {
  console.log('\n⚠️ 本地更新文档尚未推送到 main，境外源不会更新。请提交并推送：');
  console.log('   git add downloads/update-doc.json');
  console.log('   git commit -m "chore: sync update-doc"');
  console.log('   git push origin main');
  console.log('   推送后 pages.yml 工作流会自动重建部署（约 1-2 分钟）。');
} else if (liveOk && liveOk !== mainOk) {
  console.log('\n⚠️ main 已更新但 Pages 线上仍是旧内容。');
  if (args.includes('--dispatch')) {
    sh('gh workflow run pages.yml');
    console.log('✓ 已触发 gh workflow run pages.yml，等待自动部署（约 1-2 分钟）。');
  } else {
    console.log('   可运行 `node tools/publish-pages.mjs --dispatch` 触发重部署，或稍等自动构建。');
  }
} else if (liveOk) {
  console.log('\n✅ 境外更新源已同步（本地 = main = Pages）。');
} else {
  console.log('\n❌ 线上 Pages 未提供 update-doc.json。请确认：');
  console.log('   1) downloads/ 已推送 main；');
  console.log('   2) 仓库 Settings → Pages 已启用（Source: GitHub Actions）；');
  console.log('   3) .github/workflows/pages.yml 构建成功（含 downloads 复制步骤）。');
}
