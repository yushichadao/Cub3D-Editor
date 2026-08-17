// 同步仓库 wiki/Home.md 到 GitHub Wiki 仓库并推送
// 用法: node sync-wiki.mjs
import { execSync } from 'node:child_process';
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..'); // 脚本置于 tools/ 下，反推仓库根
const wikiSrc = resolve(root, 'wiki/Home.md');
const wikiTmp = resolve(root, 'wiki-tmp');
const wikiDst = resolve(wikiTmp, 'Home.md');
const remote = 'https://github.com/yushichadao/Cub3D-Editor.wiki.git';

if (!existsSync(wikiSrc)) {
  console.error('找不到 wiki/Home.md');
  process.exit(1);
}

if (!existsSync(wikiTmp)) {
  console.log('首次运行：克隆 Wiki 仓库...');
  execSync(`git clone ${remote} wiki-tmp`, { cwd: root, stdio: 'inherit' });
}

copyFileSync(wikiSrc, wikiDst);

const run = (cmd) => execSync(cmd, { cwd: wikiTmp, stdio: 'inherit' });

// GitHub Wiki 默认分支为 master
run('git checkout master');
run('git pull origin master');
run('git add Home.md');
try {
  run('git diff --cached --quiet && echo "no changes"');
  console.log('内容无变化，无需提交。');
} catch {
  run('git commit -m "Sync Wiki Home page"');
  run('git push origin master');
  console.log('Wiki 已更新并推送。');
}
