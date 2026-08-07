'use strict';
/**
 * 界面语言包服务
 *
 * 网页版的语言包是写死在 <head> 里的三个 <script src="language/*.js">，
 * 它们把内容挂到 window.__packs 上，index.html 再据此构建 I18N / LANGS。
 * 桌面版沿用同一约定，但改为「可安装扩展」：
 *   - 用户语言包放在  <数据目录>/langpacks/<code>/langpack.json
 *   - 也支持单文件    <数据目录>/langpacks/<code>.json
 *   - 页面启动时由 preload 同步取出，注入 window.__packs，index.html 无需改动逻辑
 *
 * 语言包结构：
 * {
 *   "code": "ko",
 *   "label": "한국어",
 *   "version": "1.0.0",
 *   "author": "someone",
 *   "manual": "manual.md",        // 可选，配套说明书
 *   "dict": { "new": "새로 만들기", ... }
 * }
 */
const fs = require('fs');
const path = require('path');
const { dialog } = require('electron');
const P = require('../paths');

/** 内置在 language/ 目录下、由 index.html 直接 <script> 引入的语言 */
const BUILTIN_CODES = ['zh-CN', 'zh-TW', 'en', 'ja'];

function readPackFile(file) {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(raw);
    if (!json || typeof json !== 'object') return null;
    const dict = json.dict || json.strings;
    if (!dict || typeof dict !== 'object') return null;
    const code = json.code || path.basename(file, '.json');
    return {
      code,
      label: json.label || json.name || code,
      version: json.version || '1.0.0',
      author: json.author || '',
      description: json.description || '',
      manual: json.manual || null,
      dict,
      keys: Object.keys(dict).length,
      file
    };
  } catch (e) {
    console.error('[langpack] 解析失败', file, e.message);
    return null;
  }
}

/** 扫描所有用户安装的语言包 */
function scan() {
  const out = [];
  const roots = [P.builtinLangpacks, P.langpacks];
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    for (const name of fs.readdirSync(root)) {
      const full = path.join(root, name);
      let st; try { st = fs.statSync(full); } catch (_) { continue; }
      if (st.isDirectory()) {
        const f = path.join(full, 'langpack.json');
        if (fs.existsSync(f)) {
          const p = readPackFile(f);
          if (p) { p.dir = full; p.builtin = (root === P.builtinLangpacks); out.push(p); }
        }
      } else if (name.toLowerCase().endsWith('.json')) {
        const p = readPackFile(full);
        if (p) { p.dir = root; p.builtin = (root === P.builtinLangpacks); out.push(p); }
      }
    }
  }
  // 同 code 时用户包覆盖内置包
  const map = new Map();
  for (const p of out) map.set(p.code, p);
  return [...map.values()];
}

/** 供 preload 同步注入页面的精简结构 { code: { label, dict } } */
function getInjectPacks() {
  const packs = {};
  for (const p of scan()) {
    if (BUILTIN_CODES.includes(p.code) && p.builtin) continue;  // 内置四语已由 <script> 提供
    packs[p.code] = { label: p.label, dict: p.dict };
  }
  return packs;
}

/** 列出语言包（含内置四语的展示项），供设置面板使用 */
function list() {
  const installed = scan().map(p => ({
    code: p.code, label: p.label, version: p.version, author: p.author,
    description: p.description, keys: p.keys, builtin: !!p.builtin,
    hasManual: !!p.manual, dir: p.dir, removable: !p.builtin
  }));
  const builtins = [
    { code: 'zh-CN', label: '简体中文' },
    { code: 'zh-TW', label: '繁體中文' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' }
  ].filter(b => !installed.some(i => i.code === b.code))
   .map(b => ({ ...b, version: '内置', author: '', description: '随应用分发', keys: 0, builtin: true, hasManual: true, removable: false }));
  return [...builtins, ...installed];
}

/** 说明书文件解析：语言包自带 > docs 目录内置 */
function resolveManual(code) {
  const pack = scan().find(p => p.code === code);
  if (pack && pack.manual && pack.dir) {
    const f = path.join(pack.dir, pack.manual);
    if (fs.existsSync(f)) {
      const rel = path.relative(P.dataRoot, f).split(path.sep).map(encodeURIComponent).join('/');
      return 'app://userdata/' + rel;
    }
  }
  const builtinMap = {
    'zh-CN': 'docs/使用说明书.md',
    'en': 'docs/使用说明书_en.md',
    'ja': 'docs/使用説明書_ja.md',
    'zh-TW': 'docs/使用說明書_zh-TW.md'
  };
  const rel = builtinMap[code] || builtinMap['zh-CN'];
  return 'app://local/' + rel.split('/').map(encodeURIComponent).join('/');
}

/** 安装语言包：从 .json 文件或包含 langpack.json 的目录 */
async function install(srcPath) {
  try {
    let pack, srcDir = null;
    let st = fs.statSync(srcPath);
    if (st.isDirectory()) {
      const f = path.join(srcPath, 'langpack.json');
      if (!fs.existsSync(f)) return { ok: false, message: '所选目录缺少 langpack.json' };
      pack = readPackFile(f);
      srcDir = srcPath;
    } else {
      pack = readPackFile(srcPath);
    }
    if (!pack) return { ok: false, message: '语言包格式无效（需含 code 与 dict 字段）' };

    const dest = path.join(P.langpacks, pack.code);
    fs.mkdirSync(dest, { recursive: true });
    if (srcDir) {
      fs.cpSync(srcDir, dest, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, path.join(dest, 'langpack.json'));
    }
    return { ok: true, code: pack.code, label: pack.label };
  } catch (e) {
    return { ok: false, message: e.message };
  }
}

function remove(code) {
  const pack = scan().find(p => p.code === code && !p.builtin);
  if (!pack) return { ok: false, message: '该语言包不可卸载' };
  try {
    const target = pack.dir && path.basename(pack.dir) === code ? pack.dir : pack.file;
    fs.rmSync(target, { recursive: true, force: true });
    return { ok: true };
  } catch (e) {
    return { ok: false, message: e.message };
  }
}

/**
 * 导出语言包模板：把当前界面用到的全部 key 与简中原文导出，
 * 交给译者填空即可产出新语言包。dict 由渲染进程传入（那边才有完整的 ZH_CN）。
 */
async function exportTemplate(dict, suggestCode) {
  const r = await dialog.showSaveDialog({
    title: '导出语言包模板',
    defaultPath: path.join(P.dataRoot, (suggestCode || 'my-lang') + '.json'),
    filters: [{ name: '语言包', extensions: ['json'] }]
  });
  if (r.canceled || !r.filePath) return { ok: false, canceled: true };
  const tpl = {
    code: suggestCode || 'my-lang',
    label: '我的语言 / My Language',
    version: '1.0.0',
    author: '',
    description: '把 dict 中每个值翻译为目标语言即可；未翻译的键会自动回退到简体中文。',
    manual: 'manual.md',
    dict: dict || {}
  };
  try {
    fs.writeFileSync(r.filePath, JSON.stringify(tpl, null, 2), 'utf8');
    return { ok: true, path: r.filePath };
  } catch (e) {
    return { ok: false, message: e.message };
  }
}

function openFolder() {
  fs.mkdirSync(P.langpacks, { recursive: true });
  require('electron').shell.openPath(P.langpacks);
  return P.langpacks;
}

module.exports = { scan, list, getInjectPacks, install, remove, exportTemplate, resolveManual, openFolder, BUILTIN_CODES };
