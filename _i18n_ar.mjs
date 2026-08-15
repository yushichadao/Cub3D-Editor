// 阿拉伯语（RTL）翻译写入脚本
// ------------------------------------------------------------
// 与 _i18n_en.mjs 等保持一致：把 i18n-draft/language/ar.js（最新阿拉伯语翻译，
// 含弹窗文案与法律全文）作为单一源，写入 shared/language/ar.js。
// 之后由 sync-shared.mjs 的“语言包同步”步骤把 shared 分发到 Web / PC / Android 各端，
// 完成阿拉伯语的正式接入。
//
// 用法：node _i18n_ar.mjs   （也可被 sync-shared.mjs 统一调用）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC = path.join(__dirname, 'i18n-draft', 'language', 'ar.js');
const DEST = path.join(__dirname, 'shared', 'language', 'ar.js');

// 若草稿源文件缺失，说明阿拉伯语包尚未提供完整草稿。
// 此时不致命退出，保留已有的 shared/language/ar.js（由 sync-shared 语言包同步步骤继续分发），
// 避免因单一语言缺失导致整个同步脚本崩溃、GitHub Pages 部署失败。
if (!fs.existsSync(SRC)) {
  console.warn('[i18n-ar] 跳过：源文件缺失：', SRC);
  console.warn('[i18n-ar] 将保留已有的共享语言包（', path.relative(__dirname, DEST), '）。如需重新生成阿拉伯语包，请提供 i18n-draft/language/ar.js。');
  process.exit(0);
}

// 读取草稿，移除顶部“未接入/不参与同步”说明注释，使其成为正式接入的语言包。
let src = fs.readFileSync(SRC, 'utf8');
src = src.replace(/^\/\/[^\n]*\n/, '');      // 第1行标题
src = src.replace(/^\/\s*-{3,}[^\n]*\n/, ''); // 分隔线
src = src.replace(/^\/\/[^\n]*\n/, '');      // 说明第1行
src = src.replace(/^\/\/[^\n]*\n/, '');      // 说明第2行
src = src.replace(/^\/\/[^\n]*\n/, '');      // 说明第3行

fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.writeFileSync(DEST, src, 'utf8');
console.log('[i18n-ar] 已写入共享语言包：', path.relative(__dirname, DEST));
console.log('[i18n-ar] 完成。下一步运行 `node sync-shared.mjs` 把 ar.js 分发到各端。');
