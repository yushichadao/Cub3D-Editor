import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIELDS = ['tosLink', 'tosBody', 'disclaimerLink', 'disclaimerBody', 'privacyLink', 'privacyBody'];
function unescape(s) { return s.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\'); }
const fieldRe = (f) => new RegExp(`(${f}:\\s*')((?:\\\\.|[^'\\\\])*)(')`);
function extract(t, f) { const m = t.match(fieldRe(f)); return m ? unescape(m[2]) : undefined; }
function gitShow(r) { return execSync(`git show HEAD:${r}`, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); }
const ends = ['Web', 'PC', 'Android'];
let bad = 0, tot = 0;
for (const e of ends) {
  const h = gitShow(`${e}/index.html`); const cur = fs.readFileSync(path.join(ROOT, `${e}/index.html`), 'utf8');
  for (const f of FIELDS) { tot++; if (extract(h, f) !== extract(cur, f)) { bad++; console.log('MISMATCH', `${e}/index.html`, f); } }
  for (const l of ['ar', 'en', 'es', 'fr', 'ja', 'ko', 'ru', 'zh-TW']) {
    const r = `${e}/language/${l}.js`; const hh = gitShow(r); const c = fs.readFileSync(path.join(ROOT, r), 'utf8');
    for (const f of FIELDS) { tot++; if (extract(hh, f) !== extract(c, f)) { bad++; console.log('MISMATCH', r, f); } }
  }
}
console.log(`校验: 共 ${tot} 字段, ${bad} 处与 HEAD 不一致`);
const z = extract(fs.readFileSync(path.join(ROOT, 'PC/index.html'), 'utf8'), 'tosBody');
console.log('PC zh-CN tosBody 开头40字:', z.slice(0, 40));
const tw = extract(fs.readFileSync(path.join(ROOT, 'PC/zh-TW.js'), 'utf8'), 'tosBody');
console.log('PC zh-TW tosBody 开头40字:', tw.slice(0, 40));
