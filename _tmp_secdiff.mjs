import fs from 'node:fs';
import path from 'node:path';

const DOCS = path.join('shared', 'docs');
const slug = (s) => String(s).normalize('NFKC').replace(/\s+/g, '').replace(/["']/g, '');

function secs(fname) {
  const text = fs.readFileSync(path.join(DOCS, fname), 'utf8');
  return text
    .split(/\r?\n/)
    .map((l) => l.replace(/\r$/, ''))
    .filter((l) => /^###\s/.test(l))
    .map((l) => ({ raw: l.replace(/^###\s*/, '').trim(), s: slug(l.replace(/^###\s*/, '').trim()) }));
}

const zh = secs('使用说明书.md');
const zht = secs('使用說明書_zh-TW.md');

const zhSet = new Map(zh.map((x) => [x.s, x.raw]));
const zhtSet = new Map(zht.map((x) => [x.s, x.raw]));

const onlyInZh = zh.filter((x) => !zhtSet.has(x.s));
const onlyInZht = zht.filter((x) => !zhSet.has(x.s));

console.log('--- 仅存在于 简中(zh) 的小节 ---');
onlyInZh.forEach((x) => console.log('  ' + x.raw));
console.log('\n--- 仅存在于 繁中(zh-TW) 的小节 ---');
onlyInZht.forEach((x) => console.log('  ' + x.raw));

// Also check if difference is just a differently-numbered subsection (e.g. 41.7 vs 41.8)
console.log('\n--- 简中小节数:', zh.length, ' 繁中小节数:', zht.length, '---');
