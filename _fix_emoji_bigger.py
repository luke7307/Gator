import io

# ================ 修改：emoji放大 + 移除背景 + 调整布局匀称 ================

# ================ ANDROID: index.html ================
android_path = 'gator-android/www/index.html'

with io.open(android_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 替换 CSS 样式
old_css = '''        /* 图片下方 meta 区：emoji + 标题 + 标签·时间（标签时间在标题下方） */
        .note-meta-row {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-top: 12px;
            min-height: 64px;
        }
        .note-meta-emoji {
            width: 64px;
            height: 64px;
            flex-shrink: 0;
            border-radius: 18px;
            background: var(--brand-faint, #EEF2FF);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
        }
        .note-meta-emoji span {
            line-height: 1;
        }
        .note-meta-content {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding-top: 6px;
        }
        .note-title-text {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            line-height: 1.3;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
        }
        .note-meta-info {
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
        }
        .note-tag {
            font-size: 12px;
            padding: 2px 8px;
            border-radius: 999px;
            background: var(--brand-faint, #EEF2FF);
            color: var(--brand-color, #4C6EF5);
            font-weight: 600;
            white-space: nowrap;
        }
        .note-dot {
            font-size: 12px;
            color: #9CA3AF;
        }
        .note-time {
            font-size: 12px;
            color: #9CA3AF;
            font-weight: 500;
        }'''

new_css = '''        /* 图片下方 meta 区：emoji + 标题 + 标签·时间（标签时间在标题下方） */
        .note-meta-row {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-top: 16px;
            min-height: 52px;
        }
        .note-meta-emoji {
            width: 48px;
            height: 48px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            line-height: 1;
        }
        .note-meta-content {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .note-title-text {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            line-height: 1.3;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
        }
        .note-meta-info {
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
        }
        .note-tag {
            font-size: 12px;
            padding: 2px 8px;
            border-radius: 999px;
            background: var(--brand-faint, #EEF2FF);
            color: var(--brand-color, #4C6EF5);
            font-weight: 600;
            white-space: nowrap;
        }
        .note-dot {
            font-size: 12px;
            color: #9CA3AF;
        }
        .note-time {
            font-size: 12px;
            color: #9CA3AF;
            font-weight: 500;
        }'''

html = html.replace(old_css, new_css)

with io.open(android_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("✓ Android index.html updated")

# ================ ELECTRON: index.html ================
elec_path = 'gator-electron/www/index.html'

with io.open(elec_path, 'r', encoding='utf-8') as f:
    e_html = f.read()

e_html = e_html.replace(old_css, new_css)

with io.open(elec_path, 'w', encoding='utf-8') as f:
    f.write(e_html)
print("✓ Electron index.html updated")

print("\n=== 修复完成 ===")
print("修改内容：")
print("  - emoji 放大到 36px")
print("  - 移除 emoji 背景色（border-radius 和 background 都去掉）")
print("  - emoji 容器调整为 48x48px")
print("  - 整体布局调整得更匀称")
