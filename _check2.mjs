import fs from 'node:fs';
const probes = {
  en: 'You may use all basic functions directly',
  ja: 'アカウント登録やログインを行わずに',
  'zh-TW': '無須註冊帳號或登入'
};
for (const d of ['Android','PC','Web','shared']) {
  for (const f of ['en','ja','zh-TW']) {
    const p = d + '/language/' + f + '.js';
    const s = fs.readFileSync(p, 'utf8');
    const ok = s.includes(probes[f]);
    console.log(p, ok ? 'OK(expanded)' : 'MISSING(expanded?)');
  }
}
