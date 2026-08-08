import fs from 'fs';
function extractObj(s){
  const idx = s.indexOf('= {');
  const start = s.indexOf('{', idx);
  let depth = 0, end = -1;
  for (let i = start; i < s.length; i++){
    if (s[i] === '{') depth++;
    else if (s[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  return s.slice(start, end + 1);
}
const html = fs.readFileSync('index.html','utf8');
const zm = html.match(/const ZH_CN = (\{[\s\S]*?\});/);
const zh = eval('('+zm[1]+')');
function pack(file, lang){
  const s = fs.readFileSync(file,'utf8');
  return { lang, obj: eval('('+extractObj(s)+')') };
}
const en = pack('language/en.js','en'), ja = pack('language/ja.js','ja'), tw = pack('language/zh-TW.js','zh-TW');
const zk = Object.keys(zh);
console.log('ZH_CN keys:', zk.length, '| en:', Object.keys(en.obj).length, '| ja:', Object.keys(ja.obj).length, '| zh-TW:', Object.keys(tw.obj).length);
for (const [name, p] of [['en',en],['ja',ja],['zh-TW',tw]]) {
  const miss = zk.filter(k => !(k in p.obj));
  console.log(`\n=== in ZH_CN but MISSING in ${name} (${miss.length}) ===\n` + miss.join(', '));
}
