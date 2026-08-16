'use strict';
/** IPC 汇总：渲染进程能做的一切「原生操作」都在这里登记。 */
const { ipcMain, app, dialog, shell, BrowserWindow, clipboard, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');
const P = require('./paths');
const store = require('./store');
const W = require('./windows');
const fsSvc = require('./services/fs-service');
const langSvc = require('./services/langpack-service');


function ok(data) { return Object.assign({ ok: true }, data); }
function fail(message) { return { ok: false, message: String(message) }; }

function winOf(evt) {
  return BrowserWindow.fromWebContents(evt.sender) || W.getMain();
}

function register() {
  /* ------------------------------ 应用与窗口 ------------------------------ */

  ipcMain.handle('app:info', () => ok({
    version: app.getVersion(),
    name: app.getName(),
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
    platform: process.platform,
    arch: process.arch,
    portable: P.isPortable,
    dev: P.isDev,
    dataRoot: P.dataRoot,
    exeDir: P.exeDir
  }));

  ipcMain.on('window:minimize', e => { const w = winOf(e); if (w) w.minimize(); });
  ipcMain.on('window:toggle-maximize', e => {
    const w = winOf(e); if (!w) return;
    if (w.isMaximized()) w.unmaximize(); else w.maximize();
  });
  ipcMain.on('window:close', e => { const w = winOf(e); if (w) w.close(); });
  ipcMain.on('window:force-close', e => {
    const w = winOf(e); if (!w) return;
    w.__forceClose = true;
    w.close();
  });
  ipcMain.on('window:toggle-fullscreen', e => {
    const w = winOf(e); if (!w) return;
    w.setFullScreen(!w.isFullScreen());
  });
  ipcMain.handle('window:state', e => {
    const w = winOf(e);
    return w ? ok({ maximized: w.isMaximized(), fullScreen: w.isFullScreen(), focused: w.isFocused() }) : fail('no window');
  });
  ipcMain.on('window:set-title', (e, title) => {
    const w = winOf(e); if (w && typeof title === 'string') w.setTitle(title);
  });
  ipcMain.on('window:set-progress', (e, value) => {
    const w = winOf(e); if (w) w.setProgressBar(typeof value === 'number' ? value : -1);
  });

  /* -------------------------------- 配置项 -------------------------------- */

  ipcMain.handle('config:get', (_e, key, fallback) => ok({ value: store.get(key, fallback) }));
  ipcMain.handle('config:set', (_e, key, value) => { store.set(key, value); return ok(); });
  ipcMain.handle('config:all', () => ok({ config: store.load() }));

  /* -------------------------------- 文件操作 ------------------------------- */

  ipcMain.handle('file:open-scene', async (e, presetPath) => fsSvc.openScene(winOf(e), presetPath));
  ipcMain.handle('file:save-scene', async (e, payload) => fsSvc.saveScene(winOf(e), payload));
  ipcMain.handle('file:save-image', async (e, dataURL, name) => fsSvc.saveImage(winOf(e), dataURL, name));
  ipcMain.handle('file:save-json', async (e, opts) => fsSvc.saveJson(winOf(e), opts));
  ipcMain.handle('file:pick-image', async (e) => fsSvc.pickImage(winOf(e)));
  ipcMain.handle('file:write-image', (_e, dataURL, targetPath) => {
    try { return ok({ path: fsSvc.writeImage(dataURL, targetPath) }); }
    catch (err) { return fail(err.message); }
  });
  ipcMain.handle('file:autosave', (_e, data) => fsSvc.autosave(data));
  ipcMain.handle('file:list-autosaves', () => ok({ list: fsSvc.listAutosaves() }));
  ipcMain.handle('file:last-session', () => ok({ session: fsSvc.readLastSession() }));
  ipcMain.handle('file:clear-last-session', () => { fsSvc.clearLastSession(); return ok(); });
  ipcMain.handle('file:read-dropped', (_e, p) => fsSvc.readDropped(p));
  ipcMain.handle('file:reveal', (_e, p) => { fsSvc.revealPath(p); return ok(); });
  ipcMain.handle('file:open-data-folder', () => ok({ path: fsSvc.openDataFolder() }));
  ipcMain.handle('file:current', () => ok({ path: fsSvc.getCurrentFile() }));
  ipcMain.handle('file:set-current', (_e, p) => ok({ path: fsSvc.setCurrentFile(p) }));

  /* -------------------------------- 语言包 -------------------------------- */

  // preload 在页面脚本执行前同步取包，注入 window.__packs
  ipcMain.on('langpack:sync-packs', e => {
    try { e.returnValue = langSvc.getInjectPacks(); } catch (_) { e.returnValue = {}; }
  });
  ipcMain.handle('langpack:list', () => ok({ list: langSvc.list() }));
  ipcMain.handle('langpack:install', async (e) => {
    const r = await dialog.showOpenDialog(winOf(e), {
      title: '选择语言包（.json 文件或语言包文件夹）',
      properties: ['openFile'],
      filters: [{ name: '语言包', extensions: ['json'] }]
    });
    if (r.canceled || !r.filePaths.length) return { ok: false, canceled: true };
    const res = await langSvc.install(r.filePaths[0]);
    if (res.ok) W.broadcast('langpack:changed', langSvc.list());
    return res;
  });
  ipcMain.handle('langpack:install-dir', async (e) => {
    const r = await dialog.showOpenDialog(winOf(e), { title: '选择语言包文件夹', properties: ['openDirectory'] });
    if (r.canceled || !r.filePaths.length) return { ok: false, canceled: true };
    const res = await langSvc.install(r.filePaths[0]);
    if (res.ok) W.broadcast('langpack:changed', langSvc.list());
    return res;
  });
  ipcMain.handle('langpack:remove', (_e, code) => {
    const res = langSvc.remove(code);
    if (res.ok) W.broadcast('langpack:changed', langSvc.list());
    return res;
  });
  ipcMain.handle('langpack:export-template', (_e, dict, code) => langSvc.exportTemplate(dict, code));
  ipcMain.handle('langpack:manual-url', (_e, code) => ok({ url: langSvc.resolveManual(code) }));
  ipcMain.handle('langpack:open-folder', () => ok({ path: langSvc.openFolder() }));

  /* -------------------------------- 便签窗口 ------------------------------- */

  ipcMain.handle('sticky:create', (_e, note) => { W.createStickyWindow(note); return ok(); });
  ipcMain.handle('sticky:close', (_e, id) => { W.closeStickyWindow(id); return ok(); });
  ipcMain.handle('sticky:list', () => ok({ ids: [...W.stickyWindows.keys()] }));
  // 便签窗与主窗之间的数据同步
  ipcMain.on('sticky:sync', (_e, payload) => W.broadcast('sticky:sync', payload));

  /* --------------------------------- 杂项 --------------------------------- */

  ipcMain.handle('shell:open-external', (_e, url) => {
    if (/^https?:/i.test(url)) { shell.openExternal(url); return ok(); }
    return fail('仅允许 http/https');
  });
  ipcMain.handle('clipboard:write-text', (_e, text) => { clipboard.writeText(String(text ?? '')); return ok(); });
  ipcMain.handle('clipboard:read-text', () => ok({ text: clipboard.readText() }));
  ipcMain.handle('dialog:message', async (e, opts) => {
    const r = await dialog.showMessageBox(winOf(e), Object.assign({ type: 'info', buttons: ['确定'] }, opts || {}));
    return ok({ response: r.response, checkboxChecked: r.checkboxChecked });
  });
  ipcMain.handle('theme:set-native', (_e, mode) => {
    nativeTheme.themeSource = ['dark', 'light', 'system'].includes(mode) ? mode : 'dark';
    return ok();
  });
}

module.exports = { register };
