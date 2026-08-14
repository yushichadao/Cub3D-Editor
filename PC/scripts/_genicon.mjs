/**
 * 应用图标生成器（零依赖）
 *
 * 用纯 Node 绘制一枚等距立方体线框图标，再自行完成 PNG 编码与 ICO 封装。
 * 之所以不引入 sharp / png 之类的库，是为了让「离线环境重新构建」不受阻碍。
 *
 *   node scripts/_genicon.mjs
 *
 * 产物：build/icon.ico（含 16/24/32/48/64/128/256 七种尺寸）
 *      build/icon.png（256×256，供文档或商店页使用）
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'build');

const SS = 1024;                    // 超采样画布边长
const SIZES = [256, 128, 64, 48, 32, 24, 16];

/* ------------------------------- 画布工具 -------------------------------- */

function createCanvas(size) {
  return { w: size, h: size, data: new Float64Array(size * size * 4) };
}

function blend(cv, x, y, r, g, b, a) {
  if (a <= 0 || x < 0 || y < 0 || x >= cv.w || y >= cv.h) return;
  const i = (y * cv.w + x) * 4;
  const d = cv.data;
  const ia = 1 - a;
  d[i] = d[i] * ia + r * a;
  d[i + 1] = d[i + 1] * ia + g * a;
  d[i + 2] = d[i + 2] * ia + b * a;
  d[i + 3] = d[i + 3] * ia + 255 * a;
}

function hex(c) {
  const n = parseInt(c.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** 圆角矩形背景 + 径向渐变 */
function drawBackground(cv) {
  const R = cv.w * 0.19;           // 圆角半径
  const cx = cv.w / 2, cy = cv.h / 2;
  const inner = hex('#1a2340');
  const outer = hex('#080a12');
  const maxD = Math.hypot(cx, cy);

  for (let y = 0; y < cv.h; y++) {
    for (let x = 0; x < cv.w; x++) {
      // 圆角矩形的有符号距离
      const dx = Math.max(Math.abs(x - cx) - (cv.w / 2 - R), 0);
      const dy = Math.max(Math.abs(y - cy) - (cv.h / 2 - R), 0);
      const dist = Math.hypot(dx, dy) - R;
      let a = 1 - Math.min(Math.max(dist + 0.5, 0), 1);
      if (a <= 0) continue;

      const t = Math.min(Math.hypot(x - cx, y - cy) / maxD, 1);
      const e = t * t;
      blend(cv, x, y,
        inner[0] + (outer[0] - inner[0]) * e,
        inner[1] + (outer[1] - inner[1]) * e,
        inner[2] + (outer[2] - inner[2]) * e,
        a);
    }
  }
}

/** 线段绘制（带柔边），只遍历包围盒 */
function drawLine(cv, x0, y0, x1, y1, width, color, alpha) {
  const [r, g, b] = hex(color);
  const half = width / 2;
  const minX = Math.max(0, Math.floor(Math.min(x0, x1) - half - 2));
  const maxX = Math.min(cv.w - 1, Math.ceil(Math.max(x0, x1) + half + 2));
  const minY = Math.max(0, Math.floor(Math.min(y0, y1) - half - 2));
  const maxY = Math.min(cv.h - 1, Math.ceil(Math.max(y0, y1) + half + 2));

  const vx = x1 - x0, vy = y1 - y0;
  const len2 = vx * vx + vy * vy || 1;

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

/** 凸多边形填充 */
function fillPoly(cv, pts, color, alpha) {
  const [r, g, b] = hex(color);
  const minY = Math.max(0, Math.floor(Math.min(...pts.map(p => p[1]))));
  const maxY = Math.min(cv.h - 1, Math.ceil(Math.max(...pts.map(p => p[1]))));

  for (let y = minY; y <= maxY; y++) {
    const xs = [];
    for (let i = 0; i < pts.length; i++) {
      const [ax, ay] = pts[i];
      const [bx, by] = pts[(i + 1) % pts.length];
      if ((ay <= y && by > y) || (by <= y && ay > y)) {
        xs.push(ax + (y - ay) / (by - ay) * (bx - ax));
      }
    }
    if (xs.length < 2) continue;
    xs.sort((p, q) => p - q);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const x0 = Math.max(0, Math.ceil(xs[k]));
      const x1 = Math.min(cv.w - 1, Math.floor(xs[k + 1]));
      for (let x = x0; x <= x1; x++) blend(cv, x, y, r, g, b, alpha);
    }
  }
}

/** 绘制等距立方体 */
function drawCube(cv) {
  const cx = cv.w / 2;
  const cy = cv.h / 2 + cv.h * 0.015;
  const S = cv.w * 0.245;
  const COS30 = Math.cos(Math.PI / 6);
  const SIN30 = Math.sin(Math.PI / 6);

  // 等距投影
  const P = (x, y, z) => [
    cx + (x - z) * COS30 * S,
    cy + ((x + z) * SIN30 - y) * S
  ];

  const v = {
    // 上层
    a: P(-1, 1, -1), b: P(1, 1, -1), c: P(1, 1, 1), d: P(-1, 1, 1),
    // 下层
    e: P(-1, -1, -1), f: P(1, -1, -1), g: P(1, -1, 1), h: P(-1, -1, 1)
  };

  // 三个可见面
  fillPoly(cv, [v.a, v.b, v.c, v.d], '#1de9ff', 0.16);   // 顶面
  fillPoly(cv, [v.d, v.c, v.g, v.h], '#1de9ff', 0.07);   // 右前面
  fillPoly(cv, [v.a, v.d, v.h, v.e], '#1de9ff', 0.13);   // 左前面（方案 #01：纯青蓝）

  const edges = [
    ['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'a'],
    ['e', 'f'], ['f', 'g'], ['g', 'h'], ['h', 'e'],
    ['a', 'e'], ['b', 'f'], ['c', 'g'], ['d', 'h']
  ];
  // 被遮挡的后侧边（b-f 与其相邻）用虚化处理
  const hidden = new Set(['b-f', 'a-b', 'b-c']);

  const W = cv.w * 0.0135;

  // 外发光
  for (const [p, q] of edges) {
    drawLine(cv, v[p][0], v[p][1], v[q][0], v[q][1], W * 4.5, '#1de9ff', 0.055);
  }
  // 主线
  for (const [p, q] of edges) {
    const key = p + '-' + q;
    const dim = hidden.has(key);
    drawLine(cv, v[p][0], v[p][1], v[q][0], v[q][1], W,
      dim ? '#4a7fa8' : '#3df3ff', dim ? 0.42 : 0.95);
  }
  // 顶点高光
  const R = cv.w * 0.019;
  for (const k of Object.keys(v)) {
    const dim = k === 'b';
    drawLine(cv, v[k][0], v[k][1], v[k][0], v[k][1], R * 2, '#ffffff', dim ? 0.35 : 0.9);
  }

}

/* ------------------------------- 降采样 ---------------------------------- */

function downsample(src, size) {
  const dst = createCanvas(size);
  const ratio = src.w / size;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      const y0 = Math.floor(y * ratio), y1 = Math.floor((y + 1) * ratio);
      const x0 = Math.floor(x * ratio), x1 = Math.floor((x + 1) * ratio);
      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const i = (sy * src.w + sx) * 4;
          r += src.data[i]; g += src.data[i + 1]; b += src.data[i + 2]; a += src.data[i + 3];
          n++;
        }
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
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePNG(cv) {
  const { w, h, data } = cv;
  // 每行前置一个过滤器字节（0 = None）
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
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;    // bit depth
  ihdr[9] = 6;    // color type: RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

/* -------------------------------- ICO 封装 ------------------------------- */

function encodeICO(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);                 // 1 = ICO
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  entries.forEach((e, i) => {
    const o = i * 16;
    dir[o] = e.size >= 256 ? 0 : e.size;      // 256 记为 0
    dir[o + 1] = e.size >= 256 ? 0 : e.size;
    dir[o + 2] = 0;                            // 调色板
    dir[o + 3] = 0;
    dir.writeUInt16LE(1, o + 4);               // color planes
    dir.writeUInt16LE(32, o + 6);              // bpp
    dir.writeUInt32BE(0, o + 8);
    dir.writeUInt32LE(e.png.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += e.png.length;
  });

  return Buffer.concat([header, dir, ...entries.map(e => e.png)]);
}

/* --------------------------------- 主流程 -------------------------------- */

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  process.stdout.write('绘制图标…');
  const master = createCanvas(SS);
  drawBackground(master);
  drawCube(master);
  process.stdout.write(' 完成\n');

  const entries = [];
  for (const size of SIZES) {
    process.stdout.write(`  生成 ${size}×${size} … `);
    const cv = size === SS ? master : downsample(master, size);
    const png = encodePNG(cv);
    entries.push({ size, png });
    if (size === 256) fs.writeFileSync(path.join(OUT_DIR, 'icon.png'), png);
    process.stdout.write(`${(png.length / 1024).toFixed(1)} KB\n`);
  }

  const ico = encodeICO(entries);
  const icoPath = path.join(OUT_DIR, 'icon.ico');
  fs.writeFileSync(icoPath, ico);
  console.log(`\n✔ 已生成 ${icoPath}（${(ico.length / 1024).toFixed(1)} KB，含 ${entries.length} 种尺寸）`);
}

main();
