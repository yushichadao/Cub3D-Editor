// 对比 git HEAD 版本(替换前) 三端法律字段 与 assets/legal-i18n.js 源 的差异
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 源
const src = fs.readFileSync(path.join(ROOT, 'assets/legal-i18n.js'), 'utf8');
const m = src.match(/window\.LEGAL = (\{[\s\S]*?\});\s*$/m) || src.match(/window\.LEGAL = (\{[\s\S]*\});/);
const LEGAL = JSON.parse(m[1]);
const FIELDS = ['tosBody', 'disclaimerBody', 'privacyBody'];

function unescape(s) {
  return s.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
}
function extract(text, field) {
  const re = new RegExp(`(${field}:\\s*')((?:\\\\.|[^'\\\\])*)(')`);
  const mm = text.match(re);
  return mm ? unescape(mm[2]) : undefined;
}

// 取 git HEAD 版本的文件内容
function gitShow(rel) {
  return execSync(`git show HEAD:${rel}`, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
}

function firstDiff(a, b) {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (a[i] !== b[i]) {
      return { pos: i, aCtx: a.slice(Math.max(0, i - 40), i + 40), bCtx: b.slice(Math.max(0, i - 40), i + 40) };
    }
  }
  if (a.length !== b.length) return { pos: n, aCtx: a.slice(n - 40), bCtx: b.slice(n - 40), lenDiff: a.length - b.length };
  return null;
}

const ends = ['Web', 'PC', 'Android'];
for (const end of ends) {
  // zh-CN 来自 index.html
  const htmlRel = `${end}/index.html`;
  let html;
  try { html = gitShow(htmlRel); } catch { console.log(`[${end}] 无 git HEAD 版本, 跳过`); continue; }
  for (const f of FIELDS) {
    const got = extract(html, f);
    if (got === undefined) { console.log(`[${end}/index.html zh-CN] ${f} 未找到`); continue; }
    const exp = LEGAL['zh-CN'][f] || '';
    if (got === exp) console.log(`[${end}/index.html zh-CN] ${f}: 完全一致 (${got.length} 字)`);
    else { const d = firstDiff(got, exp); console.log(`[${end}/index.html zh-CN] ${f}: 不一致! 旧${got.length}字/源${exp.length}字, 首异@${d.pos} lenDiff=${d.lenDiff ?? 0}`); console.log('  旧: ...' + d.aCtx + '...'); console.log('  源: ...' + d.bCtx + '...'); }
  }
  // 其余语言来自 language/*.js
  for (const lang of Object.keys(LEGAL)) {
    if (lang === 'zh-CN') continue;
    const rel = `${end}/language/${lang}.js`;
    let js;
    try { js = gitShow(rel); } catch { continue; }
    for (const f of FIELDS) {
      const got = extract(js, f);
      if (got === undefined) { console.log(`[${end}/${lang}.js] ${f} 未找到`); continue; }
      const exp = LEGAL[lang][f] || '';
      if (got === exp) console.log(`[${end}/${lang}.js] ${f}: 完全一致 (${got.length} 字)`);
      else { const d = firstDiff(got, exp); console.log(`[${end}/${lang}.js] ${f}: 不一致! 旧${got.length}字/源${exp.length}字, 首异@${d.pos} lenDiff=${d.lenDiff ?? 0}`); console.log('  旧: ...' + d.aCtx + '...'); console.log('  源: ...' + d.bCtx + '...'); }
    }
  }
}
