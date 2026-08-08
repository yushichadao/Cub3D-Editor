import fs from 'node:fs';
for (const d of ['Android','PC','Web','shared']) {
  for (const f of ['en','ja','zh-TW']) {
    const p = d + '/language/' + f + '.js';
    const s = fs.readFileSync(p, 'utf8');
    const m = s.match(/tosBody:(["'])([\s\S]*?)\1/);
    console.log(p, '| quote:', m ? m[1] : '(none)', '| hasGate:', s.includes('tosGateTitle:'), '| hasPrivacyLink:', /privacyLink:(["'])/.test(s));
  }
}
