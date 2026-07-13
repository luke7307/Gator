import io

# ================ 完整修复：图片预览 + 阅读模式默认选中 ================

# ================ ANDROID: app.js ================
android_path = 'gator-android/www/app.js'

with io.open(android_path, 'r', encoding='utf-8') as f:
    js = f.read()

# ========== 修复1：图片预览按钮功能 ==========
# 检查是否已存在这些函数，如果不存在则添加
if 'function prevImageInPreview' not in js:
    preview_functions = '''
// 图片预览：上一张
function prevImageInPreview() {
    if (imagePreviewState.currentIdx > 0) {
        imagePreviewState.currentIdx--;
        updatePreviewSlider();
    }
}

// 图片预览：下一张
function nextImageInPreview() {
    if (imagePreviewState.currentIdx < imagePreviewState.images.length - 1) {
        imagePreviewState.currentIdx++;
        updatePreviewSlider();
    }
}

// 图片预览：放大
function zoomInImageInPreview() {
    const img = document.querySelector('#imagePreviewSlider img');
    if (!img) return;
    const current = parseFloat(img.style.transform.replace(/[^0-9.]/g, '')) || 1;
    const newScale = Math.min(current + 0.25, 3);
    img.style.transform = `scale(${newScale})`;
    updateZoomText(newScale);
}

// 图片预览：缩小
function zoomOutImageInPreview() {
    const img = document.querySelector('#imagePreviewSlider img');
    if (!img) return;
    const current = parseFloat(img.style.transform.replace(/[^0-9.]/g, '')) || 1;
    const newScale = Math.max(current - 0.25, 0.5);
    img.style.transform = `scale(${newScale})`;
    updateZoomText(newScale);
}

// 更新缩放显示
function updateZoomText(scale) {
    const zoomText = document.getElementById('imagePreviewZoomLevel');
    if (zoomText) {
        zoomText.textContent = Math.round(scale * 100) + '%';
    }
}

// 图片预览：全屏显示
function toggleFullscreenInPreview() {
    const modal = document.getElementById('imagePreviewModal');
    if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen();
    }
}

// 图片预览：旋转
function rotateImageInPreview() {
    const img = document.querySelector('#imagePreviewSlider img');
    if (!img) return;
    const current = img.dataset.rotate || 0;
    const newRotate = (parseInt(current) + 90) % 360;
    img.dataset.rotate = newRotate;
    const scale = img.style.transform.includes('scale') ? parseFloat(img.style.transform.match(/scale\(([^)]+)\)/)[1]) : 1;
    img.style.transform = `rotate(${newRotate}deg) scale(${scale})`;
}

// 图片预览：下载
function downloadImageInPreview() {
    const img = document.querySelector('#imagePreviewSlider img');
    if (!img) return;
    const a = document.createElement('a');
    a.href = img.src;
    a.download = `image_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// 图片预览：切换原图
function toggleOriginalImageInPreview() {
    imagePreviewState.showingOriginal = !imagePreviewState.showingOriginal;
    renderPreviewImages();
}

// 更新图片轮播（简化版）
function updatePreviewSlider() {
    const slider = document.getElementById('imagePreviewSlider');
    const imageArea = document.getElementById('imagePreviewImageArea');
    if (!slider || !imageArea) return;
    const areaWidth = imageArea.offsetWidth;
    slider.style.transform = `translateX(-${imagePreviewState.currentIdx * areaWidth}px)`;

    const countText = document.getElementById('imagePreviewCountText');
    if (countText) {
        countText.textContent = `${imagePreviewState.currentIdx + 1}/${imagePreviewState.images.length}`;
    }

    updatePreviewButtons();

    imagePreviewState.showingOriginal = false;
    renderPreviewImages();
}

// 更新按钮状态
function updatePreviewButtons() {
    const prevBtn = document.getElementById('imagePreviewPrev');
    const nextBtn = document.getElementById('imagePreviewNext');
    const countText = document.getElementById('imagePreviewCountText');

    if (prevBtn) {
        prevBtn.style.opacity = imagePreviewState.currentIdx === 0 ? '0.3' : '1';
    }
    if (nextBtn) {
        nextBtn.style.opacity = imagePreviewState.currentIdx === imagePreviewState.images.length - 1 ? '0.3' : '1';
    }
    if (countText) {
        countText.textContent = `${imagePreviewState.currentIdx + 1}/${imagePreviewState.images.length}`;
    }
}

// 工具栏自动隐藏
let toolbarHideTimer = null;
function setupImagePreviewToolbarAutoHide() {
    const toolbar = document.getElementById('imagePreviewToolbar');
    if (!toolbar) return;

    if (toolbarHideTimer) clearTimeout(toolbarHideTimer);
    toolbar.style.opacity = '1';

    toolbarHideTimer = setTimeout(() => {
        toolbar.style.opacity = '0';
    }, 3000);

    const modal = document.getElementById('imagePreviewModal');
    if (modal) {
        modal.onmousemove = () => {
            toolbar.style.opacity = '1';
            if (toolbarHideTimer) clearTimeout(toolbarHideTimer);
            toolbarHideTimer = setTimeout(() => {
                toolbar.style.opacity = '0';
            }, 3000);
        };
    }
}

// 渲染预览图片（适配全屏高斯模糊背景的版本）
function renderPreviewImages() {
    const slider = document.getElementById('imagePreviewSlider');
    const imageArea = document.getElementById('imagePreviewImageArea');
    if (!slider || !imageArea) return;
    const areaWidth = imageArea.offsetWidth;

    slider.innerHTML = imagePreviewState.images.map(item => {
        const url = imagePreviewState.showingOriginal ? (item.original || item.compressed) : item.compressed;
        return `<div class="flex-shrink-0" style="min-width:${areaWidth}px; display:flex; align-items:center; justify-content:center;">
            <img src="${url}" style="max-width:90vw; max-height:75vh; object-fit:contain; border-radius:16px; box-shadow:0 20px 60px rgba(0,0,0,0.4); transition:transform 0.3s ease;" decoding="async">
        </div>`;
    }).join('');
}

// 图片预览区域点击事件
function setupImagePreviewClick() {
    const imageArea = document.getElementById('imagePreviewImageArea');
    if (!imageArea) return;
    imageArea.onclick = function(e) {
        const rect = imageArea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 3) {
            prevImageInPreview();
        } else if (x > rect.width * 2 / 3) {
            nextImageInPreview();
        }
    };
}

'''
    # 在 'function openImagePreview' 之前插入新函数
    js = js.replace('function openImagePreview(src, originalSrc, allImages, allOriginals, startIdx, title, time, body)', preview_functions + '\nfunction openImagePreview(src, originalSrc, allImages, allOriginals, startIdx, title, time, body)')

# ========== 修复2：阅读模式默认选中显示 ==========
# 替换 updateReadingModeUI 函数，确保有默认状态显示
old_ru = '''function updateReadingModeUI() {
    const normalBtn = document.getElementById('normalModeBtn');
    const noteBtn = document.getElementById('noteModeBtn');
    const normalCheck = document.getElementById('normalModeCheck');
    const noteCheck = document.getElementById('noteModeCheck');
    
    if (readingMode === 'normal') {
        normalBtn.classList.add('normal-active');
        normalBtn.classList.remove('note-active');
        normalCheck.classList.add('active');
        normalCheck.classList.remove('note-active');
        
        noteBtn.classList.remove('normal-active', 'note-active');
        noteCheck.classList.remove('active', 'note-active');
    } else {
        noteBtn.classList.add('note-active');
        noteBtn.classList.remove('normal-active');
        noteCheck.classList.add('note-active');
        noteCheck.classList.remove('active');
        
        normalBtn.classList.remove('normal-active', 'note-active');
        normalCheck.classList.remove('active', 'note-active');
    }
}'''

new_ru = '''function updateReadingModeUI() {
    const normalBtn = document.getElementById('normalModeBtn');
    const noteBtn = document.getElementById('noteModeBtn');
    const normalCheck = document.getElementById('normalModeCheck');
    const noteCheck = document.getElementById('noteModeCheck');
    
    if (!normalBtn || !noteBtn) return;
    
    if (readingMode === 'normal') {
        normalBtn.style.borderColor = '#3B82F6';
        normalBtn.style.background = 'rgba(59, 130, 246, 0.12)';
        normalCheck.style.background = '#3B82F6';
        normalCheck.style.borderColor = '#3B82F6';
        
        noteBtn.style.borderColor = '#e5e7eb';
        noteBtn.style.background = 'transparent';
        noteCheck.style.background = 'transparent';
        noteCheck.style.borderColor = '#d1d5db';
    } else {
        noteBtn.style.borderColor = '#EC4899';
        noteBtn.style.background = 'rgba(236, 72, 153, 0.12)';
        noteCheck.style.background = '#EC4899';
        noteCheck.style.borderColor = '#EC4899';
        
        normalBtn.style.borderColor = '#e5e7eb';
        normalBtn.style.background = 'transparent';
        normalCheck.style.background = 'transparent';
        normalCheck.style.borderColor = '#d1d5db';
    }
}'''

js = js.replace(old_ru, new_ru)

# 找到初始化readingMode的地方，确保启动时调用 updateReadingModeUI
old_init = "    imagePreviewState.showingOriginal = false;"
new_init = "    imagePreviewState.showingOriginal = false;\n\n    // 在页面加载时初始化阅读模式UI\n    setTimeout(updateReadingModeUI, 100);\n    setTimeout(updateFullscreenReadingSwitchUI, 100);"

# 只替换第一个出现（在openImagePreview中）
if '// 在页面加载时初始化阅读模式UI' not in js:
    lines = js.split('\n')
    for i, line in enumerate(lines):
        if 'function updateReadingModeUI()' in line and '// 页面加载时初始化' not in js:
            break
    # 在文件末尾添加初始化调用
    init_call = '''
// 页面加载后初始化UI状态
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateReadingModeUI, 100);
    setTimeout(updateFullscreenReadingSwitchUI, 100);
});
'''
    if "// 页面加载后初始化UI状态" not in js:
        js = js + init_call

with io.open(android_path, 'w', encoding='utf-8') as f:
    f.write(js)
print("✓ Android app.js updated")

# ================ ELECTRON: app.js ================
elec_path = 'gator-electron/www/app.js'

with io.open(elec_path, 'r', encoding='utf-8') as f:
    e_js = f.read()

if 'function prevImageInPreview' not in e_js:
    e_js = e_js.replace('function openImagePreview(src, originalSrc, allImages, allOriginals, startIdx, title, time, body)', preview_functions + '\nfunction openImagePreview(src, originalSrc, allImages, allOriginals, startIdx, title, time, body)')

e_js = e_js.replace(old_ru, new_ru)

if "// 页面加载后初始化UI状态" not in e_js:
    e_js = e_js + init_call

with io.open(elec_path, 'w', encoding='utf-8') as f:
    f.write(e_js)
print("✓ Electron app.js updated")

print("\n=== 修复完成 ===")
print("1. 添加图片预览所有按钮功能")
print("2. 修复阅读模式默认选中高亮状态")
print("3. 添加页面加载后UI自动初始化")