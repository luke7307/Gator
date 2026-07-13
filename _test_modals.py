import asyncio
from playwright.async_api import async_playwright
import os

# 创建截图目录
screenshots_dir = '/Users/zhukai/Desktop/Gator-项目文件夹_06112/_screenshots'
os.makedirs(screenshots_dir, exist_ok=True)

async def test_modals():
    print("=== 开始自动化测试 ===")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        
        # 打开页面
        await page.goto('file:///Users/zhukai/Desktop/Gator-项目文件夹_06112/gator-android/www/index.html')
        await page.wait_for_timeout(1000)
        
        print("\n1. 检查阅读模式设置页...")
        
        # 查找阅读模式按钮
        reading_btn = await page.query_selector('#inspirationReadingBtn')
        if reading_btn:
            print("  ✓ 找到阅读模式按钮")
            await reading_btn.click()
            await page.wait_for_timeout(500)
            
            # 截图
            await page.screenshot(path=f'{screenshots_dir}/reading_modal.png')
            print("  ✓ 截图已保存: reading_modal.png")
            
            # 检查弹窗是否打开
            modal = await page.query_selector('#inspirationReadingModal')
            if modal:
                is_visible = await modal.evaluate('el => !el.classList.contains("hidden")')
                print(f"  弹窗可见状态: {is_visible}")
                
                if is_visible:
                    # 检查全屏开关位置
                    fullscreen_switch = await page.query_selector('#fullscreenReadingSwitchWrapper')
                    if fullscreen_switch:
                        box = await fullscreen_switch.bounding_box()
                        print(f"  全屏开关位置: x={box['x']}, y={box['y']}")
                        
                        # 检查是否在右上角
                        page_width = page.viewport_size['width']
                        if box['x'] > page_width - 200:
                            print("  ✓ 全屏开关在右侧")
                        else:
                            print("  ✗ 全屏开关不在右侧！")
                    
                    # 检查取消按钮是否移除
                    cancel_btn = await page.query_selector('#inspirationReadingModal button:has-text("取消")')
                    if cancel_btn:
                        print("  ✗ 取消按钮仍然存在！")
                    else:
                        print("  ✓ 取消按钮已移除")
                    
                    # 检查图文模式和Note模式是否横向排列
                    normal_btn = await page.query_selector('#normalModeBtn')
                    note_btn = await page.query_selector('#noteModeBtn')
                    
                    if normal_btn and note_btn:
                        normal_box = await normal_btn.bounding_box()
                        note_box = await note_btn.bounding_box()
                        
                        print(f"  图文模式位置: x={normal_box['x']}, y={normal_box['y']}")
                        print(f"  Note模式位置: x={note_box['x']}, y={note_box['y']}")
                        
                        # 检查是否在同一行
                        if abs(normal_box['y'] - note_box['y']) < 10:
                            print("  ✓ 两个按钮在同一行（横向排列）")
                        else:
                            print("  ✗ 两个按钮不在同一行！")
                        
                        # 检查是否一左一右
                        if normal_box['x'] < note_box['x']:
                            print("  ✓ 图文模式在左侧，Note模式在右侧")
                        else:
                            print("  ✗ 排列顺序错误！")
                    
                    # 尝试点击图文模式按钮
                    print("\n  测试点击图文模式按钮...")
                    try:
                        await normal_btn.click(timeout=3000)
                        await page.wait_for_timeout(500)
                        print("  ✓ 图文模式按钮可以点击")
                    except Exception as e:
                        print(f"  ✗ 图文模式按钮点击失败: {e}")
                    
                    # 尝试点击Note模式按钮
                    print("\n  测试点击Note模式按钮...")
                    try:
                        await note_btn.click(timeout=3000)
                        await page.wait_for_timeout(500)
                        print("  ✓ Note模式按钮可以点击")
                    except Exception as e:
                        print(f"  ✗ Note模式按钮点击失败: {e}")
                    
                    # 关闭弹窗
                    close_btn = await page.query_selector('#inspirationReadingModal button[onclick*="closeInspirationReadingMode"]')
                    if close_btn:
                        await close_btn.click()
                        await page.wait_for_timeout(500)
                        print("  ✓ 关闭按钮可以点击")
                else:
                    print("  ✗ 弹窗没有打开！")
        else:
            print("  ✗ 未找到阅读模式按钮")
        
        print("\n2. 检查图片预览界面...")
        
        # 查找图片预览弹窗
        preview_modal = await page.query_selector('#imagePreviewModal')
        if preview_modal:
            print("  ✓ 找到图片预览弹窗元素")
            
            # 检查HTML结构
            overlay = await page.query_selector('#imagePreviewOverlay')
            close_btn = await page.query_selector('#imagePreviewClose')
            toolbar = await page.query_selector('#imagePreviewToolbar')
            
            if overlay:
                print("  ✓ 高斯模糊背景存在")
            else:
                print("  ✗ 高斯模糊背景不存在！")
            
            if close_btn:
                print("  ✓ 左上角关闭按钮存在")
                box = await close_btn.bounding_box()
                print(f"    关闭按钮位置: x={box['x']}, y={box['y']}")
            else:
                print("  ✗ 左上角关闭按钮不存在！")
            
            if toolbar:
                print("  ✓ 底部工具栏存在")
                box = await toolbar.bounding_box()
                print(f"    工具栏位置: x={box['x']}, y={box['y']}")
                
                # 检查工具栏按钮
                prev_btn = await page.query_selector('#imagePreviewPrev')
                next_btn = await page.query_selector('#imagePreviewNext')
                zoom_in = await page.query_selector('#imagePreviewZoomIn')
                zoom_out = await page.query_selector('#imagePreviewZoomOut')
                rotate_btn = await page.query_selector('#imagePreviewRotate')
                download_btn = await page.query_selector('#imagePreviewDownload')
                
                buttons = {
                    '上一张': prev_btn,
                    '下一张': next_btn,
                    '放大': zoom_in,
                    '缩小': zoom_out,
                    '旋转': rotate_btn,
                    '下载': download_btn
                }
                
                for name, btn in buttons.items():
                    if btn:
                        print(f"    ✓ {name}按钮存在")
                    else:
                        print(f"    ✗ {name}按钮不存在！")
            else:
                print("  ✗ 底部工具栏不存在！")
        else:
            print("  ✗ 未找到图片预览弹窗")
        
        print("\n=== 测试完成 ===")
        print(f"\n截图已保存到: {screenshots_dir}")
        
        # 等待5秒让用户查看
        await page.wait_for_timeout(5000)
        
        await browser.close()

asyncio.run(test_modals())