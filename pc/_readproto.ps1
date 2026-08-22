$ErrorActionPreference = 'Continue'
$p = Join-Path $env:TEMP 'cub3d-app-proto.log'
if (-not (Test-Path $p)) { Write-Host 'NO PROTO LOG'; exit }
$lines = Get-Content $p
Write-Host ("PROTO LINES=" + $lines.Count)
$lines | ForEach-Object { Write-Host $_ }
