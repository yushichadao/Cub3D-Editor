import fs from 'node:fs';
import path from 'node:path';
const DOCS = path.join('shared', 'docs');
const lines = fs.readFileSync(path.join(DOCS, '使用说明书.md'), 'utf8').split(/\r?\n/);
const i = lines.findIndex((l) => /^###\s+32\.3/.test(l.replace(/\r$/, '')));
let end = lines.length;
for (let k = i + 1; k < lines.length; k++) {
  if (/^###\s+33\.|^##\s+第\s*33\s*章/.test(lines[k].replace(/\r$/, ''))) { end = k; break; }
}
const body = lines.slice(i, end);
console.log('32.3 起始行:', i + 1, ' 结束行:', end, ' 共', body.length, '行');
console.log('---- 前 6 行预览 ----');
body.slice(0, 6).forEach((l) => console.log(l));
