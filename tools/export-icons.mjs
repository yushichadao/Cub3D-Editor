#!/usr/bin/env node
/**
 * 图标导出器 —— 方案 #01：线框青蓝立方体
 *
 * 将矢量图标渲染为：
 *   - PC/build/icon.png (1024) 与 PC/build/icon-512.png (512)
 *   - Android mipmap-{mdpi..xxxhdpi}/ic_launcher(_foreground|_round).png
 *
 * 关键规则：
 *   - 自适应图标 foreground 必须【透明背景】，且立方体居中在「安全区」
 *     （viewBox 108 的中心 72，占 66%），否则会被圆形遮罩裁切，显得「过大 / 糊」。
 *   - 所有备份放在 res/ 与 build/ 之外的 icon-backups/，避免 Android 资源合并器
 *     因 .bak 后缀报错（AAPT2 要求 res/ 下文件必须以 .xml/.png 结尾）。
 *
 *   node tools/export-icons.mjs            # 正式导出并替换项目图标（先备份）
 *   node tools/export-icons.mjs --test     # 仅导出到临时目录，不覆盖项目图标
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PC_BUILD = join(__root, 'PC', 'build');
const ANDROID_RES = join(__root, 'Android', 'android', 'app', 'src', 'main', 'res');

const TEST = process.argv.includes('--test');
const OUT = TEST ? join(__root, 'shared', 'icons', '_export-test') : null;

/* 立方体几何（与 shared/icons/01-cube-wireframe-cyan.svg 同构，viewBox 512） */
const CUBE_PATHS = [
  'M256 96 L400 176 L256 256 L112 176 Z',   // 顶面
  'M112 176 L256 256 L256 396 L112 316 Z',  // 左前面
  'M400 176 L256 256 L256 396 L400 316 Z',  // 右前面
  'M256 256 L256 396'                        // 中间竖边
];
const VERTS = [[256, 96], [400, 176], [112, 176], [256, 396]];

/* 映射到自适应 foreground 的 viewBox 108：scale=0.22，使立方体完全落在中心安全区 [18,90] */
const SAFE_T = 'translate(-2.32,-2.32) scale(0.22)';

function cubeGroup(stroke, vertex, t, strokeW = 10) {
  const paths = CUBE_PATHS.map(d => `<path d="${d}"/>`).join('');
  const dots = VERTS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join('');
  return `<g fill="none" stroke="${stroke}" stroke-width="${strokeW}" stroke-linejoin="round" stroke-linecap="round" transform="${t}">${paths}</g>`
       + `<g fill="${vertex}" transform="${t}">${dots}</g>`;
}

/* 自适应 foreground：透明背景 + 居中安全区的线框立方体（无 glow，保证清晰） */
const FG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="108" height="108">
<defs><linearGradient id="st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22D3EE"/><stop offset="1" stop-color="#0EA5E9"/></linearGradient></defs>
${cubeGroup('url(#st)', '#22D3EE', SAFE_T)}
</svg>`;

/* 传统图标：白底 + 居中安全区的线框立方体（Android 7 及以下 / 圆形遮罩设备） */
const LEGACY_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="108" height="108">
<defs><linearGradient id="st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22D3EE"/><stop offset="1" stop-color="#0EA5E9"/></linearGradient></defs>
<rect width="108" height="108" fill="#FFFFFF"/>
${cubeGroup('url(#st)', '#22D3EE', SAFE_T)}
</svg>`;

/* PC 文档/商店用图：深色圆角背景 + 青蓝线框立方体（与 _genicon 风格一致） */
const PC_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B1220"/><stop offset="1" stop-color="#0E1A2E"/></linearGradient>
<linearGradient id="st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22D3EE"/><stop offset="1" stop-color="#0EA5E9"/></linearGradient>
</defs>
<rect width="512" height="512" rx="112" fill="url(#bg)"/>
${cubeGroup('url(#st)', '#22D3EE', 'translate(0,0) scale(1)', 10)}
</svg>`;

const DENS = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };

async function main() {
  const sharp = (await import('sharp')).default;

  const tasks = [];
  // PC
  mkdirSync(PC_BUILD, { recursive: true });
  tasks.push({ svg: PC_SVG, size: 1024, path: join(PC_BUILD, 'icon.png'), backup: join(PC_BUILD, '..', 'icon-backups', 'icon.png.bak') });
  tasks.push({ svg: PC_SVG, size: 512, path: join(PC_BUILD, 'icon-512.png'), backup: join(PC_BUILD, '..', 'icon-backups', 'icon-512.png.bak') });

  // Android
  for (const [d, size] of Object.entries(DENS)) {
    const dir = join(ANDROID_RES, `mipmap-${d}`);
    if (!existsSync(dir)) continue;
    const bk = join(ANDROID_RES, '..', 'icon-backups', d);
    tasks.push({ svg: FG_SVG, size, path: join(dir, 'ic_launcher_foreground.png'), backup: join(bk, 'ic_launcher_foreground.png.bak') });
    tasks.push({ svg: LEGACY_SVG, size, path: join(dir, 'ic_launcher.png'), backup: join(bk, 'ic_launcher.png.bak') });
    tasks.push({ svg: LEGACY_SVG, size, path: join(dir, 'ic_launcher_round.png'), backup: join(bk, 'ic_launcher_round.png.bak') });
  }

  for (const t of tasks) {
    if (TEST) {
      const out = join(OUT, `${t.size}-${basename(t.path)}`);
      mkdirSync(OUT, { recursive: true });
      const buf = await sharp(Buffer.from(t.svg)).png().resize(t.size, t.size).toBuffer();
      writeFileSync(out, buf);
      console.log(`[test] ${out} (${t.size}px)`);
    } else {
      mkdirSync(dirname(t.backup), { recursive: true });
      if (existsSync(t.path) && !existsSync(t.backup)) copyFileSync(t.path, t.backup);
      const buf = await sharp(Buffer.from(t.svg)).png().resize(t.size, t.size).toBuffer();
      writeFileSync(t.path, buf);
      console.log(`✔ ${t.path} (${t.size}px)`);
    }
  }
  console.log(TEST ? '\n测试导出完成（未覆盖项目图标）' : '\n图标已更新并备份');
}

main().catch(e => { console.error(e); process.exit(1); });
