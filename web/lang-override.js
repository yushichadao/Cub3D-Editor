// 平台差异化语言覆盖（Web）：在公共包加载后合并
window.__packs = window.__packs || {};
(function () {
  var ov = {
    'zh-TW': { aboutDesc:'基於 Three.js 的網頁版三維圖形設計與編輯工具。', aboutAI:'本網站由 TRAE 與 CodeBuddy 工具 AI 輔助生成' },
    'en': { aboutDesc:'A web-based 3D design and editing tool powered by Three.js.', aboutAI:'This website was AI-assisted generated using TRAE and CodeBuddy tools.' },
    'ja': { aboutDesc:'Three.jsベースのウェブ版3Dグラフィックデザイン・編集ツール。', aboutAI:'本サイトは TRAE と CodeBuddy ツールの AI 支援により生成されました。' },
    'ko': { aboutDesc:'Three.js 기반 웹용 3D 그래픽 디자인·편집 도구.', aboutAI:'이 웹사이트는 TRAE 및 CodeBuddy 도구의 AI 지원으로 생성되었습니다.' },
    'ru': { aboutDesc:'Веб-инструмент для трёхмерного графического дизайна и редактирования на базе Three.js.', aboutAI:'Данный сайт создан с помощью ИИ-инструментов TRAE и CodeBuddy' },
    'ar': { aboutDesc:'أداة تصميم وتحرير مشاهد ثلاثية الأبعاد تعمل في المتصفح، مدعومة بـ Three.js.', aboutAI:'تم توليد هذا التطبيق بمساعدة أدوات TRAE وCodeBuddy.' }
  };
  Object.keys(ov).forEach(function (code) {
    if (window.__packs[code]) Object.assign(window.__packs[code], ov[code]);
  });
})();
