import io

# ================ 修复JavaScript代码适配新HTML结构 ================

# ================ ANDROID: app.js ================
android_path = 'gator-android/www/app.js'

with io.open(android_path, 'r', encoding='utf-8') as f:
    js = f.read()

# 修复 updateReadingModeUI 函数
old_ui_func = '''function updateReadingModeUI() {
    const normalBtn = document.getElementById('normalModeBtn');
    const noteBtn = document.getElementById('noteModeBtn');
    const normalCheck = document.getElementById('normalModeCheck');
    const noteCheck = document.getElementById('noteModeCheck');
    
    if (readingMode === 'normal') {
        normalBtn.style.borderColor = 'var(--theme-primary, #3B82F6)';
        normalBtn.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
        normalCheck.style.backgroundColor = 'var(--theme-primary, #3B82F6)';
        normalCheck.style.borderColor = 'var(--theme-primary, #3B82F6)';
        normalCheck.querySelector('svg').style.opacity = '1';
        
        noteBtn.style.borderColor = '#e5e7eb';
        noteBtn.style.backgroundColor = 'transparent';
        noteCheck.style.backgroundColor = 'transparent';
        noteCheck.style.borderColor = '#d1d5db';
        noteCheck.querySelector('svg').style.opacity = '0';
    } else {
        noteBtn.style.borderColor = '#ec4899';
        noteBtn.style.backgroundColor = 'rgba(236, 72, 153, 0.05)';
        noteCheck.style.backgroundColor = '#ec4899';
        noteCheck.style.borderColor = '#ec4899';
        noteCheck.querySelector('svg').style.opacity = '1';
        
        normalBtn.style.borderColor = '#e5e7eb';
        normalBtn.style.backgroundColor = 'transparent';
        normalCheck.style.backgroundColor = 'transparent';
        normalCheck.style.borderColor = '#d1d5db';
        normalCheck.querySelector('svg').style.opacity = '0';
    }
}'''

new_ui_func = '''function updateReadingModeUI() {
    const normalBtn = document.getElementById('normalModeBtn');
    const noteBtn = document.getElementById('noteModeBtn');
    const normalCheck = document.getElementById('normalModeCheck');
    const noteCheck = document.getElementById('noteModeCheck');
    
    if (readingMode === 'normal') {
        // 图文模式选中 - 蓝色高亮
        normalBtn.classList.add('normal-active');
        normalBtn.classList.remove('note-active');
        normalCheck.classList.add('active');
        normalCheck.classList.remove('note-active');
        
        // Note模式未选中
        noteBtn.classList.remove('normal-active', 'note-active');
        noteCheck.classList.remove('active', 'note-active');
    } else {
        // Note模式选中 - 粉色高亮
        noteBtn.classList.add('note-active');
        noteBtn.classList.remove('normal-active');
        noteCheck.classList.add('note-active');
        noteCheck.classList.remove('active');
        
        // 图文模式未选中
        normalBtn.classList.remove('normal-active', 'note-active');
        normalCheck.classList.remove('active', 'note-active');
    }
}'''

js = js.replace(old_ui_func, new_ui_func)

# 修复 updateFullscreenReadingSwitchUI 函数（白点位置）
old_switch_func = '''function updateFullscreenReadingSwitchUI() {
    const sw = document.getElementById('fullscreenReadingSwitch');
    const dot = document.getElementById('fullscreenReadingDot');
    if (!sw || !dot) return;
    if (fullscreenReading) {
        sw.style.background = 'var(--theme-primary, #3B82F6)';
        dot.style.transform = 'translateX(26px)';
    } else {
        sw.style.background = '#e5e7eb';
        dot.style.transform = 'translateX(0)';
    }
}'''

new_switch_func = '''function updateFullscreenReadingSwitchUI() {
    const sw = document.getElementById('fullscreenReadingSwitch');
    const dot = document.getElementById('fullscreenReadingDot');
    if (!sw || !dot) return;
    if (fullscreenReading) {
        sw.style.background = 'var(--theme-primary, #3B82F6)';
        dot.style.transform = 'translateX(24px)'; // 白点内缩2px，所以移动24px
    } else {
        sw.style.background = '#e5e7eb';
        dot.style.transform = 'translateX(0)';
    }
}'''

js = js.replace(old_switch_func, new_switch_func)

with io.open(android_path, 'w', encoding='utf-8') as f:
    f.write(js)
print("✓ Android app.js updated")

# ================ ELECTRON: app.js ================
elec_path = 'gator-electron/www/app.js'

with io.open(elec_path, 'r', encoding='utf-8') as f:
    e_js = f.read()

e_js = e_js.replace(old_ui_func, new_ui_func)
e_js = e_js.replace(old_switch_func, new_switch_func)

with io.open(elec_path, 'w', encoding='utf-8') as f:
    f.write(e_js)
print("✓ Electron app.js updated")

print("\n=== 修复完成 ===")
print("问题：JavaScript代码尝试访问已移除的SVG元素导致报错")
print("修复：改用CSS类来控制选中状态，不再依赖SVG元素")