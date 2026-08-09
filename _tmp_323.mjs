import fs from 'node:fs';
import path from 'node:path';
const DOCS = path.join('shared', 'docs');
for (const f of ['使用说明书.md', '使用说明书_en.md', '使用説明書_ja.md', '使用說明書_zh-TW.md']) {
  const lines = fs.readFileSync(path.join(DOCS, f), 'utf8').split(/\r?\n/);
  const i = lines.findIndex((l) => /^##\s+第\s*32\s*章|^##\s+Chapter\s*32/.test(l.replace(/\r$/, '')));
  console.log('\n===== ' + f + ' (第32章起) =====');
  if (i < 0) { console.log('  未找到第32章'); continue; }
  for (let k = i; k < Math.min(i + 14, lines.length); k++) {
    const l = lines[k].replace(/\r$/, '');
    if (/^#{1,4}\s/.test(l)) console.log('  ' + l);
  }
}
