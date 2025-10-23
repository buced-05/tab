@echo off
echo ========================================
echo    Organizing AUT Project Scripts
echo ========================================
echo.

REM Move test scripts
echo [1/4] Moving test scripts...
if exist test-translations.js move /Y test-translations.js test\
if exist test-product-translations.js move /Y test-product-translations.js test\
if exist test-final-translations.js move /Y test-final-translations.js test\

REM Move generation/utility scripts
echo [2/4] Moving utility scripts...
if exist generate-product-translations.js move /Y generate-product-translations.js utils\
if exist generate-real-product-translations.js move /Y generate-real-product-translations.js utils\

REM Move deployment scripts from root to scripts/deploy
echo [3/4] Moving deployment scripts...
if exist ..\deploy-alladsmarket.sh move /Y ..\deploy-alladsmarket.sh deploy\
if exist ..\deploy-vps.sh move /Y ..\deploy-vps.sh deploy\

REM Move ecosystem config to deploy
if exist ..\ecosystem.config.js move /Y ..\ecosystem.config.js deploy\

echo [4/4] Creating script index...

echo.
echo ========================================
echo    Scripts organized successfully!
echo ========================================
echo.
echo Development scripts: scripts\dev\
echo Build scripts: scripts\build\
echo Test scripts: scripts\test\
echo Deployment scripts: scripts\deploy\
echo Utility scripts: scripts\utils\
echo.
pause


