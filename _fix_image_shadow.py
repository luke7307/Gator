import io

# ================ 添加图片hover阴影效果 ================
# 在所有图片预览、图片编辑界面，hover在图片区域时添加阴影

# ================ ANDROID: index.html ================
android_path = 'gator-android/www/index.html'

with io.open(android_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 添加图片hover阴影的CSS
shadow_css = '''        /* ===== 图片hover阴影效果 ===== */
        /* note全屏模式图片容器 */
        .note-img-container:hover {
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }
        /* feed卡片图片容器 */
        .card-image-wrap:hover {
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }
        /* 图片预览组件 */
        #imagePreviewModal .preview-image-container:hover {
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }
        #imagePreviewModal .preview-image-container img:hover {
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }
        /* 图文模式图片 */
        #readingContent img:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        /* 详情弹窗图片 */
        #detailContentPreview img:hover {
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        /* 图片编辑界面 */
        #imageEditModal .edit-image-container:hover {
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }
        
        /* 确保阴影过渡平滑 */
        .note-img-container,
        .card-image-wrap,
        #imagePreviewModal .preview-image-container,
        #imagePreviewModal .preview-image-container img,
        #readingContent img,
        #detailContentPreview img,
        #imageEditModal .edit-image-container {
            transition: box-shadow 0.3s ease;
        }'''

# 插入CSS到合适位置
html = html.replace('        /* 图片下方 meta 区：emoji', shadow_css + '\n\n        /* 图片下方 meta 区：emoji')

with io.open(android_path, 'w', encoding='utf-8') as f:
    f.write(html)
print("✓ Android index.html updated")

# ================ ELECTRON: index.html ================
elec_path = 'gator-electron/www/index.html'

with io.open(elec_path, 'r', encoding='utf-8') as f:
    e_html = f.read()

e_html = e_html.replace('        /* 图片下方 meta 区：emoji', shadow_css + '\n\n        /* 图片下方 meta 区：emoji')

with io.open(elec_path, 'w', encoding='utf-8') as f:
    f.write(e_html)
print("✓ Electron index.html updated")

print("\n=== 修复完成 ===")
print("添加的hover阴影效果：")
print("  - note全屏模式图片容器")
print("  - feed卡片图片容器")
print("  - 图片预览组件")
print("  - 图文模式图片")
print("  - 详情弹窗图片")
print("  - 图片编辑界面")
print("\n阴影样式：box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15)")
print("过渡动画：0.3s ease")
