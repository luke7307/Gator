#!/bin/bash
echo "========================================"
echo "  Gator Electron 打包工具 (macOS)"
echo "========================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "[错误] 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "[信息] 首次运行，正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[错误] 依赖安装失败"
        exit 1
    fi
    echo ""
fi

echo "[信息] 开始打包 macOS 版本..."
echo ""

npx electron-builder --mac

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "  打包成功！输出目录: dist/"
    echo "========================================"
else
    echo ""
    echo "[错误] 打包失败，请检查错误信息"
    exit 1
fi
