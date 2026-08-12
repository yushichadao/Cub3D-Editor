// 平台差异化语言覆盖（Android）：在公共包加载后合并
window.__packs = window.__packs || {};
(function () {
  var ov = {
    'zh-TW': { aboutDesc:'基於 Three.js 的 Android 版三維圖形設計與編輯工具。', aboutAI:'本應用由 TRAE 與 CodeBuddy 工具 AI 輔助生成', exitTitle:'退出確認', exitMsg:'是否保存目前場景？未保存的內容將在退出後遺失。', exitMsgCancel:'您未選擇保存位置，場景尚未保存。確定要退出嗎？', exitMsgFail:'保存失敗，確定要退出嗎？', exitCancel:'取消', exitNoSave:'不保存退出', exitSave:'保存並退出' },
    'en': { aboutDesc:'An Android-based 3D design and editing tool powered by Three.js.', aboutAI:'This app was AI-assisted generated using TRAE and CodeBuddy tools.', exitTitle:'Exit Confirmation', exitMsg:'Do you want to save the current scene? Unsaved changes will be lost after exiting.', exitMsgCancel:'You did not choose a save location; the scene is not saved. Exit anyway?', exitMsgFail:'Saving failed. Exit anyway?', exitCancel:'Cancel', exitNoSave:'Exit Without Saving', exitSave:'Save and Exit' },
    'ja': { aboutDesc:'Three.jsベースのAndroid向け3Dグラフィックデザイン・編集ツール。', aboutAI:'本アプリは TRAE と CodeBuddy ツールの AI 支援により生成されました。', exitTitle:'終了の確認', exitMsg:'現在のシーンを保存しますか？保存していない内容は終了後に失われます。', exitMsgCancel:'保存先が選択されていません。シーンは保存されていません。終了しますか？', exitMsgFail:'保存に失敗しました。終了しますか？', exitCancel:'キャンセル', exitNoSave:'保存せずに終了', exitSave:'保存して終了' },
    'ko': { aboutDesc:'Three.js 기반 Android용 3D 그래픽 디자인·편집 도구.', aboutAI:'이 앱은 TRAE 및 CodeBuddy 도구의 AI 지원으로 생성되었습니다.', exitTitle:'종료 확인', exitMsg:'현재 장면을 저장하시겠습니까? 저장하지 않은 내용은 종료 시 손실됩니다.', exitMsgCancel:'저장 위치를 선택하지 않았습니다. 장면이 저장되지 않았습니다. 정말 종료하시겠습니까?', exitMsgFail:'저장에 실패했습니다. 정말 종료하시겠습니까?', exitCancel:'취소', exitNoSave:'저장하지 않고 종료', exitSave:'저장 후 종료' },
    'ru': { aboutDesc:'Инструмент для трёхмерного графического дизайна и редактирования на базе Three.js для Android.', aboutAI:'Данное приложение создано с помощью ИИ-инструментов TRAE и CodeBuddy', exitTitle:'Подтверждение выхода', exitMsg:'Сохранить текущую сцену? Несохранённое содержимое будет утеряно при выходе.', exitMsgCancel:'Вы не выбрали место сохранения, сцена ещё не сохранена. Вы действительно хотите выйти?', exitMsgFail:'Не удалось сохранить, действительно выйти?', exitCancel:'Отмена', exitNoSave:'Выйти без сохранения', exitSave:'Сохранить и выйти' }
  };
  Object.keys(ov).forEach(function (code) {
    if (window.__packs[code]) Object.assign(window.__packs[code], ov[code]);
  });
})();
