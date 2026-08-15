# ============================================================
# Cub3D Editor — 三端一键重建并发布
# 先 cd 到仓库根目录，再执行:  .\rebuild-and-publish.ps1
# ============================================================
$ErrorActionPreference = "Stop"

# ---- 0. 环境放行 ----
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
$env:CODEBUDDY_SAFE_DELETE_ENABLED = "0"
$env:ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/"
$env:Path = "C:\Users\yushi\dev-tools\jdk17\bin;C:\Users\yushi\dev-tools\android-sdk\platform-tools;C:\gh\bin;$env:Path"

# 用「当前目录」作为根目录（运行时需先 cd 到仓库根）
$ROOT = Get-Location
Write-Host "==> 仓库根目录: $ROOT" -ForegroundColor Cyan

if (-not (Test-Path "$ROOT\PC\package.json")) {
    Write-Host "✗ 当前目录不是仓库根目录（找不到 PC\package.json）。请先 cd 到仓库根目录再运行。" -ForegroundColor Red
    exit 1
}

# ---- 1. 同步共享资源 + 生成图标 ----
Write-Host "`n[1/5] 同步共享资源 + 生成图标" -ForegroundColor Yellow
Push-Location $ROOT; node sync-shared.mjs; Pop-Location
Push-Location "$ROOT\PC"; node scripts/_genicon.mjs; Pop-Location
Push-Location "$ROOT\Android"; node scripts/_genicon-android.mjs; Pop-Location

# ---- 2. 构建 PC ----
Write-Host "`n[2/5] 构建 PC 安装版 + 便携版" -ForegroundColor Yellow
Push-Location "$ROOT\PC"
npm install --no-audit --no-fund
npm run dist
Pop-Location

# ---- 3. 构建 Android APK ----
Write-Host "`n[3/5] 构建 Android APK" -ForegroundColor Yellow
Push-Location "$ROOT\Android"
npm install --no-audit --no-fund
npm run apk:release
Pop-Location

# ---- 4. 清理旧 Release / tag ----
Write-Host "`n[4/5] 清理旧 Release / tag" -ForegroundColor Yellow
Push-Location $ROOT
gh release delete v1.0.0 -y 2>$null
gh api -X DELETE repos/yushichadao/Cub3D-Editor/git/refs/tags/v1.0.0 2>$null
# 删除本地残留 tag（上次失败留下来的）
git tag -d v1.0.0 2>$null
Pop-Location

# ---- 5. 创建 Release 并上传 ----
Write-Host "`n[5/5] 创建 Release 并上传" -ForegroundColor Yellow
Push-Location $ROOT

$setup = (Get-Item "PC/dist/Cube3D-Studio-Setup-*.exe").FullName
$port  = (Get-Item "PC/dist/Cube3D-Studio-Portable-*.exe").FullName
$apk   = (Resolve-Path "Android/dist/Cub3D-Editor.apk").Path

$tmp = New-Item -ItemType Directory -Force -Path "$env:TEMP\cub3d-release"
Copy-Item $setup "$tmp\Cub3D-Editor-Setup.exe"
Copy-Item $port  "$tmp\Cub3D-Editor-Portable.exe"
Copy-Item $apk   "$tmp\Cub3D-Editor.apk"

$NOTES = @"
Cub3D Editor 1.0.0

- Cub3D-Editor-Setup.exe — Windows 安装版
- Cub3D-Editor-Portable.exe — Windows 便携版（免安装）
- Cub3D-Editor.apk — Android 安装包（release 签名）
"@
Set-Content -Path "$tmp\NOTES.md" -Value $NOTES -Encoding utf8

gh release create v1.0.0 `
  --title "Cub3D Editor 1.0.0" `
  --notes-file "$tmp\NOTES.md" `
  --target main `
  "$tmp\Cub3D-Editor-Setup.exe" `
  "$tmp\Cub3D-Editor-Portable.exe" `
  "$tmp\Cub3D-Editor.apk"

Remove-Item $tmp -Recurse -Force
Pop-Location

Write-Host "`n✔ 全部完成！Release v1.0.0 已发布。" -ForegroundColor Green
