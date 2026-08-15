/**
 * Android 应用图标生成器（零依赖）
 *
 * 生成「亮色」图标：白色/浅蓝渐变圆角背景 + 青色等距立方体。
 * 同时输出：
 *   - 旧版 mipmap 全图标（ic_launcher.png 圆角矩形 / ic_launcher_round.png 圆形）
 *   - 自适应图标前景层（ic_launcher_foreground.png，透明底，由 ic_launcher_background 提供白底）
 *
 *   node scripts/_genicon-android.mjs
 */
import fs from 'node:fs';
import path from 'path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RES = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');

/* ------------------------------- 画布工具 -------------------------------- */
function createCanvas(size) { return { w: size, h: size, data: new Float64Array(size * size * 4) }; }
function blend(cv, x, y, r, g, b, a) {
  if (a <= 0 || x < 0 || y < 0 || x >= cv.w || y >= cv.h) return;
  const i = (y * cv.w + x) * 4, d = cv.data, ia = 1 - a;
  d[i] = d[i] * ia + r * a; d[i + 1] = d[i + 1] * ia + g * a; d[i + 2] = d[i + 2] * ia + b * a; d[i + 3] = d[i + 3] * ia + 255 * a;
}
function hex(c) { const n = parseInt(c.replace('#', ''), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }

/** 亮色背景：rounded=圆角矩形，circle=圆形 */
function drawBackgroundLight(cv, shape) {
  const cx = cv.w / 2, cy = cv.h / 2;
  const inner = hex('#FFFFFF'), outer = hex('#E6F2FB');
  const maxD = Math.hypot(cx, cy);
  for (let y = 0; y < cv.h; y++) {
    for (let x = 0; x < cv.w; x++) {
      let a = 1;
      if (shape === 'circle') {
        const d = Math.hypot(x - cx, y - cy);
        a = 1 - Math.min(Math.max(d - (cv.w / 2 - 1), 0), 1);
        if (a <= 0) continue;
      } else {
        const R = cv.w * 0.19;
        const dx = Math.max(Math.abs(x - cx) - (cv.w / 2 - R), 0);
        const dy = Math.max(Math.abs(y - cy) - (cv.h / 2 - R), 0);
        const dist = Math.hypot(dx, dy) - R;
        a = 1 - Math.min(Math.max(dist + 0.5, 0), 1);
        if (a <= 0) continue;
      }
      const t = Math.min(Math.hypot(x - cx, y - cy) / maxD, 1), e = t * t;
      blend(cv, x, y,
        inner[0] + (outer[0] - inner[0]) * e,
        inner[1] + (outer[1] - inner[1]) * e,
        inner[2] + (outer[2] - inner[2]) * e, a);
    }
  }
}

function drawLine(cv, x0, y0, x1, y1, width, color, alpha) {
  const [r, g, b] = hex(color);
  const half = width / 2;
  const minX = Math.max(0, Math.floor(Math.min(x0, x1) - half - 2));
  const maxX = Math.min(cv.w - 1, Math.ceil(Math.max(x0, x1) + half + 2));
  const minY = Math.max(0, Math.floor(Math.min(y0, y1) - half - 2));
  const maxY = Math.min(cv.h - 1, Math.ceil(Math.max(y0, y1) + half + 2));
  const vx = x1 - x0, vy = y1 - y0, len2 = vx * vx + vy * vy || 1;
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      let t = ((x - x0) * vx + (y - y0) * vy) / len2;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const d = Math.hypot(x - (x0 + vx * t), y - (y0 + vy * t));
      const a = (1 - Math.min(Math.max(d - half + 1, 0), 1)) * alpha;
      if (a > 0) blend(cv, x, y, r, g, b, a);
    }
  }
}
function fillPoly(cv, pts, color, alpha) {
  const [r, g, b] = hex(color);
  const minY = Math.max(0, Math.floor(Math.min(...pts.map(p => p[1]))));
  const maxY = Math.min(cv.h - 1, Math.ceil(Math.max(...pts.map(p => p[1]))));
  for (let y = minY; y <= maxY; y++) {
    const xs = [];
    for (let i = 0; i < pts.length; i++) {
      const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length];
      if ((ay <= y && by > y) || (by <= y && ay > y)) xs.push(ax + (y - ay) / (by - ay) * (bx - ax));
    }
    if (xs.length < 2) continue;
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const x0 = Math.max(0, Math.ceil(xs[k])), x1 = Math.min(cv.w - 1, Math.floor(xs[k + 1]));
      for (let x = x0; x <= x1; x++) blend(cv, x, y, r, g, b, alpha);
    }
  }
}

/** 等距立方体（青色线框，亮色主题） */
function drawCube(cv, scale = 0.245) {
  const cx = cv.w / 2, cy = cv.h / 2 + cv.h * 0.015, S = cv.w * scale;
  const COS30 = Math.cos(Math.PI / 6), SIN30 = Math.sin(Math.PI / 6);
  const P = (x, y, z) => [cx + (x - z) * COS30 * S, cy + ((x + z) * SIN30 - y) * S];
  const v = {
    a: P(-1, 1, -1), b: P(1, 1, -1), c: P(1, 1, 1), d: P(-1, 1, 1),
    e: P(-1, -1, -1), f: P(1, -1, -1), g: P(1, -1, 1), h: P(-1, -1, 1)
  };
  // 三个可见面（青色淡填充）
  fillPoly(cv, [v.a, v.b, v.c, v.d], '#22D3EE', 0.18);
  fillPoly(cv, [v.d, v.c, v.g, v.h], '#22D3EE', 0.08);
  fillPoly(cv, [v.a, v.d, v.h, v.e], '#22D3EE', 0.14);
  const edges = [
    ['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'a'],
    ['e', 'f'], ['f', 'g'], ['g', 'h'], ['h', 'e'],
    ['a', 'e'], ['b', 'f'], ['c', 'g'], ['d', 'h']
  ];
  const hidden = new Set(['b-f', 'a-b', 'b-c']);
  const W = cv.w * 0.0135;
  for (const [p, q] of edges) drawLine(cv, v[p][0], v[p][1], v[q][0], v[q][1], W * 4.5, '#22D3EE', 0.06); // 外发光
  for (const [p, q] of edges) {
    const key = p + '-' + q, dim = hidden.has(key);
    drawLine(cv, v[p][0], v[p][1], v[q][0], v[q][1], W, dim ? '#38BDF8' : '#0EA5E9', dim ? 0.5 : 0.95);
  }
  const R = cv.w * 0.019;
  for (const k of Object.keys(v)) {
    const dim = k === 'b';
    drawLine(cv, v[k][0], v[k][1], v[k][0], v[k][1], R * 2, '#0EA5E9', dim ? 0.4 : 0.9);
  }
}

/* ------------------------------- 降采样 ---------------------------------- */
function downsample(src, size) {
  const dst = createCanvas(size), ratio = src.w / size;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      const y0 = Math.floor(y * ratio), y1 = Math.floor((y + 1) * ratio);
      const x0 = Math.floor(x * ratio), x1 = Math.floor((x + 1) * ratio);
      for (let sy = y0; sy < y1; sy++) for (let sx = x0; sx < x1; sx++) {
        const i = (sy * src.w + sx) * 4;
        r += src.data[i]; g += src.data[i + 1]; b += src.data[i + 2]; a += src.data[i + 3]; n++;
      }
      if (!n) continue;
      const i = (y * size + x) * 4;
      dst.data[i] = r / n; dst.data[i + 1] = g / n; dst.data[i + 2] = b / n; dst.data[i + 3] = a / n;
    }
  }
  return dst;
}

/* ------------------------------- PNG 编码 -------------------------------- */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c; }
  return t;
})();
function crc32(buf) { let c = -1; for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ -1) >>> 0; }
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function encodePNG(cv) {
  const { w, h, data } = cv;
  const raw = Buffer.alloc((w * 4 + 1) * h);
  let p = 0;
  for (let y = 0; y < h; y++) {
    raw[p++] = 0;
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      raw[p++] = Math.round(Math.min(255, Math.max(0, data[i])));
      raw[p++] = Math.round(Math.min(255, Math.max(0, data[i + 1])));
      raw[p++] = Math.round(Math.min(255, Math.max(0, data[i + 2])));
      raw[p++] = Math.round(Math.min(255, Math.max(0, data[i + 3])));
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

/* --------------------------------- 主流程 -------------------------------- */
// 旧版全图标尺寸（48dp 基准）
const LEGACY = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
// 自适应前景层尺寸（108dp 基准，自适应背景由 ic_launcher_background 提供白底）
const FG = { mdpi: 108, hdpi: 162, xhdpi: 216, xxhdpi: 324, xxxhdpi: 432 };

function render(size, bg) {
  const SS = size * 4;
  const master = createCanvas(SS);
  if (bg !== 'none') drawBackgroundLight(master, bg);
  drawCube(master, 0.245);
  const cv = size === SS ? master : downsample(master, size);
  return encodePNG(cv);
}

function main() {
  let count = 0;
  for (const [d, s] of Object.entries(LEGACY)) {
    const dir = path.join(RES, `mipmap-${d}`);
    fs.writeFileSync(path.join(dir, 'ic_launcher.png'), render(s, 'rounded'));
    fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), render(s, 'circle'));
    count += 2;
  }
  for (const [d, s] of Object.entries(FG)) {
    const dir = path.join(RES, `mipmap-${d}`);
    fs.writeFileSync(path.join(dir, 'ic_launcher_foreground.png'), render(s, 'none'));
    count += 1;
  }
  console.log(`✔ 已生成 Android 亮色图标：共 ${count} 个 PNG（5 档密度 × 旧版全图标2 + 自适应前景1）`);
}
main();
