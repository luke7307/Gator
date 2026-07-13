import io, re

with io.open('gator-android/www/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("=== Android HTML 结构验证 ===")
checks = {
    'noteFullscreenModal': 'noteFullscreenModal' in html,
    'noteFullscreenEmoji': 'noteFullscreenEmoji' in html,
    'noteFullscreenTitle': 'noteFullscreenTitle' in html,
    'noteFullscreenType2': 'noteFullscreenType2' in html,
    'noteFullscreenTime2': 'noteFullscreenTime2' in html,
    'note-img-wrap': 'note-img-wrap' in html,
    'note-img-slider': 'note-img-slider' in html,
    'note-img-nav-prev': 'note-img-nav-prev' in html,
    'note-img-counter': 'note-img-counter' in html,
    'note-img-dots': 'note-img-dots' in html,
    'CSS hover shadow': '#note-img-wrap:hover' in html,
    'CSS ::after overlay': 'note-img-wrap::after' in html,
    'CSS .note-img-dot.active': '.note-img-dot.active' in html,
}
for k, v in checks.items():
    print(f"  [{'OK' if v else 'XX'}] {k}")

# 检查旧顶部栏是否被移除
old_top = '<h3 id="noteFullscreenTitle" class="text-[16px] font-semibold text-gray-900 truncate">'
pos1 = html.find(old_top)
print(f"\n旧头部栏 (第一个 noteFullscreenTitle): {'被保留（顶部栏）' if pos1 > 0 else '不存在'}")

# 显示 note 模式完整块前 50 行
print("\n=== note 模式 HTML 块 ===")
ns = html.find('<div id="noteFullscreenModal"')
ne = html.find('<!-- 图文模式', ns)
block = html[ns:ne]
lines = block.split('\n')
for i, l in enumerate(lines[:25]):
    print(f"  {i+1:3d} {l.strip()[:80]}")
print(f"  ... (共 {len(lines)} 行)")

# 检查 CSS
print("\n=== note 模式 CSS ===")
css_start = html.find('/* note 模式图片轮播 hover')
if css_start > 0:
    css_end = html.find('</style>', css_start)
    css_block = html[css_start:css_end]
    lines_css = css_block.split('\n')
    for l in lines_css[:30]:
        print(f"  {l.strip()[:90]}")
else:
    print("  (note 模式 CSS 未找到)")

with io.open('gator-electron/www/index.html', 'r', encoding='utf-8') as f:
    e_html = f.read()

print("\n=== Electron 同步验证 ===")
for key in ['noteFullscreenModal', 'noteFullscreenEmoji', 'noteFullscreenType2', 'noteFullscreenTime2', 'note-img-wrap', 'note-img-nav-prev']:
    print(f"  [{'OK' if key in e_html else 'XX'}] {key}")
print(f"  [{'OK' if '#note-img-wrap:hover' in e_html else 'XX'}] CSS hover shadow")
print(f"  [{'OK' if 'note-img-wrap::after' in e_html else 'XX'}] CSS ::after overlay")

# JS 验证
print("\n=== JS showNoteFullscreenDetail 验证 ===")
for jspath in ['gator-android/www/app.js', 'gator-electron/www/app.js']:
    with io.open(jspath, 'r', encoding='utf-8') as f:
        js = f.read()
    fs = js.find('function showNoteFullscreenDetail(item)')
    fe = js.find('function closeNoteFullscreenModal()', fs)
    if fs > 0 and fe > fs:
        func_text = js[fs:fe]
        checks = {
            'emoji': 'noteFullscreenEmoji' in func_text,
            'title': 'noteFullscreenTitle' in func_text,
            'type2': 'noteFullscreenType2' in func_text,
            'time2': 'noteFullscreenTime2' in func_text,
            'img-slider': 'note-img-slider' in func_text,
            'dots': 'note-img-dots' in func_text,
            'prev-btn': 'note-img-nav-prev' in func_text,
            'counter': 'note-img-counter' in func_text,
            'slide': 'noteSlideTo' in func_text,
            'touch': 'touchstart' in func_text,
        }
        print(f"\n  {jspath}:")
        for k, v in checks.items():
            print(f"    [{'OK' if v else 'XX'}] {k}")
