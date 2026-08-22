/**
 * shared/scripts/updater.mjs
 * 统一更新客户端模块（改进 B）+ 防阻塞（运行期规则）+ 加载页≥1.5s 收口。
 *
 * 三端仅做平台适配（注入 platformAdapter），消除 PC/Android ~700 行 UPD 分叉：
 *  - PC：用 desktop.updater.* 下载安装
 *  - Android：用 Capacitor 跳转/下载
 *  - Web：无自身安装包，仅展示说明更新
 *
 * 设计约束（已确认）：
 *  - 预览态（IS_PACKAGED=false）：版本号显示 X.X.X，检查更新短路（不触发真实流程）。
 *  - localhost/IDE 试图执行更新：由调用方复用工程 modal 警告，本模块不弹 UI。
 *  - 全程异步、带超时、失败非阻塞降级；缺网/超时直接降级本地数据，仅 warn 级日志。
 *  - 各端只检测本端最新版本（latestOf，端间可不同步）。
 */

import { UPDATE_SOURCES, DOC_FETCH_ORDER, PLATFORM, latestOf, cmpVer, detectRegion, pickSourceKey } from '../infra/update-sources.mjs';

const TIMEOUT_MS = 8000;
const MIN_LOADING_MS = 1500; // 加载页最短展示

/**
 * @typedef {object} PlatformAdapter
 * @property {string} platform      'web'|'pc'|'android'
 * @property {boolean} isPackaged   是否打包发布态（预览态=false）
 * @property {string} currentVersion 当前版本（预览态可传占位）
 * @property {(url:string,timeout:number)=>Promise<object|null>} fetchDoc 平台相关拉取（带超时）
 * @property {(regionDetector)=>Promise<string>} detectRegion 平台相关 IP 检测
 * @property {(version:string, asset:object)=>Promise<void>} applyUpdate 执行更新（PC 下载/Android 跳转）
 * @property {(title:string,body:string)=>void} [warnModal] 环境警告弹窗（复用工程 UI）
 */

/**
 * 解析 doc 得到本端可更新项（与 PC/Android 现有 resolveDoc 语义对齐）。
 * @returns {null | {latest:string, asset:object, notes:object}}
 */
export function resolveDoc(doc, currentVersion, platform) {
  const latest = latestOf(doc, platform);
  if (!latest) return null;
  if (cmpVer(latest, currentVersion) <= 0) return null; // 已是最新
  const ver = doc.versions.find((v) => v.version === latest);
  const assets = (ver && ver.assets && ver.assets[platform]) || [];
  const asset = assets[0] || null;
  if (!asset) return null;
  return { latest, asset, notes: (ver && ver.notes) || {} };
}

async function fetchWithTimeout(url, timeout) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const r = await fetch(url, { signal: ctrl.signal });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

/**
 * 检查更新（统一入口）。
 * @param {PlatformAdapter} adapter
 * @returns {Promise<{status:'preview'|'uptodate'|'update'|'offline'|'warn-env', update?:object}>}
 */
export async function checkUpdate(adapter) {
  const startedAt = Date.now();

  // 预览态：短路，不触发真实流程
  if (!adapter.isPackaged) {
    return { status: 'preview' };
  }

  // IP 检测分流（失败/缺网 → 本地优先，不阻塞）
  let region = 'unknown';
  try {
    region = await detectRegion(adapter.detectRegion);
  } catch {
    region = 'unknown';
  }
  const sourceKey = pickSourceKey(region);

  // 候选源依次尝试，失败降级
  let doc = null;
  for (const key of DOC_FETCH_ORDER) {
    const src = UPDATE_SOURCES[key];
    if (!src) continue;
    if (key === 'cnDomain' && !src.enabled) continue;
    const url = src.base.replace(/\/$/, '') + src.docPath;
    doc = await fetchWithTimeout(url, TIMEOUT_MS);
    if (doc) break;
  }
  // GitHub 代理兜底
  if (!doc) {
    const gp = UPDATE_SOURCES.githubProxy;
    const url = gp.base.replace(/^\//, '') ;
    doc = await fetchWithTimeout(
      (gp.base.startsWith('http') ? gp.base : (UPDATE_SOURCES.cn.base + gp.base)),
      TIMEOUT_MS
    );
  }

  // 保证加载页至少展示 MIN_LOADING_MS
  const elapsed = Date.now() - startedAt;
  if (elapsed < MIN_LOADING_MS) {
    await new Promise((r) => setTimeout(r, MIN_LOADING_MS - elapsed));
  }

  if (!doc) {
    return { status: 'offline' }; // 仅 warn 级日志在调用方
  }

  const upd = resolveDoc(doc, adapter.currentVersion, adapter.platform);
  if (!upd) return { status: 'uptodate' };
  return { status: 'update', update: upd };
}

/**
 * 执行更新（PC 下载 / Android 跳转）。
 * localhost/IDE 环境（未打包）应拒绝并复用工程 modal 警告。
 */
export async function performUpdate(adapter, update) {
  if (!adapter.isPackaged) {
    if (adapter.warnModal) {
      adapter.warnModal('env.warn.modal.title', 'env.warn.modal.body');
    }
    return { ok: false, reason: 'env-not-allowed' };
  }
  try {
    await adapter.applyUpdate(update.latest, update.asset);
    return { ok: true };
  } catch (e) {
    return { ok: false, reason: String(e && e.message || e) };
  }
}

export { UPDATE_SOURCES, DOC_FETCH_ORDER, PLATFORM, latestOf, cmpVer, detectRegion, pickSourceKey };
