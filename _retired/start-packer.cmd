@echo off
rem Cub3D Editor - Local Packer Agent launcher
rem Connect to the production server and run the remote packing agent.
rem Password is read from env CUB3D_ADMIN_PASS, or prompted once per launch.
cd /d "%~dp0"
if not defined CUB3D_ADMIN_PASS (
    set /p CUB3D_ADMIN_PASS=Enter admin password: 
)
echo Starting local packer agent (Ctrl+C to stop)...
node admin/local-packer.mjs --pass %CUB3D_ADMIN_PASS%
pause
