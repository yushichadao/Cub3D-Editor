import fs from 'node:fs';
import path from 'node:path';
const DOCS = path.join('shared', 'docs');
for (const f of ['使用説明書_ja.md', '使用說明書_zh-TW.md', '使用说明书.md', '使用说明书_en.md']) {
  const lines = fs.readFileSync(path.join(DOCS, f), 'utf8').split(/\r?\n/);
  // find the # level heading just before 第32章
  let pHead = null;
  for (let k = 0; k < lines.length; k++) {
    const l = lines[k].replace(/\r$/, '');
    if (/^#\s+第/.test(l) || /^#\s+第\d/.test(l) || /^#\s+Chapter/.test(l)) pHead = l;
    if (/^##\s+第\s*32\s*章|^##\s+Chapter\s*32/.test(l)) break;
  }
  console.log(f, '-> 第32章所属篇:', pHead);
}
