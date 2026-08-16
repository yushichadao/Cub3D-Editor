/**
 * Android 图标生成器（零依赖）
 *
 * 来源：PC/build/icon-512.png（暗底青蓝线框立方体 #01 设计）。
 * 安卓为亮底，因此将立方体保留、背景替换为白底：
 *   - 旧版图标  ic_launcher.png      → 圆角白底 + 青蓝立方体（四角透明）
 *   - 旧版圆形  ic_launcher_round.png → 圆形白底 + 青蓝立方体
 *   - 自适应前景 ic_launcher_foreground.png → 透明底 + 青蓝立方体
 *
 * 之前基于 design 稿重绘的生成方式已废弃（生成异常），现统一以 icon-512.png 为单一来源。
 *
 *   node scripts/_genicon-android.mjs
 *
 * 输出到 android/app/src/main/res/mipmap-* 各密度目录。
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RES = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');
const SRC_PNG = path.join(__dirname, '..', '..', 'PC', 'build', 'icon-512.png');

const LEGACY = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
const FG = { mdpi: 108, hdpi: 162, xhdpi: 216, xxhdpi: 324, xxxhdpi: 432 };

/* ----------------------------- 解码源 PNG ------------------------------- */

function decodePNG(file) {
  const b = fs.readFileSync(file);
  let p = 8, idat = [], W = 0, H = 0, ct = 6, bitDepth = 8;
  while (p < b.length) {
    const len = b.readUInt32BE(p);
    const type = b.toString('ascii', p + 4, p + 8);
    const data = b.subarray(p + 8, p + 8 + len);
    if (type === 'IHDR') {
      W = data.readUInt32BE(0); H = data.readUInt32BE(4);
      bitDepth = data[8]; ct = data[9];
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') break;
    p += 12 + len;
  }
  if (bitDepth !== 8 || (ct !== 6 && ct !== 2 && ct !== 0)) {
    throw new Error(`不支持的 PNG 格式：bitDepth=${bitDepth} colorType=${ct}`);
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const channels = ct === 6 ? 4 : ct === 2 ? 3 : 1;
  const stride = W * channels;
  const out = Buffer.alloc(H * stride);
  let q = 0;
  const paeth = (a, bb, c) => {
    const pp = a + bb - c;
    const pa = Math.abs(pp - a), pb = Math.abs(pp - bb), pc = Math.abs(pp - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? bb : c;
  };
  for (let y = 0; y < H; y++) {
    const f = raw[q++];
    for (let x = 0; x < stride; x++) {
      const v = raw[q++];
      const a = x >= channels ? out[y * stride + x - channels] : 0;
      const bb = y > 0 ? out[(y - 1) * stride + x] : 0;
      const c = (x >= channels && y > 0) ? out[(y - 1) * stride + x - channels] : 0;
      let r;
      switch (f) {
        case 0: r = v; break;
        case 1: r = v + a; break;
        case 2: r = v + bb; break;
        case 3: r = v + ((a + bb) >> 1); break;
        case 4: r = v + paeth(a, bb, c); break;
        default: r = v;
      }
      out[y * stride + x] = r & 255;
    }
  }
  const rgba = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    const si = i * channels;
    rgba[i * 4] = out[si];
    rgba[i * 4 + 1] = out[si + 1];
    rgba[i * 4 + 2] = out[si + 2];
    rgba[i * 4 + 3] = channels === 4 ? out[si + 3] : 255;
  }
  return { w: W, h: H, data: rgba };
}

// 将 icon-512（暗底）拆分为「立方体层」与「白底合成层」
//   - 暗色（深蓝背景）与透明角 → 立方体层丢弃 / 白底层填白
//   - 青蓝立方体（含发光）→ 保留青色
function splitLayers(src) {
  const n = src.w * src.h;
  const fg = Buffer.alloc(n * 4);       // 立方体在透明底
  const white = Buffer.alloc(n * 4);    // 立方体在白底
  for (let i = 0; i < n; i++) {
    const si = i * 4;
    const r = src.data[si], g = src.data[si + 1], b = src.data[si + 2], a = src.data[si + 3];
    const o = si;
    if (a < 50) {
      // 透明（圆角外）：两种层都透明（白底层后续四角保持透明 = 圆角）
      fg[o + 3] = 0; white[o + 3] = 0;
    } else {
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum < 70) {
        // 暗蓝背景 → 立方体层透明；白底层填白
        fg[o + 3] = 0;
        white[o] = 255; white[o + 1] = 255; white[o + 2] = 255; white[o + 3] = 255;
      } else {
        // 青蓝立方体 → 两种层都保留青色
        fg[o] = r; fg[o + 1] = g; fg[o + 2] = b; fg[o + 3] = 255;
        white[o] = r; white[o + 1] = g; white[o + 2] = b; white[o + 3] = 255;
      }
    }
  }
  return { fg, white, w: src.w, h: src.h };
}

/* ----------------- 预乘 alpha 面积平均降采样 ----------------- */

function downsamplePremul(src, sw, sh, size) {
  const dst = Buffer.alloc(size * size * 4);
  const ratio = sw / size;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const y0 = Math.max(0, Math.floor(y * ratio));
      const y1 = Math.min(sh, Math.ceil((y + 1) * ratio));
      const x0 = Math.max(0, Math.floor(x * ratio));
      const x1 = Math.min(sw, Math.ceil((x + 1) * ratio));
      let ar = 0, ag = 0, ab = 0, aa = 0, n = 0;
      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const i = (sy * sw + sx) * 4;
          const a = src[i + 3];
          ar += src[i] * a; ag += src[i + 1] * a; ab += src[i + 2] * a; aa += a; n++;
        }
      }
      const o = (y * size + x) * 4;
      if (aa === 0) { dst[o + 3] = 0; }
      else {
        dst[o] = Math.round(ar / aa); dst[o + 1] = Math.round(ag / aa);
        dst[o + 2] = Math.round(ab / aa); dst[o + 3] = Math.round(aa / n);
      }
    }
  }
  return { w: size, h: size, data: dst };
}

// 圆形裁剪（用于 _round 图标）：圆外 → 透明
function clipCircle(img) {
  const { w, h, data } = img;
  const cx = w / 2, cy = h / 2, R = w / 2 - 1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = x - cx, dy = y - cy;
      if (dx * dx + dy * dy > R * R) data[(y * w + x) * 4 + 3] = 0;
    }
  }
  return img;
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
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

/* --------------------------------- 主流程 -------------------------------- */

function main() {
  if (!fs.existsSync(SRC_PNG)) {
    throw new Error(`找不到源图标 ${SRC_PNG}，请先确保 PC/build/icon-512.png 存在`);
  }
  console.log(`读取源图标（${SRC_PNG}）…`);
  const src = decodePNG(SRC_PNG);
  const { fg, white } = splitLayers(src);

  let count = 0;
  // 旧版全图标：圆角白底 + 圆形白底
  for (const [d, s] of Object.entries(LEGACY)) {
    const dir = path.join(RES, `mipmap-${d}`);
    fs.mkdirSync(dir, { recursive: true });
    const rounded = downsamplePremul(white, src.w, src.h, s);
    const circle = clipCircle(downsamplePremul(white, src.w, src.h, s));
    fs.writeFileSync(path.join(dir, 'ic_launcher.png'), encodePNG(rounded));
    fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), encodePNG(circle));
    count += 2;
    console.log(`  mipmap-${d}: ic_launcher.png / _round.png (${s}px, 白底)`);
  }
  // 自适应前景：透明底 + 青蓝立方体
  for (const [d, s] of Object.entries(FG)) {
    const dir = path.join(RES, `mipmap-${d}`);
    fs.mkdirSync(dir, { recursive: true });
    const f = downsamplePremul(fg, src.w, src.h, s);
    fs.writeFileSync(path.join(dir, 'ic_launcher_foreground.png'), encodePNG(f));
    count += 1;
    console.log(`  mipmap-${d}: ic_launcher_foreground.png (${s}px, 透明底)`);
  }
  console.log(`\n✔ 已生成 Android 图标（源自 PC/build/icon-512.png，白底 #01b）：共 ${count} 个 PNG`);
}

main();
