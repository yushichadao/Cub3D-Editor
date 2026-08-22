import fs from 'fs';
function loadLegal() {
  let s = fs.readFileSync('assets/legal-i18n.js', 'utf8').replace(/\/\/.*$/gm, '');
  return eval('(' + s.match(/=\s*(\{[\s\S]*\})\s*;?\s*$/)[1] + ')');
}
const LEGAL = loadLegal();
function extract(content, field) {
  const idx = content.indexOf(field + ":");
  let i = idx + field.length;
  while (i < content.length && /\s/.test(content[i])) i++;
  i++;
  const start = i; let end = -1;
  while (i < content.length) { const ch = content[i]; if (ch === '\\') { i += 2; continue; } if (ch === "'") { end = i; break; } i++; }
  return content.slice(start, end);
}
for (const [p, key] of [['Web/language/en.js', 'en'], ['Web/language/fr.js', 'fr']]) {
  const c = fs.readFileSync(p, 'utf8');
  for (const f of ['tosBody', 'disclaimerBody', 'privacyBody']) {
    const file = extract(c, f);
    const src = LEGAL[key][f];
    if (file === src) { console.log(`${p} ${f}: EQUAL`); continue; }
    console.log(`\n=== ${p} ${f} LEN file=${file.length} src=${src.length} ===`);
    let found = false;
    for (let k = 0; k < Math.min(file.length, src.length); k++) {
      if (file[k] !== src[k]) {
        console.log('FIRST DIFF @', k);
        console.log(' FILE:', JSON.stringify(file.slice(Math.max(0, k - 25), k + 25)));
        console.log(' SRC :', JSON.stringify(src.slice(Math.max(0, k - 25), k + 25)));
        found = true; break;
      }
    }
    if (!found && file.length !== src.length) console.log('LENGTH-ONLY tail FILE:', JSON.stringify(file.slice(-40)), ' SRC:', JSON.stringify(src.slice(-40)));
  }
}
