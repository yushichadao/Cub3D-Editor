# 立方 · 三维图形设计工坊（Cub3D Editor）

一个**离线优先**的网页 / 桌面 / 移动端 3D·2D 场景编辑器，支持多语言界面与多编程语言插件扩展。
从零基础到进阶创作，配套一套**同时适配四种形态**的启发式使用说明书。

---

## 四种形态，同一本说明书

本工具只有一个代码库，却能按设备自动呈现不同形态，说明书也**同时覆盖四种形态**：

| 形态 | 入口 | 典型设备 | 特点 |
| --- | --- | --- | --- |
| 🖥️ **网页·鼠标** | 浏览器打开，有鼠标 / 触控板 | 台式机、笔记本 | 自动检测为鼠标模式；可用键盘快捷键 |
| 📱 **网页·触屏** | 浏览器打开，触摸屏设备 | 手机、平板浏览器 | 自动检测为触屏模式；无键盘，用手势与专用按钮 |
| 💻 **PC 版** | 下载安装的 Windows 桌面程序（`.exe`） | Windows 电脑 | 安装版 / 便携版两种；崩溃恢复、拖放、最近文件、置顶便签、扩展中心 |
| 🤖 **Android 版** | 安装的手机应用（`.apk`） | 安卓手机、平板 | 全屏运行；系统返回键退出确认；分享面板导出 |

> 网页版可手动在地址后加 `?touch` 强制进入触屏布局。

---

## 快速开始

- **网页版（无需安装）**：打开 <https://yushichadao.github.io/Cub3D-Editor/> 即可动手。
- **PC 版**：下载并运行 `Cube3D-Studio-Setup-x.x.x-x64.exe`（安装版）或 `Cube3D-Studio-Portable-x.x.x-x64.exe`（便携版，免安装）。
- **Android 版**：允许"未知来源"后安装 `app-release.apk`。

你的作品导出的 `.json`（`.l3d`）工程文件**三端通用**，可在手机起草、电脑精修间自由接力。

---

## 多语言

界面与说明书均支持 **简体中文 / 繁體中文 / English / 日本語** 四种语言，切换时界面文案与说明书正文同时切换。

说明书源文件位于 `shared/docs/`：

| 文件 | 语言 |
| --- | --- |
| `使用说明书.md` | 简体中文 |
| `使用說明書_zh-TW.md` | 繁體中文 |
| `使用说明书_en.md` | English |
| `使用説明書_ja.md` | 日本語 |

> PC 版还可通过**扩展中心**安装额外语言包（见 `PC/langpacks/`）。

---

## 项目结构

```
Cub3D Editor/
├── shared/        # 三端共享的源码、语言包与说明书（docs/）
├── Web/           # 网页版构建（部署到 GitHub Pages）
├── PC/            # 桌面版（Electron + electron-builder，产出 .exe）
├── Android/       # 安卓版（产出 .apk）
├── sync-shared.mjs# 把 shared/ 同步到各端
└── readme.md      # 本文件
```

构建前请先运行 `node sync-shared.mjs` 把 `shared/` 同步到各端。

---

## 构建指引

### PC 版（`.exe` 安装版 + 便携版）

```powershell
cd PC
npm install
npm run dist            # 同时产出 nsis 安装版 + portable 便携版
# 或分别：
npm run dist:setup     # 仅安装版（dist/Cube3D-Studio-Setup-*.exe）
npm run dist:portable  # 仅便携版（dist/Cube3D-Studio-Portable-*.exe）
```

产物位于 `PC/dist/`。

### Android 版（`.apk`）

在 `Android/` 目录使用对应的安卓构建命令产出 `app-release.apk`（详见 `Android/docs/`）。

---

## 许可证

见各端 `LICENSE` 文件。

---

项目仓库：<https://github.com/yushichadao/Cub3D-Editor>
