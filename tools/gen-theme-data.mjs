/**
 * tools/gen-theme-data.mjs — 由单一源 themes.mjs 生成浏览器可直接引用的 theme-data.js（T7）
 *
 * 生成 shared/infra/theme/theme-data.js：
 *   window.CUB3D_THEMES = { neon:{name,label,vars}, ... }   // 客户端 12 主题
 *   window.CUB3D_THEME_ORDER = [...]
 *   window.CUB3D_ADMIN_THEME = <第1个>
 *   window.CUB3D_PROMO_THEME = <绿主题>
 * 三端 index.html 引用此文件替代各自内联的 THEMES，消除三处重复定义。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CLIENT_THEMES, CLIENT_THEME_ORDER, ADMIN_THEME, PROMO_THEME } from '../shared/infra/theme/themes.mjs';

const out = `// 自动生成（tools/gen-theme-data.mjs），请勿手改。来源 shared/infra/theme/themes.mjs
window.CUB3D_THEMES = ${JSON.stringify(CLIENT_THEMES, null, 2)};
window.CUB3D_THEME_ORDER = ${JSON.stringify(CLIENT_THEME_ORDER)};
window.CUB3D_ADMIN_THEME = ${JSON.stringify(ADMIN_THEME)};
window.CUB3D_PROMO_THEME = ${JSON.stringify(PROMO_THEME)};
`;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dest = path.join(ROOT, 'shared', 'infra', 'theme-data.js');
fs.writeFileSync(dest, out);
console.log('[gen-theme-data] 已生成', dest);
