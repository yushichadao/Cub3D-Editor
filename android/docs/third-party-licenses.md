# 第三方开源组件许可证清单（THIRD-PARTY LICENSES）

> 生成日期：2026-08-23 ｜ 工程：Cub3D Editor（立方·3D设计工坊）
> 本清单由治理整改 T8 全量审计生成。工程自身许可证：**木兰宽松许可证 v2（MulanPSL-2）**。
> 用途：合规归档，供三端 LICENSE / 关于页引用。

## 1. 核心运行时依赖

| 组件 | 版本 | 许可证 | 用途 | 引入位置 | 归属/来源 |
|------|------|--------|------|----------|-----------|
| Three.js | r160 | MIT | Web/PC/Android 三端 3D 引擎 | `shared/three/three.module.js` | © 2010-2023 three.js authors / threejs.org，MIT License |
| Electron | ^43.3.0 | MIT | PC 桌面运行时 | `pc/package.json` devDependencies | © 2014-2024 GitHub Inc. / OpenJS Foundation，MIT |
| electron-builder | ^26.15.3 | MIT | PC 安装包构建 | `pc/package.json` devDependencies | © 2015-2024 electron-builder contributors，MIT |
| Capacitor Core | ^6.2.0 | MIT | Android 跨端桥接 | `android/package.json` dependencies | © 2017-2024 Drifty Co. / Ionic，MIT |
| @capacitor/android | ^6.2.0 | MIT | Android 原生桥接 | `android/package.json` dependencies | MIT（同上） |
| @capacitor/app | ^6.0.2 | MIT | 应用生命周期 | `android/package.json` dependencies | MIT |
| @capacitor/splash-screen | ^6.0.3 | MIT | 启动屏 | `android/package.json` dependencies | MIT |
| @capacitor/status-bar | ^6.0.2 | MIT | 状态栏控制 | `android/package.json` dependencies | MIT |
| @capacitor/cli | ^6.2.0 | MIT | Capacitor 构建 CLI | `android/package.json` devDependencies | MIT |

## 2. 管理端 / 后端依赖

| 组件 | 版本 | 许可证 | 用途 | 引入位置 | 归属/来源 |
|------|------|--------|------|----------|-----------|
| Express | ^4.19.2 | MIT | 管理端 HTTP 服务 | `admin/package.json` dependencies | © 2010-2016 TJ Holowaychuk / StrongLoop，MIT |
| Multer | ^2.0.1 | MIT | 管理端文件上传 | `admin/package.json` dependencies | © 2014-2024 Multer contributors，MIT |

## 3. 字体与图标

| 资源 | 许可证 | 用途 | 备注 |
|------|--------|------|------|
| 系统字体回退（无内置商业字体） | — | 界面排版 | 使用系统字体栈，无第三方字体授权风险 |
| 工程图标（立方体线框） | 自有 | 应用图标 | 工程自绘，归工程所有 |

## 4. 服务 / API（非代码依赖，仅管理端调用）

| 服务 | 用途 | 许可证/条款 |
|------|------|-------------|
| 百度翻译开放平台（通用翻译 API） | 仅管理端"更新说明"多语言化，不进客户端运行时 | 百度翻译服务条款（商用需合规） |

## 5. 许可证全文获取

- MIT：https://opensource.org/licenses/MIT
- MulanPSL-2：http://license.coscl.org.cn/MulanPSL2/
- 各组件完整 LICENSE 文本可在对应 npm 包 `node_modules/<pkg>/LICENSE` 或官方仓库获取。

## 6. 合规声明

- 本工程为个人开发者项目，所有开源组件均按其许可证使用（MIT 类许可证要求保留版权与许可声明）。
- 若后续引入 GPL/AGPL 等强 Copyleft 许可证组件，需另行评估并单独标注。
- 密钥（百度翻译、GitHub Token、签名密钥）集中管理于 `secrets/.env`（不入库），详见 `docs/STANDARDS.md`。
