// 校验 dry-run 生成的 .synctest.cjs / index.html.synctest.html 中法律字段是否与 assets/legal-i18n.js 一致
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = fs.readFileSync(path.join(ROOT, 'assets/legal-i18n.js'), 'utf8');
const m = src.match(/window\.LEGAL = (\{[\s\S]*?\});\s*$/m) || src.match(/window\.LEGAL = (\{[\s\S]*\});/);
const LEGAL = JSON.parse(m[1]);
const FIELDS = ['tosLink', 'tosBody', 'disclaimerLink', 'disclaimerBody', 'privacyLink', 'privacyBody'];

function unescape(s) {
  return s.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
}
function extract(fileText, field) {
  const re = new RegExp(`(${field}:\\s*')((?:\\\\.|[^'\\\\])*)(')`);
  const mm = fileText.match(re);
  return mm ? unescape(mm[2]) : null;
}

let total = 0, mismatch = 0;
for (const end of ['Web', 'PC', 'Android']) {
  // index.html (zh-CN)
  const htmlTmp = path.join(ROOT, end, 'index.html');
  {
    const t = fs.readFileSync(htmlTmp, 'utf8');
    for (const f of FIELDS) {
      total++;
      const got = extract(t, f);
      const exp = LEGAL['zh-CN'][f] || '';
      if (got !== exp) { mismatch++; console.error(`MISMATCH ${end}/index.html zh-CN.${f}`); }
    }
  }
  // language files
  const langDir = path.join(ROOT, end, 'language');
  for (const lang of Object.keys(LEGAL)) {
    if (lang === 'zh-CN') continue;
    const tf = path.join(langDir, `${lang}.js`);
    const t = fs.readFileSync(tf, 'utf8');
    for (const f of FIELDS) {
      total++;
      const got = extract(t, f);
      const exp = LEGAL[lang][f] || '';
      if (got !== exp) { mismatch++; console.error(`MISMATCH ${end}/${lang}.js ${f}`); }
    }
  }
}
console.log(`校验完成: 共 ${total} 字段, ${mismatch} 处不一致。`);
