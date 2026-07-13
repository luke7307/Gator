import io

# ================ 问题1: 右箭头在最后一张时不消失 ================
# 修改 noteSlideTo 函数，当在最后一张时隐藏右箭头，第一张时隐藏左箭头

# ================ 问题2: 返回/编辑按钮3档画风 ================
# 需要添加 JS 逻辑 + CSS 样式：
# a. hover在图片上或移动鼠标：灰色（正常状态）
# b. 3秒不操作：浅灰色
# c. hover在按钮上：深灰色

# ================ ANDROID: index.html ================
android_path = 'gator-android/www/index.html'

with io.open(android_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. 修改返回/编辑按钮的CSS，添加浅灰色状态
# 添加 .note-img-action-btn.faded 类
old_css = '''        .note-img-action-btn:hover {
            background: rgba(0,0,0,0.65);
        }
        .note-img-action-btn.note-img-action-prev {
            top: 12px;
            left: 12px;
        }
        .note-img-action-btn.note-img-action-edit {
            bottom: 12px;
            right: 12px;
        }'''

new_css = '''        .note-img-action-btn:hover {
            background: rgba(0,0,0,0.65);
        }
        .note-img-action-btn.faded {
            background: rgba(0,0,0,0.25);
        }
        .note-img-action-btn.faded:hover {
            background: rgba(0,0,0,0.65);
        }
        .note-img-action-btn.note-img-action-prev {
            top: 12px;
            left: 12px;
        }
        .note-img-action-btn.note-img-action-edit {
            bottom: 12px;
            right: 12px;
        }'''

html = html.replace(old_css, new_css)

with io.open(android_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("✓ Android index.html CSS updated")

# ================ ANDROID: app.js ================
with io.open('gator-android/www/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. 修改 noteSlideTo 函数，当在最后一张时隐藏右箭头，第一张时隐藏左箭头
old_slide_to = '''        // 更新导航按钮
        if (prevBtn) prevBtn.classList.toggle('dimmed', idx === 0);
        if (nextBtn) nextBtn.classList.toggle('dimmed', idx === allImageUrls.length - 1);
    }'''

new_slide_to = '''        // 更新导航按钮：第一张隐藏左箭头，最后一张隐藏右箭头
        if (prevBtn) prevBtn.style.display = idx === 0 ? 'none' : 'flex';
        if (nextBtn) nextBtn.style.display = idx === allImageUrls.length - 1 ? 'none' : 'flex';
    }'''

js = js.replace(old_slide_to, new_slide_to)
print("✓ noteSlideTo updated")

# 2. 添加返回/编辑按钮的3档画风逻辑
# 在 showNoteFullscreenDetail 函数中添加鼠标移动监听和定时器逻辑

# 找到 showNoteFullscreenDetail 函数结束的位置（before 触摸滑动逻辑）
old_end = '''    // 触摸滑动切换（左右滑动）
    let touchStartX = 0;
    if (wrap) {
        wrap.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });'''

new_end = '''    // 返回/编辑按钮3档画风逻辑
    let idleTimer = null;
    const actionBtns = document.querySelectorAll('.note-img-action-btn');
    
    function resetActionBtnState() {
        actionBtns.forEach(btn => btn.classList.remove('faded'));
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            actionBtns.forEach(btn => btn.classList.add('faded'));
        }, 3000);
    }
    
    function clearIdleTimer() {
        if (idleTimer) {
            clearTimeout(idleTimer);
            idleTimer = null;
        }
    }
    
    // 鼠标在图片区域移动时重置状态
    if (wrap) {
        wrap.addEventListener('mousemove', function() {
            resetActionBtnState();
        });
        
        // 鼠标离开图片区域后开始计时
        wrap.addEventListener('mouseleave', function() {
            idleTimer = setTimeout(() => {
                actionBtns.forEach(btn => btn.classList.add('faded'));
            }, 3000);
        });
    }
    
    // 按钮hover时清除计时并恢复正常状态
    actionBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            clearIdleTimer();
            this.classList.remove('faded');
        });
        btn.addEventListener('mouseleave', function() {
            // 鼠标离开按钮后开始计时
            idleTimer = setTimeout(() => {
                actionBtns.forEach(b => b.classList.add('faded'));
            }, 3000);
        });
    });
    
    // 初始状态：3秒后变浅灰色
    resetActionBtnState();

    // 触摸滑动切换（左右滑动）
    let touchStartX = 0;
    if (wrap) {
        wrap.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });'''

js = js.replace(old_end, new_end)
print("✓ Action button 3-state logic added")

with io.open('gator-android/www/app.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("✓ Android app.js updated")

# ================ ELECTRON: Sync ================
# 1. CSS
with io.open('gator-electron/www/index.html', 'r', encoding='utf-8') as f:
    e_html = f.read()

e_html = e_html.replace('''        .note-img-action-btn:hover {
            background: rgba(0,0,0,0.65);
        }
        .note-img-action-btn.note-img-action-prev {
            top: 12px;
            left: 12px;
        }
        .note-img-action-btn.note-img-action-edit {
            bottom: 12px;
            right: 12px;
        }''', '''        .note-img-action-btn:hover {
            background: rgba(0,0,0,0.65);
        }
        .note-img-action-btn.faded {
            background: rgba(0,0,0,0.25);
        }
        .note-img-action-btn.faded:hover {
            background: rgba(0,0,0,0.65);
        }
        .note-img-action-btn.note-img-action-prev {
            top: 12px;
            left: 12px;
        }
        .note-img-action-btn.note-img-action-edit {
            bottom: 12px;
            right: 12px;
        }''')

with io.open('gator-electron/www/index.html', 'w', encoding='utf-8') as f:
    f.write(e_html)
print("✓ Electron index.html CSS updated")

# 2. JS
with io.open('gator-electron/www/app.js', 'r', encoding='utf-8') as f:
    e_js = f.read()

e_js = e_js.replace('''        // 更新导航按钮
        if (prevBtn) prevBtn.classList.toggle('dimmed', idx === 0);
        if (nextBtn) nextBtn.classList.toggle('dimmed', idx === allImageUrls.length - 1);
    }''', '''        // 更新导航按钮：第一张隐藏左箭头，最后一张隐藏右箭头
        if (prevBtn) prevBtn.style.display = idx === 0 ? 'none' : 'flex';
        if (nextBtn) nextBtn.style.display = idx === allImageUrls.length - 1 ? 'none' : 'flex';
    }''')

e_js = e_js.replace('''    // 触摸滑动切换（左右滑动）
    let touchStartX = 0;
    if (wrap) {
        wrap.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });''', '''    // 返回/编辑按钮3档画风逻辑
    let idleTimer = null;
    const actionBtns = document.querySelectorAll('.note-img-action-btn');
    
    function resetActionBtnState() {
        actionBtns.forEach(btn => btn.classList.remove('faded'));
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            actionBtns.forEach(btn => btn.classList.add('faded'));
        }, 3000);
    }
    
    function clearIdleTimer() {
        if (idleTimer) {
            clearTimeout(idleTimer);
            idleTimer = null;
        }
    }
    
    // 鼠标在图片区域移动时重置状态
    if (wrap) {
        wrap.addEventListener('mousemove', function() {
            resetActionBtnState();
        });
        
        // 鼠标离开图片区域后开始计时
        wrap.addEventListener('mouseleave', function() {
            idleTimer = setTimeout(() => {
                actionBtns.forEach(btn => btn.classList.add('faded'));
            }, 3000);
        });
    }
    
    // 按钮hover时清除计时并恢复正常状态
    actionBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            clearIdleTimer();
            this.classList.remove('faded');
        });
        btn.addEventListener('mouseleave', function() {
            // 鼠标离开按钮后开始计时
            idleTimer = setTimeout(() => {
                actionBtns.forEach(b => b.classList.add('faded'));
            }, 3000);
        });
    });
    
    // 初始状态：3秒后变浅灰色
    resetActionBtnState();

    // 触摸滑动切换（左右滑动）
    let touchStartX = 0;
    if (wrap) {
        wrap.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });''')

with io.open('gator-electron/www/app.js', 'w', encoding='utf-8') as f:
    f.write(e_js)
print("✓ Electron app.js updated")

print("\n=== 所有修改完成 ===")
