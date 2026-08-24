/**
 * shared/infra/update-sources.mjs
 * 更新源单一化（改进 A）+ IP 境内外检测（运行期规则）+ 客户端智能分流配置外置。
 *
 * 设计要点（与已确认硬规则一致）：
 *  - 域名/IP 只在一处维护；迁移正式网址/服务器只改这里。
 *  - 境内源已切换为正式域名 cnDomain（HTTPS 主源）；cn=IP 保留为兜底，
 *    域名不可达（DNS 未生效/证书异常）时 buildFetchOrder 自动降级，无明文隐患（HTTPS 优先）。
 *  - GitHub 源统一走服务端代理 /api/gh-releases（改进 C），客户端不直接连 GitHub。
 *  - 分流第一判据 = IP 检测（境内/境外）；检测失败或缺网 → 本地优先 + 不阻塞。
 *
 * 三端（web/pc/android）通过 sync-shared 同步本文件，import 同一份。
 */

// ===== 可配置源（域名/IP 只在此处维护）=====
export const UPDATE_SOURCES = {
  // 境内源：cnDomain（域名 HTTPS）为正式主源；cn=IP 保留为兜底（域名解析/证书异常时降级）。
  // 更新探测统一走「发布更新信息系统」/admin/api/release/update?current=X（服务端代理，CORS=*）；
  // docPath 静态 update-doc.json 作为兜底源（nginx 静态，独立于管理端进程，避免管理端重启期间客户端无法更新）。
  // cn 当前为 IP HTTP(80)：仅作兜底；Android 端已在 network_security_config.xml 对 139.196.104.56 精确放行明文（不开全局）。
  cn: {
    label: 'cn-ip',
    base: 'http://139.196.104.56/admin',
    updateApi: 'http://139.196.104.56/admin/api/release/update',
    docPath: '/downloads/update-doc.json',
    note: '境内 IP 兜底源（HTTP，经 /admin 代理；域名不可达时自动降级至此）。',
  },
  // 境内域名源：正式主源（HTTPS）。已启用；域名不可达时由 buildFetchOrder 自动降级到 cn(IP)。
  cnDomain: {
    label: 'cn-domain',
    base: 'https://cub3d-editor.cn/admin',
    updateApi: 'https://cub3d-editor.cn/admin/api/release/update',
    docPath: '/downloads/update-doc.json',
    enabled: true, // 正式主源（HTTPS）
    note: '境内站域名（正式网址，HTTPS 主源）。',
  },
  // 国际站（GitHub Pages）
  intl: {
    label: 'intl',
    base: 'https://yushichadao.github.io/Cub3D-Editor',
    updateApi: 'https://yushichadao.github.io/Cub3D-Editor/api/release/update',
    docPath: '/downloads/update-doc.json',
    note: '国际站（GitHub Pages）。',
  },
  // GitHub Releases 代理（服务端「发布更新信息系统」/admin/api/release/gh-releases，客户端不直接连 GitHub）
  githubProxy: {
    label: 'github-proxy',
    // 相对路径：由管理端/站点同源提供；跨域时指向境内源 base
    base: '/admin/api/release/gh-releases',
    note: 'GitHub Releases 走服务端代理（改进 C）。',
  },
};

/**
 * 客户端拉取 update-doc 的候选顺序（按网络所在自动选，失败降级）。
 *
 * IP 切换原则（用户硬规则）：
 *  1) 先连「IP 所在地」的服务器网站（境内→境内域名 cnDomain；境外→国际站 intl）。
 *  2) 若该所在地网站「网址无法解析」（DNS 失败 / 域名未生效 / enabled=false）→ 换「所在地」的备用（境内备用=境内 IP cn；境外备用=仍走国际站本身）。
 *  3) 若「备用的」也解析不了（连不上）→ 只能用「非 IP 所在地」的服务器（境内用户→境外 intl/githubProxy；境外用户→境内 cn/cnDomain）。
 *  4) 最后统一用 githubProxy（服务端代理，跨域兜底）。
 *
 * 运行期实现：依次 fetch，某个 key 解析/连接失败则降级到下一个；cnDomain 在 enabled=false（备案未生效）时等同于「域名无法解析」，自动落到备用 IP。
 *
 * @param {'cn'|'intl'|'unknown'} region IP 检测结果
 * @returns {string[]} 依次尝试的源 key
 */
export function buildFetchOrder(region) {
  if (region === 'cn') {
    // 境内：所在地网站(cnDomain) → 所在地备用(cn, IP) → 非所在地(intl) → 代理
    return ['cnDomain', 'cn', 'intl', 'githubProxy'];
  }
  if (region === 'intl') {
    // 境外：所在地网站(intl) → 非所在地(cnDomain/cn) → 代理
    return ['intl', 'cnDomain', 'cn', 'githubProxy'];
  }
  // unknown / 缺网：本地优先 + 不阻塞，优先境内再代理
  return ['cn', 'cnDomain', 'intl', 'githubProxy'];
}

// 未知区域时的默认顺序（保持向后兼容的导出）
export const DOC_FETCH_ORDER = buildFetchOrder('unknown');

// 各端"本端"平台标识（供 latestOf 选择）
export const PLATFORM = {
  WEB: 'web',
  PC: 'pc',
  ANDROID: 'android',
};

// 取某版本中「本平台」的安装包列表（兼容后端数组格式与旧式对象格式）：
//   数组 [{name,platform,channel,srcs}] → 按 platform 过滤（无 platform 时按文件名后缀推断 .apk→android）
//   对象 {pc:[...],android:[...]} → 取对应平台数组
function __assetsOf(v, platform) {
  const aa = (v && v.assets) || [];
  if (Array.isArray(aa)) {
    return aa.filter((a) => {
      if (a == null) return false;
      const name = (typeof a === 'string') ? a : (a.name || '');
      const p = (typeof a === 'string') ? null : (a.platform || null);
      return (p || (/\.apk$/i.test(String(name)) ? 'android' : 'pc')) === platform;
    });
  }
  return aa[platform] || [];
}

/**
 * 取某端最新版本（端间可不同步）。
 * @param {object} doc update-doc.json 解析对象
 * @param {string} platform 'web'|'pc'|'android'
 * @returns {string|null} 本端最新已发布版本号
 */
export function latestOf(doc, platform) {
  if (!doc || !Array.isArray(doc.versions)) return null;
  let best = null;
  for (const v of doc.versions) {
    if (v.status !== 'published') continue;
    const assets = __assetsOf(v, platform);
    if (assets.length === 0) continue;
    if (best === null || cmpVer(v.version, best) > 0) best = v.version;
  }
  return best;
}

/** 语义化版本比较：a>b 返回 1，a<b 返回 -1，相等 0 */
export function cmpVer(a, b) {
  const pa = String(a).split('.').map(Number);
  const pb = String(b).split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const x = pa[i] || 0;
    const y = pb[i] || 0;
    if (x > y) return 1;
    if (x < y) return -1;
  }
  return 0;
}

/**
 * IP 境内外检测（分流第一判据）。返回 'cn' | 'intl' | 'unknown'。
 * 失败/超时/缺网 → 'unknown'（调用方据此本地优先、不阻塞）。
 * 实现由三端适配层注入（web/pc 用 fetch；android 用 Capacitor HTTP），此处仅定义契约。
 * @param {(url:string)=>Promise<{country:string}>} detector 平台相关检测函数
 */
export async function detectRegion(detector) {
  try {
    const r = await detector();
    if (r && r.country && /^(CN|China|中国)$/i.test(r.country)) return 'cn';
    if (r && r.country) return 'intl';
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

/** 根据区域选主源 key（cnDomain 未启用时回退 cn）*/
export function pickSourceKey(region) {
  if (region === 'cn' && UPDATE_SOURCES.cnDomain.enabled) return 'cnDomain';
  if (region === 'cn') return 'cn';
  if (region === 'intl') return 'intl';
  return 'cn'; // unknown 默认境内优先，本地优先降级在调用方
}
