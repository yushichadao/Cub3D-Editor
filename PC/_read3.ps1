$ErrorActionPreference = 'Continue'
Write-Host "=== STATUS ==="
$s = Join-Path $env:TEMP 'cub3d-status.txt'
if (Test-Path $s) { Get-Content $s | ForEach-Object { Write-Host $_ } } else { Write-Host "NO STATUS" }

Write-Host ""
Write-Host "=== PROTO LOG ==="
$p = Join-Path $env:TEMP 'cub3d-app-proto.log'
if (Test-Path $p) {
  $lines = Get-Content $p
  Write-Host ("LINES=" + $lines.Count)
  $lines | ForEach-Object { Write-Host $_ }
} else { Write-Host "NO PROTO LOG" }

Write-Host ""
Write-Host "=== RENDER LOG ==="
$r = Join-Path $env:TEMP 'cub3d-render.log'
if (Test-Path $r) {
  $lines = Get-Content $r
  Write-Host ("LINES=" + $lines.Count)
  $lines | ForEach-Object { Write-Host $_ }
} else { Write-Host "NO RENDER LOG" }
