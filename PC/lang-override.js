// 平台差异化语言覆盖（PC）：在公共包加载后合并
window.__packs = window.__packs || {};
(function () {
  var ov = {
    'zh-TW': { aboutDesc:'基於 Three.js 的 PC 版三維圖形設計與編輯工具。', aboutAI:'本應用由 TRAE 與 CodeBuddy 工具 AI 輔助生成', titleMax:'最大化', titleRestore:'向下還原', titleExitFS:'退出全螢幕' },
    'en': { aboutDesc:'A PC-based 3D design and editing tool powered by Three.js.', aboutAI:'This app was AI-assisted generated using TRAE and CodeBuddy tools.', titleMax:'Maximize', titleRestore:'Restore Down', titleExitFS:'Exit Fullscreen' },
    'ja': { aboutDesc:'Three.jsベースのPC向け3Dグラフィックデザイン・編集ツール。', aboutAI:'本アプリは TRAE と CodeBuddy ツールの AI 支援により生成されました。', titleMax:'最大化', titleRestore:'元のサイズに戻す', titleExitFS:'全画面解除' }
  };
  Object.keys(ov).forEach(function (code) {
    if (window.__packs[code]) Object.assign(window.__packs[code], ov[code]);
  });
})();
