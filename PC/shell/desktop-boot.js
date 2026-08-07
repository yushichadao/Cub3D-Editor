/* ==========================================================================
   桌面版引导脚本（必须在 index.html 的 <head> 中、language/*.js 之后同步加载）
   职责只有两件，都必须早于主模块执行：
     1. 把用户安装的语言包合并进 window.__packs，使 I18N / LANGS 能识别新语言
     2. 打上 desktop 标记，供 CSS 与后续脚本判断
   网页版加载本文件时全部逻辑跳过，无任何副作用。
   ========================================================================== */
(function () {
  'use strict';

  var D = window.desktop;
  if (!D || !D.isDesktop) {
    window.__isDesktop = false;
    return;
  }
  window.__isDesktop = true;

  document.documentElement.classList.add('is-desktop');

  /* ---------------------- 1. 注入用户安装的界面语言包 ---------------------- */

  try {
    var extra = window.__cube3dExtraPacks || {};
    window.__packs = window.__packs || {};
    Object.keys(extra).forEach(function (code) {
      var p = extra[code];
      if (!p || !p.dict) return;
      // 与内置包结构保持一致：{ label, dict }
      window.__packs[code] = { label: p.label || code, dict: p.dict, lang: p.label || code };
    });
    window.__cube3dExtraCodes = Object.keys(extra);
  } catch (e) {
    console.error('[desktop] 语言包注入失败', e);
  }

  /* ------------------------ 2. 说明书地址同步映射表 ------------------------ */

  // loadManual 是同步取 URL 的，这里先建缓存，随后异步补齐
  window.__desktopManualMap = Object.create(null);
  window.__desktopManualUrl = function (lang) {
    return window.__desktopManualMap[lang] || null;
  };

  function refreshManualMap() {
    var codes = ['zh-CN', 'zh-TW', 'en', 'ja'].concat(window.__cube3dExtraCodes || []);
    codes.forEach(function (code) {
      D.langpack.manualUrl(code).then(function (r) {
        if (r && r.ok && r.url) window.__desktopManualMap[code] = r.url;
      }).catch(function () {});
    });
  }
  refreshManualMap();
  window.__desktopRefreshManualMap = refreshManualMap;

  /* --------------------------- 3. 桌面端行为微调 --------------------------- */

  // 禁用浏览器默认右键菜单之外的行为：拖入文件时不要让 Chromium 直接导航到该文件
  window.addEventListener('dragover', function (e) { e.preventDefault(); }, false);
  window.addEventListener('drop', function (e) { e.preventDefault(); }, false);

  // 屏蔽 Ctrl+滚轮 缩放整个界面（3D 场景自己要用滚轮）
  window.addEventListener('wheel', function (e) {
    if (e.ctrlKey) e.preventDefault();
  }, { passive: false });

  // 生产环境下禁用 F5 刷新误触（改由菜单 Ctrl+R 提供）
  window.addEventListener('keydown', function (e) {
    if (e.key === 'F5' && !e.ctrlKey) e.preventDefault();
  });
})();
