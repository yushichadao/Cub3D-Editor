// 更新发布脚本：统一入口用自然语言写更新文档，生成/更新 downloads/update-doc.json，
// 并（可选）推送 GitHub Release 与国内站点 downloads/ 镜像 —— 两处远程同时更新可行。
//
// 用法：
//   node tools/publish-updates.mjs 2.3.0 "2026-09-15" force \
//        --pc-pkg "Cub3D-Editor-Setup-2.3.0-x64.exe" \
//        --and-pkg "Cub3D-Editor-release-2.3.0-universal.apk" \
//        --notes-pc "新增：... \n修复：..." \
//        --notes-and "新增：... \n优化：..." \
//        --status published            # 或 stopped（停止发布）
//        --github                       # 同时发布 GitHub Release（需 gh 登录 + release/ 产物）
//        --stop v2.2.1                  # 停止发布某个已存在版本（停止后客户端不再检测）
//        --repub v2.2.1                 # 重新发布某个版本
//        --del v2.2.1                   # 删除某个版本记录
//        --list                          # 列出当前 update-doc.json 全部版本
//   node tools/publish-updates.mjs 2.3.0 ... --notes-all "新增：一键全部相同内容"  # PC/Android 相同内容
//
// 更新文档要素：版本 / 发布日期 / 更新内容 / 更新类型。本脚本负责写 downloads/update-doc.json；
// 该文件同时上传到 GitHub（Release 附件）与国内站点（downloads/ 镜像，随仓库推送部署到
// https://cub3d-editor.cn/ 与备用 IP）。客户端更新弹窗按区域 IP 分流自动拉取最新版描述。
// 强制更新链由客户端解析：当前版本到目标版本路径上任一版本 type=force → 整体强制。

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOC_PATH = path.join(ROOT, 'downloads', 'update-doc.json');
const REPO = 'yushichadao/Cub3D-Editor';

function q(p){ return `"${p}"`; }
function run(cmd, cwd = ROOT){
  console.log(`\n$ ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

function loadDoc(){
  if(!fs.existsSync(DOC_PATH)) return { schema:1, updatedAt:null, versions:[] };
  return JSON.parse(fs.readFileSync(DOC_PATH, 'utf8'));
}
function saveDoc(doc){
  fs.writeFileSync(DOC_PATH, JSON.stringify(doc, null, 2) + '\n');
  console.log(`\n✓ 已写入 downloads/update-doc.json（${doc.versions.length} 条版本）`);
}
function cmp(a, b){
  const pa = String(a).split('.').map(Number), pb = String(b).split('.').map(Number);
  for(let i=0;i<3;i++){ if((pa[i]||0) !== (pb[i]||0)) return (pa[i]||0) > (pb[i]||0) ? 1 : -1; }
  return 0;
}
function parseNotes(text){
  if(!text) return [];
  return String(text).split('\n').map(s => s.replace(/^[•\-*\s]+/, '').trim()).filter(Boolean);
}

const args = process.argv.slice(2);
const doc = loadDoc();

// ---- 辅助操作：--list / --stop / --repub / --del ----
if(args.includes('--list')){
  doc.versions.slice().sort((a,b)=>cmp(b.version,a.version)).forEach(v => {
    console.log(`  ${v.status==='published'?'🟢':'⏹'} v${v.version}  ${v.date||''}  ${v.type==='force'?'强制':'可选'}  ${(v.notes.all||v.notes.pc||[]).length}条PC  ${(v.notes.all||v.notes.android||[]).length}条Android`);
  });
  process.exit(0);
}
for (const op of ['stop','repub','del']) {
  const i = args.indexOf('--' + op);
  if(i >= 0){
    const ver = args[i+1];
    const rec = doc.versions.find(x => x.version === ver);
    if(!rec){ console.error(`❌ 未找到 v${ver}`); process.exit(1); }
    if(op === 'del') doc.versions = doc.versions.filter(x => x.version !== ver);
    else rec.status = (op === 'stop') ? 'stopped' : 'published';
    saveDoc(doc);
    console.log(`✓ 已${op==='del'?'删除':(op==='stop'?'停止发布':'重新发布')} v${ver}`);
    process.exit(0);
  }
}

// ---- 新增 / 更新版本 ----
const versionArg = args.find(a => /^\d+\.\d+\.\d+$/.test(a));
const dateArg = args.find(a => /^\d{4}-\d{2}-\d{2}$/.test(a));
const typeArg = args.includes('force') ? 'force' : (args.includes('optional') ? 'optional' : 'optional');
const statusArg = args.includes('stopped') ? 'stopped' : 'published';
const targetsArg = args.includes('--cn-only') ? ['cn'] : (args.includes('--gh-only') ? ['github'] : ['github','cn']);
if(!versionArg){ console.error('❌ 缺少版本号（如 2.3.0）'); process.exit(1); }

function argVal(name){
  const i = args.indexOf(name);
  return i >= 0 ? args[i+1] : '';
}
const notesAll = argVal('--notes-all');
const notesPc = notesAll || argVal('--notes-pc');
const notesAnd = notesAll || argVal('--notes-and');
// 支持同一版本多个包（逗号分隔），如 --pc-pkg "a.exe,b.exe"
const pcPkgs = argVal('--pc-pkg').split(',').map(s=>s.trim()).filter(Boolean);
const andPkgs = argVal('--and-pkg').split(',').map(s=>s.trim()).filter(Boolean);

const notes = notesAll ? { all: parseNotes(notesAll) }
  : { pc: parseNotes(notesPc), android: parseNotes(notesAnd) };

function toAssetObjs(names){
  // 新 schema：assets 为对象数组 {name, kind}（与真实 downloads 一致：PC 安装版 + 便携版 + Android APK）
  return names.map(n => {
    let kind;
    if(n.endsWith('.exe')) kind = n.includes('Portable') ? '便携版 x64' : '安装版 x64';
    else kind = n.includes('arm64') ? 'APK arm64-v8a' : 'APK';
    return { name: n, kind };
  });
}

const rec = doc.versions.find(x => x.version === versionArg);
if(rec){
  if(dateArg) rec.date = dateArg;
  rec.type = typeArg; rec.status = statusArg;
  rec.targets = targetsArg;
  rec.notes = notes;
  if(pcPkgs.length){ rec.assets = rec.assets || {}; rec.assets.pc = toAssetObjs(pcPkgs); }
  if(andPkgs.length){ rec.assets = rec.assets || {}; rec.assets.android = toAssetObjs(andPkgs); }
  console.log(`✓ 已更新 v${versionArg}`);
} else {
  if(!pcPkgs.length || !andPkgs.length){
    console.error('❌ 发布前提：线上必须有 PC 与 Android 安装包，请提供 --pc-pkg 与 --and-pkg');
    process.exit(1);
  }
  doc.versions.push({
    version: versionArg,
    date: dateArg || nowLocal().slice(0,10),
    publishedAt: nowLocal(),   // 实际发布日期（系统时区自动记录）
    type: typeArg,
    status: statusArg,
    targets: targetsArg,
    notes: notes,
    assets: { pc: toAssetObjs(pcPkgs), android: toAssetObjs(andPkgs) }
  });
  console.log(`✓ 已新增 v${versionArg}`);
}
// 按系统时区记录实际发布时间（本地时间字符串 + 时区偏移）
function nowLocal(){
  const d = new Date();
  const tz = -d.getTimezoneOffset();
  const sign = tz >= 0 ? '+' : '-';
  const tzAbs = Math.abs(tz);
  const tzStr = sign + String(Math.floor(tzAbs/60)).padStart(2,'0') + ':' + String(tzAbs%60).padStart(2,'0');
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0')
    + 'T' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0') + ':' + String(d.getSeconds()).padStart(2,'0')
    + tzStr;
}
doc.updatedAt = nowLocal();
saveDoc(doc);

// ---- 可选：发布 GitHub Release ----
if(args.includes('--github')){
  const tag = 'v' + versionArg;
  try { run('gh auth status'); }
  catch { console.error('❌ 请先运行 `gh auth login`。'); process.exit(1); }
  const releaseDir = path.join(ROOT, 'release');
  const assets = [];
  pcPkgs.concat(andPkgs).forEach(p => {
    if(p && fs.existsSync(path.join(releaseDir, p))) assets.push(path.join(releaseDir, p));
  });
  const notesLines = (notes.all || notes.pc || []).map(s => '- ' + s).join('\n');
  const notesFile = path.join(ROOT, 'downloads', '_release-notes.md');
  fs.writeFileSync(notesFile, `Cub3D Editor ${versionArg}\n\n${notesLines}\n`);
  run(`gh release create ${tag} --title ${q('Cub3D Editor ' + versionArg)} --notes-file ${q(notesFile)} ${assets.map(q).join(' ')}`);
  run(`gh release upload ${tag} ${q(DOC_PATH)} --clobber`);
  fs.rmSync(notesFile, { force: true });
  console.log(`\n✅ 已发布 GitHub Release ${tag}（含安装包与 update-doc.json）`);
  console.log(`   国内站点：确认下载/部署后自动同步 downloads/update-doc.json 即可（见仓库 README 部署说明）`);
}

console.log(`\n✅ 更新文档已就绪：https://github.com/${REPO}/releases/latest（GitHub）与 downloads/（国内站点镜像）`);
