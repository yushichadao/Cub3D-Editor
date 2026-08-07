// 跨端共享资源“单一源”同步脚本
// ------------------------------------------------------------
// 把应跨端一致的文件集中在 shared/ 下，运行本脚本即可同步到各端部署目录：
//   1) docs     <- shared/docs      -> Web/docs, PC/docs, Android/www/docs, Android/.../assets/public/docs
//   2) infra    <- shared/infra     -> Web/, PC/, Android/  （LICENSE, server.js, server.ps1, vercel.json）
//   3) scripts  <- shared/scripts   -> Web/scripts, PC/scripts, Android/scripts
// 平台专属文件（lang-override.js、index.html、各端 build-*.mjs、_genicon.mjs 等）不在此同步，保持各端独立。
//
// 用法：在仓库根目录执行 `node sync-shared.mjs`
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

// 1) 说明书（4 个语言版）
const DOCS_SRC = path.join(ROOT, 'shared', 'docs');
const MANUAL_FILES = [
  '使用说明书.md',
  '使用说明书_en.md',
  '使用説明書_ja.md',
  '使用說明書_zh-TW.md',
];
const DOCS_DESTS = [
  path.join(ROOT, 'Web', 'docs'),
  path.join(ROOT, 'PC', 'docs'),
  path.join(ROOT, 'Android', 'www', 'docs'),
  path.join(ROOT, 'Android', 'android', 'app', 'src', 'main', 'assets', 'public', 'docs'),
];

// 2) 基础设施（三端逐字节一致）
const INFRA_SRC = path.join(ROOT, 'shared', 'infra');
const INFRA_FILES = ['LICENSE', 'server.js', 'server.ps1', 'vercel.json'];
const INFRA_DESTS = [
  path.join(ROOT, 'Web'),
  path.join(ROOT, 'PC'),
  path.join(ROOT, 'Android'),
];

// 3) 公共脚本（三端逐字节一致）
const SCRIPTS_SRC = path.join(ROOT, 'shared', 'scripts');
const SCRIPTS_DESTS = [
  path.join(ROOT, 'Web', 'scripts'),
  path.join(ROOT, 'PC', 'scripts'),
  path.join(ROOT, 'Android', 'scripts'),
];

async function exists(p) {
  return fs.stat(p).then(() => true).catch(() => false);
}

async function syncFile(srcDir, file, destDirs) {
  const src = path.join(srcDir, file);
  if (!(await exists(src))) {
    console.error('[sync-shared] 源文件缺失，请检查：', src);
    process.exit(1);
  }
  for (const d of destDirs) {
    await fs.mkdir(d, { recursive: true });
    await fs.copyFile(src, path.join(d, file));
    console.log(`[sync-shared] ${file}  ->  ${path.relative(ROOT, d)}`);
  }
}

async function main() {
  for (const f of MANUAL_FILES) await syncFile(DOCS_SRC, f, DOCS_DESTS);
  console.log('[sync-shared] 说明书同步完成。');

  for (const f of INFRA_FILES) await syncFile(INFRA_SRC, f, INFRA_DESTS);
  console.log('[sync-shared] 基础设施同步完成。');

  const scripts = (await fs.readdir(SCRIPTS_SRC)).filter((f) => f.endsWith('.mjs'));
  for (const f of scripts) await syncFile(SCRIPTS_SRC, f, SCRIPTS_DESTS);
  console.log('[sync-shared] 完成：共享资源已统一到各端。');
}

main().catch((err) => {
  console.error('[sync-shared] 失败：', err);
  process.exit(1);
});
