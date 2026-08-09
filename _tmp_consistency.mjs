import fs from 'node:fs';
import path from 'node:path';

const DOCS = path.join('shared', 'docs');
const FILES = ['使用说明书.md', '使用说明书_en.md', '使用説明書_ja.md', '使用說明書_zh-TW.md'];

const slug = (s) => String(s).normalize('NFKC').replace(/\s+/g, '').replace(/["']/g, '');

function analyze(fname) {
  const text = fs.readFileSync(path.join(DOCS, fname), 'utf8');
  const lines = text.split(/\r?\n/);
  const heads = lines
    .map((l) => l.replace(/\r$/, ''))
    .filter((l) => /^#{1,6}\s/.test(l))
    .map((l) => ({ level: (l.match(/^#+/)[0]).length, title: l.replace(/^#+\s*/, '').trim() }));

  const chapters = heads.filter((h) => h.level === 2 && /^第\s*\d+\s*章|Chapter\s*\d+/i.test(h.title));
  const sections = heads.filter((h) => h.level === 3);
  const h4 = heads.filter((h) => h.level === 4);

  const headSlugs = heads.map((h) => slug(h.title));

  const targets = [...new Set([...text.matchAll(/\]\(jump:([^)\n]+)\)/g)].map((m) => m[1]))];
  const badJump = targets.filter((j) => {
    const want = slug(j);
    return !headSlugs.includes(want) && !headSlugs.some((h) => h.indexOf(want) >= 0);
  });

  // external URLs (should all be wrapped as links)
  const bare = (text.match(/(^|[^(\[<`])(https?:\/\/[^\s<>()\[\]`|]*[^\s<>()\[\]`|.,，。；;：:])/g) || []).length;
  const codeUrl = (text.match(/(?<!\]\()`(https?:\/\/[^\s`]+)`/g) || []).length;
  const linked = (text.match(/\[[^\]]*\]\(https?:\/\/[^)]+\)/g) || []).length;

  const chapNums = chapters.map((c) => Number((c.title.match(/\d+/) || [0])[0]));

  return {
    fname,
    h1: heads.filter((h) => h.level === 1).length,
    chapters: chapters.length,
    chapNums,
    sections: sections.length,
    h4: h4.length,
    jumpTargets: targets.length,
    badJump: badJump.length,
    badJumpList: badJump,
    bareUrls: bare,
    codeUrls: codeUrl,
    linkedUrls: linked,
  };
}

const results = FILES.map(analyze);
for (const r of results) {
  console.log(`\n===== ${r.fname} =====`);
  console.log(`  章节(##): ${r.chapters}  | 小节(###): ${r.sections}  | 四级: ${r.h4}`);
  console.log(`  jump目标: ${r.jumpTargets}  | 失效jump: ${r.badJump}`);
  if (r.badJumpList.length) r.badJumpList.forEach((b) => console.log('      !! ' + b));
  console.log(`  裸网址: ${r.bareUrls}  | 反引號內網址: ${r.codeUrls}  | 已連結網址: ${r.linkedUrls}`);
  const missing = [...Array(52).keys()].map((i) => i + 1).filter((n) => !r.chapNums.includes(n));
  console.log(`  缺失章號: ${missing.length ? missing.join(',') : '无(1-52全)'}`);
}

// cross-language structure compare
console.log('\n===== 跨语言结构对比 =====');
const base = results[0];
for (const r of results.slice(1)) {
  const sameChap = r.chapters === base.chapters;
  const sameNums = JSON.stringify(r.chapNums) === JSON.stringify(base.chapNums);
  const sameSec = r.sections === base.sections;
  console.log(`${r.fname}: 章节数一致=${sameChap} 章号序列一致=${sameNums} 小节数一致=${sameSec} 失效jump=${r.badJump}`);
}
