$ErrorActionPreference = 'Continue'
Set-Location 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC'
Get-Process -Name 'cub3d-editor' -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
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
Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -ArgumentList @('--no-first-run','--disable-component-update','--disable-background-networking') -PassThru | Out-Null
Start-Sleep -Seconds 35
Write-Host "=== PROTO ==="
if (Test-Path $proto) {
  $lines = Get-Content $proto
  Write-Host ("LINES=" + $lines.Count)
  $lines | Select-Object -First 2 | ForEach-Object { Write-Host $_ }
  if ($lines.Count -gt 1) {
    $t1 = [DateTime]::ParseExact(($lines[0] -split '\[')[1].Split(']')[0], 'yyyy-MM-ddTHH:mm:ss.fffZ', $null)
    $t2 = [DateTime]::ParseExact(($lines[1] -split '\[')[1].Split(']')[0], 'yyyy-MM-ddTHH:mm:ss.fffZ', $null)
    $gap = ($t2 - $t1).TotalSeconds
    Write-Host ("GAP = " + $gap.ToString('0.0') + "s  " + $(if($gap -lt 3){'PASS'}else{'STILL ~'+$gap.ToString('0')+'s'}))
  }
} else { Write-Host "NO PROTO" }
