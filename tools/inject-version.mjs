/**
 * tools/inject-version.mjs — 单一版本源构建注入（T5）
 *
 * 打包阶段由各端 prebuild 调用：
 *   node tools/inject-version.mjs --platform pc
 *   node tools/inject-version.mjs --platform android
 *   node tools/inject-version.mjs --platform web
 *
 * 注入规则（权威）：
 *   - PC / 安卓：构建时注入「长版本号 + 短版本号」两者。
 *       __CUB3D_LONG__   = 打包当天日期 YYYYMMDD（长版本号，程序自动生成 = 打包时间）
 *       __CUB3D_VERSION__= 打包页人工输入的短版本号（X.X.X）
 *   - Web：分发时注入「长版本号」即可，不注入短版本号（Web 无短号）。
 *       __CUB3D_LONG__   = 分发当天日期 YYYYMMDD
 *
 * 未打包态（预览态）默认值（由三端源 index.html 预置，构建时被本脚本覆盖）：
 *   window.__CUB3D_LONG__    = BOOTV（真实 YYYYMMDD，与 meta[bootv] 一致）
 *   window.__CUB3D_VERSION__ = 'X.X.X'      （短版本号占位）
 * 注意：__CUB3D_LONG__ 的预览态占位必须用真实长号 BOOTV，而非 '00000000'。
 * 若预置 '00000000' 这类非空占位，`window.__CUB3D_LONG__ || BOOTV` 会被短路成
 * 占位值，导致便签 longVersion 全被写成占位、旧版本角标永不触发（2026-08-24 修复）。
 *
 * 不修改源 index.html（保持预览态可用），仅注入到构建副本（out/、www/、dist/ 等）。
 * 注：Web 主站长号由管理端 packer 改写 web/index.html 源的 BOOTV 赋予（换网页流程），
 *     此处对 web/dist 构建副本同样注入 __CUB3D_LONG__ 作为 Pages 副本的兜底。
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

const versionJson = JSON.parse(fs.readFileSync(path.join(ROOT, 'shared', 'version.json'), 'utf8'));
const ver = (versionJson.platforms && versionJson.platforms[platform] && versionJson.platforms[platform].version)
  || versionJson.version;
// 长版本号 = 打包/分发当天日期 YYYYMMDD（与管理端 packer 的 bootv 生成方式一致）
const longVer = new Date().toISOString().slice(0, 10).replace(/-/g, '');

// 目标构建副本（不碰源 index.html）
const targets = {
  pc: [path.join(ROOT, 'pc', 'out', 'pc', 'index.html')],
  android: [path.join(ROOT, 'android', 'www', 'index.html')],
  web: [path.join(ROOT, 'web', 'dist', 'index.html')],
};

// 按端区分注入内容：
//   PC/安卓 → 长 + 短（两者都注入）
//   Web     → 仅长版本号（Web 无短号，不发 __CUB3D_VERSION__）
let snippet;
if (platform === 'web') {
  snippet = `<script>window.__CUB3D_LONG__=${JSON.stringify(longVer)};window.__CUB3D_PACKAGED__=true;</script>`;
} else {
  snippet = `<script>window.__CUB3D_VERSION__=${JSON.stringify(ver)};window.__CUB3D_LONG__=${JSON.stringify(longVer)};window.__CUB3D_PACKAGED__=true;</script>`;
}

let n = 0;
for (const t of targets[platform] || []) {
  if (!fs.existsSync(t)) { console.warn('[inject-version] 跳过（构建副本不存在）：', t); continue; }
  let s = fs.readFileSync(t, 'utf8');
  if (s.includes('__CUB3D_PACKAGED__=true')) { console.log('[inject-version] 已注入，跳过：', t); n++; continue; }
  // PC/安卓注入长+短；Web 仅注入长号（覆盖预览态占位值）
  if (s.includes('</body>')) s = s.replace('</body>', snippet + '\n</body>');
  else s += snippet;
  fs.writeFileSync(t, s);
  console.log('[inject-version] 注入', platform, '(长=' + longVer + (platform === 'web' ? ', 无短号)' : ', 短=' + ver + ')'));
  n++;
}
console.log('[inject-version] 完成：', n, '个文件注入（平台', platform, '）');
