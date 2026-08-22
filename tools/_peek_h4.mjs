import fs from 'node:fs';
function unescape(s){return s.replace(/\\n/g,'\n').replace(/\\"/g,'"').replace(/\\'/g,"'").replace(/\\\\/g,'\\');}
const html = fs.readFileSync('PC/index.html','utf8');
const m = html.match(/tosBody:(\s*)'((?:\\.|[^'\\])*)'/);
const v = unescape(m[2]);
const hs = [...v.matchAll(/<h4>[^<]*<\/h4>/g)].map(x=>x[0]);
console.log('PC ZH_CN tosBody 中 h4 数量:', hs.length);
console.log(hs.join('  |  '));
