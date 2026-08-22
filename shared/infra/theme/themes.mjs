/**
 * shared/infra/theme/themes.mjs
 * 三派主题 token 收敛（T7）。原 12 主题在 PC/app.js、Web/index.html、Android/index.html 三处
 * 逐字重复定义 → 收敛为单一源，三端引用同一份，确保随主题变化且跨端一致。
 *
 * 三派主题映射（已确认）：
 *  - 宣传页派 = 绿主题（单一，见 PROMO_THEME）
 *  - 客户端派 = 12 主题（见 CLIENT_THEMES，key 顺序即展示顺序）
 *  - 后台派   = 客户端 12 主题之第 1 个（neon）
 */

// ===== 客户端 12 主题（唯一权威定义）=====
export const CLIENT_THEMES = {
  neon:   { name:'themeNeon',   label:'霓虹蓝紫', vars:{ '--bg-deep':'#0c0e16','--bg-panel':'rgba(20,22,34,0.82)','--bg-panel-solid':'#14161f','--bg-manual':'#11141d','--accent':'#6ee7ff','--accent-2':'#c084fc','--accent-3':'#fb7185','--warn':'#fbbf24','--text':'#e8e8f0','--text-dim':'#8b8ba0','--border':'rgba(110,231,255,0.18)' } },
  aurora: { name:'themeAurora', label:'夜阑紫罗', vars:{ '--bg-deep':'#120a1f','--bg-panel':'rgba(26,16,40,0.82)','--bg-panel-solid':'#1a1028','--bg-manual':'#150b22','--accent':'#a78bfa','--accent-2':'#e879f9','--accent-3':'#22d3ee','--warn':'#fbbf24','--text':'#f3e8ff','--text-dim':'#a78ab8','--border':'rgba(167,139,250,0.20)' } },
  forest: { name:'themeForest', label:'森林青绿', vars:{ '--bg-deep':'#08130d','--bg-panel':'rgba(14,28,20,0.82)','--bg-panel-solid':'#0e1c14','--bg-manual':'#0a1810','--accent':'#5eead4','--accent-2':'#86efac','--accent-3':'#fbbf24','--warn':'#fca5a5','--text':'#e6f5ec','--text-dim':'#8aa89a','--border':'rgba(94,234,212,0.18)' } },
  gray:   { name:'themeGray',   label:'暗夜静灰', vars:{ '--bg-deep':'#0e0f12','--bg-panel':'rgba(26,27,32,0.82)','--bg-panel-solid':'#1a1b20','--bg-manual':'#15161b','--accent':'#a1a1aa','--accent-2':'#cbd5e1','--accent-3':'#f472b6','--warn':'#fbbf24','--text':'#e5e7eb','--text-dim':'#9ca3af','--border':'rgba(161,161,170,0.18)' } },
  ember:     { name:'themeEmber',     label:'余烬赤红', vars:{ '--bg-deep':'#1a0608','--bg-panel':'rgba(34,10,12,0.82)','--bg-panel-solid':'#220a0c','--bg-manual':'#1a0809','--accent':'#ef4444','--accent-2':'#f97316','--accent-3':'#facc15','--warn':'#fbbf24','--text':'#fdeaea','--text-dim':'#b58a8c','--border':'rgba(239,68,68,0.20)' } },
  sunset:     { name:'themeSunset',     label:'日落暖橙', vars:{ '--bg-deep':'#1a0f0a','--bg-panel':'rgba(34,20,14,0.82)','--bg-panel-solid':'#21140d','--bg-manual':'#1c1109','--accent':'#ffb454','--accent-2':'#ff7a59','--accent-3':'#ff5d8f','--warn':'#ffd166','--text':'#f5e9e0','--text-dim':'#b3998c','--border':'rgba(255,180,84,0.18)' } },
  bubblegum: { name:'themeBubblegum', label:'魅影嫣红', vars:{ '--bg-deep':'#1a0a16','--bg-panel':'rgba(34,12,30,0.82)','--bg-panel-solid':'#220c1e','--bg-manual':'#1a0a16','--accent':'#ec4899','--accent-2':'#d946ef','--accent-3':'#f472b6','--warn':'#fbbf24','--text':'#fbeaf4','--text-dim':'#b58ca8','--border':'rgba(236,72,153,0.20)' } },
  slate:     { name:'themeSlate',     label:'暮金暖黄', vars:{ '--bg-deep':'#1a1405','--bg-panel':'rgba(34,26,10,0.82)','--bg-panel-solid':'#221a0a','--bg-manual':'#1a1405','--accent':'#f59e0b','--accent-2':'#fbbf24','--accent-3':'#fcd34d','--warn':'#f87171','--text':'#fbf3e0','--text-dim':'#b39e7a','--border':'rgba(245,158,11,0.20)' } },
  light:  { name:'themeLight',  label:'澄澈青白', vars:{ '--bg-deep':'#eef1f6','--bg-panel':'rgba(255,255,255,0.86)','--bg-panel-solid':'#ffffff','--bg-manual':'#f6f8fb','--accent':'#4f46e5','--accent-2':'#0ea5e9','--accent-3':'#ec4899','--warn':'#d97706','--text':'#1f2330','--text-dim':'#6b7280','--border':'rgba(79,70,229,0.18)','--bg2':'rgba(0,0,0,0.05)','--control-bg':'rgba(0,0,0,0.06)','--control-bg-hover':'rgba(0,0,0,0.10)','--slider-track':'rgba(0,0,0,0.15)','--slider-thumb-border':'#eef1f6','--primary-btn-text':'#ffffff','--input-bg':'rgba(0,0,0,0.05)','--inline-input-bg':'rgba(255,255,255,0.94)','--section-border':'rgba(0,0,0,0.06)','--bb-sep':'rgba(0,0,0,0.12)','--modal-mask':'rgba(220,222,230,0.72)' } },
  paper:  { name:'themePaper',  label:'晨曦米白', vars:{ '--bg-deep':'#f7f3ea','--bg-panel':'rgba(255,253,247,0.9)','--bg-panel-solid':'#fffdf7','--bg-manual':'#f2ede1','--accent':'#b45309','--accent-2':'#d97706','--accent-3':'#be123c','--warn':'#c2410c','--text':'#2b2620','--text-dim':'#8a7f70','--border':'rgba(120,90,40,0.20)','--bg2':'rgba(120,90,40,0.05)','--control-bg':'rgba(120,90,40,0.07)','--control-bg-hover':'rgba(120,90,40,0.12)','--slider-track':'rgba(120,90,40,0.18)','--slider-thumb-border':'#f7f3ea','--primary-btn-text':'#ffffff','--input-bg':'rgba(120,90,40,0.06)','--inline-input-bg':'rgba(255,253,247,0.95)','--section-border':'rgba(120,90,40,0.10)','--bb-sep':'rgba(120,90,40,0.14)','--modal-mask':'rgba(230,223,210,0.72)' } },
  sky:    { name:'themeSky',    label:'薄荷浅绿', vars:{ '--bg-deep':'#ecfdf5','--bg-panel':'rgba(255,255,255,0.9)','--bg-panel-solid':'#ffffff','--bg-manual':'#e6faf0','--accent':'#059669','--accent-2':'#10b981','--accent-3':'#0ea5e9','--warn':'#d97706','--text':'#143027','--text-dim':'#5b8475','--border':'rgba(5,150,105,0.20)','--bg2':'rgba(5,150,105,0.05)','--control-bg':'rgba(5,150,105,0.07)','--control-bg-hover':'rgba(5,150,105,0.12)','--slider-track':'rgba(5,150,105,0.18)','--slider-thumb-border':'#ecfdf5','--primary-btn-text':'#ffffff','--input-bg':'rgba(5,150,105,0.06)','--inline-input-bg':'rgba(255,255,255,0.95)','--section-border':'rgba(5,150,105,0.10)','--bb-sep':'rgba(5,150,105,0.14)','--modal-mask':'rgba(220,240,232,0.72)' } },
  blossom:{ name:'themeBlossom',label:'淡雅鹅黄', vars:{ '--bg-deep':'#fefce8','--bg-panel':'rgba(255,255,255,0.9)','--bg-panel-solid':'#ffffff','--bg-manual':'#fdfbe4','--accent':'#ca8a04','--accent-2':'#eab308','--accent-3':'#f59e0b','--warn':'#d97706','--text':'#2e2710','--text-dim':'#8a7d4a','--border':'rgba(202,138,4,0.20)','--bg2':'rgba(202,138,4,0.05)','--control-bg':'rgba(202,138,4,0.07)','--control-bg-hover':'rgba(202,138,4,0.12)','--slider-track':'rgba(202,138,4,0.18)','--slider-thumb-border':'#fefce8','--primary-btn-text':'#ffffff','--input-bg':'rgba(202,138,4,0.06)','--inline-input-bg':'rgba(255,255,255,0.95)','--section-border':'rgba(202,138,4,0.10)','--bb-sep':'rgba(202,138,4,0.14)','--modal-mask':'rgba(248,244,214,0.72)' } },
};

// 客户端主题展示顺序（与 PC/app.js THEMES 顺序一致）
export const CLIENT_THEME_ORDER = [
  'neon','aurora','forest','gray','ember','sunset','bubblegum','slate','light','paper','sky','blossom'
];

// 后台派：复用客户端 12 主题之第 1 个
export const ADMIN_THEME = CLIENT_THEMES[CLIENT_THEME_ORDER[0]];

// 宣传页派：绿主题（单一，源自 index.html --accent:#5ad1c4 的青绿体系）
export const PROMO_THEME = {
  name: 'themePromoGreen',
  vars: {
    '--bg-deep':'#06120f','--bg-panel':'rgba(10,28,24,0.86)','--bg-panel-solid':'#0a1c18',
    '--bg-manual':'#08140f','--accent':'#5ad1c4','--accent-2':'#86efac','--accent-3':'#fbbf24',
    '--warn':'#fca5a5','--text':'#e6f5ec','--text-dim':'#8aa89a','--border':'rgba(90,209,196,0.22)'
  }
};

/** 应用主题 vars 到 document root（三端共用）*/
export function applyThemeVars(themeObj, root = document.documentElement) {
  if (!themeObj || !themeObj.vars) return;
  for (const [k, v] of Object.entries(themeObj.vars)) {
    root.style.setProperty(k, v);
  }
  if (themeObj.name) root.setAttribute('data-theme', themeObj.name);
}

/** 取客户端主题对象 */
export function getClientTheme(key) {
  return CLIENT_THEMES[key] || CLIENT_THEMES[CLIENT_THEME_ORDER[0]];
}
