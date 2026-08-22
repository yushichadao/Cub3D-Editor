$ErrorActionPreference = 'Continue'
Start-Sleep -Seconds 35
$t = Join-Path $env:TEMP 'cub3d-timing.log'
Write-Host "=== TIMING ==="
if (Test-Path $t) {
  $lines = Get-Content $t
  $lines | ForEach-Object { Write-Host $_ }
  # 计算相邻事件差
  $ts = @()
  foreach ($l in $lines) { if ($l -match '^(\d+) (.+)$') { $ts += [PSCustomObject]@{ms=[long]$Matches[1]; ev=$Matches[2]} } }
  for ($i=1; $i -lt $ts.Count; $i++) {
    $gap = ($ts[$i].ms - $ts[$i-1].ms)
    Write-Host ("  <= " + $ts[$i-1].ev + " -> " + $ts[$i].ev + " : " + ($gap/1000.0).ToString('0.0') + "s")
  }
} else { Write-Host "NO TIMING LOG" }
