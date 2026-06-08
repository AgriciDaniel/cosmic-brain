@echo off
cd /d "%~dp0"

if not exist "node_modules\.bin\slidev.cmd" goto :install
if not exist "node_modules\@rolldown\binding-win32-x64-msvc" goto :reinstall
goto :run

:reinstall
echo node_modules was built for a different platform. Reinstalling...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f /q package-lock.json

:install
call npm install

:run
npm run dev
