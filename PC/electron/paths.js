'use strict';
/**
 * 目录解析：区分「安装版」与「便携版」，并统一提供各类可写目录。
 *
 * 便携版判定顺序：
 *   1. electron-builder portable target 注入的 PORTABLE_EXECUTABLE_DIR 环境变量
 *   2. exe 同级存在 portable.flag 文件（手工绿色化时使用）
 * 便携版所有用户数据写在 exe 同级的 data/ 目录，可随 U 盘迁移。
 * 安装版写在 %APPDATA%/立方三维设计工坊/ 下。
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

/** 打包后与 asar 并列的 resources 目录，用于存放内置插件 / 语言包 / 运行时 */
const resourcesRoot = app.isPackaged ? process.resourcesPath : appRoot;

/**
 * 插件 SDK 目录。
 * 打包后 electron/ 位于 app.asar 内，而插件是外部进程（Python 等），
 * 无法读取 asar 归档，因此 SDK 通过 asarUnpack 解包，这里做路径重定向。
 */
function resolveSdkDir() {
  const raw = path.join(__dirname, 'plugin-sdk');
  return raw.includes('app.asar' + path.sep)
    ? raw.replace('app.asar' + path.sep, 'app.asar.unpacked' + path.sep)
    : raw;
}

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
  /** 用户插件目录 */
  plugins: path.join(dataRoot, 'plugins'),
  /** 内置示例插件目录（只读） */
  builtinPlugins: path.join(resourcesRoot, 'plugins'),
  /** 用户语言包目录 */
  langpacks: path.join(dataRoot, 'langpacks'),
  /** 内置语言包目录（只读） */
  builtinLangpacks: path.join(resourcesRoot, 'langpacks'),
  /** 语言运行时安装目录 */
  runtimes: path.join(dataRoot, 'runtimes'),
  /** 插件依赖库安装目录 */
  libs: path.join(dataRoot, 'libs'),
  /** 离线安装包投放目录（wheel / tgz 等） */
  offline: path.join(dataRoot, 'offline'),
  /** 场景工程默认目录 */
  projects: path.join(dataRoot, 'projects'),
  /** 自动保存 */
  autosave: path.join(dataRoot, 'autosave'),
  /** 日志 */
  logs: path.join(dataRoot, 'logs'),
  /** 配置文件 */
  configFile: path.join(dataRoot, 'config.json'),
  /** 插件 SDK（已处理 asar 解包路径） */
  sdkDir: resolveSdkDir(),
  exeDir: exeDir()
};

/** 确保所有可写目录存在 */
function ensureDirs() {
  const list = [
    paths.dataRoot, paths.plugins, paths.langpacks, paths.runtimes,
    paths.libs, paths.offline, paths.projects, paths.autosave, paths.logs
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
