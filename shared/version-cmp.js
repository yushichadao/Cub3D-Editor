/**
 * shared/version-cmp.js — 三端与管理端共用的版本比较器（长短版本号统一）
 *
 * 长版本号 = YYYYMMDD（内部标记、兼容判断用）
 * 短版本号 = X.X.X（对外、区分构建包用）
 *
 * 比较规则：按分隔符（. 或 -）分段，逐段按整数比较。
 *   - YYYYMMDD 无分隔符，整体作为一段整数参与比较
 *   - X.X.X 按 . 分三段比较
 *   - 长号与短号混比时：长号段数=1、短号段数=3，按整数 magnitude 自然排序（YYYYMMDD 远大于任何 X.X.X 段值）
 *
 * 用法：
 *   浏览器（三端 index.html）：<script src="../shared/version-cmp.js"></script> -> window.cmpVersion
 *   管理端（Node .mjs）：const { createRequire } = await import('module');
 *                         const { cmpVersion } = createRequire(import.meta.url)('../shared/version-cmp.js');
 */
(function (root, factory) {
  const cmpVersion = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = { cmpVersion: cmpVersion };
  } else {
    root.cmpVersion = cmpVersion;
  }
})(typeof self !== 'undefined' ? self : this, function () {
  /**
   * 语义化版本比较，支持长序号 YYYYMMDD 与 X.X.X。
   * @returns {number} a<b 返回 -1，a>b 返回 1，相等返回 0
   */
  function cmpVersion(a, b) {
    const pa = String(a == null ? '' : a).split(/[.\-]/);
    const pb = String(b == null ? '' : b).split(/[.\-]/);
    const n = Math.max(pa.length, pb.length);
    for (let i = 0; i < n; i++) {
      const x = parseInt(pa[i] || '0', 10) || 0;
      const y = parseInt(pb[i] || '0', 10) || 0;
      if (x !== y) return x < y ? -1 : 1;
    }
    return 0;
  }
  return cmpVersion;
});
