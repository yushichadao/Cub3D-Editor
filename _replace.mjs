import fs from 'fs';
function loadLegal() {
  let s = fs.readFileSync('assets/legal-i18n.js', 'utf8').replace(/\/\/.*$/gm, '');
  return eval('(' + s.match(/=\s*(\{[\s\S]*\})\s*;?\s*$/)[1] + ')');
}
const LEGAL = loadLegal();
function q(str) {
  return "'" + String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r/g, '\\r') + "'";
}
function replaceField(content, field, newVal) {
  const re = new RegExp(field + "\\s*:\\s*'");
  const m = re.exec(content);
  if (!m) return content;
  const open = m.index + m[0].length - 1; // 开引号 '
  let i = open + 1, end = -1;
  while (i < content.length) {
    const ch = content[i];
    if (ch === '\\') { i += 2; continue; }
    if (ch === "'") { end = i; break; }
    i++;
  }
  if (end < 0) return content;
  return content.slice(0, open) + q(newVal) + content.slice(end + 1);
}
function rep(content, src) {
  for (const f of ['tosBody', 'disclaimerBody', 'privacyBody']) {
    if (f in src) content = replaceField(content, f, src[f]);
  }
  return content;
}
const ends = ['Web', 'PC', 'Android'];
let n = 0;
for (const end of ends) {
  const p = `${end}/index.html`;
  fs.writeFileSync(p, rep(fs.readFileSync(p, 'utf8'), LEGAL['zh-CN'])); n++;
}
const langMap = { en: 'en', ja: 'ja', ko: 'ko', ru: 'ru', es: 'es', fr: 'fr', 'zh-TW': 'zh-TW', ar: 'ar' };
for (const end of ends) {
  for (const [file, key] of Object.entries(langMap)) {
    const p = `${end}/language/${file}.js`;
    fs.writeFileSync(p, rep(fs.readFileSync(p, 'utf8'), LEGAL[key])); n++;
  }
}
console.log('REPLACED FILES:', n);
