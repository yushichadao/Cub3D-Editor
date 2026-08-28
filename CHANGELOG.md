# 更新记录 / Changelog

## v1.0.0（2026-08-28）—— 撤除第三方 SDK，IP 分流改第一方判定

- 三端（Web / PC / Android）撤除全部与业务无关的第三方 SDK 与依赖，仅保留运行必需的官方组件（Electron / Capacitor 官方插件），符合隐私政策声明与应用商店审核要求。
- IP 境内外分流不再调用任何第三方归属地接口（百度 / 太平洋 / ip-api / ipwho.is），改为本站第一方接口 `api/geo.php`（境内服务器本地 GeoLite2 离线库判定），访客 IP 不向任何第三方传输；境外站（GitHub Pages）跨域复用同一接口。
- 第三方许可清单新增 MaxMind GeoLite2 数据制品署名。
- 境外站宣传页版本检查由 GitHub API 改为同源静态清单（CI 同步 downloads/versions.json），Web 全站零第三方请求。
- Android 重新打包（versionCode 20260828），覆盖 GitHub Releases 与 downloads/ 下载。

## v1.0.0（2026-08-28）—— 重发：文本框选中高亮与换色修复

- 修复文本框被选中时更换文字颜色看不出效果的问题（Web / PC / Android 三端）。
  - 根因：文本框选中时 `blueTintTexture` 用 `source-in` 把整张文字纹理**整体重绘为纯青蓝**，覆盖了用户设置的文字颜色；而 3D 对象选中是「保留原色 + 青蓝高亮叠加」，二者逻辑不一致。
  - 修复：将文本框选中逻辑与 3D 对象统一——保留文字原 RGB 颜色，仅叠加青蓝高亮（`source-atop` 青蓝 0.55 透明 + 整体提亮 12%），使换色时即使处于选中态也立即可见，且视觉与 3D 选中一致。
- 重新打包并覆盖 GitHub Releases v1.0.0：Windows 安装版 / 便携版、Android 通用安装包。

## v1.0.0（2026-08-26）—— 重发：阿拉伯语显示修复

- 修复 3D 文字对象保存后阿拉伯语（RTL）显示异常（Web / PC / Android 三端）。
  - 根因：文字纹理（`textTexture`）横排绘制未设置 `ctx.direction`，在 LTR 画布上阿拉伯语布局 / 连写异常；文本对象若选用非阿拉伯字体，阿拉伯字形 fallback 失败。
  - 修复：三端横排绘制检测 RTL 文本（阿拉伯语 / 希伯来语 Unicode 区段），设置 `ctx.direction='rtl'` 并追加阿拉伯字体 fallback（`Noto Kufi Arabic` / `Noto Sans Arabic`）。
- 重新打包并覆盖 GitHub Releases v1.0.0：Windows 安装版 / 便携版、Android 通用安装包。

## v1.0.0（2026-08-25）—— 立方3D 正式发布

立方3D（Cub3D Editor，全称「立方·3D设计工坊」）v1.0.0 正式发布：一款完全免费、无广告、可离线使用的轻量化跨平台 3D / 2D 场景编辑器，同一套代码覆盖网页、Windows 桌面与 Android 三端，支持九种语言。

首次发布包含：
- **三端通用**：网页版（免安装）、Windows 桌面版（安装版 / 便携版）、Android 版（APK）同步上线，通用 `.json` 工程文件三端互通。
- **核心创作能力**：画笔、橡皮擦、形状工具；移动 / 旋转 / 缩放、撤销重做、复制克隆；材质编辑（颜色 / 图案 / 贴图）；文本框（多字体、横排竖排、粗细）；坐标轴、网格、地面参考面、线框模式等视图辅助。
- **离线优先**：无需注册登录，创作数据默认保存在本地。
- **九语言界面与说明书**：简体中文、繁體中文、English、日本語、한국어、Русский、Español、Français、العربية。
- **开源**：遵循木兰宽松许可证（MulanPSL-2）。

分发与版本说明：
- 安装包统一经 GitHub Releases 附件分发，项目采用纯静态分发。
- 软件对外显示长版本号（`YYYYMMDD` 形式），安装包文件名携带短版本号 `1.0.0`。
