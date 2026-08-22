$ErrorActionPreference = 'Continue'
$f = Join-Path $env:TEMP 'cub3d-first.log'
if (-not (Test-Path $f)) { Write-Host 'NO LOG'; exit }
$c = Get-Content $f
Write-Host ("LINES=" + $c.Count)
$c | Where-Object { $_ -match 'cache|Cache|disk|GPU|move|Unable|denied|0x5|ERROR|fail|Fail|timeout|Timeout|net::|blocked|Defender' } | Select-Object -First 40 | ForEach-Object { Write-Host $_ }
