import fs from 'node:fs';
import path from 'node:path';

const DOCS = path.join('shared', 'docs');
const fp = path.join(DOCS, '使用說明書_zh-TW.md');
const buf = fs.readFileSync(fp);
const EOL = '\r\n';
const lines = buf.toString('utf8').split(/\r?\n/);

const insertTitle = '### 32.3 綜合實戰：用純鍵盤搭一個「小燈塔」';
const block = [
  '',
  insertTitle,
  '',
  '把本篇所學串成一條流水線：',
  '',
  '1. 從面板拖一個**圓柱**到場景（只能滑鼠拖，認了吧）；',
  '2. 選中它，`Shift + PgUp` 幾次把它「長高」到合適位置；',
  '3. `Ctrl + D` 克隆一個當「燈室」，`PgUp` 挪到柱頂；',
  '4. `Shift + A` 把燈室轉正 90°（如果需要）；',
  '5. `Ctrl + A` 全選，`Ctrl + S` 存檔；',
  '6. 點「正視」按鈕擺正視角，`Ctrl + P` 截圖交付。',
  '',
  '全程除了第 1 步放形狀，幾乎沒碰滑鼠面板——這就是「效率篇」的終點：讓雙手長在鍵盤上。',
  '',
  '---',
  '',
  '✏️ **本篇小結**：快捷鍵的本質是「把常用動作映射到手指最自然的落點」。記住兩條主線——**沒選中=動相機，選中了=動物體**；記住三個軸——**X前後、Y左右、Z高度**；記住一個加速鍵——**Shift 大步**。下一篇我們講「變換控件（那個能直接拖的箭頭）」與鍵盤如何配合，讓你的操控更絲滑。',
  '',
  '---',
].join(EOL);

// locate anchor: the warning line (end of 32.2) and the next '# 第 9 篇' heading
const anchorIdx = lines.findIndex((l) => l.includes('仍建議清空前先 `Ctrl + S` 匯出備份。'));
const pianIdx = lines.findIndex((l, i) => i > anchorIdx && l.startsWith('# 第 9 篇 場景管理'));

if (anchorIdx < 0 || pianIdx < 0) {
  console.error('!! 未找到锚点 anchor=' + anchorIdx + ' pian=' + pianIdx);
  process.exit(1);
}
if (lines.includes(insertTitle)) {
  console.error('!! 32.3 已存在，跳过');
  process.exit(0);
}

// insert between anchor line and the blank line before pian heading
// build new lines array
const out = [
  ...lines.slice(0, anchorIdx + 1),
  ...block.split(EOL),
  ...lines.slice(anchorIdx + 1),
];
fs.writeFileSync(fp, out.join(EOL) + (buf[buf.length - 1] === 0x0a ? EOL : ''), 'utf8');

console.log('✓ 已插入 32.3 (锚点行 ' + (anchorIdx + 1) + ' 之后, 第9篇之前)');
console.log('  新增行数:', block.split(EOL).length);
