$ErrorActionPreference = 'Continue'
Set-Location 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC'
$proto = Join-Path $env:TEMP 'cub3d-app-proto.log'
$render = Join-Path $env:TEMP 'cub3d-render.log'
$status = Join-Path $env:TEMP 'cub3d-status.txt'
Remove-Item $proto, $render, $status -Force -ErrorAction SilentlyContinue
$p = Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -ArgumentList '--enable-logging','--v=1' -PassThru
Start-Sleep -Seconds 18
$alive = -not $p.HasExited
$protoCount = if (Test-Path $proto) { (Get-Content $proto).Count } else { 0 }
$renderCount = if (Test-Path $render) { (Get-Content $render).Count } else { 0 }
"ALIVE=$alive" | Out-File -FilePath $status -Append
"PROTO_LINES=$protoCount" | Out-File -FilePath $status -Append
"RENDER_LINES=$renderCount" | Out-File -FilePath $status -Append
# 进程保留，供手动结束
