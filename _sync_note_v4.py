import io

# 同步 CSS variable 到两个平台
for path in ['gator-electron/www/index.html', 'gator-android/www/index.html']:
    with io.open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 给 .note-img-container 添加 CSS variable
    old_container = '''        .note-img-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 20px;
            background: #f5f5f5;
            cursor: pointer;
            transition: box-shadow 0.3s ease;
        }
        .note-img-slider img {
            display: block;
            cursor: pointer;
            flex-shrink: 0;
        }'''

    new_container = '''        .note-img-container {
            position: relative;
            width: 100%;
            overflow: hidden;
            border-radius: 20px;
            background: #f5f5f5;
            cursor: pointer;
            transition: box-shadow 0.3s ease;
            --note-img-width: 900px;
        }
        .note-img-slider img {
            display: block;
            cursor: pointer;
            flex-shrink: 0;
            width: var(--note-img-width);
            max-height: 500px;
            object-fit: contain;
        }'''

    if old_container in html:
        html = html.replace(old_container, new_container)
        print(f"✓ {path} CSS variable 已添加")
    elif '--note-img-width' in html:
        print(f"✓ {path} 已有 CSS variable")
    else:
        print(f"⚠ {path} 未找到匹配的 CSS block")

    with io.open(path, 'w', encoding='utf-8') as f:
        f.write(html)

# 更新 JS：renderNoteImages 中设置 CSS variable
for path in ['gator-android/www/app.js', 'gator-electron/www/app.js']:
    with io.open(path, 'r', encoding='utf-8') as f:
        js = f.read()

    # 在 renderNoteImages 中添加 CSS variable 设置
    old_render = '''        function renderNoteImages() {
            slider.innerHTML = allImageUrls.map(url =>
                `<img src="${url}" decoding="async" style="cursor:pointer;">`
            ).join('');'''

    new_render = '''        function renderNoteImages() {
            const wrapWidth = wrap.offsetWidth;
            if (wrapWidth > 0) {
                wrap.style.setProperty('--note-img-width', wrapWidth + 'px');
            }
            slider.innerHTML = allImageUrls.map(url =>
                `<img src="${url}" decoding="async" style="cursor:pointer;">`
            ).join('');'''

    if old_render in js:
        js = js.replace(old_render, new_render)
        print(f"✓ {path} renderNoteImages 已更新")
    elif '--note-img-width' in js:
        print(f"✓ {path} 已有 renderNoteImages 更新")
    else:
        print(f"⚠ {path} renderNoteImages 未找到")

    with io.open(path, 'w', encoding='utf-8') as f:
        f.write(js)

print("\n=== 完成 ===")
