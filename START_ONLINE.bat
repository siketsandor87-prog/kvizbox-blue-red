@echo off
title KVIZBOX BLUE-RED - Online Publikus Inditas
cd /d "%~dp0"
echo Inditas: KVIZBOX BLUE-RED szerver + nyilvanos internetes link...
start "KVIZBOX Szerver" cmd /k "node server.js"
timeout /t 2 /nobreak >nul
echo.
echo A nyilvanos https://...trycloudflare.com link par masodpercen belul megjelenik alabb!
echo.
if exist "C:\Program Files (x86)\cloudflared\cloudflared.exe" (
  "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --url http://localhost:3000
) else if exist "C:\Program Files\cloudflared\cloudflared.exe" (
  "C:\Program Files\cloudflared\cloudflared.exe" tunnel --url http://localhost:3000
) else (
  cloudflared tunnel --url http://localhost:3000
)
pause
