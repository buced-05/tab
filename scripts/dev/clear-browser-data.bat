@echo off
echo Clearing browser data to fix HTTP 431 error...

REM Clear Chrome data
taskkill /f /im chrome.exe 2>nul
taskkill /f /im msedge.exe 2>nul
taskkill /f /im firefox.exe 2>nul

REM Clear browser cache directories
rmdir /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache" 2>nul
rmdir /s /q "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Cache" 2>nul
rmdir /s /q "%APPDATA%\Mozilla\Firefox\Profiles\*\cache2" 2>nul

REM Clear Vite cache
rmdir /s /q "node_modules\.vite" 2>nul
rmdir /s /q "%TEMP%\vite*" 2>nul

echo Browser data cleared. Starting development server...
npm run dev
