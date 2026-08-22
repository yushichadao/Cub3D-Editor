$ErrorActionPreference = 'Continue'
Set-Location 'C:\Users\yushi\CodeBuddy\Cub3D Editor\PC'
Start-Process -FilePath '.\dist\win-unpacked\cub3d-editor.exe' -ArgumentList '--remote-debugging-port=9333' -PassThru | Out-Null
Start-Sleep -Seconds 6
# 确认端口已开
try {
  $r = Invoke-WebRequest -Uri 'http://127.0.0.1:9333/json/version' -UseBasicParsing -TimeoutSec 5
  Write-Host "DEVTOOLS_UP"
} catch {
  Write-Host "DEVTOOLS_DOWN: $_"
}
# 进程保留
