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
const rtSvc = require('./services/runtime-manager');
const pluginHost = require('./services/plugin-host');

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

  /* ------------------------------- 运行时管理 ------------------------------ */

  ipcMain.handle('runtime:list', (_e, force) => ok({ list: rtSvc.detectAll(!!force), languages: rtSvc.listLanguages() }));
  ipcMain.handle('runtime:detect', (_e, id, force) => ok({ runtime: rtSvc.detect(id, !!force) }));
  ipcMain.handle('runtime:set-bin', async (e, id, binPath) => {
    let target = binPath;
    if (!target) {
      const r = await dialog.showOpenDialog(winOf(e), {
        title: '选择解释器可执行文件',
        properties: ['openFile'],
        filters: process.platform === 'win32' ? [{ name: '可执行文件', extensions: ['exe', 'cmd', 'bat'] }] : []
      });
      if (r.canceled || !r.filePaths.length) return { ok: false, canceled: true };
      target = r.filePaths[0];
    }
    return ok({ runtime: rtSvc.setCustomBin(id, target) });
  });
  ipcMain.handle('runtime:install-packages', async (e, id, packages, offline) => {
    const sender = e.sender;
    const onLog = line => { if (!sender.isDestroyed()) sender.send('runtime:log', { id, line }); };
    return rtSvc.installPackages(id, packages, { offline, onLog });
  });
  ipcMain.handle('runtime:import-portable', async (e, id) => {
    const r = await dialog.showOpenDialog(winOf(e), {
      title: '选择便携运行时压缩包（.zip）',
      properties: ['openFile'],
      filters: [{ name: '压缩包', extensions: ['zip'] }]
    });
    if (r.canceled || !r.filePaths.length) return { ok: false, canceled: true };
    const sender = e.sender;
    return rtSvc.importPortableRuntime(id, r.filePaths[0], line => {
      if (!sender.isDestroyed()) sender.send('runtime:log', { id, line });
    });
  });
  ipcMain.handle('runtime:open-lib-folder', (_e, id) => { shell.openPath(rtSvc.libDir(id)); return ok(); });
  ipcMain.handle('runtime:open-offline-folder', (_e, id) => {
    const dir = path.join(P.offline, id || '');
    fs.mkdirSync(dir, { recursive: true });
    shell.openPath(dir);
    return ok({ path: dir });
  });

  /* --------------------------------- 插件 --------------------------------- */

  ipcMain.handle('plugin:list', () => ok({ list: pluginHost.scan() }));
  ipcMain.handle('plugin:start', (_e, id) => pluginHost.start(id));
  ipcMain.handle('plugin:stop', (_e, id) => pluginHost.stop(id));
  ipcMain.handle('plugin:invoke', (_e, id, command, payload) => pluginHost.invoke(id, command, payload));
  ipcMain.handle('plugin:enable', (_e, id, on) => ok({ list: pluginHost.setEnabled(id, on) }));
  ipcMain.handle('plugin:autostart', (_e, id, on) => ok({ list: pluginHost.setAutoStart(id, on) }));
  ipcMain.handle('plugin:logs', (_e, id) => ok({ logs: pluginHost.getLogs(id) }));
  ipcMain.handle('plugin:remove', (_e, id) => pluginHost.removePlugin(id));
  ipcMain.handle('plugin:install-dir', async (e) => {
    const r = await dialog.showOpenDialog(winOf(e), { title: '选择插件文件夹（需含 plugin.json）', properties: ['openDirectory'] });
    if (r.canceled || !r.filePaths.length) return { ok: false, canceled: true };
    const res = pluginHost.installFromDir(r.filePaths[0]);
    if (res.ok) W.broadcast('plugin:changed', pluginHost.listPlugins());
    return res;
  });
  ipcMain.handle('plugin:open-folder', (_e, id) => {
    if (id) {
      const p = pluginHost.listPlugins().find(x => x.id === id);
      if (p) { shell.openPath(p.dir); return ok(); }
    }
    fs.mkdirSync(P.plugins, { recursive: true });
    shell.openPath(P.plugins);
    return ok();
  });
  ipcMain.handle('plugin:open-console', () => { W.createConsoleWindow(); return ok(); });
  ipcMain.handle('plugin:sdk-path', () => { shell.openPath(P.sdkDir); return ok({ path: P.sdkDir }); });

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
