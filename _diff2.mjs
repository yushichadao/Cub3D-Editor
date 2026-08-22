import fs from 'fs';
function loadLegal() {
  let s = fs.readFileSync('assets/legal-i18n.js', 'utf8').replace(/\/\/.*$/gm, '');
  return eval('(' + s.match(/=\s*(\{[\s\S]*\})\s*;?\s*$/)[1] + ')');
}
const LEGAL = loadLegal();
function extract(content, field) {
  const m = content.match(new RegExp(field + "\\s*:\\s*'((?:\\\\.|[^'])*)'"));
  return m ? m[1] : null;
}
for (const [p, key] of [['Web/language/en.js', 'en'], ['Web/language/fr.js', 'fr'], ['Web/language/ja.js', 'ja']]) {
  const c = fs.readFileSync(p, 'utf8');
  for (const f of ['tosBody', 'disclaimerBody', 'privacyBody']) {
    const file = extract(c, f);
    const src = LEGAL[key][f];
    if (file === src) { console.log(`${p} ${f}: EQUAL (len=${file.length})`); continue; }
    console.log(`\n=== ${p} ${f} fileLen=${file?file.length:0} srcLen=${src.length} ===`);
    let fk = -1;
    for (let k = 0; k < Math.min(file?.length||0, src.length); k++) {
      if (file[k] !== src[k]) { fk = k; break; }
    }
    if (fk >= 0) {
      console.log('FIRST DIFF @', fk);
      console.log(' FILE:', JSON.stringify(file.slice(Math.max(0, fk - 30), fk + 30)));
      console.log(' SRC :', JSON.stringify(src.slice(Math.max(0, fk - 30), fk + 30)));
    } else {
      console.log('LENGTH-ONLY');
    }
  }
}
