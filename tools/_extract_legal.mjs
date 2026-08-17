// 临时脚本：从 Web 端语言包/内置对象提取九语言法律条款，生成 assets/legal-i18n.js。
// 内容原样复制、不改写；用户可直接替换 legal-i18n.js 或用真实截图等。
// 用法：node tools/_extract_legal.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const KEYS = ['tosLink','tosBody','disclaimerLink','disclaimerBody','privacyLink','privacyBody'];
const LANG_FILES = { 'zh-TW':'zh-TW.js','en':'en.js','ja':'ja.js','ko':'ko.js','ru':'ru.js','es':'es.js','fr':'fr.js','ar':'ar.js' };

const out = {};

// zh-CN 从 Web/index.html 提取内置 ZH_CN 对象
const webHtml = fs.readFileSync(path.join(ROOT,'Web','index.html'),'utf8');
const mark = 'const ZH_CN = {';
const ms = webHtml.indexOf(mark);
if (ms < 0) { console.error('ZH_CN not found'); process.exit(1); }
const braceStart = webHtml.indexOf('{', ms);
let depth = 0, i = braceStart;
for (; i < webHtml.length; i++) {
  if (webHtml[i] === '{') depth++;
  else if (webHtml[i] === '}') { depth--; if (depth === 0) break; }
}
const objText = webHtml.slice(braceStart, i + 1);
const zhCN = Function('"use strict"; return (' + objText + ');')();
out['zh-CN'] = {};
KEYS.forEach(k => { out['zh-CN'][k] = zhCN[k]; });

// 其余 8 语言从语言包提取
const ctx = vm.createContext({ window: {} });
for (const [code, file] of Object.entries(LANG_FILES)) {
  const src = fs.readFileSync(path.join(ROOT,'Web','language',file),'utf8');
  ctx.window = {};
  vm.runInContext(src, ctx);
  const dict = ctx.window.__packs && ctx.window.__packs[code];
  if (!dict) { console.warn('no pack for ' + code); continue; }
  out[code] = {};
  KEYS.forEach(k => { out[code][k] = dict[k]; });
}

let js = '// 九语言法律条款内容：直接复用 Web 端语言包/内置对象，不改写。\n// 宣传页法律独立页面依赖本文件（window.LEGAL）。\nwindow.LEGAL = ';
js += JSON.stringify(out);
js += ';\n';
fs.writeFileSync(path.join(ROOT,'assets','legal-i18n.js'), js, 'utf8');
console.log('legal-i18n.js written, langs:', Object.keys(out).length);
