const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const path = require('path');
const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const { execFile, spawn } = require('child_process');

// 禁用GPU加速，避免GPU进程崩溃导致应用退出
app.disableHardwareAcceleration();
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('no-sandbox');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

let ytdlp = null;
try {
    const YtDlpWrap = require('yt-dlp-wrap').default;
    ytdlp = new YtDlpWrap();
} catch(e) {
    console.warn('yt-dlp-wrap 加载失败:', e.message);
}

let proxyServer = null;
let proxyPort = 0;
let mainWindow = null;

process.on('uncaughtException', (error) => {
    console.error('未捕获的异常:', error.message, error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.warn('未处理的Promise拒绝:', reason);
});

function startProxyServer() {
    proxyServer = http.createServer((req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const targetUrl = parsedUrl.query.url;
        const isMedia = parsedUrl.query.media === '1' || parsedUrl.query.type === 'video';
        const referer = parsedUrl.query.referer || '';

        if (!targetUrl) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: '缺少 url 参数' }));
            return;
        }

        const isHttps = targetUrl.startsWith('https://');
        const httpModule = isHttps ? https : http;
        
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': isMedia ? '*/*' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        };
        
        if (referer) {
            headers['Referer'] = referer;
        } else if (targetUrl.includes('bilivideo.com') || targetUrl.includes('bilibili.com')) {
            headers['Referer'] = 'https://www.bilibili.com/';
            headers['Origin'] = 'https://www.bilibili.com';
        } else if (targetUrl.includes('xiaohongshu.com') || targetUrl.includes('xhscdn.com')) {
            headers['Referer'] = 'https://www.xiaohongshu.com/';
            headers['Origin'] = 'https://www.xiaohongshu.com';
        } else if (targetUrl.includes('coolapk.com') || targetUrl.includes('coolapk') ||
                   targetUrl.includes('bkimg.cdn.bcebos.com') || targetUrl.includes('bdimg.share.baidu.com') || 
                   targetUrl.includes('ss0.bdstatic.com')) {
            headers['Referer'] = 'https://www.coolapk.com/';
            headers['Origin'] = 'https://www.coolapk.com';
        }
        
        if (isMedia) {
            if (req.headers['range']) {
                headers['Range'] = req.headers['range'];
            }
            headers['Accept-Encoding'] = 'identity';
        } else {
            headers['Accept-Encoding'] = 'identity';
        }

        try {
            const targetParsed = url.parse(targetUrl);
            const options = {
                hostname: targetParsed.hostname,
                port: targetParsed.port || (isHttps ? 443 : 80),
                path: targetParsed.path,
                method: req.method,
                headers: headers
            };
            
            const proxyReq = httpModule.request(options, (targetRes) => {
                if (isMedia) {
                    const resHeaders = {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
                        'Access-Control-Allow-Headers': 'Range,Content-Type',
                        'Accept-Ranges': targetRes.headers['accept-ranges'] || 'bytes',
                    };
                    
                    if (targetRes.headers['content-type']) {
                        resHeaders['Content-Type'] = targetRes.headers['content-type'];
                    }
                    if (targetRes.headers['content-length']) {
                        resHeaders['Content-Length'] = targetRes.headers['content-length'];
                    }
                    if (targetRes.headers['content-range']) {
                        resHeaders['Content-Range'] = targetRes.headers['content-range'];
                    }
                    if (targetRes.headers['cache-control']) {
                        resHeaders['Cache-Control'] = targetRes.headers['cache-control'];
                    }
                    
                    const statusCode = targetRes.statusCode === 206 ? 206 : 200;
                    res.writeHead(statusCode, resHeaders);
                    
                    targetRes.pipe(res);
                } else {
                    let data = [];
                    targetRes.on('data', (chunk) => {
                        data.push(chunk);
                    });
                    targetRes.on('end', () => {
                        const buffer = Buffer.concat(data);
                        let content = buffer.toString('utf-8');
                        const contentType = targetRes.headers['content-type'] || 'text/html';
                        res.writeHead(200, {
                            'Content-Type': contentType + ';charset=utf-8',
                            'Access-Control-Allow-Origin': '*'
                        });
                        res.end(content);
                    });
                }
            });
            
            proxyReq.on('error', (err) => {
                res.writeHead(500, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ error: err.message }));
            });
            
            proxyReq.setTimeout(30000, () => {
                proxyReq.destroy();
                res.writeHead(504, { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ error: '请求超时' }));
            });
            
            proxyReq.end();
        } catch (err) {
            res.writeHead(500, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ error: err.message }));
        }
    });

    // 优先尝试固定端口 3000（供浏览器调试使用），失败则回退到随机端口
    proxyServer.listen(3000, '127.0.0.1', () => {
        proxyPort = 3000;
        console.log(`代理服务器启动在 http://127.0.0.1:${proxyPort} (固定端口)`);
        if (mainWindow) {
            mainWindow.webContents.send('proxy-ready', proxyPort);
        }
    }).on('error', () => {
        // 端口 3000 被占用，回退到随机端口
        proxyServer.listen(0, '127.0.0.1', () => {
            const address = proxyServer.address();
            proxyPort = address.port;
            console.log(`代理服务器启动在 http://127.0.0.1:${proxyPort} (随机端口)`);
            if (mainWindow) {
                mainWindow.webContents.send('proxy-ready', proxyPort);
            }
        });
    });
}

function fetchUrl(targetUrl) {
    return new Promise((resolve, reject) => {
        const isHttps = targetUrl.startsWith('https://');
        const httpModule = isHttps ? https : http;

        let refererUrl = 'https://www.google.com/';
        let userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
        if (targetUrl.includes('xiaohongshu.com') || targetUrl.includes('xhscdn.com')) {
            refererUrl = 'https://www.xiaohongshu.com/';
        } else if (targetUrl.includes('bilibili.com') || targetUrl.includes('bilivideo.com') || targetUrl.includes('hdslb.com')) {
            refererUrl = 'https://www.bilibili.com/';
        } else if (targetUrl.includes('coolapk.com') || targetUrl.includes('coolapk')) {
            refererUrl = 'https://www.coolapk.com/';
        } else if (targetUrl.includes('feishu.cn') || targetUrl.includes('larksuite.com')) {
            refererUrl = 'https://www.feishu.cn/';
        } else if (targetUrl.includes('juejin.cn')) {
            refererUrl = 'https://juejin.cn/';
        } else if (targetUrl.includes('zhihu.com')) {
            refererUrl = 'https://www.zhihu.com/';
        } else if (targetUrl.includes('apple.com') || targetUrl.includes('developer.apple.com')) {
            refererUrl = 'https://developer.apple.com/';
        } else if (targetUrl.includes('douyin.com') || targetUrl.includes('iesdouyin.com')) {
            // 抖音 v.douyin.com 短链必须用移动端 UA + 移动端 Referer 才能正确返回页面内容
            refererUrl = 'https://www.douyin.com/';
            userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
        } else if (targetUrl.includes('csdn.net') || targetUrl.includes('csdnimg.cn')) {
            refererUrl = 'https://www.csdn.net/';
        } else if (targetUrl.includes('hupu.com') || targetUrl.includes('hoopchina.com.cn')) {
            refererUrl = 'https://www.hupu.com/';
        }

        const options = {
            headers: {
                'User-Agent': userAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'Accept-Encoding': 'identity',
                'Referer': refererUrl,
                'Origin': refererUrl.replace(/\/$/, ''),
                'Connection': 'keep-alive',
                'Cache-Control': 'max-age=0',
                'Upgrade-Insecure-Requests': '1'
            },
            timeout: 20000
        };

        try {
            const req = httpModule.get(targetUrl, options, (targetRes) => {
                // 抖音 v.douyin.com 短链返回 302 重定向到 iesdouyin.com，需手动跟随
                if ((targetRes.statusCode === 301 || targetRes.statusCode === 302) && targetRes.headers.location) {
                    const redirectUrl = targetRes.headers.location.startsWith('http')
                        ? targetRes.headers.location
                        : new URL(targetRes.headers.location, targetUrl).toString();
                    console.log('跟随重定向:', targetUrl, '->', redirectUrl);
                    targetRes.resume();
                    fetchUrl(redirectUrl).then(resolve).catch(reject);
                    return;
                }

                const chunks = [];
                targetRes.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                targetRes.on('end', () => {
                    try {
                        const buffer = Buffer.concat(chunks);
                        let data = '';
                        const contentType = targetRes.headers['content-type'] || '';
                        if (contentType.includes('charset=gbk') || contentType.includes('charset=gb2312')) {
                            try {
                                data = buffer.toString('utf-8');
                            } catch(e) {
                                data = buffer.toString('utf-8');
                            }
                        } else {
                            data = buffer.toString('utf-8');
                        }
                        resolve(data);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.on('timeout', () => {
                req.destroy();
                reject(new Error('请求超时（20秒）'));
            });
        } catch (err) {
            reject(err);
        }
    });
}

async function captureWebpageScreenshot(targetUrl, onProgress) {
    let captureWindow = null;
    try {
        captureWindow = new BrowserWindow({
            width: 1280,
            height: 800,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                javascript: true,
                images: true
            }
        });

        captureWindow.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        await captureWindow.loadURL(targetUrl, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        const pageSize = await captureWindow.webContents.executeJavaScript(`
            (function() {
                const body = document.body;
                const html = document.documentElement;
                const height = Math.max(
                    body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight
                );
                const width = Math.max(
                    body.scrollWidth, body.offsetWidth,
                    html.clientWidth, html.scrollWidth, html.offsetWidth
                );
                return { width: Math.min(width, 1280), height: Math.min(height, 10000) };
            })()
        `);

        const { width, height } = pageSize;
        captureWindow.setSize(width, height);
        await new Promise(resolve => setTimeout(resolve, 500));

        const image = await captureWindow.webContents.capturePage();
        const dataUrl = image.toDataURL('image/png');

        const title = await captureWindow.webContents.executeJavaScript('document.title || ""');

        captureWindow.close();
        captureWindow = null;

        return {
            success: true,
            dataUrl: dataUrl,
            title: title,
            width: width,
            height: height
        };
    } catch (error) {
        if (captureWindow) {
            try { captureWindow.close(); } catch (e) {}
            captureWindow = null;
        }
        return { success: false, error: error.message };
    }
}

function createWindow() {
  try {
    mainWindow = new BrowserWindow({
      width: 430,
      height: 932,
      minWidth: 375,
      minHeight: 667,
      title: 'Gator - 信息效率工具箱',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
        sandbox: false
      }
    });

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      try {
        shell.openExternal(url);
      } catch(e) {
        console.warn('打开外部链接失败:', e.message);
      }
      return { action: 'deny' };
    });

    mainWindow.webContents.on('will-navigate', (event, url) => {
      if (url && !url.startsWith('file://')) {
        event.preventDefault();
        try {
          shell.openExternal(url);
        } catch(e) {
          console.warn('打开外部链接失败:', e.message);
        }
      }
    });

    mainWindow.webContents.on('crashed', (event, killed) => {
      console.error('渲染进程崩溃:', killed);
      if (mainWindow) {
        mainWindow.reload();
      }
    });

    mainWindow.on('unresponsive', () => {
      console.warn('窗口无响应');
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    const ses = mainWindow.webContents.session;
    ses.webRequest.onBeforeSendHeaders((details, callback) => {
      try {
        const url = details.url;
        const requestHeaders = details.requestHeaders;
        
        if (url.includes('image.coolapk.com') || url.includes('coolapk.com')) {
          requestHeaders['Referer'] = 'https://www.coolapk.com/';
          requestHeaders['Origin'] = 'https://www.coolapk.com';
        } else if (url.includes('hdslb.com') || url.includes('bilibili.com')) {
          requestHeaders['Referer'] = 'https://www.bilibili.com/';
          requestHeaders['Origin'] = 'https://www.bilibili.com';
        } else if (url.includes('xiaohongshu.com') || url.includes('xhscdn.com')) {
          requestHeaders['Referer'] = 'https://www.xiaohongshu.com/';
          requestHeaders['Origin'] = 'https://www.xiaohongshu.com';
        } else if (url.includes('apple.com')) {
          requestHeaders['Referer'] = 'https://www.apple.com/';
        } else if (url.includes('juejin.cn')) {
          requestHeaders['Referer'] = 'https://juejin.cn/';
          requestHeaders['Origin'] = 'https://juejin.cn';
        }
        
        requestHeaders['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
        
        callback({ requestHeaders });
      } catch (e) {
        console.warn('请求头处理错误:', e.message);
        callback({ cancel: false });
      }
    });

    mainWindow.loadFile(path.join(__dirname, 'www', 'index.html')).catch(err => {
      console.error('加载页面失败:', err);
    });
  } catch (error) {
    console.error('创建窗口失败:', error);
  }
}

ipcMain.handle('fetch-url', async (event, url) => {
    try {
        const data = await fetchUrl(url);
        return { success: true, data: data };
    } catch (err) {
        return { success: false, error: err.message };
    }
});

ipcMain.handle('get-proxy-port', () => {
    return proxyPort;
});

ipcMain.handle('fetch-bilibili-api', async (event, url) => {
    return new Promise((resolve) => {
        try {
            const bvidMatch = url.match(/(BV[a-zA-Z0-9]{10,})/i);
            const aidMatch = url.match(/\/av([0-9]+)/i);
            const opusMatch = url.match(/\/opus\/([0-9]+)/i);
            const readMatch = url.match(/\/read\/cv([0-9]+)/i);

            let apiUrl = '';
            let contentType = 'video';

            if (bvidMatch) {
                apiUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bvidMatch[1]}`;
                contentType = 'video';
            } else if (aidMatch) {
                apiUrl = `https://api.bilibili.com/x/web-interface/view?aid=${aidMatch[1]}`;
                contentType = 'video';
            } else if (opusMatch) {
                apiUrl = `https://api.bilibili.com/x/polymer/web-dynamic/v1/detail?id=${opusMatch[1]}&type=1`;
                contentType = 'opus';
            } else if (readMatch) {
                apiUrl = `https://api.bilibili.com/x/article/viewinfo?id=${readMatch[1]}&mobi_app=pc&platform=pc`;
                contentType = 'article';
            }

            if (!apiUrl) {
                resolve({ success: false, error: '无法识别URL格式' });
                return;
            }

            console.log('B站API请求:', apiUrl);

            const parsedApiUrl = new URL(apiUrl);
            const options = {
                hostname: parsedApiUrl.hostname,
                path: parsedApiUrl.pathname + parsedApiUrl.search,
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com',
                    'Accept': 'application/json, text/plain, */*'
                },
                timeout: 10000
            };

            const req = https.get(options, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    try {
                        const jsonData = JSON.parse(data);
                        console.log('B站API响应code:', jsonData.code);

                        if (jsonData.code !== 0) {
                            resolve({ success: false, error: jsonData.message || 'API返回错误', code: jsonData.code });
                            return;
                        }

                        const result = {
                            title: '',
                            content: '',
                            contentHtml: '',
                            images: [],
                            videos: [],
                            author: '',
                            date: '',
                            excerpt: '',
                            isVideo: false,
                            videoUrl: url
                        };

                        if (contentType === 'video' && jsonData.data) {
                            const v = jsonData.data;
                            result.title = v.title || '';
                            result.excerpt = v.desc || v.description || '';
                            result.author = v.owner?.name || v.owner?.uname || '';
                            result.isVideo = true;
                            
                            if (v.pic) {
                                let picUrl = v.pic;
                                if (picUrl.startsWith('//')) picUrl = 'https:' + picUrl;
                                if (picUrl.startsWith('http://')) picUrl = picUrl.replace('http://', 'https://');
                                result.images.push(picUrl);
                            }
                            
                            if (v.pubdate) {
                                result.date = new Date(v.pubdate * 1000).toISOString();
                            }

                            if (result.title && result.images.length > 0) {
                                result.contentHtml = `
                                    <div style="text-align:center;margin-bottom:16px;">
                                        <img src="${result.images[0]}" style="max-width:100%;height:auto;border-radius:12px;display:block;margin:0 auto;" />
                                    </div>
                                    ${result.excerpt ? `<p style="font-size:15px;color:#374151;line-height:1.7;">${result.excerpt.replace(/\n/g, '<br>')}</p>` : ''}
                                `;
                                result.content = result.contentHtml;
                            }
                        } else if (contentType === 'opus' && jsonData.data) {
                            const item = jsonData.data.item || {};
                            const modules = item.modules || {};
                            const dynamic = modules.module_dynamic || {};
                            const opus = dynamic.major?.opus || {};
                            
                            result.title = opus.title || (dynamic.desc?.text || '').substring(0, 50) || '';
                            result.excerpt = opus.summary || opus.text || dynamic.desc?.text || '';
                            result.author = modules.module_author?.name?.text || item.user?.uname || '';

                            if (opus.pics && Array.isArray(opus.pics)) {
                                opus.pics.forEach(pic => {
                                    const picUrl = pic.url || pic.src || pic;
                                    if (picUrl && typeof picUrl === 'string') {
                                        result.images.push(picUrl);
                                    }
                                });
                            }

                            if (result.title || result.images.length > 0) {
                                let htmlContent = '';
                                if (result.images.length > 0) {
                                    htmlContent += `<div style="margin-bottom:12px;">`;
                                    result.images.forEach(img => {
                                        htmlContent += `<img src="${img}" style="max-width:100%;height:auto;border-radius:12px;display:block;margin-bottom:8px;" />`;
                                    });
                                    htmlContent += `</div>`;
                                }
                                if (result.excerpt) {
                                    htmlContent += `<p style="font-size:15px;color:#374151;line-height:1.7;">${result.excerpt.replace(/\n/g, '<br>')}</p>`;
                                }
                                result.contentHtml = htmlContent;
                                result.content = htmlContent;
                            }
                        } else if (contentType === 'article' && jsonData.data) {
                            const a = jsonData.data;
                            result.title = a.title || '';
                            result.author = a.author_name || '';
                            result.excerpt = a.summary || '';
                            
                            if (a.banner_url) {
                                result.images.push(a.banner_url);
                            }
                            if (a.images && Array.isArray(a.images)) {
                                a.images.forEach(img => {
                                    if (img && !result.images.includes(img)) {
                                        result.images.push(img);
                                    }
                                });
                            }
                        }

                        if (result.images && result.images.length > 0) {
                            result.images = result.images.map(img => {
                                if (typeof img === 'string') {
                                    if (img.startsWith('//')) return 'https:' + img;
                                    if (img.startsWith('http://')) return img.replace('http://', 'https://');
                                }
                                return img;
                            });
                        }
                        
                        if (result.contentHtml) {
                            result.contentHtml = result.contentHtml.replace(/src="http:\/\//g, 'src="https://');
                            result.contentHtml = result.contentHtml.replace(/src='http:\/\//g, 'src="https://');
                        }
                        
                        console.log('B站API解析结果:', { title: result.title, images: result.images.length, isVideo: result.isVideo });
                        resolve({ success: true, data: result });
                    } catch (parseErr) {
                        console.error('B站API JSON解析失败:', parseErr.message);
                        resolve({ success: false, error: 'JSON解析失败: ' + parseErr.message });
                    }
                });
            });

            req.on('error', (err) => {
                console.error('B站API请求错误:', err.message);
                resolve({ success: false, error: err.message });
            });

            req.on('timeout', () => {
                req.destroy();
                resolve({ success: false, error: '请求超时' });
            });

            req.setTimeout(10000);
        } catch (err) {
            console.error('B站API异常:', err.message);
            resolve({ success: false, error: err.message });
        }
    });
});

ipcMain.handle('open-external', async (event, url) => {
    try {
        await shell.openExternal(url);
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    }
});

ipcMain.handle('capture-webpage', async (event, url) => {
    return await captureWebpageScreenshot(url);
});

ipcMain.handle('capture-webpage-segments', async (event, url) => {
    let captureWindow = null;
    try {
        captureWindow = new BrowserWindow({
            width: 1280,
            height: 900,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                javascript: true,
                images: true
            }
        });

        captureWindow.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        await captureWindow.loadURL(url, {
            waitUntil: 'networkidle2',
            timeout: 30000
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        const pageInfo = await captureWindow.webContents.executeJavaScript(`
            (function() {
                const body = document.body;
                const html = document.documentElement;
                const fullHeight = Math.max(
                    body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight
                );
                const viewportHeight = window.innerHeight;
                const width = Math.min(
                    Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth),
                    1280
                );
                return { fullHeight, viewportHeight, width };
            })()
        `);

        const { fullHeight, viewportHeight, width } = pageInfo;
        const segments = [];
        const overlap = 100;
        let currentY = 0;
        let segmentIndex = 0;

        while (currentY < fullHeight) {
            const segmentHeight = Math.min(viewportHeight, fullHeight - currentY);
            
            await captureWindow.webContents.executeJavaScript(`
                window.scrollTo(0, ${currentY});
            `);
            
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const image = await captureWindow.webContents.capturePage();
            const dataUrl = image.toDataURL('image/png');
            
            segments.push({
                index: segmentIndex,
                y: currentY,
                height: segmentHeight,
                dataUrl: dataUrl
            });
            
            if (currentY + viewportHeight >= fullHeight) {
                break;
            }
            
            currentY += viewportHeight - overlap;
            segmentIndex++;
            
            if (segments.length >= 50) break;
        }

        const title = await captureWindow.webContents.executeJavaScript('document.title || ""');

        captureWindow.close();
        captureWindow = null;

        return {
            success: true,
            segments: segments,
            title: title,
            fullHeight: fullHeight,
            viewportHeight: viewportHeight,
            width: width,
            totalSegments: segments.length
        };
    } catch (error) {
        if (captureWindow) {
            try { captureWindow.close(); } catch (e) {}
            captureWindow = null;
        }
        return { success: false, error: error.message };
    }
});

ipcMain.handle('download-media', async (event, mediaUrl, filename) => {
    return new Promise((resolve) => {
        const isHttps = mediaUrl.startsWith('https://');
        const httpModule = isHttps ? https : http;
        
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': mediaUrl,
                'Origin': new URL(mediaUrl).origin,
                'Connection': 'keep-alive',
                'Accept': '*/*'
            },
            timeout: 60000
        };

        const req = httpModule.get(mediaUrl, options, (res) => {
            if (res.statusCode !== 200) {
                resolve({ success: false, error: `HTTP ${res.statusCode}` });
                return;
            }

            dialog.showSaveDialog(mainWindow, {
                title: '保存媒体文件',
                defaultPath: filename || 'media',
                filters: [
                    { name: '视频文件', extensions: ['mp4', 'm4a', 'webm', 'flv', 'avi', 'mov'] },
                    { name: '音频文件', extensions: ['mp3', 'm4a', 'wav', 'aac'] },
                    { name: '所有文件', extensions: ['*'] }
                ]
            }).then((result) => {
                if (result.canceled || !result.filePath) {
                    resolve({ success: false, error: '用户取消' });
                    return;
                }

                const filePath = result.filePath;
                const fileStream = fs.createWriteStream(filePath);
                let totalSize = parseInt(res.headers['content-length'] || '0');
                let downloadedSize = 0;

                res.on('data', (chunk) => {
                    fileStream.write(chunk);
                    downloadedSize += chunk.length;
                    if (totalSize > 0) {
                        const progress = Math.round((downloadedSize / totalSize) * 100);
                        event.sender.send('download-progress', { progress, filename });
                    }
                });

                res.on('end', () => {
                    fileStream.close();
                    resolve({ success: true, filePath: filePath });
                });

                res.on('error', (err) => {
                    fileStream.destroy();
                    resolve({ success: false, error: err.message });
                });
            }).catch((err) => {
                resolve({ success: false, error: err.message });
            });
        });

        req.on('error', (err) => {
            resolve({ success: false, error: err.message });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({ success: false, error: '下载超时' });
        });
    });
});

ipcMain.handle('download-bilibili-video', async (event, videoUrl, filename) => {
    try {
        console.log('[B站下载] 开始处理:', videoUrl);
        
        const parseResult = await parseVideoWithYtdlp(videoUrl);
        if (!parseResult.success || parseResult.videoUrls.length === 0) {
            return { success: false, error: '视频解析失败' };
        }
        
        const videoUrl_0 = parseResult.videoUrls[0];
        const audioUrl_0 = parseResult.audioUrls && parseResult.audioUrls.length > 0 ? parseResult.audioUrls[0] : null;
        const safeFilename = (filename || 'bilibili_video').replace(/[<>:"/\\|?*]/g, '_');
        
        const saveResult = await dialog.showSaveDialog(mainWindow, {
            title: '保存视频',
            defaultPath: safeFilename + '.mp4',
            filters: [
                { name: 'MP4 视频', extensions: ['mp4'] },
                { name: '所有文件', extensions: ['*'] }
            ]
        });
        
        if (saveResult.canceled || !saveResult.filePath) {
            return { success: false, error: '用户取消' };
        }
        
        const outputPath = saveResult.filePath;
        
        event.sender.send('download-progress', { progress: 10, filename: safeFilename });
        
        if (audioUrl_0) {
            console.log('[B站下载] 音视频分离，使用ffmpeg合并');
            event.sender.send('download-progress', { progress: 20, filename: safeFilename });
            
            await mergeVideoAudio(videoUrl_0, audioUrl_0, outputPath);
            
            event.sender.send('download-progress', { progress: 100, filename: safeFilename });
            return { success: true, filePath: outputPath };
        } else {
            console.log('[B站下载] 单视频流，直接下载');
            
            const downloadResult = await new Promise((resolve) => {
                const isHttps = videoUrl_0.startsWith('https://');
                const httpModule = isHttps ? https : http;
                
                const options = {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Referer': 'https://www.bilibili.com/',
                        'Origin': 'https://www.bilibili.com',
                        'Connection': 'keep-alive',
                        'Accept': '*/*'
                    },
                    timeout: 300000
                };
                
                const req = httpModule.get(videoUrl_0, options, (res) => {
                    if (res.statusCode !== 200) {
                        resolve({ success: false, error: `HTTP ${res.statusCode}` });
                        return;
                    }
                    
                    const fileStream = fs.createWriteStream(outputPath);
                    let totalSize = parseInt(res.headers['content-length'] || '0');
                    let downloadedSize = 0;
                    
                    res.on('data', (chunk) => {
                        fileStream.write(chunk);
                        downloadedSize += chunk.length;
                        if (totalSize > 0) {
                            const progress = Math.round((downloadedSize / totalSize) * 100);
                            event.sender.send('download-progress', { progress, filename: safeFilename });
                        }
                    });
                    
                    res.on('end', () => {
                        fileStream.close();
                        resolve({ success: true, filePath: outputPath });
                    });
                    
                    res.on('error', (err) => {
                        fileStream.destroy();
                        resolve({ success: false, error: err.message });
                    });
                });
                
                req.on('error', (err) => {
                    resolve({ success: false, error: err.message });
                });
                
                req.on('timeout', () => {
                    req.destroy();
                    resolve({ success: false, error: '下载超时' });
                });
            });
            
            return downloadResult;
        }
    } catch (e) {
        console.error('[B站下载] 失败:', e.message);
        return { success: false, error: e.message };
    }
});

function fetchBilibiliVideoInfo(bvid) {
    return new Promise((resolve, reject) => {
        try {
            const apiUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
            const parsedUrl = new URL(apiUrl);
            const options = {
                hostname: parsedUrl.hostname,
                path: parsedUrl.pathname + parsedUrl.search,
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com',
                    'Accept': 'application/json, text/plain, */*'
                },
                timeout: 10000
            };

            const req = https.get(options, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        if (json.code === 0 && json.data) {
                            resolve(json.data);
                        } else {
                            reject(new Error(json.message || '获取视频信息失败'));
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            req.on('error', reject);
            req.on('timeout', () => { req.destroy(); reject(new Error('请求超时')); });
        } catch (e) {
            reject(e);
        }
    });
}

function fetchBilibiliPlayUrl(cid, bvid) {
    return new Promise((resolve, reject) => {
        try {
            const apiUrl = `https://api.bilibili.com/x/player/playurl?cid=${cid}&bvid=${bvid}&qn=64&fnval=16&fourk=1`;
            const parsedUrl = new URL(apiUrl);
            const options = {
                hostname: parsedUrl.hostname,
                path: parsedUrl.pathname + parsedUrl.search,
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://www.bilibili.com/',
                    'Origin': 'https://www.bilibili.com',
                    'Accept': 'application/json, text/plain, */*',
                    'Cookie': 'buvid3=; b_nut=; CURRENT_FNVAL=4048;'
                },
                timeout: 10000
            };

            const req = https.get(options, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    try {
                        const json = JSON.parse(data);
                        if (json.code === 0 && json.data) {
                            resolve(json.data);
                        } else {
                            reject(new Error(json.message || '获取播放地址失败'));
                        }
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            req.on('error', reject);
            req.on('timeout', () => { req.destroy(); reject(new Error('请求超时')); });
        } catch (e) {
            reject(e);
        }
    });
}

async function parseVideoWithYtdlp(videoUrl) {
    return new Promise(async (resolve, reject) => {
        if (!ytdlp) {
            reject(new Error('yt-dlp 未安装'));
            return;
        }
        
        try {
            console.log('[yt-dlp] 开始解析视频:', videoUrl);
            
            const videoInfo = await ytdlp.getVideoInfo([
                videoUrl,
                '--no-playlist',
                '--format', 'bestvideo+bestaudio/best',
                '--dump-single-json',
                '--skip-download',
                '--user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                '--referer', 'https://www.bilibili.com/'
            ]);
            
            const info = typeof videoInfo === 'string' ? JSON.parse(videoInfo) : videoInfo;
            
            const videoUrls = [];
            const audioUrls = [];
            
            if (info.requested_downloads && Array.isArray(info.requested_downloads)) {
                info.requested_downloads.forEach(d => {
                    if (d.url && d.vcodec && d.vcodec !== 'none') {
                        videoUrls.push(d.url);
                    }
                    if (d.url && d.acodec && d.acodec !== 'none') {
                        audioUrls.push(d.url);
                    }
                });
            }
            
            if (info.formats && Array.isArray(info.formats)) {
                info.formats.forEach(f => {
                    if (f.url && f.vcodec && f.vcodec !== 'none') {
                        if (!videoUrls.includes(f.url)) {
                            videoUrls.push(f.url);
                        }
                    }
                    if (f.url && f.acodec && f.acodec !== 'none' && (!f.vcodec || f.vcodec === 'none')) {
                        if (!audioUrls.includes(f.url)) {
                            audioUrls.push(f.url);
                        }
                    }
                });
            }
            
            if (videoUrls.length === 0 && info.url) {
                videoUrls.push(info.url);
            }
            
            const coverUrl = info.thumbnail || (info.thumbnails && info.thumbnails[0]?.url) || '';
            const title = info.title || '';
            const description = info.description || info.desc || '';
            const author = info.uploader || info.creator || '';
            
            console.log('[yt-dlp] 解析成功:', title, '视频格式:', videoUrls.length, '音频格式:', audioUrls.length);
            
            resolve({
                success: true,
                videoUrls: videoUrls,
                audioUrls: audioUrls,
                coverUrl: coverUrl.startsWith('//') ? 'https:' + coverUrl : coverUrl,
                title: title,
                description: description,
                author: author,
                duration: info.duration,
                width: info.width,
                height: info.height
            });
        } catch (e) {
            console.error('[yt-dlp] 解析失败:', e.message);
            reject(e);
        }
    });
}

function mergeVideoAudio(videoUrl, audioUrl, outputPath) {
    return new Promise((resolve, reject) => {
        try {
            console.log('[ffmpeg] 开始合并音视频');
            console.log('[ffmpeg] 输出:', outputPath);
            
            const command = ffmpeg(videoUrl)
                .input(audioUrl)
                .outputOptions('-c:v', 'copy')
                .outputOptions('-c:a', 'aac')
                .outputOptions('-b:a', '192k')
                .outputOptions('-shortest')
                .outputOptions('-headers', 'Referer: https://www.bilibili.com\r\n')
                .outputOptions('-headers', 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36\r\n')
                .on('end', () => {
                    console.log('[ffmpeg] 合并完成');
                    resolve({ success: true, outputPath });
                })
                .on('error', (err) => {
                    console.error('[ffmpeg] 合并失败:', err.message);
                    reject(err);
                });
            
            command.save(outputPath);
        } catch (e) {
            reject(e);
        }
    });
}

ipcMain.handle('parse-video-url', async (event, videoUrl) => {
    let parseWindow = null;
    try {
        const isBilibili = videoUrl.includes('bilibili.com');
        const bvidMatch = videoUrl.match(/(BV[a-zA-Z0-9]{10,})/i);
        
        if (isBilibili && bvidMatch) {
            const bvid = bvidMatch[1];
            console.log('[B站视频解析] 使用API方案，bvid:', bvid);
            
            try {
                const videoInfo = await fetchBilibiliVideoInfo(bvid);
                console.log('[B站视频解析] 视频信息获取成功:', videoInfo.title);
                
                const cid = videoInfo.cid;
                const coverUrl = videoInfo.pic ? (videoInfo.pic.startsWith('//') ? 'https:' + videoInfo.pic : videoInfo.pic) : '';
                const title = videoInfo.title || '';
                const description = videoInfo.desc || '';
                const author = videoInfo.owner?.name || '';
                
                const videoUrls = [];
                const audioUrls = [];
                
                try {
                    const playData = await fetchBilibiliPlayUrl(cid, bvid);
                    console.log('[B站视频解析] 播放地址获取成功');
                    
                    if (playData.durl && Array.isArray(playData.durl) && playData.durl.length > 0) {
                        playData.durl.forEach(d => {
                            if (d.url) videoUrls.push(d.url);
                            if (d.backup_url && Array.isArray(d.backup_url)) {
                                d.backup_url.forEach(u => { if (u) videoUrls.push(u); });
                            }
                        });
                        console.log('[B站视频解析] 找到durl格式视频:', videoUrls.length, '个');
                    }
                    
                    if (playData.dash) {
                        if (playData.dash.video && Array.isArray(playData.dash.video)) {
                            playData.dash.video.forEach(v => {
                                if (v.baseUrl && !videoUrls.includes(v.baseUrl)) {
                                    videoUrls.push(v.baseUrl);
                                }
                                if (v.backupUrl && Array.isArray(v.backupUrl)) {
                                    v.backupUrl.forEach(u => { if (u && !videoUrls.includes(u)) videoUrls.push(u); });
                                }
                            });
                        }
                        if (playData.dash.audio && Array.isArray(playData.dash.audio)) {
                            playData.dash.audio.forEach(a => {
                                if (a.baseUrl) audioUrls.push(a.baseUrl);
                                if (a.backupUrl && Array.isArray(a.backupUrl)) {
                                    a.backupUrl.forEach(u => { if (u) audioUrls.push(u); });
                                }
                            });
                        }
                        console.log('[B站视频解析] DASH格式: 视频', playData.dash.video?.length, '个, 音频', playData.dash.audio?.length, '个');
                    }
                } catch (playErr) {
                    console.warn('[B站视频解析] 获取播放地址失败，回退到yt-dlp:', playErr.message);
                }
                
                if (videoUrls.length > 0) {
                    return {
                        success: true,
                        videoUrls: videoUrls,
                        audioUrls: audioUrls,
                        coverUrl: coverUrl,
                        title: title,
                        description: description,
                        author: author
                    };
                } else {
                    console.warn('[B站视频解析] API方案未找到视频地址，尝试yt-dlp');
                }
            } catch (apiErr) {
                console.warn('[B站视频解析] API方案失败，尝试yt-dlp:', apiErr.message);
            }
            
            if (ytdlp) {
                try {
                    const ytdlpResult = await parseVideoWithYtdlp(videoUrl);
                    if (ytdlpResult.success && ytdlpResult.videoUrls.length > 0) {
                        return ytdlpResult;
                    }
                } catch (ytdlpErr) {
                    console.warn('[B站视频解析] yt-dlp方案失败，回退到页面解析:', ytdlpErr.message);
                }
            }
        }

        parseWindow = new BrowserWindow({
            width: 1280,
            height: 800,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                javascript: true,
                images: false
            }
        });

        parseWindow.webContents.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        await parseWindow.loadURL(videoUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 20000
        });

        await new Promise(resolve => setTimeout(resolve, 3000));

        const videoData = await parseWindow.webContents.executeJavaScript(`
            (function() {
                function decodeJsonStr(s) {
                    if (!s) return '';
                    let result = s;
                    try {
                        result = JSON.parse('"' + s.replace(/"/g, '\\\\"') + '"');
                    } catch(e) {
                        result = result.replace(/\\\\u([0-9a-fA-F]{4})/g, function(m, hex) {
                            return String.fromCharCode(parseInt(hex, 16));
                        });
                        result = result.replace(/\\\\x([0-9a-fA-F]{2})/g, function(m, hex) {
                            return String.fromCharCode(parseInt(hex, 16));
                        });
                        result = result.replace(/\\\\n/g, '\\n').replace(/\\\\"/g, '"').replace(/\\\\t/g, '\\t').replace(/\\\\r/g, '').replace(/\\\\\\\\/g, '\\\\').replace(/\\\\\\//g, '/');
                    }
                    return result;
                }

                const result = {
                    videoUrls: [],
                    audioUrls: [],
                    coverUrl: '',
                    title: '',
                    description: '',
                    author: ''
                };

                const scripts = document.querySelectorAll('script');
                let playInfo = null;
                let initialState = null;
                let noteData = null;

                function extractJsonAfter(text, keyword) {
                    const startIdx = text.indexOf(keyword);
                    if (startIdx === -1) return null;
                    const braceStart = text.indexOf('{', startIdx);
                    if (braceStart === -1) return null;
                    
                    let braceCount = 0;
                    let endIdx = -1;
                    let inString = false;
                    let stringChar = '';
                    let escapeNext = false;
                    
                    for (let i = braceStart; i < text.length; i++) {
                        const char = text[i];
                        
                        if (escapeNext) {
                            escapeNext = false;
                            continue;
                        }
                        
                        if (char === '\\\\' && inString) {
                            escapeNext = true;
                            continue;
                        }
                        
                        if ((char === '"' || char === "'") && !inString) {
                            inString = true;
                            stringChar = char;
                            continue;
                        }
                        
                        if (char === stringChar && inString) {
                            inString = false;
                            stringChar = '';
                            continue;
                        }
                        
                        if (inString) continue;
                        
                        if (char === '{') braceCount++;
                        else if (char === '}') {
                            braceCount--;
                            if (braceCount === 0) {
                                endIdx = i + 1;
                                break;
                            }
                        }
                    }
                    
                    if (endIdx > 0) {
                        try {
                            return JSON.parse(text.substring(braceStart, endIdx));
                        } catch(e) {
                            return null;
                        }
                    }
                    return null;
                }

                for (const script of scripts) {
                    const text = script.textContent || '';

                    if (text.includes('window.__playinfo__') && !playInfo) {
                        playInfo = extractJsonAfter(text, 'window.__playinfo__');
                    }

                    if (text.includes('window.__INITIAL_STATE__') && !initialState) {
                        initialState = extractJsonAfter(text, 'window.__INITIAL_STATE__');
                    }
                    
                    if (text.includes('window.__INITIAL_SSR_STATE__') && !initialState) {
                        initialState = extractJsonAfter(text, 'window.__INITIAL_SSR_STATE__');
                    }
                }

                if (playInfo && playInfo.data) {
                    if (playInfo.data.durl && Array.isArray(playInfo.data.durl)) {
                        playInfo.data.durl.forEach(v => {
                            if (v.url) result.videoUrls.push(v.url);
                            if (v.backup_url && Array.isArray(v.backup_url)) {
                                v.backup_url.forEach(u => { if (u) result.videoUrls.push(u); });
                            }
                        });
                    }
                    if (playInfo.data.dash) {
                        if (playInfo.data.dash.video && Array.isArray(playInfo.data.dash.video)) {
                            playInfo.data.dash.video.forEach(v => {
                                if (v.baseUrl && !result.videoUrls.includes(v.baseUrl)) {
                                    result.videoUrls.push(v.baseUrl);
                                }
                                if (v.backupUrl && Array.isArray(v.backupUrl)) {
                                    v.backupUrl.forEach(u => { if (u && !result.videoUrls.includes(u)) result.videoUrls.push(u); });
                                }
                            });
                        }
                        if (playInfo.data.dash.audio && Array.isArray(playInfo.data.dash.audio)) {
                            playInfo.data.dash.audio.forEach(a => {
                                if (a.baseUrl) result.audioUrls.push(a.baseUrl);
                                if (a.backupUrl && Array.isArray(a.backupUrl)) {
                                    a.backupUrl.forEach(u => { if (u) result.audioUrls.push(u); });
                                }
                            });
                        }
                    }
                }

                if (initialState) {
                    if (initialState.videoData) {
                        const vd = initialState.videoData;
                        if (vd.title && !result.title) result.title = vd.title;
                        if (vd.desc && !result.description) result.description = vd.desc;
                        if (vd.owner?.name && !result.author) result.author = vd.owner.name;
                        if (vd.pic && !result.coverUrl) {
                            result.coverUrl = vd.pic.startsWith('//') ? 'https:' + vd.pic : vd.pic;
                        }
                    }
                    
                    if (initialState.note) {
                        noteData = initialState.note;
                    } else if (initialState.noteDetailMap) {
                        const keys = Object.keys(initialState.noteDetailMap);
                        if (keys.length > 0) {
                            noteData = initialState.noteDetailMap[keys[0]]?.note;
                        }
                    } else if (initialState.feeds) {
                        const feeds = initialState.feeds;
                        if (Array.isArray(feeds) && feeds.length > 0) {
                            noteData = feeds[0]?.note || feeds[0];
                        }
                    }
                    
                    if (noteData) {
                        if (noteData.title && !result.title) {
                            result.title = typeof noteData.title === 'string' ? noteData.title : decodeJsonStr(noteData.title);
                        }
                        if (noteData.desc && !result.description) {
                            result.description = typeof noteData.desc === 'string' ? noteData.desc : decodeJsonStr(noteData.desc);
                        }
                        if (noteData.user?.nickname && !result.author) {
                            result.author = typeof noteData.user.nickname === 'string' ? noteData.user.nickname : decodeJsonStr(noteData.user.nickname);
                        }
                        
                        if (noteData.video) {
                            const video = noteData.video;
                            if (video.mediaUrl) {
                                const url = typeof video.mediaUrl === 'string' ? video.mediaUrl : decodeJsonStr(video.mediaUrl);
                                if (url && !result.videoUrls.includes(url)) result.videoUrls.push(url);
                            }
                            if (video.video_url) {
                                const url = typeof video.video_url === 'string' ? video.video_url : decodeJsonStr(video.video_url);
                                if (url && !result.videoUrls.includes(url)) result.videoUrls.push(url);
                            }
                            if (video.url) {
                                const url = typeof video.url === 'string' ? video.url : decodeJsonStr(video.url);
                                if (url && !result.videoUrls.includes(url)) result.videoUrls.push(url);
                            }
                            if (video.cover?.url_default && !result.coverUrl) {
                                const coverUrl = typeof video.cover.url_default === 'string' ? video.cover.url_default : decodeJsonStr(video.cover.url_default);
                                if (coverUrl) result.coverUrl = coverUrl;
                            }
                        }
                        
                        if (noteData.imageList && Array.isArray(noteData.imageList) && noteData.imageList.length > 0 && !result.coverUrl) {
                            const firstImg = noteData.imageList[0];
                            let coverUrl = '';
                            if (firstImg.url_default) {
                                coverUrl = typeof firstImg.url_default === 'string' ? firstImg.url_default : decodeJsonStr(firstImg.url_default);
                            } else if (firstImg.url) {
                                coverUrl = typeof firstImg.url === 'string' ? firstImg.url : decodeJsonStr(firstImg.url);
                            }
                            if (coverUrl) result.coverUrl = coverUrl;
                        }
                    }
                }

                for (const script of scripts) {
                    const text = script.textContent || '';

                    const videoPatterns = [
                        /"video"\s*:\s*"([^"]+\.mp4[^"]*)"/gi,
                        /"mediaUrl"\s*:\s*"([^"]+)"/gi,
                        /"videoUrl"\s*:\s*"([^"]+)"/gi,
                        /"video_url"\s*:\s*"([^"]+)"/gi,
                        /"masterUrl"\s*:\s*"([^"]+)"/gi,
                        /"url"\s*:\s*"([^"]+\.mp4[^"]*)"/gi
                    ];
                    videoPatterns.forEach(pat => {
                        let m;
                        while ((m = pat.exec(text)) !== null) {
                            const url = decodeJsonStr(m[1]);
                            if (url && url.length > 10 && !result.videoUrls.includes(url) && 
                                (url.includes('.mp4') || url.includes('m3u8') || url.includes('xhscdn') || url.includes('bilivideo') || url.includes('bilibili'))) {
                                result.videoUrls.push(url);
                            }
                        }
                    });

                    const coverMatch = text.match(/"cover"\s*:\s*"([^"]+)"/i);
                    if (coverMatch && !result.coverUrl) {
                        const cover = decodeJsonStr(coverMatch[1]);
                        if (cover && (cover.startsWith('http') || cover.startsWith('//'))) {
                            result.coverUrl = cover.startsWith('//') ? 'https:' + cover : cover;
                        }
                    }

                    const firstFrameMatch = text.match(/"firstFrame"\s*:\s*"([^"]+)"/i);
                    if (firstFrameMatch && !result.coverUrl) {
                        const frame = decodeJsonStr(firstFrameMatch[1]);
                        if (frame && (frame.startsWith('http') || frame.startsWith('//'))) {
                            result.coverUrl = frame.startsWith('//') ? 'https:' + frame : frame;
                        }
                    }

                    const picMatch = text.match(/"pic"\s*:\s*"([^"]+)"/i);
                    if (picMatch && !result.coverUrl) {
                        const pic = decodeJsonStr(picMatch[1]);
                        if (pic && (pic.startsWith('http') || pic.startsWith('//'))) {
                            result.coverUrl = pic.startsWith('//') ? 'https:' + pic : pic;
                        }
                    }

                    const titleMatch = text.match(/"title"\s*:\s*"([^"]{2,})"/);
                    if (titleMatch && !result.title) {
                        result.title = decodeJsonStr(titleMatch[1]);
                    }

                    const descMatch = text.match(/"desc"\s*:\s*"([^"]{5,})"/);
                    if (descMatch && !result.description) {
                        result.description = decodeJsonStr(descMatch[1]);
                    }
                    
                    const nicknameMatch = text.match(/"nickname"\s*:\s*"([^"]{2,})"/);
                    if (nicknameMatch && !result.author) {
                        result.author = decodeJsonStr(nicknameMatch[1]);
                    }
                }

                const ogTitle = document.querySelector('meta[property="og:title"]');
                if (ogTitle && !result.title) {
                    result.title = ogTitle.getAttribute('content') || '';
                }

                const ogImage = document.querySelector('meta[property="og:image"]');
                if (ogImage && !result.coverUrl) {
                    result.coverUrl = ogImage.getAttribute('content') || '';
                }

                const ogDesc = document.querySelector('meta[property="og:description"]');
                if (ogDesc && !result.description) {
                    result.description = ogDesc.getAttribute('content') || '';
                }

                const videoElements = document.querySelectorAll('video');
                videoElements.forEach(video => {
                    const src = video.src || video.querySelector('source')?.src;
                    if (src) {
                        if (!result.videoUrls.includes(src)) {
                            result.videoUrls.push(src);
                        }
                    }
                    const poster = video.poster;
                    if (poster && !result.coverUrl) {
                        result.coverUrl = poster;
                    }
                });

                return result;
            })()
        `);

        parseWindow.close();
        parseWindow = null;

        return {
            success: true,
            videoUrls: videoData.videoUrls || [],
            audioUrls: videoData.audioUrls || [],
            coverUrl: videoData.coverUrl || '',
            title: videoData.title || '',
            description: videoData.description || '',
            author: videoData.author || ''
        };
    } catch (error) {
        if (parseWindow) {
            try { parseWindow.close(); } catch (e) {}
            parseWindow = null;
        }
        return { success: false, error: error.message };
    }
});

ipcMain.handle('fetch-rendered-url', async (event, url) => {
    let renderWindow = null;
    try {
        renderWindow = new BrowserWindow({
            width: 1280,
            height: 800,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                javascript: true,
                images: true
            }
        });

        renderWindow.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        let loaded = false;
        const loadPromise = renderWindow.loadURL(url, {
            waitUntil: 'domcontentloaded',
            timeout: 20000
        }).then(() => { loaded = true; });

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('加载超时')), 25000);
        });

        try {
            await Promise.race([loadPromise, timeoutPromise]);
        } catch (e) {
            if (!loaded) throw e;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            await renderWindow.webContents.executeJavaScript(`
                (function() {
                    window.scrollTo(0, document.body.scrollHeight / 2);
                })()
            `);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await renderWindow.webContents.executeJavaScript(`
                (function() {
                    window.scrollTo(0, document.body.scrollHeight);
                })()
            `);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await renderWindow.webContents.executeJavaScript(`
                (function() {
                    window.scrollTo(0, 0);
                })()
            `);
        } catch (e) {}
        
        const hasAnchorComment = url.includes('anchorCommentId');
        let extractedComment = null;
        let extractDebugInfo = {
            hasAnchorComment: hasAnchorComment,
            steps: [],
            finalResult: null
        };
        
        if (hasAnchorComment) {
            try {
                extractDebugInfo.steps.push({ step: 'start', message: '开始提取评论' });
                
                let anchorId = '';
                try {
                    const urlObj = new URL(url);
                    anchorId = urlObj.searchParams.get('anchorCommentId') || '';
                } catch(e) {}
                
                extractDebugInfo.steps.push({ step: 'anchorId', anchorId: anchorId });
                
                await renderWindow.webContents.executeJavaScript(`
                    (function() {
                        window.scrollTo(0, document.body.scrollHeight);
                    })()
                `);
                await new Promise(resolve => setTimeout(resolve, 1500));
                await renderWindow.webContents.executeJavaScript(`
                    (function() {
                        window.scrollTo(0, 0);
                    })()
                `);
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const extractorScript = `
                    (function() {
                        function decodeJsonStr(s) {
                            try {
                                return JSON.parse('"' + s.replace(/"/g, '\\\\"') + '"');
                            } catch(e) { return s; }
                        }
                        
                        function tryScriptExtraction() {
                            try {
                                const scripts = document.querySelectorAll('script');
                                for (const script of scripts) {
                                    const text = script.textContent || '';
                                    if (text.length < 5000) continue;
                                    
                                    const noteDetailMatch = text.match(/window\\.__INITIAL_STATE__\\s*=\\s*({.*?})/);
                                    if (noteDetailMatch) {
                                        try {
                                            const state = JSON.parse(noteDetailMatch[1]);
                                            const comment = findCommentInState(state);
                                            if (comment) return comment;
                                        } catch(e) {}
                                    }
                                    
                                    const commentMatches = text.match(/"content"\\s*:\\s*"([^"]{10,})"/g);
                                    const userMatches = text.match(/"nickname"\\s*:\\s*"([^"]{2,})"/g);
                                    
                                    if (commentMatches && commentMatches.length > 0) {
                                        for (let i = 0; i < commentMatches.length && i < 5; i++) {
                                            const content = decodeJsonStr(commentMatches[i].replace(/.*:\\s*"/, '').replace(/"$/, ''));
                                            let author = '';
                                            if (userMatches && userMatches[i]) {
                                                author = decodeJsonStr(userMatches[i].replace(/.*:\\s*"/, '').replace(/"$/, ''));
                                            }
                                            if (content && content.length > 5 && content.length < 500) {
                                                return { author: author.substring(0, 20), content: content, from: 'script_regex' };
                                            }
                                        }
                                    }
                                }
                            } catch(e) {}
                            return null;
                        }
                        
                        function findCommentInState(state) {
                            try {
                                const note = state.note || state.noteDetail || {};
                                const comments = note.comments || state.comments || {};
                                const commentList = comments.list || comments.comments || [];
                                
                                if (Array.isArray(commentList) && commentList.length > 0) {
                                    const first = commentList[0];
                                    if (first.content || first.text) {
                                        return {
                                            author: (first.user?.nickname || first.nickname || '').substring(0, 20),
                                            content: first.content || first.text || '',
                                            from: 'initial_state'
                                        };
                                    }
                                }
                            } catch(e) {}
                            return null;
                        }
                        
                        function tryDomExtraction() {
                            try {
                                const candidates = [];
                                
                                const allDivs = document.querySelectorAll('div');
                                allDivs.forEach(el => {
                                    const text = (el.textContent || '').trim();
                                    if (text.length < 10 || text.length > 300) return;
                                    
                                    let score = 0;
                                    const classStr = el.className || '';
                                    const idStr = el.id || '';
                                    const parentClass = el.parentElement?.className || '';
                                    const grandParentClass = el.parentElement?.parentElement?.className || '';
                                    
                                    const classAndId = classStr + ' ' + idStr + ' ' + parentClass + ' ' + grandParentClass;
                                    
                                    if (/comment/i.test(classAndId)) score += 5;
                                    if (/item/i.test(classAndId)) score += 2;
                                    if (/list/i.test(classAndId)) score += 1;
                                    if (/content/i.test(classAndId)) score += 2;
                                    if (/reply/i.test(classAndId)) score += 1;
                                    
                                    const childCount = el.children?.length || 0;
                                    if (childCount >= 2 && childCount <= 8) score += 1;
                                    
                                    const hasImg = el.querySelector('img');
                                    if (hasImg) score += 1;
                                    
                                    const textNoSpace = text.replace(/\\s+/g, '');
                                    if (textNoSpace.length > 15 && textNoSpace.length < 200) score += 1;
                                    
                                    if (text.includes('回复') || text.includes('赞') || text.includes('举报')) score -= 2;
                                    if (text.length > 200) score -= 1;
                                    
                                    if (score >= 5) {
                                        candidates.push({ el, score, text });
                                    }
                                });
                                
                                candidates.sort((a, b) => b.score - a.score);
                                
                                for (const cand of candidates.slice(0, 5)) {
                                    let author = '';
                                    const parent = cand.el.parentElement || cand.el;
                                    
                                    const authorSelectors = ['[class*=name]', '[class*=nickname]', '[class*=user]', '[class*=author]', 'a[href*=user]'];
                                    for (const sel of authorSelectors) {
                                        const el = parent.querySelector(sel);
                                        if (el && el.textContent.trim().length < 20) {
                                            author = el.textContent.trim();
                                            break;
                                        }
                                    }
                                    
                                    if (!author) {
                                        const firstChild = cand.el.children[0];
                                        if (firstChild && firstChild.textContent.trim().length < 20) {
                                            author = firstChild.textContent.trim();
                                        }
                                    }
                                    
                                    let content = cand.text;
                                    if (author && content.startsWith(author)) {
                                        content = content.substring(author.length).trim();
                                    }
                                    
                                    if (content.length > 5) {
                                        return { author: author.substring(0, 20), content: content, from: 'dom_analysis' };
                                    }
                                }
                            } catch(e) {}
                            return null;
                        }
                        
                        function tryTextSearchExtraction() {
                            try {
                                const bodyText = document.body.innerText || '';
                                const lines = bodyText.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
                                
                                let commentStart = -1;
                                for (let i = 0; i < lines.length; i++) {
                                    const line = lines[i];
                                    if (/共\\s*\\d+\\s*条/.test(line) || /评论/.test(line) && line.length < 10) {
                                        commentStart = i + 1;
                                        break;
                                    }
                                }
                                
                                if (commentStart > 0 && commentStart < lines.length) {
                                    let author = '';
                                    let content = '';
                                    
                                    for (let i = commentStart; i < Math.min(commentStart + 10, lines.length); i++) {
                                        const line = lines[i];
                                        if (line.length < 2) continue;
                                        if (/回复|赞|举报|查看更多|展开/.test(line)) continue;
                                        
                                        if (!author && line.length < 20) {
                                            author = line;
                                            continue;
                                        }
                                        
                                        if (author && !content) {
                                            content = line;
                                            if (content.length > 5) {
                                                return { author: author.substring(0, 20), content: content, from: 'text_search' };
                                            }
                                        }
                                    }
                                }
                            } catch(e) {}
                            return null;
                        }
                        
                        const strategies = [
                            { name: 'script', fn: tryScriptExtraction },
                            { name: 'dom', fn: tryDomExtraction },
                            { name: 'text_search', fn: tryTextSearchExtraction }
                        ];
                        
                        for (const s of strategies) {
                            try {
                                const result = s.fn();
                                if (result && result.content && result.content.length > 5) {
                                    return result;
                                }
                            } catch(e) {}
                        }
                        
                        return null;
                    })()
                `;
                
                for (let i = 0; i < 6; i++) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    try {
                        const result = await renderWindow.webContents.executeJavaScript(extractorScript);
                        if (result && result.content && result.content.length > 5) {
                            extractedComment = result;
                            extractDebugInfo.steps.push({ step: 'success', attempt: i, from: result.from, content: result.content.substring(0, 50) });
                            break;
                        } else {
                            extractDebugInfo.steps.push({ step: 'attempt', attempt: i, result: 'not_found' });
                        }
                    } catch(e) {
                        extractDebugInfo.steps.push({ step: 'error', attempt: i, error: e.message });
                    }
                }
                
                if (!extractedComment) {
                    extractDebugInfo.steps.push({ step: 'all_failed', message: '所有策略均未提取到评论' });
                }
                
            } catch (e) {
                console.log('提取评论失败:', e.message);
                extractDebugInfo.steps.push({ step: 'error', error: e.message });
            }
        }
        
        extractDebugInfo.finalResult = extractedComment ? 'success' : 'failed';

        try {
            await renderWindow.webContents.executeJavaScript(`
                (async function() {
                    window.scrollTo(0, 0);
                    await new Promise(r => setTimeout(r, 500));
                    
                    const totalHeight = document.body.scrollHeight;
                    const viewportHeight = window.innerHeight;
                    let currentScroll = 0;
                    const scrollStep = viewportHeight * 0.8;
                    const scrollDelay = 300;
                    
                    while (currentScroll < totalHeight) {
                        window.scrollBy(0, scrollStep);
                        currentScroll += scrollStep;
                        await new Promise(r => setTimeout(r, scrollDelay));
                    }
                    
                    window.scrollTo(0, 0);
                    await new Promise(r => setTimeout(r, 500));
                    
                    const images = document.querySelectorAll('img');
                    images.forEach(img => {
                        const dataSrc = img.getAttribute('data-src') || img.getAttribute('data-lazy-src') || img.getAttribute('data-original');
                        if (dataSrc && !img.src) {
                            img.src = dataSrc;
                        }
                    });
                    
                    await new Promise(r => setTimeout(r, 1000));
                })()
            `);
        } catch (e) {
            console.log('滚动加载图片失败:', e.message);
        }

        const renderedHtml = await renderWindow.webContents.executeJavaScript(`
            (function() {
                const baseUrl = window.location.href;
                
                const lazyAttrs = [
                    'data-src', 'data-lazy-src', 'data-original', 'data-srcset',
                    'data-original-src', 'data-actualsrc', 'data-thumb',
                    'data-preview', 'data-url', 'data-image', 'data-imgurl',
                    'data-big', 'data-real', 'data-lazyload'
                ];
                
                const images = document.querySelectorAll('img');
                images.forEach(img => {
                    let src = img.getAttribute('src') || '';
                    let bestSrc = '';
                    
                    for (const attr of lazyAttrs) {
                        const val = img.getAttribute(attr);
                        if (val && val.length > 10 && (val.includes('http') || val.startsWith('//') || val.startsWith('/'))) {
                            if (!bestSrc || val.length > bestSrc.length) {
                                bestSrc = val;
                            }
                        }
                    }
                    
                    if (bestSrc && (!src || !src.includes('http') || src.includes('placeholder') || src.includes('loading'))) {
                        try {
                            const absoluteUrl = bestSrc.startsWith('http') ? bestSrc : 
                                               bestSrc.startsWith('//') ? 'https:' + bestSrc :
                                               new URL(bestSrc, baseUrl).href;
                            img.setAttribute('src', absoluteUrl);
                            img.setAttribute('data-src', absoluteUrl);
                        } catch(e) {}
                    } else if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('blob:')) {
                        try {
                            const absoluteUrl = src.startsWith('//') ? 'https:' + src : new URL(src, baseUrl).href;
                            img.setAttribute('src', absoluteUrl);
                        } catch(e) {}
                    }
                });
                
                const bgImages = document.querySelectorAll('[style*="background-image"]');
                bgImages.forEach(el => {
                    const style = el.getAttribute('style') || '';
                    const bgMatch = style.match(/url\(["']?([^"')]+)["']?\)/);
                    if (bgMatch && bgMatch[1] && !bgMatch[1].startsWith('http') && !bgMatch[1].startsWith('data:')) {
                        try {
                            const absoluteUrl = bgMatch[1].startsWith('//') ? 'https:' + bgMatch[1] : new URL(bgMatch[1], baseUrl).href;
                            el.setAttribute('style', style.replace(bgMatch[1], absoluteUrl));
                        } catch(e) {}
                    }
                });
                
                const allElements = document.querySelectorAll('*');
                allElements.forEach(el => {
                    for (const attr of lazyAttrs) {
                        const val = el.getAttribute(attr);
                        if (val && val.length > 10 && (val.includes('.jpg') || val.includes('.png') || val.includes('.jpeg') || val.includes('.gif') || val.includes('.webp'))) {
                            if (!el.getAttribute('src') && el.tagName === 'IMG') {
                                try {
                                    const absoluteUrl = val.startsWith('http') ? val : 
                                                       val.startsWith('//') ? 'https:' + val :
                                                       new URL(val, baseUrl).href;
                                    el.setAttribute('src', absoluteUrl);
                                } catch(e) {}
                            }
                        }
                    }
                });
                
                return '<!DOCTYPE html><html><head><base href="' + baseUrl + '">' + document.head.innerHTML + '</head><body>' + document.body.innerHTML + '</body></html>';
            })()
        `);

        const title = await renderWindow.webContents.executeJavaScript('document.title || ""');

        renderWindow.close();
        renderWindow = null;

        return { 
            success: true, 
            data: renderedHtml, 
            title: title,
            commentData: extractedComment,
            commentDebugInfo: extractDebugInfo
        };
    } catch (error) {
        if (renderWindow) {
            try { renderWindow.close(); } catch (e) {}
            renderWindow = null;
        }
        return { success: false, error: error.message };
    }
});

app.whenReady().then(() => {
  startProxyServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (proxyServer) {
    proxyServer.close();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

module.exports = { proxyPort };
