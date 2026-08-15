// 跨端共享资源“单一源”同步脚本
// ------------------------------------------------------------
// 把应跨端一致的文件集中在 shared/ 下，运行本脚本即可同步到各端部署目录：
//   1) docs     <- shared/docs      -> Web/docs, PC/docs, Android/www/docs, Android/.../assets/public/docs
//   2) infra    <- shared/infra     -> Web/, PC/, Android/  （LICENSE, server.js, server.ps1, vercel.json）
//   3) scripts  <- shared/scripts   -> Web/scripts, PC/scripts, Android/scripts
//   4) language <- shared/language  -> Web/language, PC/language, Android/language, Android 原生 assets（Android/www 由 build-www.mjs 生成）
//      新增语言只需把语言包放入 shared/language 并运行本脚本，即可同步到各端。
// 平台专属文件（lang-override.js、index.html、各端 build-*.mjs、_genicon.mjs 等）不在此同步，保持各端独立。
//
// 用法：在仓库根目录执行 `node sync-shared.mjs`
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

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

// 4) 语言包（三端逐字节一致）
const LANG_SRC = path.join(ROOT, 'shared', 'language');
const LANG_DESTS = [
  path.join(ROOT, 'Web', 'language'),
  path.join(ROOT, 'PC', 'language'),
  path.join(ROOT, 'Android', 'language'),
  path.join(ROOT, 'Android', 'android', 'app', 'src', 'main', 'assets', 'public', 'language'),
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
  console.log('[sync-shared] 共享脚本同步完成。');

  // 4) 国际化：将弹窗文案与扩展后的法律全文写入各平台语言包（en / ja / zh-TW / ko / ru / fr）
  //    复用独立脚本 _i18n_en.mjs / _i18n_ja.mjs / _i18n_zh-TW.mjs / _i18n_ko.mjs / _i18n_ru.mjs / _i18n_fr.mjs（亦可单独运行）
  for (const lang of ['_i18n_en', '_i18n_ja', '_i18n_zh-TW', '_i18n_ko', '_i18n_ru', '_i18n_fr', '_i18n_ar']) {
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

  console.log('[sync-shared] 完成：共享资源已统一同步到各端，并完成法律文本国际化。');
}

main().catch((err) => {
  console.error('[sync-shared] 失败：', err);
  process.exit(1);
});
