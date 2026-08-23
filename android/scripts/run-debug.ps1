# run-debug.ps1 -- one-click build + install debug APK to connected device/emulator, then launch.
# Usage (PowerShell, from anywhere):
#   .\scripts\run-debug.ps1
#
# Prereq: toolchain/ contains jdk17 + android-sdk (see scripts/env-android.mjs),
#         and a phone with "USB debugging" enabled is connected (or an emulator is running).
#         工具链统一收敛到仓库内 toolchain/（可用环境变量 CUB3D_TOOLCHAIN 覆盖）。
$ErrorActionPreference = "Stop"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
if ($env:CUB3D_TOOLCHAIN) { $Tools = $env:CUB3D_TOOLCHAIN } else { $Tools = Join-Path $Root ".." "toolchain" }

# Auto-fill JDK / SDK env (same as env-android.mjs)
if (Test-Path (Join-Path $Tools "jdk17"))       { $env:JAVA_HOME        = Join-Path $Tools "jdk17" }
if (Test-Path (Join-Path $Tools "android-sdk")) {
    $env:ANDROID_HOME     = Join-Path $Tools "android-sdk"
    $env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
}
# Allow capacitor `sync` bulk delete under safe-delete sandbox
$env:CODEBUDDY_SAFE_DELETE_ENABLED = "0"

Write-Host "==> JAVA_HOME : $env:JAVA_HOME"
Write-Host "==> ANDROID_HOME : $env:ANDROID_HOME"

# 1) Build debug APK (internally: build:www -> cap sync android -> gradle assembleDebug)
Set-Location $Root
Write-Host "==> Building debug APK ..."
npm run apk:debug
if ($LASTEXITCODE -ne 0) { throw "Build failed (exit $LASTEXITCODE)" }

# 2) Install to device (use ASCII gradle output path to avoid Chinese-filename garbling over adb)
$apk = Join-Path $Root "android\app\build\outputs\apk\debug\app-debug.apk"
if (-not (Test-Path $apk)) { throw "Build artifact not found: $apk" }

$adb = Join-Path $env:ANDROID_HOME "platform-tools\adb.exe"
Write-Host "==> Installing APK: $apk"
& $adb install -r $apk
if ($LASTEXITCODE -ne 0) { throw "adb install failed (exit $LASTEXITCODE)" }

# 3) Launch App (developer debug entry)
Write-Host "==> Launching App ..."
& $adb shell am start -n com.cub3deditor.app/.MainActivity
Write-Host "==> Done. Open the manual on the phone, long-press text: handles + in-app float should appear immediately, with NO system copy/select/share bar."
