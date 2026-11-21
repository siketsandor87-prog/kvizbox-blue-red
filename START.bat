@echo off
title KVIZBOX BLUE-RED - Think & Drink Pub Quiz
cd /d "%~dp0"
echo Inditas: KVIZBOX BLUE-RED szerver...
start "" http://localhost:3000
node server.js
pause
