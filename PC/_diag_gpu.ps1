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
# 禁用 GPU 缓存目录（独立于 shader disk cache）
Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -ArgumentList @('--disable-gpu-cache','--disable-gpu-shader-disk-cache') -PassThru | Out-Null
Start-Sleep -Seconds 35
Write-Host "=== PROTO ==="
if (Test-Path $proto) {
  $lines = Get-Content $proto
  Write-Host ("LINES=" + $lines.Count)
  $lines | Select-Object -First 3 | ForEach-Object { Write-Host $_ }
} else { Write-Host "NO PROTO" }
