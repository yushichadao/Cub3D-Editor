# 自动解除执行策略限制（PowerShell 默认 Restricted 会禁止运行脚本）
if ($PSVersionTable.PSVersion.Major -ge 3) {
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
}

# 若非管理员，自动请求管理员权限重新运行本脚本（HttpListener 绑定 +:port 需要管理员）
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host '需要管理员权限以绑定端口，正在请求提权...' -ForegroundColor Yellow
    Start-Process -FilePath 'powershell.exe' -Verb RunAs -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`""
    exit
}

$port = 8090
$listener = New-Object System.Net.HttpListener

# 注册 URL 保留，使 +:port 可绑定到所有网卡（首次运行需管理员权限）
netsh http add urlacl url=http://+:$port/ user=Everyone 2>$null | Out-Null

$listener.Prefixes.Add("http://+:$port/")
try {
    $listener.Start()
} catch {
    Write-Host "无法绑定到 +:$port，请先以管理员身份运行一次以注册 URL ACL：" -ForegroundColor Red
    Write-Host "  netsh http add urlacl url=http://+:$port/ user=Everyone" -ForegroundColor Yellow
    exit 1
}

# 获取局域网 IP，方便手机访问
$lanIp = (Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object { $_.InterfaceAlias -notlike '*Loopback*' -and $_.IPAddress -ne '127.0.0.1' } |
    Select-Object -First 1).IPAddress

$root = 'c:\Users\yushi\Documents\trae_projects\3d-editor'
$mime = @{
    '.html'='text/html; charset=utf-8'
    '.js'='application/javascript; charset=utf-8'
    '.css'='text/css; charset=utf-8'
    '.json'='application/json; charset=utf-8'
    '.svg'='image/svg+xml'
    '.png'='image/png'
    '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'
    '.gif'='image/gif'
    '.woff'='font/woff'; '.woff2'='font/woff2'
    '.map'='application/json; charset=utf-8'
}

# 触屏版后缀：这些路径重定向到 /?touch，强制启用应用的移动/触屏布局
$touchPrefixes = @('/touch', '/m', '/mobile')

Write-Host '===== 3D 编辑器本地服务已启动 ====='
Write-Host "电脑版（主站）:  http://localhost:$port/"
Write-Host "手机版（触屏版）: http://localhost:$port/touch   (主站后加后缀 /touch)"
if ($lanIp) {
    Write-Host '--- 手机通过同一 WiFi/局域网访问 ---'
    Write-Host "电脑版:  http://${lanIp}:$port/"
    Write-Host "手机版:  http://${lanIp}:$port/touch"
}
Write-Host '=================================='

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $url = $ctx.Request.Url.LocalPath
    # 触屏版后缀 -> 302 重定向到 /?touch
    if ($touchPrefixes -contains $url.ToLower()) {
        $ctx.Response.StatusCode = 302
        $ctx.Response.RedirectLocation = '/?touch'
        $ctx.Response.Close()
        continue
    }
    if ($url -eq '/') { $url = '/index.html' }
    $file = Join-Path $root ($url.TrimStart('/'))
    if (Test-Path $file -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $ext = [System.IO.Path]::GetExtension($file).ToLower()
        $ct = 'application/octet-stream'
        if ($mime.ContainsKey($ext)) { $ct = $mime[$ext] }
        $ctx.Response.ContentType = $ct
        $ctx.Response.ContentLength64 = $bytes.Length
        $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $ctx.Response.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found: ' + $url)
        $ctx.Response.ContentType = 'text/plain; charset=utf-8'
        $ctx.Response.ContentLength64 = $msg.Length
        $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $ctx.Response.Close()
}
