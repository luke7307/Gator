const http = require('http');
const https = require('https');
const url = require('url');

// 与 gator-electron/main.js 的 startProxyServer 逻辑保持一致
// 供浏览器环境直接打开 index.html 时使用：node proxy-server.js
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const targetUrl = parsedUrl.query.url;
    const isMedia = parsedUrl.query.media === '1' || parsedUrl.query.type === 'video';
    const referer = parsedUrl.query.referer || '';

    // 根路径：状态页
    if (parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end(`
            <html>
            <head><meta charset="utf-8"><title>Gator 代理服务</title></head>
            <body style="font-family:system-ui;padding:40px;">
            <h1>Gator 代理服务已启动</h1>
            <p>状态：运行中 (端口 3000)</p>
            <p>用法：在浏览器中打开 gator-electron/www/index.html 即可使用。</p>
            </body>
            </html>
        `);
        return;
    }

    if (parsedUrl.pathname !== '/fetch') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Not found');
        return;
    }

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

    // 按站点设置 Referer/Origin（与 main.js 对齐）
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
    } else if (targetUrl.includes('juejin.cn')) {
        headers['Referer'] = 'https://juejin.cn/';
        headers['Origin'] = 'https://juejin.cn';
    } else if (targetUrl.includes('zhihu.com')) {
        headers['Referer'] = 'https://www.zhihu.com/';
    } else if (targetUrl.includes('apple.com')) {
        headers['Referer'] = 'https://developer.apple.com/';
    } else if (targetUrl.includes('csdn.net') || targetUrl.includes('csdnimg.cn')) {
        headers['Referer'] = 'https://www.csdn.net/';
    } else if (targetUrl.includes('hupu.com') || targetUrl.includes('hoopchina.com.cn')) {
        headers['Referer'] = 'https://www.hupu.com/';
    } else if (targetUrl.includes('douyin.com') || targetUrl.includes('iesdouyin.com')) {
        headers['Referer'] = 'https://www.douyin.com/';
        headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
    } else if (targetUrl.includes('weixin.qq.com') || targetUrl.includes('mp.weixin.qq.com')) {
        headers['Referer'] = 'https://mp.weixin.qq.com/';
    }

    if (req.headers['range']) {
        headers['Range'] = req.headers['range'];
    }
    headers['Accept-Encoding'] = 'identity';

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
                if (targetRes.headers['content-type']) resHeaders['Content-Type'] = targetRes.headers['content-type'];
                if (targetRes.headers['content-length']) resHeaders['Content-Length'] = targetRes.headers['content-length'];
                if (targetRes.headers['content-range']) resHeaders['Content-Range'] = targetRes.headers['content-range'];
                if (targetRes.headers['cache-control']) resHeaders['Cache-Control'] = targetRes.headers['cache-control'];

                const statusCode = targetRes.statusCode === 206 ? 206 : 200;
                res.writeHead(statusCode, resHeaders);
                targetRes.pipe(res);
            } else {
                let data = [];
                targetRes.on('data', (chunk) => { data.push(chunk); });
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

server.listen(3000, '127.0.0.1', () => {
    console.log('Gator 代理服务器已启动: http://127.0.0.1:3000');
    console.log('现在可在浏览器中打开 gator-electron/www/index.html 使用 Gator');
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error('端口 3000 已被占用，可能代理服务已在运行。');
    } else {
        console.error('启动失败:', err.message);
    }
    process.exit(1);
});
