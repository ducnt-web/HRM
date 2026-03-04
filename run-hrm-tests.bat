@echo off
REM HRM App Automation - Quick Start Script for Windows
REM This script sets up and runs the HRM login automation tests

setlocal enabledelayedexpansion

echo.
echo 🚀 HRM App Automation Quick Start
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo ✓ Node.js version:
node --version
echo ✓ npm version:
npm --version
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo ✓ Dependencies installed
echo.

REM Run the main automation test
echo 🧪 Running HRM Login Automation Tests...
echo.
call npx playwright test tests\hrm-login-workflow.spec.ts --headed

echo.
echo ✓ Tests completed!
echo.
echo 📊 View detailed report:
echo    npx playwright show-report
echo.
echo 🎥 Run in interactive mode:
echo    npx playwright test tests\hrm-login-workflow.spec.ts --ui
echo.
echo 👀 Run in headed mode to see browser:
echo    npx playwright test tests\hrm-login-workflow.spec.ts --headed
echo.

endlocal
pause
