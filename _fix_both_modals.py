import io

# ================ 重新修复：图片预览界面 + 阅读模式设置页 ================

# ================ ANDROID: index.html ================
android_path = 'gator-android/www/index.html'

with io.open(android_path, 'r', encoding='utf-8') as f:
    html = f.read()

# ========== 1. 修复阅读模式设置页 ==========
old_reading = '''    <!-- 灵感阅读模式弹窗 -->
    <div id="inspirationReadingModal" class="fixed inset-0 z-50 hidden">
        <div class="absolute inset-0 bg-black/30" onclick="closeInspirationReadingMode()"></div>
        <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] modal-up p-5">
            <div class="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5"></div>
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-[17px] font-bold text-gray-900">灵感阅读模式</h3>
                <button onclick="closeInspirationReadingMode()" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center btn-press">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>
            
            <div class="space-y-4 mb-6">
                <div class="flex items-center gap-2 cursor-pointer" onclick="toggleFullscreenReading()" id="fullscreenReadingSwitchWrapper">
                    <span class="text-[15px] text-gray-700">全屏显示</span>
                    <div id="fullscreenReadingSwitch" class="w-12 h-6 rounded-full bg-gray-200 relative transition-colors flex-shrink-0">
                        <div id="fullscreenReadingDot" class="w-5 h-5 rounded-full bg-white shadow absolute top-0.5 left-0.5 transition-transform"></div>
                    </div>
                </div>
            </div>
            
            <div class="space-y-3 mb-6">
                <div class="text-[13px] text-gray-500 mb-2">选择阅读模式</div>
                <button onclick="selectReadingMode('normal')" id="normalModeBtn" class="w-full p-4 rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50/50 transition btn-press text-left">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292"/></svg>
                        </div>
                        <div class="flex-1">
                            <p class="text-[15px] font-semibold text-gray-900">图文模式</p>
                            <p class="text-[12px] text-gray-400">以文章、Pages的逻辑查看灵感内容</p>
                        </div>
                        <div id="normalModeCheck" class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                            <svg class="w-4 h-4 text-white opacity-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                        </div>
                    </div>
                </button>
                
                <button onclick="selectReadingMode('note')" id="noteModeBtn" class="w-full p-4 rounded-2xl border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50/50 transition btn-press text-left">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                            <svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        </div>
                        <div class="flex-1">
                            <p class="text-[15px] font-semibold text-gray-900">Note 模式</p>
                            <p class="text-[12px] text-gray-400">类小红书样式，沉浸式阅读体验</p>
                        </div>
                        <div id="noteModeCheck" class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                            <svg class="w-4 h-4 text-white opacity-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
                        </div>
                    </div>
                </button>
            </div>
            
            <button onclick="closeInspirationReadingMode()" class="w-full bg-gray-100 text-gray-700 font-medium py-3.5 rounded-2xl btn-press">取消</button>
        </div>
    </div>'''

new_reading = '''    <!-- 灵感阅读模式弹窗 -->
    <div id="inspirationReadingModal" class="fixed inset-0 z-50 hidden">
        <div class="absolute inset-0 bg-black/30" onclick="closeInspirationReadingMode()"></div>
        <div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] modal-up p-5">
            <div class="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5"></div>
            <!-- 标题栏：全屏开关移到右上角，白点不贴边 -->
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-[17px] font-bold text-gray-900">灵感阅读模式</h3>
                <div class="flex items-center gap-4">
                    <!-- 全屏显示开关（白点内缩2px） -->
                    <div class="flex items-center gap-2 cursor-pointer" onclick="toggleFullscreenReading()" id="fullscreenReadingSwitchWrapper">
                        <span class="text-[15px] text-gray-700">全屏显示</span>
                        <div id="fullscreenReadingSwitch" class="w-12 h-6 rounded-full bg-gray-200 relative transition-colors flex-shrink-0">
                            <div id="fullscreenReadingDot" class="w-5 h-5 rounded-full bg-white shadow absolute top-0.5 left-[2px] transition-transform"></div>
                        </div>
                    </div>
                    <button onclick="closeInspirationReadingMode()" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center btn-press">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>
            </div>
            
            <!-- 横向排列：图文模式 | Note 模式 -->
            <div class="mb-6">
                <div class="text-[13px] text-gray-500 mb-3">选择阅读模式</div>
                <div class="grid grid-cols-2 gap-3">
                    <!-- 图文模式 -->
                    <button onclick="selectReadingMode('normal')" id="normalModeBtn" class="relative p-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/60 transition-all duration-300 btn-press text-left overflow-hidden">
                        <div class="relative">
                            <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-2 transition-transform duration-300 hover:scale-110 hover:rotate-3">
                                <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292"/></svg>
                            </div>
                            <p class="text-[14px] font-semibold text-gray-900">图文模式</p>
                            <p class="text-[11px] text-gray-400 mt-1">文章逻辑查看</p>
                            <div id="normalModeCheck" class="w-5 h-5 rounded-full border-2 border-gray-300 mt-2 transition-all duration-300"></div>
                        </div>
                    </button>
                    
                    <!-- Note 模式 -->
                    <button onclick="selectReadingMode('note')" id="noteModeBtn" class="relative p-4 rounded-2xl border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50/60 transition-all duration-300 btn-press text-left overflow-hidden">
                        <div class="relative">
                            <div class="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-2 transition-transform duration-300 hover:scale-110 hover:-rotate-3">
                                <svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                            </div>
                            <p class="text-[14px] font-semibold text-gray-900">Note 模式</p>
                            <p class="text-[11px] text-gray-400 mt-1">沉浸式体验</p>
                            <div id="noteModeCheck" class="w-5 h-5 rounded-full border-2 border-gray-300 mt-2 transition-all duration-300"></div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>'''

html = html.replace(old_reading, new_reading)
print("✓ 阅读模式设置页已修复")

# ========== 2. 修复图片预览界面 ==========
old_preview = '''    <!-- 图片预览弹窗（白色背景+多图轮播+正文） -->
    <div id="imagePreviewModal" class="fixed inset-0 z-[70] hidden bg-white flex flex-col" style="animation: fadeIn 0.2s ease;">
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
        <div id="imagePreviewDots" class="flex items-center justify-center gap-2 py-2 flex-shrink-0">
            <!-- 动态插入小圆点 -->
        </div>
        <!-- 正文内容区域 -->
        <div id="imagePreviewContent" class="flex-1 overflow-y-auto px-6 pb-8">
            <div class="flex items-center gap-2 mb-3">
                <div id="imagePreviewAvatar" class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <span class="text-lg">👤</span>
                </div>
                <div class="flex-1 min-w-0">
                    <h4 id="imagePreviewTitle" class="text-[15px] font-semibold text-gray-900 truncate"></h4>
                    <p id="imagePreviewTime" class="text-[12px] text-gray-500"></p>
                </div>
            </div>
            <div id="imagePreviewBody" class="text-[15px] text-gray-800 leading-relaxed whitespace-pre-wrap"></div>
        </div>
    </div>'''

new_preview = '''    <!-- 图片预览弹窗（全屏高斯模糊背景） -->
    <div id="imagePreviewModal" class="fixed inset-0 z-[70] hidden">
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
print("✓ 图片预览界面已修复")

with io.open(android_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("✓ Android index.html updated")

# ================ ELECTRON: index.html ================
elec_path = 'gator-electron/www/index.html'

with io.open(elec_path, 'r', encoding='utf-8') as f:
    e_html = f.read()

e_html = e_html.replace(old_reading, new_reading)
e_html = e_html.replace(old_preview, new_preview)

with io.open(elec_path, 'w', encoding='utf-8') as f:
    f.write(e_html)
print("✓ Electron index.html updated")

print("\n=== 修复完成 ===")
print("\n【阅读模式设置页】")
print("  1. 全屏显示移到右上角，白点内缩2px")
print("  2. 取消按钮已移除")
print("  3. 横向排列，图文模式蓝色高亮，Note模式粉色高亮")
print("  4. hover图标放大+旋转动效")
print("\n【图片预览界面】")
print("  - 全屏高斯模糊背景")
print("  - 左上角X关闭按钮")
print("  - 底部工具栏：切换图 | 放大缩小 | 全屏 | 旋转 | 下载")
print("  - 图片带阴影效果")
