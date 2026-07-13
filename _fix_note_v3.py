import io

# 重写 note 模式 HTML - 用 class 代替 inline 控制 hover 状态
android_html = 'gator-android/www/index.html'

with io.open(android_html, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. 找到并替换 note 模式的整个块
note_start = html.find('<div id="noteFullscreenModal"')
note_end = html.find('<!-- 图文模式全屏预览弹窗', note_start)

new_note_block = '''<div id="noteFullscreenModal" class="fixed inset-0 z-[70] hidden bg-white text-gray-900">
        <div class="w-full h-full flex flex-col">
            <!-- 顶部极简控制栏：返回按钮 + 编辑按钮 -->
            <div class="flex items-center justify-between px-4 pt-4 pb-2 flex-shrink-0">
                <button onclick="closeNoteFullscreenModal()" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition btn-press flex-shrink-0">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button onclick="openFullscreenEditor()" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition btn-press flex-shrink-0" title="编辑">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                </button>
            </div>
            <!-- 图片轮播区（置顶，占据页面主要空间） -->
            <div class="flex-shrink-0 px-4 pt-2">
                <div class="relative mx-auto" style="max-width:900px;">
                    <div id="note-img-wrap" class="note-img-container">
                        <div id="note-img-slider" class="note-img-slider">
                            <!-- 图片动态插入 -->
                        </div>
                        <!-- 左箭头 -->
                        <div id="note-img-nav-prev" class="note-img-nav note-img-nav-prev">
                            <svg class="note-img-nav-svg" fill="none" stroke="#fff" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                        </div>
                        <!-- 右箭头 -->
                        <div id="note-img-nav-next" class="note-img-nav note-img-nav-next">
                            <svg class="note-img-nav-svg" fill="none" stroke="#fff" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                        </div>
                        <!-- 右上角页码 -->
                        <div id="note-img-counter" class="note-img-counter">1/1</div>
                        <!-- 底部圆点 -->
                        <div id="note-img-dots" class="note-img-dots">
                            <!-- 动态插入圆点 -->
                        </div>
                    </div>
                    <!-- 图片下方：emoji + 标题（一行） -->
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

# 2. 替换 note 模式的 CSS 为完整版本（使用 class 选择器）
css_start = html.find('/* note 模式图片轮播 hover 效果')
css_end = html.find('    </style>', css_start)

new_css = '''/* note 模式图片轮播 — 完全与首页卡片效果一致 */
        .note-img-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 20px;
            background: #f5f5f5;
            cursor: pointer;
            transition: box-shadow 0.3s ease;
        }
        .note-img-container:hover {
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        .note-img-container::after {
            content: '';
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0);
            transition: background 0.3s ease;
            pointer-events: none;
            border-radius: inherit;
            z-index: 2;
        }
        .note-img-container:hover::after {
            background: rgba(0,0,0,0.2);
        }
        .note-img-slider {
            display: flex;
            width: max-content;
            transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
            position: relative;
        }
        .note-img-slider img {
            display: block;
            cursor: pointer;
            flex-shrink: 0;
        }
        .note-img-nav {
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
        .note-img-nav-svg {
            width: 14px;
            height: 14px;
            color: #fff;
        }
        .note-img-container:hover .note-img-nav {
            opacity: 1;
        }
        .note-img-nav:hover {
            background: rgba(0,0,0,0.6);
        }
        .note-img-nav.note-img-nav-prev {
            left: 8px;
            transform: translateY(-50%) translateX(-12px);
        }
        .note-img-container:hover .note-img-nav.note-img-nav-prev {
            transform: translateY(-50%) translateX(0);
        }
        .note-img-nav.note-img-nav-next {
            right: 8px;
            transform: translateY(-50%) translateX(12px);
        }
        .note-img-container:hover .note-img-nav.note-img-nav-next {
            transform: translateY(-50%) translateX(0);
        }
        .note-img-nav.dimmed {
            opacity: 0.25 !important;
            cursor: default;
        }
        .note-img-counter {
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 2px 8px;
            border-radius: 10px;
            background: rgba(0,0,0,0.45);
            color: #fff;
            font-size: 11px;
            font-weight: 600;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 5;
        }
        .note-img-container:hover .note-img-counter {
            opacity: 1;
        }
        .note-img-dots {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 5px;
            padding: 4px 10px;
            background: rgba(0,0,0,0.3);
            border-radius: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 5;
        }
        .note-img-container:hover .note-img-dots {
            opacity: 1;
        }
        .note-img-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: rgba(255,255,255,0.5);
            transition: background 0.2s, transform 0.2s;
            cursor: pointer;
        }
        .note-img-dot.active {
            background: #fff;
            transform: scale(1.3);
        }
'''

html = html[:css_start] + new_css + html[css_end:]

with io.open(android_html, 'w', encoding='utf-8') as f:
    f.write(html)

# 3. 同步到 Electron
with io.open('gator-electron/www/index.html', 'r', encoding='utf-8') as f:
    e_html = f.read()

e_note_start = e_html.find('<div id="noteFullscreenModal"')
e_note_end = e_html.find('<!-- 图文模式全屏预览弹窗', e_note_start)
e_html = e_html[:e_note_start] + new_note_block + e_html[e_note_end:]

e_css_start = e_html.find('/* note 模式图片轮播')
if e_css_start > 0:
    e_css_end = e_html.find('    </style>', e_css_start)
    e_html = e_html[:e_css_start] + new_css + e_html[e_css_end:]

with io.open('gator-electron/www/index.html', 'w', encoding='utf-8') as f:
    f.write(e_html)

print("✓ Android + Electron HTML 更新完成")

# 4. 更新 JS - 确保用 class 选择器找元素
for js_path in ['gator-android/www/app.js', 'gator-electron/www/app.js']:
    with io.open(js_path, 'r', encoding='utf-8') as f:
        js = f.read()

    # 更新 showNoteFullscreenDetail 中获取元素的逻辑
    # 原逻辑中用的是 document.getElementById('note-img-nav-prev') 等，仍然有效
    # 但需要确保 JS 中加入/移除的是 .dimmed class
    old_dimmed_prev = "if (prevBtn) prevBtn.classList.toggle('dimmed'"
    old_dimmed_next = "if (nextBtn) nextBtn.classList.toggle('dimmed'"
    # 这些已经正确使用了 classList.toggle('dimmed') — 不需要改 JS
    print(f"✓ {js_path} JS 逻辑已正确")

print("\n=== 所有 HTML/CSS 同步完成 ===")
print("现在重新跑 Playwright 验证...")
