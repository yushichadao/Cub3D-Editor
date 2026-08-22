/**
 * shared/i18n/index.js — 键名与内容统一管理（T6 完整落地；此处为骨架/契约）。
 *
 * 设计（已确认：统一键名但差异化 + 九语言 + 多语言）：
 *  - 本文件为【单一键名索引】。键名语义化 ASCII（domain.action.target），
 *    是各端键空间的唯一来源；sync-shared 期强制校验缺/多键。
 *  - 各端差异通过【端覆盖】实现（web.js / pc.js / android.js），不复制整段。
 *  - 现有语言包（shared/language/*.js，8 个 + zh-CN 内联）在 T6 并入本索引的基准值。
 *  - 宣传页（index.html 整段内联 218KB）与编辑器页键空间在 T6 做一致性校验（改进 E）。
 *
 * 当前阶段：仅声明契约与端覆盖挂载点，避免破坏现有加载。T6 填充基准键集。
 */

// 九语言基准清单（语言代码）
export const LANG_CODES = ['zh-CN', 'en', 'es', 'fr', 'ja', 'ko', 'ru', 'ar', 'zh-TW'];

// 端覆盖挂载点（T6 由 sync 从各端抽取填充）
export const ENDPOINT_OVERRIDES = {
  web: {},
  pc: {},
  android: {},
};

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

// 基准键集由 tools/check-i18n-keys.mjs 在 sync 期动态提取（zh-CN 为基准），
// 不在此静态维护，避免与语言包漂移。
export const BASE_KEYS = new Set();
