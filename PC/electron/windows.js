'use strict';
/** 窗口工厂：主窗口（无边框自绘）、便签窗。 */
const { BrowserWindow, screen, shell, nativeTheme, ipcMain } = require('electron');
const path = require('path');
const P = require('./paths');
const store = require('./store');
const { INDEX_URL, SCHEME } = require('./protocol');

/** 本地 HTTP 服务器端口（由 main.js 启动 server 后写入） */
let _localPort = null;
function setLocalPort(p) { _localPort = p; }

/** @type {BrowserWindow|null} */
let mainWindow = null;
/** @type {Map<string, BrowserWindow>} */
const stickyWindows = new Map();

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
    show: true,
    frame: !frameless,
    title: '立方·3D设计工坊',
    backgroundColor: '#0c0e16',
    icon: path.join(P.resourcesRoot, 'build', 'icon.ico'),
    autoHideMenuBar: true,
    webPreferences: baseWebPreferences()
  };

  // Win11 云母材质：需要透明背景配合。但透明背景在页面渲染前会透出白色，
  // 表现为「白屏闪现」。为保证「打开即见加载页、无白屏」，默认关闭云母，
  // 使用深色 backgroundColor（与 loader 背景一致）。如需云母可在设置里开启。
  if (process.platform === 'win32' && store.get('ui.mica', false)) {
    opts.backgroundMaterial = 'mica';
    opts.backgroundColor = '#00000000';
  }

  const win = new BrowserWindow(opts);
  mainWindow = win;

  // [DIAG] 临时诊断：把渲染进程 console / 崩溃 / 加载失败落盘，定位白屏
  try {
    const os = require('os');
    const rlog = (m) => { try { fs.appendFileSync(require('path').join(os.tmpdir(), 'cub3d-render.log'), `[${new Date().toISOString()}] ${m}\n`); } catch (_) {} };
    win.webContents.on('console-message', (_e, level, message, sourceId, line) => rlog(`CONSOLE[${level}] ${message} @ ${sourceId || ''}:${line}`));
    win.webContents.on('crashed', (_e, killed) => rlog(`CRASHED killed=${killed}`));
    win.webContents.on('did-fail-load', (_e, code, desc, url) => rlog(`FAILLOAD ${code} ${desc} ${url}`));
    win.webContents.on('did-finish-load', () => rlog(`did-finish-load ${win.webContents.getURL()}`));
  } catch (_) {}

  // 主界面通过本地 HTTP 服务器加载（http://127.0.0.1），规避 app:// 协议对大文件
  // 的传输延迟（约 30 秒白屏）。server 未就绪时回退到 app://。
  win.loadURL(_localPort ? `http://127.0.0.1:${_localPort}/index.html` : INDEX_URL);

  // 诊断：页面加载失败/完成都打印，便于定位「无窗体」问题
  win.webContents.on('did-fail-load', (_e, errorCode, errorDescription, validatedURL) => {
    console.error('[load] did-fail-load', errorCode, errorDescription, validatedURL);
  });
  win.webContents.on('did-finish-load', () => {
    console.log('[load] did-finish-load', win.webContents.getURL());
  });

  // 窗口已 show:true 立即显示（深色 backgroundColor 兜底），不再等待 ready-to-show
  win.once('ready-to-show', () => {
    if (store.get('window.maximized', false)) win.maximize();
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

  win.loadURL(_localPort ? `http://127.0.0.1:${_localPort}/shell/sticky.html?id=${encodeURIComponent(id)}` : `${SCHEME}://local/shell/sticky.html?id=${encodeURIComponent(id)}`);
  win.setAlwaysOnTop(true, 'floating');
  stickyWindows.set(id, win);
  win.on('closed', () => stickyWindows.delete(id));
  return win;
}

function closeStickyWindow(id) {
  const win = stickyWindows.get(String(id));
  if (win && !win.isDestroyed()) win.close();
}

function getMain() { return mainWindow; }
function broadcast(channel, payload) {
  for (const w of BrowserWindow.getAllWindows()) {
    if (!w.isDestroyed()) w.webContents.send(channel, payload);
  }
}

module.exports = {
  createMainWindow, createStickyWindow, closeStickyWindow,
  getMain, broadcast, persistBounds, stickyWindows, setLocalPort
};
