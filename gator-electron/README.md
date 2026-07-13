# Gator Electron 桌面端打包项目

将 Gator 应用打包为 Windows / macOS / Linux 桌面端程序。

## 项目结构

```
gator-electron/
├── main.js              # Electron 主进程
├── package.json         # 项目配置与打包配置
├── build-windows.bat    # Windows 一键打包脚本
├── build-mac.sh         # macOS 一键打包脚本
├── build-linux.sh       # Linux 一键打包脚本
├── www/                 # 前端源文件
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── assets/
└── dist/                # 打包输出目录（自动生成）
```

## 环境要求

- [Node.js](https://nodejs.org/) >= 16
- npm（随 Node.js 一起安装）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地调试运行

```bash
npm start
```

### 3. 打包

**Windows：** 双击运行 `build-windows.bat`，或在命令行执行：

```bash
npm run build:win
```

**macOS：**

```bash
chmod +x build-mac.sh
./build-mac.sh
```

或直接执行：

```bash
npm run build:mac
```

**Linux：**

```bash
chmod +x build-linux.sh
./build-linux.sh
```

或直接执行：

```bash
npm run build:linux
```

## 打包输出

| 平台 | 格式 | 说明 |
|------|------|------|
| Windows | portable | 免安装绿色版，直接运行 |
| Windows | nsis | 安装版 |
| macOS | dmg | 磁盘镜像 |
| Linux | AppImage | 通用 Linux 格式 |

所有打包产物输出到 `dist/` 目录。

## 注意事项

- macOS 打包需要在 macOS 系统上进行
- Windows 打包需要在 Windows 系统上进行（或使用交叉编译）
- Linux 打包需要在 Linux 系统上进行
- 如需跨平台打包，可考虑使用 CI/CD（如 GitHub Actions）
