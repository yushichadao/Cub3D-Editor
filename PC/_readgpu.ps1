$ErrorActionPreference = 'Continue'
$f = Join-Path $env:TEMP 'cub3d-chromium.log'
if (-not (Test-Path $f)) { Write-Host 'NO LOG'; exit }
$c = Get-Content $f
Write-Host ("LINES=" + $c.Count)
$c | Where-Object { $_ -match 'Gpu Cache|Unable to move|Unable to create cache|disk_cache|SwiftShader|unsafe|GPU process' } | Select-Object -First 25 | ForEach-Object { Write-Host $_ }
