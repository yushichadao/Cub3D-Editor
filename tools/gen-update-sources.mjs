/**
 * tools/gen-update-sources.mjs — 由单一源 update-sources.mjs 生成浏览器可引用的 update-sources.js（T11/A）
 *
 * 生成 shared/infra/update-sources.js：
 *   window.CUB3D_UPDATE_SOURCES = { cn:{...}, cnDomain:{...}, intl:{...}, githubProxy:{...} }
 *   window.CUB3D_DOC_FETCH_ORDER = [...]
 * 三端 index.html 引用此文件替代各自内联的 HOSTS 数组，消除域名/IP 逐字重复与口径漂移。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { UPDATE_SOURCES, DOC_FETCH_ORDER } from '../shared/infra/update-sources.mjs';

const out = `// 自动生成（tools/gen-update-sources.mjs），请勿手改。来源 shared/infra/update-sources.mjs
window.CUB3D_UPDATE_SOURCES = ${JSON.stringify(UPDATE_SOURCES, null, 2)};
window.CUB3D_DOC_FETCH_ORDER = ${JSON.stringify(DOC_FETCH_ORDER)};
`;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dest = path.join(ROOT, 'shared', 'infra', 'update-sources.js');
fs.writeFileSync(dest, out);
console.log('[gen-update-sources] 已生成', dest);
