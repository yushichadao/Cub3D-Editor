// 跨端共享资源“单一源”同步脚本
// ------------------------------------------------------------
// 把应跨端一致的文件集中在 shared/ 下，运行本脚本即可同步到各端部署目录：
//   1) docs     <- shared/docs      -> web/docs, pc/docs, android/www/docs, android/.../assets/public/docs
//   2) infra    <- shared/infra     -> web/, pc/, android/  （LICENSE, server.js, server.ps1, vercel.json）
//   3) scripts  <- shared/scripts   -> web/scripts, pc/scripts, android/scripts
//   4) language <- shared/language  -> web/language, pc/language, android/language, android 原生 assets（android/www 由 build-www.mjs 生成）
//      新增语言只需把语言包放入 shared/language 并运行本脚本，即可同步到各端。
// 平台专属文件（lang-override.js、index.html、各端 build-*.mjs、_genicon.mjs 等）不在此同步，保持各端独立。
//
// 用法：在仓库根目录执行 `node tools/sync-shared.mjs`
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..'); // 脚本置于 tools/ 下，反推仓库根

// 1) 说明书（各语言版）
const DOCS_SRC = path.join(ROOT, 'shared', 'docs');
const MANUAL_FILES = [
  '使用说明书.md',
  '使用说明书_en.md',
  '使用説明書_ja.md',
  '使用說明書_zh-TW.md',
  '사용설명서_ko.md',
  '使用说明书_ru.md',
  '使用说明书_es.md',
  '使用说明书_fr.md',
  '使用说明书_ar.md',
];
const DOCS_DESTS = [
  path.join(ROOT, 'web', 'docs'),
  path.join(ROOT, 'pc', 'docs'),
  path.join(ROOT, 'android', 'www', 'docs'),
  path.join(ROOT, 'android', 'android', 'app', 'src', 'main', 'assets', 'public', 'docs'),
];

// 2) 基础设施（三端逐字节一致）
const INFRA_SRC = path.join(ROOT, 'shared', 'infra');
const INFRA_FILES = ['LICENSE', 'server.js', 'server.ps1', 'vercel.json'];
const INFRA_DESTS = [
  path.join(ROOT, 'web'),
  path.join(ROOT, 'pc'),
  path.join(ROOT, 'android'),
];

// 3) 公共脚本（三端逐字节一致）
const SCRIPTS_SRC = path.join(ROOT, 'shared', 'scripts');
const SCRIPTS_DESTS = [
  path.join(ROOT, 'web', 'scripts'),
  path.join(ROOT, 'pc', 'scripts'),
  path.join(ROOT, 'android', 'scripts'),
];

// 4) 语言包（三端逐字节一致）
const LANG_SRC = path.join(ROOT, 'shared', 'language');
const LANG_DESTS = [
  path.join(ROOT, 'web', 'language'),
  path.join(ROOT, 'pc', 'language'),
  path.join(ROOT, 'android', 'language'),
  path.join(ROOT, 'android', 'android', 'app', 'src', 'main', 'assets', 'public', 'language'),
];

// 5) Three.js 引擎（三端运行必需，逐字节一致）
// web/pc 以各自根目录直接提供服务，android 除了根目录（开发预览回退），
// 还要同步到原生 assets，避免 APK 打包后引擎缺失。
const THREE_SRC = path.join(ROOT, 'shared', 'three');
const THREE_DESTS = [
  path.join(ROOT, 'web', 'three'),
  path.join(ROOT, 'pc', 'three'),
  path.join(ROOT, 'android', 'three'),
  path.join(ROOT, 'android', 'android', 'app', 'src', 'main', 'assets', 'public', 'three'),
];

async function exists(p) {
  return fs.stat(p).then(() => true).catch(() => false);
}

// 兼容 Windows 上偶发的目录条目损坏（Node fs 对损坏目录报 UNKNOWN 而非 EEXIST）：
// 先尝试正常创建，失败时若已存在目录则忽略，否则移除损坏条目后重试。
async function mkdirSafe(d) {
  try {
    await fs.mkdir(d, { recursive: true });
  } catch (e) {
    if (e.code === 'EEXIST') return;
    let isDir = false;
    try { isDir = (await fs.stat(d)).isDirectory(); } catch (_) { /* 损坏条目 */ }
    if (isDir) return;
    try { await fs.rm(d, { recursive: true, force: true }); } catch (_) {}
    await fs.mkdir(d, { recursive: true });
  }
}

async function syncFile(srcDir, file, destDirs) {
  const src = path.join(srcDir, file);
  if (!(await exists(src))) {
    console.error('[sync-shared] 源文件缺失，请检查：', src);
    process.exit(1);
  }
  for (const d of destDirs) {
    try {
      await mkdirSafe(d);
      await fs.copyFile(src, path.join(d, file));
      console.log(`[sync-shared] ${file}  ->  ${path.relative(ROOT, d)}`);
    } catch (e) {
      // 单一目标端（如 android）写入失败不应中断其他端（web/pc）的同步，
      // 否则 predev 退出非 0 会导致 npm start 的 server 无法启动。
      console.error(`[sync-shared] 同步到 ${path.relative(ROOT, d)} 失败（已跳过，不影响其他端）：${e.message}`);
    }
  }
}

// 递归复制整个目录（用于 three 引擎等含子目录的资源，覆盖式同步）
async function copyDirRecursive(srcDir, destDir) {
  await mkdirSafe(destDir);
  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(srcDir, entry.name);
    const d = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      await copyDirRecursive(s, d);
    } else {
      await fs.copyFile(s, d);
    }
  }
}

async function syncDir(srcDir, destDirs) {
  if (!(await exists(srcDir))) {
    console.error('[sync-shared] 源目录缺失，请检查：', srcDir);
    process.exit(1);
  }
  for (const d of destDirs) {
    try {
      await copyDirRecursive(srcDir, d);
      console.log(`[sync-shared] ${path.basename(srcDir)}/  ->  ${path.relative(ROOT, d)}`);
    } catch (e) {
      // 与 syncFile 相同的单端容错策略
      console.error(`[sync-shared] 同步到 ${path.relative(ROOT, d)} 失败（已跳过，不影响其他端）：${e.message}`);
    }
  }
}

async function main() {
  for (const f of MANUAL_FILES) await syncFile(DOCS_SRC, f, DOCS_DESTS);
  console.log('[sync-shared] 说明书同步完成。');

  for (const f of INFRA_FILES) await syncFile(INFRA_SRC, f, INFRA_DESTS);
  console.log('[sync-shared] 基础设施同步完成。');

  // 2.1) 主题单一源：先由 themes.mjs 生成 theme-data.js，再同步到三端根目录（T7）
  try {
    const { execSync } = await import('node:child_process');
    execSync('node tools/gen-theme-data.mjs', { stdio: 'inherit', cwd: ROOT });
    await syncFile(INFRA_SRC, 'theme-data.js', INFRA_DESTS);
    console.log('[sync-shared] 主题数据同步完成。');
  } catch (e) {
    console.warn('[sync-shared] 主题数据生成/同步失败（不影响其他同步）：', e.message);
  }

  // 2.2) 更新源单一化：先由 update-sources.mjs 生成 update-sources.js，再同步到三端根目录（T11/A）
  try {
    const { execSync } = await import('node:child_process');
    execSync('node tools/gen-update-sources.mjs', { stdio: 'inherit', cwd: ROOT });
    await syncFile(INFRA_SRC, 'update-sources.js', INFRA_DESTS);
    console.log('[sync-shared] 更新源数据同步完成。');
  } catch (e) {
    console.warn('[sync-shared] 更新源数据生成/同步失败（不影响其他同步）：', e.message);
  }

  const scripts = (await fs.readdir(SCRIPTS_SRC)).filter((f) => f.endsWith('.mjs'));
  for (const f of scripts) await syncFile(SCRIPTS_SRC, f, SCRIPTS_DESTS);
  console.log('[sync-shared] 共享脚本同步完成。');

  // 4) 国际化：将弹窗文案与扩展后的法律全文写入各平台语言包（en / ja / zh-TW / ko / ru / es / fr / ar）
  //    复用独立脚本 _i18n_en.mjs / _i18n_ja.mjs / _i18n_zh-TW.mjs / _i18n_ko.mjs / _i18n_ru.mjs / _i18n_es.mjs / _i18n_fr.mjs / _i18n_ar.mjs（亦可单独运行）
  for (const lang of ['_i18n_en', '_i18n_ja', '_i18n_zh-TW', '_i18n_ko', '_i18n_ru', '_i18n_es', '_i18n_fr', '_i18n_ar']) {
    try {
      await import('./' + lang + '.mjs');
      console.log(`[sync-shared] 国际化（${lang}）执行完成。`);
    } catch (e) {
      console.error(`[sync-shared] 国际化（${lang}）失败：`, e.message);
    }
  }

  // 5) 语言包同步：以 shared/language 为单一源，覆盖到各端（含新增语言，如 ko.js）。
  //    必须先于语言包同步执行上面的国际化，确保各端拿到的是最新法律全文。
  const langFiles = (await fs.readdir(LANG_SRC)).filter((f) => f.endsWith('.js'));
  for (const f of langFiles) await syncFile(LANG_SRC, f, LANG_DESTS);
  console.log('[sync-shared] 语言包同步完成。');

  // 6) Three.js 引擎同步：以 shared/three 为单一源，覆盖到各端。
  //    缺失会导致 index.html 的 importmap 找不到 three.module.js，
  //    页面卡在加载页「界面语言已就绪」之后（engine 进度永不触发）。
  await syncDir(THREE_SRC, THREE_DESTS);
  console.log('[sync-shared] Three.js 引擎同步完成。');

  // 7) 键名一致性校验（T6 / 改进 E）：缺/多键告警，不阻断 sync。
  try {
    const { execSync } = await import('node:child_process');
    execSync('node tools/check-i18n-keys.mjs', { stdio: 'inherit', cwd: ROOT });
  } catch (e) {
    console.warn('[sync-shared] 键名校验脚本异常（不影响同步）：', e.message);
  }

  console.log('[sync-shared] 完成：共享资源已统一同步到各端，并完成法律文本国际化。');
}

main().catch((err) => {
  console.error('[sync-shared] 失败：', err);
  process.exit(1);
});
