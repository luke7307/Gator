import os
import sys
import subprocess
import time
import urllib.request

base = os.path.dirname(os.path.abspath(__file__))
html_path = os.path.join(base, 'index.html')
js_path = os.path.join(base, 'app.js')

print('=' * 60)
print('步骤 1: 检查文件是否存在')
print('=' * 60)
for p in [html_path, js_path]:
    if os.path.exists(p):
        st = os.stat(p)
        print('  OK   %s' % p)
        print('         大小: %d 字节' % st.st_size)
    else:
        print('  FAIL %s  [文件不存在]' % p)

print()
print('=' * 60)
print('步骤 2: 启动 HTTP 服务器 (端口 8765)')
print('=' * 60)
os.chdir(base)
proc = subprocess.Popen(['python3', '-m', 'http.server', '8765'],
                       stdout=subprocess.PIPE, stderr=subprocess.PIPE)
print('  服务器 PID: %d  状态: 启动中...' % proc.pid)
time.sleep(3)

print()
print('=' * 60)
print('步骤 3: curl 验证 (获取 index.html)')
print('=' * 60)
content = None
try:
    with urllib.request.urlopen('http://127.0.0.1:8765/index.html') as r:
        content = r.read().decode('utf-8', errors='replace')
        print('  HTTP 状态码: %d' % r.status)
        print('  内容长度:   %d 字节' % len(content))
        print('  前200字符:')
        print('  ' + content[:200])
        print()
        print('  curl 返回内容: 成功')
except Exception as e:
    print('  curl 失败: %s' % str(e))

print()
print('=' * 60)
print('步骤 4: grep 关键内容')
print('=' * 60)
if content:
    c1 = content.count('note-no-image')
    c2 = content.count('reading-mode-divider')
    c3 = content.count('reading-mode-check')
    print('  "note-no-image"        出现次数: %d' % c1)
    print('  "reading-mode-divider" 出现次数: %d' % c2)
    print('  "reading-mode-check"   出现次数: %d' % c3)

print()
print('=' * 60)
print('验证 curl app.js')
print('=' * 60)
try:
    with urllib.request.urlopen('http://127.0.0.1:8765/app.js') as r:
        js_content = r.read().decode('utf-8', errors='replace')
        print('  HTTP 状态码: %d' % r.status)
        print('  内容长度:   %d 字节' % len(js_content))
        print('  前200字符:')
        print('  ' + js_content[:200])
except Exception as e:
    print('  curl 失败: %s' % str(e))

print()
print('=' * 60)
print('清理: 停止服务器')
print('=' * 60)
proc.terminate()
try:
    proc.wait(timeout=5)
except subprocess.TimeoutExpired:
    proc.kill()
print('  服务器 PID %d 已停止' % proc.pid)
print()
print('所有步骤执行完成。')
