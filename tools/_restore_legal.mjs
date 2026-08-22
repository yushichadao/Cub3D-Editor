// 把三端法律字段恢复到 git HEAD 版本(保留 <h4> 标题)。
// 用法: node tools/_restore_legal.mjs [--apply]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apply = process.argv.includes('--apply');
const FIELDS = ['tosLink', 'tosBody', 'disclaimerLink', 'disclaimerBody', 'privacyLink', 'privacyBody'];

function unescape(s) {
  return s.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
}
function toSingleQuoted(v) {
  return v.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\r?\n/g, '\\n');
}
const fieldRe = (f) => new RegExp(`(${f}:\\s*')((?:\\\\.|[^'\\\\])*)(')`);
function extract(text, field) {
  const mm = text.match(fieldRe(field));
  return mm ? unescape(mm[2]) : undefined;
}
function gitShow(rel) {
  return execSync(`git show HEAD:${rel}`, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
}

const ends = ['Web', 'PC', 'Android'];
for (const end of ends) {
  // index.html (zh-CN) 来自 HEAD index.html
  const htmlRel = `${end}/index.html`;
  let headHtml;
  try { headHtml = gitShow(htmlRel); } catch { console.log(`[${end}] 无 HEAD, 跳过`); continue; }
  let html = fs.readFileSync(path.join(ROOT, htmlRel), 'utf8');
  for (const f of FIELDS) {
    const val = extract(headHtml, f);
    if (val === undefined) { console.error(`[${end}/index.html] HEAD 无字段 ${f}`); continue; }
    html = html.replace(fieldRe(f), `$1${toSingleQuoted(val)}$3`);
  }
  if (apply) fs.writeFileSync(path.join(ROOT, htmlRel), html);
  else { fs.writeFileSync(path.join(ROOT, htmlRel) + '.restest.html', html); console.log(`[dry-run] ${end}/index.html 已恢复(写 .restest.html)`); }

  // language/*.js
  const langDir = path.join(ROOT, end, 'language');
  for (const lang of ['ar', 'en', 'es', 'fr', 'ja', 'ko', 'ru', 'zh-TW']) {
    const rel = `${end}/language/${lang}.js`;
    let headJs;
    try { headJs = gitShow(rel); } catch { continue; }
    let js = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    for (const f of FIELDS) {
      const val = extract(headJs, f);
      if (val === undefined) { console.error(`[${end}/${lang}.js] HEAD 无字段 ${f}`); continue; }
      js = js.replace(fieldRe(f), `$1${toSingleQuoted(val)}$3`);
    }
    if (apply) fs.writeFileSync(path.join(ROOT, rel), js);
    else { fs.writeFileSync(path.join(ROOT, rel) + '.restest.cjs', js); console.log(`[dry-run] ${end}/${lang}.js 已恢复(写 .restest.cjs)`); }
  }
}
console.log(apply ? '已恢复 git HEAD 版本(带 h4 标题)。' : 'dry-run 完成, 加 --apply 执行。');
