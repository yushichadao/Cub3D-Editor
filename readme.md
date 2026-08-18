# Cub3D Editor — 立方·3D设计工坊

一个**轻量化**的跨平台 3D/2D 场景编辑器，同一套代码同时覆盖网页、Windows 桌面、Android 三端。支持简体中文、繁體中文、English、日本語、한국어、Русский、Español、Français、العربية（阿拉伯语）九种语言。

> 从零基础涂鸦到进阶参数化建模，所有平台的 `.json` 工程文件互通，可在手机起草、电脑精修之间自由接力。

---

## 平台与形态

同一代码库根据设备自动适配不同形态：

| 形态 | 平台 | 入口 | 典型设备 |
| :--- | :--- | :--- | :--- |
| 网页·鼠标 | Web（编辑器） | 浏览器直接打开 `/Web/` | 台式机、笔记本 |
| 网页·触屏 | Web（编辑器） | 浏览器触摸设备，或 URL 加 `?touch` | 手机、平板浏览器 |
| PC 桌面版 | Windows | `.exe` 安装版 / 便携版 | Windows 电脑 |
| Android 移动版 | Android | `.apk` 安装 | 安卓手机、平板 |

网页版同时提供鼠标与触屏两种布局，合计三种平台、四种使用形态。

---

## 快速开始

- **主页（宣传页）**：<https://cub3d-editor.cn/>（境内，国内直连推荐）或 <https://yushichadao.github.io/Cub3D-Editor/>（境外）—— 产品介绍、九语言切换、下载入口
- **网页版编辑器（无需安装）**：<https://cub3d-editor.cn/Web/index.html>（境内）或 <https://yushichadao.github.io/Cub3D-Editor/Web/index.html>（境外）
- **PC 版**：下载 `Cub3D-Editor-Setup.exe`（安装版）或 `Cub3D-Editor-Portable.exe`（便携版，免安装）
- **Android 版**：允许"未知来源"后，安装 `Cub3D-Editor.apk`

导出为 `.json` 的工程文件在三端之间通用。

---

## 下载与发布

各平台的正式版安装包统一命名为通用名，**作为 GitHub Releases 附件发布，不再随源码入库**（当前版本 `v1.1.0`）：

| 产物 | 说明 |
| :--- | :--- |
| `Cub3D-Editor-Setup.exe` | Windows 安装版 |
| `Cub3D-Editor-Portable.exe` | Windows 便携版（免安装） |
| `Cub3D-Editor.apk` | Android 安装包（release 签名，包名 `com.cub3deditor.app`） |

下载入口：<https://github.com/yushichadao/Cub3D-Editor/releases/latest> —— 宣传页与说明书里的「下载」按钮默认跳转到最新 Release 的对应附件；境内站点（cub3d-editor.cn）联通后，「下载」按钮自动改指 `https://cub3d-editor.cn/downloads/` 下的镜像文件。

> 注：安装包不再进 git，因此 `.git` 不会再因反复打包而膨胀；各端自身的 `dist/`、`build/`、`node_modules/` 按 `.gitignore` 规则忽略。Android 签名密钥 `release.keystore` 不入库，请自行备份。发布新版本请运行 `tools/release.mjs`（自动构建三端产物并上传为 Release 附件）：
>
> ```powershell
> node tools/release.mjs          # 默认按 package.json 的 version 发布，如 v1.0.0
> node tools/release.mjs 1.1.0    # 指定版本
> node tools/release.mjs --replace # 已存在同名 Release 时删除重建
> ```

---

## 主要功能

- **3D 与 2D 绘制**：画笔、橡皮擦（整体/局部）、形状工具
- **对象操作**：移动、旋转、缩放；撤销/重做、复制/粘贴/克隆
- **材质编辑**：预设与自定义颜色、图案/纹理贴图
- **文本框**：多字体（随语言切换）、横排/竖排、粗细
- **视图辅助**：坐标轴、网格、地面参考面、线框模式
- **PC 版增强**：崩溃恢复、拖放打开、自动保存/会话恢复、置顶便签窗
- **Android 版增强**：全屏运行、返回键确认、导出 PNG 截图与 `.json` 场景

---

## 多语言

界面与说明书均支持九种语言（简体中文、繁體中文、English、日本語、한국어、Русский、Español、Français、العربية），切换时文案与文档同步变更。

说明书源文件位于 `shared/docs/`，以简体中文版为基准：

| 文件 | 语言 |
| :--- | :--- |
| `使用说明书.md` | 简体中文（基准） |
| `使用說明書_zh-TW.md` | 繁體中文 |
| `使用说明书_en.md` | English |
| `使用説明書_ja.md` | 日本語 |
| `사용설명서_ko.md` | 한국어 |
| `使用说明书_ru.md` | Русский |
| `使用说明书_es.md` | Español |
| `使用说明书_fr.md` | Français |
| `使用说明书_ar.md` | العربية |

各端 `docs/` 目录均为同步生成的副本，**请勿直接编辑**。修改统一在 `shared/docs/` 进行，完成后运行：

```powershell
node tools/sync-shared.mjs
```

界面语言文案集中维护在 `shared/language/`（`en.js` / `ja.js` / `zh-TW.js` / `ko.js` / `ru.js` / `es.js` / `fr.js` / `ar.js`，简体中文为内置默认值）。

---

## 项目结构

```
Cub3D Editor/
├── index.html              # 宣传页 / 主页（九语言，内联 i18n，由 Pages 发布到站点根）
├── shared/                 # 各端共享的「单一源」
│   ├── docs/               # 九语言说明书源文件
│   ├── language/           # 界面语言文案
│   ├── infra/              # 三端一致的基础设施（LICENSE、server 等）
│   ├── scripts/            # 共享脚本
│   ├── three/              # Three.js 模块与示例
│   ├── fonts/              # 跨端字体（如阿拉伯语 Noto Kufi）
│   └── icons/              # 立方系列图标（宣传页 / 站点用 SVG）
├── Web/                    # 网页版编辑器（由 Pages 发布到 /Web/）
├── PC/                     # Windows 桌面版（Electron + electron-builder）
│   └── electron/           # Electron 主进程
├── Android/                # Android 版（Capacitor）
│   └── android/            # Capacitor 原生工程（含 release.keystore 签名，不入库）
├── tools/                  # 仓库维护脚本（同步 / 语言包 / 校验 / 发布）
│   ├── sync-shared.mjs     # 同步 shared/ → 各端 + 生成语言包
│   ├── release.mjs         # 构建三端产物并发布为 GitHub Release 附件
│   ├── check_manual.mjs    # 说明书 ↔ 界面文案一致性校验
│   ├── _check_syntax.mjs   # 三端 index.html 语法检查
│   ├── sync-wiki.mjs       # 同步 wiki/Home.md 到 GitHub Wiki
│   ├── _i18n_en.mjs        # 英文文案生成
│   ├── _i18n_ja.mjs        # 日文文案生成
│   ├── _i18n_zh-TW.mjs     # 繁体中文文案生成
│   ├── _i18n_ko.mjs        # 韩文文案生成
│   ├── _i18n_ru.mjs        # 俄文文案生成
│   ├── _i18n_es.mjs        # 西班牙语文案生成
│   ├── _i18n_fr.mjs        # 法语文案生成
│   ├── _i18n_ar.mjs        # 阿拉伯语文案生成（简体中文为内置默认，无需对应脚本）
│   ├── _extract_legal.mjs  # 生成九语言法律条款（assets/legal-i18n.js）
│   └── _gen_placeholders.mjs # 生成宣传页占位图（og:image 等）
```

---

## 构建指引

所有平台构建前请先同步共享资源：

```powershell
node tools/sync-shared.mjs
```

各端的 `npm start` / `npm run dist` 已通过 `pre*` 钩子自动执行同步。

### Web 版

```powershell
cd Web
npm start          # 启动本地服务器 http://localhost:8090
```

### PC 版（Windows .exe）

```powershell
cd PC
npm install
npm run dist            # 同时产出安装版 + 便携版
npm run dist:setup      # 仅安装版
npm run dist:portable   # 仅便携版
```

产物位于 `PC/dist/`。

### Android 版（.apk）

环境要求：JDK 17 与 Android SDK（build-tools 34、Android Platform 34、platform-tools）。

`scripts/env-android.mjs` 按以下顺序探测工具链：
1. 环境变量 `JAVA_HOME` / `ANDROID_HOME`
2. 默认回退到用户目录下的 `dev-tools`：`~/dev-tools/jdk17` 与 `~/dev-tools/android-sdk`

```powershell
cd Android
npm install
npm run keystore        # 首次构建前生成签名密钥（CN=Cub3D Editor）
npm run apk:release     # 构建 release 签名版 Cub3D-Editor.apk
npm run apk:debug       # 调试包
```

> 注：若本机启用了文件删除防护（如部分 IDE 会拦截 `cap sync` 的批量删除），构建时请临时关闭该防护（例如设置 `CODEBUDDY_SAFE_DELETE_ENABLED=0`），否则 `cap sync` 会中断。

产物位于 `Android/dist/Cub3D-Editor.apk`；发布时由 `tools/release.mjs` 收集，与 PC 版一起作为 GitHub Release 附件上传（不再复制到仓库根 `dist/`）。

### 部署到 GitHub Pages

仓库根 `index.html`（宣传页）与 `Web/`（网页版编辑器）由 `.github/workflows/pages.yml` 在 push 到 `main` 时自动聚合发布：

- `/` → 宣传页（产品介绍、九语言切换、下载入口）
- `/Web/` → 网页版编辑器

**安装包不随站点发布**：PC / Android 安装包由 `tools/release.mjs` 上传到 GitHub Releases，宣传页的「下载」按钮指向 `releases/latest/download/` 对应附件。修改上述任一目录并推送即触发部署。

### 部署到境内站点（cub3d-editor.cn）

境内站点与境外 GitHub Pages 共用同一份静态代码（宣传页按域名自动切换下载链接、版本信息与 ICP 显示），部署到轻量云服务器。`cub3d-editor.cn` 需要 **ICP 备案**；备案号取得后填入 `index.html` 顶部 `SITE.cn.icp` 字段，境内页脚即自动显示，境外 GitHub Pages 自动隐藏。

> **备案过渡期（当前状态）**：`cub3d-editor.cn` 的 ICP 备案尚未完成，域名暂不解析，境内访问临时使用 `http://139.196.104.56/`（即本服务器站点根目录 `/www/wwwroot/139.196.104.56/`）。代码已将该 IP 识别为境内站（ICP 框显示、下载走站内 `downloads/`、主页链接指向当前站），本文档中的域名引用保持不变。备案完成后将 A 记录解析到该 IP，页面经 `location.origin` 自动以域名继续工作，**无需改码**。

部署步骤：

1. **备案与解析**：完成 ICP 备案后，将 `cub3d-editor.cn` 的 A 记录解析到轻量云服务器公网 IP（备案完成前，站点根目录内容已可先通过 IP 直接访问）。
2. **上传静态产物**：将仓库根下列文件/目录上传到服务器站点根目录：
   - `index.html`（宣传页，含境内外链接自适应与 IP 自动分流）
   - `Web/`（网页版编辑器）
   - `assets/`（宣传页与法律页静态资源）
   - `legal-tos.html` / `legal-disclaimer.html` / `legal-privacy.html`（法律页）
   - `.nojekyll`（如使用 GitHub Pages 产物则已包含）
3. **配置 HTTPS**：为 `cub3d-editor.cn` 签发免费证书（如 Let's Encrypt 或云厂商免费证书）。
4. **放置安装包与版本信息**：将 `Cub3D-Editor-Setup.exe`、`Cub3D-Editor-Portable.exe`、`Cub3D-Editor.apk` 及 `versions.json` 放入站点根目录的 `downloads/`，境内页面的「下载」按钮即自动指向 `https://cub3d-editor.cn/downloads/<文件名>`，版本/体积信息从 `versions.json` 读取。

`downloads/versions.json` 约定格式（`assets` 键为文件名 → 字节数）：

```json
{ "version": "v1.1.0", "assets": { "Cub3D-Editor-Setup.exe": 100672045, "Cub3D-Editor-Portable.exe": 90580208, "Cub3D-Editor.apk": 4274504 } }
```

> 注：境内站 `downloads/` 未放置文件前，下载按钮与版本信息自动回退到 GitHub Releases；安装包镜像与服务器联通为后续阶段工作。

本地预览（从仓库根启动静态服务器即可同时看到宣传页与编辑器）：

```powershell
# 任意静态服务器均可，例如 Python 内置服务器：
python -m http.server 8090
# 浏览器访问：
#   宣传页  http://localhost:8090/
#   编辑器  http://localhost:8090/Web/
```

---

## 校验

```powershell
node tools/sync-shared.mjs     # 同步 shared/ → 各端 + 生成语言包
node tools/check_manual.mjs    # 核对说明书中的界面名词是否与代码一致
```

`tools/check_manual.mjs` 会列出说明书提到但在界面文案中找不到匹配的名词，供人工判断是否需要修正。部分教学用语（如"想一想"）属于正常误报。

---

## 技术栈

| 层级 | 技术 |
| :--- | :--- |
| 3D 渲染 | Three.js (ES Module) + WebGL |
| PC 桌面 | Electron 43 + electron-builder 26 |
| Android | Capacitor 6 |
| Web 部署 | GitHub Pages / Vercel |
| 多语言 | 自定义 i18n 脚本 |

---

## 支持与捐赠

Cub3D Editor 由独立开发者维护，**完全免费、无广告、离线可用**。如果你觉得它对创作有帮助，欢迎通过爱发电赞助支持：

- **爱发电主页**：<https://afdian.com/a/cub3d-editor>

每一份支持都会用于服务器的维护、构建工具链与持续的开发投入。感谢你的鼓励！

---

## 许可证

木兰宽松许可证第 2 版（Mulan Permissive Software License v2，MulanPSL-2）。见各端 `LICENSE` 文件，或仓库根 `LICENSE`。

---

## 已知问题与修复记录

### v1.1.0

- **说明书全景目录带引号的条目点击后无法跳转（Web / PC / Android 三端）**
  - 现象：多语言正文说明书的「全景目录」中，凡是标题含直引号（`"` 或 `'`）的条目（如 `"立方体"工具` 之类），点击后定位失败、页面不滚动。
  - 根因：交叉引用（md-jump）的 `data-goto` 在生成时经 HTML 转义为 `&quot;`，但点击跳转时 `dataset.goto` 仍是字面实体字符串；而标题 `textContent` 中的 `&quot;` 已被浏览器解码为 `"`，两侧 `slugify` 结果不一致，导致目标 slug 匹配不上。
  - 修复：新增 `decodeHtmlEntities()`，在 md-jump 点击逻辑中对 `data-goto` 先做实体解码再 `slugify`，与标题侧解码后的值对齐。三端 `index.html` 同步修改并通过 `_check_syntax.mjs` 语法校验。
  - 验证：以简体中文说明书为例，含引号的 13 个跳转在修复前 10 个失败，修复后 0 失败（playwright 真实浏览器复现）。

---

项目仓库：<https://github.com/yushichadao/Cub3D-Editor>
