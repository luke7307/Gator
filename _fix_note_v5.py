import io

# ================ Android HTML 修改 ================
android_path = 'gator-android/www/index.html'
with io.open(android_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. 替换 modal 块
modal_start = html.find('<div id="noteFullscreenModal"')
modal_end = html.find('<!-- 图文模式全屏预览弹窗', modal_start)

new_modal = '''<div id="noteFullscreenModal" class="fixed inset-0 z-[70] hidden bg-white text-gray-900">
        <div class="w-full h-full flex flex-col">
            <!-- 图片轮播区（置顶，按钮嵌入图片容器） -->
            <div class="flex-shrink-0 px-4 pt-3">
                <div class="relative mx-auto" style="max-width:900px;">
                    <div id="note-img-wrap" class="note-img-container">
                        <div id="note-img-slider" class="note-img-slider">
                            <!-- 图片动态插入 -->
                        </div>
                        <!-- 左上角：返回按钮（深色圆底+白色箭头，与轮播箭头一致） -->
                        <button onclick="closeNoteFullscreenModal()" class="note-img-action-btn note-img-action-prev btn-press">
                            <svg class="note-img-action-svg" fill="none" stroke="#fff" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                        </button>
                        <!-- 右下角：编辑按钮（深色圆底+白色笔） -->
                        <button onclick="openFullscreenEditor()" class="note-img-action-btn note-img-action-edit btn-press" title="编辑">
                            <svg class="note-img-action-svg" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        </button>
                        <!-- 左箭头（轮播） -->
                        <div id="note-img-nav-prev" class="note-img-nav note-img-nav-prev">
                            <svg class="note-img-nav-svg" fill="none" stroke="#fff" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                        </div>
                        <!-- 右箭头（轮播） -->
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
                    <!-- 图片下方：emoji + 标题(左) + 标签+时间(右列) —— 单行等高 -->
                    <div class="note-meta-row">
                        <div class="note-meta-emoji">
                            <span id="noteFullscreenEmoji" class="text-2xl">💡</span>
                        </div>
                        <div class="note-meta-title">
                            <h3 id="noteFullscreenTitle" class="note-title-text">多图卡片测试</h3>
                        </div>
                        <div class="note-meta-info">
                            <span class="note-tag" id="noteFullscreenType2">💡 灵感</span>
                            <span class="note-time" id="noteFullscreenTime2">06-13 04:11</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 正文内容区域 -->
            <div id="noteFullscreenContent" class="flex-1 overflow-y-auto px-4 py-4 pb-20 text-[15px] leading-relaxed text-gray-800">
            </div>
        </div>
    </div>

'''

html = html[:modal_start] + new_modal + html[modal_end:]

# 2. 替换 CSS 块 —— 重新写完整版本
css_start = html.find('        /* note 模式图片轮播')
css_end = html.find('    </style>', css_start)

new_css = '''        /* note 模式图片轮播 */
        .note-img-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 20px;
            background: #f5f5f5;
            cursor: pointer;
            transition: box-shadow 0.3s ease;
            --note-img-width: 900px;
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
            width: var(--note-img-width);
            max-height: 500px;
            object-fit: contain;
        }

        /* 嵌入图片容器的操作按钮（统一深色圆底+白色图标） */
        .note-img-action-btn {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(0,0,0,0.45);
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            transition: background 0.2s;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .note-img-action-btn:hover {
            background: rgba(0,0,0,0.65);
        }
        .note-img-action-btn.note-img-action-prev {
            top: 12px;
            left: 12px;
        }
        .note-img-action-btn.note-img-action-edit {
            bottom: 12px;
            right: 12px;
        }
        .note-img-action-svg {
            width: 20px;
            height: 20px;
            color: #fff;
        }

        /* 轮播左右箭头 */
        .note-img-nav {
            position: absolute;
            top: 50%;
            width: 44px;
            height: 44px;
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
            width: 22px;
            height: 22px;
            color: #fff;
        }
        .note-img-container:hover .note-img-nav {
            opacity: 1;
        }
        .note-img-nav:hover {
            background: rgba(0,0,0,0.6);
        }
        .note-img-nav.note-img-nav-prev {
            left: 16px;
            transform: translateY(-50%) translateX(-14px);
        }
        .note-img-container:hover .note-img-nav.note-img-nav-prev {
            transform: translateY(-50%) translateX(0);
        }
        .note-img-nav.note-img-nav-next {
            right: 16px;
            transform: translateY(-50%) translateX(14px);
        }
        .note-img-container:hover .note-img-nav.note-img-nav-next {
            transform: translateY(-50%) translateX(0);
        }
        .note-img-nav.dimmed {
            opacity: 0.25 !important;
            cursor: default;
        }

        /* 页码 */
        .note-img-counter {
            position: absolute;
            top: 12px;
            right: 12px;
            padding: 3px 10px;
            border-radius: 10px;
            background: rgba(0,0,0,0.45);
            color: #fff;
            font-size: 12px;
            font-weight: 600;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 5;
        }
        .note-img-container:hover .note-img-counter {
            opacity: 1;
        }

        /* 底部圆点 */
        .note-img-dots {
            position: absolute;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 6px;
            padding: 5px 12px;
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
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255,255,255,0.5);
            transition: background 0.2s, transform 0.2s;
            cursor: pointer;
        }
        .note-img-dot.active {
            background: var(--brand-color, #4C6EF5);
            transform: scale(1.3);
        }

        /* 图片下方 meta 区：emoji + 标题(左) | 标签+时间(右列) —— 单行等高 */
        .note-meta-row {
            display: flex;
            align-items: center;
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
        .note-meta-title {
            flex: 1;
            min-width: 0;
            display: flex;
            align-items: center;
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
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            gap: 6px;
            min-width: 120px;
        }
        .note-tag {
            font-size: 12px;
            padding: 4px 12px;
            border-radius: 999px;
            background: var(--brand-faint, #EEF2FF);
            color: var(--brand-color, #4C6EF5);
            font-weight: 600;
            white-space: nowrap;
        }
        .note-time {
            font-size: 12px;
            color: #9CA3AF;
            font-weight: 500;
        }
'''

html = html[:css_start] + new_css + html[css_end:]

with io.open(android_path, 'w', encoding='utf-8') as f:
    f.write(html)
print(f"✓ Android HTML 已更新: {android_path}")

# ================ Electron HTML 同步 ================
elec_path = 'gator-electron/www/index.html'
with io.open(elec_path, 'r', encoding='utf-8') as f:
    e_html = f.read()

e_modal_start = e_html.find('<div id="noteFullscreenModal"')
e_modal_end = e_html.find('<!-- 图文模式全屏预览弹窗', e_modal_start)
e_html = e_html[:e_modal_start] + new_modal + e_html[e_modal_end:]

e_css_start = e_html.find('        /* note 模式图片轮播')
if e_css_start > 0:
    e_css_end = e_html.find('    </style>', e_css_start)
    e_html = e_html[:e_css_start] + new_css + e_html[e_css_end:]

with io.open(elec_path, 'w', encoding='utf-8') as f:
    f.write(e_html)
print(f"✓ Electron HTML 已同步: {elec_path}")

print("\n=== 全部完成 ===")
