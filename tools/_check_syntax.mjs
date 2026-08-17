// 临时语法检查：提取 HTML 内联 <script> 逐个 node --check
import fs from 'fs';
import os from 'os';
import path from 'path';
import cp from 'child_process';

const targets = ['Web/index.html', 'PC/index.html', 'Android/index.html'];
for (const f of targets) {
  const html = fs.readFileSync(f, 'utf8');
  const re = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  let m, i = 0;
  while ((m = re.exec(html))) {
    i++;
    const code = m[1];
    if (!code.trim()) continue;
    // importmap 内容是 JSON 而非 JS，跳过（由浏览器解析，node --check 无法校验）
    if (/type=["']importmap["']/i.test(m[0])) { console.log('SKIP', f, 'script#' + i, '[importmap]', code.length + ' chars'); continue; }
    const isModule = /type=["']module["']/i.test(m[0]);
    const tmp = path.join(os.tmpdir(), 'chk_' + Date.now() + '_' + i + (isModule ? '.mjs' : '.js'));
    fs.writeFileSync(tmp, code);
    const r = cp.spawnSync(process.execPath, ['--check', tmp], { encoding: 'utf8' });
    fs.unlinkSync(tmp);
    if (r.status === 0) console.log('OK  ', f, 'script#' + i, isModule ? '[module]' : '[plain]', code.length + ' chars');
    else console.log('FAIL', f, 'script#' + i, isModule ? '[module]' : '[plain]', '::', (r.stderr || r.stdout).trim());
  }
}
