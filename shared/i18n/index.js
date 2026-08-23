/**
 * shared/i18n/index.js — 单一键名索引与访问 API（集中统一管理出口）。
 *
 * 设计：
 *  - data.js 为单一映射表（DOMAINS = { base, pc, android, promo }），所有键的九语言译文集中于此。
 *  - “端覆盖”通过 buildLang(endpoint) 表达，不复制整段：
 *      web    = base + promo（web 与 PC 统一，含键盘/鼠标/触摸交互帮助键 + 宣传页键）
 *      pc     = base + pc 覆盖（检查更新/安装器系列 upd*）+ promo
 *      android= base 剔除键盘键（kbd 前缀与 secKeyboard，安卓无键盘）+ android 覆盖（upd*）+ promo
 *  - promo 域来自根 index.html 宣传页（const T + const CMPLABEL），9 语言齐全。
 *  - 新增语言：在 LANGS 加项 + data.js 每键补该语言值列，运行 gen-langs.mjs 即生效。
 *  - sync 期由 check-i18n-keys.mjs 强制校验缺/多键（基准 = ALL_KEYS / ENDPOINT_KEYS）。
 */

import { DOMAINS } from './data.js';
export { DOMAINS };

// 九语言清单（含 zh-CN；zh-CN 由各端内联提供，不生成语言包）
export const LANG_CODES = ['zh-CN', 'en', 'es', 'fr', 'ja', 'ko', 'ru', 'ar', 'zh-TW'];
export const NON_ZH_CODES = LANG_CODES.filter((c) => c !== 'zh-CN');

// 语言显示名（供语言切换 UI；单一真源）
export const LANGS = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
  { code: 'zh-TW', label: '繁體中文' },
];

// 安卓无键盘相关键：键盘快捷键系列 + 键盘分区标题
function isKeyboardKey(k) {
  return k.startsWith('kbd') || k === 'secKeyboard';
}

function domainsOf(endpoint) {
  if (endpoint === 'pc') return ['base', 'pc', 'promo'];
  if (endpoint === 'android') return ['base', 'android', 'promo'];
  if (endpoint === 'web') return ['base', 'promo'];
  return ['base', 'pc', 'android', 'promo']; // 'all'
}

/**
 * 合并指定端的全部键 -> { key: { 'zh-CN':v, en:v, ... } }。
 * @param {'web'|'pc'|'android'|'all'} endpoint
 */
export function buildLang(endpoint = 'all') {
  const out = {};
  for (const d of domainsOf(endpoint)) {
    for (const [k, t] of Object.entries(DOMAINS[d] || {})) {
      if (endpoint === 'android' && isKeyboardKey(k)) continue;
      out[k] = t;
    }
  }
  return out;
}

// 各端应有键集（用于 sync 期强制校验）
export const ENDPOINT_KEYS = {
  web: new Set(Object.keys(buildLang('web'))),
  pc: new Set(Object.keys(buildLang('pc'))),
  android: new Set(Object.keys(buildLang('android'))),
};

// 全集（所有端键的并集）
export const ALL_KEYS = new Set(Object.keys(buildLang('all')));

/**
 * 校验某端键集是否对齐基准键集（sync 期调用）。
 * @param {Set<string>} baseKeys 基准键集
 * @param {Set<string>} endpointKeys 某端键集
 * @returns {{missing:string[], extra:string[]}}
 */
export function diffKeys(baseKeys, endpointKeys) {
  const missing = [...baseKeys].filter((k) => !endpointKeys.has(k));
  const extra = [...endpointKeys].filter((k) => !baseKeys.has(k));
  return { missing, extra };
}
