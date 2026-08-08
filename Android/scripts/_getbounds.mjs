import fs from 'fs';
const s = fs.readFileSync('c:/Users/yushi/Documents/trae_projects/3d-editor/index.html', 'utf8');
const L = s.split('\n');
const find = (pred) => { for (let i = 0; i < L.length; i++) if (pred(L[i])) return i + 1; return -1; };
console.log('bodyOpen', find(l => /^\s*<body[ >]/.test(l)));
console.log('scriptModule', find(l => /<script[^>]*type="module"/.test(l)));
console.log('scriptClose', find(l => /^\s*<\/script>\s*$/.test(l)));
console.log('htmlClose', find(l => /^\s*<\/html>\s*$/.test(l)));
