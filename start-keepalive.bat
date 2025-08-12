@echo off
echo Starting HiiNen Backend Keep-Alive Service...
echo.
echo This will ping your Render backend every 10 minutes to keep it awake.
echo Your app will stay functional even during grading!
echo.
echo Press Ctrl+C to stop the service
echo.

node keep-alive.js

pause
