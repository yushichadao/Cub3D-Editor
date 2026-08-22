'use strict';
/**
 * 立方·3D设计工坊 · 桌面版主进程入口
 *
 * 启动顺序（顺序不可调换）：
 *   1. 单实例锁              —— 双击第二个文件时复用已开窗口
 *   2. 注册 app:// 特权 scheme —— 必须早于 app.ready
 *   3. ready 后挂载协议处理器、IPC、插件宿主
 *   4. 创建主窗口并处理命令行传入的场景文件
 */

// 关键修复：首次打开白屏
// 打包后的 Electron 会继承系统/用户的 NODE_OPTIONS 环境变量（例如 CodeBuddy 注入的
// --require=".../node-language-shim.cjs"）。Electron 不支持打包应用使用 NODE_OPTIONS，
// 且会在启动时尝试 --require 该外部模块（路径常含中文），卡约 30 秒超时后才继续，
// 导致主进程处理首个 app:// 请求被延迟 30 秒、页面迟迟不出现 → 表现为“第一次打开白屏，
// 第二次正常”。必须在 require('electron') 之前清除它，让打包应用不受外部环境变量干扰。
try { delete process.env.NODE_OPTIONS; } catch (_) {}

const { app, BrowserWindow, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const P = require('./paths');
const store = require('./store');
const proto = require('./protocol');
const W = require('./windows');
const localServer = require('./server');
const ipc = require('./ipc');


/* ------------------------------ 基础环境设置 ------------------------------ */

app.setAppUserModelId('com.yushichadao.cube3d');
// 避免中文路径下缓存目录异常
app.commandLine.appendSwitch('lang', 'zh-CN');
// 关闭无谓的自动填充与拼写检查报错。
// 关键修复：禁用 Chromium 拼写检查（SpellCheck / SpellCheckService）。
// 即便 webPreferences.spellcheck=false，Chromium 仍会在页面加载时尝试从
// Google CDN（redirector.gvt1.com → gvt1-cn.com）下载 en-us-*.bdic 拼写检查
// 字典。国内无法访问该域名，请求卡住约 30 秒超时，期间 ES Module 的 import
// 解析被阻塞，app.js 无法执行 → 表现为「打开窗口白屏 30 秒」。禁用该 feature
// 后，Chromium 不再发起字典下载请求，import 可立即解析，白屏消失。
app.commandLine.appendSwitch('disable-features', 'Autofill,AutofillServerCommunication,SpellCheck,SpellCheckService');
// GPU / 着色器磁盘缓存容错：部分环境下 %APPDATA% 下 GPU 缓存目录创建失败
// （Gpu Cache Creation failed / Unable to move the cache: 拒绝访问 0x5），
// 会导致 GPU 进程异常、WebGL 不可用而白屏。禁用磁盘缓存、允许软件 WebGL 回退，
// 即便 GPU 缓存创建失败也能正常渲染，绝不白屏。
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.commandLine.appendSwitch('enable-unsafe-swiftshader');
app.commandLine.appendSwitch('disable-gpu-watchdog');
// 关键修复：绕过系统代理 / PAC 解析。
// 渲染进程对本地 HTTP 服务器（http://127.0.0.1:18090）发起的 fetch / import 请求，
// Chromium 默认会先按系统代理配置（WinHTTP / PAC / WPAD）解析代理，解析超时
// 约 30 秒后才 fallthrough 到直连 → 表现为「页面 JS 请求的网络资源全部延迟 30 秒
// 才发出」（version.txt、three.module.js 等），即主界面白屏 30 秒。强制直连后，
// 本地请求立即发出，白屏消失。
app.commandLine.appendSwitch('no-proxy-server');
app.commandLine.appendSwitch('proxy-server', 'direct://');
app.commandLine.appendSwitch('proxy-bypass-list', '*');

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

/** 从命令行参数里挑出场景文件（双击 .json 时 Windows 会把路径塞进来） */
function pickSceneFromArgv(argv) {
  const args = (argv || process.argv).slice(1);
  for (const a of args) {
    if (typeof a !== 'string' || a.startsWith('-')) continue;
    if (!/\.json$/i.test(a)) continue;
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
  try { require('fs').appendFileSync(require('path').join(require('os').tmpdir(), 'cub3d-timing.log'), Date.now() + ' T_ready\n'); } catch (_) {}
  P.ensureDirs();
  try { require('fs').appendFileSync(require('path').join(require('os').tmpdir(), 'cub3d-timing.log'), Date.now() + ' before_handle\n'); } catch (_) {}
  proto.handle();
  try { require('fs').appendFileSync(require('path').join(require('os').tmpdir(), 'cub3d-timing.log'), Date.now() + ' after_handle\n'); } catch (_) {}
  // 主界面通过本地 HTTP 服务器（127.0.0.1）加载，规避 app:// 自定义协议对大
  // index.html（约 5MB）的传输延迟（约 30 秒白屏）。HTTP 走标准网络栈，无此问题。
  W.setLocalPort(localServer.PORT);

  // 第二道防线：兜底拦截 Chromium 拼写检查字典（*.bdic）下载请求。
  // 正常情况下 disable-features=SpellCheck,SpellCheckService 已让 Chromium
  // 不再发起该请求；但不同 Chromium 版本 feature 名可能差异，此处再拦一次，
  // 任何发往外网（gvt1.com / gvt1-cn.com / googleusercontent.com 等）的 .bdic
  // 请求一律取消，确保哪怕 disable-features 失效也不会卡 30 秒。
  const { session } = require('electron');
  session.defaultSession.webRequest.onBeforeRequest({ urls: ['*://*.gvt1.com/*', '*://*.gvt1-cn.com/*', '*://*.googleusercontent.com/*', '*://*.google.com/*'] }, (details, cb) => {
    const u = details.url || '';
    if (/\.bdic(\?|$)/i.test(u)) {
      try { fs.appendFileSync(path.join(require('os').tmpdir(), 'cub3d-blocked-bdic.log'), new Date().toISOString() + ' BLOCK ' + u + '\n'); } catch (_) {}
      return cb({ cancel: true });
    }
    cb({});
  });

  ipc.register();

  // 应用不提供任何菜单栏 / 弹出菜单
  Menu.setApplicationMenu(null);

  const win = W.createMainWindow();

  // 页面就绪后再投递「要打开的文件」，否则渲染层还没挂上监听
  win.webContents.once('did-finish-load', () => {
    const file = pickSceneFromArgv(process.argv);
    if (file) win.webContents.send('file:open-request', file);

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
