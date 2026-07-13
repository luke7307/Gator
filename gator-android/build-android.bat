@echo off
REM ============================================================
REM  Gator Android APK Build Script (Windows)
REM  Requires: Node.js, npm, Android SDK with ANDROID_HOME set
REM ============================================================

setlocal

echo ============================================
echo   Gator Android APK Build Script
echo ============================================
echo.

REM Check Node.js
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Please install Node.js from https://nodejs.org/
    goto :error
)

REM Check npm
where npm >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] npm is not installed or not in PATH.
    goto :error
)

REM Check ANDROID_HOME
if "%ANDROID_HOME%"=="" (
    echo [ERROR] ANDROID_HOME environment variable is not set.
    echo Please set ANDROID_HOME to your Android SDK path.
    echo Example: set ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk
    goto :error
)

echo [INFO] Node.js version:
node --version
echo [INFO] npm version:
npm --version
echo [INFO] ANDROID_HOME: %ANDROID_HOME%
echo.

REM Step 1: Install dependencies
echo [Step 1/5] Installing npm dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    echo [ERROR] npm install failed.
    goto :error
)
echo [OK] Dependencies installed.
echo.

REM Step 2: Add Android platform (if not already added)
echo [Step 2/5] Adding Android platform...
if not exist "android" (
    call npx cap add android
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] Failed to add Android platform.
        goto :error
    )
    echo [OK] Android platform added.
) else (
    echo [OK] Android platform already exists, skipping.
)
echo.

REM Step 3: Copy web assets to Android project
echo [Step 3/5] Syncing web assets to Android project...
call npx cap sync android
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to sync assets.
    goto :error
)
echo [OK] Web assets synced.
echo.

REM Step 4: Build debug APK
echo [Step 4/5] Building debug APK...
cd android
call gradlew.bat assembleDebug
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Gradle build failed.
    cd ..
    goto :error
)
cd ..
echo [OK] Debug APK built successfully.
echo.

REM Step 5: Show output path
echo [Step 5/5] Done!
echo.
echo ============================================
echo   APK Output:
echo   android\app\build\outputs\apk\debug\app-debug.apk
echo ============================================
echo.
goto :end

:error
echo.
echo [FAILED] Build failed with errors. Please check the output above.
exit /b 1

:end
endlocal
