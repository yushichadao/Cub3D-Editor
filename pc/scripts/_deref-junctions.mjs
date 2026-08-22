// 构建前把 PC 下的 junction（重解析点）目录替换成真实副本。
// 原因：electron-builder 收集应用文件时不会跟随 junction/symlink，
//       导致 three / language / docs 等目录被整体跳过、未打进 asar，
//       最终打包出的 exe 加载不到 3D 引擎 / 语言包 / 说明书而无法使用。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PC = path.resolve(__dirname, '..');

const TARGETS = ['three', 'language', 'docs'];

function isJunction(p) {
  try {
    const st = fs.lstatSync(p);
    return st.isSymbolicLink() || (st.dev === 0 && (st.ino || st.nlink > 1));
  } catch {
    return false;
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else if (entry.isSymbolicLink()) {
      // 跟随符号链接复制为真实文件
      fs.copyFileSync(fs.realpathSync(s), d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

for (const name of TARGETS) {
  const p = path.join(PC, name);
  if (!fs.existsSync(p)) {
    console.log(`[deref] ${name} 不存在，跳过`);
    continue;
  }
  // 用 lstat 判断是否为 junction / symlink
  const st = fs.lstatSync(p);
  const isLink = st.isSymbolicLink() || (process.platform === 'win32' && (st.dev === 0));
  if (!isLink) {
    console.log(`[deref] ${name} 已是真实目录，跳过`);
    continue;
  }
  const realTarget = fs.realpathSync(p);
  console.log(`[deref] 检测到 ${name} 是 junction -> ${realTarget}，准备替换`);
  // 删除 junction（只删除重解析点，不删除目标内容）
  fs.rmSync(p, { recursive: true, force: true });
  copyDir(realTarget, p);
  console.log(`[deref] ${name} 已替换为真实副本`);
}
console.log('[deref] 完成。');
