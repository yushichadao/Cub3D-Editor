'use strict';
/**
 * 立方三维设计工坊 · 桌面版主进程入口
 *
 * 启动顺序（顺序不可调换）：
 *   1. 单实例锁              —— 双击第二个文件时复用已开窗口
 *   2. 注册 app:// 特权 scheme —— 必须早于 app.ready
 *   3. ready 后挂载协议处理器、IPC、菜单、插件宿主
 *   4. 创建主窗口并处理命令行传入的场景文件
 */
const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const P = require('./paths');
const store = require('./store');
const proto = require('./protocol');
const W = require('./windows');
const ipc = require('./ipc');
const menu = require('./menu');
const pluginHost = require('./services/plugin-host');
const fsSvc = require('./services/fs-service');

/* ------------------------------ 基础环境设置 ------------------------------ */

app.setAppUserModelId('com.yushichadao.cube3d');
// 避免中文路径下缓存目录异常
app.commandLine.appendSwitch('lang', 'zh-CN');
// 关闭无谓的自动填充与拼写检查报错
app.commandLine.appendSwitch('disable-features', 'Autofill,AutofillServerCommunication');

proto.registerScheme();

/* -------------------------------- 单实例锁 -------------------------------- */

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', (_e, argv) => {
    const win = W.getMain();
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
      const file = pickSceneFromArgv(argv);
      if (file) win.webContents.send('file:open-request', file);
    }
  });
}

/** 从命令行参数里挑出场景文件（双击 .l3d 时 Windows 会把路径塞进来） */
function pickSceneFromArgv(argv) {
  const args = (argv || process.argv).slice(1);
  for (const a of args) {
    if (typeof a !== 'string' || a.startsWith('-')) continue;
    if (!/\.(l3d|json)$/i.test(a)) continue;
    try { if (fs.existsSync(a)) return path.resolve(a); } catch (_) {}
  }
  return null;
}

/* --------------------------------- 崩溃日志 ------------------------------- */

function writeCrashLog(kind, err) {
  try {
    fs.mkdirSync(P.logs, { recursive: true });
    const file = path.join(P.logs, 'error-' + new Date().toISOString().slice(0, 10) + '.log');
    const text = `\n[${new Date().toISOString()}] ${kind}\n${(err && err.stack) || err}\n`;
    fs.appendFileSync(file, text, 'utf8');
  } catch (_) {}
}

process.on('uncaughtException', err => {
  writeCrashLog('uncaughtException', err);
  console.error(err);
});
process.on('unhandledRejection', err => writeCrashLog('unhandledRejection', err));

/* ---------------------------------- 启动 ---------------------------------- */

app.whenReady().then(() => {
  P.ensureDirs();
  proto.handle();

  // 事件广播器交给插件宿主，用于把日志/状态推到所有窗口
  pluginHost.init((channel, payload) => W.broadcast(channel, payload));

  ipc.register();

  // 自绘标题栏的菜单按钮
  ipcMain.on('menu:popup', (e, pos) => {
    const win = BrowserWindow.fromWebContents(e.sender);
    if (win) menu.popup(win, pos && pos.x, pos && pos.y);
  });
  ipcMain.on('menu:rebuild', () => menu.build());

  menu.build();

  const win = W.createMainWindow();

  // 页面就绪后再投递「要打开的文件」，否则渲染层还没挂上监听
  win.webContents.once('did-finish-load', () => {
    const file = pickSceneFromArgv(process.argv);
    if (file) win.webContents.send('file:open-request', file);
    // 延后启动自启插件，避免和首屏渲染抢资源
    setTimeout(() => pluginHost.startAutoPlugins(), 1200);
  });

  win.webContents.on('render-process-gone', (_e, details) => {
    writeCrashLog('render-process-gone', new Error(details.reason + ' / ' + details.exitCode));
    dialog.showErrorBox('渲染进程异常退出', `原因：${details.reason}\n应用将尝试重新加载页面。`);
    if (!win.isDestroyed()) win.reload();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) W.createMainWindow();
  });
});

// macOS 上的文件关联（Windows 走 argv）
app.on('open-file', (e, filePath) => {
  e.preventDefault();
  const win = W.getMain();
  if (win) win.webContents.send('file:open-request', filePath);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  try { pluginHost.stopAll(); } catch (_) {}
  try { store.flush(); } catch (_) {}
});

// 统一收口：禁止任何页面请求危险权限
app.on('web-contents-created', (_e, contents) => {
  contents.session.setPermissionRequestHandler((_wc, permission, callback) => {
    const allow = ['clipboard-read', 'clipboard-sanitized-write', 'fullscreen', 'pointerLock'];
    callback(allow.includes(permission));
  });
  contents.on('will-attach-webview', (evt) => evt.preventDefault());
});
