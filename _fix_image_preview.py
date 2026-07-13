import io

# ================ 重构图片预览界面 + 修复阅读模式设置页 ================

# ================ ANDROID: index.html ================
android_path = 'gator-android/www/index.html'

with io.open(android_path, 'r', encoding='utf-8') as f:
    html = f.read()

# ========== 1. 替换图片预览界面 ==========
old_preview = '''    <div id="imagePreviewModal" class="fixed inset-0 z-[70] hidden bg-white flex flex-col" style="animation: fadeIn 0.2s ease;">
        <!-- 顶部栏 -->
        <div class="flex items-center justify-between px-5 py-4 flex-shrink-0">
            <!-- 左上角：返回键 -->
            <button onclick="closeImagePreview(event)" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition btn-press">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <!-- 右上角：图片总数（滑动时显示，2秒后自动淡出） -->
            <div id="imagePreviewCounter" class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 text-white text-[13px] font-semibold transition-opacity duration-500 opacity-0">
                <span id="imagePreviewCountText">1/1</span>
            </div>
        </div>
        <!-- 图片显示区域（可滑动切换） -->
        <div id="imagePreviewImageArea" class="relative flex-shrink-0 mx-auto" style="width:90vw; height:60vh; background:#f5f5f5; border-radius:16px; overflow:hidden;">
            <div id="imagePreviewSlider" class="w-full h-full flex transition-transform duration-300 ease-out">
                <!-- 动态插入图片 -->
            </div>
        </div>
        <!-- 查看原图按钮（当图片经过压缩时显示） -->
        <div class="flex items-center justify-center flex-shrink-0 pt-3 pb-1">
            <button id="imagePreviewOriginalBtn" class="hidden px-4 py-2 rounded-full bg-brand-faint text-brand-deeper text-[13px] font-medium hover:bg-brand-light transition btn-press" onclick="toggleOriginalImageInPreview()">
                查看原图（<span id="imagePreviewOriginalSize">0.0M</span>）
            </button>
        </div>
        <!-- 图片小数点点数指示器 -->
        <div id="imagePreviewDots" class="flex items-center justify-center gap-2 flex-shrink-0 pt-2 pb-4">
            <!-- 动态插入圆点 -->
        </div>
        <!-- 底部工具栏 -->
        <div class="flex items-center justify-center gap-6 flex-shrink-0 pb-6">
            <button id="imagePreviewPrev" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition btn-press" onclick="prevImageInPreview()">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button id="imagePreviewNext" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition btn-press" onclick="nextImageInPreview()">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
            <div class="w-px h-6 bg-gray-200"></div>
            <button id="imagePreviewZoomOut" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition btn-press" onclick="zoomOutImageInPreview()">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"/></svg>
            </button>
            <span id="imagePreviewZoomLevel" class="text-[13px] text-gray-600 font-medium">100%</span>
            <button id="imagePreviewZoomIn" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition btn-press" onclick="zoomInImageInPreview()">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
            </button>
            <div class="w-px h-6 bg-gray-200"></div>
            <button id="imagePreviewRotate" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition btn-press" onclick="rotateImageInPreview()">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </button>
            <button id="imagePreviewDownload" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition btn-press" onclick="downloadImageInPreview()">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
        </div>
    </div>'''

new_preview = '''    <!-- 图片预览模态框 - 全屏高斯模糊背景 -->
    <div id="imagePreviewModal" class="fixed inset-0 z-[70] hidden" style="animation: fadeIn 0.3s ease;">
        <!-- 高斯模糊背景 -->
        <div id="imagePreviewOverlay" class="absolute inset-0 bg-black/70 backdrop-blur-xl"></div>
        
        <!-- 左上角关闭按钮 -->
        <button id="imagePreviewClose" onclick="closeImagePreview(event)" 
            class="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>
        
        <!-- 图片显示区域（居中放大显示） -->
        <div id="imagePreviewImageArea" class="relative flex items-center justify-center w-full h-full z-10">
            <div id="imagePreviewSlider" class="relative max-w-[90vw] max-h-[80vh] transition-transform duration-300 ease-out" style="box-shadow: 0 20px 60px rgba(0,0,0,0.4); border-radius: 16px; overflow: hidden;">
                <!-- 动态插入图片 -->
            </div>
        </div>
        
        <!-- 底部工具栏（3秒不动自动淡出） -->
        <div id="imagePreviewToolbar" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-full bg-black/60 backdrop-blur-md transition-opacity duration-500 z-10">
            <!-- 切换图 -->
            <button id="imagePreviewPrev" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all" onclick="prevImageInPreview()">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
            </button>
            <span id="imagePreviewCountText" class="text-white text-sm font-medium min-w-[60px] text-center">1/1</span>
            <button id="imagePreviewNext" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all" onclick="nextImageInPreview()">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
            </button>
            
            <div class="w-px h-6 bg-white/30 mx-2"></div>
            
            <!-- 放大缩小 -->
            <button id="imagePreviewZoomOut" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all" onclick="zoomOutImageInPreview()">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"/>
                </svg>
            </button>
            <span id="imagePreviewZoomLevel" class="text-white text-sm font-medium min-w-[60px] text-center">100%</span>
            <button id="imagePreviewZoomIn" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all" onclick="zoomInImageInPreview()">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                </svg>
            </button>
            
            <div class="w-px h-6 bg-white/30 mx-2"></div>
            
            <!-- 全屏显示 -->
            <button id="imagePreviewFullscreen" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all" onclick="toggleFullscreenInPreview()">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                </svg>
            </button>
            
            <!-- 旋转 -->
            <button id="imagePreviewRotate" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all" onclick="rotateImageInPreview()">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
            </button>
            
            <!-- 下载 -->
            <button id="imagePreviewDownload" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all" onclick="downloadImageInPreview()">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
            </button>
        </div>
    </div>'''

html = html.replace(old_preview, new_preview)

# ========== 2. 修复阅读模式设置页 ==========
old_reading = '''        <div id="readingModeModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] scale-0 opacity-0 transition-all duration-300">
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

new_reading = '''        <div id="readingModeModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] scale-0 opacity-0 transition-all duration-300">
            <div class="bg-white rounded-3xl w-[90%] max-w-md overflow-hidden shadow-2xl">
                <!-- 标题栏：全屏开关移到右上角 -->
                <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900">灵感阅读模式</h3>
                    <div class="flex items-center gap-4">
                        <!-- 全屏显示开关（白点不贴边） -->
                        <button id="readingFullscreenToggle" class="w-12 h-7 rounded-full transition-all duration-300" style="background: #F59E0B;">
                            <span class="inline-block w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300" style="translate: 20px;"></span>
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
                    <div class="grid grid-cols-2 gap-4">
                        <!-- 图文模式 -->
                        <button id="readingModeNormal" class="reading-mode-btn relative p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50/60 transition-all duration-300 text-left group overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div class="relative">
                                <div class="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                    <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                                </div>
                                <p class="font-semibold text-gray-900 text-sm mb-1">图文模式</p>
                                <p class="text-xs text-gray-500">文章逻辑查看</p>
                                <div class="reading-mode-check w-5 h-5 rounded-full border-2 border-gray-300 mt-3 transition-all duration-300"></div>
                            </div>
                        </button>
                        
                        <!-- Note 模式 -->
                        <button id="readingModeNote" class="reading-mode-btn relative p-4 rounded-2xl border-2 border-gray-100 hover:border-pink-300 hover:bg-pink-50/60 transition-all duration-300 text-left group overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-br from-pink-50/0 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div class="relative">
                                <div class="w-14 h-14 rounded-xl bg-pink-50 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                                    <svg class="w-7 h-7 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                </div>
                                <p class="font-semibold text-gray-900 text-sm mb-1">Note 模式</p>
                                <p class="text-xs text-gray-500">沉浸式体验</p>
                                <div class="reading-mode-check w-5 h-5 rounded-full border-2 border-gray-300 mt-3 transition-all duration-300"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>'''

html = html.replace(old_reading, new_reading)

# 更新CSS样式
old_css = '''        /* 阅读模式按钮选中状态 */
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

new_css = '''        /* 阅读模式按钮选中状态 */
        .reading-mode-btn.active {
            transform: scale(0.98);
        }
        .reading-mode-btn.normal-active {
            border-color: #3B82F6 !important;
            background: rgba(59, 130, 246, 0.12) !important;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .reading-mode-btn.normal-active .reading-mode-check {
            background: #3B82F6;
            border-color: #3B82F6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
        }
        .reading-mode-btn.note-active {
            border-color: #EC4899 !important;
            background: rgba(236, 72, 153, 0.12) !important;
            box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
        }
        .reading-mode-btn.note-active .reading-mode-check {
            background: #EC4899;
            border-color: #EC4899;
            box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.3);
        }
        .reading-mode-check {
            position: relative;
        }
        .reading-mode-check.active,
        .reading-mode-check.note-active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .reading-mode-check.active::after,
        .reading-mode-check.note-active::after {
            content: '';
            display: block;
            width: 2px;
            height: 5px;
            border-right: 2px solid white;
            border-bottom: 2px solid white;
            transform: rotate(45deg);
            margin-top: -2px;
        }'''

html = html.replace(old_css, new_css)

with io.open(android_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("✓ Android index.html updated")

# ================ ELECTRON: index.html ================
elec_path = 'gator-electron/www/index.html'

with io.open(elec_path, 'r', encoding='utf-8') as f:
    e_html = f.read()

e_html = e_html.replace(old_preview, new_preview)
e_html = e_html.replace(old_reading, new_reading)
e_html = e_html.replace(old_css, new_css)

with io.open(elec_path, 'w', encoding='utf-8') as f:
    f.write(e_html)
print("✓ Electron index.html updated")

print("\n=== 重构完成 ===")
print("\n【图片预览界面重构】")
print("  - 全屏显示，高斯模糊背景")
print("  - 左上角X关闭按钮")
print("  - 底部工具栏：切换图 | 放大缩小 | 全屏 | 旋转 | 下载")
print("  - 工具栏3秒不动自动淡出")
print("\n【阅读模式设置页修复】")
print("  1. 全屏显示移到右上角，白点内缩2px不贴边")
print("  2. 取消按钮已移除")
print("  3. 选中高亮：图文模式蓝色，Note模式粉色")
print("  4. 横向排列，hover图标放大+旋转动效")
