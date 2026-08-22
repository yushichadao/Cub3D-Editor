# deploy/ — 云部署（仓库内，一键上传，从零重建）

云端已清空，一切从零重建。云端根：
- 现在：`/www/wwwroot/139.196.104.56`
- 将来（域名备案后）：`/www/wwwroot/cub3d-editor.cn`

内容：
- `deploy.sh` — 一键上传脚本（rsync/ssh）
- `nginx-manager.conf` — nginx 模板（含 `/manager` 透传、`CUB3D_DOWNLOADS` 指向云端 downloads）
- `verify-server.sh` — 服务器状态校验

首次部署由 deploy 脚本生成 `downloads/` 元数据云端权威副本。
