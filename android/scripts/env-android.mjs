/**
 * env-android.mjs
 * 统一解析 Android 构建所需的本机环境（JDK / SDK）。
 * 优先使用系统环境变量，其次回退到本项目仓库内的 toolchain/ 目录（不再散落 C 盘 dev-tools）。
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

// 仓库内工具链目录（收敛 Android JDK/SDK，替代 C:\Users\yushi\dev-tools）。
// 可用环境变量 CUB3D_TOOLCHAIN 覆盖（指向仓库外真实工具链位置，便于不入库）。
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DEV_TOOLS = process.env.CUB3D_TOOLCHAIN || path.join(REPO_ROOT, 'toolchain');

function pick(candidates, label) {
  for (const c of candidates) {
    if (c && existsSync(c)) return c;
  }
  throw new Error(
    `未找到 ${label}。请先在 ${DEV_TOOLS} 放置 jdk17/ 与 android-sdk/，或设置环境变量 CUB3D_TOOLCHAIN 指向工具链目录。`
  );
}

export const JAVA_HOME = pick(
  [process.env.JAVA_HOME, path.join(DEV_TOOLS, 'jdk17')],
  'JDK 17'
);

export const ANDROID_HOME = pick(
  [process.env.ANDROID_HOME, process.env.ANDROID_SDK_ROOT, path.join(DEV_TOOLS, 'android-sdk')],
  'Android SDK'
);

export const KEYTOOL = path.join(JAVA_HOME, 'bin', process.platform === 'win32' ? 'keytool.exe' : 'keytool');

/**
 * 供子进程使用的环境变量。
 *
 * GRADLE_OPTS 里指定 Windows-ROOT 证书库：gradle-wrapper 下载 Gradle 发行版时
 * 还读不到 gradle.properties，必须通过环境变量传入，否则在有 TLS 拦截的网络下
 * 会以 "PKIX path building failed" 失败。
 */
export function buildEnv() {
  const tlsFix = '-Djavax.net.ssl.trustStoreType=Windows-ROOT';
  return {
    ...process.env,
    JAVA_HOME,
    ANDROID_HOME,
    ANDROID_SDK_ROOT: ANDROID_HOME,
    GRADLE_OPTS: [process.env.GRADLE_OPTS, tlsFix].filter(Boolean).join(' '),
    PATH: `${path.join(JAVA_HOME, 'bin')}${path.delimiter}${process.env.PATH}`
  };
}
