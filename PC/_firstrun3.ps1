$ErrorActionPreference = 'Continue'
Set-Location 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC'
Get-Process -Name 'cub3d-editor' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
# 清理全部 userData（模拟绝对首次）
$ad = $env:APPDATA
foreach ($d in @((Join-Path $ad 'Cub3DEditor'), (Join-Path $ad '立方·3D设计工坊'))) {
  if (Test-Path $d) { Remove-Item $d -Recurse -Force -ErrorAction SilentlyContinue; Write-Host ("CLEANED " + $d) }
}
# 模拟旧版中文目录 + 大量 project/autosave 数据（触发迁移）
$legacy = Join-Path $ad '立方·3D设计工坊'
New-Item -ItemType Directory -Force -Path (Join-Path $legacy 'projects') | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $legacy 'autosave') | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $legacy 'langpacks') | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $legacy 'logs') | Out-Null
# 造 200 个虚拟工程文件，模拟“迁移大数据”场景
1..200 | ForEach-Object { Set-Content -Path (Join-Path $legacy ('projects/proj_' + $_ + '.json')) -Value ('{"id":' + $_ + '}') }
Set-Content -Path (Join-Path $legacy 'config.json') -Value '{"migrated":false}'
Write-Host "SEED legacy dir with 200 projects"
# 清理旧日志
Remove-Item (Join-Path $env:TEMP 'cub3d-app-proto.log') -Force -ErrorAction SilentlyContinue
Remove-Item (Join-Path $env:TEMP 'cub3d-first.log') -Force -ErrorAction SilentlyContinue
# 启动（带日志）
$logFile = Join-Path $env:TEMP 'cub3d-first.log'
Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -ArgumentList @('--enable-logging','--log-file=' + $logFile,'--v=1') -PassThru | Out-Null
Start-Sleep -Seconds 14
$p = Get-Process -Name 'cub3d-editor' -ErrorAction SilentlyContinue | Select-Object -First 1
"PID=$($p.Id) TITLE=[$($p.MainWindowTitle)]" | Out-File -FilePath (Join-Path $env:TEMP 'cub3d-first.txt')
Write-Host "FIRST RUN (with legacy data) LAUNCHED"
