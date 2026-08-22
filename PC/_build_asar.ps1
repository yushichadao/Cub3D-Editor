$src = 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC'
$dst = 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC\.asar_build'
if (Test-Path $dst) { Remove-Item $dst -Recurse -Force }
New-Item -ItemType Directory -Force -Path $dst | Out-Null
$items = @('index.html','lang-override.js','server.js','package.json','LICENSE','README.md','vercel.json','three','language','fonts','docs','shell','electron')
foreach ($i in $items) {
  $p = Join-Path $src $i
  if (Test-Path $p) { Copy-Item -Path $p -Destination (Join-Path $dst $i) -Recurse -Force }
}
Write-Host "COPIED"
