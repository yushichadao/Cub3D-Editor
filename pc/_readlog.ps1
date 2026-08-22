$ErrorActionPreference = 'Continue'
$f = Join-Path $env:TEMP 'cub3d-chromium.log'
if (-not (Test-Path $f)) { Write-Host 'NO LOG FILE'; exit }
$c = Get-Content $f
Write-Host ("LINES=" + $c.Count)
$c | Where-Object { $_ -match 'CONSOLE|ERROR|Uncaught|Exception|^Failed|page-error|not found|undefined|Denied|Refused|import|SyntaxError' } | Select-Object -First 100 | ForEach-Object { Write-Host $_ }
