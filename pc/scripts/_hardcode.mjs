import fs from 'fs';
const html = fs.readFileSync('index.html','utf8');
const body = html.slice(html.indexOf('<body>'), html.indexOf('</body>'));
// match a tag open and its direct text content up to next <
const re = /<([a-zA-Z0-9]+)(\s[^>]*?)?>([^<]*[\u4e00-\u9fff][^<]*)</g;
let m, out = [];
while ((m = re.exec(body))) {
  const tag = m[1];
  const attrs = m[2] || '';
  const text = m[3];
  // skip tags that have data-i18n themselves
  if (/data-i18n/.test(attrs)) continue;
  out.push({ tag, attrs: attrs.trim(), text });
}
console.log('Hardcoded-Chinese elements (no data-i18n on the tag):', out.length);
for (const o of out) console.log(`<${o.tag} ${o.attrs}> => "${o.text}"`);
