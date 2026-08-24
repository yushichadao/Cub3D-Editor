# 云端配置与内外接口文档

> 本文档基于代码实际内容整理，覆盖：云端部署配置、对外 HTTP 接口（admin 后端）、
> 对内进程间接口（PC Electron IPC / Android 原生桥 / 自定义协议）、客户端更新源分流。
> 所有条目均对应工程内真实注册或调用的代码，不含虚构接口。

---

## 一、云端部署配置

### 1.1 服务器与目录

| 项 | 当前值（备案过渡期） | 备案完成后 |
|---|---|---|
| 境内服务器 IP | `139.196.104.56` | 同 IP（域名解析到该 IP） |
| 境内域名 | 未解析（`cub3d-editor.cn` 备案中） | `https://cub3d-editor.cn/` |
| 站点根目录 | `/www/wwwroot/139.196.104.56/` | 同名同构，无需改目录 |
| 后端进程目录 | `/www/wwwroot/139.196.104.56/admin` | 同 |
| 安装包目录 | `/www/wwwroot/139.196.104.56/downloads` | 同 |

- 工程顶层与云端 `/www/wwwroot/139.196.104.56/` **保持同名同构**。
- admin 进程的 `ROOT` = admin 的上级目录 = 站点根，因此 `DOWNLOADS` 默认 = `ROOT/downloads`，
  与 nginx 静态目录**天然一致**。若显式设置 `CUB3D_DOWNLOADS`，必须指向同一目录。

### 1.2 对外端口与协议

| 服务 | 端口 | 协议 | 说明 |
|---|---|---|---|
| nginx 站点（境内） | 80 | HTTP | 当前仅开放 80；HTTPS 备案后启用 |
| admin 后端进程 | 由 `PORT` 环境变量 / 默认值 | HTTP | 反向代理后对外，CORS 全开（`Access-Control-Allow-Origin: *`） |

- 境内 `cn` 源用 `http://139.196.104.56`（IP 打开按境内站处理）。
- Android 端已在 `android/.../res/xml/network_security_config.xml` 对 `139.196.104.56`
  **精确放行明文**（`cleartextTrafficPermitted=true`，仅对该 IP，不开全局）；备案后改用 HTTPS 可移除该放行。
- 国际站：`https://yushichadao.github.io/Cub3D-Editor`（GitHub Pages，HTTPS）。

### 1.3 后端鉴权与环境变量

- 管理写操作鉴权：`X-Admin-Token` 请求头，值 = 当前管理密码（**不在此文档记录，另行保管**）。
- 账号 / 密码存储：后端 JSON 文件 `downloads/admin-config.json`（`admin.json` 为其出厂默认值）。
- 凭据管理机制：
  - 出厂默认账号为 `yushichadao`（见 `admin/admin.json` 与各 router 回退值）；默认口令为弱口令，**生产环境务必通过 `POST /admin/api/portal/passwd` 修改**。
  - 登录后保持登录态（令牌即当前密码）；可随时改密。
  - 密码为运营敏感信息，本文档不记录其具体取值；如需查看请查阅部署机上的 `downloads/admin-config.json` 或 `secrets/.env`（不入库）。
- 相关环境变量（`secrets/.env.example`）：
  - `CUB3D_DOWNLOADS`：安装包目录（默认 `ROOT/downloads`）
  - `DEPLOY_HOST` / `DEPLOY_ROOT`：rsync 部署目标（默认 `139.196.104.56` / `/www/wwwroot/139.196.104.56`）
  - `CORS_ALLOW`：CORS 白名单（默认含 `https://cub3d-editor.cn,http://139.196.104.56`）
  - `GH_TOKEN` / `GH_REPO`：GitHub Releases 上传令牌与仓库（默认 `cub3d-editor/cub3d-editor`）

### 1.4 部署方式

- **全量同步**：`deploy/deploy.sh`（env `DEPLOY_USER`/`DEPLOY_HOST`）→ rsync 到云 → scp `nginx-manager.conf` → reload nginx。
- **本地一键发布**：`deploy/deploy-local.mjs`（见 §3.4），支持 `--github` / `--web` 上境外与 web 云。
- **systemd 服务**：`deploy/cub3d-manager.service`，`WorkingDirectory` 必须为 `/www/wwwroot/139.196.104.56/admin`。
- **nginx 配置**：`deploy/nginx-manager.conf`，`server_name 139.196.104.56; root /www/wwwroot/139.196.104.56;`。

---

## 二、对外 HTTP 接口（admin 后端）

所有路由挂载于 admin 进程；`server.mjs` 将 `/admin/api/*` 归一为 `/api/*` 再分发到三个子系统。
CORS 全部 `Access-Control-Allow-Origin: *`。

### 2.1 门户 / 鉴权 `portalRouter.mjs`（前缀 `/admin/api/portal`）

| 方法 | 路径 | 鉴权 | 作用 |
|---|---|---|---|
| POST | `/admin/api/portal/login` | 否 | 登录验证，成功返回 `token`（=密码） |
| GET | `/admin/api/portal/auth-check` | 是 | 令牌校验 |
| POST | `/admin/api/portal/passwd` | 是 | 修改管理密码 |

### 2.2 发布更新信息 `releaseRouter.mjs`（前缀 `/admin/api/release`）

| 方法 | 路径 | 鉴权 | 作用 |
|---|---|---|---|
| GET | `/admin/api/release/update` | 否 | 公开更新探测（`?current=X&channel=stable`） |
| GET | `/admin/api/release/state` | 否 | 完整版本 / 文件状态 |
| GET | `/admin/api/release/gh-releases` | 否 | GitHub Releases 代理（客户端不直接连 GitHub） |
| POST | `/admin/api/release/publish` | 是 | 发布 / 更新版本元数据 |
| POST | `/admin/api/release/status` | 是 | 变更版本状态 |
| POST | `/admin/api/release/delete` | 是 | 删除版本 |
| POST | `/admin/api/release/upload` | 是 | 上传安装包（multipart，限速 40/分），落盘 `downloads/` |
| POST | `/admin/api/release/delete-file` | 是 | 删除 `downloads/` 安装包文件 |

### 2.3 打包分发 `packerRouter.mjs`（前缀 `/admin/api/packer`）

| 方法 | 路径 | 鉴权 | 作用 |
|---|---|---|---|
| GET | `/admin/api/packer/state` | 否 | 打包状态 / 版本号 / 包类型 |
| POST | `/admin/api/packer/version` | 是 | 设置统一版本号 |
| POST | `/admin/api/packer/pack` | 是 | 触发**服务器本机**打包（`npm run dist:setup` 等） |
| POST | `/admin/api/packer/distribute` | 是 | 分发：cn→rsync 上云；github→GH Releases；web→git push |
| POST | `/admin/api/packer/register` | 是 | 把 `downloads/` 已存在文件登记进版本元数据 |

### 2.4 静态 / 兼容端点（`server.mjs` 直接处理）

- `/admin/downloads/<file>`、`/downloads/<file>` — 安装包静态下载（公开）
- `/admin/version.json`、`/version.json` — 轻量版本探测备选（公开）
- `/admin/version.txt`、`/version.txt` — 版本号文本（公开）
- `/admin`、`/admin/update`、`/admin/packer` 及 `/admin/*` — 后台静态页面
- 旧路径 308 重定向：`/api/*`、`/packer/api/*` → 新分区（`LEGACY_REDIRECT`）

### 2.5 服务端出站 HTTP（admin 主动调用外部）

- `releaseRouter` / `handleGhReleases` → `https://api.github.com/repos/cub3d-editor/cub3d-editor/releases` 及 ghproxy 镜像
- `packerRouter.ghApi` → GitHub Releases API（上传资产，需 `GH_TOKEN`）
- `packerRouter.gitCommitPush` → 本地 `git push origin main`（触发 GitHub Pages）

---

## 三、客户端更新源（三端共用）

来源：`shared/infra/update-sources.mjs`（构建期由 `gen-update-sources.mjs` 生成各端 `update-sources.js`，
即 `pc/`、`web/`、`android/` 各自的 `update-sources.js` 与 `web/update-sources.js`）。

客户端 `checkUpdate()` 按 **IP 区域**（cn / intl / unknown）从下列源依次 fetch，失败降级：

| 源 key | base | updateApi / docPath | 状态 |
|---|---|---|---|
| `cn` | `http://139.196.104.56/admin` | `…/api/release/update` + `…/downloads/update-doc.json` | 启用（境内权威源，已对 IP 精确放行明文） |
| `cnDomain` | `https://cub3d-editor.cn/admin` | 同结构 | `enabled=false`（备案后启用） |
| `intl` | `https://yushichadao.github.io/Cub3D-Editor` | `…/downloads/update-doc.json` | 启用（GitHub Pages） |
| `githubProxy` | 同源 | `/admin/api/release/gh-releases` | 启用 |

拉取顺序 `buildFetchOrder(region)`：
- cn → `[cnDomain, cn, intl, githubProxy]`
- intl → `[intl, cnDomain, cn, githubProxy]`
- unknown → `[cn, cnDomain, intl, githubProxy]`

---

## 四、PC 端 Electron 接口（对内）

### 4.1 自定义协议 `app://`（protocol.js）

- 注册 privileged scheme `app://`，handler 处理 `app://local/*`，加载应用内资源
  （`shell/sticky.html`、`language/*.js`、three 引擎等）。页面资源加载的底层通道。

### 4.2 IPC（主进程 ⇄ 渲染进程，preload 经 contextBridge 暴露为 `window.api.*`）

来源：`pc/electron/ipc.js`（`ipcMain.handle / ipcMain.on`）。

- **应用 / 窗口**：`app:info`、`net:fetch`（主进程代发 HTTP，绕过混合内容拦截）、
  `window:minimize`、`window:toggle-maximize`、`window:close`、`window:force-close`、
  `window:toggle-fullscreen`、`window:state`、`window:set-title`、`window:set-progress`
- **配置**：`config:get`、`config:set`、`config:all`
- **文件**：`file:open-scene`、`file:save-scene`、`file:save-image`、`file:save-json`、
  `file:pick-image`、`file:write-image`、`file:autosave`、`file:list-autosaves`、
  `file:last-session`、`file:clear-last-session`、`file:read-dropped`、`file:reveal`、
  `file:open-data-folder`、`file:current`、`file:set-current`
- **语言包**：`langpack:sync-packs`（on，同步注入）、`langpack:list`、`langpack:install`、
  `langpack:install-dir`、`langpack:remove`、`langpack:export-template`、`langpack:manual-url`、`langpack:open-folder`
- **杂项**：`shell:open-external`、`updater:save`、`updater:list`、`updater:open`、
  `clipboard:write-text`、`clipboard:read-text`、`dialog:message`、`theme:set-native`

### 4.3 主进程 → 渲染进程主动推送（`webContents.send`）

`window:state`、`app:before-close`（渲染层回 `app:before-close-ack`）、
`langpack:changed`、`sticky:sync`、`updater:progress` / `updater:downloaded` / `updater:error`

---

## 五、Android 端原生桥（Java ↔ WebView）

来源：`android/.../MainActivity.java`，通过 `@JavascriptInterface` 注入 4 个桥对象，
由 `android/index.html` 调用。

| 桥对象 | 方法 | 作用 | 回传 |
|---|---|---|---|
| `AndroidSaver` | `save(json, filename, callbackId)` | 系统 SAF 保存场景 JSON | `window.__androidSaverResult(id, ok)` |
| `AndroidExit` | `finish()` | 退出应用 | — |
| `AndroidImporter` | `open(callbackId)` | 系统 SAF 打开文件 | `window.__androidImporterResult(cbId, ok)` + `window.__androidImporterContent` |
| `AndroidImageSaver` | `save(dataURL, filename, callbackId)` | 系统 SAF 保存 PNG 截图 | `window.__androidImageSaverResult(id, ok)` |

- 注入全局 `window.__DEVICE_NAME__`（厂商+型号，导出作者署名）
- 返回键统一入口：`window.__nativeBackPressed()`（物理键 / 手势 / 预测返回）

---

## 六、本地开发 HTTP 服务（仅 dev，非对外）

`web/scripts/_serve.mjs`、`pc/scripts/_serve.mjs`、`android/scripts/_serve.mjs`、
`shared/scripts/_serve.mjs` — 各自 `localhost` 静态服务（`createServer().listen`）。

---

## 七、部署 / 发布数据流

### 7.1 网页「打包上传页」(`admin/public/packer.html`)

- 「打包（本地构建）」→ `POST /api/packer/pack`：在**运行 admin 的服务器**本机编译出 exe/apk。
- 「分发到所选渠道」→ `POST /api/packer/distribute`：cn→rsync 上云；github→GH Releases；web→git push。
- 该页面**无本地文件选择**，不调用 `release/upload`；仅处理服务器本机产物。

### 7.2 本地一键发布 (`deploy/deploy-local.mjs`)

把"本地电脑工程文件"打包并上传到境内外 + web 云的一条命令：

```
本地电脑工程
  → (可选) npm run dist:* 构建出 exe/apk
  → release/upload          → 境内服务器 downloads/ → register 登记版本（境内分发）
  → --github                → GitHub Releases（境外，需 GH_TOKEN）
  → --web                   → 改 web/index.html 的 BOOTV + version.txt，git push origin main（Web/GitHub Pages）
```

调用示例：
```bash
npm run deploy -- --ver 1.3.0 --types pc-setup,pc-portable,android-apk --github --web --gh-token ghp_xxx
```
（根 `package.json` 已加 `deploy` 脚本 = `node deploy/deploy-local.mjs`）

---

## 八、关键说明 / 注意点

1. **门户系统仅鉴权**：`portalRouter` 只有 login / auth-check / passwd，没有公告/帮助/教程 CRUD。
2. **cn 境内源当前为 HTTP**：仅 IP 对 Android 精确放行明文；备案后切 HTTPS 即可移除放行。
3. **服务端写操作均需 `X-Admin-Token`**，值即管理密码；出厂默认口令为弱口令，生产务必通过改密接口替换（具体凭据另行保管，不写入本文档）。
4. **`packer/pack` 构建在服务器本机**，不直接消费"你本地电脑文件"；本地文件远程上传走 `release/upload`（CLI 端 `deploy-local.mjs` 使用，网页端未对接）。
5. **`gh-releases` 代理**用于客户端在 GitHub 不可达时回退到国内主站完成升级。
