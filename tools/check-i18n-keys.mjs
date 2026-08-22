/**
 * tools/check-i18n-keys.mjs — 键名一致性校验（T6 / 改进 E）
 *
 * 落实"统一键名但差异化 + 九语言 + sync 期强制校验"：
 *  - 基准键集 = 默认语言 zh-CN（各端 index.html 内联 const ZH_CN = {...}，最全）
 *  - 比对 shared/language/*.js 的 8 语言键集：缺键/多键 → 告警（不阻断 sync）
 *  - 比对宣传页（根 index.html）T('x') 调用键是否都在基准键集：未定义键 → 告警
 *
 * 由 sync-shared.mjs 末尾调用；仅 warn 级输出，不 return 非 0（不阻断构建）。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// 稳健提取扁平对象键名（语言包均为 key:'value' 扁平结构，不依赖 Function 求值）。
function extractKeys(src, varName) {
  const markers = [
    `const ${varName} =`,
    `window.__packs['${varName}'] =`,
    `window.__packs["${varName}"] =`,
  ];
  let i = -1, marker = '';
  for (const m of markers) { const idx = src.indexOf(m); if (idx >= 0) { i = idx; marker = m; break; } }
  if (i < 0) return null;
  // 定位对象体 { ... }
  const open = src.indexOf('{', i + marker.length);
  if (open < 0) return null;
  let depth = 0, j = open;
  for (; j < src.length; j++) {
    const c = src[j];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { j++; break; } }
  }
  const body = src.slice(open, j);
  const keys = new Set();
  const re = /(['"]?)([A-Za-z_][\w.\-]*)\1\s*:/g;
  let m;
  while ((m = re.exec(body))) keys.add(m[2]);
  return [...keys];
}

function extractTkeys(src) {
  const keys = new Set();
  const re = /T\(\s*['"]([\w.\-]+)['"]/g;
  let m;
  while ((m = re.exec(src))) keys.add(m[1]);
  return keys;
}

// 1) 基准键集（web/index.html 的 ZH_CN）
const webSrc = fs.readFileSync(path.join(ROOT, 'web', 'index.html'), 'utf8');
const baseKeys = extractKeys(webSrc, 'ZH_CN');
if (!baseKeys) { console.warn('[i18n] 未找到 ZH_CN 基准，跳过校验'); process.exit(0); }
const baseSet = new Set(baseKeys);
console.log(`[i18n] 基准键集（zh-CN）：${baseSet.size} 键`);

// 2) 8 语言 vs 基准
const langDir = path.join(ROOT, 'shared', 'language');
let warnCount = 0;
for (const f of fs.readdirSync(langDir)) {
  if (!f.endsWith('.js')) continue;
  const code = f.replace('.js', '');
  const src = fs.readFileSync(path.join(langDir, f), 'utf8');
  const keys = extractKeys(src, code === 'zh-TW' ? 'zh-TW' : code);
  if (!keys) { console.warn(`[i18n] ${code}: 无法解析键集`); continue; }
  const set = new Set(keys);
  const missing = [...baseSet].filter((k) => !set.has(k));
  const extra = [...set].filter((k) => !baseSet.has(k));
  if (missing.length) { console.warn(`[i18n] ${code} 缺键(${missing.length})：${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ' …' : ''}`); warnCount++; }
  if (extra.length) { console.warn(`[i18n] ${code} 多键(${extra.length})：${extra.slice(0, 8).join(', ')}${extra.length > 8 ? ' …' : ''}`); warnCount++; }
  if (!missing.length && !extra.length) console.log(`[i18n] ${code}: 键集对齐 ✓`);
}

// 3) 宣传页（根 index.html）T('x') 是否在基准中
const promoSrc = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const promoKeys = extractTkeys(promoSrc);
const promoMissing = [...promoKeys].filter((k) => !baseSet.has(k));
if (promoMissing.length) { console.warn(`[i18n] 宣传页 T() 未定义键(${promoMissing.length})：${promoMissing.slice(0, 10).join(', ')}${promoMissing.length > 10 ? ' …' : ''}`); warnCount++; }
else console.log(`[i18n] 宣传页 T() 键均在基准中 ✓`);

console.log(`[i18n] 校验完成，告警项：${warnCount}（仅告警，不阻断 sync）`);
