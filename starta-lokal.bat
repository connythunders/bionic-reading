@echo off
REM
REM LOKAL UTVECKLINGSSERVER (Windows)
REM ==================================
REM Dubbelklicka på denna fil för att starta!
REM

echo.
echo ==============================================
echo    LOKAL UTVECKLINGSSERVER STARTAR!
echo ==============================================
echo.
echo Din webbsida finns nu pa:
echo.
echo    http://localhost:8000
echo.
echo    Startsida:     http://localhost:8000/index.html
echo    AI Quiz:       http://localhost:8000/ai-quiz-generator.html
echo.
echo ----------------------------------------------
echo    Stang detta fonster for att stoppa
echo ----------------------------------------------
echo.

cd /d "%~dp0"
python -m http.server 8000
pause
