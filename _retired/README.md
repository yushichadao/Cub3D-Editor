# _retired/ — 退役归档区（更新能力 / 服务器管理系统）

本目录集中存放已从主工程**撤除**的更新能力与服务器管理系统相关文件，
原样保留、不参与主工程构建与运行，以备后续复用或参考。

> 归档时间：2026-08-25
> 撤除原因：项目不再提供在线更新能力，同时撤除配套的服务器管理系统、短版本号与对外版本号显示。

---

## 一、归档清单

| 归档路径 | 原路径 | 内容说明 |
|---|---|---|
| `_retired/admin/` | `admin/` | 服务器管理系统（更新管理器后端 + 前端页面）：`server.mjs`、`portalRouter.mjs`、`releaseRouter.mjs`、`packerRouter.mjs`、`fsRouter.mjs`、`auth.mjs`、`local-packer.mjs`、`admin.json`、`public/*.html`、`package.json` 等 |
| `_retired/deploy/` | `deploy/` | 服务器部署脚本：`deploy-local.mjs`、`deploy.sh`、`nginx-manager.conf`、`cub3d-manager.service`、`verify-server.sh` 及部署文档 |
| `_retired/downloads/` | `downloads/` | 发布产物与更新元数据：`update-doc.json`、`versions.json`、`version.txt`、`build-log.txt`、`1.0.0/`（历史安装包）、`data/`（运行时数据） |
| `_retired/docs/CLOUD-AND-API.md` | `docs/CLOUD-AND-API.md` | 云端部署与更新 API 文档 |
| `_retired/tools/publish-updates.mjs` | `tools/publish-updates.mjs` | 发布更新文档/版本元数据工具 |
| `_retired/tools/release.mjs` | `tools/release.mjs` | 三端打包 + GitHub Release 发布工具 |
| `_retired/tools/publish-pages.mjs` | `tools/publish-pages.mjs` | GitHub Pages 境外更新源核对/同步工具 |
| `_retired/tools/gen-update-sources.mjs` | `tools/gen-update-sources.mjs` | 更新源浏览器版生成脚本 |
| `_retired/shared/infra/update-sources.mjs` | `shared/infra/update-sources.mjs` | 更新源唯一真源（UPDATE_SOURCES：cn/cnDomain/intl/githubProxy） |
| `_retired/shared/infra/update-sources.js` | `shared/infra/update-sources.js` | 更新源浏览器版（生成产物） |
| `_retired/update-sources/{web,pc,android}/update-sources.js` | 三端同名文件 | 三端更新源副本 |
| `_retired/scripts-updater/{web,pc,android}/updater.mjs` | 三端 `scripts/updater.mjs` | 更新器共享模块副本 |
| `_retired/shared/scripts/updater.mjs` | `shared/scripts/updater.mjs` | 更新器共享模块真源 |
| `_retired/github-workflows/pages.yml` | `.github/workflows/pages.yml` | GitHub Pages 站点部署（含 downloads/ 更新元数据复制步骤） |
| `_retired/_build-release.ps1` | `_build-release.ps1` | 一次性本地打包脚本（产物写 downloads/） |
| `_retired/start-packer.cmd` | `start-packer.cmd` | 本地打包代理启动器（连接 admin/local-packer.mjs） |
| `_retired/dy` | `dy` | 管理端 API 探测残留文件 |

> 说明：`admin/` 归档目录中保留了 `node_modules/`、`data/`、`pack-state/`、`.packerrc` 等运行时产物，
> 其中依赖与数据由 `_retired/.gitignore` 忽略，不入库；恢复使用时在 `_retired/admin/` 内执行 `npm install` 即可重建依赖。

## 二、主工程同步撤除的内容

- 三端 `index.html`（web / pc / android）：更新检测逻辑、更新提示/确认弹窗、「检查更新」入口、更新下载状态机、相关 CSS 与 i18n 键
- 短版本号 `__CUB3D_VERSION__`（X.X.X）的定义、注入与全部对外界面显示（保留长版本 `__CUB3D_LONG__` / `BOOTV`）
- PC 端 Electron 主进程 `updater:*` IPC 与 preload 中的 `desktop.updater` 桥、`__CUB3D_VERSION__` 注入
- 构建链路：`tools/sync-shared.mjs` 的「更新源单一化」段、`tools/inject-version.mjs` 的短版本号注入分支、根 `package.json` 的 `deploy` 脚本、`.gitignore` 中对已归档目录的规则
- 文档：`readme.md`、`docs/STANDARDS.md`、`wiki/` 中关于更新/发布/管理端的描述

## 三、恢复指引（如需复用）

1. 将对应目录/文件从 `_retired/` 移回原路径（`git mv` 或普通移动均可）。
2. 恢复构建链路中被删除的段落：
   - `tools/sync-shared.mjs`：恢复「2.2 更新源单一化」段（`gen-update-sources.mjs` + 三端 `update-sources.js` 同步）；
   - `tools/inject-version.mjs`：恢复 `__CUB3D_VERSION__` 注入分支；
   - 根 `package.json`：恢复 `deploy` 脚本。
3. 恢复三端 `index.html` 中的更新 UI 与逻辑（建议从 git 历史还原：`git log --diff-filter=D -- <文件>` 找到删除前版本）。
4. 管理端：在 `_retired/admin/` 内 `npm install`，按 `_retired/deploy/` 文档重新部署。
5. 重新运行三端 `npm run sync` / `npm start` 验证。

## 四、归档完整性

- 归档均保留相对路径与 git 历史（`git mv` / 移动后可由 `git log -- <路径>` 追溯）。
- 主工程（`_retired/` 之外）已做全仓残留扫描，确保无对归档文件/更新系统/管理端的引用。
