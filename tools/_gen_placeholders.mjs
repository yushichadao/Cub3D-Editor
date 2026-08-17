// 临时脚本：程序化生成宣传页占位 PNG（og:image + 预览区占位图）。
// 仅生成占位，用户提供真实截图后替换同名文件即可，无需改 HTML 引用。
// 用法：node tools/_gen_placeholders.mjs
import { deflateSync } from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'assets');
fs.mkdirSync(OUT, { recursive: true });

// ---------- 最小 PNG 编码 ----------
function crc32(buf) {
  let c, table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const t = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}
function encodePNG(w, h, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0; // filter: None
    rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const idat = deflateSync(raw);
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

// ---------- 占位图绘制 ----------
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// 生成一张 16:9 深色渐变面板占位图（模拟编辑器画布 + 网格 + 中央青色方块 + 底部平台文字条）
function genPanel(w, h, accent = [90, 209, 196]) {
  const px = Buffer.alloc(w * h * 4);
  const put = (x, y, r, g, b, a) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const i = (y * w + x) * 4;
    // 简单 alpha 混合（背景不透明，仅叠加元素半透明）
    const sa = a / 255;
    px[i] = Math.round(r * sa + px[i] * (1 - sa));
    px[i + 1] = Math.round(g * sa + px[i + 1] * (1 - sa));
    px[i + 2] = Math.round(b * sa + px[i + 2] * (1 - sa));
    px[i + 3] = 255;
  };
  // 背景：深色垂直渐变 #0e0f13 -> #16181f
  for (let y = 0; y < h; y++) {
    const t = y / h;
    const r = Math.round(lerp(0x0e, 0x16, t));
    const g = Math.round(lerp(0x0f, 0x18, t));
    const b = Math.round(lerp(0x13, 0x1f, t));
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      px[i] = r; px[i + 1] = g; px[i + 2] = b; px[i + 3] = 255;
    }
  }
  // 网格线（模拟编辑器画布）
  const grid = 48;
  for (let x = 0; x < w; x += grid)
    for (let y = 0; y < h; y++) put(x, y, accent[0], accent[1], accent[2], 22);
  for (let y = 0; y < h; y += grid)
    for (let x = 0; x < w; x++) put(x, y, accent[0], accent[1], accent[2], 22);
  // 中央青色方块（立方体感：三个面）
  const cw = Math.min(w, h) * 0.16;
  const cx = Math.round(w / 2), cy = Math.round(h / 2);
  const half = Math.round(cw / 2);
  const top = Math.round(cw * 0.32);
  // 顶面
  for (let dy = 0; dy <= top; dy++)
    for (let dx = -dy; dx <= dy; dx++) put(cx + dx, cy - top + dy, accent[0], accent[1], accent[2], 150);
  // 左面
  for (let dy = 0; dy < half; dy++)
    for (let dx = -dy; dx <= dy; dx++) put(cx + dx, cy + dy, 60, 200, 190, 110);
  // 右面
  for (let dy = 0; dy < half; dy++)
    for (let dx = dy; dx >= -dy; dx--) put(cx + half - dy + dx, cy + dy, 40, 160, 155, 90);
  // 高光描边
  const edge = (x0, y0, x1, y1) => {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
    for (let s = 0; s <= steps; s++) put(Math.round(lerp(x0, x1, s / steps)), Math.round(lerp(y0, y1, s / steps)), accent[0], accent[1], accent[2], 235);
  };
  edge(cx - half, cy - top, cx + half, cy - top);        // 顶边
  edge(cx - half, cy - top, cx, cy);                      // 左边
  edge(cx + half, cy - top, cx, cy);                      // 右边
  edge(cx, cy, cx + half, cy);                            // 中右下
  edge(cx, cy, cx - half, cy);                            // 中左下
  edge(cx - half, cy, cx - half, cy + half);              // 下左
  edge(cx + half, cy, cx + half, cy + half);              // 下右
  return encodePNG(w, h, px);
}

// og:image 1200x630
fs.writeFileSync(path.join(OUT, 'og-card.png'), genPanel(1200, 630));

console.log('Generated placeholder PNGs -> ' + OUT);
