// 由 shared/i18n 单一映射表生成各端语言包（端覆盖，不复制整段）。
// 用法：node tools/gen-langs.mjs
// 新增语言：在 shared/i18n/index.js 的 LANGS 加项 + data.js 每键补该语言值列，重跑本脚本即生效。
import fs from 'node:fs';
const { mkdir, writeFile } = fs.promises;
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildLang, NON_ZH_CODES, LANGS } from '../shared/i18n/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const labelOf = (code) => (LANGS.find((l) => l.code === code) || {}).label || code;

// 各端目标目录（android 含原生 assets 目录）
const TARGETS = {
  web: [path.join(ROOT, 'web', 'language')],
  pc: [path.join(ROOT, 'pc', 'language')],
  android: [
    path.join(ROOT, 'android', 'language'),
    path.join(ROOT, 'android', 'android', 'app', 'src', 'main', 'assets', 'public', 'language'),
  ],
};

async function mkdirSafe(d) {
  await mkdir(d, { recursive: true });
}

function genContent(langObj, code) {
  const out = { lang: labelOf(code) };
  for (const k of Object.keys(langObj).sort()) {
    const v = langObj[k][code];
    if (v === undefined || v === '') continue; // 跳过缺失翻译（运行时回退 zh-CN 内联）
    out[k] = v;
  }
  return `window.__packs = window.__packs || {};\nwindow.__packs['${code}'] = ${JSON.stringify(out, null, 2)};\n`;
}

let count = 0;
for (const endpoint of ['web', 'pc', 'android']) {
  const lang = buildLang(endpoint);
  for (const code of NON_ZH_CODES) {
    const content = genContent(lang, code);
    for (const dir of TARGETS[endpoint]) {
      await mkdirSafe(dir);
      const file = path.join(dir, code + '.js');
      await writeFile(file, content, 'utf8');
      count++;
    }
  }
  const keys = Object.keys(lang).length;
  console.log(`[gen-langs] ${endpoint}: ${keys} 键 -> ${TARGETS[endpoint].length} 个目录`);
}

// 兼容：shared/language 作为 web 基准副本（旧脚本/手动引用）
const sharedDir = path.join(ROOT, 'shared', 'language');
await mkdirSafe(sharedDir);
const webLang = buildLang('web');
for (const code of NON_ZH_CODES) {
  await writeFile(path.join(sharedDir, code + '.js'), genContent(webLang, code), 'utf8');
  count++;
}

console.log(`[gen-langs] 完成，共写出 ${count} 个语言包文件（${NON_ZH_CODES.length} 语言 × 三端 + shared）。`);
