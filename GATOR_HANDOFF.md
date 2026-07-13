# Gator 灵感笔记 App — 交接文档

> 本文档汇总了本项目的全部代码、沟通记录、已实现功能及待办事项，供交接给新的 AI 协作者继续开发。

---

## 一、项目概述

**Gator** 是一款灵感笔记/备忘录应用，支持多平台（Android + Electron 桌面端）。核心功能包括：灵感卡片的增删改查、富文本编辑（所见即所得）、Markdown 渲染、分类标签、回收站、图片预览、主题切换等。

### 技术栈
- **前端**：纯 HTML + CSS + JavaScript（无框架）
- **移动端**：Capacitor（Android）
- **桌面端**：Electron
- **存储**：localStorage
- **样式**：Tailwind CSS（CDN）

### 项目结构
```
gator-android/          # Android 端（Capacitor）
  www/
    index.html          # 主页面（HTML + CSS）
    app.js              # 全部业务逻辑（~4800 行）
    assets/             # 图片资源

gator-electron/         # 桌面端（Electron）
  www/
    index.html          # 与 Android 端共用
    app.js              # 与 Android 端共用
    assets/
```

**关键文件**：`gator-android/www/app.js` 和 `gator-android/www/index.html` 是主代码文件，修改后需同步到 `gator-electron/www/`。

---

## 二、已实现功能清单

### 核心功能
| 功能 | 状态 | 说明 |
|------|------|------|
| 灵感卡片 CRUD | ✅ | 创建、读取、更新、删除 |
| 富文本编辑 | ✅ | 所见即所得编辑器（contenteditable）|
| Markdown 渲染 | ✅ | markdownToHtml / htmlToMarkdown 双向转换 |
| 分类标签 | ✅ | 支持自定义标签、emoji、颜色 |
| 回收站 | ✅ | 删除后 30 天自动清理，可恢复 |
| 图片预览 | ✅ | 卡片首图预览、全屏图片查看 |
| 主题切换 | ✅ | 8 套预设主题 + 自定义主题 |
| 置顶功能 | ✅ | 卡片置顶/取消置顶 |
| 批量操作 | ✅ | 批量删除、批量置顶 |
| 搜索过滤 | ✅ | 按分类、关键词搜索 |
| 瀑布流布局 | ✅ | Masonry 双列布局 |
| 笔记簿切换 | ✅ | 多笔记簿隔离存储 |

### 编辑器功能
| 功能 | 状态 | 说明 |
|------|------|------|
| 标题/正文编辑 | ✅ | 全屏弹窗编辑 |
| 工具栏 | ✅ | H1-H5、加粗、斜体、删除线、下划线、引用、代码、链接、列表、任务列表、颜色、折叠 |
| 任务列表 | ✅ | 支持 checkbox，可勾选/取消 |
| 折叠/展开 | ✅ | H1-H3 可折叠子内容 |
| 有序列表层级 | ✅ | 1 → a → i 三级递进 |
| 无序列表 | ✅ | 支持嵌套 |
| 底部留白 | ✅ | 滚到底部时增加空白空间（40% 高度限制）|
| 滚动位置记忆 | ✅ | 1 分钟内重新打开恢复上次滚动位置 |
| 未保存提示 | ✅ | 关闭编辑器时检测未保存内容，弹窗确认 |
| 高亮泛光特效 | ✅ | 编辑/预览返回后卡片泛光高亮（300ms 淡入，2s 后淡出）|

### 动效
| 动效 | 状态 | 说明 |
|------|------|------|
| 卡片入场 | ✅ | FLIP 动画 + opacity 闪烁 |
| 删除确认弹窗 | ✅ | scale 0.9→1 + translateY + 垃圾桶 SVG 循环动画 |
| 未保存确认弹窗 | ✅ | 编辑笔 SVG 循环旋转+缩放动画 |
| 底部弹窗 | ✅ | modal-up 上滑动画 |
| 置顶高亮 | ✅ | 互补色泛光 + outline |
| 光标跟随滚动 | ✅ | 打字/光标移动时自动滚动到屏幕 40% 位置 |
| Toast 提示 | ✅ | 底部滑入 |
| FAB 按钮 | ✅ | 加号↔叉号变形动画 |

---

## 三、沟通记录与决策要点

### 3.1 任务列表功能（核心迭代）

**需求**：在有序/无序列表中支持任务列表（checkbox）。

**实现方案**：
- 在 li 中插入 `<div data-task="true" contenteditable="false"><input type="checkbox"><span contenteditable="true">文本</span></div>`
- 取消待办时恢复为普通 li（直接 DOM 操作，不用 insertHTML，避免嵌套 ol 结构错乱）
- 在 li 中的待办末尾按 Enter → 创建普通列表项（退出待办模式）
- 非 li 中的待办末尾按 Enter → 创建普通段落

**关键 bug 修复**：
- `insertHTML` 替换包含嵌套 `<ol>` 的 `<li>` 时，浏览器会把新 li 错误嵌套到前一个兄弟 li 中 → 改用直接 DOM 操作
- 光标定位：记录 li 在父元素中的索引，insertHTML 后用索引定位新 li

### 3.2 底部留白（参考备忘录 App）

**需求**：滚到文字内容最底部时，增加空白空间，最后一行内容最高可在画面 40%，松手保持。

**实现**：`initBottomSpacer(wrapId, contentId)` 函数
- 监听 scroll 事件，距底部 ≤30px 时添加 spacer div
- spacer 高度 = min(最后一行行高, 容器高度 × 0.4)
- 滚离底部时自动移除 spacer
- 应用于 `fullscreenEditorWrap`（编辑）和 `detailContentPreview`（预览）

### 3.3 未保存提示

**需求**：编辑器点 X 退出时，如有未保存内容则弹窗提示。

**实现**：
- `hasUnsavedChanges()`：比较 `detailTitle`/`detailContent` 与编辑器内容（trim + \r\n 规范化）
- 弹窗风格与删除确认框一致（圆角 24px、backdrop-blur、scale 动画）
- 图标：编辑笔 SVG + 循环旋转缩放动画
- 两个按钮：「不保存」（直接关闭，不回写）、「保存」（调用 saveFullscreenEditor）

### 3.4 高亮泛光特效

**需求**：编辑/预览返回后，卡片高亮显示，特效用泛光，类似回收站恢复特效。

**实现**：
- `saveFullscreenEditor`：保存时设置 `item._highlight = true`，调用 `renderFeed()`
- `closeDetailModal`：有变化时设置 `_highlight = true`，调用 `renderFeed()`
- `renderFeed` 中已有 `_highlight` 处理逻辑：互补色 boxShadow + outline + animate（300ms 淡入，2s 后 300ms 淡出）

### 3.5 时间戳更新

**问题**：保存后 `updatedAt` 不更新。

**根因**：`saveFullscreenEditor` 依赖 `autoSaveDetail` 的 `textChanged` 判断，但 `htmlToMarkdown` 转换后的内容可能与原始内容有格式差异。

**修复**：`saveFullscreenEditor` 中直接设置 `item.updatedAt = new Date().toISOString()`，不再依赖 `textChanged`。

### 3.6 滚动位置记忆

**需求**：1 分钟内重新打开同一灵感，恢复上次滚动位置；超过 1 分钟则回到顶部。

**实现**：
- 内存缓存 `scrollPositionCache = { itemId: { previewScroll, editorScroll, timestamp } }`
- 打开时检查 `(now - timestamp) < 60000`
- 预览：`showDetailModal` / `closeDetailModal`
- 编辑：`openFullscreenEditor` / `_doCloseFullscreenEditor`

---

## 四、关键代码位置

| 功能 | 文件 | 函数/位置 |
|------|------|-----------|
| 任务列表转换 | app.js | `wysiwygCmd` (~line 2290) |
| 取消待办 | app.js | `wysiwygCmd` task 分支 (~line 2310) |
| 底部留白 | app.js | `initBottomSpacer` (~line 2080) |
| 未保存检测 | app.js | `hasUnsavedChanges` (~line 2170) |
| 保存编辑器 | app.js | `saveFullscreenEditor` (~line 2260) |
| 高亮特效 | app.js | `renderFeed` 中 `_highlight` 处理 (~line 1120) |
| 滚动位置记忆 | app.js | `scrollPositionCache` + `showDetailModal`/`openFullscreenEditor` |
| Markdown 转换 | app.js | `markdownToHtml` / `htmlToMarkdown` |
| 卡片渲染 | app.js | `createCardHTML` (~line 1286) |
| 删除确认弹窗 | index.html | `#deleteModal` (~line 738) |
| 未保存弹窗 | index.html | `#unsavedModal` (~line 761) |

---

## 五、待办事项 / 已知问题

1. **任务列表在无序列表中的支持**：当前主要支持有序列表中的任务转换，无序列表中的任务转换可能需要进一步测试
2. **htmlToMarkdown 的可逆性**：HTML ↔ Markdown 转换可能不完美，某些格式（如复杂表格、嵌套列表）可能丢失
3. **性能优化**：`app.js` 已接近 5000 行，部分函数（如 `renderFeed`）较长，可考虑模块化拆分
4. **测试覆盖**：目前主要依赖手动测试，建议增加自动化测试
5. **移动端适配**：部分交互（如双指缩放、长按菜单）可能需要针对移动端优化

---

## 六、交接文件清单

| 文件 | 说明 |
|------|------|
| `gator-android/www/app.js` | 主业务逻辑（~4800 行）|
| `gator-android/www/index.html` | 主页面（HTML + CSS）|
| `gator-electron/www/app.js` | 桌面端同步副本 |
| `gator-electron/www/index.html` | 桌面端同步副本 |
| `gator-handoff.zip` | 完整项目打包 |
| `GATOR_HANDOFF.md` | 本文档 |

---

## 七、如何继续开发

1. **修改代码**：编辑 `gator-android/www/app.js` 或 `index.html`
2. **同步到桌面端**：`cp gator-android/www/app.js gator-electron/www/app.js && cp gator-android/www/index.html gator-electron/www/index.html`
3. **测试**：在浏览器中打开 `gator-android/www/index.html` 进行测试
4. **构建 Android**：`cd gator-android && ./build-android.sh`
5. **构建 Electron**：`cd gator-electron && ./build-mac.sh`（或 `.bat` for Windows）

---

*文档生成时间：2026-06-11*
*沟通方式：自然语言对话 + 代码直接修改*
*沟通语言：中文*
