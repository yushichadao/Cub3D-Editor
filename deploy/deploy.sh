#!/usr/bin/env bash
# deploy/deploy.sh — 云端一键部署（从零重建，仓库内）
#
# 云端根（现在 139.196.104.56，备案后切 cub3d-editor.cn）：
#   /www/wwwroot/139.196.104.56
# 职责：
#   1) 首次部署生成 downloads/ 元数据云端权威副本（从零重建）
#   2) 上传 admin/ 管理端到服务器并重启服务
#   3) 上传 downloads/ 更新包与元数据
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
ssh "$USER@$SERVER" "mkdir -p '$REMOTE_ROOT/downloads' '$REMOTE_ROOT/admin' && echo '云端目录就绪'"

# 2) 上传 downloads/（更新包 + 元数据）— 云端权威副本
echo "==> 上传 downloads/（更新元数据云端副本）"
rsync -az --delete "$ROOT/downloads/" "$USER@$SERVER:$REMOTE_ROOT/downloads/"

# 3) 上传 admin/ 管理端（含 server.mjs / public / package.json）
echo "==> 上传 admin/ 管理端"
rsync -az --exclude 'node_modules' --exclude 'data' "$ROOT/admin/" "$USER@$SERVER:$REMOTE_ROOT/admin/"

# 4) 重启管理端服务（systemd 或 pm2；按服务器现状）
echo "==> 重启管理端服务"
ssh "$USER@$SERVER" "cd '$REMOTE_ROOT/admin' && (pm2 restart cub3d-admin 2>/dev/null || systemctl restart cub3d-admin 2>/dev/null || echo '请手动启动: node server.mjs')" || true

echo "==> 部署完成。管理端: https://$SERVER/manager/  更新源: https://$SERVER/downloads/update-doc.json"
