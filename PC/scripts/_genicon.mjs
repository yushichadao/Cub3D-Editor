/**
 * 应用图标生成器（零依赖）
 *
 * PC 桌面端（双 exe）图标直接以 build/icon-512.png 为唯一来源，
 * 将其降采样为各尺寸后封装成 .ico 与 256×256 的 .png。
 *
 *   node scripts/_genicon.mjs
 *
 * 产物：build/icon.ico（含 16/24/32/48/64/128/256 七种尺寸，均源自 icon-512.png）
 *      build/icon.png（256×256，与 icon-512.png 同源）
 */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'build');
const SRC_PNG = path.join(OUT_DIR, 'icon-512.png');

const SIZES = [256, 128, 64, 48, 32, 24, 16];

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
  // 统一为 RGBA
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

/* ------------------------------- 降采样 ---------------------------------- */

function downsample(src, size) {
  const dst = Buffer.alloc(size * size * 4);
  const ratio = src.w / size;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0, n = 0;
      const y0 = Math.max(0, Math.floor(y * ratio));
      const y1 = Math.min(src.h, Math.ceil((y + 1) * ratio));
      const x0 = Math.max(0, Math.floor(x * ratio));
      const x1 = Math.min(src.w, Math.ceil((x + 1) * ratio));
      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const i = (sy * src.w + sx) * 4;
          r += src.data[i]; g += src.data[i + 1]; b += src.data[i + 2]; a += src.data[i + 3];
          n++;
        }
      }
      const i = (y * size + x) * 4;
      dst[i] = r / n; dst[i + 1] = g / n; dst[i + 2] = b / n; dst[i + 3] = a / n;
    }
  }
  return { w: size, h: size, data: dst };
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
  if (!fs.existsSync(SRC_PNG)) {
    throw new Error(`找不到源图标 ${SRC_PNG}，请先提供正确的 512×512 图标`);
  }

  process.stdout.write(`读取源图标（${path.basename(SRC_PNG)}）… `);
  const src = decodePNG(SRC_PNG);
  console.log(`${src.w}×${src.h}`);

  const entries = [];
  for (const size of SIZES) {
    process.stdout.write(`  生成 ${size}×${size} … `);
    const cv = size === src.w ? src : downsample(src, size);
    const png = encodePNG(cv);
    entries.push({ size, png });
    if (size === 256) fs.writeFileSync(path.join(OUT_DIR, 'icon.png'), png);
    process.stdout.write(`${(png.length / 1024).toFixed(1)} KB\n`);
  }

  const ico = encodeICO(entries);
  const icoPath = path.join(OUT_DIR, 'icon.ico');
  fs.writeFileSync(icoPath, ico);
  console.log(`\n✔ 已生成 ${icoPath}（${(ico.length / 1024).toFixed(1)} KB，含 ${entries.length} 种尺寸，源自 ${path.basename(SRC_PNG)}）`);
}

main();
