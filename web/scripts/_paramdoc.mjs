// 文档辅助：从 index.html 抽取 SHAPE_PARAMS / PARAM_LABEL_MAP 与五语言包，
// 输出各语言的「图形 -> 参数」清单，供使用说明书更新参考。
// 用法：node scripts/_paramdoc.mjs [zh|en|ja|tw|all]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

function extract(startMarker) {
  const i = html.indexOf(startMarker);
  if (i < 0) throw new Error('not found: ' + startMarker);
  let depth = 0, started = false;
  for (let j = i; j < html.length; j++) {
    const c = html[j];
    if (c === '{') { depth++; started = true; }
    else if (c === '}') { depth--; if (started && depth === 0) return html.slice(i, j + 1) + ';'; }
  }
  throw new Error('unbalanced: ' + startMarker);
}

const bag = new Function(
  extract('const SHAPE_PARAMS = {') + '\n' +
  extract('const PARAM_LABEL_MAP = {') + '\n' +
  extract('const ZH_CN = {') + '\n' +
  'return { SHAPE_PARAMS, PARAM_LABEL_MAP, ZH_CN };'
)();

const win = { __packs: {} };
for (const f of ['en.js', 'ja.js', 'zh-TW.js', 'es.js']) {
  new Function('window', fs.readFileSync(path.join(root, 'language', f), 'utf8'))(win);
}
const LANGS = {
  zh: bag.ZH_CN,
  en: win.__packs['en'],
  ja: win.__packs['ja'],
  tw: win.__packs['zh-TW'],
  es: win.__packs['es']
};

const SHAPES_3D = ['box','sphere','cylinder','cone','torus','knot','icosa','octa','dodeca','capsule',
  'pyramid','prism','tube','lathe','tetra','barrel','dome','helix','octaPrism','star3d'];
const SHAPES_2D = ['square2','circle2','triangle','star','hexagon','heart','pentagon','octagon','ellipse',
  'parallelogram','trapezoid','diamond','rightTri','arrow','crescent','semicircle','ring2d','cross','lightning','teardrop'];

const shapeKey = k => 'shape' + k.charAt(0).toUpperCase() + k.slice(1);

function paramNames(type, dict) {
  const def = bag.SHAPE_PARAMS[type];
  if (!def || !def.fields || !def.fields.length) return [];
  return def.fields.map(f => {
    const key = bag.PARAM_LABEL_MAP[f.label];
    return (key && dict[key]) || f.label;
  });
}

const which = (process.argv[2] || 'all');
for (const [code, dict] of Object.entries(LANGS)) {
  if (which !== 'all' && which !== code) continue;
  console.log('\n===== ' + code + ' =====');
  for (const [title, list] of [['3D', SHAPES_3D], ['2D', SHAPES_2D]]) {
    console.log('--- ' + title + ' ---');
    for (const s of list) {
      const nm = dict[shapeKey(s)] || bag.ZH_CN[shapeKey(s)] || s;
      const ps = paramNames(s, dict);
      console.log('| ' + s + ' | ' + nm + ' | ' + (ps.length ? ps.join(' / ') : '-') + ' |');
    }
  }
}
