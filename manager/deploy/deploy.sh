#!/usr/bin/env bash
# ===== Cub3D 更新管理器 · 一键部署（Ubuntu + nginx）=====
# 用法（在服务器上，仓库已 clone 到 /var/www/cub3d）：
#   cd /var/www/cub3d/manager/deploy
#   sudo bash deploy.sh
#
# 脚本做：装 Node 依赖 → 校验环境变量 → 建下载目录 → 注册 systemd → 配 nginx → 起服务
set -euo pipefail

ROOT=/var/www/cub3d
MGR=$ROOT/manager
DEPLOY=$MGR/deploy
ENVFILE=/etc/cub3d-manager.env
DLDIR=/var/www/cub3d/downloads

echo "==> [1/6] 安装 manager 依赖"
cd "$MGR"
( command -v npm >/dev/null 2>&1 ) || { echo "缺少 npm，请先装 Node >=18"; exit 1; }
npm install --omit=dev

echo "==> [2/6] 校验环境变量"
if [ ! -f "$ENVFILE" ]; then
  echo "未找到 $ENVFILE，正在从模板创建…"
  cp "$DEPLOY/.env.example" "$ENVFILE"
  chmod 600 "$ENVFILE"
  echo "⚠ 请编辑 $ENVFILE 设置 ADMIN_TOKEN（强随机串），然后重新运行本脚本。"
  exit 1
fi
# 必须改掉默认令牌
if grep -q "请改成强随机串" "$ENVFILE"; then
  echo "❌ ADMIN_TOKEN 仍是占位值，请先编辑 $ENVFILE 设置真实强令牌后再部署。"
  exit 1
fi
# 同步 CUB3D_DOWNLOADS 到脚本内变量（供下面建目录）
DL=$(grep '^CUB3D_DOWNLOADS=' "$ENVFILE" | tail -1 | cut -d= -f2-)
[ -n "$DL" ] && DLDIR="$DL"

echo "==> [3/6] 准备下载目录 / 打包输出目录并迁移数据"
mkdir -p "$DLDIR"
# 打包分发系统的本地输出目录（release/）；优先用 .env 里的 CUB3D_RELEASE_OUT
REL=$(grep '^CUB3D_RELEASE_OUT=' "$ENVFILE" | tail -1 | cut -d= -f2-)
RELDIR="${REL:-/var/www/cub3d/release}"
mkdir -p "$RELDIR"
# 若本地仓库 downloads/ 有安装包，迁移进生产目录（首次部署；之后以生产目录为准）
if [ "$(ls -A "$MGR/../downloads" 2>/dev/null)" ] && [ "$MGR/../downloads" != "$DLDIR" ]; then
  cp -n "$MGR/../downloads/"* "$DLDIR/" 2>/dev/null || true
  echo "    已从仓库 downloads/ 迁移安装包与 update-doc.json 到 $DLDIR"
fi
# 打包分发系统以 www-data 运行，需要写整个仓库（构建产物、各端 node_modules、dist）
chown -R www-data:www-data "$DLDIR" "$RELDIR" "$ROOT"
echo "    下载目录: $DLDIR   打包输出: $RELDIR"

echo "==> [4/6] 注册 systemd 服务"
cp "$DEPLOY/cub3d-manager.service" /etc/systemd/system/cub3d-manager.service
systemctl daemon-reload
systemctl enable cub3d-manager

echo "==> [5/6] 配置 nginx"
if [ -d /etc/nginx/sites-available ]; then
  cp "$DEPLOY/nginx-manager.conf" /etc/nginx/sites-available/cub3d-manager.conf
  ln -sf /etc/nginx/sites-available/cub3d-manager.conf /etc/nginx/sites-enabled/cub3d-manager.conf
  nginx -t
  systemctl reload nginx
else
  echo "⚠ 未检测到 nginx sites-available，跳过 nginx 配置（请手动配反代）"
fi

echo "==> [6/6] 启动服务"
systemctl restart cub3d-manager
sleep 2
if systemctl is-active --quiet cub3d-manager; then
  echo "✅ 部署完成。管理后台： http://139.196.104.56/manager/  或  http://cub3d-editor.cn/"
  echo "   更新话术系统：    http://cub3d-editor.cn/            （或 /manager/）"
  echo "   打包分发系统：    http://cub3d-editor.cn/packer/     （或 /manager/packer/）"
  echo "   更新探测：        http://cub3d-editor.cn/api/update?current=1.2.1"
  echo "   安装包下载：      http://cub3d-editor.cn/downloads/"
  echo ""
  echo "⚠ 打包分发系统构建环境自检："
  echo "   - Android APK：需服务器预装 JDK17 + Android SDK + Gradle，并在 Android/ 下 npm install"
  echo "   - PC Windows exe：纯 Linux 默认打不出，建议本地构建后由「上传安装包」汇入 downloads/"
  echo "   两系统共享登录态与 downloads/ 目录，打包分发『境内分发』会自动登记 update-doc.json。"
else
  echo "❌ 服务未启动，查看： journalctl -u cub3d-manager -n 50"
  exit 1
fi
