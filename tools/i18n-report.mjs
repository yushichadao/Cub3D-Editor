// i18n 可视化报告：打印每域/每语言的翻译覆盖率与缺口（PS/cmd 实时查看）。
// 用法：node tools/i18n-report.mjs
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataUrl = pathToFileURL(path.join(ROOT, 'shared/i18n/data.js'));
const { DOMAINS } = await import(dataUrl.href);
const NL = ['en', 'ja', 'zh-TW', 'ko', 'ru', 'es', 'fr', 'ar'];

const bar = (n, total, w = 30) => {
  const pct = total ? Math.round((n / total) * 100) : 0;
  const fill = Math.round((pct / 100) * w);
  return '█'.repeat(fill) + '░'.repeat(w - fill) + ` ${pct}% (${n}/${total})`;
};

console.log('╔════════════════════════════════════════════════════════════');
console.log('║  Cub3D Editor — i18n 翻译覆盖率报告');
console.log('╚════════════════════════════════════════════════════════════');

for (const [name, d] of Object.entries(DOMAINS)) {
  const total = Object.keys(d).length;
  console.log(`\n【域: ${name}】  ${total} 键`);
  const missByLang = {};
  for (const lang of NL) missByLang[lang] = 0;
  for (const [k, t] of Object.entries(d)) {
    const zh = t['zh-CN'];
    for (const lang of NL) {
      const v = t[lang];
      if (v == null || v === '' || v === zh) missByLang[lang]++;
    }
  }
  for (const lang of NL) {
    const done = total - missByLang[lang];
    console.log(`  ${lang.padEnd(6)} ${bar(done, total)}`);
  }
}

// 汇总：各端应有键数（含 promo）
console.log('\n────────────────────────────────────────────────────────────');
const { buildLang } = await import(pathToFileURL(path.join(ROOT, 'shared/i18n/index.js')).href);
for (const ep of ['web', 'pc', 'android']) {
  console.log(`  端 ${ep.padEnd(8)} 应有键: ${Object.keys(buildLang(ep)).length}`);
}

// 重点缺口：upd* / man* 未翻译清单（用户最关心的）
console.log('\n────────────────────────────────────────────────────────────');
console.log('【未翻译的更新/管理键（upd*/man*）】');
const focus = new Set();
for (const d of Object.values(DOMAINS)) for (const k of Object.keys(d)) if (k.startsWith('upd') || k.startsWith('man')) focus.add(k);
let cnt = 0;
for (const k of [...focus].sort()) {
  const t = DOMAINS.base[k] || DOMAINS.pc[k] || DOMAINS.android[k];
  if (!t) continue;
  const en = t.en;
  if (en == null || en === t['zh-CN']) { console.log(`  ✗ ${k}  (en=${JSON.stringify(en)})`); cnt++; }
}
console.log(`  共 ${cnt} 个未翻译（其余已在根页 promo 域 9 语言齐全）`);
console.log('\n报告完成。');
