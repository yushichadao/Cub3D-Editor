import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SHARED = path.resolve(ROOT, '../shared'); // 共享源：three / language / docs（与 Web / PC 同源）
const WWW = path.join(ROOT, 'www');
// Android 版触屏适配已够用，纯复制进 APK 壳，不做任何移动端注入
// three / language / docs / fonts 统一来自仓库根的 shared/ 单一源，避免各端重复维护出现版本差
// fonts 供 index.html 内 @font-face（阿拉伯语字体）引用，缺失会导致 RTL 界面字体回退。
const COPY_DIRS = ['three', 'language', 'docs', 'fonts'];
// 单机版：Android 端不做 version.txt 版本探测，仅复制入口与语言覆盖文件。
const COPY_FILES = ['index.html', 'lang-override.js'];

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
