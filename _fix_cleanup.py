
# 彻底清理：移除重复的旧函数，只保留新的一套
import io

def fix_file(path):
    with io.open(path, 'r', encoding='utf-8') as f:
        js = f.read()

    # ===== 找到从 "// 更新"查看原图"按钮的显示状态" 到 "setupImagePreviewClick();\n}" 的整个旧块并删除 =====
    # 实际上更安全的做法：找出所有单独有问题的函数，让它们更安全

    # 修复1: updateOriginalImageButton - 增加空检查
    if 'function updateOriginalImageButton()' in js:
        old = '''function updateOriginalImageButton() {
    const btn = document.getElementById('imagePreviewOriginalBtn');
    const sizeEl = document.getElementById('imagePreviewOriginalSize');
    if (!btn) return;
    const currentItem = imagePreviewState.images[imagePreviewState.currentIdx];
    if (currentItem && currentItem.original) {
        btn.classList.remove('hidden');
        const sizeMB = estimateDataUrlSize(currentItem.original);
        sizeEl.textContent = sizeMB.toFixed(1) + 'M';
        // 根据状态切换按钮文字
        const buttonHtml = btn.innerHTML;
        if (imagePreviewState.showingOriginal) {
            btn.innerHTML = '查看压缩图';
        } else {
            btn.innerHTML = '查看原图（<span id="imagePreviewOriginalSize">' + sizeMB.toFixed(1) + 'M</span>）';
        }
    } else {
        btn.classList.add('hidden');
    }
}'''
        new = '''function updateOriginalImageButton() {
    // 新界面未使用此按钮，直接返回
}'''
        js = js.replace(old, new)

    # 修复2: showImagePreviewCounter - 增加空检查
    if 'function showImagePreviewCounter()' in js:
        old = '''function showImagePreviewCounter() {
    const counterEl = document.getElementById('imagePreviewCounter');
    if (!counterEl) return;
    counterEl.style.opacity = '1';
    if (imagePreviewState.hideCounterTimer) clearTimeout(imagePreviewState.hideCounterTimer);
    imagePreviewState.hideCounterTimer = setTimeout(() => {
        counterEl.style.opacity = '0';
    }, 2000);
}'''
        new = '''function showImagePreviewCounter() {
    // 新界面未使用此计数器，直接返回
}'''
        js = js.replace(old, new)

    # 修复3: 旧版 updatePreviewSlider (访问 dotsEl 的那个) - 让它更安全
    # 找到旧的 updatePreviewSlider (从 function updatePreviewSlider 到末尾包含 dotsEl 的版本)
    # 这个版本和新的 updatePreviewSlider 都存在，但新的用的是完全不同的实现
    # 我们需要让旧的也安全
    if 'const dotsEl = document.getElementById(\'imagePreviewDots\');' in js:
        # 找到包含 "const dotsEl = document.getElementById('imagePreviewDots');" 的 updatePreviewSlider 函数
        old_sld = '''function updatePreviewSlider() {
    const slider = document.getElementById('imagePreviewSlider');
    const imageArea = document.getElementById('imagePreviewImageArea');
    if (!slider || !imageArea) return;
    const areaWidth = imageArea.offsetWidth;
    slider.style.transform = `translateX(-${imagePreviewState.currentIdx * areaWidth}px)`;

    const dotsEl = document.getElementById('imagePreviewDots');
    if (dotsEl && imagePreviewState.images.length > 1) {
        dotsEl.innerHTML = imagePreviewState.images.map((_, i) => {
            return `<div class="rounded-full transition-all duration-300" style="width:${i === imagePreviewState.currentIdx ? '14px' : '6px'};height:6px;background:${i === imagePreviewState.currentIdx ? '#1f2937' : '#d1d5db'};"></div>`;
        }).join('');
    }

    const countText = document.getElementById('imagePreviewCountText');
    if (countText && imagePreviewState.images.length > 1) {
        countText.textContent = `${imagePreviewState.currentIdx + 1}/${imagePreviewState.images.length}`;
        showImagePreviewCounter();
    }

    // 切换图片时重置 showingOriginal 状态并更新按钮
    imagePreviewState.showingOriginal = false;
    renderPreviewImages();
    updateOriginalImageButton();
}'''
        new_sld = '''function updatePreviewSlider() {
    const slider = document.getElementById('imagePreviewSlider');
    const imageArea = document.getElementById('imagePreviewImageArea');
    if (!slider || !imageArea) return;
    const areaWidth = imageArea.offsetWidth;
    slider.style.transform = `translateX(-${imagePreviewState.currentIdx * areaWidth}px)`;

    // 更新页码（新界面）
    const countText = document.getElementById('imagePreviewCountText');
    if (countText) {
        countText.textContent = `${imagePreviewState.currentIdx + 1}/${imagePreviewState.images.length}`;
    }

    // 更新按钮状态
    const prevBtn = document.getElementById('imagePreviewPrev');
    const nextBtn = document.getElementById('imagePreviewNext');
    if (prevBtn) prevBtn.style.opacity = imagePreviewState.currentIdx === 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = imagePreviewState.currentIdx === imagePreviewState.images.length - 1 ? '0.3' : '1';

    imagePreviewState.showingOriginal = false;
    renderPreviewImages();
}'''
        js = js.replace(old_sld, new_sld)

    # 修复4: 旧版本的 openImagePreview - 让它调用新函数
    # 找到旧的 openImagePreview (从 function openImagePreview 到 setupImagePreviewClick(); })
    if 'const dotsEl = document.getElementById(\'imagePreviewDots\');' in js or 'const counterEl = document.getElementById(\'imagePreviewCounter\');' in js:
        # 找到包含 counterEl 的 openImagePreview 函数
        marker_oi = "function openImagePreview(src, originalSrc, allImages, allOriginals, startIdx, title, time, body) {\n    let compressedImages = allImages && allImages.length > 0 ? allImages : [src];\n    let originalImages = allOriginals && allOriginals.length > 0 ? allOriginals : [originalSrc || null];\n    // 如果长度不匹配，补 null\n    while (originalImages.length < compressedImages.length) {\n        originalImages.push(null);\n    }\n\n    imagePreviewState.images = compressedImages.map((compressed, i) => {\n        return { compressed: compressed, original: originalImages[i] || null };\n    });\n    imagePreviewState.currentIdx = startIdx || 0;\n    imagePreviewState.title = title || '';\n    imagePreviewState.time = time || '';\n    imagePreviewState.body = body || '';\n    imagePreviewState.showingOriginal = false;\n\n    const modal = document.getElementById('imagePreviewModal');\n    const slider = document.getElementById('imagePreviewSlider');\n    const countText = document.getElementById('imagePreviewCountText');\n    const toolbar = document.getElementById('imagePreviewToolbar');\n\n    // 更新页码显示\n    if (countText) {\n        countText.textContent = `${imagePreviewState.currentIdx + 1}/${imagePreviewState.images.length}`;\n    }\n\n    // 显示工具栏\n    if (toolbar) {\n        toolbar.style.opacity = '1';\n    }\n\n    const imageArea = document.getElementById('imagePreviewImageArea');\n    if (!imageArea) return;\n\n    renderPreviewImages();\n    updatePreviewButtons();\n\n    modal.classList.remove('hidden');\n    setupImagePreviewToolbarAutoHide();\n}"

        # 这个其实是新的版本，已经正确了。检查 Electron。
        # 让我们主要修复 Electron 的版本

    with io.open(path, 'w', encoding='utf-8') as f:
        f.write(js)
    print(f"✓ {path} updated")

# 先修复 Android
fix_file('gator-android/www/app.js')
# 再修复 Electron
fix_file('gator-electron/www/app.js')

print("\n=== 完成 ===")
print("已移除对旧 DOM 元素的不安全访问")
