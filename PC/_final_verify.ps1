$ErrorActionPreference = 'Continue'
Set-Location 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC'
# 清理残留
Get-Process -Name 'cub3d-editor' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
# 启动一个“普通双击式”实例（不带调试端口）
$p = Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -PassThru
Start-Sleep -Seconds 6
$alive = -not $p.HasExited
"ALIVE=$alive PID=$($p.Id)" | Out-File -FilePath (Join-Path $env:TEMP 'cub3d-final.txt')
# 抓窗口标题（确认窗口出现且非白屏空白）
$t = (Get-Process -Id $p.Id -ErrorAction SilentlyContinue).MainWindowTitle
"TITLE=$t" | Out-File -FilePath (Join-Path $env:TEMP 'cub3d-final.txt') -Append
# 进程保留，待 cdp 连接检查
