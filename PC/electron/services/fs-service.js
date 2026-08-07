'use strict';
/** 文件服务：场景开/存、截图落盘、自动保存、最近文件。 */
const { dialog, shell, app } = require('electron');
const fs = require('fs');
const path = require('path');
const P = require('../paths');
const store = require('../store');

const SCENE_FILTERS = [
  { name: '立方场景文件', extensions: ['l3d', 'json'] },
  { name: '所有文件', extensions: ['*'] }
];

/** 当前打开的文件路径（用于「保存」而非「另存为」） */
let currentFile = null;

function setCurrentFile(p) { currentFile = p || null; return currentFile; }
function getCurrentFile() { return currentFile; }

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
    currentFile = target;
    store.pushRecent(target);
    return { ok: true, path: target, name: path.basename(target), data: json };
  } catch (e) {
    return { ok: false, message: '读取失败: ' + e.message };
  }
}

async function saveScene(win, payload = {}) {
  const { data, saveAs } = payload;
  let target = saveAs ? null : (payload.path || currentFile);

  if (!target) {
    const r = await dialog.showSaveDialog(win, {
      title: saveAs ? '另存为' : '保存场景',
      defaultPath: path.join(P.projects, payload.suggestName || ('场景-' + new Date().toISOString().slice(0, 10) + '.l3d')),
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
    store.pushRecent(target);
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
    const file = path.join(P.autosave, 'autosave-' + Date.now() + '.l3d');
    fs.writeFileSync(file, typeof data === 'string' ? data : JSON.stringify(data), 'utf8');
    // 只保留最近 10 份
    const list = fs.readdirSync(P.autosave).filter(f => f.endsWith('.l3d')).sort();
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
      .filter(f => f.endsWith('.l3d'))
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
      return { ok: true, kind: 'scene', path: filePath, data: JSON.parse(fs.readFileSync(filePath, 'utf8')) };
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

function getRecent() { return store.get('recentFiles', []).filter(f => { try { return fs.existsSync(f.path); } catch (_) { return false; } }); }
function revealPath(p) { if (p && fs.existsSync(p)) shell.showItemInFolder(p); }
function openDataFolder() { shell.openPath(P.dataRoot); return P.dataRoot; }

module.exports = {
  openScene, saveScene, saveImage, writeImage, autosave, listAutosaves,
  readLastSession, clearLastSession, pickImage, readDropped,
  getRecent, revealPath, openDataFolder, setCurrentFile, getCurrentFile, SCENE_FILTERS
};
