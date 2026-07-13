
# 用新的、简单的 openImagePreview 和 closeImagePreview 替换旧的所有版本

import io

NEW_OPEN_PREVIEW = '''

function openImagePreview(src, originalSrc, allImages, allOriginals, startIdx, title, time, body) {
    let compressedImages = allImages && allImages.length > 0 ? allImages : [src];
    let originalImages = allOriginals && allOriginals.length > 0 ? allOriginals : [originalSrc || null];
    while (originalImages.length < compressedImages.length) {
        originalImages.push(null);
    }

    imagePreviewState.images = compressedImages.map((compressed, i) => {
        return { compressed: compressed, original: originalImages[i] || null };
    });
    imagePreviewState.currentIdx = startIdx || 0;
    imagePreviewState.showingOriginal = false;

    const modal = document.getElementById('imagePreviewModal');
    const slider = document.getElementById('imagePreviewSlider');
    const imageArea = document.getElementById('imagePreviewImageArea');
    if (!modal || !slider || !imageArea) return;
    const areaWidth = imageArea.offsetWidth;

    // 渲染图片
    slider.innerHTML = imagePreviewState.images.map((item, i) => {
        const url = item.compressed;
        return '<div class="flex-shrink-0" style="min-width:' + areaWidth + 'px; display:flex; align-items:center; justify-content:center;">' +
            '<img src="' + url + '" style="max-width:90vw; max-height:75vh; object-fit:contain; border-radius:16px; box-shadow:0 20px 60px rgba(0,0,0,0.4);" decoding="async">' +
        '</div>';
    }).join('');

    // 更新页码
    const countText = document.getElementById('imagePreviewCountText');
    if (countText) {
        countText.textContent = (imagePreviewState.currentIdx + 1) + '/' + imagePreviewState.images.length;
    }

    // 更新按钮状态
    const prevBtn = document.getElementById('imagePreviewPrev');
    const nextBtn = document.getElementById('imagePreviewNext');
    if (prevBtn) prevBtn.style.opacity = imagePreviewState.currentIdx === 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = imagePreviewState.currentIdx === imagePreviewState.images.length - 1 ? '0.3' : '1';

    // 显示工具栏
    const toolbar = document.getElementById('imagePreviewToolbar');
    if (toolbar) {
        toolbar.style.opacity = '1';
    }

    slider.style.transform = 'translateX(0px)';

    modal.classList.remove('hidden');

    // 工具栏自动隐藏
    if (imagePreviewToolbarTimer) clearTimeout(imagePreviewToolbarTimer);
    imagePreviewToolbarTimer = setTimeout(function() {
        const t = document.getElementById('imagePreviewToolbar');
        if (t) t.style.opacity = '0';
    }, 3000);

    modal.onmousemove = function() {
        const t = document.getElementById('imagePreviewToolbar');
        if (t) t.style.opacity = '1';
        if (imagePreviewToolbarTimer) clearTimeout(imagePreviewToolbarTimer);
        imagePreviewToolbarTimer = setTimeout(function() {
            const tt = document.getElementById('imagePreviewToolbar');
            if (tt) tt.style.opacity = '0';
        }, 3000);
    };
}

function closeImagePreview(e) {
    const modal = document.getElementById('imagePreviewModal');
    if (modal) modal.classList.add('hidden');
    const slider = document.getElementById('imagePreviewSlider');
    if (slider) slider.innerHTML = '';
    if (imagePreviewToolbarTimer) clearTimeout(imagePreviewToolbarTimer);
    showFabCheckmark();
    renderFeed();
}

function prevImageInPreview() {
    if (imagePreviewState.currentIdx > 0) {
        imagePreviewState.currentIdx--;
        updateImagePreviewSlider();
    }
}

function nextImageInPreview() {
    if (imagePreviewState.currentIdx < imagePreviewState.images.length - 1) {
        imagePreviewState.currentIdx++;
        updateImagePreviewSlider();
    }
}

function updateImagePreviewSlider() {
    const slider = document.getElementById('imagePreviewSlider');
    const imageArea = document.getElementById('imagePreviewImageArea');
    if (!slider || !imageArea) return;
    const areaWidth = imageArea.offsetWidth;
    slider.style.transform = 'translateX(-' + (imagePreviewState.currentIdx * areaWidth) + 'px)';

    const countText = document.getElementById('imagePreviewCountText');
    if (countText) {
        countText.textContent = (imagePreviewState.currentIdx + 1) + '/' + imagePreviewState.images.length;
    }

    const prevBtn = document.getElementById('imagePreviewPrev');
    const nextBtn = document.getElementById('imagePreviewNext');
    if (prevBtn) prevBtn.style.opacity = imagePreviewState.currentIdx === 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = imagePreviewState.currentIdx === imagePreviewState.images.length - 1 ? '0.3' : '1';
}

function zoomInImageInPreview() {
    const img = document.querySelector('#imagePreviewSlider img');
    if (!img) return;
    const current = parseFloat(img.getAttribute('data-scale')) || 1;
    const newScale = Math.min(current + 0.25, 3);
    img.setAttribute('data-scale', newScale);
    const rotate = img.getAttribute('data-rotate') || 0;
    img.style.transform = 'rotate(' + rotate + 'deg) scale(' + newScale + ')';
    const zoomText = document.getElementById('imagePreviewZoomLevel');
    if (zoomText) zoomText.textContent = Math.round(newScale * 100) + '%';
}

function zoomOutImageInPreview() {
    const img = document.querySelector('#imagePreviewSlider img');
    if (!img) return;
    const current = parseFloat(img.getAttribute('data-scale')) || 1;
    const newScale = Math.max(current - 0.25, 0.5);
    img.setAttribute('data-scale', newScale);
    const rotate = img.getAttribute('data-rotate') || 0;
    img.style.transform = 'rotate(' + rotate + 'deg) scale(' + newScale + ')';
    const zoomText = document.getElementById('imagePreviewZoomLevel');
    if (zoomText) zoomText.textContent = Math.round(newScale * 100) + '%';
}

function rotateImageInPreview() {
    const img = document.querySelector('#imagePreviewSlider img');
    if (!img) return;
    const current = parseInt(img.getAttribute('data-rotate')) || 0;
    const newRotate = (current + 90) % 360;
    img.setAttribute('data-rotate', newRotate);
    const scale = img.getAttribute('data-scale') || 1;
    img.style.transform = 'rotate(' + newRotate + 'deg) scale(' + scale + ')';
}

function downloadImageInPreview() {
    const img = document.querySelector('#imagePreviewSlider img');
    if (!img) return;
    const a = document.createElement('a');
    a.href = img.src;
    a.download = 'image_' + Date.now() + '.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function toggleFullscreenInPreview() {
    const modal = document.getElementById('imagePreviewModal');
    if (!document.fullscreenElement) {
        modal.requestFullscreen().catch(function() {});
    } else {
        document.exitFullscreen();
    }
}

'''

NEW_PREVIEW_TIMER = "let imagePreviewToolbarTimer = null;\n\nlet imagePreviewState = { images: [], currentIdx: 0, showingOriginal: false, title: '', time: '', body: '', hideCounterTimer: null };\n\n''' + NEW_OPEN_PREVIEW + "\n\n"

# =============== 处理两个文件 ===============

def fix_file(path):
    with io.open(path, 'r', encoding='utf-8') as f:
        js = f.read()

    # 找到旧的 imagePreviewState 定义，并替换从那里开始到 openImagePreview 结束的部分

    # 找到 "let imagePreviewState = "
    idx_state = js.find('let imagePreviewState =')
    if idx_state == -1:
        print(f"{path}: 找不到 imagePreviewState，跳过")
        return

    # 找到 "function openImagePreview("  之后的第一个结束位置
    idx_oi = js.find('function openImagePreview(', idx_state)
    if idx_oi == -1:
        # 也可能是 function openImagePreview(src
        idx_oi = js.find('function openImagePreview(src', idx_state)
    if idx_oi == -1:
        print(f"{path}: 找不到 openImagePreview 函数，跳过")
        return

    # 找到 "setupImagePreviewClick 函数
    idx_sipc = js.find('function setupImagePreviewClick', idx_oi)
    if idx_sipc == -1:
        # 找旧 openImagePreview 结束：检查到下一个 function
        # 粗略方法：找到 'setupImagePreviewClick();\n}'
        alt = 'setupImagePreviewClick();\n}'
        idx_end = js.find(alt, idx_oi)
        if idx_end == -1:
            alt2 = 'setupImagePreviewClick();\n}'
            idx_end = js.find(alt2, idx_oi)
        if idx_end == -1:
            # 找 openImagePreview 结束位置：它的结尾 '\n}\n
            # 让我们用函数结尾是 setupImagePreviewToolbarAutoHide();\n}
            alt3 = 'setupImagePreviewToolbarAutoHide();\n}'
            idx_end = js.find(alt3, idx_oi)
        if idx_end == -1:
            print(f"{path}: 找不到旧代码结束位置")
            return
        idx_end += len(alt3 if alt3 != alt and alt3 else alt if idx_end != -1 else alt2)
    else:
        # 找到 setupImagePreviewClick 函数结束
        idx = idx_sipc
        brace = 0
        found_open = False
        while idx < len(js):
            if js[idx] == '{':
                brace += 1
                found_open = True
            elif js[idx] == '}':
                brace -= 1
                if found_open and brace == 0:
                    idx += 1
                    break
            idx += 1
        idx_end = idx

    # 替换
    # 找到前一个换行的位置
    start = js.rfind('\n', 0, idx_state)
    if start == -1:
        start = idx_state

    js_new = js[:start] + '\n' + NEW_PREVIEW_TIMER + js[idx_end:]

    with io.open(path, 'w', encoding='utf-8') as f:
        f.write(js_new)
    print(f"✓ {path} 已修复")

fix_file('gator-android/www/app.js')
fix_file('gator-electron/www/app.js')

print("\n=== 图片预览修复完成！")
print("现在图片预览已重写为安全的、干净的实现")
