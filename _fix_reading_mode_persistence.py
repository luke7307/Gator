import io

# ================ 修复：阅读模式持久化 ================
# 问题：readingMode 和 fullscreenReading 在页面刷新时重置为默认值
# 修复：初始化时从 localStorage 读取上次保存的状态

# ================ ANDROID: app.js ================
with io.open('gator-android/www/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 修改初始化部分，从 localStorage 读取状态
old_init = '''// ===== 灵感阅读模式 =====
let fullscreenReading = false;
let readingMode = 'normal'; // 'normal' 或 'note'

function openInspirationReadingMode() {'''

new_init = '''// ===== 灵感阅读模式 =====
// 从 localStorage 读取上次保存的阅读模式状态
let fullscreenReading = localStorage.getItem('gator_fullscreen_reading') === 'true';
let readingMode = localStorage.getItem('gator_reading_mode') || 'normal'; // 'normal' 或 'note'

function openInspirationReadingMode() {'''

js = js.replace(old_init, new_init)

# 还要在 toggleFullscreenReading 函数中保存 fullscreenReading 状态
old_toggle = '''function toggleFullscreenReading() {
    fullscreenReading = !fullscreenReading;'''

new_toggle = '''function toggleFullscreenReading() {
    fullscreenReading = !fullscreenReading;
    localStorage.setItem('gator_fullscreen_reading', fullscreenReading.toString());'''

js = js.replace(old_toggle, new_toggle)

with io.open('gator-android/www/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("✓ Android app.js: 添加阅读模式持久化")

# ================ ELECTRON: app.js ================
with io.open('gator-electron/www/app.js', 'r', encoding='utf-8') as f:
    e_js = f.read()

e_js = e_js.replace(old_init, new_init)
e_js = e_js.replace(old_toggle, new_toggle)

with io.open('gator-electron/www/app.js', 'w', encoding='utf-8') as f:
    f.write(e_js)
print("✓ Electron app.js: 添加阅读模式持久化")

print("\n=== 修复完成 ===")
print("现在阅读模式会自动保存到 localStorage，刷新页面后保持上次选择的状态")
