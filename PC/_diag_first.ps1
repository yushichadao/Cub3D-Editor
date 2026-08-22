$ErrorActionPreference = 'Continue'
Set-Location 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC'
Get-Process -Name 'cub3d-editor' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

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
$log = Join-Path $env:TEMP 'cub3d-first.log'
Remove-Item $proto, $log -Force -ErrorAction SilentlyContinue

Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -ArgumentList "--enable-logging","--log-file=$log","--v=1" -PassThru | Out-Null
Start-Sleep -Seconds 14

Write-Host "=== PROTO (first request -> sub resources gap) ==="
if (Test-Path $proto) {
  $lines = Get-Content $proto
  $first = $lines[0]
  $second = $lines[1]
  Write-Host "FIRST : $first"
  Write-Host "SECOND: $second"
}

Write-Host ""
Write-Host "=== CHROMIUM LOG (cache/gpu/error) ==="
if (Test-Path $log) {
  $c = Get-Content $log
  Write-Host ("LINES=" + $c.Count)
  $c | Where-Object { $_ -match 'cache|Cache|disk|GPU|move|Unable|denied|0x5|ERROR|net::|blocked|timeout|Timeout|failed|Failed' } | Select-Object -First 40 | ForEach-Object { Write-Host $_ }
} else {
  Write-Host "NO CHROMIUM LOG FILE"
}
