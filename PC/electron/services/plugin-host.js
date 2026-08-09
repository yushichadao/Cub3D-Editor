'use strict';
/**
 * 插件宿主
 *
 * 每个插件跑在独立子进程中，与宿主之间用 stdio 上的 NDJSON（每行一条 JSON）通信。
 * 这样任何语言只要能读写标准输入输出，就能写插件 —— 无需为每种语言写绑定。
 *
 * 报文格式：
 *   插件 -> 宿主   {"id":1,"method":"editor.addShape","params":{...}}   需要回执
 *                 {"method":"host.log","params":{"level":"info","message":"..."}}  通知
 *   宿主 -> 插件   {"id":1,"result":{...}} | {"id":1,"error":{"message":"..."}}
 *                 {"method":"plugin.invoke","params":{"command":"spiral","payload":{}}}
 *
 * editor.* 一律转发到渲染进程执行（场景在那边），host.* 由主进程直接处理。
 */
const { spawn } = require('child_process');
const { ipcMain, dialog, shell } = require('electron');
const fs = require('fs');
const path = require('path');
const P = require('../paths');
const store = require('../store');
const rt = require('./runtime-manager');

const API_VERSION = 1;
const MAX_LOG = 500;

/** @type {Map<string, PluginRecord>} */
const plugins = new Map();
/** 等待渲染进程回执的请求 */
const pendingEditorCalls = new Map();
let editorSeq = 0;
let emitEvent = () => {};   // 由 init() 注入，向所有窗口广播插件事件

/** 允许插件调用的 editor 方法白名单（防止插件乱调内部函数） */
const EDITOR_METHODS = new Set([
  'editor.getInfo', 'editor.listShapes', 'editor.addShape', 'editor.addText',
  'editor.listObjects', 'editor.getObject', 'editor.updateObject', 'editor.removeObject',
  'editor.clearScene', 'editor.getScene', 'editor.setScene',
  'editor.select', 'editor.getSelection', 'editor.deselectAll',
  'editor.undo', 'editor.redo', 'editor.pushHistory',
  'editor.screenshot', 'editor.toast', 'editor.setCamera', 'editor.getCamera',
  'editor.prompt', 'editor.confirm', 'editor.setPanel'
]);

class PluginRecord {
  constructor(manifest, dir, builtin) {
    this.manifest = manifest;
    this.id = manifest.id;
    this.dir = dir;
    this.builtin = !!builtin;
    this.child = null;
    this.buffer = '';
    this.logs = [];
    this.status = 'stopped';   // stopped | starting | running | error
    this.error = null;
    this.rpcSeq = 0;
    this.pending = new Map();
  }

  log(level, message) {
    const entry = { time: Date.now(), level, message: String(message) };
    this.logs.push(entry);
    if (this.logs.length > MAX_LOG) this.logs.shift();
    emitEvent('plugin:log', { pluginId: this.id, entry });
  }

  setStatus(status, error) {
    this.status = status;
    this.error = error || null;
    emitEvent('plugin:status', { pluginId: this.id, status, error: this.error });
  }

  get running() { return this.status === 'running' || this.status === 'starting'; }
}

/* ---------------------------------- 扫描 ---------------------------------- */

function readManifest(dir) {
  const file = path.join(dir, 'plugin.json');
  if (!fs.existsSync(file)) return null;
  try {
    const m = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!m.id || !m.entry || !m.language) return null;
    m.name = m.name || m.id;
    m.version = m.version || '0.0.0';
    m.commands = Array.isArray(m.commands) ? m.commands : [];
    m.permissions = Array.isArray(m.permissions) ? m.permissions : [];
    return m;
  } catch (e) {
    console.error('[plugin] 清单解析失败', dir, e.message);
    return null;
  }
}

function scanDir(root, builtin) {
  const found = [];
  if (!fs.existsSync(root)) return found;
  for (const name of fs.readdirSync(root)) {
    const dir = path.join(root, name);
    let st; try { st = fs.statSync(dir); } catch (_) { continue; }
    if (!st.isDirectory()) continue;
    const m = readManifest(dir);
    if (m) found.push({ manifest: m, dir, builtin });
  }
  return found;
}

/** 重新扫描插件目录，保留已在运行的实例 */
function scan() {
  const list = [...scanDir(P.builtinPlugins, true), ...scanDir(P.plugins, false)];
  const seen = new Set();
  for (const { manifest, dir, builtin } of list) {
    seen.add(manifest.id);
    const exist = plugins.get(manifest.id);
    if (exist && exist.running) { exist.manifest = manifest; continue; }
    plugins.set(manifest.id, new PluginRecord(manifest, dir, builtin));
  }
  for (const id of [...plugins.keys()]) {
    if (!seen.has(id) && !plugins.get(id).running) plugins.delete(id);
  }
  return listPlugins();
}

function listPlugins() {
  return [...plugins.values()].map(p => ({
    id: p.id,
    name: p.manifest.name,
    description: p.manifest.description || '',
    version: p.manifest.version,
    author: p.manifest.author || '',
    language: p.manifest.language,
    commands: p.manifest.commands,
    permissions: p.manifest.permissions,
    requires: p.manifest.runtime || null,
    dir: p.dir,
    builtin: p.builtin,
    status: p.status,
    error: p.error,
    enabled: store.get('plugins.enabled.' + p.id, true) !== false,
    autoStart: store.get('plugins.autoStart.' + p.id, false) === true,
    runtimeReady: rt.detect(p.manifest.language).available
  }));
}

/* --------------------------------- 进程管理 -------------------------------- */

function start(pluginId) {
  const rec = plugins.get(pluginId);
  if (!rec) return Promise.resolve({ ok: false, message: '插件不存在: ' + pluginId });
  if (rec.running) return Promise.resolve({ ok: true, already: true });
  if (store.get('plugins.enabled.' + pluginId, true) === false) {
    return Promise.resolve({ ok: false, message: '插件已被禁用' });
  }

  const entry = path.join(rec.dir, rec.manifest.entry);
  if (!fs.existsSync(entry)) {
    rec.setStatus('error', '入口文件不存在: ' + rec.manifest.entry);
    return Promise.resolve({ ok: false, message: rec.error });
  }

  let cmdInfo;
  try {
    cmdInfo = rt.buildRunCommand(rec.manifest.language, entry, rec.manifest.args || []);
  } catch (e) {
    rec.setStatus('error', e.message);
    return Promise.resolve({ ok: false, message: e.message });
  }

  rec.setStatus('starting');
  rec.log('info', `启动 ${rec.manifest.name} (${rec.manifest.language})`);

  const env = {
    ...cmdInfo.env,
    CUBE3D_PLUGIN_ID: rec.id,
    CUBE3D_PLUGIN_DIR: rec.dir,
    CUBE3D_DATA_DIR: P.dataRoot,
    CUBE3D_API_VERSION: String(API_VERSION),
    CUBE3D_SDK_DIR: P.sdkDir
  };

  let child;
  try {
    child = spawn(cmdInfo.cmd, cmdInfo.args, {
      cwd: rec.dir,
      env,
      stdio: ['pipe', 'pipe', 'pipe'],
      windowsHide: true
    });
  } catch (e) {
    rec.setStatus('error', e.message);
    return Promise.resolve({ ok: false, message: e.message });
  }

  rec.child = child;
  rec.buffer = '';

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', chunk => {
    rec.buffer += chunk;
    let idx;
    while ((idx = rec.buffer.indexOf('\n')) >= 0) {
      const line = rec.buffer.slice(0, idx).trim();
      rec.buffer = rec.buffer.slice(idx + 1);
      if (line) handleMessage(rec, line);
    }
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', text => {
    text.split('\n').filter(Boolean).forEach(l => rec.log('error', l));
  });

  child.on('error', e => {
    rec.setStatus('error', e.message);
    rec.log('error', '进程错误: ' + e.message);
  });

  child.on('close', code => {
    rec.child = null;
    for (const [, p] of rec.pending) p.reject(new Error('插件进程已退出'));
    rec.pending.clear();
    if (rec.status !== 'error') rec.setStatus('stopped');
    rec.log('info', `进程结束，退出码 ${code}`);
  });

  // 握手
  send(rec, {
    method: 'plugin.init',
    params: {
      apiVersion: API_VERSION,
      pluginId: rec.id,
      pluginDir: rec.dir,
      dataDir: P.dataRoot,
      libDir: rt.libDir(rec.manifest.language),
      config: store.get('plugins.config.' + rec.id, {}) || {},
      lang: store.get('ui.lang', 'zh-CN')
    }
  });

  return new Promise(resolve => {
    const timer = setTimeout(() => {
      if (rec.status === 'starting') {
        rec.setStatus('running');   // 插件没回 ready 也放行，避免卡死
        rec.log('warn', '插件未发送 ready 握手，已按运行中处理');
      }
      resolve({ ok: true });
    }, 4000);
    rec.__readyResolve = () => { clearTimeout(timer); resolve({ ok: true }); };
  });
}

function stop(pluginId) {
  const rec = plugins.get(pluginId);
  if (!rec || !rec.child) return { ok: true };
  try {
    send(rec, { method: 'plugin.shutdown' });
    setTimeout(() => { if (rec.child) { try { rec.child.kill(); } catch (_) {} } }, 600);
  } catch (_) {
    try { rec.child.kill(); } catch (_) {}
  }
  return { ok: true };
}

function stopAll() {
  for (const id of plugins.keys()) stop(id);
}

function send(rec, msg) {
  if (!rec.child || !rec.child.stdin.writable) return false;
  try {
    rec.child.stdin.write(JSON.stringify(msg) + '\n');
    return true;
  } catch (e) {
    rec.log('error', '写入插件失败: ' + e.message);
    return false;
  }
}

/** 触发插件命令 */
function invoke(pluginId, command, payload) {
  const rec = plugins.get(pluginId);
  if (!rec) return Promise.resolve({ ok: false, message: '插件不存在' });

  const run = () => new Promise((resolve, reject) => {
    const id = ++rec.rpcSeq;
    const timeout = setTimeout(() => {
      rec.pending.delete(id);
      reject(new Error('插件响应超时（60 秒）'));
    }, 60000);
    rec.pending.set(id, {
      resolve: v => { clearTimeout(timeout); resolve(v); },
      reject: e => { clearTimeout(timeout); reject(e); }
    });
    send(rec, { id, method: 'plugin.invoke', params: { command, payload: payload || {} } });
  });

  if (!rec.running) {
    return start(pluginId).then(r => {
      if (!r.ok) return { ok: false, message: r.message };
      return run().then(result => ({ ok: true, result }), e => ({ ok: false, message: e.message }));
    });
  }
  return run().then(result => ({ ok: true, result }), e => ({ ok: false, message: e.message }));
}

/* --------------------------------- 消息处理 -------------------------------- */

async function handleMessage(rec, line) {
  let msg;
  try { msg = JSON.parse(line); } catch (_) {
    rec.log('info', line);        // 插件里的裸 print 当日志看待
    return;
  }

  // 插件对宿主请求的回执
  if (msg.id != null && (msg.result !== undefined || msg.error !== undefined) && rec.pending.has(msg.id)) {
    const p = rec.pending.get(msg.id);
    rec.pending.delete(msg.id);
    if (msg.error) p.reject(new Error(msg.error.message || String(msg.error)));
    else p.resolve(msg.result);
    return;
  }

  if (!msg.method) return;

  // 握手完成
  if (msg.method === 'plugin.ready') {
    rec.setStatus('running');
    rec.log('info', '插件就绪');
    if (rec.__readyResolve) { rec.__readyResolve(); rec.__readyResolve = null; }
    return;
  }

  const reply = (result, error) => {
    if (msg.id == null) return;
    send(rec, error ? { id: msg.id, error: { message: String(error.message || error) } } : { id: msg.id, result });
  };

  try {
    if (msg.method.startsWith('host.')) {
      reply(await handleHostCall(rec, msg.method, msg.params || {}));
    } else if (msg.method.startsWith('editor.')) {
      if (!EDITOR_METHODS.has(msg.method)) throw new Error('未开放的接口: ' + msg.method);
      reply(await callEditor(msg.method, msg.params || {}, rec.id));
    } else {
      throw new Error('未知方法: ' + msg.method);
    }
  } catch (e) {
    reply(null, e);
  }
}

async function handleHostCall(rec, method, params) {
  switch (method) {
    case 'host.log':
      rec.log(params.level || 'info', params.message);
      return true;

    case 'host.getConfig':
      return store.get('plugins.config.' + rec.id, {}) || {};

    case 'host.setConfig':
      store.set('plugins.config.' + rec.id, params.config || {});
      return true;

    case 'host.readFile': {
      const target = path.resolve(params.path || '');
      const allowed = [rec.dir, P.dataRoot].some(root => target === path.resolve(root) || target.startsWith(path.resolve(root) + path.sep));
      if (!allowed && !rec.manifest.permissions.includes('fs:read')) throw new Error('无权读取该路径');
      return fs.readFileSync(target, params.encoding || 'utf8');
    }

    case 'host.writeFile': {
      const target = path.resolve(params.path || '');
      const allowed = [rec.dir, P.dataRoot].some(root => target.startsWith(path.resolve(root) + path.sep));
      if (!allowed && !rec.manifest.permissions.includes('fs:write')) throw new Error('无权写入该路径');
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, params.data ?? '', params.encoding || 'utf8');
      return true;
    }

    case 'host.pickFile': {
      const r = await dialog.showOpenDialog({
        title: params.title || '选择文件',
        properties: params.directory ? ['openDirectory'] : ['openFile'],
        filters: params.filters || []
      });
      return r.canceled ? null : r.filePaths[0];
    }

    case 'host.openExternal':
      if (/^https?:/i.test(params.url || '')) { shell.openExternal(params.url); return true; }
      throw new Error('仅允许 http/https 链接');

    case 'host.progress':
      emitEvent('plugin:progress', { pluginId: rec.id, percent: params.percent, message: params.message });
      return true;

    case 'host.registerCommands':
      rec.manifest.commands = Array.isArray(params.commands) ? params.commands : rec.manifest.commands;
      emitEvent('plugin:commands', { pluginId: rec.id, commands: rec.manifest.commands });
      return true;

    default:
      throw new Error('未知宿主方法: ' + method);
  }
}

/** 把 editor.* 调用转发到渲染进程 */
function callEditor(method, params, pluginId) {
  const win = require('../windows').getMain();
  if (!win || win.isDestroyed()) return Promise.reject(new Error('主窗口未就绪'));
  return new Promise((resolve, reject) => {
    const rid = ++editorSeq;
    const timer = setTimeout(() => {
      pendingEditorCalls.delete(rid);
      reject(new Error('编辑器响应超时: ' + method));
    }, 30000);
    pendingEditorCalls.set(rid, {
      resolve: v => { clearTimeout(timer); resolve(v); },
      reject: e => { clearTimeout(timer); reject(e); }
    });
    win.webContents.send('editor:invoke', { rid, method, params, pluginId });
  });
}

/** 渲染进程回执入口，在 init() 中注册 */
function handleEditorResult(_evt, payload) {
  const p = pendingEditorCalls.get(payload && payload.rid);
  if (!p) return;
  pendingEditorCalls.delete(payload.rid);
  if (payload.error) p.reject(new Error(payload.error));
  else p.resolve(payload.result);
}

/* ---------------------------------- 其它 ---------------------------------- */

function setEnabled(pluginId, enabled) {
  store.set('plugins.enabled.' + pluginId, !!enabled);
  if (!enabled) stop(pluginId);
  return listPlugins();
}

function setAutoStart(pluginId, auto) {
  store.set('plugins.autoStart.' + pluginId, !!auto);
  return listPlugins();
}

function startAutoPlugins() {
  for (const rec of plugins.values()) {
    if (store.get('plugins.autoStart.' + rec.id, false) === true &&
        store.get('plugins.enabled.' + rec.id, true) !== false) {
      start(rec.id);
    }
  }
}

function getLogs(pluginId) {
  const rec = plugins.get(pluginId);
  return rec ? rec.logs : [];
}

function removePlugin(pluginId) {
  const rec = plugins.get(pluginId);
  if (!rec) return { ok: false, message: '插件不存在' };
  if (rec.builtin) return { ok: false, message: '内置插件不可删除' };
  stop(pluginId);
  try {
    fs.rmSync(rec.dir, { recursive: true, force: true });
    plugins.delete(pluginId);
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.message };
  }
}

/** 从文件夹安装插件（复制到用户插件目录） */
function installFromDir(srcDir) {
  const m = readManifest(srcDir);
  if (!m) return { ok: false, message: '所选目录缺少有效的 plugin.json' };
  const dest = path.join(P.plugins, m.id);
  try {
    fs.cpSync(srcDir, dest, { recursive: true });
    scan();
    return { ok: true, pluginId: m.id };
  } catch (e) {
    return { ok: false, message: e.message };
  }
}

function init(emitter) {
  emitEvent = emitter || (() => {});
  ipcMain.on('editor:result', handleEditorResult);
  scan();
}

module.exports = {
  init, scan, listPlugins, start, stop, stopAll, invoke, setEnabled, setAutoStart,
  startAutoPlugins, getLogs, removePlugin, installFromDir, API_VERSION, EDITOR_METHODS
};
