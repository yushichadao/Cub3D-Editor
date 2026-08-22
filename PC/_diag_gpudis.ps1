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
$proto = Join-Path $env:TEMP 'cub3d-app-proto.log'
Remove-Item $proto -Force -ErrorAction SilentlyContinue
Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -ArgumentList @('--disable-gpu','--use-gl=swiftshader') -PassThru | Out-Null
Write-Host "LAUNCHED with --disable-gpu"
Start-Sleep -Seconds 12
$proto = Join-Path $env:TEMP 'cub3d-app-proto.log'
if (Test-Path $proto) { $l=Get-Content $proto; Write-Host ("@12s LINES="+$l.Count); $l|Select-Object -First 2|ForEach-Object{Write-Host $_} } else { Write-Host "NO PROTO @12s" }
