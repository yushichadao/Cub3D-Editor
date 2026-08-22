// 自动生成（tools/gen-update-sources.mjs），请勿手改。来源 shared/infra/update-sources.mjs
window.CUB3D_UPDATE_SOURCES = {
  "cn": {
    "label": "cn-ip",
    "base": "https://139.196.104.56/manager",
    "docPath": "/downloads/update-doc.json",
    "note": "境内源（现在=IP/manager）。安卓当前唯一可达境内源。"
  },
  "cnDomain": {
    "label": "cn-domain",
    "base": "https://cub3d-editor.cn/manager",
    "docPath": "/downloads/update-doc.json",
    "enabled": false,
    "note": "境内站域名（备案后启用）。"
  },
  "intl": {
    "label": "intl",
    "base": "https://yushichadao.github.io/Cub3D-Editor",
    "docPath": "/downloads/update-doc.json",
    "note": "国际站（GitHub Pages）。"
  },
  "githubProxy": {
    "label": "github-proxy",
    "base": "/api/gh-releases",
    "note": "GitHub Releases 走服务端代理（改进 C）。"
  }
};
window.CUB3D_DOC_FETCH_ORDER = ["cn","cnDomain","intl"];
