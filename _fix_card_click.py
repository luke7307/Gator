import io

# ================ 修复：feed卡片点击逻辑 ================
# 问题：之前的修改阻止了卡片点击进入详情，导致全屏note/图文模式无法进入
# 修复：点击图片区域打开图片预览，点击其他区域（标题等）进入详情

# ================ ANDROID: app.js ================
with io.open('gator-android/www/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. 移除之前添加的imgWrap点击监听器
old_img_click = '''        // 图片区域点击：直接打开图片预览（不进入详情/全屏详情）
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
            if (e.target.closest('.card-image-wrap')) return;'''

# 恢复原来的content点击处理，但保留图片区域点击打开预览的逻辑
new_img_click = '''        content.addEventListener('click', (e) => {
            // 如果点击的是导航按钮或圆点，让它们自己处理
            if (e.target.closest('.card-img-nav') || e.target.closest('.card-img-dots') || e.target.closest('.card-img-counter')) {
                return;
            }
            
            // 点击图片区域 → 打开图片预览
            const imgWrap = e.target.closest('.card-image-wrap');
            if (imgWrap) {
                if (isLongPressing) { isLongPressing = false; return; }
                e.preventDefault();
                e.stopPropagation();
                const cardId = wrapper.dataset.id;
                if (!cardId) return;
                const cardEl = document.getElementById('card-' + cardId);
                const currentIdx = parseInt(cardEl ? (cardEl.dataset.imgIdx || '0') : '0');
                cardImageOpenPreview(cardId, currentIdx);
                return;
            }'''

js = js.replace(old_img_click, new_img_click)
print("✓ Android app.js: 修复feed卡片点击逻辑")

with io.open('gator-android/www/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("✓ Android app.js updated")

# ================ ELECTRON: app.js ================
with io.open('gator-electron/www/app.js', 'r', encoding='utf-8') as f:
    e_js = f.read()

e_js = e_js.replace(old_img_click, new_img_click)
print("✓ Electron app.js: 修复feed卡片点击逻辑")

with io.open('gator-electron/www/app.js', 'w', encoding='utf-8') as f:
    f.write(e_js)
print("✓ Electron app.js updated")

print("\n=== 修复完成 ===")
print("现在的逻辑：")
print("  - 点击卡片图片区域 → 打开图片预览")
print("  - 点击卡片其他区域（标题/标签等）→ 进入详情，可选择进入全屏note/图文模式")
