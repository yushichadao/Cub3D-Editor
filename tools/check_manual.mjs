import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); // 脚本置于 tools/ 下，反推仓库根
const MANUAL = path.join(ROOT, 'shared/docs/使用说明书.md');

const SCAN = ['Web', 'PC', 'Android', 'shared'];
const EXT = new Set(['.html', '.js', '.mjs', '.ts', '.json', '.css']);
const SKIP_DIRS = new Set(['node_modules', 'build', '.git', 'docs', 'dist', 'out', '.cache']);
const SKIP_FILES = new Set(['three.module.js', 'package-lock.json']);

function walk(dir, out) {
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return; }
  for (const e of ents) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(p, out); }
    else { if (SKIP_FILES.has(e.name)) continue; if (EXT.has(path.extname(e.name).toLowerCase())) out.push(p); }
  }
}
const files = [];
for (const d of SCAN) walk(path.join(ROOT, d), files);
const PUNCT = /[\s/／·•、，。：:；（）()「」『』“”‘’《》【】\-—_=+*#@!?…~|\\/.,<>%&$#"'`]/g;
const norm = s => s.replace(PUNCT, '').toLowerCase();
let corpus = '';
for (const f of files) { try { corpus += '\n' + fs.readFileSync(f, 'utf8'); } catch {} }
const corpusN = norm(corpus);

const manual = fs.readFileSync(MANUAL, 'utf8');
const lines = manual.split('\n');

// Collect 「...」 labels with line numbers; split combos like 「框选」「全选」
const labelRe = /[「『【]([^」』】]*)?[」』】]/g;
const items = [];
let m;
while ((m = labelRe.exec(manual)) !== null) {
  const inner = m[1] || '';
  const parts = inner.split(/[」「』】]/).map(s => s.trim()).filter(Boolean);
  const list = parts.length > 1 ? parts : [inner.trim()];
  for (const term of list) {
    if (!term) continue;
    if ((term.match(/[一-鿿]/g) || []).length === 0) continue;
    if (term.length < 2) continue;
    const lineNo = manual.slice(0, m.index).split('\n').length;
    items.push({ term, lineNo });
  }
}
// dedupe by term
const seen = new Map();
for (const it of items) if (!seen.has(it.term)) seen.set(it.term, it);
const unique = [...seen.values()];

function tokensOf(term) {
  // break on separators, also strip leading "设置 →" style prefixes
  let t = term.replace(/^设置\s*[→-]\s*/, '');
  return t.split(/[\s/／·•、，。：:；（）()「」『』“”‘’《》【】\-—_=+*#@!?…~|\\/.,<>%&$#"'`,]/).map(s => s.trim()).filter(s => (s.match(/[一-鿿]/g) || []).length >= 2);
}

const result = [];
for (const it of unique) {
  const n = norm(it.term);
  const exact = n.length > 0 && corpusN.includes(n);
  const toks = tokensOf(it.term).map(t => norm(t)).filter(Boolean);
  const tokFound = toks.filter(t => corpusN.includes(t));
  result.push({ ...it, exact, toks, tokFoundCount: tokFound.length, tokTotal: toks.length });
}

const missing = result.filter(r => !r.exact);
console.log('「」/『』/【】 候选 UI 标签（去重）:', unique.length);
console.log('在代码中精确匹配到:', unique.length - missing.length);
console.log('代码中未精确匹配（含术语差异）:', missing.length);
console.log('\n===== 代码中未找到的 UI 标签（按行号）=====');
for (const r of missing.sort((a, b) => a.lineNo - b.lineNo)) {
  const note = r.tokTotal > 0 && r.tokFoundCount > 0
    ? `  [术语差异: 部分词已存在 ${r.tokFoundCount}/${r.tokTotal}]`
    : `  [完全缺失]`;
  console.log(`  L${r.lineNo}  ${r.term}${note}`);
}
