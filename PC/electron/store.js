'use strict';
/** 轻量 JSON 配置存储：窗口状态、偏好、插件开关。无第三方依赖。 */
const fs = require('fs');
const path = require('path');
const P = require('./paths');

const DEFAULTS = {
  window: { width: 1440, height: 900, x: null, y: null, maximized: false },
  ui: { theme: 'neon', lang: 'zh-CN', frameless: true, mica: true, zoom: 1 },
  editor: { autosaveEnabled: true, autosaveInterval: 120, restoreLastSession: true },
  plugins: { enabled: {}, autoStart: {} },
  runtimes: { custom: {} },
  offlineMode: false
};

let cache = null;
let timer = null;

function deepMerge(base, patch) {
  const out = Array.isArray(base) ? base.slice() : { ...base };
  for (const k of Object.keys(patch || {})) {
    const v = patch[k];
    if (v && typeof v === 'object' && !Array.isArray(v) && base && typeof base[k] === 'object' && !Array.isArray(base[k])) {
      out[k] = deepMerge(base[k], v);
    } else if (v !== undefined) {
      out[k] = v;
    }
  }
  return out;
}

function load() {
  if (cache) return cache;
  try {
    const raw = fs.readFileSync(P.configFile, 'utf8');
    cache = deepMerge(DEFAULTS, JSON.parse(raw));
  } catch (_) {
    cache = JSON.parse(JSON.stringify(DEFAULTS));
  }
  return cache;
}

function flush() {
  if (!cache) return;
  try {
    fs.mkdirSync(path.dirname(P.configFile), { recursive: true });
    fs.writeFileSync(P.configFile, JSON.stringify(cache, null, 2), 'utf8');
  } catch (e) {
    console.error('[store] 写入配置失败:', e.message);
  }
}

/** 延迟落盘，避免频繁写入（如拖动窗口时） */
function scheduleFlush() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => { timer = null; flush(); }, 400);
}

function get(keyPath, fallback) {
  const cfg = load();
  if (!keyPath) return cfg;
  const parts = keyPath.split('.');
  let cur = cfg;
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return fallback;
    cur = cur[p];
  }
  return cur === undefined ? fallback : cur;
}

function set(keyPath, value) {
  const cfg = load();
  const parts = keyPath.split('.');
  let cur = cfg;
  for (let i = 0; i < parts.length - 1; i++) {
    if (typeof cur[parts[i]] !== 'object' || cur[parts[i]] === null) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
  scheduleFlush();
  return value;
}

function merge(patch) {
  cache = deepMerge(load(), patch);
  scheduleFlush();
  return cache;
}

module.exports = { get, set, merge, load, flush, DEFAULTS };
