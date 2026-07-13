import io

# ================ 修改灵感阅读模式设置页布局 ================
# 1. 全屏显示移动到右上角，白点不贴边
# 2. 移除取消按钮
# 3. 选中高亮：图文模式用主题色，note模式用粉色
# 4. 横向排列，一左一右，动感特效

# ================ ANDROID: index.html ================
android_path = 'gator-android/www/index.html'

with io.open(android_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 替换设置页的 HTML 结构
old_html = '''        <div id="readingModeModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] scale-0 opacity-0 transition-all duration-300">
            <div class="bg-white rounded-3xl w-[90%] max-w-md overflow-hidden shadow-2xl">
                <!-- 标题栏 -->
                <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900">灵感阅读模式</h3>
                    <button onclick="closeReadingModeModal()" class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
                
                <!-- 内容区 -->
                <div class="px-6 py-4 space-y-4">
                    <!-- 全屏显示开关 -->
                    <div class="flex items-center justify-between py-2">
                        <span class="text-sm font-medium text-gray-700">全屏显示</span>
                        <button id="readingFullscreenToggle" class="w-12 h-7 rounded-full transition-colors duration-300" style="background: #F59E0B;">
                            <span class="inline-block w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300" style="translate: 22px;"></span>
                        </button>
                    </div>
                    
                    <div class="h-px bg-gray-100"></div>
                    
                    <!-- 选择阅读模式 -->
                    <div class="space-y-3">
                        <p class="text-sm font-medium text-gray-700">选择阅读模式</p>
                        
                        <!-- 图文模式 -->
                        <button id="readingModeNormal" class="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 text-left">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                                </div>
                                <div class="flex-1">
                                    <p class="font-semibold text-gray-900">图文模式</p>
                                    <p class="text-xs text-gray-500">以文章、Pages的逻辑查看灵感内容</p>
                                </div>
                                <div class="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                            </div>
                        </button>
                        
                        <!-- Note 模式 -->
                        <button id="readingModeNote" class="w-full p-4 rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 text-left">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
                                    <svg class="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                </div>
                                <div class="flex-1">
                                    <p class="font-semibold text-gray-900">Note 模式</p>
                                    <p class="text-xs text-gray-500">类小红书样式，沉浸式阅读体验</p>
                                </div>
                                <div class="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                            </div>
                        </button>
                    </div>
                </div>
                
                <!-- 底部按钮 -->
                <div class="px-6 pb-6">
                    <button onclick="closeReadingModeModal()" class="w-full py-3 rounded-2xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
                        取消
                    </button>
                </div>
            </div>
        </div>'''

new_html = '''        <div id="readingModeModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] scale-0 opacity-0 transition-all duration-300">
            <div class="bg-white rounded-3xl w-[90%] max-w-md overflow-hidden shadow-2xl">
                <!-- 标题栏：全屏开关移到右上角 -->
                <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900">灵感阅读模式</h3>
                    <div class="flex items-center gap-3">
                        <!-- 全屏显示开关 -->
                        <button id="readingFullscreenToggle" class="w-12 h-7 rounded-full transition-all duration-300" style="background: #F59E0B;">
                            <span class="inline-block w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300" style="translate: 22px;"></span>
                        </button>
                        <button onclick="closeReadingModeModal()" class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>
                </div>
                
                <!-- 内容区 -->
                <div class="px-6 py-6">
                    <!-- 选择阅读模式 -->
                    <p class="text-sm font-medium text-gray-700 mb-4">选择阅读模式</p>
                    
                    <!-- 横向排列：图文模式 | Note 模式 -->
                    <div class="grid grid-cols-2 gap-3">
                        <!-- 图文模式 -->
                        <button id="readingModeNormal" class="reading-mode-btn p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300 text-left group" style="transform-origin: left center;">
                            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                            </div>
                            <p class="font-semibold text-gray-900 text-sm mb-1">图文模式</p>
                            <p class="text-xs text-gray-500">文章逻辑查看</p>
                            <div class="reading-mode-check w-5 h-5 rounded-full border-2 border-gray-300 mt-3 transition-all duration-300"></div>
                        </button>
                        
                        <!-- Note 模式 -->
                        <button id="readingModeNote" class="reading-mode-btn p-4 rounded-2xl border-2 border-gray-100 hover:border-pink-200 hover:bg-pink-50/50 transition-all duration-300 text-left group" style="transform-origin: right center;">
                            <div class="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                <svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                            </div>
                            <p class="font-semibold text-gray-900 text-sm mb-1">Note 模式</p>
                            <p class="text-xs text-gray-500">沉浸式体验</p>
                            <div class="reading-mode-check w-5 h-5 rounded-full border-2 border-gray-300 mt-3 transition-all duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>'''

html = html.replace(old_html, new_html)

# 添加选中状态的 CSS
css_addition = '''        /* 阅读模式按钮选中状态 */
        .reading-mode-btn.active {
            transform: scale(0.98);
        }
        .reading-mode-btn.normal-active {
            border-color: #3B82F6 !important;
            background: rgba(59, 130, 246, 0.08) !important;
        }
        .reading-mode-btn.normal-active .reading-mode-check {
            background: #3B82F6;
            border-color: #3B82F6;
        }
        .reading-mode-btn.note-active {
            border-color: #EC4899 !important;
            background: rgba(236, 72, 153, 0.08) !important;
        }
        .reading-mode-btn.note-active .reading-mode-check {
            background: #EC4899;
            border-color: #EC4899;
        }
        .reading-mode-check.active {
            background: #3B82F6;
            border-color: #3B82F6;
        }
        .reading-mode-check.note-active {
            background: #EC4899;
            border-color: #EC4899;
        }'''

# 找到添加CSS的位置
html = html.replace('        /* 图片下方 meta 区：emoji', css_addition + '\n\n        /* 图片下方 meta 区：emoji')

with io.open(android_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("✓ Android index.html updated")

# ================ ELECTRON: index.html ================
elec_path = 'gator-electron/www/index.html'

with io.open(elec_path, 'r', encoding='utf-8') as f:
    e_html = f.read()

e_html = e_html.replace(old_html, new_html)
e_html = e_html.replace('        /* 图片下方 meta 区：emoji', css_addition + '\n\n        /* 图片下方 meta 区：emoji')

with io.open(elec_path, 'w', encoding='utf-8') as f:
    f.write(e_html)
print("✓ Electron index.html updated")

print("\n=== 修复完成 ===")
print("修改内容：")
print("  1. 全屏显示开关移到右上角")
print("  2. 移除取消按钮")
print("  3. 选中高亮：图文模式蓝色主题色，Note模式粉色")
print("  4. 横向排列，一左一右，带hover放大动画")
