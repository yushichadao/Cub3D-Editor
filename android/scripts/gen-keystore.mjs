/**
 * gen-keystore.mjs
 * 生成 release 签名密钥库，并写出 android/keystore.properties。
 *
 * 用法：npm run keystore
 *
 * 生成物均已在 .gitignore 中排除，绝不会进仓库。
 * 密钥有效期 100 年，请自行备份 android/release.keystore —— 丢失后
 * 将无法为已发布的 APK 推送更新（Android 要求同一签名）。
 */
import { spawnSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { KEYTOOL, buildEnv } from './env-android.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ANDROID_DIR = path.join(ROOT, 'android');
const KEYSTORE = path.join(ANDROID_DIR, 'release.keystore');
const PROPS = path.join(ANDROID_DIR, 'keystore.properties');

const ALIAS = 'cub3deditor';

function genPassword() {
  // 24 位强随机密码，避免使用弱口令
  return crypto.randomBytes(18).toString('base64url');
}

function main() {
  if (existsSync(KEYSTORE)) {
    console.log('[keystore] 已存在 android/release.keystore，跳过生成');
    if (!existsSync(PROPS)) {
      console.error('[keystore] 但缺少 keystore.properties，请删除 release.keystore 后重新生成');
      process.exit(1);
    }
    return;
  }

  const storePassword = genPassword();
  const keyPassword = storePassword;

  const args = [
    '-genkeypair', '-v',
    '-keystore', KEYSTORE,
    '-alias', ALIAS,
    '-keyalg', 'RSA',
    '-keysize', '2048',
    '-validity', '36500',
    '-storepass', storePassword,
    '-keypass', keyPassword,
    '-dname', 'CN=Cub3D Editor, OU=Editor, O=Cub3D, L=Unknown, ST=Unknown, C=CN'
  ];

  console.log('[keystore] 正在生成签名密钥…');
  const r = spawnSync(KEYTOOL, args, { env: buildEnv(), stdio: ['ignore', 'pipe', 'pipe'] });

  if (r.status !== 0) {
    console.error('[keystore] 生成失败：');
    console.error(r.stderr?.toString() || r.stdout?.toString() || '未知错误');
    process.exit(1);
  }

  writeFileSync(
    PROPS,
    [
      '# 自动生成，请勿提交到版本库',
      '# 备份 android/release.keystore 与本文件，用于后续版本更新',
      'storeFile=release.keystore',
      `storePassword=${storePassword}`,
      `keyAlias=${ALIAS}`,
      `keyPassword=${keyPassword}`,
      ''
    ].join('\n'),
    'utf8'
  );

  console.log('[keystore] 完成');
  console.log('  密钥库：android/release.keystore');
  console.log('  配置：  android/keystore.properties');
  console.log('  别名：  ' + ALIAS);
  console.log('\n  ⚠ 请备份以上两个文件，丢失后无法为已安装的 APK 发布更新。');
}

main();
