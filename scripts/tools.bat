@echo off
setlocal EnableExtensions EnableDelayedExpansion

:: Unified tools entrypoint
:: Usage examples:
::   scripts\tools.bat clean-restart
::   scripts\tools.bat clear-browser
::   scripts\tools.bat fix-431
::   scripts\tools.bat restart-dev
::   scripts\tools.bat deploy-translations
::   scripts\tools.bat index

if "%~1"=="" goto :usage
set CMD=%~1
shift

if /I "%CMD%"=="clean-restart"        goto :clean_restart
if /I "%CMD%"=="clear-browser"        goto :clear_browser
if /I "%CMD%"=="fix-431"              goto :fix_431
if /I "%CMD%"=="restart-dev"          goto :restart_dev
if /I "%CMD%"=="deploy-translations"  goto :deploy_translations
if /I "%CMD%"=="index"                goto :run_index

:usage
  echo.
  echo Usage: scripts\tools.bat ^<command^>
  echo.
  echo Commands:
  echo   clean-restart        - Clean caches and restart local dev services
  echo   clear-browser        - Clear browser cached data (dev convenience)
  echo   fix-431              - Apply workaround for HTTP 431 dev error
  echo   restart-dev          - Restart the dev server
  echo   deploy-translations  - Deploy translations to VPS
  echo   index                - Run scripts\index.bat
  echo.
  exit /b 1

:clean_restart
  if exist "%~dp0dev\clean-restart.bat" (
    call "%~dp0dev\clean-restart.bat" %*
    exit /b !errorlevel!
  ) else (
    echo File not found: dev\clean-restart.bat
    exit /b 1
  )

:clear_browser
  if exist "%~dp0dev\clear-browser-data.bat" (
    call "%~dp0dev\clear-browser-data.bat" %*
    exit /b !errorlevel!
  ) else (
    echo File not found: dev\clear-browser-data.bat
    exit /b 1
  )

:fix_431
  if exist "%~dp0dev\fix-431-error.bat" (
    call "%~dp0dev\fix-431-error.bat" %*
    exit /b !errorlevel!
  ) else (
    echo File not found: dev\fix-431-error.bat
    exit /b 1
  )

:restart_dev
  if exist "%~dp0dev\restart-dev-server.bat" (
    call "%~dp0dev\restart-dev-server.bat" %*
    exit /b !errorlevel!
  ) else (
    echo File not found: dev\restart-dev-server.bat
    exit /b 1
  )

:deploy_translations
  if exist "%~dp0vps\deploy-vps-translations.bat" (
    call "%~dp0vps\deploy-vps-translations.bat" %*
    exit /b !errorlevel!
  ) else (
    echo File not found: vps\deploy-vps-translations.bat
    exit /b 1
  )

:run_index
  if exist "%~dp0index.bat" (
    call "%~dp0index.bat" %*
    exit /b !errorlevel!
  ) else (
    echo File not found: scripts\index.bat
    exit /b 1
  )

endlocal
