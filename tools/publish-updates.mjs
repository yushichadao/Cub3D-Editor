// 更新发布脚本：用自然语言（中文）写更新文档，自动翻译为多语言，
// 生成/更新 downloads/update-doc.json，并（可选）推送 GitHub Release 与国内站点镜像。
//
// 多语言话术结构（客户端按 currentLang 取桶）：
//   notes = {
//     all:     { "zh-CN": [...], "en": [...], "ja": [...], ... },
//     pc:      { "zh-CN": [...], ... },
//     android: { "zh-CN": [...], ... }
//   }
// 兼容旧格式：notes.all 直接是数组（渲染端按 zh-CN 兜底）。
//
// 用法：
//   node tools/publish-updates.mjs 2.3.0 "2026-09-15" force \
//        --pc-pkg "Cub3D-Editor-Setup-2.3.0-x64.exe" \
//        --and-pkg "Cub3D-Editor-release-2.3.0-universal.apk" \
//        --notes-pc "新增：... \n修复：..." \
//        --notes-and "新增：... \n优化：..." \
//        --status published            # 或 stopped（停止发布）
//        --github                       # 同时发布 GitHub Release（需 gh 登录）
//        --stop v2.2.1                  # 停止发布某个已存在版本
//        --repub v2.2.1                 # 重新发布某个版本
//        --del v2.2.1                   # 删除某个版本记录
//        --list                          # 列出当前 update-doc.json 全部版本
//        --no-translate                  # 仅写中文（不调百度翻译，离线可用）
//   node tools/publish-updates.mjs 2.3.0 ... --notes-all "新增：一键全部相同内容"
//
// 百度翻译凭证（百度翻译开放平台 fanyi-api.baidu.com）：
//   凭证集中在仓库内 secrets/.env（BAIDU_APPID / BAIDU_KEY），真实值不入库；
//   也可用 --baidu-appid / --baidu-key 或环境变量覆盖。代码内不再硬编码真实凭证。

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

// 密钥集中（与 admin/server.mjs 同款轻量 loader）：统一从仓库内 secrets/.env 读取。
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT0 = path.resolve(__dirname, '..');
(function loadSecretsEnv() {
  const envPath = path.join(ROOT0, 'secrets', '.env');
  if (!fs.existsSync(envPath)) return;
  try {
    for (const raw of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq < 0) continue;
      const k = line.slice(0, eq).trim();
      let v = line.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      if (!(k in process.env)) process.env[k] = v;
    }
  } catch {}
})();

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOC_PATH = path.join(ROOT, 'downloads', 'update-doc.json');
const REPO = 'yushichadao/Cub3D-Editor';

const args = process.argv.slice(2); // 提前声明，供下方 getArg / 百度密钥解析使用

const BAIDU_APPID = getArg('--baidu-appid') || process.env.BAIDU_TRANSLATE_APP_ID || '';
const BAIDU_KEY   = getArg('--baidu-key')   || process.env.BAIDU_TRANSLATE_KEY    || '';

// 工程统一语言键（9 种）：zh-CN 为源/内置，其余 8 种由百度翻译生成
// 注意：百度翻译目标码日语为 'jp'（非 ISO 的 'ja'），韩语 'kor'，西语 'spa'，法语 'fra'，阿语 'ara'，繁中 'cht'
const BAIDU_TO = { en:'en', ja:'jp', ko:'kor', ru:'ru', es:'spa', fr:'fra', ar:'ara', 'zh-TW':'cht' };
const TARGET_LANGS = Object.keys(BAIDU_TO);

async function baiduTranslate(text, to){
  if (!BAIDU_APPID || !BAIDU_KEY) {
    throw new Error('百度翻译未配置：请在 secrets/.env 设置 BAIDU_APPID / BAIDU_KEY（或使用 --baidu-appid/--baidu-key 参数）');
  }
  const from = 'zh';
  const salt = String(Math.floor(Math.random() * 1e9));
  const sign = crypto.createHash('md5').update(BAIDU_APPID + text + salt + BAIDU_KEY, 'utf8').digest('hex');
  const url = 'https://fanyi-api.baidu.com/api/trans/vip/translate'
    + '?q=' + encodeURIComponent(text)
    + '&from=' + from + '&to=' + to
    + '&appid=' + encodeURIComponent(BAIDU_APPID)
    + '&salt=' + salt + '&sign=' + sign;
  const res = await fetch(url);
  const data = await res.json();
  if (data.error_code) throw new Error('百度翻译错误 ' + data.error_code + ': ' + data.error_msg);
  if (!Array.isArray(data.trans_result) || !data.trans_result.length) throw new Error('百度翻译返回为空');
  return data.trans_result.map(r => r.dst).join('');
}
async function translateItems(items, lang){
  const to = BAIDU_TO[lang];
  const out = [];
  for (const it of items){
    try { out.push(await baiduTranslate(it, to)); }
    catch (e) { console.warn(`  ⚠ 翻译 ${lang} 失败（“${it.slice(0,12)}…”）：回退中文`); out.push(it); }
  }
  return out;
}
async function buildLangBuckets(zhItems){
  const buckets = { 'zh-CN': zhItems.slice() };
  if (args.includes('--no-translate')) { console.log('（--no-translate：跳过百度翻译，仅保留中文）'); return buckets; }
  for (const lang of TARGET_LANGS){
    process.stdout.write(`  翻译 ${lang} …`);
    buckets[lang] = await translateItems(zhItems, lang);
    console.log(' ✓');
  }
  return buckets;
}

function q(p){ return `"${p}"`; }
function run(cmd, cwd = ROOT){ console.log(`\n$ ${cmd}`); execSync(cmd, { cwd, stdio: 'inherit' }); }
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
// 从新/旧结构取某平台的“语言分桶”（兼容旧版数组）
function bucketOf(notes, platform){
  if (!notes) return null;
  return notes[platform] || notes.all || notes['zh-CN'] || notes['cn'] || null;
}
function zhItemsOf(notes, platform){
  const b = bucketOf(notes, platform);
  if (!b) return [];
  if (Array.isArray(b)) return b;
  return b['zh-CN'] || b.all || [];
}
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
function getArg(name){
  const i = args.indexOf(name);
  return i >= 0 ? args[i+1] : '';
}

const doc = loadDoc();

// ---- 辅助操作：--list / --stop / --repub / --del ----
if(args.includes('--list')){
  doc.versions.slice().sort((a,b)=>cmp(b.version,a.version)).forEach(v => {
    const pc = zhItemsOf(v.notes, 'pc').length;
    const and = zhItemsOf(v.notes, 'android').length;
    const langs = Object.keys(bucketOf(v.notes,'all') || {}).length;
    console.log(`  ${v.status==='published'?'🟢':'⏹'} v${v.version}  ${v.date||''}  ${v.type==='force'?'强制':'可选'}  PC:${pc} Android:${and} 语言:${langs}种`);
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
const typeArg = args.includes('force') ? 'force' : 'optional';
const statusArg = args.includes('stopped') ? 'stopped' : 'published';
const targetsArg = args.includes('--cn-only') ? ['cn'] : (args.includes('--gh-only') ? ['github'] : ['github','cn']);
if(!versionArg){ console.error('❌ 缺少版本号（如 2.3.0）'); process.exit(1); }

const notesAll = getArg('--notes-all');
const notesPc = notesAll || getArg('--notes-pc');
const notesAnd = notesAll || getArg('--notes-and');
const pcPkgs = getArg('--pc-pkg').split(',').map(s=>s.trim()).filter(Boolean);
const andPkgs = getArg('--and-pkg').split(',').map(s=>s.trim()).filter(Boolean);

const zhAll = parseNotes(notesAll);
const zhPc = parseNotes(notesPc);
const zhAnd = parseNotes(notesAnd);

function toAssetObjs(names){
  return names.map(n => {
    let kind;
    if(n.endsWith('.exe')) kind = n.includes('Portable') ? '便携版 x64' : '安装版 x64';
    else kind = n.includes('arm64') ? 'APK arm64-v8a' : 'APK';
    return { name: n, kind };
  });
}

async function main(){
  let notes;
  if (notesAll) {
    console.log('多语言翻译（源=中文 zh-CN）：');
    notes = { all: await buildLangBuckets(zhAll) };
  } else {
    notes = {};
    if (zhPc.length){ console.log('多语言翻译 PC（源=中文 zh-CN）：'); notes.pc = await buildLangBuckets(zhPc); }
    if (zhAnd.length){ console.log('多语言翻译 Android（源=中文 zh-CN）：'); notes.android = await buildLangBuckets(zhAnd); }
    if (!notes.pc && !notes.android){ console.error('❌ 至少要提供 --notes-all 或 --notes-pc / --notes-and 之一'); process.exit(1); }
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
      publishedAt: nowLocal(),
      type: typeArg, status: statusArg, targets: targetsArg,
      notes: notes,
      assets: { pc: toAssetObjs(pcPkgs), android: toAssetObjs(andPkgs) }
    });
    console.log(`✓ 已新增 v${versionArg}`);
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
    const notesLines = zhItemsOf(notes, 'all').concat(zhItemsOf(notes,'pc')).map(s => '- ' + s).join('\n');
    const notesFile = path.join(ROOT, 'downloads', '_release-notes.md');
    fs.writeFileSync(notesFile, `Cub3D Editor ${versionArg}\n\n${notesLines}\n`);
    run(`gh release create ${tag} --title ${q('Cub3D Editor ' + versionArg)} --notes-file ${q(notesFile)} ${assets.map(q).join(' ')}`);
    run(`gh release upload ${tag} ${q(DOC_PATH)} --clobber`);
    fs.rmSync(notesFile, { force: true });
    console.log(`\n✅ 已发布 GitHub Release ${tag}`);
  }
  if (args.includes('--pages')) {
    console.log('\n---- 核对境外 GitHub Pages 更新源 ----');
    run(`node ${q(path.join(ROOT, 'tools', 'publish-pages.mjs'))}`);
  }
  console.log(`\n✅ 更新文档已就绪：https://github.com/${REPO}/releases/latest 与 downloads/（国内站点镜像）`);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
