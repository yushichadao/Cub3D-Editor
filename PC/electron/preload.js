'use strict';
/**
 * 预加载脚本：渲染层与原生能力之间唯一的桥。
 * 页面始终运行在 contextIsolation + 无 nodeIntegration 环境下，
 * 只能通过这里白名单式地调用主进程。
 */
const { contextBridge, ipcRenderer, webUtils } = require('electron');
const os = require('os');

const invoke = (ch, ...args) => ipcRenderer.invoke(ch, ...args);

/** 事件订阅封装，返回取消函数 */
function on(channel, handler) {
  const wrapped = (_evt, payload) => handler(payload);
  ipcRenderer.on(channel, wrapped);
  return () => ipcRenderer.removeListener(channel, wrapped);
}

const api = {
  isDesktop: true,

  app: {
    info: () => invoke('app:info'),
    onBeforeClose: cb => on('app:before-close', () => {
      ipcRenderer.send('app:before-close-ack');
      cb();
    })
  },

  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    toggleMaximize: () => ipcRenderer.send('window:toggle-maximize'),
    close: () => ipcRenderer.send('window:close'),
    forceClose: () => ipcRenderer.send('window:force-close'),
    toggleFullScreen: () => ipcRenderer.send('window:toggle-fullscreen'),
    setTitle: t => ipcRenderer.send('window:set-title', t),
    setProgress: v => ipcRenderer.send('window:set-progress', v),
    state: () => invoke('window:state'),
    onState: cb => on('window:state', cb)
  },

  config: {
    get: (key, fallback) => invoke('config:get', key, fallback),
    set: (key, value) => invoke('config:set', key, value),
    all: () => invoke('config:all')
  },

  file: {
    openScene: p => invoke('file:open-scene', p),
    saveScene: payload => invoke('file:save-scene', payload),
    saveImage: (dataURL, name) => invoke('file:save-image', dataURL, name),
    pickImage: () => invoke('file:pick-image'),
    /** 静默写入图片（插件截图用，不弹对话框） */
    writeImage: (dataURL, targetPath) => invoke('file:write-image', dataURL, targetPath),
    autosave: data => invoke('file:autosave', data),
    listAutosaves: () => invoke('file:list-autosaves'),
    lastSession: () => invoke('file:last-session'),
    clearLastSession: () => invoke('file:clear-last-session'),
    readDropped: p => invoke('file:read-dropped', p),
    reveal: p => invoke('file:reveal', p),
    openDataFolder: () => invoke('file:open-data-folder'),
    current: () => invoke('file:current'),
    setCurrent: p => invoke('file:set-current', p),
    /** 拖放文件时取真实磁盘路径（Electron 32+ 不再暴露 File.path） */
    pathOf: file => { try { return webUtils.getPathForFile(file); } catch (_) { return null; } },
    onOpenRequest: cb => on('file:open-request', cb)
  },

  langpack: {
    list: () => invoke('langpack:list'),
    install: () => invoke('langpack:install'),
    installDir: () => invoke('langpack:install-dir'),
    remove: code => invoke('langpack:remove', code),
    exportTemplate: (dict, code) => invoke('langpack:export-template', dict, code),
    manualUrl: code => invoke('langpack:manual-url', code),
    openFolder: () => invoke('langpack:open-folder'),
    onChanged: cb => on('langpack:changed', cb)
  },

  runtime: {
    list: force => invoke('runtime:list', force),
    detect: (id, force) => invoke('runtime:detect', id, force),
    setBin: (id, p) => invoke('runtime:set-bin', id, p),
    installPackages: (id, pkgs, offline) => invoke('runtime:install-packages', id, pkgs, offline),
    importPortable: id => invoke('runtime:import-portable', id),
    openLibFolder: id => invoke('runtime:open-lib-folder', id),
    openOfflineFolder: id => invoke('runtime:open-offline-folder', id),
    onLog: cb => on('runtime:log', cb)
  },

  plugin: {
    list: () => invoke('plugin:list'),
    start: id => invoke('plugin:start', id),
    stop: id => invoke('plugin:stop', id),
    invoke: (id, command, payload) => invoke('plugin:invoke', id, command, payload),
    enable: (id, on_) => invoke('plugin:enable', id, on_),
    autostart: (id, on_) => invoke('plugin:autostart', id, on_),
    logs: id => invoke('plugin:logs', id),
    remove: id => invoke('plugin:remove', id),
    installDir: () => invoke('plugin:install-dir'),
    openFolder: id => invoke('plugin:open-folder', id),
    openConsole: () => invoke('plugin:open-console'),
    sdkPath: () => invoke('plugin:sdk-path'),
    onLog: cb => on('plugin:log', cb),
    onStatus: cb => on('plugin:status', cb),
    onProgress: cb => on('plugin:progress', cb),
    onChanged: cb => on('plugin:changed', cb),
    onCommands: cb => on('plugin:commands', cb),
    /** 主进程转发过来的 editor.* 调用；渲染层执行后回执 */
    onEditorInvoke: cb => on('editor:invoke', cb),
    replyEditor: payload => ipcRenderer.send('editor:result', payload)
  },

  sticky: {
    create: note => invoke('sticky:create', note),
    close: id => invoke('sticky:close', id),
    list: () => invoke('sticky:list'),
    sync: payload => ipcRenderer.send('sticky:sync', payload),
    onSync: cb => on('sticky:sync', cb)
  },

  shell: {
    openExternal: url => invoke('shell:open-external', url)
  },

  clipboard: {
    writeText: t => invoke('clipboard:write-text', t),
    readText: () => invoke('clipboard:read-text')
  },

  dialog: {
    message: opts => invoke('dialog:message', opts)
  },

  theme: {
    setNative: mode => invoke('theme:set-native', mode)
  }
};

contextBridge.exposeInMainWorld('desktop', api);

/**
 * 语言包同步注入：必须在页面任何脚本执行前拿到，
 * 这样 index.html 里的 `Object.keys(__packs)` 才能看到用户安装的新语言。
 */
try {
  const packs = ipcRenderer.sendSync('langpack:sync-packs') || {};
  contextBridge.exposeInMainWorld('__cube3dExtraPacks', packs);
} catch (_) {
  contextBridge.exposeInMainWorld('__cube3dExtraPacks', {});
}

/**
 * 设备名注入：让页面在导出场景时能把作者记为电脑名。
 * 必须在页面脚本读取前暴露，exportScene 会读取 window.__DEVICE_NAME__。
 */
try {
  contextBridge.exposeInMainWorld('__DEVICE_NAME__', os.hostname());
} catch (_) {
  contextBridge.exposeInMainWorld('__DEVICE_NAME__', 'PC');
}
