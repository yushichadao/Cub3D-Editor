// 将说明书内"笔记"功能显示名统一改为"便签"（各语言对应词）。
// 仅替换界面显示串与注释中的名词，不改代码标识符（renderNotes 等保持不变）。
import fs from 'fs';

const root = process.cwd();

function patch(file, subs) {
  let s = fs.readFileSync(root + '/' + file, 'utf8');
  let total = 0;
  const log = [];
  for (const [from, to] of subs) {
    if (!from) continue;
    const n = s.split(from).length - 1;
    if (n === 0) { log.push(`  [跳过] 未找到: ${JSON.stringify(from)}`); continue; }
    s = s.split(from).join(to);
    total += n;
    log.push(`  [${n}x] ${JSON.stringify(from)} -> ${JSON.stringify(to)}`);
  }
  fs.writeFileSync(root + '/' + file, s);
  console.log('== ' + file + ' (共 ' + total + ' 处) ==');
  console.log(log.join('\n'));
}

// ---- 简体中文（index.html 内联字典 + 标记 + 注释） ----
patch('index.html', [
  ["manNote:'笔记'", "manNote:'便签'"],
  ["manNoNote:'暂无笔记'", "manNoNote:'暂无便签'"],
  ["manNotePh:'输入笔记…'", "manNotePh:'输入便签…'"],
  ["manAdded:'已添加笔记'", "manAdded:'已添加便签'"],
  ["manDeleted:'已删除笔记'", "manDeleted:'已删除便签'"],
  ["manNoteSaved:'笔记已保存'", "manNoteSaved:'便签已保存'"],
  ["manDelConfirm:'确认删除此笔记？此操作不可撤销'", "manDelConfirm:'确认删除此便签？此操作不可撤销'"],
  ["manBatchDelConfirm:'确认删除选中的 {0} 条笔记？此操作不可撤销'", "manBatchDelConfirm:'确认删除选中的 {0} 条便签？此操作不可撤销'"],
  ["manExported:'笔记已导出'", "manExported:'便签已导出'"],
  ["manImported:'已导入 {0} 条笔记'", "manImported:'已导入 {0} 条便签'"],
  ["manNoSel:'请先选择笔记'", "manNoSel:'请先选择便签'"],
  ["manJumpFail:'未找到笔记对应的原文'", "manJumpFail:'未找到便签对应的原文'"],
  ['data-i18n="manNote">笔记<', 'data-i18n="manNote">便签<'],
  ['无目录/搜索/笔记', '无目录/搜索/便签'],
  ['无目录 / 搜索 / 笔记', '无目录 / 搜索 / 便签'],
  ['便签式笔记浮窗（多便签）', '便签浮窗（多便签）'],
  ['// ===== 笔记数据（自动升级旧结构', '// ===== 便签数据（自动升级旧结构'],
  ['// ===== 跳转到笔记所指原文 =====', '// ===== 跳转到便签所指原文 ====='],
]);

// ---- 繁体中文 ----
patch('language/zh-TW.js', [
  ["manNote:'筆記'", "manNote:'便簽'"],
  ["manNoNote:'暫無筆記'", "manNoNote:'暫無便簽'"],
  ["manNotePh:'輸入筆記…'", "manNotePh:'輸入便簽…'"],
  ["manAdded:'已新增筆記'", "manAdded:'已新增便簽'"],
  ["manDeleted:'已刪除筆記'", "manDeleted:'已刪除便簽'"],
  ["manNoteSaved:'筆記已儲存'", "manNoteSaved:'便簽已儲存'"],
  ["manDelConfirm:'確認刪除此筆記？此操作無法復原'", "manDelConfirm:'確認刪除此便簽？此操作無法復原'"],
  ["manBatchDelConfirm:'確認刪除選中的 {0} 條筆記？此操作無法復原'", "manBatchDelConfirm:'確認刪除選中的 {0} 條便簽？此操作無法復原'"],
  ["manExported:'筆記已匯出'", "manExported:'便簽已匯出'"],
  ["manImported:'已匯入 {0} 條筆記'", "manImported:'已匯入 {0} 條便簽'"],
  ["manNoSel:'請先選擇筆記'", "manNoSel:'請先選擇便簽'"],
  ["manJumpFail:'找不到筆記對應的原文'", "manJumpFail:'找不到便簽對應的原文'"],
]);

// ---- 日本語 ----
patch('language/ja.js', [
  ["manNote:'ノート'", "manNote:'付箋'"],
  ["manNoNote:'ノートはありません'", "manNoNote:'付箋はありません'"],
  ["manNotePh:'メモ…'", "manNotePh:'付箋…'"],
  ["manAdded:'ノートを追加しました'", "manAdded:'付箋を追加しました'"],
  ["manDeleted:'ノートを削除しました'", "manDeleted:'付箋を削除しました'"],
  ["manNoteSaved:'ノートを保存しました'", "manNoteSaved:'付箋を保存しました'"],
  ["manDelConfirm:'このノートを削除しますか？この操作は取り消せません'", "manDelConfirm:'この付箋を削除しますか？この操作は取り消せません'"],
  ["manBatchDelConfirm:'選択した {0} 件のノートを削除しますか？この操作は取り消せません'", "manBatchDelConfirm:'選択した {0} 件の付箋を削除しますか？この操作は取り消せません'"],
  ["manExported:'ノートを書き出しました'", "manExported:'付箋を書き出しました'"],
  ["manImported:'ノート {0} 件を読み込みました'", "manImported:'付箋 {0} 件を読み込みました'"],
  ["manNoSel:'ノートを選択してください'", "manNoSel:'付箋を選択してください'"],
  ["manJumpFail:'ノートに対応する原文が見つかりません'", "manJumpFail:'付箋に対応する原文が見つかりません'"],
]);

// ---- English ----
patch('language/en.js', [
  ["manNote:'Notes'", "manNote:'Sticky Notes'"],
  ["manNoNote:'No notes'", "manNoNote:'No sticky notes'"],
  ["manNotePh:'Note…'", "manNotePh:'Sticky note…'"],
  ["manAdded:'Note added'", "manAdded:'Sticky note added'"],
  ["manDeleted:'Note deleted'", "manDeleted:'Sticky note deleted'"],
  ["manNoteSaved:'Note saved'", "manNoteSaved:'Sticky note saved'"],
  ["manDelConfirm:'Delete this note? This cannot be undone'", "manDelConfirm:'Delete this sticky note? This cannot be undone'"],
  ["manBatchDelConfirm:'Delete {0} selected notes? This cannot be undone'", "manBatchDelConfirm:'Delete {0} selected sticky notes? This cannot be undone'"],
  ["manExported:'Notes exported'", "manExported:'Sticky notes exported'"],
  ["manImported:'Imported {0} notes'", "manImported:'Imported {0} sticky notes'"],
  ["manNoSel:'Select notes first'", "manNoSel:'Select sticky notes first'"],
  ["manJumpFail:'Source text for this note was not found'", "manJumpFail:'Source text for this sticky note was not found'"],
]);

console.log('\n完成：显示名已统一为「便签」。');
