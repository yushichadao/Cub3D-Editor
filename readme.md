# 立方 · 三维图形设计工坊（Cub3D Editor）

一个**离线优先**的网页 / 桌面 / 移动端 3D·2D 场景编辑器，支持多语言界面与多编程语言插件扩展。
从零基础到进阶创作，配套一套**同时适配三种平台、四种使用形态**的启发式使用说明书。

---

## 一个代码库，三种平台，四种形态

本工具只有一个代码库，按设备自动呈现不同形态。所谓「四种形态」是**同一个网页平台**根据输入设备拆成的鼠标 / 触屏两种布局，叠加 PC 桌面端与 Android 移动端，合计三种平台、四种形态：

| 形态 | 所属平台 | 入口 | 典型设备 | 特点 |
| --- | --- | --- | --- | --- |
| 🖥️ **网页·鼠标** | 网页 | 浏览器打开，有鼠标 / 触控板 | 台式机、笔记本 | 自动检测为鼠标模式；可用键盘快捷键 |
| 📱 **网页·触屏** | 网页 | 浏览器打开，触摸屏设备 | 手机、平板浏览器 | 自动检测为触屏模式；无键盘，用手势与专用按钮 |
| 💻 **PC 版** | PC（桌面） | 下载安装的 Windows 桌面程序（`.exe`） | Windows 电脑 | 安装版 / 便携版两种；崩溃恢复、拖放、最近文件、置顶便签、扩展中心 |
| 🤖 **Android 版** | Android（移动） | 安装的手机应用（`.apk`） | 安卓手机、平板 | 全屏运行；系统返回键退出确认；分享面板导出 |

> 网页版可手动在地址后加 `?touch` 强制进入触屏布局。

---

## 快速开始

- **网页版（无需安装）**：打开 <https://yushichadao.github.io/Cub3D-Editor/> 即可动手。
- **PC 版**：下载并运行 `Cube3D-Studio-Setup-x.x.x-x64.exe`（安装版）或 `Cube3D-Studio-Portable-x.x.x-x64.exe`（便携版，免安装）。
- **Android 版**：允许"未知来源"后安装 `app-release.apk`。

你的作品导出的 `.json` 工程文件**三端通用**，可在手机起草、电脑精修间自由接力。

---

## 多语言

界面与说明书均支持 **简体中文 / 繁體中文 / English / 日本語** 四种语言，切换时界面文案与说明书正文同时切换。

说明书源文件位于 `shared/docs/`（简体中文 `使用说明书.md` 为基准，其余为翻译版）：

| 文件 | 语言 |
| --- | --- |
| `使用说明书.md` | 简体中文（基准） |
| `使用說明書_zh-TW.md` | 繁體中文 |
| `使用说明书_en.md` | English |
| `使用説明書_ja.md` | 日本語 |

界面语言文案集中在 `shared/language/`（`en.js` / `ja.js` / `zh-TW.js`，简体中文为内置默认）。
同步时由根目录的 `_i18n_en.mjs` / `_i18n_ja.mjs` / `_i18n_zh-TW.mjs` 把弹窗文案与法律文本写入各端语言包。

> PC 版还可通过**扩展中心**安装额外语言包（见 `PC/langpacks/`）。

---

## 项目结构

```
Cub3D Editor/
├── shared/                 # 各端共享的「单一源」
│   ├── docs/               # 四语言说明书源文件
│   ├── language/           # 界面语言文案（en / ja / zh-TW）
│   ├── infra/              # 三端逐字节一致的基础设施（LICENSE / server.js / server.ps1 / vercel.json）
│   ├── scripts/            # 三端共享脚本（_geocheck / _hardcode / _paramdoc / _serve）
│   └── three/              # 内置 three.js 模块与示例
├── Web/                    # 网页版（部署到 GitHub Pages）
├── PC/                     # 桌面版（Electron + electron-builder，产出 .exe）
├── Android/                # 安卓版（Capacitor，产出 .apk）
├── sync-shared.mjs         # 把 shared/ 同步到各端，并执行 i18n 生成
├── _i18n_en.mjs            # 英文文案 / 法律文本生成
├── _i18n_ja.mjs            # 日文文案 / 法律文本生成
├── _i18n_zh-TW.mjs         # 繁体中文文案 / 法律文本生成
├── check_manual.mjs        # 说明书一致性检查
├── missing_terms.txt       # i18n 待补词条
└── readme.md               # 本文件
```

构建前请先运行 `node sync-shared.mjs` 把 `shared/` 同步到各端（各端 `npm start` / `npm run dist` 也已配置 `pre*` 钩子自动同步）。

---

## 构建指引

### PC 版（`.exe` 安装版 + 便携版）

```powershell
cd PC
npm install
npm run dist            # 先生成图标，再同时产出 nsis 安装版 + portable 便携版
# 或分别：
npm run dist:setup     # 仅安装版（dist/Cube3D-Studio-Setup-*.exe）
npm run dist:portable  # 仅便携版（dist/Cube3D-Studio-Portable-*.exe）
```

产物位于 `PC/dist/`。

### Android 版（`.apk`）

在 `Android/` 目录使用对应命令（基于 Capacitor）：

```powershell
cd Android
npm install
npm run apk:release     # 构建网页资源 + cap sync + 产出 app-release.apk
# 调试包：npm run apk:debug
# 另：npm run keystore 生成签名密钥
```

产物位于 `Android/dist/`（详见 `Android/docs/`）。

---

## 许可证

见各端 `LICENSE` 文件。

---

项目仓库：<https://github.com/yushichadao/Cub3D-Editor>
