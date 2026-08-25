# 第三方开源组件许可证清单（THIRD-PARTY LICENSES）

> 生成日期：2026-08-26 ｜ 工程：Cub3D Editor（立方·3D设计工坊）
> 本清单由仓库治理整改后重新统计生成。工程自身许可证：**木兰宽松许可证 v2（MulanPSL-2）**。
> 用途：合规归档，供三端 LICENSE / 关于页引用。

## 1. 核心运行时依赖

| 组件 | 版本 | 许可证 | 用途 | 引入位置 | 归属/来源 |
|------|------|--------|------|----------|-----------|
| Three.js | r160 | MIT | web/pc/android 三端 3D 引擎 | `shared/three/three.module.js` | © 2010-2023 three.js authors / threejs.org，MIT License |
| Electron | ^43.3.0 | MIT | PC 桌面运行时 | `pc/package.json` devDependencies | © 2014-2024 GitHub Inc. / OpenJS Foundation，MIT |
| electron-builder | ^26.15.3 | MIT | PC 安装包构建 | `pc/package.json` devDependencies | © 2015-2024 electron-builder contributors，MIT |
| @capacitor/core | ^6.2.0 | MIT | Android 跨端桥接核心 | `android/package.json` dependencies | © 2017-2024 Drifty Co. / Ionic，MIT |
| @capacitor/android | ^6.2.0 | MIT | Android 原生桥接 | `android/package.json` dependencies | MIT（同上） |
| @capacitor/app | ^6.0.2 | MIT | 应用生命周期 | `android/package.json` dependencies | MIT |
| @capacitor/filesystem | ^6.0.2 | MIT | 文件系统 | `android/package.json` dependencies | MIT |
| @capacitor/preferences | ^6.0.3 | MIT | 偏好存储 | `android/package.json` dependencies | MIT |
| @capacitor/share | ^6.0.3 | MIT | 系统分享 | `android/package.json` dependencies | MIT |
| @capacitor/splash-screen | ^6.0.3 | MIT | 启动屏 | `android/package.json` dependencies | MIT |
| @capacitor/status-bar | ^6.0.2 | MIT | 状态栏控制 | `android/package.json` dependencies | MIT |
| @capacitor/cli | ^6.2.0 | MIT | Capacitor 构建 CLI | `android/package.json` devDependencies | MIT |

## 2. 字体资源

| 资源 | 许可证 | 用途 | 备注 |
|------|--------|------|------|
| Noto Kufi Arabic（noto-kufi-arabic-400/700.woff2） | OFL-1.1 | 阿拉伯语界面与说明书排版 | 位于 `shared/fonts/`，© Google LLC，SIL Open Font License 1.1 |
| 系统字体回退（无内置商业字体） | — | 其余语言界面排版 | 使用系统字体栈，无第三方字体授权风险 |

## 3. 图标资源

| 资源 | 许可证 | 用途 | 备注 |
|------|--------|------|------|
| 工程图标（立方体线框） | 自有 | 应用图标 / 宣传页 | 工程自绘，归工程所有 |

## 4. 许可证全文获取

- MIT：https://opensource.org/licenses/MIT
- OFL-1.1：https://openfontlicense.org/licenses/OFL-1.1.txt
- MulanPSL-2：http://license.coscl.org.cn/MulanPSL2/
- 各组件完整 LICENSE 文本可在对应 npm 包 `node_modules/<pkg>/LICENSE` 或官方仓库获取。

## 5. 合规声明

- 本工程为个人开发者项目，所有开源组件均按其许可证使用（MIT / OFL 类许可证要求保留版权与许可声明）。
- 已移除的废弃模块（含管理端 Express / Multer 及百度翻译调用）不再计入本清单，相关代码已从仓库剔除。
- 若后续引入 GPL/AGPL 等强 Copyleft 许可证组件，需另行评估并单独标注。
- 密钥（GitHub Token、签名密钥）集中管理于 `secrets/.env`（不入库）。
