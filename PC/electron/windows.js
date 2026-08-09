'use strict';
/** 窗口工厂：主窗口（无边框自绘）、便签窗、插件控制台。 */
const { BrowserWindow, screen, shell, nativeTheme, ipcMain } = require('electron');
const path = require('path');
const P = require('./paths');
const store = require('./store');
const { INDEX_URL, SCHEME } = require('./protocol');

/** @type {BrowserWindow|null} */
let mainWindow = null;
/** @type {Map<string, BrowserWindow>} */
const stickyWindows = new Map();
/** @type {BrowserWindow|null} */
let consoleWindow = null;

const PRELOAD = path.join(__dirname, 'preload.js');

function baseWebPreferences(extra) {
  return Object.assign({
    preload: PRELOAD,
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: false,          // preload 需要 require 自身模块
    webSecurity: true,
    spellcheck: false,
    backgroundThrottling: false,
    webgl: true
  }, extra || {});
}

/** 还原上次窗口位置，并校验是否仍在可见屏幕范围内（拔掉外接屏后不会跑到屏幕外） */
function restoreBounds() {
  const saved = store.get('window', {});
  const def = { width: 1440, height: 900 };
  const area = screen.getPrimaryDisplay().workAreaSize;
  const width = Math.min(saved.width || def.width, area.width);
  const height = Math.min(saved.height || def.height, area.height);
  const bounds = { width, height };
  if (Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
    const visible = screen.getAllDisplays().some(d => {
      const b = d.workArea;
      return saved.x < b.x + b.width && saved.x + width > b.x && saved.y < b.y + b.height && saved.y + height > b.y;
    });
    if (visible) { bounds.x = saved.x; bounds.y = saved.y; }
  }
  return bounds;
}

function persistBounds(win) {
  if (!win || win.isDestroyed() || win.isMinimized()) return;
  const maximized = win.isMaximized();
  store.set('window.maximized', maximized);
  if (!maximized && !win.isFullScreen()) {
    const b = win.getBounds();
    store.merge({ window: { x: b.x, y: b.y, width: b.width, height: b.height } });
  }
}

function createMainWindow() {
  const bounds = restoreBounds();
  const frameless = store.get('ui.frameless', true);

  const opts = {
    ...bounds,
    minWidth: 960,
    minHeight: 620,
    show: false,
    frame: !frameless,
    title: '立方三维设计工坊',
    backgroundColor: '#0c0e16',
    icon: path.join(P.resourcesRoot, 'build', 'icon.ico'),
    autoHideMenuBar: true,
    webPreferences: baseWebPreferences()
  };

  // Win11 云母材质：需要透明背景配合，失败时静默降级为纯色
  if (process.platform === 'win32' && store.get('ui.mica', true)) {
    opts.backgroundMaterial = 'mica';
    opts.backgroundColor = '#00000000';
  }

  const win = new BrowserWindow(opts);
  mainWindow = win;

  win.loadURL(INDEX_URL);

  win.once('ready-to-show', () => {
    if (store.get('window.maximized', false)) win.maximize();
    win.show();
    if (P.isDev) win.webContents.openDevTools({ mode: 'detach' });
  });

  // 无边框下把窗口状态同步给自绘标题栏
  const notifyState = () => {
    if (win.isDestroyed()) return;
    win.webContents.send('window:state', {
      maximized: win.isMaximized(),
      fullScreen: win.isFullScreen(),
      focused: win.isFocused()
    });
  };
  ['maximize', 'unmaximize', 'enter-full-screen', 'leave-full-screen', 'focus', 'blur', 'restore'].forEach(ev => win.on(ev, notifyState));
  win.on('resize', () => persistBounds(win));
  win.on('move', () => persistBounds(win));

  win.on('close', (e) => {
    // 交给渲染层询问「未保存的改动」，渲染层确认后调用 window:force-close
    if (!win.__forceClose) {
      e.preventDefault();
      win.webContents.send('app:before-close');
      // 渲染层收到后会立即回执 app:before-close-ack（表示已接管，可能正在等待用户交互）；
      // 仅在渲染层真正无响应时才兜底强制关闭，避免交互弹窗被误杀
      const t = setTimeout(() => {
        ipcMain.removeListener('app:before-close-ack', onAck);
        if (!win.isDestroyed() && !win.__forceClose) { win.__forceClose = true; win.close(); }
      }, 1500);
      const onAck = () => {
        clearTimeout(t);
        ipcMain.removeListener('app:before-close-ack', onAck);
      };
      ipcMain.on('app:before-close-ack', onAck);
      return;
    }
    persistBounds(win);
    store.flush();
  });

  win.on('closed', () => {
    mainWindow = null;
    for (const w of stickyWindows.values()) { if (!w.isDestroyed()) w.destroy(); }
    stickyWindows.clear();
    if (consoleWindow && !consoleWindow.isDestroyed()) consoleWindow.destroy();
  });

  // 外链一律走系统浏览器，绝不在应用内开新窗
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith(SCHEME + '://')) {
      e.preventDefault();
      if (/^https?:/i.test(url)) shell.openExternal(url);
    }
  });

  return win;
}

/** 便签独立小窗：置顶、无边框、可跨屏拖动 */
function createStickyWindow(note) {
  const id = String(note && note.id != null ? note.id : Date.now());
  const exist = stickyWindows.get(id);
  if (exist && !exist.isDestroyed()) { exist.focus(); return exist; }

  const win = new BrowserWindow({
    width: note && note.width ? note.width : 300,
    height: note && note.height ? note.height : 240,
    x: note && Number.isFinite(note.x) ? note.x : undefined,
    y: note && Number.isFinite(note.y) ? note.y : undefined,
    frame: false,
    transparent: true,
    resizable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    minimizable: false,
    maximizable: false,
    backgroundColor: '#00000000',
    webPreferences: baseWebPreferences()
  });

  win.loadURL(`${SCHEME}://local/shell/sticky.html?id=${encodeURIComponent(id)}`);
  win.setAlwaysOnTop(true, 'floating');
  stickyWindows.set(id, win);
  win.on('closed', () => stickyWindows.delete(id));
  return win;
}

function closeStickyWindow(id) {
  const win = stickyWindows.get(String(id));
  if (win && !win.isDestroyed()) win.close();
}

/** 插件控制台：查看插件日志、运行时状态、库安装进度 */
function createConsoleWindow() {
  if (consoleWindow && !consoleWindow.isDestroyed()) { consoleWindow.focus(); return consoleWindow; }
  consoleWindow = new BrowserWindow({
    width: 980,
    height: 640,
    frame: false,
    parent: mainWindow || undefined,
    backgroundColor: '#0c0e16',
    show: false,
    webPreferences: baseWebPreferences()
  });
  consoleWindow.loadURL(`${SCHEME}://local/shell/console.html`);
  consoleWindow.once('ready-to-show', () => consoleWindow.show());
  consoleWindow.on('closed', () => { consoleWindow = null; });
  return consoleWindow;
}

function getMain() { return mainWindow; }
function broadcast(channel, payload) {
  for (const w of BrowserWindow.getAllWindows()) {
    if (!w.isDestroyed()) w.webContents.send(channel, payload);
  }
}

module.exports = {
  createMainWindow, createStickyWindow, closeStickyWindow, createConsoleWindow,
  getMain, broadcast, persistBounds, stickyWindows
};
