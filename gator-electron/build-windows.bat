@echo off
chcp 65001 >nul
echo ========================================
echo   Gator Electron 打包工具 (Windows)
echo ========================================
echo.

:: 检查 Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [错误] 未找到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

:: 检查是否已安装依赖
if not exist node_modules (
    echo [信息] 首次运行，正在安装依赖...
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
    echo.
)

echo [信息] 开始打包 Windows 版本...
echo.

call npx electron-builder --win

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   打包成功！输出目录: dist\
    echo ========================================
) else (
    echo.
    echo [错误] 打包失败，请检查错误信息
)

pause
