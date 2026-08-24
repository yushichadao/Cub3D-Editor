/**
 * tools/inject-version.mjs — 单一版本源构建注入（T5）
 *
 * 打包阶段由各端 prebuild 调用：
 *   node tools/inject-version.mjs --platform pc
 *   node tools/inject-version.mjs --platform android
 *   node tools/inject-version.mjs --platform web
 *
 * 注入规则（权威）：
 *   统一注入「长版本号」，不再注入短版本号（X.X.X，已撤除）：
 *     __CUB3D_LONG__    = 打包/分发当天日期 YYYYMMDD（长版本号，程序自动生成 = 打包时间）
 *
 * 未打包态（预览态）默认值（由三端源 index.html 预置，构建时被本脚本覆盖）：
 *   window.__CUB3D_LONG__ = BOOTV（真实 YYYYMMDD，与 meta[bootv] 一致）
 * 注意：__CUB3D_LONG__ 的预览态占位必须用真实长号 BOOTV，而非 '00000000'。
 * 若预置 '00000000' 这类非空占位，`window.__CUB3D_LONG__ || BOOTV` 会被短路成
 * 占位值，导致便签 longVersion 全被写成占位、旧版本角标永不触发（2026-08-24 修复）。
 *
 * 不修改源 index.html（保持预览态可用），仅注入到构建副本（out/、www/、dist/ 等）。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
// 支持两种写法：--platform=android 与 --platform android
let platform = 'pc';
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--platform=')) { platform = args[i].split('=')[1]; break; }
  if (args[i] === '--platform' && args[i + 1]) { platform = args[i + 1]; break; }
}

// 长版本号 = 打包/分发当天日期 YYYYMMDD
const longVer = new Date().toISOString().slice(0, 10).replace(/-/g, '');

// 目标构建副本（不碰源 index.html）
const targets = {
  pc: [path.join(ROOT, 'pc', 'out', 'pc', 'index.html')],
  android: [path.join(ROOT, 'android', 'www', 'index.html')],
  web: [path.join(ROOT, 'web', 'dist', 'index.html')],
};

// 三端统一只注入长版本号（短版本号已撤除）
const snippet = `<script>window.__CUB3D_LONG__=${JSON.stringify(longVer)};window.__CUB3D_PACKAGED__=true;</script>`;

let n = 0;
for (const t of targets[platform] || []) {
  if (!fs.existsSync(t)) { console.warn('[inject-version] 跳过（构建副本不存在）：', t); continue; }
  let s = fs.readFileSync(t, 'utf8');
  if (s.includes('__CUB3D_PACKAGED__=true')) { console.log('[inject-version] 已注入，跳过：', t); n++; continue; }
  // 注入长版本号（覆盖预览态占位值）
  if (s.includes('</body>')) s = s.replace('</body>', snippet + '\n</body>');
  else s += snippet;
  fs.writeFileSync(t, s);
  console.log('[inject-version] 注入', platform, '（长=' + longVer + '）');
  n++;
}
console.log('[inject-version] 完成：', n, '个文件注入（平台', platform, '）');
