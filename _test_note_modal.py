"""在浏览器中测试 note 模式布局和 hover 效果"""
from playwright.sync_api import sync_playwright
import time, os

OUTPUT_DIR = "/Users/zhukai/Desktop/Gator-项目文件夹_06112/_screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1000, 'height': 800})
    page.goto("file:///Users/zhukai/Desktop/Gator-项目文件夹_06112/gator-android/www/index.html")
    time.sleep(2.0)

    # 直接注入 showNoteFullscreenDetail 的测试 - 使用参数传递
    result = page.evaluate("""() => {
        const img1 = 'https://placehold.co/600x400/6366F1/FFFFFF/png?text=图片1';
        const img2 = 'https://placehold.co/600x400/EF4444/FFFFFF/png?text=图片2';
        const img3 = 'https://placehold.co/600x400/22C55E/FFFFFF/png?text=图片3';
        const testItem = {
            id: 'test-note-1',
            title: '📸 多图卡片测试',
            type: '灵感',
            content: '这是测试多图卡片 hover 效果的示例，包含 3 张图片。\\n![](' + img1 + ')\\n![](' + img2 + ')\\n![](' + img3 + ')\\n这是正文内容。',
            updatedAt: '2026-06-13T02:03:00',
            createdAt: '2026-06-13T02:03:00'
        };
        showNoteFullscreenDetail(testItem);
        return 'opened';
    }""")
    print(f"弹窗打开: {result}")
    time.sleep(1.0)

    # 截图 1: 初始状态
    page.screenshot(path=os.path.join(OUTPUT_DIR, '1_note_initial.png'))
    print("截图 1 (初始) 已保存")

    # 截图 2: hover 在图片上
    wrap_loc = page.locator("#note-img-wrap")
    if wrap_loc.count() > 0:
        wrap_loc.hover(force=True)
        time.sleep(0.6)
        page.screenshot(path=os.path.join(OUTPUT_DIR, '2_note_hover.png'))
        print("截图 2 (hover 图片) 已保存")

    # 截图 3: 点击右箭头
    next_btn = page.locator("#note-img-nav-next")
    if next_btn.count() > 0:
        next_btn.click(force=True)
        time.sleep(0.8)
        wrap_loc.hover(force=True)
        page.screenshot(path=os.path.join(OUTPUT_DIR, '3_note_click_next.png'))
        print("截图 3 (点击右箭头) 已保存")

    # 截图 4: 点击圆点
    dots = page.locator("#note-img-dots .note-img-dot")
    if dots.count() > 0:
        dots.nth(0).click(force=True)
        time.sleep(0.8)
        wrap_loc.hover(force=True)
        page.screenshot(path=os.path.join(OUTPUT_DIR, '4_note_dot_click.png'))
        print("截图 4 (点击圆点) 已保存")

    # ====== 验证 ======
    # 1. 布局验证
    layout = page.evaluate("""() => {
        const wrap = document.getElementById('note-img-wrap');
        const emoji = document.getElementById('noteFullscreenEmoji');
        const title = document.getElementById('noteFullscreenTitle');
        const type2 = document.getElementById('noteFullscreenType2');
        const time2 = document.getElementById('noteFullscreenTime2');
        const body = document.getElementById('noteFullscreenContent');
        const wrapRect = wrap ? wrap.getBoundingClientRect() : null;
        const emojiRect = emoji ? emoji.getBoundingClientRect() : null;
        const typeRect = type2 ? type2.getBoundingClientRect() : null;
        const bodyRect = body ? body.getBoundingClientRect() : null;
        return {
            '图片区底部 y': wrapRect ? Math.round(wrapRect.bottom) : 'n/a',
            'emoji 顶部 y': emojiRect ? Math.round(emojiRect.top) : 'n/a',
            'tag 顶部 y': typeRect ? Math.round(typeRect.top) : 'n/a',
            '正文 顶部 y': bodyRect ? Math.round(bodyRect.top) : 'n/a',
            'emoji在图片下方': (emojiRect && wrapRect) ? (emojiRect.top > wrapRect.bottom) : 'n/a',
            '标题内容': title ? title.textContent.trim() : '',
            'emoji内容': emoji ? emoji.textContent.trim() : '',
            'tag内容': type2 ? type2.textContent.trim() : '',
            '时间内容': time2 ? time2.textContent.trim() : '',
        };
    }""")
    print("\n=== 布局验证 ===")
    for k, v in layout.items():
        print(f"  {k}: {v}")

    # 2. CSS 属性验证
    css_check = page.evaluate("""() => {
        const wrap = document.getElementById('note-img-wrap');
        const prev = document.getElementById('note-img-nav-prev');
        const next = document.getElementById('note-img-nav-next');
        const counter = document.getElementById('note-img-counter');
        const dots_container = document.getElementById('note-img-dots');
        function op(el) { return el ? window.getComputedStyle(el).opacity : null; }
        // 检查 hover 状态（前一步执行了 hover）
        return {
            'wrap box-shadow': wrap ? window.getComputedStyle(wrap).boxShadow : 'n/a',
            'wrap cursor': wrap ? window.getComputedStyle(wrap).cursor : 'n/a',
            'wrap border-radius': wrap ? window.getComputedStyle(wrap).borderRadius : 'n/a',
            'prev opacity': op(prev),
            'next opacity': op(next),
            'counter opacity': op(counter),
            'dots opacity': op(dots_container),
            'prev translateX': prev ? window.getComputedStyle(prev).transform : 'n/a',
            'img count': document.querySelectorAll('#note-img-slider img').length,
            'dot count': document.querySelectorAll('#note-img-dots .note-img-dot').length,
        };
    }""")
    print("\n=== CSS 属性 (hover 后) ===")
    for k, v in css_check.items():
        print(f"  {k}: {v}")

    # 3. 测试: 手动 hover 并检查效果
    hover_check = page.evaluate("""() => {
        // 模拟 hover
        const wrap = document.getElementById('note-img-wrap');
        const prev = document.getElementById('note-img-nav-prev');
        const next = document.getElementById('note-img-nav-next');
        const counter = document.getElementById('note-img-counter');
        const dots = document.getElementById('note-img-dots');

        // 先检查 ::after 是否存在
        const afterContent = window.getComputedStyle(wrap, '::after').content;
        const afterBackground = window.getComputedStyle(wrap, '::after').background;
        const afterZindex = window.getComputedStyle(wrap, '::after').zIndex;

        // hover 后手动用 js 检查 transform
        function hasTransform(el) {
            if (!el) return false;
            const t = window.getComputedStyle(el).transform;
            return t && t !== 'none';
        }
        return {
            '::after content': afterContent,
            '::after bg': afterBackground,
            '::after z-index': afterZindex,
            'prev has transform': hasTransform(prev),
            'prev transform actual': prev ? window.getComputedStyle(prev).transform : 'n/a',
            'counter text': counter ? counter.textContent.trim() : 'n/a',
        };
    }""")
    print("\n=== Hover 效果 ===")
    for k, v in hover_check.items():
        print(f"  {k}: {v}")

    browser.close()

print(f"\n=== 完成 截图在 {OUTPUT_DIR} ===")
