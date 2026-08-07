/**
 * 立方三维设计工坊 · JavaScript 插件 SDK
 *
 * 用法：
 *   const { Plugin } = require(process.env.CUBE3D_SDK_DIR + '/cube3d.js');
 *   const app = new Plugin();
 *   app.command('run', async () => {
 *     await app.editor('addShape', { shape: 'cube', pos: [0, 0, 0] });
 *     return '完成';
 *   });
 *   app.run();
 *
 * 注意：不要用 console.log 输出内容，那会污染协议通道；请用 app.log()。
 * SDK 已把 console.log 自动重定向到 stderr，误用也不会导致崩溃。
 */
'use strict';

const readline = require('readline');

class PluginError extends Error {}

class Plugin {
  constructor() {
    this.pluginId = process.env.CUBE3D_PLUGIN_ID || 'unknown';
    this.pluginDir = process.env.CUBE3D_PLUGIN_DIR || process.cwd();
    this.dataDir = process.env.CUBE3D_DATA_DIR || '';
    this.lang = 'zh-CN';
    this.config = {};

    this._commands = new Map();
    this._hooks = { init: null, shutdown: null };
    this._seq = 0;
    this._pending = new Map();
    this._stdout = process.stdout;

    // 防止用户误用 console.log 打断协议
    const toErr = (...a) => process.stderr.write(a.map(x => (typeof x === 'string' ? x : JSON.stringify(x))).join(' ') + '\n');
    console.log = toErr;
    console.info = toErr;
  }

  /* ------------------------------- 注册接口 ------------------------------- */

  command(name, fn) { this._commands.set(name, fn); return this; }
  onInit(fn) { this._hooks.init = fn; return this; }
  onShutdown(fn) { this._hooks.shutdown = fn; return this; }

  /* -------------------------------- 底层 IO ------------------------------- */

  _write(obj) {
    this._stdout.write(JSON.stringify(obj) + '\n');
  }

  _request(method, params) {
    return new Promise((resolve, reject) => {
      const id = ++this._seq;
      this._pending.set(id, { resolve, reject });
      this._write({ id, method, params: params || {} });
    });
  }

  /* ----------------------------- 调用宿主能力 ----------------------------- */

  editor(method, params) {
    return this._request(method.startsWith('editor.') ? method : 'editor.' + method, params);
  }

  host(method, params) {
    return this._request(method.startsWith('host.') ? method : 'host.' + method, params);
  }

  /* -------------------------------- 便捷方法 ------------------------------ */

  log(message, level) { this._write({ method: 'host.log', params: { level: level || 'info', message: String(message) } }); }
  warn(message) { this.log(message, 'warn'); }
  error(message) { this.log(message, 'error'); }
  progress(percent, message) { this._write({ method: 'host.progress', params: { percent, message: message || '' } }); }

  toast(message) { return this.editor('toast', { message: String(message) }); }
  getConfig() { return this.host('getConfig').then(c => (this.config = c || {})); }
  setConfig(config) { this.config = config; return this.host('setConfig', { config }); }
  ask(title, defaultValue) { return this.editor('prompt', { title, defaultValue }); }
  confirm(message, detail) { return this.editor('confirm', { message, detail }); }

  addShape(shape, opts) { return this.editor('addShape', Object.assign({ shape }, opts || {})); }
  addShapes(items) { return this.editor('addShapes', { items }); }
  addText(text, opts) { return this.editor('addText', Object.assign({ text }, opts || {})); }
  listObjects() { return this.editor('listObjects'); }
  clearScene() { return this.editor('clearScene'); }

  /* --------------------------------- 主循环 ------------------------------- */

  async _dispatch(msg) {
    const { method, params = {}, id } = msg;

    if (method === 'plugin.init') {
      this.config = params.config || {};
      this.lang = params.lang || 'zh-CN';
      this.pluginDir = params.pluginDir || this.pluginDir;
      this.dataDir = params.dataDir || this.dataDir;
      if (this._hooks.init) {
        try { await this._hooks.init(params); }
        catch (e) { this.error('初始化失败: ' + e.message); }
      }
      this._write({ method: 'plugin.ready' });
      return;
    }

    if (method === 'plugin.shutdown') {
      if (this._hooks.shutdown) { try { await this._hooks.shutdown(); } catch (_) {} }
      process.exit(0);
    }

    if (method === 'plugin.invoke') {
      const fn = this._commands.get(params.command);
      if (!fn) {
        if (id != null) this._write({ id, error: { message: '未注册的命令: ' + params.command } });
        return;
      }
      try {
        const result = await fn(params.payload || {});
        if (id != null) this._write({ id, result: result === undefined ? null : result });
      } catch (e) {
        this.error(e && e.stack ? e.stack : String(e));
        if (id != null) this._write({ id, error: { message: String(e && e.message || e) } });
      }
    }
  }

  run() {
    const rl = readline.createInterface({ input: process.stdin, terminal: false });
    rl.on('line', line => {
      const text = line.trim();
      if (!text) return;
      let msg;
      try { msg = JSON.parse(text); } catch (_) { return; }

      // 宿主对我们请求的回执
      if (msg.id != null && (msg.result !== undefined || msg.error !== undefined) && this._pending.has(msg.id)) {
        const p = this._pending.get(msg.id);
        this._pending.delete(msg.id);
        if (msg.error) p.reject(new PluginError(msg.error.message || '未知错误'));
        else p.resolve(msg.result);
        return;
      }
      if (msg.method) this._dispatch(msg);
    });
    rl.on('close', () => process.exit(0));
    process.on('uncaughtException', e => { this.error('未捕获异常: ' + (e.stack || e.message)); });
  }
}

module.exports = { Plugin, PluginError };
