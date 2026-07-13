
# 直接做文本替换：用 Android 版本的图片预览函数块替换 Electron 的旧块

import io

# 读取两个文件
android_path = 'gator-android/www/app.js'
elec_path = 'gator-electron/www/app.js'

with io.open(android_path, 'r', encoding='utf-8') as f:
    android_js = f.read()

with io.open(elec_path, 'r', encoding='utf-8') as f:
    elec_js = f.read()

# =============== 定位 Android 中新图片预览函数块 ===============
# Android 中定义的新函数顺序：
# "// 图片预览：上一张" 开始
# prevImageInPreview, nextImageInPreview, zoomInImageInPreview, zoomOutImageInPreview,
# updateZoomText, toggleFullscreenInPreview, rotateImageInPreview, downloadImageInPreview,
# toggleOriginalImageInPreview, updatePreviewSlider, updatePreviewButtons,
# toolbarHideTimer / setupImagePreviewToolbarAutoHide, renderPreviewImages, setupImagePreviewClick,
# openImagePreview, updatePreviewButtons (第二个)

# 提取 Android 中：从 "// 图片预览：上一张" 到 openImagePreview 结束
marker1 = '\n\n// 图片预览：上一张\n'
marker1_alt = '\n// 图片预览：上一张\n'
if marker1 in android_js:
    idx1 = android_js.find(marker1)
elif marker1_alt in android_js:
    idx1 = android_js.find(marker1_alt)
else:
    print("Android 中找不到 图片预览：上一张 标记")
    exit(1)

# 找到 openImagePreview 的结束（setupImagePreviewToolbarAutoHide(); + }）
oi_marker = 'function openImagePreview('
idx_oi = android_js.find(oi_marker, idx1)
if idx_oi == -1:
    print("找不到 openImagePreview")
    exit(1)

# 找到 openImagePreview 的结束：看 "setupImagePreviewToolbarAutoHide();\n}"
end_marker = 'setupImagePreviewToolbarAutoHide();\n}'
idx_end = android_js.find(end_marker, idx_oi) + len(end_marker)
if idx_end == -1 + len(end_marker):
    print("找不到 openImagePreview 结束")
    exit(1)

android_new_block = android_js[idx1:idx_end]
print(f"✓ Android 新函数块长度: {len(android_new_block)} 字符")

# =============== 替换 Electron 中旧的图片预览函数 ===============
# Electron 中从 "let imagePreviewState = " 开始（它有自己的imagePreviewState定义）
# 到 setupImagePreviewClick() 结束
# 先在 Electron 中找到替换起点和终点

# 起点："let imagePreviewState = {" 附近
s_start_marker = '\nlet imagePreviewState = {'
if s_start_marker in elec_js:
    elec_start = elec_js.find(s_start_marker)
else:
    # 尝试 "let imagePreviewState"
    alt = 'let imagePreviewState ='
    if alt in elec_js:
        elec_start = elec_js.find(alt)
        # 向前找一个换行
        elec_start = elec_js.rfind('\n', 0, elec_start)
    else:
        print("找不到 imagePreviewState")
        exit(1)

# 终点：setupImagePreviewClick 函数的结束 "}; \n" 或类似
# 找到最后一个 setupImagePreviewClick 函数的结束括号
sipc_marker = 'function setupImagePreviewClick()'
if sipc_marker in elec_js:
    idx_sipc = elec_js.find(sipc_marker, elec_start)
    # 找到该函数结束：从 function 开始找下一个在同缩进的 }
    # 简化：找从 function 开始到 "\nfunction " 或文件末尾
    # 更简单：找到后面第一个独立的 "}\n" 后紧跟 "\n\n" 或 "// "
    idx = idx_sipc
    brace_count = 0
    found_open = False
    while idx < len(elec_js):
        if elec_js[idx] == '{':
            brace_count += 1
            found_open = True
        elif elec_js[idx] == '}':
            brace_count -= 1
            if found_open and brace_count == 0:
                # 找到结束
                idx += 1
                break
        idx += 1
    elec_end = idx
else:
    print("找不到 setupImagePreviewClick")
    exit(1)

print(f"✓ Electron 旧块位置: {elec_start} - {elec_end}")
print(f"✓ Electron 旧块长度: {elec_end - elec_start} 字符")

# 执行替换
elec_js_new = elec_js[:elec_start] + '\n' + android_new_block + elec_js[elec_end:]

with io.open(elec_path, 'w', encoding='utf-8') as f:
    f.write(elec_js_new)

print("✓ Electron app.js 已更新")
print("\n=== 完成 ===")
