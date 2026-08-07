'use strict';
/**
 * 语言运行时管理器
 *
 * 职责：
 *   1. 探测本机可用的编程语言运行时（便携目录 > 用户自定义 > PATH > 常见安装路径）
 *   2. 为插件宿主生成正确的启动命令
 *   3. 安装第三方库，支持完全离线（从本地包目录取件）
 *   4. 导入便携运行时压缩包，实现「装到 U 盘也能跑 Python 插件」
 */
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const P = require('../paths');
const store = require('../store');

const IS_WIN = process.platform === 'win32';
const exe = (n) => (IS_WIN ? n + '.exe' : n);

/**
 * 语言注册表。
 * portableBin: 便携运行时解压到 runtimes/<id>/ 后，可执行文件的候选相对路径
 * pathBin:     PATH 中的候选命令名
 * common:      常见安装位置（绝对路径，支持 %ENV% 占位）
 * pkg:         包管理配置，offlineArgs 用于断网安装
 */
const REGISTRY = {
  javascript: {
    id: 'javascript', name: 'JavaScript (Node)', exts: ['.js', '.cjs', '.mjs'],
    builtin: true, // 内置：直接复用 Electron 自带的 Node
    portableBin: ['node.exe', 'bin/node'],
    pathBin: ['node'],
    common: ['%ProgramFiles%\\nodejs\\node.exe', '%LOCALAPPDATA%\\Programs\\nodejs\\node.exe'],
    versionArgs: ['-v'],
    runArgs: (script, args) => [script, ...args],
    pkg: {
      manager: 'npm', bin: IS_WIN ? 'npm.cmd' : 'npm',
      install: (pkgs, dir) => ['install', '--prefix', dir, '--no-audit', '--no-fund', ...pkgs],
      offline: (pkgs, dir) => ['install', '--prefix', dir, '--offline', '--no-audit', '--no-fund', ...pkgs],
      libDirName: 'node'
    }
  },
  python: {
    id: 'python', name: 'Python', exts: ['.py'],
    portableBin: ['python.exe', 'bin/python3', 'bin/python'],
    pathBin: IS_WIN ? ['python', 'py', 'python3'] : ['python3', 'python'],
    common: [
      '%LOCALAPPDATA%\\Programs\\Python\\Python313\\python.exe',
      '%LOCALAPPDATA%\\Programs\\Python\\Python312\\python.exe',
      '%LOCALAPPDATA%\\Programs\\Python\\Python311\\python.exe',
      '%LOCALAPPDATA%\\Programs\\Python\\Python310\\python.exe',
      'C:\\Python313\\python.exe', 'C:\\Python312\\python.exe', 'C:\\Python311\\python.exe'
    ],
    versionArgs: ['--version'],
    runArgs: (script, args) => ['-u', script, ...args],
    pkg: {
      manager: 'pip', useRuntimeBin: true,
      install: (pkgs, dir) => ['-m', 'pip', 'install', '--target', dir, ...pkgs],
      offline: (pkgs, dir) => ['-m', 'pip', 'install', '--target', dir, '--no-index', '--find-links', path.join(P.offline, 'python'), ...pkgs],
      libDirName: 'python'
    },
    envForLibs: (dir) => ({ PYTHONPATH: dir })
  },
  lua: {
    id: 'lua', name: 'Lua', exts: ['.lua'],
    portableBin: ['lua.exe', 'bin/lua'], pathBin: ['lua', 'lua5.4', 'luajit'],
    common: ['C:\\Program Files\\Lua\\lua.exe'],
    versionArgs: ['-v'],
    runArgs: (script, args) => [script, ...args],
    pkg: { manager: 'luarocks', bin: IS_WIN ? 'luarocks.bat' : 'luarocks', install: (pkgs, dir) => ['install', '--tree', dir, ...pkgs], libDirName: 'lua' },
    envForLibs: (dir) => ({ LUA_PATH: path.join(dir, 'share', 'lua', '5.4', '?.lua') + ';;' })
  },
  ruby: {
    id: 'ruby', name: 'Ruby', exts: ['.rb'],
    portableBin: ['bin/ruby.exe', 'bin/ruby'], pathBin: ['ruby'],
    common: ['C:\\Ruby33-x64\\bin\\ruby.exe', 'C:\\Ruby32-x64\\bin\\ruby.exe'],
    versionArgs: ['-v'], runArgs: (script, args) => [script, ...args],
    pkg: { manager: 'gem', bin: IS_WIN ? 'gem.cmd' : 'gem', install: (pkgs, dir) => ['install', '--install-dir', dir, ...pkgs], libDirName: 'ruby' },
    envForLibs: (dir) => ({ GEM_PATH: dir, GEM_HOME: dir })
  },
  php: {
    id: 'php', name: 'PHP', exts: ['.php'],
    portableBin: ['php.exe', 'bin/php'], pathBin: ['php'],
    common: ['C:\\php\\php.exe', '%ProgramFiles%\\php\\php.exe'],
    versionArgs: ['-v'], runArgs: (script, args) => [script, ...args],
    pkg: { manager: 'composer', bin: IS_WIN ? 'composer.bat' : 'composer', install: (pkgs, dir) => ['require', '--working-dir', dir, ...pkgs], libDirName: 'php' }
  },
  perl: {
    id: 'perl', name: 'Perl', exts: ['.pl'],
    portableBin: ['bin/perl.exe', 'bin/perl'], pathBin: ['perl'],
    common: ['C:\\Strawberry\\perl\\bin\\perl.exe'],
    versionArgs: ['-v'], runArgs: (script, args) => [script, ...args],
    pkg: { manager: 'cpanm', bin: IS_WIN ? 'cpanm.bat' : 'cpanm', install: (pkgs, dir) => ['-l', dir, ...pkgs], libDirName: 'perl' }
  },
  powershell: {
    id: 'powershell', name: 'PowerShell', exts: ['.ps1'],
    portableBin: ['pwsh.exe'], pathBin: IS_WIN ? ['pwsh', 'powershell'] : ['pwsh'],
    common: ['%ProgramFiles%\\PowerShell\\7\\pwsh.exe', 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe'],
    versionArgs: ['-NoProfile', '-Command', '$PSVersionTable.PSVersion.ToString()'],
    runArgs: (script, args) => ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', script, ...args],
    pkg: { manager: 'psget', bin: IS_WIN ? 'pwsh' : 'pwsh', install: (pkgs, dir) => ['-NoProfile', '-Command', `Save-Module -Name ${pkgs.join(',')} -Path '${dir}'`], libDirName: 'powershell' }
  },
  deno: {
    id: 'deno', name: 'Deno (JS/TS)', exts: ['.ts', '.js'],
    portableBin: ['deno.exe', 'bin/deno'], pathBin: ['deno'],
    common: ['%USERPROFILE%\\.deno\\bin\\deno.exe'],
    versionArgs: ['-V'],
    runArgs: (script, args) => ['run', '--allow-read', '--allow-write', '--allow-env', script, ...args],
    pkg: null
  },
  bun: {
    id: 'bun', name: 'Bun (JS/TS)', exts: ['.ts', '.js'],
    portableBin: ['bun.exe'], pathBin: ['bun'],
    common: ['%USERPROFILE%\\.bun\\bin\\bun.exe'],
    versionArgs: ['-v'],
    runArgs: (script, args) => ['run', script, ...args],
    pkg: { manager: 'bun', bin: IS_WIN ? 'bun.exe' : 'bun', install: (pkgs, dir) => ['add', '--cwd', dir, ...pkgs], libDirName: 'bun' }
  },
  java: {
    id: 'java', name: 'Java', exts: ['.java', '.jar'],
    portableBin: ['bin/java.exe', 'bin/java'], pathBin: ['java'],
    common: ['%JAVA_HOME%\\bin\\java.exe', '%ProgramFiles%\\Java\\jdk-21\\bin\\java.exe', '%ProgramFiles%\\Eclipse Adoptium\\jdk-21\\bin\\java.exe'],
    versionArgs: ['-version'],
    // 单文件源码模式（JDK 11+）直接跑 .java；.jar 用 -jar
    runArgs: (script, args) => (script.endsWith('.jar') ? ['-jar', script, ...args] : [script, ...args]),
    pkg: null
  },
  dotnet: {
    id: 'dotnet', name: 'C# / .NET', exts: ['.csx', '.dll'],
    portableBin: ['dotnet.exe'], pathBin: ['dotnet'],
    common: ['%ProgramFiles%\\dotnet\\dotnet.exe'],
    versionArgs: ['--version'],
    runArgs: (script, args) => [script, ...args],
    pkg: null
  },
  go: {
    id: 'go', name: 'Go', exts: ['.go'],
    portableBin: ['bin/go.exe', 'bin/go'], pathBin: ['go'],
    common: ['%ProgramFiles%\\Go\\bin\\go.exe', 'C:\\Go\\bin\\go.exe'],
    versionArgs: ['version'],
    runArgs: (script, args) => ['run', script, ...args],
    pkg: { manager: 'go', bin: 'go', install: (pkgs, dir) => ['install', ...pkgs], libDirName: 'go' }
  },
  r: {
    id: 'r', name: 'R', exts: ['.R', '.r'],
    portableBin: ['bin/Rscript.exe'], pathBin: ['Rscript'],
    common: ['%ProgramFiles%\\R\\R-4.4.1\\bin\\Rscript.exe', '%ProgramFiles%\\R\\R-4.3.2\\bin\\Rscript.exe'],
    versionArgs: ['--version'],
    runArgs: (script, args) => [script, ...args],
    pkg: { manager: 'R', bin: 'Rscript', install: (pkgs, dir) => ['-e', `install.packages(c(${pkgs.map(p => `'${p}'`).join(',')}), lib='${dir.replace(/\\/g, '/')}', repos='https://cloud.r-project.org')`], libDirName: 'r' }
  }
};

function expandEnv(p) {
  return p.replace(/%([^%]+)%/g, (m, k) => process.env[k] || m);
}

function tryVersion(bin, args) {
  try {
    const r = spawnSync(bin, args, { encoding: 'utf8', timeout: 6000, windowsHide: true });
    if (r.error) return null;
    const out = ((r.stdout || '') + (r.stderr || '')).trim();
    if (r.status !== 0 && !out) return null;
    return out.split(/\r?\n/)[0].slice(0, 120);
  } catch (_) { return null; }
}

const cache = new Map();

/** 探测单个语言，返回 { available, bin, version, source } */
function detect(langId, force) {
  const def = REGISTRY[langId];
  if (!def) return { available: false, error: 'unknown language: ' + langId };
  if (!force && cache.has(langId)) return cache.get(langId);

  let result = { id: langId, name: def.name, available: false, bin: null, version: null, source: null };

  // 0) JavaScript 内置：用 Electron 自身作为 Node 解释器（ELECTRON_RUN_AS_NODE）
  if (def.builtin && langId === 'javascript') {
    result = { id: langId, name: def.name, available: true, bin: process.execPath, version: 'Node ' + process.versions.node + ' (内置)', source: 'builtin' };
    cache.set(langId, result);
    return result;
  }

  // 1) 用户在设置里手工指定
  const custom = store.get('runtimes.custom.' + langId, null);
  if (custom && fs.existsSync(custom)) {
    const v = tryVersion(custom, def.versionArgs);
    if (v) { result = { id: langId, name: def.name, available: true, bin: custom, version: v, source: 'custom' }; cache.set(langId, result); return result; }
  }

  // 2) 便携运行时目录
  for (const rel of def.portableBin || []) {
    const p = path.join(P.runtimes, langId, rel);
    if (fs.existsSync(p)) {
      const v = tryVersion(p, def.versionArgs);
      if (v) { result = { id: langId, name: def.name, available: true, bin: p, version: v, source: 'portable' }; cache.set(langId, result); return result; }
    }
  }

  // 3) PATH
  for (const name of def.pathBin || []) {
    const v = tryVersion(IS_WIN ? name : name, def.versionArgs);
    if (v) { result = { id: langId, name: def.name, available: true, bin: name, version: v, source: 'path' }; cache.set(langId, result); return result; }
  }

  // 4) 常见安装位置
  for (const raw of def.common || []) {
    const p = expandEnv(raw);
    if (p.includes('%')) continue;
    if (fs.existsSync(p)) {
      const v = tryVersion(p, def.versionArgs);
      if (v) { result = { id: langId, name: def.name, available: true, bin: p, version: v, source: 'system' }; cache.set(langId, result); return result; }
    }
  }

  cache.set(langId, result);
  return result;
}

function detectAll(force) {
  return Object.keys(REGISTRY).map(id => detect(id, force));
}

function clearCache() { cache.clear(); }

/** 库安装目录 */
function libDir(langId) {
  const def = REGISTRY[langId];
  const name = (def && def.pkg && def.pkg.libDirName) || langId;
  const dir = path.join(P.libs, name);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/** 生成插件启动命令 { cmd, args, env } */
function buildRunCommand(langId, scriptPath, args) {
  const def = REGISTRY[langId];
  if (!def) throw new Error('不支持的语言: ' + langId);
  const rt = detect(langId);
  if (!rt.available) throw new Error(`未找到 ${def.name} 运行时，请在「运行时管理」中安装或指定路径`);

  const env = { ...process.env };
  if (def.envForLibs) Object.assign(env, def.envForLibs(libDir(langId)));
  if (langId === 'javascript') {
    env.ELECTRON_RUN_AS_NODE = '1';              // 把 Electron 当作纯 Node 用
    env.NODE_PATH = path.join(libDir('javascript'), 'node_modules');
  }
  if (langId === 'python') {
    const extra = libDir('python');
    env.PYTHONPATH = extra + (process.env.PYTHONPATH ? path.delimiter + process.env.PYTHONPATH : '');
    env.PYTHONIOENCODING = 'utf-8';
    env.PYTHONUTF8 = '1';
  }
  return { cmd: rt.bin, args: def.runArgs(scriptPath, args || []), env };
}

/**
 * 安装第三方库。
 * @param {string} langId
 * @param {string[]} packages
 * @param {{offline?:boolean, onLog?:(line:string)=>void}} opts
 */
function installPackages(langId, packages, opts = {}) {
  return new Promise((resolve) => {
    const def = REGISTRY[langId];
    const log = opts.onLog || (() => {});
    if (!def || !def.pkg) return resolve({ ok: false, message: `${def ? def.name : langId} 暂不支持自动装库，请手动放置依赖` });
    if (!packages || !packages.length) return resolve({ ok: false, message: '未指定要安装的库' });

    const dir = libDir(langId);
    const offline = !!opts.offline || store.get('offlineMode', false);

    let cmd, args;
    if (def.pkg.useRuntimeBin) {
      const rt = detect(langId);
      if (!rt.available) return resolve({ ok: false, message: `未找到 ${def.name} 运行时` });
      cmd = rt.bin;
    } else {
      cmd = def.pkg.bin;
    }
    args = (offline && def.pkg.offline ? def.pkg.offline : def.pkg.install)(packages, dir);

    log(`$ ${cmd} ${args.join(' ')}`);
    if (offline) log(`[离线模式] 从本地包目录取件: ${path.join(P.offline, langId)}`);

    let child;
    try {
      child = spawn(cmd, args, { env: { ...process.env, PYTHONIOENCODING: 'utf-8' }, windowsHide: true, shell: IS_WIN && !def.pkg.useRuntimeBin });
    } catch (e) {
      return resolve({ ok: false, message: '启动包管理器失败: ' + e.message });
    }

    const decode = (b) => b.toString('utf8').replace(/\r/g, '');
    child.stdout.on('data', b => decode(b).split('\n').filter(Boolean).forEach(log));
    child.stderr.on('data', b => decode(b).split('\n').filter(Boolean).forEach(log));
    child.on('error', e => resolve({ ok: false, message: e.message }));
    child.on('close', code => {
      log(code === 0 ? '✔ 安装完成' : `✘ 安装失败，退出码 ${code}`);
      resolve({ ok: code === 0, code, dir });
    });
  });
}

/** 导入便携运行时压缩包（.zip），解压到 runtimes/<langId> */
function importPortableRuntime(langId, archivePath, onLog) {
  return new Promise((resolve) => {
    const log = onLog || (() => {});
    if (!REGISTRY[langId]) return resolve({ ok: false, message: '未知语言: ' + langId });
    if (!fs.existsSync(archivePath)) return resolve({ ok: false, message: '压缩包不存在' });
    const dest = path.join(P.runtimes, langId);
    fs.mkdirSync(dest, { recursive: true });
    log(`解压 ${archivePath} -> ${dest}`);

    // 使用系统自带 PowerShell 解压，免第三方依赖
    const ps = IS_WIN ? 'powershell' : 'pwsh';
    const args = ['-NoProfile', '-Command', `Expand-Archive -LiteralPath '${archivePath.replace(/'/g, "''")}' -DestinationPath '${dest.replace(/'/g, "''")}' -Force`];
    const child = spawn(ps, args, { windowsHide: true });
    child.stderr.on('data', b => log(b.toString('utf8')));
    child.on('error', e => resolve({ ok: false, message: e.message }));
    child.on('close', code => {
      clearCache();
      const rt = detect(langId, true);
      log(code === 0 ? '✔ 解压完成' : `✘ 解压失败 (${code})`);
      resolve({ ok: code === 0 && rt.available, runtime: rt });
    });
  });
}

function setCustomBin(langId, binPath) {
  store.set('runtimes.custom.' + langId, binPath || undefined);
  clearCache();
  return detect(langId, true);
}

function listLanguages() {
  return Object.values(REGISTRY).map(d => ({ id: d.id, name: d.name, exts: d.exts, hasPkgManager: !!d.pkg }));
}

module.exports = {
  REGISTRY, detect, detectAll, clearCache, buildRunCommand,
  installPackages, importPortableRuntime, setCustomBin, listLanguages, libDir
};
