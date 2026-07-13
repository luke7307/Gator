import io

# 把 Android 平台的图片预览相关函数提取出来，并同步到 Electron

# 读取 Android 版本的图片预览相关函数（完整的一组）
android_path = 'gator-android/www/app.js'
with io.open(android_path, 'r', encoding='utf-8') as f:
    android_js = f.read()

# 提取 Android 中从 "// 图片预览：上一张" 开始到 openImagePreview 函数结束的部分
start_marker = '\n// 图片预览：上一张\n'
end_marker = '\n\n// 更新预览按钮状态（上一张/下一张）\n'

# 找到完整的图片预览函数组（prevImageInPreview 到 setupImagePreviewToolbarAutoHide 之后）
start_idx = android_js.find(start_marker)
if start_idx == -1:
    print("错误：找不到 Android 图片预览函数起始")
    exit(1)

# 找到 openImagePreview 函数结束位置
oi_end_marker = 'setupImagePreviewToolbarAutoHide();\n}'
oi_start = android_js.find('function openImagePreview(', start_idx)
oi_end = android_js.find(oi_end_marker, oi_start) + len(oi_end_marker)

# 提取 Android 的图片预览函数块
android_image_preview_block = android_js[start_idx:oi_end]

# ================ 更新 Electron: app.js ================
elec_path = 'gator-electron/www/app.js'

with io.open(elec_path, 'r', encoding='utf-8') as f:
    elec_js = f.read()

# 找到 Electron 中旧的图片预览函数组位置
elec_prev_start = elec_js.find('\nfunction prevImageInPreview(')
elec_oi_start = elec_js.find('function openImagePreview(')

# 找到旧 openImagePreview 函数结束位置
# Electron 里 openImagePreview 结尾是 setupImagePreviewClick(); + }
elec_old_end_marker = 'setupImagePreviewClick();\n}'
elec_old_end = elec_js.find(elec_old_end_marker, elec_oi_start) + len(elec_old_end_marker)

# 同时我们也需要移除 setupImagePreviewClick 后面的旧函数（如 updateOriginalImageButton 等）
# 找到新的独立函数块起点（从 "// 图片预览：上一张" 到 openImagePreview 结束）
new_block = android_image_preview_block

# 替换 Electron 中从 "function prevImageInPreview(" 到旧的 openImagePreview 结尾 的部分
replace_start = elec_prev_start
replace_end = elec_old_end

elec_js_updated = elec_js[:replace_start] + '\n' + new_block + elec_js[replace_end:]

with io.open(elec_path, 'w', encoding='utf-8') as f:
    f.write(elec_js_updated)
print("✓ Electron app.js 图片预览已同步")

print("\n=== 同步完成 ===")
print("图片预览界面现在在 Android 和 Electron 上是一致的：")
print("  • 全屏高斯模糊背景")
print("  • 左上角关闭按钮")
print("  • 底部工具栏（切换/缩放/全屏/旋转/下载）")
print("  • 工具栏3秒自动淡出")
print("\n阅读模式已修复：")
print("  • 打开弹窗时显示当前默认选中（Note模式粉色）")
print("  • 全屏开关在右上角")
