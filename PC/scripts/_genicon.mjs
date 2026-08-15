/**
 * 应用图标生成器（零依赖）
 *
 * 忠实栅格化 shared/icons/01-cube-wireframe-cyan.svg（暗底 + 青蓝线框立方体）：
 *   - 圆角矩形背景，深蓝径向渐变
 *   - 4 条 path 描边（青蓝渐变），带轻微外发光
 *   - 4 个节点圆点（青蓝）
 *
 * 几何坐标与源 SVG（viewBox 0 0 512 512）完全一致，改 SVG 后只需同步本文件。
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

function lerp(a, b, t) { return a + (b - a) * t; }
function mix(c1, c2, t) {
  const a = hex(c1), b = hex(c2);
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** 圆角矩形背景，深蓝径向渐变（对应 01 SVG 的 #0B1220 → #0E1A2E） */
function drawBackground(cv) {
  const R = cv.w * (112 / 512);     // 与 SVG rx=112 一致
  const cx = cv.w / 2, cy = cv.h / 2;
  const inner = hex('#0B1220');     // 角（亮一点）
  const outer = hex('#0E1A2E');     // 中心（深一点）——SVG 是左上深/右下更深，这里用径向近似
  const maxD = Math.hypot(cx, cy);

  for (let y = 0; y < cv.h; y++) {
    for (let x = 0; x < cv.w; x++) {
      const dx = Math.max(Math.abs(x - cx) - (cv.w / 2 - R), 0);
      const dy = Math.max(Math.abs(y - cy) - (cv.h / 2 - R), 0);
      const dist = Math.hypot(dx, dy) - R;
      let a = 1 - Math.min(Math.max(dist + 0.5, 0), 1);
      if (a <= 0) continue;

      const t = Math.min(Math.hypot(x - cx, y - cy) / maxD, 1);
      blend(cv, x, y,
        inner[0] + (outer[0] - inner[0]) * t,
        inner[1] + (outer[1] - inner[1]) * t,
        inner[2] + (outer[2] - inner[2]) * t,
        a);
    }
  }
}

/** 线段绘制（带柔边 + 外发光），只遍历包围盒 */
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

/** 实心圆点（节点高光） */
function drawDot(cv, cx, cy, radius, color) {
  const [r, g, b] = hex(color);
  const minX = Math.max(0, Math.floor(cx - radius - 1));
  const maxX = Math.min(cv.w - 1, Math.ceil(cx + radius + 1));
  const minY = Math.max(0, Math.floor(cy - radius - 1));
  const maxY = Math.min(cv.h - 1, Math.ceil(cy + radius + 1));
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const d = Math.hypot(x - cx, y - cy);
      const a = (1 - Math.min(Math.max(d - radius + 1, 0), 1));
      if (a > 0) blend(cv, x, y, r, g, b, a);
    }
  }
}

/* 源 SVG 坐标（viewBox 0 0 512 512），等比缩放到画布 */
const PTS = {
  top: [256, 96],
  right: [400, 176],
  center: [256, 256],
  left: [112, 176],
  bottom: [256, 396],
  leftBot: [112, 316],
  rightBot: [400, 316]
};
const DOTS = [[256, 96], [400, 176], [112, 176], [256, 396]];

/** 绘制线框立方体（与 01 SVG 完全一致的正面展开投影） */
function drawCube(cv) {
  const s = cv.w / 512;
  const S = (x, y) => [x * s, y * s];

  const strokeW = cv.w * (10 / 512);
  const glowW = strokeW * 4;

  // 外发光层（青蓝，低透明度）
  const glow = '#22D3EE';
  drawLine(cv, ...S(...PTS.top), ...S(...PTS.right), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.right), ...S(...PTS.center), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.center), ...S(...PTS.left), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.left), ...S(...PTS.top), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.left), ...S(...PTS.center), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.center), ...S(...PTS.leftBot), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.right), ...S(...PTS.center), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.center), ...S(...PTS.rightBot), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.left), ...S(...PTS.leftBot), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.leftBot), ...S(...PTS.bottom), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.right), ...S(...PTS.rightBot), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.rightBot), ...S(...PTS.bottom), glowW, glow, 0.05);
  drawLine(cv, ...S(...PTS.center), ...S(...PTS.bottom), glowW, glow, 0.05);

  // 主线层（青蓝渐变：近似统一用 #2BC4EE 中间色）
  const main = '#2BC4EE';
  // 顶面菱形
  drawLine(cv, ...S(...PTS.top), ...S(...PTS.right), strokeW, main, 0.97);
  drawLine(cv, ...S(...PTS.right), ...S(...PTS.center), strokeW, main, 0.97);
  drawLine(cv, ...S(...PTS.center), ...S(...PTS.left), strokeW, main, 0.97);
  drawLine(cv, ...S(...PTS.left), ...S(...PTS.top), strokeW, main, 0.97);
  // 左前面
  drawLine(cv, ...S(...PTS.left), ...S(...PTS.center), strokeW, main, 0.97);
  drawLine(cv, ...S(...PTS.center), ...S(...PTS.leftBot), strokeW, main, 0.97);
  drawLine(cv, ...S(...PTS.leftBot), ...S(...PTS.bottom), strokeW, main, 0.97);
  drawLine(cv, ...S(...PTS.bottom), ...S(...PTS.left), strokeW, main, 0.97);
  // 右前面
  drawLine(cv, ...S(...PTS.right), ...S(...PTS.center), strokeW, main, 0.97);
  drawLine(cv, ...S(...PTS.center), ...S(...PTS.rightBot), strokeW, main, 0.97);
  drawLine(cv, ...S(...PTS.rightBot), ...S(...PTS.bottom), strokeW, main, 0.97);
  drawLine(cv, ...S(...PTS.bottom), ...S(...PTS.right), strokeW, main, 0.97);
  // 中竖线
  drawLine(cv, ...S(...PTS.center), ...S(...PTS.bottom), strokeW, main, 0.97);

  // 节点圆点（r=7 in SVG → 缩放到画布，加轻微发光）
  const rDot = cv.w * (7 / 512);
  for (const [dx, dy] of DOTS) {
    drawDot(cv, dx * s, dy * s, rDot * 1.8, glow);     // 发光
    drawDot(cv, dx * s, dy * s, rDot, '#22D3EE');      // 实心
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
    dir[o] = e.size >= 256 ? 0 : e.size;
    dir[o + 1] = e.size >= 256 ? 0 : e.size;
    dir[o + 2] = 0;
    dir[o + 3] = 0;
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
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

  process.stdout.write('绘制图标（暗底 01 设计稿）…');
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
