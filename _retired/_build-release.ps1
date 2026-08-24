# 临时打包脚本：本地打包 3 个安装包（PC NSIS + PC Portable + Android APK），版本 1.0.0
# 后台运行，日志写入 downloads/build-log.txt；任务完成后删除本脚本。
$ErrorActionPreference = 'Continue'
$root   = 'C:\Users\yushi\CodeBuddy\Cub3D Editor'
$log    = Join-Path $root 'downloads\build-log.txt'
$ver    = '1.0.0'

# 本机 Node 默认 CA 不信任 github 等站点，改用系统证书存储（electron-builder 下载 winCodeSign 需要）
$env:NODE_OPTIONS = '--use-system-ca'
# 统一外部命令输出编码为 UTF-8，避免日志乱码
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [System.Text.UTF8Encoding]::new()

function Log([string]$msg) {
    Add-Content -Path $log -Value ("[{0}] {1}" -f (Get-Date -Format 'HH:mm:ss'), $msg)
}

if (Test-Path $log) { Remove-Item $log -Force }
Log '=== 开始打包 1.0.0 ==='

# ---------- 1. PC 端：NSIS 安装版 + Portable 便携版 ----------
try {
    Set-Location (Join-Path $root 'pc')
    Log 'PC: 清理旧产物 dist/'
    if (Test-Path dist) { Remove-Item dist -Recurse -Force }
    Log 'PC: npm run dist（predist 自动 deref+sync，electron-builder 构建 nsis + portable）'
    npm run dist *>> $log
    Log "PC: 构建退出码 $LASTEXITCODE"
    if ($LASTEXITCODE -ne 0) { throw "PC 构建失败，退出码 $LASTEXITCODE" }
} catch {
    Log "PC: 失败 - $($_.Exception.Message)"
    exit 1
}

# ---------- 2. Android 端：release APK ----------
try {
    Set-Location (Join-Path $root 'android')
    if (Test-Path dist) { Remove-Item dist -Recurse -Force }
    Log 'Android: 设置工具链环境变量（CUB3D_TOOLCHAIN）'
    $env:CUB3D_TOOLCHAIN = 'C:\Users\yushi\dev-tools'
    Log 'Android: npm run apk:release（sync + build:www + cap sync + gradle assembleRelease）'
    npm run apk:release *>> $log
    Log "Android: 构建退出码 $LASTEXITCODE"
    if ($LASTEXITCODE -ne 0) { throw "Android 构建失败，退出码 $LASTEXITCODE" }
} catch {
    Log "Android: 失败 - $($_.Exception.Message)"
    exit 1
}

# ---------- 3. 归档到 downloads/1.0.0 并生成校验和 ----------
try {
    $out = Join-Path $root ('downloads\{0}' -f $ver)
    New-Item -ItemType Directory -Force -Path (Join-Path $out 'PC') | Out-Null
    New-Item -ItemType Directory -Force -Path (Join-Path $out 'Android') | Out-Null
    Log '归档：复制 PC 产物'
    Copy-Item (Join-Path $root 'pc\dist\Cub3D-Editor-Setup-1.0.0-x64.exe')   (Join-Path $out 'PC\') -Force
    Copy-Item (Join-Path $root 'pc\dist\Cub3D-Editor-Portable-1.0.0-x64.exe') (Join-Path $out 'PC\') -Force
    Log '归档：复制 Android 产物'
    Get-ChildItem (Join-Path $root 'android\dist\*.apk') | Copy-Item -Destination (Join-Path $out 'Android\') -Force
    Log '归档：生成 SHA256 校验和'
    $lines = Get-ChildItem $out -Recurse -File | Sort-Object FullName | ForEach-Object {
        $h = (Get-FileHash $_.FullName -Algorithm SHA256).Hash
        "{0}  {1}" -f $h, $_.FullName.Substring($out.Length + 1)
    }
    $lines | Set-Content -Path (Join-Path $out 'SHA256SUMS.txt') -Encoding UTF8
    Log ('归档完成：' + $lines.Count + ' 个文件')
    Log '=== 全部打包完成 ==='
} catch {
    Log "归档失败 - $($_.Exception.Message)"
    exit 1
}
