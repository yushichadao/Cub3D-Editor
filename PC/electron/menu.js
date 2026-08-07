'use strict';
/**
 * 应用菜单与全局快捷键。
 * 无边框模式下菜单栏不显示，但快捷键（accelerator）依然生效，
 * 自绘标题栏上的「☰」按钮可弹出同一份菜单。
 */
const { Menu, app, shell } = require('electron');
const P = require('./paths');
const store = require('./store');
const W = require('./windows');
const fsSvc = require('./services/fs-service');

function send(action, payload) {
  const win = W.getMain();
  if (win && !win.isDestroyed()) win.webContents.send('menu:action', { action, payload });
}

function buildRecentSubmenu() {
  const list = fsSvc.getRecent();
  if (!list.length) return [{ label: '（暂无）', enabled: false }];
  return [
    ...list.map(f => ({ label: f.name, sublabel: f.path, click: () => send('file.openRecent', f.path) })),
    { type: 'separator' },
    { label: '清空最近列表', click: () => send('file.clearRecent') }
  ];
}

function template() {
  return [
    {
      label: '文件(&F)',
      submenu: [
        { label: '新建场景', accelerator: 'CmdOrCtrl+N', click: () => send('file.new') },
        { label: '打开…', accelerator: 'CmdOrCtrl+O', click: () => send('file.open') },
        { label: '最近打开', submenu: buildRecentSubmenu() },
        { type: 'separator' },
        { label: '保存', accelerator: 'CmdOrCtrl+S', click: () => send('file.save') },
        { label: '另存为…', accelerator: 'CmdOrCtrl+Shift+S', click: () => send('file.saveAs') },
        { type: 'separator' },
        { label: '导入场景 JSON…', click: () => send('file.import') },
        { label: '导出场景 JSON…', click: () => send('file.export') },
        { label: '保存截图…', accelerator: 'CmdOrCtrl+P', click: () => send('file.screenshot') },
        { type: 'separator' },
        { label: '打开数据目录', click: () => fsSvc.openDataFolder() },
        { type: 'separator' },
        { label: '退出', accelerator: 'Alt+F4', role: 'quit' }
      ]
    },
    {
      label: '编辑(&E)',
      submenu: [
        { label: '撤销', accelerator: 'CmdOrCtrl+Z', click: () => send('edit.undo') },
        { label: '重做', accelerator: 'CmdOrCtrl+Y', click: () => send('edit.redo') },
        { type: 'separator' },
        { label: '复制', accelerator: 'CmdOrCtrl+C', click: () => send('edit.copy') },
        { label: '粘贴', accelerator: 'CmdOrCtrl+V', click: () => send('edit.paste') },
        { label: '克隆', accelerator: 'CmdOrCtrl+D', click: () => send('edit.duplicate') },
        { label: '删除', accelerator: 'Delete', click: () => send('edit.delete') },
        { type: 'separator' },
        { label: '全选', accelerator: 'CmdOrCtrl+A', click: () => send('edit.selectAll') },
        { label: '清空场景', click: () => send('edit.clear') }
      ]
    },
    {
      label: '视图(&V)',
      submenu: [
        { label: '透视视角', click: () => send('view.preset', 'persp') },
        { label: '顶视图', click: () => send('view.preset', 'top') },
        { label: '底视图', click: () => send('view.preset', 'bottom') },
        { label: '前视图', click: () => send('view.preset', 'front') },
        { label: '后视图', click: () => send('view.preset', 'back') },
        { label: '左视图', click: () => send('view.preset', 'left') },
        { label: '右视图', click: () => send('view.preset', 'right') },
        { type: 'separator' },
        { label: '坐标轴', click: () => send('view.toggleAxes') },
        { label: '网格面', click: () => send('view.toggleGrid') },
        { type: 'separator' },
        { label: '放大', accelerator: 'CmdOrCtrl+=', role: 'zoomIn' },
        { label: '缩小', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
        { label: '实际大小', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
        { type: 'separator' },
        { label: '全屏', accelerator: 'F11', click: () => { const w = W.getMain(); if (w) w.setFullScreen(!w.isFullScreen()); } },
        { label: '开发者工具', accelerator: 'F12', click: () => { const w = W.getMain(); if (w) w.webContents.toggleDevTools(); } },
        { label: '重新加载', accelerator: 'CmdOrCtrl+R', click: () => { const w = W.getMain(); if (w) w.reload(); } }
      ]
    },
    {
      label: '扩展(&X)',
      submenu: [
        { label: '插件控制台', accelerator: 'CmdOrCtrl+Shift+L', click: () => W.createConsoleWindow() },
        { type: 'separator' },
        { label: '安装插件（从文件夹）…', click: () => send('ext.installPlugin') },
        { label: '打开插件目录', click: () => { shell.openPath(P.plugins); } },
        { label: '打开插件 SDK 目录', click: () => { shell.openPath(P.sdkDir); } },
        { type: 'separator' },
        { label: '语言包管理…', click: () => send('ext.langpacks') },
        { label: '导出语言包模板…', click: () => send('ext.exportLangTemplate') },
        { label: '打开语言包目录', click: () => { shell.openPath(P.langpacks); } }
      ]
    },
    {
      label: '帮助(&H)',
      submenu: [
        { label: '插件开发指南', click: () => send('help.pluginGuide') },
        { type: 'separator' },
        { label: '关于', click: () => send('help.about') },
        { label: 'GitHub 仓库', click: () => shell.openExternal('https://github.com/yushichadao/Cub3D-Editor') }
      ]
    }
  ];
}

function build() {
  const menu = Menu.buildFromTemplate(template());
  Menu.setApplicationMenu(menu);
  return menu;
}

/** 供自绘标题栏的「☰」按钮弹出 */
function popup(win, x, y) {
  const menu = Menu.buildFromTemplate(template());
  menu.popup({ window: win, x: Math.round(x || 0), y: Math.round(y || 0) });
}

module.exports = { build, popup, template };
