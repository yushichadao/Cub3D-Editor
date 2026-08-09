import fs from 'node:fs';
import path from 'node:path';
const DOCS = path.join('shared', 'docs');
const lines = fs.readFileSync(path.join(DOCS, '使用說明書_zh-TW.md'), 'utf8').split(/\r?\n/);
const i = lines.findIndex((l) => /^##\s+第\s*32\s*章/.test(l.replace(/\r$/, '')));
let end = lines.length;
const head = [];
for (let k = i; k < lines.length; k++) {
  const l = lines[k];
  if (/^##\s+第\s*33\s*章/.test(l.replace(/\r$/, ''))) { end = k; break; }
  head.push({ n: k + 1, t: l });
}
// print last ~20 lines of chapter 32 (the 32.2 tail) and first lines of 33
console.log('=== 第32章 末尾 (32.2附近) ===');
console.log(head.slice(-12).map((h) => h.n + ': ' + h.t).join('\n'));
console.log('\n=== 第33章开头 ===');
console.log(lines[end].replace(/\r$/, ''));
console.log(lines[end + 1] ? lines[end + 1].replace(/\r$/, '') : '');
console.log('\n32.2 标题行号:', head.find((h) => /32\.2/.test(h.t))?.n);
console.log('第33章行号:', end + 1);
