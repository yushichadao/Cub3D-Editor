$ErrorActionPreference = 'Continue'
Start-Sleep -Seconds 15
$proto = Join-Path $env:TEMP 'cub3d-app-proto.log'
Write-Host "=== PROTO ==="
if (Test-Path $proto) {
  $lines = Get-Content $proto
  Write-Host ("LINES=" + $lines.Count)
  $lines | Select-Object -First 3 | ForEach-Object { Write-Host $_ }
  if ($lines.Count -gt 1) {
    $t1 = [DateTime]::ParseExact(($lines[0] -split '\[')[1].Split(']')[0], 'yyyy-MM-ddTHH:mm:ss.fffZ', $null)
    $t2 = [DateTime]::ParseExact(($lines[1] -split '\[')[1].Split(']')[0], 'yyyy-MM-ddTHH:mm:ss.fffZ', $null)
    $gap = ($t2 - $t1).TotalSeconds
    Write-Host ("GAP index->first-sub = " + $gap.ToString('0.0') + "s  " + ($(if($gap -lt 3){'PASS (no 30s stall)'}else{'STILL STALLED'})))
  }
} else { Write-Host "NO PROTO" }
