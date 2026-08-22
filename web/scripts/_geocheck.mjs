// 几何自检：从 index.html 抽取 SHAPE_PARAMS / getShapeDefaults / buildParametricGeo3D / buildParametricGeo2D，
// 在 Node 环境用 three.module.js 跑一遍全部图形，校验顶点合法性与包围盒尺寸。
// 用法：node scripts/_geocheck.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// 抽取需要的顶层函数 / 常量声明块（按大括号配对截取）
function extract(startMarker) {
  const i = html.indexOf(startMarker);
  if (i < 0) throw new Error('not found: ' + startMarker);
  let depth = 0, started = false;
  for (let j = i; j < html.length; j++) {
    const c = html[j];
    if (c === '{') { depth++; started = true; }
    else if (c === '}') {
      depth--;
      if (started && depth === 0) return html.slice(i, j + 1) + (startMarker.startsWith('const') ? ';' : '');
    }
  }
  throw new Error('unbalanced: ' + startMarker);
}

const src = [
  extract('const SHAPE_PARAMS = {'),
  extract('function getShapeDefaults('),
  extract('function buildParametricGeo3D('),
  extract('function buildParametricGeo2D('),
  extract('const SHAPE_NORMALIZE_2D = {')
].join('\n\n');

const THREE = await import(pathToFileURL(path.join(root, 'three', 'three.module.js')).href);
const factory = new Function('THREE', src + '\nreturn { SHAPE_PARAMS, getShapeDefaults, buildParametricGeo3D, buildParametricGeo2D };');
const api = factory(THREE);

const SHAPES_3D = ['box','sphere','cylinder','cone','torus','knot','icosa','octa','dodeca','capsule',
  'pyramid','prism','tube','lathe','tetra','barrel','dome','helix','octaPrism','star3d'];
const SHAPES_2D = ['square2','circle2','triangle','star','hexagon','heart','pentagon','octagon','ellipse',
  'parallelogram','trapezoid','diamond','rightTri','arrow','crescent','semicircle','ring2d','cross','lightning','teardrop'];

let fail = 0, warn = 0;
function check(type, is3d) {
  const data = api.getShapeDefaults(type);
  let geo;
  try {
    geo = is3d ? api.buildParametricGeo3D(type, data) : api.buildParametricGeo2D(type, data);
  } catch (e) {
    console.log(`FAIL ${type}: ${e.message}`); fail++; return;
  }
  const pos = geo.getAttribute('position');
  if (!pos || pos.count === 0) { console.log(`FAIL ${type}: empty geometry`); fail++; return; }
  const arr = pos.array;
  for (let i = 0; i < arr.length; i++) {
    if (!Number.isFinite(arr[i])) { console.log(`FAIL ${type}: NaN/Inf vertex @${i}`); fail++; return; }
  }
  geo.computeBoundingBox();
  const b = geo.boundingBox, s = b.max.clone().sub(b.min);
  const dims = [s.x, s.y, s.z].map(v => +v.toFixed(3));
  const maxDim = Math.max(...dims);
  if (maxDim < 0.05 || maxDim > 25) { console.log(`WARN ${type}: bbox ${dims.join(' x ')}`); warn++; }
  const paramKeys = (api.SHAPE_PARAMS[type]?.fields || []).map(f => f.key);
  const missing = paramKeys.filter(k => data[k] == null);
  if (missing.length) { console.log(`FAIL ${type}: default missing [${missing.join(',')}]`); fail++; return; }
  console.log(`ok   ${type.padEnd(14)} verts=${String(pos.count).padStart(6)}  bbox=${dims.join(' x ')}  params=[${paramKeys.join(',')}]`);
}

console.log('--- 3D ---');
SHAPES_3D.forEach(t => check(t, true));
console.log('--- 2D ---');
SHAPES_2D.forEach(t => check(t, false));

// 参数扫描：把每个字段推到 min / max 两端，确认几何仍然合法
console.log('--- range sweep ---');
[...SHAPES_3D.map(t => [t, true]), ...SHAPES_2D.map(t => [t, false])].forEach(([type, is3d]) => {
  const spec = api.SHAPE_PARAMS[type];
  if (!spec) return;
  spec.fields.forEach(f => {
    ['min', 'max'].forEach(side => {
      const data = api.getShapeDefaults(type);
      const fn = side === 'max' ? f.maxOf : f.minOf;
      let v = f[side];
      if (typeof fn === 'function') {
        const dv = fn(data);
        if (isFinite(dv)) v = side === 'max' ? Math.min(f.max, dv) : Math.max(f.min, dv);
      }
      data[f.key] = v;
      if (typeof spec.link === 'function') spec.link(data, f.key);
      try {
        const g = is3d ? api.buildParametricGeo3D(type, data) : api.buildParametricGeo2D(type, data);
        const a = g.getAttribute('position');
        if (!a || a.count === 0) { console.log(`FAIL ${type}.${f.key}=${side}(${v}): empty`); fail++; return; }
        for (let i = 0; i < a.array.length; i++) {
          if (!Number.isFinite(a.array[i])) { console.log(`FAIL ${type}.${f.key}=${side}(${v}): NaN`); fail++; return; }
        }
      } catch (e) {
        console.log(`FAIL ${type}.${f.key}=${side}(${v}): ${e.message}`); fail++;
      }
    });
  });
});

console.log(`\nresult: fail=${fail} warn=${warn}`);
process.exit(fail ? 1 : 0);
