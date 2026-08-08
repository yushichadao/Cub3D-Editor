import fs from 'fs';
function ex(f){const s=fs.readFileSync(f,'utf8');const i=s.indexOf('= {');const st=s.indexOf('{',i);let d=0,e=-1;for(let k=st;k<s.length;k++){if(s[k]==='{')d++;else if(s[k]==='}'){d--;if(d===0){e=k;break;}}}return eval('('+s.slice(st,e+1)+')');}
const en=ex('language/en.js'),ja=ex('language/ja.js'),tw=ex('language/zh-TW.js');
for(const [n,o] of [['en',en],['ja',ja],['tw',tw]]){
  console.log(n,'has declAIText:', ('declAIText' in o), '=>', JSON.stringify(o.declAIText));
}
const html=fs.readFileSync('index.html','utf8');
console.log('html declAIText span present:', html.includes('data-i18n="declAIText"'));
