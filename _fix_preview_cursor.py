import io

# ================ ANDROID: index.html CSS changes ================
# File: gator-android/www/index.html
android_path = 'gator-android/www/index.html'

with io.open(android_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. note-img-container: cursor: pointer → cursor: zoom-in
old = '''        .note-img-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 20px;
            background: #f5f5f5;
            cursor: pointer;
            transition: box-shadow 0.3s ease;
            --note-img-width: 900px;
        }'''
new = '''        .note-img-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 20px;
            background: #f5f5f5;
            cursor: zoom-in;
            transition: box-shadow 0.3s ease;
            --note-img-width: 900px;
        }'''
assert old in html, "note-img-container CSS not found"
html = html.replace(old, new)

# 2. note-img-slider img: cursor: pointer → cursor: zoom-in
old2 = '''        .note-img-slider img {
            display: block;
            cursor: pointer;
            flex-shrink: 0;
            width: var(--note-img-width);
            max-height: 500px;
            object-fit: contain;
        }'''
new2 = '''        .note-img-slider img {
            display: block;
            cursor: zoom-in;
            flex-shrink: 0;
            width: var(--note-img-width);
            max-height: 500px;
            object-fit: contain;
        }'''
assert old2 in html, "note-img-slider img CSS not found"
html = html.replace(old2, new2)

# 3. Add cursor: pointer to note-img-counter and note-img-dots
# They already have positioning but no explicit cursor. Let me add it.
old3 = '''        .note-img-counter {
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
        }'''
new3 = '''        .note-img-counter {
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
            cursor: pointer;
        }'''
html = html.replace(old3, new3)

old4 = '''        .note-img-dots {
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
        }'''
new4 = '''        .note-img-dots {
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
            cursor: pointer;
        }'''
html = html.replace(old4, new4)

# 5. Also: card-image-wrap in feed cards - add cursor: zoom-in for images
# Find card-image-wrap CSS (at the <style> section near line 248)
old5 = '''        .card-image-wrap { position: relative; overflow: hidden; }'''
new5 = '''        .card-image-wrap { position: relative; overflow: hidden; cursor: zoom-in; }'''
html = html.replace(old5, new5)

# 6. card-img-slider img - if any cursor, make it zoom-in
# The inline styles use default cursor; add CSS rule to the style section
old6 = '''        .card-image-wrap:hover::after { background: rgba(0,0,0,0.2); }'''
new6 = '''        .card-image-wrap:hover::after { background: rgba(0,0,0,0.2); }
        .card-img-slider img { cursor: zoom-in; }'''
html = html.replace(old6, new6)

# 7. For imageFullscreenModal content images - add zoom-in cursor
# The images are dynamically inserted with style "cursor:pointer" inline - change in JS
# But also add CSS rule
old7 = '''        .note-img-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255,255,255,0.5);
            transition: background 0.2s, transform 0.2s;
            cursor: pointer;
        }'''
new7 = '''        .note-img-dot {
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
        }'''
# This already exists so just leave it - it already has cursor: pointer

with io.open(android_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("✓ Android index.html CSS updated")

# ================ ANDROID: app.js changes ================
with io.open('gator-android/www/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. In renderNoteImages - change "cursor:pointer" to "cursor:zoom-in" for img
old_js1 = '''slider.innerHTML = allImageUrls.map(url =>
            '<img src="' + url + '" decoding="async" data-action="preview" style="cursor:pointer;">'
        ).join('');'''
new_js1 = '''slider.innerHTML = allImageUrls.map(url =>
            '<img src="' + url + '" decoding="async" data-action="preview" style="cursor:zoom-in;">'
        ).join('');'''
if old_js1 in js:
    js = js.replace(old_js1, new_js1)
    print("✓ note images cursor updated")
else:
    print("⚠ note images not found, trying other pattern...")
    # Try alternative pattern
    alt1 = 'style="cursor:pointer;"'
    if alt1 in js:
        # Only change in renderNoteImages section - look at note-img context
        # For now just update cursor:pointer → cursor:zoom-in in note image related
        # But be careful not to affect all cursor:pointer usages
        # Safer: only update in the note fullscreen rendering
        pass

# 2. In imageFullscreen images - change "cursor:pointer" to "cursor:zoom-in"
old_js2 = '''imagesWrap.innerHTML = allImageUrls.map((url, idx) => {
            return `<img src="${url}" decoding="async" data-idx="${idx}" style="width:100%; max-width:800px; border-radius:16px; cursor:pointer; transition:box-shadow 0.2s ease;" onmouseover="this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'" onmouseout="this.style.boxShadow='none'">`;
        }).join('');'''
new_js2 = '''imagesWrap.innerHTML = allImageUrls.map((url, idx) => {
            return `<img src="${url}" decoding="async" data-idx="${idx}" style="width:100%; max-width:800px; border-radius:16px; cursor:zoom-in; transition:box-shadow 0.2s ease;" onmouseover="this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'" onmouseout="this.style.boxShadow='none'">`;
        }).join('');'''
if old_js2 in js:
    js = js.replace(old_js2, new_js2)
    print("✓ imageFullscreen images cursor updated")
else:
    print("⚠ imageFullscreen images pattern not found")

# 3. In detailContentPreview images - change cursor:pointer to cursor:zoom-in
old_js3 = '''        previewEl.querySelectorAll('img').forEach((imgEl, idx) => {
            imgEl.style.cursor = 'pointer';
            imgEl.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openImagePreview(imgEl.src, allOriginalUrls[idx] || null, allImageUrls, allOriginalUrls, idx, previewTitle, previewTime, previewBody);
            });
        });'''
new_js3 = '''        previewEl.querySelectorAll('img').forEach((imgEl, idx) => {
            imgEl.style.cursor = 'zoom-in';
            imgEl.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openImagePreview(imgEl.src, allOriginalUrls[idx] || null, allImageUrls, allOriginalUrls, idx, previewTitle, previewTime, previewBody);
            });
        });'''
if old_js3 in js:
    js = js.replace(old_js3, new_js3)
    print("✓ detailContentPreview images cursor updated")
else:
    print("⚠ detailContentPreview pattern not found")

# 4. Feed card images: clicking on card-image-wrap opens image preview directly
# Add click handler in bindCardEvents for card-image-wrap
# Looking at the existing code at line 1341: bindCardEvents function
# After line 1349 where it checks for imgWrap in startLP, we need to add a click handler

old_js4 = '''        content.addEventListener('click', (e) => {
            if (isLongPressing) { isLongPressing = false; return; }
            if (content.style.transform === 'translateX(-70px)') { closeSlidedCard(wrapper); return; }
            if (currentSlidedCard && currentSlidedCard !== wrapper) closeSlidedCard(currentSlidedCard);
            if (batchDeleteMode) {
                const id = wrapper.dataset.id;
                if (id) toggleBatchSelect(id);
                return;
            }
            if (batchPinMode) {
                const id = wrapper.dataset.id;
                if (id) togglePinFromBatch(id);
                return;
            }
            // 清除近期恢复标记
            clearRestoredBadge(wrapper.dataset.id);
            const id = wrapper.dataset.id;
            if (id) showDetailModal(id);
        });'''

new_js4 = '''        // 图片区域点击：直接打开图片预览（不进入详情/全屏详情）
        const imgWrap = wrapper.querySelector('.card-image-wrap');
        if (imgWrap) {
            imgWrap.addEventListener('click', (e) => {
                // 如果点击的是导航按钮或圆点，不触发预览（按钮自己有onclick）
                if (e.target.closest('.card-img-nav') || e.target.closest('.card-img-dots') || e.target.closest('.card-img-counter')) {
                    return;
                }
                if (isLongPressing) { isLongPressing = false; return; }
                e.preventDefault();
                e.stopPropagation();
                const cardId = wrapper.dataset.id;
                if (!cardId) return;
                const cardEl = document.getElementById('card-' + cardId);
                const currentIdx = parseInt(cardEl ? (cardEl.dataset.imgIdx || '0') : '0');
                cardImageOpenPreview(cardId, currentIdx);
            });
        }
        content.addEventListener('click', (e) => {
            // 点击图片区域不触发详情打开
            if (e.target.closest('.card-image-wrap')) return;
            if (isLongPressing) { isLongPressing = false; return; }
            if (content.style.transform === 'translateX(-70px)') { closeSlidedCard(wrapper); return; }
            if (currentSlidedCard && currentSlidedCard !== wrapper) closeSlidedCard(currentSlidedCard);
            if (batchDeleteMode) {
                const id = wrapper.dataset.id;
                if (id) toggleBatchSelect(id);
                return;
            }
            if (batchPinMode) {
                const id = wrapper.dataset.id;
                if (id) togglePinFromBatch(id);
                return;
            }
            // 清除近期恢复标记
            clearRestoredBadge(wrapper.dataset.id);
            const id = wrapper.dataset.id;
            if (id) showDetailModal(id);
        });'''

if old_js4 in js:
    js = js.replace(old_js4, new_js4)
    print("✓ Feed card image click handler added")
else:
    print("⚠ bindCardEvents content.click pattern not found")

with io.open('gator-android/www/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("✓ Android app.js updated")

# ================ ELECTRON: Sync HTML and JS ================
# Sync CSS changes to Electron - same approach
with io.open('gator-electron/www/index.html', 'r', encoding='utf-8') as f:
    e_html = f.read()

# Same CSS changes as Android
e_html = e_html.replace('''        .note-img-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 20px;
            background: #f5f5f5;
            cursor: pointer;
            transition: box-shadow 0.3s ease;
            --note-img-width: 900px;
        }''', '''        .note-img-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 20px;
            background: #f5f5f5;
            cursor: zoom-in;
            transition: box-shadow 0.3s ease;
            --note-img-width: 900px;
        }''')

e_html = e_html.replace('''        .note-img-slider img {
            display: block;
            cursor: pointer;
            flex-shrink: 0;
            width: var(--note-img-width);
            max-height: 500px;
            object-fit: contain;
        }''', '''        .note-img-slider img {
            display: block;
            cursor: zoom-in;
            flex-shrink: 0;
            width: var(--note-img-width);
            max-height: 500px;
            object-fit: contain;
        }''')

e_html = e_html.replace('''        .note-img-counter {
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
        }''', '''        .note-img-counter {
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
            cursor: pointer;
        }''')

e_html = e_html.replace('''        .note-img-dots {
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
        }''', '''        .note-img-dots {
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
            cursor: pointer;
        }''')

e_html = e_html.replace('''        .card-image-wrap { position: relative; overflow: hidden; }''',
        '''        .card-image-wrap { position: relative; overflow: hidden; cursor: zoom-in; }''')

e_html = e_html.replace('''        .card-image-wrap:hover::after { background: rgba(0,0,0,0.2); }''',
        '''        .card-image-wrap:hover::after { background: rgba(0,0,0,0.2); }
        .card-img-slider img { cursor: zoom-in; }''')

with io.open('gator-electron/www/index.html', 'w', encoding='utf-8') as f:
    f.write(e_html)
print("✓ Electron index.html CSS updated")

# Sync JS changes to Electron
with io.open('gator-electron/www/app.js', 'r', encoding='utf-8') as f:
    e_js = f.read()

# Same JS changes as Android
# 1. note images
e_js = e_js.replace('''slider.innerHTML = allImageUrls.map(url =>
            '<img src="' + url + '" decoding="async" data-action="preview" style="cursor:pointer;">'
        ).join('');''', '''slider.innerHTML = allImageUrls.map(url =>
            '<img src="' + url + '" decoding="async" data-action="preview" style="cursor:zoom-in;">'
        ).join('');''')

# 2. imageFullscreen images
e_js = e_js.replace('''imagesWrap.innerHTML = allImageUrls.map((url, idx) => {
            return `<img src="${url}" decoding="async" data-idx="${idx}" style="width:100%; max-width:800px; border-radius:16px; cursor:pointer; transition:box-shadow 0.2s ease;" onmouseover="this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'" onmouseout="this.style.boxShadow='none'">`;
        }).join('');''', '''imagesWrap.innerHTML = allImageUrls.map((url, idx) => {
            return `<img src="${url}" decoding="async" data-idx="${idx}" style="width:100%; max-width:800px; border-radius:16px; cursor:zoom-in; transition:box-shadow 0.2s ease;" onmouseover="this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'" onmouseout="this.style.boxShadow='none'">`;
        }).join('');''')

# 3. detailContentPreview images
e_js = e_js.replace('''imgEl.style.cursor = 'pointer';
            imgEl.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openImagePreview(imgEl.src, allOriginalUrls[idx] || null, allImageUrls, allOriginalUrls, idx, previewTitle, previewTime, previewBody);
            });''', '''imgEl.style.cursor = 'zoom-in';
            imgEl.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openImagePreview(imgEl.src, allOriginalUrls[idx] || null, allImageUrls, allOriginalUrls, idx, previewTitle, previewTime, previewBody);
            });''')

# 4. Feed card image click handler - same as Android
e_js = e_js.replace('''        content.addEventListener('click', (e) => {
            if (isLongPressing) { isLongPressing = false; return; }
            if (content.style.transform === 'translateX(-70px)') { closeSlidedCard(wrapper); return; }
            if (currentSlidedCard && currentSlidedCard !== wrapper) closeSlidedCard(currentSlidedCard);
            if (batchDeleteMode) {
                const id = wrapper.dataset.id;
                if (id) toggleBatchSelect(id);
                return;
            }
            if (batchPinMode) {
                const id = wrapper.dataset.id;
                if (id) togglePinFromBatch(id);
                return;
            }
            // 清除近期恢复标记
            clearRestoredBadge(wrapper.dataset.id);
            const id = wrapper.dataset.id;
            if (id) showDetailModal(id);
        });''', '''        // 图片区域点击：直接打开图片预览（不进入详情/全屏详情）
        const imgWrap = wrapper.querySelector('.card-image-wrap');
        if (imgWrap) {
            imgWrap.addEventListener('click', (e) => {
                // 如果点击的是导航按钮或圆点，不触发预览（按钮自己有onclick）
                if (e.target.closest('.card-img-nav') || e.target.closest('.card-img-dots') || e.target.closest('.card-img-counter')) {
                    return;
                }
                if (isLongPressing) { isLongPressing = false; return; }
                e.preventDefault();
                e.stopPropagation();
                const cardId = wrapper.dataset.id;
                if (!cardId) return;
                const cardEl = document.getElementById('card-' + cardId);
                const currentIdx = parseInt(cardEl ? (cardEl.dataset.imgIdx || '0') : '0');
                cardImageOpenPreview(cardId, currentIdx);
            });
        }
        content.addEventListener('click', (e) => {
            // 点击图片区域不触发详情打开
            if (e.target.closest('.card-image-wrap')) return;
            if (isLongPressing) { isLongPressing = false; return; }
            if (content.style.transform === 'translateX(-70px)') { closeSlidedCard(wrapper); return; }
            if (currentSlidedCard && currentSlidedCard !== wrapper) closeSlidedCard(currentSlidedCard);
            if (batchDeleteMode) {
                const id = wrapper.dataset.id;
                if (id) toggleBatchSelect(id);
                return;
            }
            if (batchPinMode) {
                const id = wrapper.dataset.id;
                if (id) togglePinFromBatch(id);
                return;
            }
            // 清除近期恢复标记
            clearRestoredBadge(wrapper.dataset.id);
            const id = wrapper.dataset.id;
            if (id) showDetailModal(id);
        });''')

with io.open('gator-electron/www/app.js', 'w', encoding='utf-8') as f:
    f.write(e_js)
print("✓ Electron app.js updated")

print("\n=== 所有修改完成 ===")
