#!/bin/bash
# ============================================================
#  Gator Android APK Build Script (Mac/Linux)
#  Requires: Node.js, npm, Android SDK with ANDROID_HOME set
# ============================================================

set -e

echo "============================================"
echo "  Gator Android APK Build Script"
echo "============================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in PATH."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is not installed or not in PATH."
    exit 1
fi

# Check ANDROID_HOME
if [ -z "$ANDROID_HOME" ]; then
    echo "[ERROR] ANDROID_HOME environment variable is not set."
    echo "Please set ANDROID_HOME to your Android SDK path."
    echo "Example: export ANDROID_HOME=\$HOME/Android/Sdk"
    exit 1
fi

echo "[INFO] Node.js version: $(node --version)"
echo "[INFO] npm version: $(npm --version)"
echo "[INFO] ANDROID_HOME: $ANDROID_HOME"
echo ""

# Step 1: Install dependencies
echo "[Step 1/5] Installing npm dependencies..."
npm install
echo "[OK] Dependencies installed."
echo ""

# Step 2: Add Android platform (if not already added)
echo "[Step 2/5] Adding Android platform..."
if [ ! -d "android" ]; then
    npx cap add android
    echo "[OK] Android platform added."
else
    echo "[OK] Android platform already exists, skipping."
fi
echo ""

# Step 3: Copy web assets to Android project
echo "[Step 3/5] Syncing web assets to Android project..."
npx cap sync android
echo "[OK] Web assets synced."
echo ""

# Step 4: Build debug APK
echo "[Step 4/5] Building debug APK..."
cd android
./gradlew assembleDebug
cd ..
echo "[OK] Debug APK built successfully."
echo ""

# Step 5: Show output path
echo "[Step 5/5] Done!"
echo ""
echo "============================================"
echo "  APK Output:"
echo "  android/app/build/outputs/apk/debug/app-debug.apk"
echo "============================================"
echo ""
