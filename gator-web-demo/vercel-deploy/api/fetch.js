// Vercel Serverless Function - CORS 代理
// 部署后自动作为 Gator 的后端代理，无需额外配置
const https = require('https');
const http = require('http');

function getHeaders(targetUrl, isMedia, referer) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': isMedia ? '*/*' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'identity',
    };

    if (referer) {
        headers['Referer'] = referer;
    } else if (targetUrl.includes('bilibili.com') || targetUrl.includes('bilivideo.com')) {
        headers['Referer'] = 'https://www.bilibili.com/';
        headers['Origin'] = 'https://www.bilibili.com';
    } else if (targetUrl.includes('xiaohongshu.com') || targetUrl.includes('xhscdn.com')) {
        headers['Referer'] = 'https://www.xiaohongshu.com/';
        headers['Origin'] = 'https://www.xiaohongshu.com';
    } else if (targetUrl.includes('coolapk.com')) {
        headers['Referer'] = 'https://www.coolapk.com/';
        headers['Origin'] = 'https://www.coolapk.com';
    } else if (targetUrl.includes('juejin.cn')) {
        headers['Referer'] = 'https://juejin.cn/';
    } else if (targetUrl.includes('csdn.net')) {
        headers['Referer'] = 'https://www.csdn.net/';
    } else if (targetUrl.includes('hupu.com')) {
        headers['Referer'] = 'https://www.hupu.com/';
    } else if (targetUrl.includes('douyin.com') || targetUrl.includes('iesdouyin.com')) {
        headers['Referer'] = 'https://www.douyin.com/';
        headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
    } else if (targetUrl.includes('weixin.qq.com') || targetUrl.includes('mp.weixin.qq.com')) {
        headers['Referer'] = 'https://mp.weixin.qq.com/';
    }

    return headers;
}

module.exports = async (req, res) => {
    // CORS 预检
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range,Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const targetUrl = req.query.url;
    if (!targetUrl) {
        res.status(400).json({ error: '缺少 url 参数' });
        return;
    }

    const isMedia = req.query.media === '1' || req.query.type === 'video';
    const referer = req.query.referer || '';
    const isHttps = targetUrl.startsWith('https://');
    const httpModule = isHttps ? https : http;

    const headers = getHeaders(targetUrl, isMedia, referer);
    if (req.headers['range']) {
        headers['Range'] = req.headers['range'];
    }

    try {
        const parsed = new URL(targetUrl);
        const options = {
            hostname: parsed.hostname,
            port: parsed.port || (isHttps ? 443 : 80),
            path: parsed.pathname + parsed.search,
            method: 'GET',
            headers: headers,
            timeout: 20000
        };

        const proxyReq = httpModule.request(options, (targetRes) => {
            if (isMedia) {
                const resHeaders = {
                    'Access-Control-Allow-Origin': '*',
                    'Accept-Ranges': targetRes.headers['accept-ranges'] || 'bytes',
                };
                if (targetRes.headers['content-type']) resHeaders['Content-Type'] = targetRes.headers['content-type'];
                if (targetRes.headers['content-length']) resHeaders['Content-Length'] = targetRes.headers['content-length'];
                if (targetRes.headers['content-range']) resHeaders['Content-Range'] = targetRes.headers['content-range'];

                res.status(targetRes.statusCode === 206 ? 206 : 200);
                Object.entries(resHeaders).forEach(([k, v]) => res.setHeader(k, v));
                targetRes.pipe(res);
            } else {
                const chunks = [];
                targetRes.on('data', (chunk) => chunks.push(chunk));
                targetRes.on('end', () => {
                    const content = Buffer.concat(chunks).toString('utf-8');
                    res.status(200).setHeader('Content-Type', 'text/html;charset=utf-8');
                    res.send(content);
                });
            }
        });

        proxyReq.on('error', (err) => {
            res.status(500).json({ error: err.message });
        });

        proxyReq.on('timeout', () => {
            proxyReq.destroy();
            res.status(504).json({ error: '请求超时' });
        });

        proxyReq.end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
