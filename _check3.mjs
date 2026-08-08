import fs from 'node:fs';
const keys = ['tosGateTitle','tosGateAccept','tosGateExit','tosGateSub'];
for (const d of ['Android','PC','Web','shared']) {
  for (const f of ['en','ja','zh-TW']) {
    const p = d + '/language/' + f + '.js';
    const s = fs.readFileSync(p, 'utf8');
    const vals = keys.map(k => {
      const m = s.match(new RegExp(k + ":'([^']*)'"));
      return k + '=' + (m ? m[1].slice(0,24) : '???');
    });
    console.log(p, '||', vals.join(' | '));
  }
}
