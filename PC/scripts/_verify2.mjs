import fs from 'fs';
function ex(f){const s=fs.readFileSync(f,'utf8');const i=s.indexOf('= {');const st=s.indexOf('{',i);let d=0,e=-1;for(let k=st;k<s.length;k++){if(s[k]==='{')d++;else if(s[k]==='}'){d--;if(d===0){e=k;break;}}}return eval('('+s.slice(st,e+1)+')');}
const html=fs.readFileSync('index.html','utf8');
const zm=html.match(/const ZH_CN = (\{[\s\S]*?\});/);
const zh=eval('('+zm[1]+')');
const ja=ex('language/ja.js'), en=ex('language/en.js'), tw=ex('language/zh-TW.js');
const keys=['fontYaHei','fontSimSun','fontKaiTi','fontSimHei','fontFangSong','noColor'];
console.log('keys present -> ZH_CN:', keys.every(k=>k in zh), '| en:', keys.every(k=>k in en), '| ja:', keys.every(k=>k in ja), '| zh-TW:', keys.every(k=>k in tw));
console.log('  noColor:', [zh,en,ja,tw].map(o=>o.noColor).join(' / '));
// ensure no literal Chinese in any .title = assignment
const titleZh = (html.match(/\.title\s*=\s*['"][^'"]*[\u4e00-\u9fff][^'"]*['"]/g)||[]);
console.log('\nLiteral Chinese in .title assignments:', titleZh.length, titleZh);
// packs parse?
try { JSON.stringify(zh); JSON.stringify(en); JSON.stringify(ja); JSON.stringify(tw); console.log('\nAll packs parse OK.'); }
catch(e){ console.log('PARSE ERROR', e.message); }
