import asyncio
from playwright.async_api import async_playwright
import os

screenshots_dir = '/Users/zhukai/Desktop/Gator-项目文件夹_06112/_screenshots'
os.makedirs(screenshots_dir, exist_ok=True)

async def test_modals():
    print("=== 开始自动化测试 ===\n")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        
        await page.goto('file:///Users/zhukai/Desktop/Gator-项目文件夹_06112/gator-android/www/index.html')
        await page.wait_for_timeout(1000)
        
        # 测试阅读模式设置页
        print("1. 测试阅读模式设置页")
        print("-" * 40)
        
        reading_btn = await page.query_selector('#inspirationReadingBtn')
        if reading_btn:
            print("  ✓ 找到阅读模式按钮")
            await reading_btn.click()
            await page.wait_for_timeout(500)
            
            modal = await page.query_selector('#inspirationReadingModal')
            if modal:
                is_visible = await modal.evaluate('el => !el.classList.contains("hidden")')
                print(f"  弹窗状态: {'打开' if is_visible else '未打开'}")
                
                if is_visible:
                    await page.screenshot(path=f'{screenshots_dir}/test_reading_modal.png')
                    print("  ✓ 截图保存: test_reading_modal.png")
                    
                    # 检查全屏开关位置
                    fullscreen_switch = await page.query_selector('#fullscreenReadingSwitchWrapper')
                    if fullscreen_switch:
                        box = await fullscreen_switch.bounding_box()
                        page_width = page.viewport_size['width']
                        print(f"  全屏开关位置: x={box['x']} (页面宽度={page_width})")
                        if box['x'] > page_width - 250:
                            print("  ✓ 全屏开关在右侧")
                        else:
                            print("  ✗ 全屏开关不在右侧")
                    
                    # 检查取消按钮
                    cancel_btn = await page.query_selector('button:has-text("取消")')
                    if cancel_btn:
                        parent = await cancel_btn.evaluate_handle('el => el.parentElement.id')
                        parent_id = await parent.evaluate('el => el ? el.id : ""')
                        if parent_id == 'inspirationReadingModal':
                            print("  ✗ 取消按钮仍然存在")
                        else:
                            print("  ✓ 取消按钮已移除")
                    else:
                        print("  ✓ 取消按钮已移除")
                    
                    # 检查横向排列
                    normal_btn = await page.query_selector('#normalModeBtn')
                    note_btn = await page.query_selector('#noteModeBtn')
                    
                    if normal_btn and note_btn:
                        normal_box = await normal_btn.bounding_box()
                        note_box = await note_btn.bounding_box()
                        
                        same_row = abs(normal_box['y'] - note_box['y']) < 20
                        left_right = normal_box['x'] < note_box['x']
                        
                        print(f"  图文模式位置: x={normal_box['x']}, y={normal_box['y']}")
                        print(f"  Note模式位置: x={note_box['x']}, y={note_box['y']}")
                        print(f"  {'✓' if same_row else '✗'} 横向排列")
                        print(f"  {'✓' if left_right else '✗'} 图文左 Note右")
                    
                    # 测试点击
                    print("\n  测试按钮点击:")
                    try:
                        await normal_btn.click(timeout=5000)
                        await page.wait_for_timeout(300)
                        print("  ✓ 图文模式按钮可点击")
                    except Exception as e:
                        print(f"  ✗ 图文模式按钮点击失败: {str(e)[:50]}")
                    
                    try:
                        await note_btn.click(timeout=5000)
                        await page.wait_for_timeout(300)
                        print("  ✓ Note模式按钮可点击")
                    except Exception as e:
                        print(f"  ✗ Note模式按钮点击失败: {str(e)[:50]}")
                    
                    # 关闭弹窗
                    close_btn = await page.query_selector('#inspirationReadingModal button[onclick*="closeInspirationReadingMode"]')
                    if close_btn:
                        await close_btn.click()
                        await page.wait_for_timeout(300)
                        print("  ✓ 关闭按钮可点击")
        
        # 测试图片预览界面
        print("\n2. 测试图片预览界面")
        print("-" * 40)
        
        preview_modal = await page.query_selector('#imagePreviewModal')
        if preview_modal:
            print("  ✓ 图片预览弹窗元素存在")
            
            overlay = await page.query_selector('#imagePreviewOverlay')
            close_btn = await page.query_selector('#imagePreviewClose')
            toolbar = await page.query_selector('#imagePreviewToolbar')
            
            print(f"  {'✓' if overlay else '✗'} 高斯模糊背景")
            print(f"  {'✓' if close_btn else '✗'} 左上角关闭按钮")
            print(f"  {'✓' if toolbar else '✗'} 底部工具栏")
            
            if toolbar:
                buttons = ['Prev', 'Next', 'ZoomOut', 'ZoomIn', 'Fullscreen', 'Rotate', 'Download']
                for btn_name in buttons:
                    btn = await page.query_selector(f'#imagePreview{btn_name}')
                    print(f"    {'✓' if btn else '✗'} {btn_name}按钮")
        
        print("\n" + "=" * 40)
        print("测试完成！")
        print(f"截图目录: {screenshots_dir}")
        
        await page.wait_for_timeout(3000)
        await browser.close()

asyncio.run(test_modals())