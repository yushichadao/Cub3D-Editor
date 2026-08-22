# Cub3D Editor 工程命名规范（草案 · 待审）

> 状态：**草案**。确认前**不**执行全局重命名。确认后由 `sync-shared` + 批量重命名脚本迁移，并跑 `_check_syntax.mjs` 校验三端。
> 适用范围：目录、文件、变量、键名（i18n）、分支、密钥、构建产物。
> 总原则：**ASCII 优先、语义化、去硬编码、相对路径、单一可信源**。

---

## 1. 目录命名

| 规则 | 说明 |
|------|------|
| 全小写 ASCII | 目录名只用 `[a-z0-9-]`，kebab-case，不用空格/中文/大写 |
| 语义化分区 | 按"职责"而非"端"平铺；分区见 §7 目录结构 |
| 不分端平铺 | 三端代码在 `web/ pc/ android/`，共享在 `shared/`，**禁止** `Web/` `PC/` `Android/` 大写 |
| 构建产物与源码分离 | `dist/`（web）、`out/`（pc）、`android/app/build/`（android）为构建产物，gitignore |
| 实验隔离 | 所有论证 demo、截图、实验数据进 `lab/`，**严禁**进 `web/ pc/ android/ manager/` 等产品面 |

### 1.1 现有目录 → 草案命名（迁移映射，已确认）

| 现状 | 草案 | 备注 |
|------|------|------|
| `Web/` | `web/` | 小写（已确认） |
| `PC/` | `pc/` | 小写（已确认） |
| `Android/` | `android/` | 小写（已确认） |
| `manager/` | `admin/` | 管理中枢（已确认重命名） |
| `shared/` | `shared/` | 单一可信源，不变 |
| `tools/` | `tools/` | 维护脚本，保留 |
| `wiki/` | `wiki/` | 文档，保留 |
| `downloads/` | `downloads/`（保留，云端权威副本源） | 更新元数据与包 |
| 根 `_new_*` `_cur_*` `_base_*` | 移入 `lab/_tmp/` 或直接删除（见清理清单） | 临时/调试文件，不入库 |
| `assets/` | `assets/`（保留） | 工程静态资源 |
| `auto-card.png` 等根散落图 | `assets/` | 收敛 |

---

## 2. 文件命名

| 规则 | 说明 |
|------|------|
| ASCII 优先 | 文件名 `[a-z0-9-.]`，kebab-case；不用中文、空格、全大写 |
| 语义化 | 见名知义：`update-sources.mjs`、`updater.mjs`、`version.json` |
| 类型后缀 | 脚本 `.mjs`（ESM）/`.js`；配置 `.json`；文档 `.md`；密钥 `.env` |
| 构建入口统一 | `build.mjs`（公共）、各端 `prebuild` 钩子复用，禁止散落重复构建步骤 |
| 临时/调试文件 | 前缀 `_`（如 `_diff.mjs`）仅允许在 `tools/` 或 `lab/`，根目录禁止散落 |

### 2.1 现有散落文件（根目录，待清理）

现状根目录存在大量调试/临时文件，违反本规范，列入 `清理清单.md`（T9）：
`_base_*` `_cur_*` `_new_*`（disclaimer/privacy/tos 多语言草稿）、`_diff.mjs` `_diff2.mjs` `_inspect.mjs` `_replace.mjs` `_verify2.mjs`、以及根散落图 `auto-card.png`。

---

## 3. 变量命名

| 作用域 | 约定 | 示例 |
|--------|------|------|
| JS 变量/函数 | camelCase | `currentTheme`、`resolveDoc`、`latestOf` |
| 常量（配置/环境） | UPPER_SNAKE（env）或 SCREAMING | `ADMIN_TOKEN`、`CUB3D_DOWNLOADS`、`__CUB3D_VERSION__` |
| CSS 变量 | kebab，前缀 `--` | `--accent`、`--bg-deep` |
| 主题 key | 小写 camel/kebab | `neon` `forest` `themeForest` |
| 构建注入常量 | 双下划线包裹 | `__CUB3D_PACKAGED__` `__CUB3D_VERSION__` |

---

## 4. 键名命名（i18n · 统一键名但差异化）

> 核心：键名在 `shared/i18n/index.js` 单一索引，各端差异通过**端覆盖文件**实现，不复制整段。键名全工程唯一、语义化、ASCII。

| 规则 | 说明 |
|------|------|
| 命名空间 | `domain.action.target` 三层，如 `update.check.button`、`about.version.label` |
| 全小写 ASCII | 用 `.` 分隔，不用中文键名、不用拼接字符串当键 |
| 端差异 | 同键不同文案 → 端覆盖文件（`web.js`/`pc.js`/`android.js`），不新建独立键 |
| 校验 | `sync-shared.mjs` 强制校验：缺键/多键/空值告警（九语言逐一比对） |
| 宣传页 vs 编辑器 | 两页键空间合并校验（E）：宣传页专用键并入语言包，不再整段内联 218KB |

### 4.1 键名示例

```
update.check.button     = "检查更新"
update.available.title  = "发现新版本"
about.ai.version.label  = "AI 声明版本"
env.warn.modal.title    = "当前环境不允许更新"
```

---

## 5. 分支约定

| 分支 | 用途 |
|------|------|
| `main` | 稳定发布态，仅供已打包产物来源 |
| `develop` | 集成开发 |
| `feat/<scope>` | 新功能，`<scope>` 用 kebab（如 `feat/update-sources`） |
| `fix/<scope>` | 修复 |
| `chore/<scope>` | 工程治理（如 `chore/restructure-dirs`） |
| `lab/<topic>` | 实验论证，合入前论证，不合入产品面 |

---

## 6. 密钥与配置命名

| 规则 | 说明 |
|------|------|
| 集中管理 | 全部密钥进 `secrets/.env`（真实值 gitignore），模板 `secrets/.env.example` 入库 |
| 变量名 | UPPER_SNAKE，语义化：`ADMIN_TOKEN` `GH_TOKEN` `BAIDU_TRANSLATE_APP_ID` `BAIDU_TRANSLATE_KEY` `CUB3D_DOWNLOADS` |
| 禁止硬编码 | 代码内不得出现真实密钥（现状 `manager/server.mjs`、`tools/publish-updates.mjs` 内联百度凭证 → 必须迁移） |
| 路径配置外置 | 云端根、域名、IP、分流规则在 `shared/infra/update-sources.mjs` 一处维护，不散落三端 |

---

## 7. 目标目录结构（草案 · 收敛后）

```
Cub3D Editor/
├── docs/            # 规范/说明书源（含本 STANDARDS.md）
├── shared/          # 单一可信源（i18n 索引 / version.json / infra / scripts / language / docs）
├── web/             # Web 客户端（原 Web/）
├── pc/              # PC 客户端（原 PC/，electron-builder 26）
├── android/         # Android 客户端（原 Android/，Capacitor 6）
├── admin/           # 管理中枢（原 manager/，本地+服务器双模）
├── tools/           # 维护脚本（sync-shared / build / publish）
├── lab/             # 实验隔离（demo + 截图归档 lab/assets/）
├── toolchain/       # Android JDK+SDK（仓库内，替代 ~/dev-tools）
├── secrets/         # 密钥模板（.env.example 入库，真实 .env 不入库）
├── deploy/          # 云部署脚本 + nginx 模板
├── downloads/       # 更新元数据 + 包（云端权威副本源）
├── assets/          # 工程静态资源（根散落图收敛于此）
├── dist/ out/       # 构建产物（gitignore）
├── THIRD-PARTY-LICENSES.md
└── package.json     # 根版本与脚本入口
```

---

## 8. 决策记录（已确认）

1. **管理中枢目录名**：改为 `admin/`（语义更清晰，需同步改所有引用路径）。
2. **`web/pc/android` 小写化**：接受（统一小写，符合 ASCII 优先；T2 执行时同步改构建脚本与引用路径）。

---

## 9. 违规即清理（T9 执行）

以下现状违反本规范，确认后列入 `清理清单.md` 并删除/迁移：
- 根目录 `_new_*`/`_cur_*`/`_base_*` 调试草稿（约 40 个文件）
- 根散落 `auto-card.png`
- `manager/server.mjs` + `tools/publish-updates.mjs` 内联百度翻译真实凭证
- `manager/server.mjs` 硬编码 `DEFAULT_ADMIN_TOKEN`
- `env-android.mjs` / `setup-android-sdk.ps1` 写死 `C:\Users\yushi\dev-tools`
- 三端 `HOSTS` 数组逐字重复 + 安卓 `http://` 明文假回退（A/T12 修）
