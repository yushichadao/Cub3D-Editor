import fs from 'fs';
for (const p of ['Web/language/en.js', 'Web/language/fr.js']) {
  const c = fs.readFileSync(p, 'utf8');
  const i = c.indexOf("tosBody:");
  console.log('==== ', p, ' (tosBody region) ====');
  console.log(JSON.stringify(c.slice(i, i + 220)));
  console.log('---- has backtick?', c.includes('`'), ' has double-quote string start?', /tosBody:\s*"/.test(c));
  console.log();
}
