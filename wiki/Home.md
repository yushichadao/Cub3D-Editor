# Cub3D Editor Wiki

欢迎来到 **Cub3D Editor（立方·3D设计工坊）** 的 Wiki！

这是一个**离线优先**的跨平台 3D/2D 场景编辑器，同一套代码覆盖网页、Windows 桌面与 Android 三端，支持 简体中文 / 繁體中文 / English / 日本語 / 한국어 / Русский / Français 七种语言。

> 无论你是零基础涂鸦，还是进阶参数化建模，导出的 `.json` 工程文件在三端之间完全互通，可以在手机起草、电脑精修之间自由接力。

---

## 快速入口

| 入口 | 链接 | 说明 |
| :--- | :--- | :--- |
| 官方网站 | https://yushichadao.github.io/Cub3D-Editor/ | 产品介绍、七语言切换、下载入口 |
| 网页版编辑器 | https://yushichadao.github.io/Cub3D-Editor/Web/index.html | 无需安装，浏览器直接打开 |
| 最新 Release | https://github.com/yushichadao/Cub3D-Editor/releases/latest | PC 安装版 / 便携版、Android APK |
| 问题反馈 | https://github.com/yushichadao/Cub3D-Editor/issues | Bug 报告与功能建议 |
| 仓库源码 | https://github.com/yushichadao/Cub3D-Editor | README、构建脚本与源代码 |

---

## 平台指南

### Web 版（免安装）
直接在浏览器打开 [Web 版编辑器](https://yushichadao.github.io/Cub3D-Editor/Web/index.html) 即可使用。
- 桌面浏览器默认使用鼠标布局。
- 在平板或手机浏览器中自动切换为触屏布局；也可在 URL 后加 `?touch` 强制使用触屏模式。

### PC 版（Windows）
1. 前往 [Releases](https://github.com/yushichadao/Cub3D-Editor/releases/latest)。
2. 下载 `Cub3D-Editor-Setup.exe`（安装版）或 `Cub3D-Editor-Portable.exe`（便携版，免安装）。
3. 运行即可开始使用。

### Android 版
1. 下载 Release 中的 `Cub3D-Editor.apk`。
2. 允许「未知来源」应用安装。
3. 安装后打开，支持全屏运行与系统分享面板导出。

> 三端导出的 `.json` 工程文件格式完全一致，可自由跨设备打开与继续编辑。

---

## 主要功能

- **3D 与 2D 绘制**：画笔、橡皮擦（整体/局部）、形状工具
- **对象操作**：移动、旋转、缩放；撤销/重做、复制/粘贴/克隆
- **材质编辑**：预设与自定义颜色、图案/纹理贴图
- **文字框**：多字体、横排/竖排
- **视图辅助**：坐标轴、网格、地面参考面、线框模式
- **PC 版增强**：崩溃恢复、拖放打开、自动保存/会话恢复、置顶便签窗
- **Android 版增强**：全屏运行、返回键确认、分享面板导出

---

## 多语言说明书

Cub3D Editor 配套了七语言使用说明书，源文件位于仓库 `shared/docs/` 目录：

| 语言 | 说明书文件 |
| :--- | :--- |
| 简体中文 | [`shared/docs/使用说明书.md`](https://github.com/yushichadao/Cub3D-Editor/blob/main/shared/docs/使用说明书.md) |
| 繁體中文 | [`shared/docs/使用說明書_zh-TW.md`](https://github.com/yushichadao/Cub3D-Editor/blob/main/shared/docs/使用說明書_zh-TW.md) |
| English | [`shared/docs/使用说明书_en.md`](https://github.com/yushichadao/Cub3D-Editor/blob/main/shared/docs/使用说明书_en.md) |
| 日本語 | [`shared/docs/使用説明書_ja.md`](https://github.com/yushichadao/Cub3D-Editor/blob/main/shared/docs/使用説明書_ja.md) |
| 한국어 | [`shared/docs/사용설명서_ko.md`](https://github.com/yushichadao/Cub3D-Editor/blob/main/shared/docs/사용설명서_ko.md) |
| Русский | [`shared/docs/使用说明书_ru.md`](https://github.com/yushichadao/Cub3D-Editor/blob/main/shared/docs/使用说明书_ru.md) |
| Français | [`shared/docs/使用说明书_fr.md`](https://github.com/yushichadao/Cub3D-Editor/blob/main/shared/docs/使用说明书_fr.md) |

> 各端 `docs/` 目录为同步生成的副本，**请勿直接编辑**。如需修改，请在 `shared/docs/` 中编辑后运行 `node sync-shared.mjs` 同步。

---

## 开发与构建

如果你是开发者，想从源码构建或贡献代码，请参考仓库 README 中的「构建指引」：

```powershell
# 1. 同步共享资源
node sync-shared.mjs

# 2. 进入对应平台目录构建
cd Web   && npm start          # 本地预览 Web 版
cd PC    && npm run dist       # 构建 Windows 安装版 + 便携版
cd Android && npm run apk:release # 构建 Android release APK
```

更多细节（技术栈、环境要求、GitHub Pages 自动部署、校验脚本等）请参阅 [README.md](https://github.com/yushichadao/Cub3D-Editor#readme)。

---

## 参与与反馈

- 发现 Bug 或有新功能建议？请提交 [Issue](https://github.com/yushichadao/Cub3D-Editor/issues)。
- 想贡献代码或文档？欢迎 Fork 仓库并提交 Pull Request。
- 多语言文案与说明书的维护说明见 README「多语言」章节。

---

## 许可证

Cub3D Editor 采用 **木兰宽松许可证第 2 版（MulanPSL-2）** 发布。

---

祝你创作愉快！
