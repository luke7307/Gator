import io

# ================ 修复：主页点击图片进入灵感详情 ================
# 用户要求：点击图片进入详情界面，而不是图片预览

# ================ ANDROID: app.js ================
with io.open('gator-android/www/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 移除图片区域点击打开预览的逻辑，恢复原来的点击行为
old_code = '''        content.addEventListener('click', (e) => {
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

new_code = '''        content.addEventListener('click', (e) => {
            // 如果点击的是导航按钮或圆点，让它们自己处理
            if (e.target.closest('.card-img-nav') || e.target.closest('.card-img-dots') || e.target.closest('.card-img-counter')) {
                return;
            }'''

js = js.replace(old_code, new_code)
print("✓ Android app.js: 移除图片预览逻辑")

with io.open('gator-android/www/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("✓ Android app.js updated")

# ================ ELECTRON: app.js ================
with io.open('gator-electron/www/app.js', 'r', encoding='utf-8') as f:
    e_js = f.read()

e_js = e_js.replace(old_code, new_code)
print("✓ Electron app.js: 移除图片预览逻辑")

with io.open('gator-electron/www/app.js', 'w', encoding='utf-8') as f:
    f.write(e_js)
print("✓ Electron app.js updated")

print("\n=== 修复完成 ===")
print("现在的逻辑：")
print("  - 点击卡片任意区域（包括图片）→ 进入灵感详情界面")
print("  - 点击导航按钮/圆点 → 轮播切换图片")
