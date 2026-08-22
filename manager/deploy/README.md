# Cub3D 更新管理器 · 国内部署指南

管理后台（manager）已为部署设计，本目录提供 Ubuntu + nginx 的一键部署文件。

## 架构与客户端打通现状

客户端（PC/Android）的更新源 `HOSTS` 已内置两条国内源，均指向本管理器：

```js
{ name:'国内主站',    api:'https://cub3d-editor.cn/api/update',        dl:'https://cub3d-editor.cn/downloads/' },
{ name:'国内备用 IP', api:'http://139.196.104.56/manager/api/update',  dl:'http://139.196.104.56/manager/downloads/' },
```

因此**客户端无需改动**即可连本服务器。管理器同时支持两种挂载方式：
- 域名 `cub3d-editor.cn` 站点根（`BASE=''`，nginx 直接反代 `/api`、`/downloads`）
- 备用 IP `139.196.104.56/manager`（`BASE=''`，由 nginx `rewrite ^/manager/(.*) /$1` 去前缀后转发）

> 单实例 + nginx 去前缀即可同时满足两条 HOSTS，**无需跑两个进程**。

## 功能清单（部署后全部可用）

| 功能 | 接口/页面 | 说明 |
|------|-----------|------|
| 更新话术发布 | `/api/publish` `/api/status` `/api/delete` | 发布/停止/删除版本，多语言 notes（中文源 + 百度翻译 8 语） |
| 安装包上传/删除 | `/api/upload` `/api/delete-file` | 后台网页拖拽上传 exe/apk 到 `downloads/` |
| 客户端更新探测 | `/api/update?current=<ver>` | 公开只读，返回 `{ok,doc}`；跨域已放开 |
| 安装包下载 | `/downloads/<file>` | nginx 直传磁盘，支持大文件 |
| GitHub 镜像代理 | `/api/gh-releases` | 境内拉取 Releases 列表，多镜像重试 |
| 本地打包分发 | `/packer`（见下方说明） | 统一版本号、本地构建安装包、境内外分发，与更新话术系统共享登录态与 `downloads/` |

## 一键部署

```bash
# 在服务器（Ubuntu）上，仓库已 clone 到 /var/www/cub3d：
cd /var/www/cub3d/manager/deploy
sudo bash deploy.sh
```

脚本会：安装依赖 → 校验 `ADMIN_TOKEN` 已改 → 建 `downloads/` 并迁移数据 → 注册 systemd → 配 nginx → 启动。

首次部署前必须先创建 `/etc/cub3d-manager.env`（复制 `.env.example` 并填入真实 `ADMIN_TOKEN` 与 `CUB3D_DOWNLOADS`）：

```bash
sudo cp manager/deploy/.env.example /etc/cub3d-manager.env
sudo chmod 600 /etc/cub3d-manager.env
sudo nano /etc/cub3d-manager.env   # 改 ADMIN_TOKEN 为 openssl rand -hex 24
```

## 本地打包分发在 Linux 上的限制（重要）

`/packer` 调用 `npm run dist:setup`（electron-builder --win nsis）与 `npm run apk:release`。

- **Android APK**：Linux 上可正常构建，但需服务器预装 **JDK 17 + Android SDK + Gradle**，并在 `Android/` 下 `npm install`。
- **PC Windows exe**：electron-builder 在纯 Linux 上**默认打不出 Windows 包**（缺 wine/mono，官方不保证）。两种办法：
  1. 服务器装 `wine` + `mono` 后重试（不保证稳定）；
  2. **推荐**：在 Windows 开发机本地 `npm run dist:setup` 构建好 exe，再用后台「上传安装包」传到 `downloads/`。打包分发系统的「境内分发」会把它登记进 `update-doc.json`，与更新话术系统打通。

即：exe 走"本地构建 + 后台上传"，apk 可走"服务器构建"。两者最终都汇入 `downloads/` 与 `update-doc.json`。

## 目录迁移

首次部署时 `deploy.sh` 会把仓库 `downloads/` 下的安装包与 `update-doc.json` 复制到生产 `CUB3D_DOWNLOADS`（默认 `/var/www/cub3d/downloads`）。之后以生产目录为准，后台所有写操作都落在那里。

## 安全

- `ADMIN_TOKEN` **必须**改为强随机串（默认值 `YushiCub3D@2026` 仅本地开发用，部署脚本会拒绝使用占位值）。
- 写接口需 `X-Admin-Token`；公开接口（`/api/update`、`/api/state`、`/downloads`）放开 CORS 供客户端跨域拉取。
- `manager/data/`（后台改密等私有数据）已 gitignore，不入库。
- 如需 HTTPS，在 nginx 上层加 certbot（Let's Encrypt），反代仍指向 3000。

## 常用运维

```bash
systemctl status cub3d-manager      # 状态
journalctl -u cub3d-manager -f      # 日志
systemctl restart cub3d-manager     # 重启（改了 .env 后需 restart 才生效）
node tools/publish-updates.mjs --list   # 查看/发布版本（开发机侧）
```
