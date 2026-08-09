'use strict';
/** 文件服务：场景开/存、截图落盘、自动保存、最近文件。 */
const { dialog, shell, app } = require('electron');
const fs = require('fs');
const path = require('path');
const P = require('../paths');
const store = require('../store');

const SCENE_FILTERS = [
  { name: '立方场景文件', extensions: ['json'] },
  { name: '所有文件', extensions: ['*'] }
];

/** 当前打开的文件路径（用于「保存」而非「另存为」） */
let currentFile = null;

function setCurrentFile(p) { currentFile = p || null; return currentFile; }
function getCurrentFile() { return currentFile; }

/**
 * 识别文件内容类型：scene=画布场景，sticky=便签备份，unknown=其他。
 * 与 Web/index.html 中的 classifyImport 保持一致（桌面端主进程无浏览器环境，故在此实现）。
 */
function classifyImport(data) {
  if (data == null || typeof data !== 'object') return 'unknown';
  if (Array.isArray(data)) {
    if (!data.length) return 'unknown';
    const f = data[0];
    const sticky = f && typeof f === 'object' && ('note' in f || 'quote' in f || 'color' in f || 'line' in f || 'text' in f);
    const shape = f && typeof f === 'object' && ('type' in f || 'data' in f || 'scene' in f || 'objects' in f);
    if (sticky && !shape) return 'sticky';
    if (shape) return 'scene';
    return 'unknown';
  }
  if (data.format === 'cube3d-scene' || Array.isArray(data.scene) || Array.isArray(data.objects)) return 'scene';
  if (typeof data.text === 'string' && (typeof data.color === 'string' || 'note' in data)) return 'sticky';
  if ('note' in data || 'quote' in data || 'sticky' in data) return 'sticky';
  return 'unknown';
}

async function openScene(win, presetPath) {
  let target = presetPath;
  if (!target) {
    const r = await dialog.showOpenDialog(win, {
      title: '打开场景',
      defaultPath: P.projects,
      filters: SCENE_FILTERS,
      properties: ['openFile']
    });
    if (r.canceled || !r.filePaths.length) return { ok: false, canceled: true };
    target = r.filePaths[0];
  }
  try {
    const text = fs.readFileSync(target, 'utf8');
    const json = JSON.parse(text);
    const kind = classifyImport(json);
    if (kind !== 'scene') {
      return { ok: false, reason: kind, message: kind === 'sticky'
        ? '该文件是便签数据（便签备份），不能导入到画布。请在便签面板导入便签。'
        : '无法识别的文件内容，仅支持画布场景文件（.json 场景）。' };
    }
    currentFile = target;
    return { ok: true, path: target, name: path.basename(target), data: json };
  } catch (e) {
    return { ok: false, message: '读取失败: ' + e.message };
  }
}

function defaultJsonName(prefix) { var d = new Date(); var p = function (x) { return String(x).padStart(2, '0'); }; return prefix + '_' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '_' + p(d.getHours()) + p(d.getMinutes()) + '.json'; }
async function saveScene(win, payload = {}) {
  const { data, saveAs } = payload;
  let target = saveAs ? null : (payload.path || currentFile);

  if (!target) {
    const r = await dialog.showSaveDialog(win, {
      title: saveAs ? '另存为' : '保存场景',
      defaultPath: path.join(P.projects, payload.suggestName || defaultJsonName('scene')),
      filters: SCENE_FILTERS
    });
    if (r.canceled || !r.filePath) return { ok: false, canceled: true };
    target = r.filePath;
  }

  try {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    fs.writeFileSync(target, text, 'utf8');
    currentFile = target;
    return { ok: true, path: target, name: path.basename(target) };
  } catch (e) {
    return { ok: false, message: '保存失败: ' + e.message };
  }
}

/** 保存截图：接收 dataURL */
async function saveImage(win, dataURL, suggestName) {
  const r = await dialog.showSaveDialog(win, {
    title: '保存截图',
    defaultPath: path.join(app.getPath('pictures') || P.dataRoot, suggestName || ('截图-' + Date.now() + '.png')),
    filters: [{ name: 'PNG 图片', extensions: ['png'] }, { name: 'JPEG 图片', extensions: ['jpg'] }]
  });
  if (r.canceled || !r.filePath) return { ok: false, canceled: true };
  try {
    const base64 = String(dataURL).replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(r.filePath, Buffer.from(base64, 'base64'));
    return { ok: true, path: r.filePath };
  } catch (e) {
    return { ok: false, message: e.message };
  }
}

/** 静默截图落盘（插件用，不弹窗） */
function writeImage(dataURL, targetPath) {
  const file = targetPath || path.join(P.dataRoot, 'shots', 'shot-' + Date.now() + '.png');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const base64 = String(dataURL).replace(/^data:image\/\w+;base64,/, '');
  fs.writeFileSync(file, Buffer.from(base64, 'base64'));
  return file;
}

/* -------------------------------- 自动保存 -------------------------------- */

function autosave(data) {
  try {
    fs.mkdirSync(P.autosave, { recursive: true });
    const file = path.join(P.autosave, 'autosave-' + Date.now() + '.json');
    fs.writeFileSync(file, typeof data === 'string' ? data : JSON.stringify(data), 'utf8');
    // 只保留最近 10 份
    const list = fs.readdirSync(P.autosave).filter(f => f.endsWith('.json')).sort();
    while (list.length > 10) {
      try { fs.unlinkSync(path.join(P.autosave, list.shift())); } catch (_) {}
    }
    // 同时写一份「最后会话」用于崩溃恢复
    fs.writeFileSync(path.join(P.autosave, 'last-session.json'),
      JSON.stringify({ time: Date.now(), file: currentFile, data: typeof data === 'string' ? JSON.parse(data) : data }), 'utf8');
    return { ok: true, path: file };
  } catch (e) {
    return { ok: false, message: e.message };
  }
}

function listAutosaves() {
  try {
    return fs.readdirSync(P.autosave)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const full = path.join(P.autosave, f);
        const st = fs.statSync(full);
        return { name: f, path: full, time: st.mtimeMs, size: st.size };
      })
      .sort((a, b) => b.time - a.time);
  } catch (_) { return []; }
}

function readLastSession() {
  try {
    const f = path.join(P.autosave, 'last-session.json');
    if (!fs.existsSync(f)) return null;
    return JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch (_) { return null; }
}

function clearLastSession() {
  try { fs.unlinkSync(path.join(P.autosave, 'last-session.json')); } catch (_) {}
}

/* -------------------------------- 通用工具 -------------------------------- */

/** 导入图片/贴图，返回 dataURL 供前端直接使用 */
async function pickImage(win) {
  const r = await dialog.showOpenDialog(win, {
    title: '选择图片',
    filters: [{ name: '图片', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'] }],
    properties: ['openFile']
  });
  if (r.canceled || !r.filePaths.length) return { ok: false, canceled: true };
  try {
    const file = r.filePaths[0];
    const ext = path.extname(file).slice(1).toLowerCase();
    const mime = ext === 'jpg' ? 'jpeg' : ext;
    const b64 = fs.readFileSync(file).toString('base64');
    return { ok: true, path: file, name: path.basename(file), dataURL: `data:image/${mime};base64,${b64}` };
  } catch (e) {
    return { ok: false, message: e.message };
  }
}

/** 拖入文件时读取内容 */
function readDropped(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  try {
    if (['.l3d', '.json'].includes(ext)) {
      const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      // 复用 classifyImport 与“打开”菜单一致，避免把便签备份/未知文件误当场景导入
      const kind = classifyImport(json);
      if (kind !== 'scene') {
        return { ok: false, reason: kind, message: kind === 'sticky'
          ? '该文件是便签数据（便签备份），不能导入到画布。请在便签面板导入便签。'
          : '无法识别的文件内容，仅支持画布场景文件（.json 场景）。' };
      }
      return { ok: true, kind: 'scene', path: filePath, data: json };
    }
    if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp'].includes(ext)) {
      const mime = ext === '.jpg' ? 'jpeg' : ext.slice(1);
      return { ok: true, kind: 'image', path: filePath, dataURL: `data:image/${mime};base64,` + fs.readFileSync(filePath).toString('base64') };
    }
    return { ok: false, message: '不支持的文件类型: ' + ext };
  } catch (e) {
    return { ok: false, message: e.message };
  }
}

function revealPath(p) { if (p && fs.existsSync(p)) shell.showItemInFolder(p); }
function openDataFolder() { shell.openPath(P.dataRoot); return P.dataRoot; }

module.exports = {
  openScene, saveScene, saveImage, writeImage, autosave, listAutosaves,
  readLastSession, clearLastSession, pickImage, readDropped,
  revealPath, openDataFolder, setCurrentFile, getCurrentFile, SCENE_FILTERS
};
