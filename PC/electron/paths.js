'use strict';
/**
 * 目录解析：区分「安装版」与「便携版」，并统一提供各类可写目录。
 *
 * 便携版判定顺序：
 *   1. electron-builder portable target 注入的 PORTABLE_EXECUTABLE_DIR 环境变量
 *   2. exe 同级存在 portable.flag 文件（手工绿色化时使用）
 * 便携版所有用户数据写在 exe 同级的 data/ 目录，可随 U 盘迁移。
 * 安装版统一写在 %APPDATA%/Cub3DEditor/ 下（见下方 ASCII 说明，
 * 不再使用旧的中文目录 立方·3D设计工坊/）。
 */
const { app } = require('electron');
const fs = require('fs');
const path = require('path');

const isDev = !app.isPackaged || process.argv.includes('--dev');

function exeDir() {
  if (process.env.PORTABLE_EXECUTABLE_DIR) return process.env.PORTABLE_EXECUTABLE_DIR;
  return path.dirname(app.getPath('exe'));
}

function detectPortable() {
  if (process.env.PORTABLE_EXECUTABLE_DIR) return true;
  try {
    if (fs.existsSync(path.join(exeDir(), 'portable.flag'))) return true;
  } catch (_) {}
  return false;
}

const isPortable = detectPortable();

/** 应用自身的只读资源根目录（打包后为 resources/app 或 asar 内） */
const appRoot = path.join(__dirname, '..');

/** 打包后与 asar 并列的 resources 目录 */
const resourcesRoot = app.isPackaged ? process.resourcesPath : appRoot;

/**
 * 统一使用 ASCII 的应用名与 userData 路径。
 *
 * 背景：productName 为中文「立方·3D设计工坊」，Electron 默认把 app.name 与
 * userData 设为该中文名/%APPDATA%/立方·3D设计工坊。含非 ASCII 字符的路径会使
 * Chromium 无法正确创建磁盘缓存（stderr 报 `Unable to create cache` /
 * `Gpu Cache Creation failed`），导致所有 app:// 子资源请求（language/*.js、
 * three 引擎等）以 net::ERR_UNEXPECTED 失败、请求根本到不了 protocol handler，
 * 加载进度卡在 15%。
 * 因此这里在最早阶段把 app.name 与 userData 统一固定为 ASCII（Cub3DEditor）。
 */
const ASCII_APP_NAME = 'Cub3DEditor';
const ASCII_USERDATA_NAME = 'Cub3DEditor';
try { app.setName(ASCII_APP_NAME); } catch (_) {}
const asciiUserData = path.join(app.getPath('appData'), ASCII_USERDATA_NAME);
/** 旧版（中文目录）用户数据路径，仅用于一次性迁移 */
const legacyUserData = path.join(app.getPath('appData'), '立方·3D设计工坊');

try {
  app.setPath('userData', asciiUserData);
} catch (_) {}

/** 首次迁移：把旧中文目录下的业务数据复制到 ASCII 路径（Chromium 缓存无需迁移） */
function migrateLegacyData() {
  try {
    if (path.resolve(legacyUserData) === path.resolve(asciiUserData)) return;
    if (!fs.existsSync(legacyUserData)) return;
    // 新目录已有 config.json 说明已迁移过，避免重复覆盖
    if (fs.existsSync(path.join(asciiUserData, 'config.json'))) return;
    fs.mkdirSync(asciiUserData, { recursive: true });
    for (const d of ['projects', 'autosave', 'langpacks', 'logs']) {
      const src = path.join(legacyUserData, d);
      if (fs.existsSync(src)) {
        try { fs.cpSync(src, path.join(asciiUserData, d), { recursive: true, force: true }); } catch (_) {}
      }
    }
    for (const f of ['config.json']) {
      const src = path.join(legacyUserData, f);
      if (fs.existsSync(src)) {
        try { fs.copyFileSync(src, path.join(asciiUserData, f)); } catch (_) {}
      }
    }
  } catch (_) {}
}
migrateLegacyData();

/** 用户数据根目录（可写） */
function resolveDataRoot() {
  if (isDev) return path.join(appRoot, '.userdata');
  if (isPortable) return path.join(exeDir(), 'data');
  return app.getPath('userData');
}

const dataRoot = resolveDataRoot();

const paths = {
  isDev,
  isPortable,
  appRoot,
  resourcesRoot,
  dataRoot,
  /** 前端页面根（index.html 所在目录） */
  webRoot: appRoot,
  /** 用户语言包目录 */
  langpacks: path.join(dataRoot, 'langpacks'),
  /** 内置语言包目录（只读） */
  builtinLangpacks: path.join(resourcesRoot, 'langpacks'),
  /** 场景工程默认目录 */
  projects: path.join(dataRoot, 'projects'),
  /** 自动保存 */
  autosave: path.join(dataRoot, 'autosave'),
  /** 日志 */
  logs: path.join(dataRoot, 'logs'),
  /** 配置文件 */
  configFile: path.join(dataRoot, 'config.json'),
  exeDir: exeDir()
};

/** 确保所有可写目录存在 */
function ensureDirs() {
  const list = [
    paths.dataRoot, paths.langpacks, paths.projects, paths.autosave, paths.logs
  ];
  for (const d of list) {
    try { fs.mkdirSync(d, { recursive: true }); } catch (_) {}
  }
}

/** 判断路径是否位于某个允许的根目录内，防止插件越权访问 */
function isInside(target, root) {
  const rel = path.relative(path.resolve(root), path.resolve(target));
  return !!rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

module.exports = { ...paths, ensureDirs, isInside };
