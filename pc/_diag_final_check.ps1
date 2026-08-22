$ErrorActionPreference = 'Continue'
Set-Location 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC'
Get-Process -Name 'cub3d-editor' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
# 确认系统 NODE_OPTIONS 仍生效（模拟真实双击环境）
Write-Host ("NODE_OPTIONS present: " + ($env:NODE_OPTIONS -ne $null))
# 清理 userData + 造旧中文目录含大量数据（复现首次/迁移场景）
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
# 普通启动（不带任何调试/网络开关，模拟真实双击），继承系统 NODE_OPTIONS
Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -PassThru | Out-Null
Start-Sleep -Seconds 12
Write-Host "=== PROTO @12s ==="
if (Test-Path $proto) {
  $lines = Get-Content $proto
  Write-Host ("LINES=" + $lines.Count)
  $lines | Select-Object -First 3 | ForEach-Object { Write-Host $_ }
} else { Write-Host "NO PROTO YET (good sign if index.html already responded fast)" }
Start-Sleep -Seconds 25
Write-Host "=== PROTO @37s ==="
if (Test-Path $proto) {
  $lines = Get-Content $proto
  Write-Host ("LINES=" + $lines.Count)
  $lines | Select-Object -First 3 | ForEach-Object { Write-Host $_ }
  if ($lines.Count -gt 1) { Write-Host ("GAP OK if index->sub within ~1s") }
}
