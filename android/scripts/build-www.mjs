import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SHARED = path.resolve(ROOT, '../shared'); // 共享源：three / language / docs（与 Web / PC 同源）
const WWW = path.join(ROOT, 'www');
// 应用版本号：取自 package.json，构建时注入 window.__CUB3D_VERSION__，供更新检测模块（UPD）使用
const APP_VERSION = JSON.parse(await fs.readFile(path.join(ROOT, 'package.json'), 'utf8')).version || '1.1.0';

// Android 版触屏适配已够用，纯复制进 APK 壳，不做任何移动端注入
// three / language / docs / fonts 统一来自仓库根的 shared/ 单一源，避免各端重复维护出现版本差
// fonts 供 index.html 内 @font-face（阿拉伯语字体）引用，缺失会导致 RTL 界面字体回退。
const COPY_DIRS = ['three', 'language', 'docs', 'fonts'];
// version.txt 必须一并复制：index.html 启动时会 fetch('version.txt') 做版本探测，
// 若 www/ 内缺失，server 返回的 404 错误页文本会被当成版本号，与 BOOTV 不同而触发
// 无限「强制刷新」跳转，导致页面永远卡在加载页（Web/PC 直接服务根目录，天然有该文件）。
const COPY_FILES = ['index.html', 'lang-override.js', 'version.txt'];

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(s, d);
    } else {
      await fs.copyFile(s, d);
    }
  }
}

async function main() {
  await fs.rm(WWW, { recursive: true, force: true });
  await fs.mkdir(WWW, { recursive: true });

  for (const f of COPY_FILES) {
    const src = path.join(ROOT, f);
    if (await fs.stat(src).then(() => true).catch(() => false)) {
      await fs.copyFile(src, path.join(WWW, f));
      console.log(`[make-www] 复制文件 ${f}`);
    }
  }

  // 注入应用版本号到 index.html（更新检测模块 window.__CUB3D_VERSION__ 使用）
  const wwwIndex = path.join(WWW, 'index.html');
  try {
    let html = await fs.readFile(wwwIndex, 'utf8');
    html = html.replace(
      '<meta name="viewport"',
      '<script>window.__CUB3D_VERSION__ = ' + JSON.stringify(APP_VERSION) + ';</script>\n<meta name="viewport"'
    );
    await fs.writeFile(wwwIndex, html, 'utf8');
    console.log(`[make-www] 已注入版本号 v${APP_VERSION}`);
  } catch (e) {
    console.warn('[make-www] 版本注入失败:', e.message);
  }

  for (const d of COPY_DIRS) {
    const src = path.join(SHARED, d);
    if (await fs.stat(src).then(() => true).catch(() => false)) {
      await copyDir(src, path.join(WWW, d));
      console.log(`[make-www] 复制目录 ${d}/（来自 shared）`);
    } else {
      console.warn(`[make-www] 警告：共享源缺少 ${d}/，已跳过（请检查仓库根 shared/ 目录）`);
    }
  }

  console.log('[make-www] 完成（纯复制，无移动端注入）');
}

main().catch((err) => {
  console.error('[make-www] 失败:', err);
  process.exit(1);
});
