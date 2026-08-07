$env:ELECTRON_MIRROR = "https://registry.npmmirror.com/-/binary/electron/"
$env:ELECTRON_BUILDER_BINARIES_MIRROR = "https://registry.npmmirror.com/-/binary/electron-builder-binaries/"

Remove-Item -Recurse -Force dist-build -ErrorAction SilentlyContinue

$proc = Start-Process -FilePath "node" `
  -ArgumentList "node_modules/electron-builder/cli.js","--win","--config","electron-builder.tmp.yml" `
  -RedirectStandardOutput "build.log" -RedirectStandardError "build.err" -PassThru
$proc.Id
