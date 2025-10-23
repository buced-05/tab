@echo off
echo Fixing HTTP 431 error - Request Header Fields Too Large
echo.

REM Kill all browser processes
echo [1/6] Closing all browsers...
taskkill /f /im chrome.exe 2>nul
taskkill /f /im msedge.exe 2>nul
taskkill /f /im firefox.exe 2>nul
taskkill /f /im brave.exe 2>nul
echo Browsers closed.

REM Clear browser cache directories
echo [2/6] Clearing browser cache...
rmdir /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache" 2>nul
rmdir /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Code Cache" 2>nul
rmdir /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\GPUCache" 2>nul
rmdir /s /q "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Cache" 2>nul
rmdir /s /q "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Code Cache" 2>nul
rmdir /s /q "%APPDATA%\Mozilla\Firefox\Profiles\*\cache2" 2>nul
echo Browser cache cleared.

REM Clear Vite cache
echo [3/6] Clearing Vite cache...
rmdir /s /q "node_modules\.vite" 2>nul
rmdir /s /q "%TEMP%\vite*" 2>nul
echo Vite cache cleared.

REM Clear npm cache
echo [4/6] Clearing npm cache...
npm cache clean --force 2>nul
echo npm cache cleared.

REM Clear temporary files
echo [5/6] Clearing temporary files...
del /q /f "%TEMP%\*" 2>nul
rmdir /s /q "%TEMP%\*" 2>nul
echo Temporary files cleared.

REM Start with a different port and clear headers
echo [6/6] Starting development server on port 3003...
echo.
echo Opening browser in incognito/private mode to avoid cookies...
echo.

REM Start the server
npm run dev -- --port 3003 --host --force

echo.
echo If the error persists, try:
echo 1. Open browser in incognito/private mode
echo 2. Clear all browser data manually
echo 3. Try a different browser
echo 4. Restart your computer




