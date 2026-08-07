$p = 'node_modules/app-builder-lib/templates/nsis/assistedInstaller.nsh'
$b = [System.IO.File]::ReadAllBytes($p)
$hasBom = ($b.Length -ge 3 -and $b[0] -eq 0xEF -and $b[1] -eq 0xBB -and $b[2] -eq 0xBF)
Write-Host ("Current BOM: " + $hasBom)
if (-not $hasBom) {
  $c = [System.IO.File]::ReadAllText($p)
  [System.IO.File]::WriteAllText($p, $c, [System.Text.UTF8Encoding]::new($true))
  Write-Host "Added UTF-8 BOM"
} else {
  Write-Host "Already has BOM"
}
