import fs from 'node:fs';
import path from 'node:path';
const DOCS = path.join('shared', 'docs');
for (const f of ['使用说明书.md', '使用説明書_ja.md', '使用說明書_zh-TW.md']) {
  const lines = fs.readFileSync(path.join(DOCS, f), 'utf8').split(/\r?\n/);
  const i = lines.findIndex((l) => /^##\s+第\s*32\s*章/.test(l.replace(/\r$/, '')));
  console.log('\n===== ' + f + ' 第32章 全部 二/三/四级标题 =====');
  if (i < 0) { console.log('  未找到'); continue; }
  // until next ## chapter
  for (let k = i + 1; k < lines.length; k++) {
    const l = lines[k].replace(/\r$/, '');
    if (/^##\s+第\s*33\s*章|^##\s+Chapter\s*33/.test(l)) break;
    if (/^#{1,4}\s/.test(l)) console.log('  ' + l);
  }
}
