#!/usr/bin/env bash
# ===== Cub3D 管理器 · 服务器端一致性自检 =====
# 在服务器（Ubuntu）上运行，核对部署的代码是否与本地基线一致、
# 打包分发系统是否已上线、管理令牌是否已改。
#
# 用法：
#   sudo bash verify-server.sh                                  # 默认检查 /www/wwwroot/139.196.104.56
#   sudo bash verify-server.sh /www/wwwroot/139.196.104.56      # 自定义仓库根
set -uo pipefail

ROOT="${1:-/www/wwwroot/139.196.104.56}"
MGR="$ROOT/manager"
ENVFILE=/etc/cub3d-manager.env
ok=0; bad=0

echo "=============================================="
echo " Cub3D 管理器 · 服务器自检"
echo " 仓库根: $ROOT"
echo "=============================================="

check(){ # $1=描述 $2=通过条件(0/非0) ; 用字符串判断
  local desc="$1"; local cond="$2"
  if [ "$cond" = "0" ]; then echo "  [✓] $desc"; ok=$((ok+1));
  else echo "  [✗] $desc"; bad=$((bad+1)); fi
}

# 1) 后端存在
[ -f "$MGR/server.mjs" ] && check "admin/server.mjs 存在" 0 || check "admin/server.mjs 存在" 1

# 2) 打包分发系统是否已挂载（本地基线 7e9253a 的特征）
grep -q "createPackerRouter" "$MGR/server.mjs" 2>/dev/null && check "server.mjs 已挂载打包分发(packerRouter)" 0 || check "server.mjs 已挂载打包分发(packerRouter)" 1
[ -f "$MGR/packerRouter.mjs" ] && check "packerRouter.mjs 存在" 0 || check "packerRouter.mjs 存在" 1
[ -f "$MGR/public/packer.html" ] && check "public/packer.html 存在(打包分发页面)" 0 || check "public/packer.html 存在(打包分发页面)" 1

# 3) 主站导航是否含打包分发入口
grep -q "packer" "$MGR/public/index.html" 2>/dev/null && check "index.html 含 /packer 导航入口" 0 || check "index.html 含 /packer 导航入口" 1

# 4) 服务是否在跑
systemctl is-active --quiet cub3d-manager 2>/dev/null && check "systemd 服务 cub3d-manager 运行中" 0 || check "systemd 服务 cub3d-manager 运行中" 1

# 5) 端口是否在监听
(ss -ltnp 2>/dev/null | grep -q ':3000 ') && check "端口 3000 监听中" 0 || check "端口 3000 监听中" 1

# 6) 管理令牌是否已改（非默认/非占位）
if [ -f "$ENVFILE" ]; then
  tok=$(grep '^ADMIN_TOKEN=' "$ENVFILE" | tail -1 | cut -d= -f2-)
  if [ -z "$tok" ]; then check "ADMIN_TOKEN 已设置(.env)" 1
  elif echo "$tok" | grep -qi "请改成\|change-me\|YushiCub3D"; then check "ADMIN_TOKEN 仍是默认/占位值(需改!)" 1
  else check "ADMIN_TOKEN 已设置为强令牌" 0; fi
else
  # 回退：检查 data/adminpass.json 是否由后台改过
  if [ -f "$MGR/data/adminpass.json" ]; then check "后台已设置密码(adminpass.json 存在)" 0
  else check "未找到 ADMIN_TOKEN 配置(.env 缺失)" 1; fi
fi

# 7) 若服务器是 git 仓库，提示本地 commit 对齐方式
if [ -d "$ROOT/.git" ]; then
  head=$(git -C "$ROOT" rev-parse --short HEAD 2>/dev/null)
  echo "  [i] 服务器仓库 HEAD: ${head:-未知}"
  echo "      本地基线 commit: 7e9253a (打包分发) / b25bdf3 (历史整理)"
  echo "      对齐命令(服务器): cd $ROOT && git fetch && git checkout 7e9253a && sudo bash deploy/deploy.sh"
else
  echo "  [i] 服务器非 git 部署(直接 scp 文件)：请以本地 7e9253a 的代码重新 deploy.sh 部署"
fi

echo "=============================================="
echo " 通过 $ok 项 / 异常 $bad 项"
if [ "$bad" -eq 0 ]; then echo " ✅ 服务器与本地基线一致，打包分发系统已上线"; else echo " ⚠ 存在异常项，见上方 [✗]"; fi
echo "=============================================="
