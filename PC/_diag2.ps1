$ErrorActionPreference = 'Continue'
Set-Location 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC'
$log = Join-Path $env:TEMP 'cub3d-chromium.log'
$proto = Join-Path $env:TEMP 'cub3d-app-proto.log'
Remove-Item $log,$proto -Force -ErrorAction SilentlyContinue
$p = Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -ArgumentList "--enable-logging","--log-file=$log","--v=1" -PassThru
Start-Sleep -Seconds 22
if (-not $p.HasExited) { Stop-Process -Id $p.Id -Force }
Write-Host "DONE exit=$($p.ExitCode)"
