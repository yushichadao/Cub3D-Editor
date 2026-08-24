'use strict';
/** 窗口工厂：主窗口（无边框自绘）。 */
const { BrowserWindow, screen, shell, nativeTheme, ipcMain } = require('electron');
const path = require('path');
const P = require('./paths');
const store = require('./store');
const { INDEX_URL, SCHEME } = require('./protocol');

/** @type {BrowserWindow|null} */
let mainWindow = null;

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
  const area = screen.getPrimaryDisplay().workAreaSize;
  // 默认窗口与主屏工作区同比例、占 94%：比旧固定 1440x900(16:10) 更大且贴合屏幕长宽比
  const def = {
    width: Math.max(Math.round(area.width * 0.94), 960),
    height: Math.max(Math.round(area.height * 0.94), 620)
  };
  // 迁移：旧版本保存的窗口比例与屏幕工作区明显不一致时（如固定 16:10 默认），一次性改用屏幕比例并居中；
  // 仅首次生效，之后用户手动调整的比例会被保留。
  if (saved.width && saved.height && !store.get('window.ratioSynced', false)) {
    const savedRatio = saved.width / saved.height;
    const areaRatio = area.width / area.height;
    if (Math.abs(savedRatio - areaRatio) > 0.04) {
      saved.width = def.width;
      saved.height = def.height;
      delete saved.x;
      delete saved.y;
      store.set('window.ratioSynced', true);
    }
  }
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
  const t0 = Date.now();

  const opts = {
    ...bounds,
    minWidth: 960,
    minHeight: 620,
    show: false,
    frame: !frameless,
    title: '立方·3D设计工坊',
    backgroundColor: '#0c0e16',
    icon: path.join(P.resourcesRoot, 'build', 'icon.ico'),
    autoHideMenuBar: true,
    webPreferences: baseWebPreferences()
  };

  // Win11 云母需要透明背景；页面出来前会透出白色，启动看起来像卡住。
  // 默认关闭，用与 loader 一致的深色底；设置里仍可打开云母。
  if (process.platform === 'win32' && store.get('ui.mica', false)) {
    opts.backgroundMaterial = 'mica';
    opts.backgroundColor = '#00000000';
  }

  const win = new BrowserWindow(opts);
  mainWindow = win;

  win.loadURL(INDEX_URL);

  // 诊断：页面加载失败/完成都打印，便于定位「无窗体」问题
  win.webContents.on('did-fail-load', (_e, errorCode, errorDescription, validatedURL) => {
    console.error('[load] did-fail-load', errorCode, errorDescription, validatedURL);
  });
  win.webContents.on('did-finish-load', () => {
    console.log('[load] did-finish-load', win.webContents.getURL(), (Date.now() - t0) + 'ms');
  });

  // 兜底：若 8 秒内仍没触发 ready-to-show（页面卡住），强制显示窗口，避免「永远看不到窗体」
  const showFallback = setTimeout(() => {
    if (!win.isDestroyed() && !win.isVisible()) {
      console.warn('[load] ready-to-show 超时，强制显示窗口', (Date.now() - t0) + 'ms');
      win.show();
      win.maximize();
    }
  }, 8000);

  win.once('ready-to-show', () => {
    clearTimeout(showFallback);
    console.log('[load] ready-to-show', (Date.now() - t0) + 'ms');
    // 开屏最大化：先 show 再 maximize，确保启动即全屏加载页（show 前调用 maximize 部分平台不生效）
    win.show();
    win.maximize();
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

function getMain() { return mainWindow; }
function broadcast(channel, payload) {
  for (const w of BrowserWindow.getAllWindows()) {
    if (!w.isDestroyed()) w.webContents.send(channel, payload);
  }
}

module.exports = {
  createMainWindow,
  getMain, broadcast, persistBounds
};
