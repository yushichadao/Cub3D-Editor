# Install Android SDK packages required for building the APK.
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File scripts/setup-android-sdk.ps1

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$Tools   = 'C:\Users\yushi\dev-tools'
$JavaDir = Join-Path $Tools 'jdk17'
$SdkDir  = Join-Path $Tools 'android-sdk'
$SdkMgr  = Join-Path $SdkDir 'cmdline-tools\latest\bin\sdkmanager.bat'

if (-not (Test-Path $JavaDir)) { throw "JDK not found: $JavaDir" }
if (-not (Test-Path $SdkMgr))  { throw "sdkmanager not found: $SdkMgr" }

$env:JAVA_HOME        = $JavaDir
$env:ANDROID_HOME     = $SdkDir
$env:ANDROID_SDK_ROOT = $SdkDir
$env:PATH             = "$JavaDir\bin;$env:PATH"

Write-Host '=== 1/2 Writing license acceptance files ==='
$licDir = Join-Path $SdkDir 'licenses'
New-Item -ItemType Directory -Force -Path $licDir | Out-Null

$licenses = @{
    'android-sdk-license' = @(
        '8933bad161af4178b1185d1a37fbf41ea5269c55',
        'd56f5187479451eabf01fb78af6dfcb131a6481e',
        '24333f8a63b6825ea9c5514f83c2829b004d1fee'
    )
    'android-sdk-preview-license' = @(
        '84831b9409646a918e30573bab4c9c91346d8abd',
        '504667f4c0de7af1a06de9f4b1727b84351f2910'
    )
    'android-sdk-arm-dbt-license' = @('859f317696f67ef3d7f30a50a5560e7834b43903')
    'google-gdk-license'          = @('33b6a2b64607f11b759f320ef9dff4ae5c47d97a')
    'mips-android-sysimage-license' = @('e9acab5b5fbb560a72cfaecce8946896ff6aab9d')
    'android-googletv-license'    = @('601085b94cd77f0b54ff86406957099ebe79c4d6')
    'intel-android-extra-license' = @('d975f751698a77b662f1254ddbeed3901e976f5a')
}

foreach ($name in $licenses.Keys) {
    $text = ($licenses[$name] -join "`n")
    [System.IO.File]::WriteAllText((Join-Path $licDir $name), "`n$text`n", (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "  accepted: $name"
}

Write-Host '=== 2/2 Installing SDK packages ==='
& $SdkMgr --sdk_root="$SdkDir" 'platform-tools' 'platforms;android-34' 'build-tools;34.0.0' 2>&1 |
    ForEach-Object { $_ } | Select-Object -Last 25

Write-Host '=== Installed directories ==='
Get-ChildItem $SdkDir -Directory | Select-Object -ExpandProperty Name
if (Test-Path (Join-Path $SdkDir 'build-tools')) {
    Write-Host 'build-tools:'; Get-ChildItem (Join-Path $SdkDir 'build-tools') -Directory | Select-Object -ExpandProperty Name
}
if (Test-Path (Join-Path $SdkDir 'platforms')) {
    Write-Host 'platforms:'; Get-ChildItem (Join-Path $SdkDir 'platforms') -Directory | Select-Object -ExpandProperty Name
}
Write-Host 'DONE'
