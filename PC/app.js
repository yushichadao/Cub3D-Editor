// 诊断用极简 app.js —— 仅验证启动白屏是否由 app.js 编译/执行导致
window.__diagAppJsExecuted = Date.now();
console.log('[diag] app.js executed at', window.__diagAppJsExecuted);
