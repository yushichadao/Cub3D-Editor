$ErrorActionPreference = 'Continue'
Set-Location 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC'
Get-Process -Name 'cub3d-editor' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
$logFile = Join-Path $env:TEMP 'cub3d-first.log'
Remove-Item $logFile -Force -ErrorAction SilentlyContinue
Remove-Item (Join-Path $env:TEMP 'cub3d-app-proto.log') -Force -ErrorAction SilentlyContinue
Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -ArgumentList @('--remote-debugging-port=9333','--enable-logging','--log-file=' + $logFile,'--v=1') -PassThru | Out-Null
Start-Sleep -Seconds 14
$p = Get-Process -Name 'cub3d-editor' -ErrorAction SilentlyContinue | Select-Object -First 1
"PID=$($p.Id) TITLE=[$($p.MainWindowTitle)]" | Out-File -FilePath (Join-Path $env:TEMP 'cub3d-first.txt')
Write-Host "FIRST RUN LAUNCHED (clean userData)"
