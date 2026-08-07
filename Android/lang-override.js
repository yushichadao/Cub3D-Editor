// 平台差异化语言覆盖（Android）：在公共包加载后合并
window.__packs = window.__packs || {};
(function () {
  var ov = {
    'zh-TW': { aboutDesc:'基於 Three.js 的 Android 版三維圖形設計與編輯工具。', aboutAI:'本應用由 TRAE 與 CodeBuddy 工具 AI 輔助生成', exitTitle:'退出確認', exitMsg:'是否保存目前場景？未保存的內容將在退出後遺失。', exitMsgCancel:'您未選擇保存位置，場景尚未保存。確定要退出嗎？', exitMsgFail:'保存失敗，確定要退出嗎？', exitCancel:'取消', exitNoSave:'不保存退出', exitSave:'保存並退出' },
    'en': { aboutDesc:'An Android-based 3D design and editing tool powered by Three.js.', aboutAI:'This app was AI-assisted generated using TRAE and CodeBuddy tools.', exitTitle:'Exit Confirmation', exitMsg:'Do you want to save the current scene? Unsaved changes will be lost after exiting.', exitMsgCancel:'You did not choose a save location; the scene is not saved. Exit anyway?', exitMsgFail:'Saving failed. Exit anyway?', exitCancel:'Cancel', exitNoSave:'Exit Without Saving', exitSave:'Save and Exit' },
    'ja': { aboutDesc:'Three.jsベースのAndroid向け3Dグラフィックデザイン・編集ツール。', aboutAI:'本アプリは TRAE と CodeBuddy ツールの AI 支援により生成されました。', exitTitle:'終了の確認', exitMsg:'現在のシーンを保存しますか？保存していない内容は終了後に失われます。', exitMsgCancel:'保存先が選択されていません。シーンは保存されていません。終了しますか？', exitMsgFail:'保存に失敗しました。終了しますか？', exitCancel:'キャンセル', exitNoSave:'保存せずに終了', exitSave:'保存して終了' }
  };
  Object.keys(ov).forEach(function (code) {
    if (window.__packs[code]) Object.assign(window.__packs[code], ov[code]);
  });
})();
