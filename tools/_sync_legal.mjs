// 把宣传网页法律页(assets/legal-i18n.js 的 window.LEGAL) 原封不动搬到三端
// (Web/PC/Android 的 index.html 内联 ZH_CN + 各自 language/*.js)。
// 用法: node tools/_sync_legal.mjs [--apply]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apply = process.argv.includes('--apply');

// 1) 解析权威源
const src = fs.readFileSync(path.join(ROOT, 'assets/legal-i18n.js'), 'utf8');
const m = src.match(/window\.LEGAL = (\{[\s\S]*?\});\s*$/m) || src.match(/window\.LEGAL = (\{[\s\S]*\});/);
if (!m) { console.error('无法解析 window.LEGAL'); process.exit(1); }
const LEGAL = JSON.parse(m[1]);

const FIELDS = ['tosLink', 'tosBody', 'disclaimerLink', 'disclaimerBody', 'privacyLink', 'privacyBody'];

// 2) 安全检查: 源文本不得含半角单引号(否则会破坏目标单引号字符串)
// 源文本可能含半角单引号, 会被 toSingleQuoted 转义为 \' 安全写入, 故仅提示
const warn = [];
for (const lang of Object.keys(LEGAL)) {
  for (const f of FIELDS) {
    const v = LEGAL[lang][f] || '';
    if (v.includes("'")) warn.push(`${lang}.${f}`);
  }
}
if (warn.length) console.log(`[info] 以下字段源文含半角单引号, 将以 \\' 转义写入: ${warn.join(', ')}`);

// 把纯文本转成单引号 JS 字符串字面量 (源为真实字符, 无转义)
function toSingleQuoted(v) {
  return v
    .replace(/\\/g, '\\\\')   // 反斜杠翻倍
    .replace(/'/g, "\\'")     // 单引号转义
    .replace(/"/g, '\\"')     // 双引号转义
    .replace(/\r?\n/g, '\\n');
}

// 匹配 field:'...' / field: '...' 直到第一个未转义的单引号
const fieldRe = (f) => new RegExp(`(${f}:\\s*')((?:\\\\.|[^'\\\\])*)(')`);

const ends = ['Web', 'PC', 'Android'];

// 3) 处理各端
for (const end of ends) {
  // 3a) index.html 内联 ZH_CN
  const htmlPath = path.join(ROOT, end, 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf8');
  const zh = LEGAL['zh-CN'];
  for (const f of FIELDS) {
    const re = fieldRe(f);
    if (!re.test(html)) { console.error(`[${end}/index.html] 未找到内联字段 ${f}`); continue; }
    html = html.replace(re, `$1${toSingleQuoted(zh[f] || '')}$3`);
  }
  if (apply) fs.writeFileSync(htmlPath, html);
  else { fs.writeFileSync(htmlPath + '.synctest.html', html); console.log(`[dry-run] ${end}/index.html 写入 .html.tmp 供检查`); }

  // 3b) language/*.js (8 语言)
  const langDir = path.join(ROOT, end, 'language');
  for (const lang of Object.keys(LEGAL)) {
    if (lang === 'zh-CN') continue;
    const lp = path.join(langDir, `${lang}.js`);
    if (!fs.existsSync(lp)) { console.error(`[${end}] 缺少语言文件 ${lang}.js`); continue; }
    let js = fs.readFileSync(lp, 'utf8');
    const pack = LEGAL[lang];
    for (const f of FIELDS) {
      const re = fieldRe(f);
      if (!re.test(js)) { console.error(`[${end}/${lang}.js] 未找到字段 ${f}`); continue; }
      js = js.replace(re, `$1${toSingleQuoted(pack[f] || '')}$3`);
    }
    if (apply) fs.writeFileSync(lp, js);
    else { fs.writeFileSync(lp + '.synctest.cjs', js); console.log(`[dry-run] ${end}/language/${lang}.js 写入 .cjs.tmp 供检查`); }
  }
}

if (apply) {
  console.log('已应用替换。');
} else {
  // 对临时文件做语法检查
  const { execSync } = await import('node:child_process');
  const cjsFiles = [];
  const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (e.name.endsWith('.synctest.cjs')) cjsFiles.push(p); } };
  walk(ROOT);
  let ok = 0, bad = 0;
  for (const tf of cjsFiles) {
    try { execSync(`node --check "${tf}"`, { stdio: 'pipe' }); ok++; }
    catch (e) { bad++; console.error('语法错误: ' + tf); console.error(e.stderr?.toString().split('\n')[0]); }
  }
  console.log(`dry-run 完成: ${ok} 个 JS 文件语法检查通过, ${bad} 个错误。临时文件已保留供人工核对(index.html.synctest.html 与 *.synctest.cjs), 确认后删除。`);
}

