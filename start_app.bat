@echo off
cd /d "%~dp0"
echo Starting CareerAI System...

echo Starting Backend...
start "CareerAI Backend" backend\start_backend.bat

echo Starting Frontend...
start "CareerAI Frontend" career-ai-demo\start_frontend.bat

echo.
echo Application started!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:8000
echo.
pause
