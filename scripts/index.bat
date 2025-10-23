@echo off
title AUT Project Scripts Menu
color 0A

:menu
cls
echo ========================================
echo      AUT PROJECT SCRIPTS MENU
echo ========================================
echo.
echo [DEV] Development Scripts
echo   1. Clean Restart
echo   2. Restart Dev Server
echo   3. Clear Browser Data
echo   4. Fix 431 Error
echo.
echo [TEST] Testing Scripts
echo   5. Test Translations
echo   6. Test Product Translations
echo   7. Test Final Translations
echo.
echo [UTILS] Utility Scripts
echo   8. Generate Product Translations
echo   9. Generate Real Product Translations
echo.
echo [DEPLOY] Deployment Scripts
echo   10. Deploy to AllAdsMarket
echo   11. Deploy to VPS
echo.
echo   0. Exit
echo.
echo ========================================
set /p choice="Enter your choice: "

if "%choice%"=="1" goto clean_restart
if "%choice%"=="2" goto restart_dev
if "%choice%"=="3" goto clear_browser
if "%choice%"=="4" goto fix_431
if "%choice%"=="5" goto test_trans
if "%choice%"=="6" goto test_prod
if "%choice%"=="7" goto test_final
if "%choice%"=="8" goto gen_trans
if "%choice%"=="9" goto gen_real
if "%choice%"=="10" goto deploy_allads
if "%choice%"=="11" goto deploy_vps
if "%choice%"=="0" goto end

echo Invalid choice. Please try again.
timeout /t 2 >nul
goto menu

:clean_restart
echo.
echo Running Clean Restart...
call dev\clean-restart.bat
goto menu

:restart_dev
echo.
echo Restarting Dev Server...
call dev\restart-dev-server.bat
goto menu

:clear_browser
echo.
echo Clearing Browser Data...
call dev\clear-browser-data.bat
goto menu

:fix_431
echo.
echo Fixing 431 Error...
call dev\fix-431-error.bat
goto menu

:test_trans
echo.
echo Testing Translations...
cd test
node test-translations.js
cd ..
pause
goto menu

:test_prod
echo.
echo Testing Product Translations...
cd test
node test-product-translations.js
cd ..
pause
goto menu

:test_final
echo.
echo Testing Final Translations...
cd test
node test-final-translations.js
cd ..
pause
goto menu

:gen_trans
echo.
echo Generating Product Translations...
cd utils
node generate-product-translations.js
cd ..
pause
goto menu

:gen_real
echo.
echo Generating Real Product Translations...
cd utils
node generate-real-product-translations.js
cd ..
pause
goto menu

:deploy_allads
echo.
echo Deploying to AllAdsMarket...
cd deploy
bash deploy-alladsmarket.sh
cd ..
pause
goto menu

:deploy_vps
echo.
echo Deploying to VPS...
cd deploy
bash deploy-vps.sh
cd ..
pause
goto menu

:end
echo.
echo Exiting...
exit


