#!/usr/bin/env node
/**
 * Cub3D Editor 图标导出工具
 * 将 shared/icons/<id>-*.svg 光栅化为 PNG，并（可选）替换 PC 与 Android 图标。
 *
 * 用法：
 *   node tools/export-icons.mjs <方案编号>            # 备份并替换项目图标
 *   node tools/export-icons.mjs <方案编号> --test     # 仅导出到 shared/icons/export/<id>/ 验证，不改动项目文件
 *   node tools/export-icons.mjs --list                # 列出可用方案
 *
 * 依赖：sharp（首次运行会自动 npm install sharp --no-save）
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, rmSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ICONS_DIR = join(ROOT, 'shared', 'icons');
const ANDROID_RES = join(ROOT, 'Android', 'android', 'app', 'src', 'main', 'res');
const PC_BUILD = join(ROOT, 'PC', 'build');

const DENSITIES = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };

// ---------- 参数解析 ----------
const args = process.argv.slice(2);
const TEST = args.includes('--test');
const LIST = args.includes('--list');
let id = args.find(a => /^\d{2}$/.test(a));

// ---------- 列出方案 ----------
function listIcons() {
  const files = readdirSync(ICONS_DIR).filter(f => /^\d{2}-.*\.svg$/.test(f));
  console.log('可用图标方案（编号 → 文件）：');
  files.sort().forEach(f => console.log('  ' + f.match(/^\d{2}/)[0] + '  ' + f));
}

// ---------- 加载 sharp（按需安装）----------
async function loadSharp() {
  try {
    return (await import('sharp')).default;
  } catch {
    console.log('未找到 sharp，正在安装（npm install sharp --no-save）...');
    execSync('npm install sharp --no-save', { cwd: __dirname, stdio: 'inherit' });
    return (await import('sharp')).default;
  }
}

// ---------- 去除背景，得到透明前景版 SVG ----------
function stripBackground(svg) {
  return svg.replace(/<rect[^>]*fill="url\(#bg\)"[^>]*\/>/, '');
}

// ---------- 主流程 ----------
async function main() {
  if (LIST) { await listIcons(); return; }
  if (!id) {
    console.error('用法: node tools/export-icons.mjs <方案编号> [--test]\n示例: node tools/export-icons.mjs 03 --test');
    process.exit(1);
  }
  const srcSvg = join(ICONS_DIR, `${id}-cube-*.svg`);
  const matched = readdirSync(ICONS_DIR).filter(f => f.startsWith(id + '-') && f.endsWith('.svg'));
  if (matched.length === 0) {
    console.error(`未找到方案 ${id} 对应的 SVG（在 ${ICONS_DIR}）`);
    process.exit(1);
  }
  const svgFile = join(ICONS_DIR, matched[0]);
  const svgName = basename(svgFile);
  const fullSvg = readFileSync(svgFile, 'utf8');
  const fgSvg = stripBackground(fullSvg);

  const sharp = await loadSharp();

  const outDir = TEST ? join(ICONS_DIR, 'export', id) : null;
  if (TEST) { rmSync(outDir, { recursive: true, force: true }); mkdirSync(outDir, { recursive: true }); }

  // PC 尺寸
  const pcSizes = TEST ? [1024, 512] : [1024, 512];
  // Android 尺寸
  const androidSizes = DENSITIES;

  const tasks = [];

  // PC
  if (TEST) {
    tasks.push({ buf: await sharp(Buffer.from(fullSvg)).png().resize(1024).toBuffer(), path: join(outDir, 'pc-icon-1024.png') });
    tasks.push({ buf: await sharp(Buffer.from(fullSvg)).png().resize(512).toBuffer(), path: join(outDir, 'pc-icon-512.png') });
  } else {
    mkdirSync(PC_BUILD, { recursive: true });
    tasks.push({ buf: await sharp(Buffer.from(fullSvg)).png().resize(1024).toBuffer(), path: join(PC_BUILD, 'icon.png'), backup: join(PC_BUILD, 'icon.png.bak') });
    tasks.push({ buf: await sharp(Buffer.from(fullSvg)).png().resize(512).toBuffer(), path: join(PC_BUILD, 'icon-512.png'), backup: join(PC_BUILD, 'icon-512.png.bak') });
  }

  // Android
  for (const [density, size] of Object.entries(androidSizes)) {
    const dir = join(ANDROID_RES, `mipmap-${density}`);
    if (!existsSync(dir)) continue;
    const fullBuf = await sharp(Buffer.from(fullSvg)).png().resize(size).toBuffer();
    const fgBuf = await sharp(Buffer.from(fgSvg)).png().resize(size).toBuffer();
    const targets = [
      { name: 'ic_launcher.png', buf: fullBuf },
      { name: 'ic_launcher_round.png', buf: fullBuf },
    ];
    if (existsSync(join(dir, 'ic_launcher_foreground.png'))) {
      targets.push({ name: 'ic_launcher_foreground.png', buf: fgBuf });
    }
    for (const t of targets) {
      const p = join(dir, t.name);
      if (TEST) {
        tasks.push({ buf: t.buf, path: join(outDir, `android-${density}-${t.name}`) });
      } else {
        tasks.push({ buf: t.buf, path: p, backup: p + '.bak' });
      }
    }
  }

  // 写入
  let replaced = 0;
  for (const t of tasks) {
    if (t.backup && existsSync(t.path) && !existsSync(t.backup)) {
      copyFileSync(t.path, t.backup);
    }
    writeFileSync(t.path, t.buf);
    replaced++;
    console.log((TEST ? '[TEST] 写入 ' : '替换 ') + t.path);
  }

  console.log(`\n完成：方案 #${id}（${svgName}）`);
  console.log(TEST
    ? `仅验证，已在 ${outDir} 生成 ${replaced} 个 PNG，未改动项目文件。`
    : `已备份原图标（*.bak）并替换 ${replaced} 个图标文件。`);
}

main().catch(e => { console.error(e); process.exit(1); });
