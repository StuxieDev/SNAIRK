@echo off
REM SNAIRK - local dev server (Windows)
REM Usage: dev-server.bat [port] [--no-dev-mode]
REM   port            default: 5173
REM   --no-dev-mode   don't force DEV_MODE on for this run (no dev banner)
setlocal
cd /d "%~dp0"

set "DEV=1"
set "PORTARG="
:args
if "%~1"=="" goto run
if /i "%~1"=="--no-dev-mode" (
    set "DEV=0"
) else (
    echo %~1| findstr /r "^[0-9][0-9]*$" >nul
    if errorlevel 1 (
        echo Unknown option: %~1
        exit /b 1
    )
    set "PORTARG=--port %~1"
)
shift
goto args

:run
if not exist node_modules call npm install
if "%DEV%"=="1" (set "VITE_DEV_MODE=1") else (set "VITE_DEV_MODE=")
call npx vite %PORTARG%
