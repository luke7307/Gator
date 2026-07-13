# Gator Android APK - Capacitor 项目

将 Gator Web 应用打包为 Android APK 的 Capacitor 项目。

## 项目结构

```
gator-android/
├── package.json              # Node.js 依赖配置
├── capacitor.config.json     # Capacitor 配置
├── build-android.bat         # Windows 一键打包脚本
├── build-android.sh          # Mac/Linux 一键打包脚本
├── www/                      # Web 资源目录
│   ├── index.html
│   ├── app.js
│   ├── assets/
│   └── ...
└── android/                  # Android 原生项目（运行脚本后自动生成）
```

## 环境要求

1. **Node.js** >= 18
2. **npm** >= 9
3. **Android SDK** (API Level 22+)
4. **JAVA_HOME** 已设置（JDK 17+）

### 环境变量设置

| 变量 | 说明 | 示例 |
|------|------|------|
| `ANDROID_HOME` | Android SDK 路径 | Windows: `C:\Users\You\AppData\Local\Android\Sdk` |
| | | Mac/Linux: `~/Library/Android/sdk` 或 `~/Android/Sdk` |
| `JAVA_HOME` | JDK 路径 | Windows: `C:\Program Files\Java\jdk-17` |
| | | Mac/Linux: `/usr/lib/jvm/java-17-openjdk` |

## 快速开始

### 一键打包（推荐）

**Windows:**
```batch
build-android.bat
```

**Mac/Linux:**
```bash
chmod +x build-android.sh
./build-android.sh
```

### 手动打包

```bash
# 1. 安装依赖
npm install

# 2. 添加 Android 平台（首次）
npx cap add android

# 3. 同步 Web 资源到 Android 项目
npx cap sync android

# 4. 构建 Debug APK
cd android && ./gradlew assembleDebug
```

## 输出 APK 路径

构建完成后，APK 文件位于：

```
android/app/build/outputs/apk/debug/app-debug.apk
```

## 配置说明

- **appId**: `com.gator.app`
- **appName**: `Gator`
- **webDir**: `www`（Web 资源目录）
- **androidScheme**: `https`（使用 HTTPS 方案加载 Web 内容）

## 注意事项

- 首次打包需要下载 Gradle 依赖，可能需要较长时间。
- 如需构建 Release APK，请使用 `./gradlew assembleRelease` 并配置签名密钥。
- 如需在 Android Studio 中打开项目，运行 `npx cap open android`。
