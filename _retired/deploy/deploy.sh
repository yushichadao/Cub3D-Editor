#!/usr/bin/env bash
# deploy/deploy.sh — 云端一键部署（从零重建，仓库内）
#
# 云端根（现在 139.196.104.56，备案后切 cub3d-editor.cn）：
#   /www/wwwroot/139.196.104.56
# 职责：
#   1) 首次部署生成 downloads/ 元数据云端权威副本（从零重建）
#   2) 上传站点根静态（index.html / web/ / assets/ / shared/ / 法律页）—— 与本地工程层级一致
#   3) 上传 admin/ 管理端到服务器并重启服务
#   4) 上传 downloads/ 更新包与元数据
#
# 用法：
#   bash deploy/deploy.sh            # 交互输入令牌，部署到默认服务器
#   DEPLOY_TOKEN=xxx bash deploy/deploy.sh
set -euo pipefail

SERVER="${DEPLOY_HOST:-139.196.104.56}"
USER="${DEPLOY_USER:-root}"
REMOTE_ROOT="${DEPLOY_ROOT:-/www/wwwroot/139.196.104.56}"
TOKEN="${DEPLOY_TOKEN:-${1:-}}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> 部署目标: $USER@$SERVER:$REMOTE_ROOT"

# 1) 确保云端目录结构（从零重建）
ssh "$USER@$SERVER" "mkdir -p '$REMOTE_ROOT/downloads' '$REMOTE_ROOT/admin' '$REMOTE_ROOT/web' '$REMOTE_ROOT/assets' '$REMOTE_ROOT/shared' && echo '云端目录就绪'"

# 2) 上传站点根静态（与本地工程层级一致：index.html / web/ / assets/ / shared/ / 法律页）
echo "==> 上传站点根静态（宣传页 + Web 编辑器 + 共享脚本 + 法律页）"
# 站点根文件（若存在）
if [ -f "$ROOT/index.html" ]; then
  rsync -az "$ROOT/index.html" "$USER@$SERVER:$REMOTE_ROOT/"
fi
for f in "$ROOT"/legal-*.html; do
  [ -e "$f" ] && rsync -az "$f" "$USER@$SERVER:$REMOTE_ROOT/"
done
# Web 编辑器（前端，不带 node_modules）
rsync -az --exclude 'node_modules' "$ROOT/web/" "$USER@$SERVER:$REMOTE_ROOT/web/"
# 站点共享资源（图片/字体等）
if [ -d "$ROOT/assets" ]; then
  rsync -az --exclude 'node_modules' "$ROOT/assets/" "$USER@$SERVER:$REMOTE_ROOT/assets/"
fi
# 共享脚本（updater / update-sources 等，三端共用的客户端逻辑）
rsync -az --exclude 'node_modules' "$ROOT/shared/" "$USER@$SERVER:$REMOTE_ROOT/shared/"

# 3) 上传 admin/ 管理端（含 server.mjs / public / package.json / 依赖）
echo "==> 上传 admin/ 管理端"
rsync -az --exclude 'data' --exclude 'admin.json' "$ROOT/admin/" "$USER@$SERVER:$REMOTE_ROOT/admin/"

# 4) 上传 downloads/（更新包 + 元数据）— 云端权威副本
echo "==> 上传 downloads/（更新元数据云端副本）"
rsync -az --delete "$ROOT/downloads/" "$USER@$SERVER:$REMOTE_ROOT/downloads/"

# 5) 上传配置模板（__DEPLOY_ROOT__ 占位符注入 REMOTE_ROOT，便于迁移到服务器/正式网址）
echo "==> 上传 nginx / systemd 配置（注入 REMOTE_ROOT=$REMOTE_ROOT）"
scp "$ROOT/deploy/nginx-manager.conf" "$USER@$SERVER:/etc/nginx/conf.d/cub3d.conf"
ssh "$USER@$SERVER" "sed -i 's#__DEPLOY_ROOT__#$REMOTE_ROOT#g' /etc/nginx/conf.d/cub3d.conf && nginx -t && systemctl reload nginx"
scp "$ROOT/deploy/cub3d-manager.service" "$USER@$SERVER:/etc/systemd/system/cub3d-manager.service"
ssh "$USER@$SERVER" "sed -i 's#__DEPLOY_ROOT__#$REMOTE_ROOT#g' /etc/systemd/system/cub3d-manager.service && systemctl daemon-reload"

# 5.5) 修复上传后权限（SFTP/rsync 以 root 上传，运行用户为 www-data，需可读可执行，否则静态资源 403/404、白屏）
echo "==> 修正云端文件权限（www-data 可读）"
ssh "$USER@$SERVER" "chown -R www-data:www-data '$REMOTE_ROOT' && find '$REMOTE_ROOT' -type d -exec chmod 755 {} + && find '$REMOTE_ROOT' -type f -exec chmod 644 {} + && chmod 644 '$REMOTE_ROOT/admin/admin.json' && echo '权限已修正'"

# 6) 重启管理端服务（systemd 或 pm2；按服务器现状）
echo "==> 重启管理端服务"
ssh "$USER@$SERVER" "cd '$REMOTE_ROOT/admin' && (pm2 restart cub3d-manager 2>/dev/null || systemctl restart cub3d-manager 2>/dev/null || echo '请手动启动: node server.mjs')" || true

echo "==> 部署完成。管理端: https://cub3d-editor.cn/admin/  更新源: https://cub3d-editor.cn/downloads/update-doc.json"
echo "==> (IP 过渡兜底: http://$SERVER/admin/ ；域名不可达时客户端自动降级)"
