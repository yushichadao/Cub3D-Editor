import fs from 'node:fs';
import path from 'node:path';

const DOCS = path.join('shared', 'docs');

function secNums(fname) {
  const text = fs.readFileSync(path.join(DOCS, fname), 'utf8');
  const nums = [];
  for (const l of text.split(/\r?\n/)) {
    const m = l.replace(/\r$/, '').match(/^###\s+(\d+\.\d+)\s/);
    if (m) nums.push(m[1]);
  }
  return nums;
}

const zh = secNums('使用说明书.md');
const zht = secNums('使用說明書_zh-TW.md');

const setZh = new Set(zh);
const setZht = new Set(zht);

const onlyZh = [...setZh].filter((n) => !setZht.has(n)).sort();
const onlyZht = [...setZht].filter((n) => !setZh.has(n)).sort();

console.log('简中小节编号数:', setZh.size, ' 繁中小节编号数:', setZht.size);
console.log('仅存在于 简中 的编号:', onlyZh.join(', ') || '(无)');
console.log('仅存在于 繁中 的编号:', onlyZht.join(', ') || '(无)');

// detect renumbering: same count of X. but different sub-index
// show which chapter has different subsection counts
function byChap(nums) {
  const m = {};
  for (const n of nums) {
    const [c] = n.split('.');
    (m[c] = m[c] || []).push(n);
  }
  return m;
}
const cZh = byChap(zh), cZht = byChap(zht);
const chaps = [...new Set([...Object.keys(cZh), ...Object.keys(cZht)])].sort((a, b) => a - b);
console.log('\n各章 小节数(简/繁):');
for (const c of chaps) {
  const a = (cZh[c] || []).length, b = (cZht[c] || []).length;
  if (a !== b) console.log(`  第 ${c} 章: 简=${a} 繁=${b}  << 差异`);
}
