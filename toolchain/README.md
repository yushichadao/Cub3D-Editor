# toolchain/ — Android 工具链（仓库内收敛）

替代原 `C:\Users\yushi\dev-tools`（C 盘散落）。`Android/scripts/env-android.mjs` 优先读此处。

放置内容（不入库，见 .gitignore）：
- `jdk17/`      — Android 构建用 JDK 17
- `android-sdk/`— Android SDK（含 build-tools / platform / platform-tools）
- `android/release.keystore` — 签名密钥库（真实不入库）
- `android/keystore.properties` — 签名配置（真实不入库）

安装指引见 `Android/scripts/setup-android-sdk.ps1`（已改为指向本目录）。
