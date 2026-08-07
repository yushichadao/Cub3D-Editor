// 生成 NSIS 安装器左侧品牌侧边栏图（164x314，现代渐变 + 圆形 logo 占位）
// 用法: node scripts/_geninstallerbmp.mjs
import fs from 'node:fs';
import path from 'node:path';

const W = 164;
const H = 314;

// 渐变端点 (R,G,B)
const top = [22, 35, 92]; // 深靛 #16235C
const bot = [59, 107, 255]; // 亮蓝 #3B6BFF

const lerp = (a, b, t) => Math.round(a + (b - a) * t);

const rowSize = W * 3;
const pad = (4 - (rowSize % 4)) % 4;
const stride = rowSize + pad;
const pixels = Buffer.alloc(H * stride);

const cx = 82;
const cy = 132;
const rLogo = 40; // 白色 logo 圆
const rRing = 50; // 浅色外环

for (let y = 0; y < H; y++) {
  const t = y / (H - 1);
  let R = lerp(top[0], bot[0], t);
  let G = lerp(top[1], bot[1], t);
  let B = lerp(top[2], bot[2], t);
  for (let x = 0; x < W; x++) {
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // 外环（浅蓝细环）
    if (Math.abs(dist - rRing) < 2) {
      R = 130; G = 168; B = 255;
    }
    // 内圆 logo 占位（白色，带轻微高光）
    if (dist < rLogo) {
      const k = 1 - dist / rLogo; // 中心更亮
      R = 245 + Math.round(10 * k);
      G = 247 + Math.round(8 * k);
      B = 255;
    }

    const off = y * stride + x * 3;
    pixels[off] = B;
    pixels[off + 1] = G;
    pixels[off + 2] = R;
  }
}

// BMP 文件头 (14) + BITMAPINFOHEADER (40) + 像素
const fileSize = 14 + 40 + pixels.length;
const fileHeader = Buffer.alloc(14);
fileHeader.write('BM', 0);
fileHeader.writeUInt32LE(fileSize, 2);
fileHeader.writeUInt32LE(0, 6);
fileHeader.writeUInt32LE(54, 10);

const infoHeader = Buffer.alloc(40);
infoHeader.writeUInt32LE(40, 0);
infoHeader.writeInt32LE(W, 4);
infoHeader.writeInt32LE(-H, 8); // 负高度 = top-down 存储
infoHeader.writeUInt16LE(1, 12);
infoHeader.writeUInt16LE(24, 14);
infoHeader.writeUInt32LE(0, 16);
infoHeader.writeUInt32LE(pixels.length, 20);
infoHeader.writeUInt32LE(2835, 24); // 72 DPI
infoHeader.writeUInt32LE(2835, 28);
infoHeader.writeUInt32LE(0, 32);
infoHeader.writeUInt32LE(0, 36);

const out = path.resolve('build/installer-sidebar.bmp');
fs.writeFileSync(out, Buffer.concat([fileHeader, infoHeader, pixels]));
console.log('written', out, fileSize, 'bytes');
