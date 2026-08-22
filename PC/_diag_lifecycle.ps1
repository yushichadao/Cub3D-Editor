$ErrorActionPreference = 'Continue'
Set-Location 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC'
Get-Process -Name 'cub3d-editor' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
$ad = $env:APPDATA
foreach ($d in @((Join-Path $ad 'Cub3DEditor'), (Join-Path $ad '立方·3D设计工坊'))) {
  if (Test-Path $d) { Remove-Item $d -Recurse -Force -ErrorAction SilentlyContinue }
}
$legacy = Join-Path $ad '立方·3D设计工坊'
New-Item -ItemType Directory -Force -Path (Join-Path $legacy 'projects') | Out-Null
1..200 | ForEach-Object { Set-Content -Path (Join-Path $legacy ('projects/proj_' + $_ + '.json')) -Value ('{"id":' + $_ + '}') }
Set-Content -Path (Join-Path $legacy 'config.json') -Value '{"migrated":false}'
Remove-Item (Join-Path $env:TEMP 'cub3d-timing.log') -Force -ErrorAction SilentlyContinue
Remove-Item (Join-Path $env:TEMP 'cub3d-app-proto.log') -Force -ErrorAction SilentlyContinue
# 启动带调试端口的首次实例（保留系统 NODE_OPTIONS）
Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -ArgumentList '--remote-debugging-port=9333' -PassThru | Out-Null
Write-Host "LAUNCHED first-run with debugger"
