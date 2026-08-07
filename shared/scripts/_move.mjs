import fs from 'fs';
const p = 'index.html';
const lines = fs.readFileSync(p, 'utf8').split('\n');
// block to move: from the comment line 5705 (index 5704) through line 5862 (index 5861)
const start = 5704;          // 0-based index of line 5705
const endExclusive = 5862;   // exclusive -> covers lines 5705..5862
const block = lines.slice(start, endExclusive);
console.log('block length', block.length, 'first:', JSON.stringify(block[0]), 'last:', JSON.stringify(block[block.length-1]));
// remove block
lines.splice(start, endExclusive - start);
// insert after line 1226 (1-based) -> index 1226 (0-based) since 1226 < 5705
lines.splice(1226, 0, ...block);
fs.writeFileSync(p, lines.join('\n'));
console.log('moved block to just after import lines');
