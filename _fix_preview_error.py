import io

# ================ 修复图片预览函数访问已移除的DOM元素 ================

# ================ ANDROID: app.js ================
android_path = 'gator-android/www/app.js'

with io.open(android_path, 'r', encoding='utf-8') as f:
    js = f.read()

# 修复 openImagePreview 函数
old_func = '''function openImagePreview(src, originalSrc, allImages, allOriginals, startIdx, title, time, body) {
    let compressedImages = allImages && allImages.length > 0 ? allImages : [src];
    let originalImages = allOriginals && allOriginals.length > 0 ? allOriginals : [originalSrc || null];
    // 如果长度不匹配，补 null
    while (originalImages.length < compressedImages.length) {
        originalImages.push(null);
    }

    imagePreviewState.images = compressedImages.map((compressed, i) => {
        return { compressed: compressed, original: originalImages[i] || null };
    });
    imagePreviewState.currentIdx = startIdx || 0;
    imagePreviewState.title = title || '';
    imagePreviewState.time = time || '';
    imagePreviewState.body = body || '';
    imagePreviewState.showingOriginal = false;

    const modal = document.getElementById('imagePreviewModal');
    const slider = document.getElementById('imagePreviewSlider');
    const dotsEl = document.getElementById('imagePreviewDots');
    const counterEl = document.getElementById('imagePreviewCounter');
    const titleEl = document.getElementById('imagePreviewTitle');
    const timeEl = document.getElementById('imagePreviewTime');
    const bodyEl = document.getElementById('imagePreviewBody');

    if (titleEl) titleEl.textContent = imagePreviewState.title;
    if (timeEl) timeEl.textContent = imagePreviewState.time;
    if (bodyEl) bodyEl.textContent = imagePreviewState.body;

    const imageArea = document.getElementById('imagePreviewImageArea');
    if (!imageArea) return;
    const areaWidth = imageArea.offsetWidth;

    renderPreviewImages();
    updateOriginalImageButton();

    if (imagePreviewState.images.length > 1) {
        dotsEl.style.display = 'flex';
        dotsEl.innerHTML = imagePreviewState.images.map((_, i) => {
            return `<div class="rounded-full transition-all duration-300" style="width:${i === imagePreviewState.currentIdx ? '14px' : '6px'};height:6px;background:${i === imagePreviewState.currentIdx ? '#1f2937' : '#d1d5db'};"></div>`;
        }).join('');
        counterEl.style.display = 'flex';
        document.getElementById('imagePreviewCountText').textContent = `${imagePreviewState.currentIdx + 1}/${imagePreviewState.images.length}`;
        showImagePreviewCounter();
    } else {
        dotsEl.style.display = 'none';
        counterEl.style.display = 'none';
    }

    slider.style.transform = 'translateX(0px)';

    modal.classList.remove('hidden');
    setupImagePreviewClick();
}'''

new_func = '''function openImagePreview(src, originalSrc, allImages, allOriginals, startIdx, title, time, body) {
    let compressedImages = allImages && allImages.length > 0 ? allImages : [src];
    let originalImages = allOriginals && allOriginals.length > 0 ? allOriginals : [originalSrc || null];
    // 如果长度不匹配，补 null
    while (originalImages.length < compressedImages.length) {
        originalImages.push(null);
    }

    imagePreviewState.images = compressedImages.map((compressed, i) => {
        return { compressed: compressed, original: originalImages[i] || null };
    });
    imagePreviewState.currentIdx = startIdx || 0;
    imagePreviewState.title = title || '';
    imagePreviewState.time = time || '';
    imagePreviewState.body = body || '';
    imagePreviewState.showingOriginal = false;

    const modal = document.getElementById('imagePreviewModal');
    const slider = document.getElementById('imagePreviewSlider');
    const countText = document.getElementById('imagePreviewCountText');
    const toolbar = document.getElementById('imagePreviewToolbar');

    // 更新页码显示
    if (countText) {
        countText.textContent = `${imagePreviewState.currentIdx + 1}/${imagePreviewState.images.length}`;
    }

    // 显示工具栏
    if (toolbar) {
        toolbar.style.opacity = '1';
    }

    const imageArea = document.getElementById('imagePreviewImageArea');
    if (!imageArea) return;

    renderPreviewImages();
    updatePreviewButtons();

    modal.classList.remove('hidden');
    setupImagePreviewToolbarAutoHide();
}'''

js = js.replace(old_func, new_func)

# 添加新函数：更新预览按钮状态
new_btn_func = '''
// 更新预览按钮状态（上一张/下一张）
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

// 工具栏自动隐藏（3秒不动淡出）
let toolbarHideTimer = null;
function setupImagePreviewToolbarAutoHide() {
    const toolbar = document.getElementById('imagePreviewToolbar');
    if (!toolbar) return;
    
    // 清除之前的定时器
    if (toolbarHideTimer) clearTimeout(toolbarHideTimer);
    
    // 显示工具栏
    toolbar.style.opacity = '1';
    
    // 3秒后淡出
    toolbarHideTimer = setTimeout(() => {
        toolbar.style.opacity = '0';
    }, 3000);
    
    // 鼠标移动时重新显示
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

'''

# 在 renderPreviewImages 函数前插入新函数
js = js.replace('// 渲染图片（根据 showingOriginal 状态决定显示压缩图还是原图）', new_btn_func + '// 渲染图片（根据 showingOriginal 状态决定显示压缩图还是原图）')

with io.open(android_path, 'w', encoding='utf-8') as f:
    f.write(js)
print("✓ Android app.js updated")

# ================ ELECTRON: app.js ================
elec_path = 'gator-electron/www/app.js'

with io.open(elec_path, 'r', encoding='utf-8') as f:
    e_js = f.read()

e_js = e_js.replace(old_func, new_func)
e_js = e_js.replace('// 渲染图片（根据 showingOriginal 状态决定显示压缩图还是原图）', new_btn_func + '// 渲染图片（根据 showingOriginal 状态决定显示压缩图还是原图）')

with io.open(elec_path, 'w', encoding='utf-8') as f:
    f.write(e_js)
print("✓ Electron app.js updated")

print("\n=== 修复完成 ===")
print("问题：openImagePreview 函数访问已移除的DOM元素（dotsEl, counterEl等）")
print("修复：移除对这些元素的访问，改用新的工具栏结构")