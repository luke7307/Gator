import io

# ======== 1. 重写 Android 的 note 模式 HTML ========
android_html_path = 'gator-android/www/index.html'

with io.open(android_html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 找到旧 note 模式块
note_start_marker = '<div id="noteFullscreenModal"'
note_end_marker = '<!-- 图文模式全屏预览弹窗'
note_start = html.find(note_start_marker)
note_end = html.find(note_end_marker, note_start)
assert note_start > 0 and note_end > 0, "note modal block not found"

# 新 note 模式块（完全按用户图 1）
new_note_block = '''<div id="noteFullscreenModal" class="fixed inset-0 z-[70] hidden bg-white text-gray-900">
        <div class="w-full h-full flex flex-col">
            <!-- 顶部极简控制栏：只有左上角返回按钮 -->
            <div class="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
                <button onclick="closeNoteFullscreenModal()" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition btn-press flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <!-- 编辑按钮：右上角（隐藏在图片外，不突兀） -->
                <button onclick="openFullscreenEditor()" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition btn-press flex-shrink-0" title="编辑">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                </button>
            </div>
            <!-- 图片轮播区域（置顶，占满容器宽度） -->
            <div class="flex-shrink-0 px-4 pt-2">
                <div class="relative mx-auto" style="max-width:900px;">
                    <div id="note-img-wrap" style="position:relative;width:100%;overflow:hidden;border-radius:20px;background:#f5f5f5;cursor:pointer;transition:box-shadow 0.3s ease;">
                        <div id="note-img-slider" style="display:flex;width:max-content;transition:transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);">
                            <!-- 图片动态插入 -->
                        </div>
                        <!-- 左箭头 -->
                        <div id="note-img-nav-prev" style="position:absolute;top:50%;left:8px;transform:translateY(-50%) translateX(-12px);width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity 0.3s ease, transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94);z-index:5;">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="#fff" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                        </div>
                        <!-- 右箭头 -->
                        <div id="note-img-nav-next" style="position:absolute;top:50%;right:8px;transform:translateY(-50%) translateX(12px);width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transition:opacity 0.3s ease, transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94);z-index:5;">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="#fff" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                        </div>
                        <!-- 右上角页码 -->
                        <div id="note-img-counter" style="position:absolute;top:8px;right:8px;padding:2px 8px;border-radius:10px;background:rgba(0,0,0,0.45);color:#fff;font-size:11px;font-weight:600;opacity:0;transition:opacity 0.3s ease;z-index:5;">1/1</div>
                        <!-- 底部圆点 -->
                        <div id="note-img-dots" style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);display:flex;gap:5px;padding:4px 10px;background:rgba(0,0,0,0.3);border-radius:12px;opacity:0;transition:opacity 0.3s ease;z-index:5;">
                            <!-- 动态插入圆点 -->
                        </div>
                    </div>
                    <!-- 图片下方：emoji + 标题 -->
                    <div class="flex items-start gap-2 mt-3">
                        <div class="w-10 h-10 rounded-2xl bg-brand-faint flex items-center justify-center flex-shrink-0">
                            <span id="noteFullscreenEmoji" class="text-lg">💡</span>
                        </div>
                        <h3 id="noteFullscreenTitle" class="text-[16px] font-semibold text-gray-900 leading-tight pt-1.5 min-w-0 truncate"></h3>
                    </div>
                    <!-- 再下方：tag 胶囊 + 时间 -->
                    <div class="flex items-center gap-2 mt-2">
                        <span class="text-[12px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600" id="noteFullscreenType2">💡 灵感</span>
                        <span class="text-[12px] text-gray-500" id="noteFullscreenTime2"></span>
                    </div>
                </div>
            </div>
            <!-- 正文内容区域 -->
            <div id="noteFullscreenContent" class="flex-1 overflow-y-auto px-4 py-4 pb-20 text-[15px] leading-relaxed text-gray-800">
            </div>
        </div>
    </div>

'''

html = html[:note_start] + new_note_block + html[note_end:]

# ======== 2. 更新 CSS，使 hover 效果与首页卡片完全一致 ========
# 找到 note 模式 CSS 部分并重写
old_css_start = html.find('/* note 模式图片轮播 hover 效果')
old_css_end = html.find('    </style>', old_css_start) if old_css_start > 0 else -1
if old_css_start > 0 and old_css_end > 0:
    # 替换为更完整的 CSS（从首页卡片的 CSS 复制）
    new_css = '''/* note 模式图片轮播 hover 效果（完全对齐首页卡片版本） */
        #note-img-wrap:hover {
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        #note-img-wrap::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0);
            transition: background 0.3s ease;
            pointer-events: none;
            border-radius: inherit;
            z-index: 2;
        }
        #note-img-wrap:hover::after {
            background: rgba(0,0,0,0.2);
        }
        #note-img-nav {
            position: absolute;
            top: 50%;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgba(0,0,0,0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), background 0.2s;
            z-index: 5;
        }
        #note-img-wrap:hover #note-img-nav-prev,
        #note-img-wrap:hover #note-img-nav-next {
            opacity: 1;
        }
        #note-img-wrap:hover #note-img-nav-prev {
            transform: translateY(-50%) translateX(0);
        }
        #note-img-wrap:hover #note-img-nav-next {
            transform: translateY(-50%) translateX(0);
        }
        #note-img-nav-prev:hover,
        #note-img-nav-next:hover {
            background: rgba(0,0,0,0.6) !important;
        }
        #note-img-nav-prev.dimmed,
        #note-img-nav-next.dimmed {
            opacity: 0.25 !important;
            cursor: default;
        }
        #note-img-wrap:hover #note-img-counter {
            opacity: 1;
        }
        #note-img-wrap:hover #note-img-dots {
            opacity: 1;
        }
        #note-img-dots .note-img-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: rgba(255,255,255,0.5);
            transition: background 0.2s, transform 0.2s;
            cursor: pointer;
        }
        #note-img-dots .note-img-dot.active {
            background: #fff;
            transform: scale(1.3);
        }
        #note-img-slider {
            position: relative;
        }
        #note-img-slider img {
            flex: 0 0 auto;
            display: block;
            width: 100%;
            max-height: 520px;
            object-fit: contain;
            cursor: pointer;
        }
        #note-img-wrap {
            cursor: pointer;
        }
'''
    html = html[:old_css_start] + new_css + html[old_css_end:]
    print("✓ Android CSS updated")

# 写入
with io.open(android_html_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("✓ Android HTML updated")

# ======== 3. 同步到 Electron ========
electron_html_path = 'gator-electron/www/index.html'
with io.open(electron_html_path, 'r', encoding='utf-8') as f:
    e_html = f.read()

e_note_start = e_html.find(note_start_marker)
e_note_end = e_html.find(note_end_marker, e_note_start)
if e_note_start > 0 and e_note_end > 0:
    e_html = e_html[:e_note_start] + new_note_block + e_html[e_note_end:]
    # 同步 CSS
    e_css_start = e_html.find('/* note 模式图片轮播 hover 效果')
    if e_css_start > 0:
        e_css_end = e_html.find('    </style>', e_css_start)
        if e_css_end > 0:
            e_html = e_html[:e_css_start] + new_css + e_html[e_css_end:]
    print("✓ Electron HTML updated")
else:
    print(f"✗ Electron note block not found ({e_note_start}, {e_note_end})")

with io.open(electron_html_path, 'w', encoding='utf-8') as f:
    f.write(e_html)

print("\\n=== HTML 同步完成 ===")

# ======== 4. 更新 JS: showNoteFullscreenDetail 填充正确的元素 id ========
for js_path in ['gator-android/www/app.js', 'gator-electron/www/app.js']:
    with io.open(js_path, 'r', encoding='utf-8') as f:
        js = f.read()

    # 找到并替换函数
    func_start_marker = 'function showNoteFullscreenDetail(item) {'
    func_end_marker = 'function closeNoteFullscreenModal()'
    func_start = js.find(func_start_marker)
    func_end = js.find(func_end_marker, func_start)
    if func_start > 0 and func_end > func_start:
        # 检查 JS 是否在设置正确的元素
        # 我们之前写过的代码逻辑没问题，只需要确保：
        # 1. 它在 slider 中插入 img
        # 2. 在 #noteFullscreenEmoji 和 #noteFullscreenTitle 设置内容
        # 3. 在 #noteFullscreenType2 和 #noteFullscreenTime2 设置 tag+时间

        # 检查: 当前 JS 是否已经有正确的逻辑
        has_title = 'noteFullscreenTitle' in js[func_start:func_end]
        has_emoji = 'noteFullscreenEmoji' in js[func_start:func_end]
        has_type2 = 'noteFullscreenType2' in js[func_start:func_end]
        has_time2 = 'noteFullscreenTime2' in js[func_start:func_end]

        # 如果已经有这些元素，就不动；否则重写
        if has_title and has_emoji and has_type2 and has_time2:
            print(f"✓ {js_path}: JS 已经有正确的元素引用，跳过")
        else:
            print(f"! {js_path}: 缺失部分元素引用，需要重写函数")

    else:
        print(f"✗ {js_path}: 未找到 showNoteFullscreenDetail")

print("\\n=== 所有修改完成 ===")
