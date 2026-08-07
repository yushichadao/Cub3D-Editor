// 平台差异化语言覆盖（Web）：在公共包加载后合并
window.__packs = window.__packs || {};
(function () {
  var ov = {
    'zh-TW': { aboutDesc:'基於 Three.js 的網頁版三維圖形設計與編輯工具。', aboutAI:'本網站由 TRAE 與 CodeBuddy 工具 AI 輔助生成' },
    'en': { aboutDesc:'A web-based 3D design and editing tool powered by Three.js.', aboutAI:'This website was AI-assisted generated using TRAE and CodeBuddy tools.' },
    'ja': { aboutDesc:'Three.jsベースのウェブ版3Dグラフィックデザイン・編集ツール。', aboutAI:'本サイトは TRAE と CodeBuddy ツールの AI 支援により生成されました。' }
  };
  Object.keys(ov).forEach(function (code) {
    if (window.__packs[code]) Object.assign(window.__packs[code], ov[code]);
  });
})();
