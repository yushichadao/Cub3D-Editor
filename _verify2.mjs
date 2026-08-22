import fs from 'fs';
function loadLegal() {
  let s = fs.readFileSync('assets/legal-i18n.js', 'utf8').replace(/\/\/.*$/gm, '');
  return eval('(' + s.match(/=\s*(\{[\s\S]*\})\s*;?\s*$/)[1] + ')');
}
const LEGAL = loadLegal();
function raw(content, field) {
  const m = content.match(new RegExp(field + "\\s*:\\s*'((?:\\\\.|[^'])*)'"));
  return m ? m[1] : null;
}
function unesc(s) { try { return eval("'" + s + "'"); } catch (e) { return '␛ERR␛'; } }

const ends = ['Web', 'PC', 'Android'];
let mismatch = 0, total = 0;
const langMap = { 'zh-CN': 'ZH_CN', en: 'en', ja: 'ja', ko: 'ko', ru: 'ru', es: 'es', fr: 'fr', 'zh-TW': 'zh-TW', ar: 'ar' };
for (const end of ends) {
  const c = fs.readFileSync(`${end}/index.html`, 'utf8');
  for (const f of ['tosBody', 'disclaimerBody', 'privacyBody']) {
    total++;
    if (unesc(raw(c, f)) !== LEGAL['zh-CN'][f]) { mismatch++; console.log(`MISMATCH ${end}/index.html ZH_CN.${f}`); }
  }
}
for (const end of ends) {
  for (const [key, file] of Object.entries(langMap)) {
    if (key === 'zh-CN') continue;
    const c = fs.readFileSync(`${end}/language/${file}.js`, 'utf8');
    for (const f of ['tosBody', 'disclaimerBody', 'privacyBody']) {
      total++;
      if (unesc(raw(c, f)) !== LEGAL[key][f]) { mismatch++; console.log(`MISMATCH ${end}/language/${file}.js ${key}.${f}`); }
    }
  }
}
console.log(`\nRUNTIME-EQUIVALENCE CHECK: compared ${total} fields, mismatches=${mismatch}`);
console.log(mismatch === 0 ? '✅ ALL EQUAL: 三端法律文本(运行时) == 宣传页 LEGAL 9语言' : '❌ STILL MISMATCH');
