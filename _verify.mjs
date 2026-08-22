import fs from 'fs';
function loadLegal() {
  let s = fs.readFileSync('assets/legal-i18n.js', 'utf8').replace(/\/\/.*$/gm, '');
  return eval('(' + s.match(/=\s*(\{[\s\S]*\})\s*;?\s*$/)[1] + ')');
}
const LEGAL = loadLegal();

function getFields(content) {
  const out = {};
  for (const f of ['tosBody', 'disclaimerBody', 'privacyBody']) {
    const m = content.match(new RegExp(f + "\\s*:\\s*'((?:\\\\.|[^'])*)'"));
    out[f] = m ? m[1] : null;
  }
  return out;
}

const ends = ['Web', 'PC', 'Android'];
let mismatch = 0, total = 0;

// index.html ZH_CN vs LEGAL['zh-CN']
for (const end of ends) {
  const c = fs.readFileSync(`${end}/index.html`, 'utf8');
  const f = getFields(c);
  for (const k of ['tosBody', 'disclaimerBody', 'privacyBody']) {
    total++;
    if (f[k] !== LEGAL['zh-CN'][k]) { mismatch++; console.log(`MISMATCH ${end}/index.html ZH_CN.${k}`); }
  }
}

// language files
const langMap = { en: 'en', ja: 'ja', ko: 'ko', ru: 'ru', es: 'es', fr: 'fr', 'zh-TW': 'zh-TW', ar: 'ar' };
for (const end of ends) {
  for (const [file, key] of Object.entries(langMap)) {
    const c = fs.readFileSync(`${end}/language/${file}.js`, 'utf8');
    const f = getFields(c);
    for (const k of ['tosBody', 'disclaimerBody', 'privacyBody']) {
      total++;
      if (f[k] !== LEGAL[key][k]) { mismatch++; console.log(`MISMATCH ${end}/language/${file}.js ${key}.${k}`); }
    }
  }
}

console.log(`\nVERIFY: compared ${total} fields, mismatches=${mismatch}`);
console.log(mismatch === 0 ? 'ALL MATCH: 三端法律文本 == 宣传页 LEGAL' : 'THERE ARE MISMATCHES');
