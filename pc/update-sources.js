// 自动生成（tools/gen-update-sources.mjs），请勿手改。来源 shared/infra/update-sources.mjs
window.CUB3D_UPDATE_SOURCES = {
  "cn": {
    "label": "cn-ip",
    "base": "http://139.196.104.56/admin",
    "updateApi": "http://139.196.104.56/admin/api/release/update",
    "docPath": "/downloads/update-doc.json",
    "note": "境内源（现在=IP，HTTP，经 /admin 代理）。安卓当前唯一可达境内源。"
  },
  "cnDomain": {
    "label": "cn-domain",
    "base": "https://cub3d-editor.cn/admin",
    "updateApi": "https://cub3d-editor.cn/admin/api/release/update",
    "docPath": "/downloads/update-doc.json",
    "enabled": false,
    "note": "境内站域名（备案后启用，正式网址）。"
  },
  "intl": {
    "label": "intl",
    "base": "https://yushichadao.github.io/Cub3D-Editor",
    "updateApi": "https://yushichadao.github.io/Cub3D-Editor/api/release/update",
    "docPath": "/downloads/update-doc.json",
    "note": "国际站（GitHub Pages）。"
  },
  "githubProxy": {
    "label": "github-proxy",
    "base": "/admin/api/release/gh-releases",
    "note": "GitHub Releases 走服务端代理（改进 C）。"
  }
};
window.CUB3D_DOC_FETCH_ORDER = ["cn","cnDomain","intl","githubProxy"];
window.CUB3D_BUILD_FETCH_ORDER = function buildFetchOrder(region) {
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
};
