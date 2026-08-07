/**
 * 阵列生成器 —— JavaScript 插件示例
 * 演示：批量建模、向用户提问、进度汇报、读取场景数据。
 */
'use strict';

const path = require('path');
const { Plugin } = require(path.join(process.env.CUBE3D_SDK_DIR, 'cube3d.js'));

const app = new Plugin();

/** HSL 转 #RRGGBB，用于生成渐变色 */
function hsl(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const to = v => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return '#' + to(r) + to(g) + to(b);
}

app.onInit(() => app.log('阵列生成器已加载'));

/* ------------------------------ 网格阵列 ------------------------------ */

app.command('grid', async () => {
  const sizeText = await app.ask('生成几行几列？（例如 6x6）', '6x6');
  if (sizeText === null) return '已取消';
  const m = String(sizeText).match(/(\d+)\s*[x×*]\s*(\d+)/);
  const rows = m ? Math.min(30, parseInt(m[1], 10)) : 6;
  const cols = m ? Math.min(30, parseInt(m[2], 10)) : 6;

  const shapes = ['box', 'sphere', 'cylinder', 'cone', 'torus', 'icosa'];
  const items = [];
  const gap = 2.2;
  const ox = -(cols - 1) * gap / 2;
  const oz = -(rows - 1) * gap / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      items.push({
        shape: shapes[(r + c) % shapes.length],
        pos: [ox + c * gap, 0, oz + r * gap],
        color: hsl((r * cols + c) * 360 / (rows * cols), 0.7, 0.55),
        scale: 0.8
      });
    }
  }

  app.progress(30, '正在批量创建…');
  await app.addShapes(items);
  app.progress(100, '完成');
  return `已生成 ${rows} × ${cols} = ${items.length} 个对象`;
});

/* ------------------------------- 彩虹塔 ------------------------------- */

app.command('tower', async () => {
  const layers = 24;
  const items = [];
  for (let i = 0; i < layers; i++) {
    const t = i / layers;
    items.push({
      shape: i % 4 === 3 ? 'torus' : 'box',
      pos: [0, i * 0.9, 0],
      color: hsl(t * 330, 0.85, 0.55),
      scale: 1.6 * (1 - t * 0.65),
      rotY: t * Math.PI * 2
    });
  }
  await app.addShapes(items);
  await app.editor('setCamera', { preset: 'persp' });
  return `已生成 ${layers} 层彩虹塔`;
});

/* ------------------------------ 环形阵列 ------------------------------ */

app.command('ring', async () => {
  const countText = await app.ask('环上放置多少个对象？', '18');
  if (countText === null) return '已取消';
  const n = Math.max(3, Math.min(120, parseInt(countText, 10) || 18));
  const radius = Math.max(4, n * 0.35);
  const items = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2;
    items.push({
      shape: 'capsule',
      pos: [Math.cos(a) * radius, 0, Math.sin(a) * radius],
      color: hsl(i * 360 / n, 0.8, 0.6),
      scale: 0.9,
      rotY: -a
    });
  }
  await app.addShapes(items);
  return `已在半径 ${radius.toFixed(1)} 的圆环上生成 ${n} 个对象`;
});

/* ------------------------------ 场景统计 ------------------------------ */

app.command('stats', async () => {
  const objs = await app.listObjects();
  if (!objs.length) return '场景为空';
  const byKind = {};
  const byShape = {};
  objs.forEach(o => {
    byKind[o.kind] = (byKind[o.kind] || 0) + 1;
    if (o.shape) byShape[o.shape] = (byShape[o.shape] || 0) + 1;
  });
  const top = Object.entries(byShape).sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([k, v]) => `${k}×${v}`).join('、');
  const summary = `共 ${objs.length} 个对象；类型分布 ${JSON.stringify(byKind)}${top ? '；常见图形 ' + top : ''}`;
  app.log(summary);
  await app.toast(summary);
  return summary;
});

app.run();
