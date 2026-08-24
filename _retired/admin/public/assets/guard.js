/**
 * admin/public/assets/guard.js — 管理端防篡改（挂到所有管理页 <head>，defer）
 *
 * 仅做轻量防护：阻止打开开发者工具（禁用 F12 / 右键菜单 / Ctrl+Shift+I|J|C / Ctrl+U）。
 * 不再做「防删除 UI 自动 reload」——该逻辑会误判 build/files 等动态渲染页面的
 * 正常 DOM 变动，导致反复刷新死循环。登录态统一由后端 auth-check 管控。
 */
(function () {
  'use strict';

  // ---------- 阻止打开开发者工具 ----------
  function block(e) { e.preventDefault(); e.stopPropagation(); return false; }
  window.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || e.keyCode === 123) return block(e);
    var k = (e.key || '').toUpperCase();
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (k === 'I' || k === 'J' || k === 'C')) return block(e);
    if ((e.ctrlKey || e.metaKey) && k === 'U') return block(e);
  }, true);
  window.addEventListener('contextmenu', block, true);
})();
