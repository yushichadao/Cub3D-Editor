/**
 * tools/inject-version.mjs — 单一版本源构建注入（T5）
 *
 * 打包阶段由各端 prebuild 调用：
 *   node tools/inject-version.mjs --platform pc
 *   node tools/inject-version.mjs --platform android
 *   node tools/inject-version.mjs --platform web
 *
 * 作用：从 shared/version.json 读取该端已发布版本，注入到对应端 index.html 末尾的
 *   <script>window.__CUB3D_VERSION__='x.y.z';window.__CUB3D_PACKAGED__=true;</script>
 * 使打包产物显示真实版本号 + 触发真实更新流程；预览态（未注入）回退 X.X.X + 检查更新短路。
 *
 * 不修改源 index.html（保持预览态可用），仅注入到构建副本（out/、www/ 等）。
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

// 目标构建副本（不碰源 index.html）
const targets = {
  pc: [path.join(ROOT, 'pc', 'out', 'pc', 'index.html')],
  android: [path.join(ROOT, 'android', 'www', 'index.html')],
  web: [path.join(ROOT, 'web', 'dist', 'index.html')],
};

const snippet = `<script>window.__CUB3D_VERSION__=${JSON.stringify(ver)};window.__CUB3D_PACKAGED__=true;</script>`;

let n = 0;
for (const t of targets[platform] || []) {
  if (!fs.existsSync(t)) { console.warn('[inject-version] 跳过（构建副本不存在）：', t); continue; }
  let s = fs.readFileSync(t, 'utf8');
  if (s.includes('__CUB3D_PACKAGED__=true')) { console.log('[inject-version] 已注入，跳过：', t); n++; continue; }
  // 注入到 </body> 前
  if (s.includes('</body>')) s = s.replace('</body>', snippet + '\n</body>');
  else s += snippet;
  fs.writeFileSync(t, s);
  console.log('[inject-version] 注入', platform, ver, '->', t);
  n++;
}
console.log('[inject-version] 完成：', n, '个文件注入版本', ver);
