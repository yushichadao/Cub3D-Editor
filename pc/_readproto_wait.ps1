$ErrorActionPreference = 'Continue'
$proto = Join-Path $env:TEMP 'cub3d-app-proto.log'
Start-Sleep -Seconds 25
Write-Host "=== PROTO (after wait) ==="
if (Test-Path $proto) {
  $lines = Get-Content $proto
  Write-Host ("LINES=" + $lines.Count)
  $lines | Select-Object -First 4 | ForEach-Object { Write-Host $_ }
  if ($lines.Count -gt 2) { Write-Host ("LAST : " + $lines[-1]) }
} else { Write-Host "NO PROTO" }
