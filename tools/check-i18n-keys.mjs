/**
 * tools/check-i18n-keys.mjs — 键名一致性校验（T6 / 改进 E，单一映射表基准）
 *
 * 落实"统一键名但差异化 + 九语言 + sync 期强制校验缺/多键"：
 *  - 基准键集 = shared/i18n 单一映射表的 ALL_KEYS（全集）/ ENDPOINT_KEYS（各端应有键集）
 *  - 校验三端 ZH_CN 内联键集 ⊆ ALL_KEYS（索引遗漏 → 告警，应补 data.js）
 *  - 校验各端语言包键集与 ENDPOINT_KEYS[endpoint] 一致（缺/多键 → 告警）
 *  - 校验宣传页 T('x') 调用键是否在 ALL_KEYS 中
 *
 * 由 sync-shared.mjs 末尾调用；仅 warn 级输出，不 return 非 0（不阻断构建）。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_KEYS, ENDPOINT_KEYS, NON_ZH_CODES } from '../shared/i18n/index.js';

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

// 精确解析语言包（标准 JSON）：括号深度扫描定位对象体，JSON.parse 得到真键，
// 避免把值文本里的 "Word:" 误当成键（如 "With object selected: move"）。
function extractPackKeys(src, code) {
  const marker = `window.__packs['${code}'] = `;
  const i = src.indexOf(marker);
  if (i < 0) return null;
  const open = src.indexOf('{', i + marker.length);
  let depth = 0, j = open;
  for (; j < src.length; j++) {
    const c = src[j];
    if (c === '"') {
      j++;
      while (j < src.length && src[j] !== '"') {
        if (src[j] === '\\') j++; // 跳过转义字符，避免把 \" 的引号当成字符串结束
        j++;
      }
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { j++; break; } }
  }
  try { return Object.keys(JSON.parse(src.slice(open, j))); }
  catch { return null; }
}

function extractTkeys(src) {
  const keys = new Set();
  const re = /T\(\s*['"]([\w.\-]+)['"]/g;
  let m;
  while ((m = re.exec(src))) keys.add(m[1]);
  return keys;
}

const baseSet = ALL_KEYS;
console.log(`[i18n] 基准键集（ALL_KEYS 全集）：${baseSet.size} 键`);
let warnCount = 0;

// 1) 三端 ZH_CN 内联 ⊆ ALL_KEYS
const zhcnMap = {
  web: { file: 'web/index.html' },
  pc: { file: 'pc/app.js' },
  android: { file: 'android/index.html' },
};
for (const [endpoint, { file }] of Object.entries(zhcnMap)) {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const keys = extractKeys(src, 'ZH_CN');
  if (!keys) { console.warn(`[i18n] ${endpoint} ZH_CN 未找到，跳过`); continue; }
  const set = new Set(keys);
  const missing = [...set].filter((k) => !baseSet.has(k));
  if (missing.length) {
    console.warn(`[i18n] ${endpoint} ZH_CN 有 ${missing.length} 个键不在索引（应补 data.js）：${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ' …' : ''}`);
    warnCount++;
  } else {
    console.log(`[i18n] ${endpoint} ZH_CN ⊆ ALL_KEYS ✓ (${set.size} 键)`);
  }
}

// 2) 各端语言包键集 vs ENDPOINT_KEYS[endpoint]（排除 lang 元字段）
const endpointDirs = {
  web: [path.join(ROOT, 'web', 'language')],
  pc: [path.join(ROOT, 'pc', 'language')],
  android: [
    path.join(ROOT, 'android', 'language'),
    path.join(ROOT, 'android', 'android', 'app', 'src', 'main', 'assets', 'public', 'language'),
  ],
};
for (const [endpoint, dirs] of Object.entries(endpointDirs)) {
  const expect = ENDPOINT_KEYS[endpoint];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) { console.warn(`[i18n] ${endpoint} 目录缺失：${path.relative(ROOT, dir)}`); continue; }
    for (const code of NON_ZH_CODES) {
      const f = path.join(dir, code + '.js');
      if (!fs.existsSync(f)) { console.warn(`[i18n] ${endpoint} 缺失语言包：${code}.js`); warnCount++; continue; }
      const keys = extractPackKeys(fs.readFileSync(f, 'utf8'), code === 'zh-TW' ? 'zh-TW' : code);
      if (!keys) { console.warn(`[i18n] ${endpoint}/${code}: 无法解析`); continue; }
      const set = new Set(keys.filter((k) => k !== 'lang')); // lang 为元字段，非翻译键
      const missing = [...expect].filter((k) => !set.has(k));
      const extra = [...set].filter((k) => !expect.has(k));
      if (missing.length) { console.warn(`[i18n] ${endpoint}/${code} 缺键(${missing.length})：${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ' …' : ''}`); warnCount++; }
      if (extra.length) { console.warn(`[i18n] ${endpoint}/${code} 多键(${extra.length})：${extra.slice(0, 8).join(', ')}${extra.length > 8 ? ' …' : ''}`); warnCount++; }
      if (!missing.length && !extra.length) console.log(`[i18n] ${endpoint}/${code}: 键集对齐 ✓`);
    }
  }
}

// 3) 宣传页（根 index.html）T('x') 是否在基准中
const promoSrc = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const promoKeys = extractTkeys(promoSrc);
const promoMissing = [...promoKeys].filter((k) => !baseSet.has(k));
if (promoMissing.length) { console.warn(`[i18n] 宣传页 T() 未定义键(${promoMissing.length})：${promoMissing.slice(0, 10).join(', ')}${promoMissing.length > 10 ? ' …' : ''}`); warnCount++; }
else console.log(`[i18n] 宣传页 T() 键均在基准中 ✓`);

console.log(`[i18n] 校验完成，告警项：${warnCount}（仅告警，不阻断 sync）`);
