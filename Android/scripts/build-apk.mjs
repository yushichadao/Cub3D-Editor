/**
 * build-apk.mjs
 * 调用 Gradle 打包 APK，并把产物复制到 dist/。
 *
 * 用法：
 *   npm run apk:debug     调试包，无需签名，可直接安装
 *   npm run apk:release    正式包，使用 android/release.keystore 签名
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync, statSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildEnv, JAVA_HOME, ANDROID_HOME } from './env-android.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ANDROID_DIR = path.join(ROOT, 'android');
const DIST = path.join(ROOT, 'dist');

const mode = (process.argv[2] || 'debug').toLowerCase();
if (!['debug', 'release'].includes(mode)) {
  console.error(`[apk] 未知构建模式：${mode}（可选 debug / release）`);
  process.exit(1);
}

function appVersion() {
  try {
    return JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8')).version || '1.0.0';
  } catch {
    return '1.0.0';
  }
}

function main() {
  console.log(`[apk] JDK : ${JAVA_HOME}`);
  console.log(`[apk] SDK : ${ANDROID_HOME}`);
  console.log(`[apk] 模式: ${mode}`);

  if (mode === 'release' && !existsSync(path.join(ANDROID_DIR, 'keystore.properties'))) {
    console.error('[apk] 缺少签名配置，请先运行：npm run keystore');
    process.exit(1);
  }

  const task = mode === 'release' ? 'assembleRelease' : 'assembleDebug';
  const gradlew = path.join(ANDROID_DIR, process.platform === 'win32' ? 'gradlew.bat' : 'gradlew');

  console.log(`[apk] 执行 Gradle ${task}（首次运行需下载 Gradle 与依赖，耗时较长）…`);

  // Windows 下 shell:true 会把命令按空格拆分，路径含空格时必须加引号，否则会被截断
  const gradlewCmd = process.platform === 'win32' ? `"${gradlew}"` : gradlew;
  const r = spawnSync(gradlewCmd, [task, '--no-daemon', '--console=plain'], {
    cwd: ANDROID_DIR,
    env: buildEnv(),
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  if (r.status !== 0) {
    console.error(`[apk] Gradle 构建失败，退出码 ${r.status}`);
    process.exit(r.status || 1);
  }

  const outDir = path.join(ANDROID_DIR, 'app', 'build', 'outputs', 'apk', mode);
  const candidates = [
    `app-${mode}.apk`,
    `app-${mode}-unsigned.apk`
  ].map(f => path.join(outDir, f));

  const built = candidates.find(existsSync);
  if (!built) {
    console.error(`[apk] 未找到构建产物，请检查目录：${outDir}`);
    process.exit(1);
  }

  mkdirSync(DIST, { recursive: true });
  const target = path.join(DIST, `立方3D-v${appVersion()}-${mode}.apk`);
  copyFileSync(built, target);

  const mb = (statSync(target).size / 1024 / 1024).toFixed(2);
  console.log('\n[apk] 构建完成');
  console.log(`  产物：${target}`);
  console.log(`  体积：${mb} MB`);
  if (built.endsWith('-unsigned.apk')) {
    console.log('  ⚠ 该包未签名，无法直接安装。请运行 npm run keystore 后重新构建。');
  } else {
    console.log('  传到手机后直接点击安装即可（需允许「安装未知来源应用」）。');
  }
}

main();
