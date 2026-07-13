const URL_PARSER = {
    platforms: {
        xiaohongshu: {
            name: '小红书',
            emoji: '📕',
            patterns: [
                /^(?:https?:\/\/)?(?:www\.)?xiaohongshu\.com\/explore\/(?:item\/)?([0-9a-f]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?xiaohongshu\.com\/discovery\/(?:item\/)?([0-9a-f]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?xiaohongshu\.com\/note\/([0-9a-f]+)/i,
                /^(?:https?:\/\/)?xhslink\.com\/[a-zA-Z0-9]+/i,
                /^(?:https?:\/\/)?(?:www\.)?xiaohongshu\.com\/[^/]+\/([0-9a-f]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        return {
                            platform: 'xiaohongshu',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1],
                            url: url,
                            type: 'note'
                        };
                    }
                }
                return null;
            }
        },
        weibo: {
            name: '微博',
            emoji: '📱',
            patterns: [
                /^(?:https?:\/\/)?(?:www\.)?weibo\.com\/[0-9]+\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?weibo\.cn\/[0-9]+\/([0-9]+)/i,
                /^(?:https?:\/\/)?m\.weibo\.cn\/[0-9]+\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?weibo\.com\/detail\/([0-9]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        return {
                            platform: 'weibo',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1],
                            url: url,
                            type: 'post'
                        };
                    }
                }
                return null;
            }
        },
        douyin: {
            name: '抖音',
            emoji: '🎵',
            patterns: [
                /^(?:https?:\/\/)?(?:www\.)?douyin\.com\/video\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?douyin\.com\/share\/video\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?douyin\.com\/user\/[0-9]+\/video\/([0-9]+)/i,
                /^(?:https?:\/\/)?v\.douyin\.com\/[a-zA-Z0-9]+/i,
                /^(?:https?:\/\/)?douyin\.tv\/video\/([0-9]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        return {
                            platform: 'douyin',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1] || 'short',
                            url: url,
                            type: 'video'
                        };
                    }
                }
                return null;
            }
        },
        bilibili: {
            name: '哔哩哔哩',
            emoji: '📺',
            patterns: [
                /^(?:https?:\/\/)?(?:www\.)?bilibili\.com\/video\/([a-zA-Z0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?bilibili\.com\/watchlater\/.*?av([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?bilibili\.com\/media\/md([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?b23\.tv\/[a-zA-Z0-9]+/i,
                /^(?:https?:\/\/)?(?:www\.)?bilibili\.com\/live\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?bilibili\.com\/read\/cv([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?bilibili\.com\/read\/mobile\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?bilibili\.com\/opus\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?bilibili\.com\/opus\/([a-zA-Z0-9]+)/i,
                /^(?:https?:\/\/)?t\.bilibili\.com\/([0-9]+)/i,
                /^(?:https?:\/\/)?m\.bilibili\.com\/opus\/([0-9]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        const isLive = url.includes('/live/');
                        const isArticle = url.includes('/read/');
                        const isOpus = url.includes('/opus/') || url.includes('t.bilibili.com');
                        let type = 'video';
                        if (isLive) type = 'live';
                        else if (isArticle) type = 'article';
                        else if (isOpus) type = 'opus';
                        return {
                            platform: 'bilibili',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1],
                            url: url,
                            type: type
                        };
                    }
                }
                return null;
            }
        },
        taobao: {
            name: '淘宝',
            emoji: '🛍️',
            patterns: [
                /^(?:https?:\/\/)?(?:item\.)?taobao\.com\/item\.htm.*?id=([0-9]+)/i,
                /^(?:https?:\/\/)?(?:detail\.)?tmall\.com\/item\.htm.*?id=([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?taobao\.com\/item\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?tmall\.com\/item\/([0-9]+)/i,
                /^(?:https?:\/\/)?h5\.m\.taobao\.com\/awp\/core\/detail\.htm.*?id=([0-9]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        return {
                            platform: 'taobao',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1],
                            url: url,
                            type: 'product'
                        };
                    }
                }
                return null;
            }
        },
        wechat: {
            name: '公众号',
            emoji: '💬',
            patterns: [
                /^(?:https?:\/\/)?mp\.weixin\.qq\.com\/s\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?mp\.weixin\.qq\.com\/article\/.*?id=([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?weixin\.qq\.com\/mp\/.*?__biz=([a-zA-Z0-9_-]+).*?mid=([0-9]+).*?idx=([0-9]+).*?sn=([a-zA-Z0-9_-]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        return {
                            platform: 'wechat',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1],
                            url: url,
                            type: 'article'
                        };
                    }
                }
                return null;
            }
        },
        zhihu: {
            name: '知乎',
            emoji: '💡',
            patterns: [
                /^(?:https?:\/\/)?(?:www\.)?zhihu\.com\/question\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?zhihu\.com\/answer\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?zhihu\.com\/article\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?zhihu\.com\/p\/([0-9]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        const type = url.includes('/question/') ? 'question' : 
                                     url.includes('/answer/') ? 'answer' : 'article';
                        return {
                            platform: 'zhihu',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1],
                            url: url,
                            type: type
                        };
                    }
                }
                return null;
            }
        },
        juejin: {
            name: '掘金',
            emoji: '⛏️',
            patterns: [
                /^(?:https?:\/\/)?(?:juejin\.)?cn\/post\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:juejin\.)?cn\/article\/([0-9]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        return {
                            platform: 'juejin',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1],
                            url: url,
                            type: 'article'
                        };
                    }
                }
                return null;
            }
        },
        github: {
            name: 'GitHub',
            emoji: '💻',
            patterns: [
                /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)\/(?:blob|tree)\/.*$/i,
                /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)\/issues\/([0-9]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        const type = url.includes('/issues/') ? 'issue' : 
                                     url.includes('/pull/') ? 'pull' : 'repo';
                        return {
                            platform: 'github',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1] + '/' + match[2],
                            url: url,
                            type: type,
                            owner: match[1],
                            repo: match[2]
                        };
                    }
                }
                return null;
            }
        },
        youtube: {
            name: 'YouTube',
            emoji: '📹',
            patterns: [
                /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/channel\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        const type = url.includes('/channel/') ? 'channel' : 
                                     url.includes('/playlist/') ? 'playlist' : 'video';
                        return {
                            platform: 'youtube',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1],
                            url: url,
                            type: type
                        };
                    }
                }
                return null;
            }
        },
        androiddev: {
            name: 'Android Developers',
            emoji: '🤖',
            patterns: [
                /^(?:https?:\/\/)?developer\.android\.com\/[^\/]+/i,
                /^(?:https?:\/\/)?developer\.android\.com\/training\/.*$/i,
                /^(?:https?:\/\/)?developer\.android\.com\/reference\/.*$/i,
                /^(?:https?:\/\/)?developer\.android\.com\/guide\/.*$/i,
                /^(?:https?:\/\/)?developer\.android\.com\/studio\/.*$/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        let type = 'article';
                        if (url.includes('/training/')) type = 'guide';
                        else if (url.includes('/reference/')) type = 'reference';
                        else if (url.includes('/guide/')) type = 'guide';
                        else if (url.includes('/studio/')) type = 'guide';
                        return {
                            platform: 'androiddev',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[0],
                            url: url,
                            type: type
                        };
                    }
                }
                return null;
            }
        },
        coolapk: {
            name: '酷安',
            emoji: '📱',
            patterns: [
                /^(?:https?:\/\/)?(?:www\.)?coolapk\.com\/feed\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?coolapk\.com\/album\/([0-9]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?coolapk\.com\/apk\/([^\/]+)/i,
                /^(?:https?:\/\/)?(?:www\.)?coolapk\.com\/u\/([0-9]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        let type = 'post';
                        if (url.includes('/feed/')) type = 'post';
                        else if (url.includes('/album/')) type = 'post';
                        else if (url.includes('/apk/')) type = 'product';
                        else if (url.includes('/u/')) type = 'post';
                        return {
                            platform: 'coolapk',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1],
                            url: url,
                            type: type
                        };
                    }
                }
                return null;
            }
        },
        feishu: {
            name: '飞书文档',
            emoji: '📄',
            patterns: [
                /^(?:https?:\/\/)?(?:[a-zA-Z0-9_-]+\.)?feishu\.cn\/wiki\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:[a-zA-Z0-9_-]+\.)?feishu\.cn\/docx\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:[a-zA-Z0-9_-]+\.)?feishu\.cn\/doc\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:[a-zA-Z0-9_-]+\.)?feishu\.cn\/drive\/doc\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:[a-zA-Z0-9_-]+\.)?feishu\.cn\/drive\/folder\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:[a-zA-Z0-9_-]+\.)?feishu\.cn\/sheets\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:[a-zA-Z0-9_-]+\.)?feishu\.cn\/slides\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:[a-zA-Z0-9_-]+\.)?feishu\.cn\/mindnote\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:[a-zA-Z0-9_-]+\.)?larksuite\.com\/wiki\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:[a-zA-Z0-9_-]+\.)?larksuite\.com\/docx\/([a-zA-Z0-9_-]+)/i,
                /^(?:https?:\/\/)?(?:[a-zA-Z0-9_-]+\.)?larksuite\.com\/doc\/([a-zA-Z0-9_-]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        let type = 'article';
                        if (url.includes('/wiki/')) type = 'wiki';
                        else if (url.includes('/docx/') || url.includes('/doc/')) type = 'doc';
                        else if (url.includes('/sheets/')) type = 'sheet';
                        else if (url.includes('/slides/')) type = 'slide';
                        else if (url.includes('/mindnote/')) type = 'mindmap';
                        else if (url.includes('/folder/')) type = 'folder';
                        return {
                            platform: 'feishu',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1],
                            url: url,
                            type: type
                        };
                    }
                }
                return null;
            }
        },
        douyin: {
            name: '抖音',
            emoji: '🎵',
            patterns: [
                /^(?:https?:\/\/)?v\.douyin\.com\/[a-zA-Z0-9_-]+\/?/i,
                /^(?:https?:\/\/)?(?:www\.)?douyin\.com\/video\/[a-zA-Z0-9_-]+\/?/i,
                /^(?:https?:\/\/)?(?:www\.)?iesdouyin\.com\/share\/video\/[a-zA-Z0-9_-]+\/?/i,
                /^(?:https?:\/\/)?(?:www\.)?douyin\.com\/note\/[a-zA-Z0-9_-]+\/?/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    if (pattern.test(url)) {
                        return {
                            platform: 'douyin',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: url,
                            url: url,
                            type: 'video',
                            domain: 'douyin.com'
                        };
                    }
                }
                return null;
            }
        },
        csdn: {
            name: 'CSDN',
            emoji: '📝',
            patterns: [
                /^(?:https?:\/\/)?(?:www\.)?csdn\.net\/(?:article|blog|news|download|community)\/[^\/]+\/?/i,
                /^(?:https?:\/\/)?(?:www\.)?csdn\.net\/[a-zA-Z0-9_-]+\/article\/[^\/]+\/?/i,
                /^(?:https?:\/\/)?(?:www\.)?csdn\.net\/(?:article|blog)\/detail\/[^\/]+\/?/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    if (pattern.test(url)) {
                        return {
                            platform: 'csdn',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: url.match(/(\d+)/)?.[0] || url,
                            url: url,
                            type: 'article',
                            domain: 'csdn.net'
                        };
                    }
                }
                return null;
            }
        },
        hupu: {
            name: '虎扑',
            emoji: '🏀',
            patterns: [
                /^(?:https?:\/\/)?(?:m\.|www\.)?hupu\.com\/bbs-share\/[0-9]+/i,
                /^(?:https?:\/\/)?(?:m\.|www\.)?hupu\.com\/bbs\/[0-9]+/i,
                /^(?:https?:\/\/)?(?:m\.|www\.)?hupu\.com\/\w+\/[0-9]+\.html/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    if (pattern.test(url)) {
                        return {
                            platform: 'hupu',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: url.match(/(\d+)/)?.[0] || url,
                            url: url,
                            type: 'post',
                            domain: 'hupu.com'
                        };
                    }
                }
                return null;
            }
        },
        general: {
            name: '网页',
            emoji: '🔗',
            patterns: [
                /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,})(?:\/.*)?$/i
            ],
            parse: function(url) {
                const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,})(?:\/.*)?$/i);
                if (match) {
                    return {
                        platform: 'general',
                        platformName: this.name,
                        platformEmoji: this.emoji,
                        id: match[1],
                        url: url,
                        type: 'page',
                        domain: match[1]
                    };
                }
                return null;
            }
        }
    },

    detectPlatform: function(text) {
        if (!text || typeof text !== 'string') return null;
        const urls = this.extractUrls(text);
        if (urls.length === 0) return null;
        const url = urls[0];
        for (const key of Object.keys(this.platforms)) {
            const result = this.platforms[key].parse(url);
            if (result) return result;
        }
        return this.platforms.general.parse(url);
    },

    extractUrls: function(text) {
        const urlPattern = /(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*))/gi;
        const matches = text.match(urlPattern);
        return matches || [];
    },

    isUrl: function(text) {
        return this.extractUrls(text).length > 0;
    },

    getPlatformInfo: function(platformKey) {
        return this.platforms[platformKey] || null;
    },

    getTypeLabel: function(type) {
        const labels = {
            note: '笔记',
            post: '帖子',
            video: '视频',
            live: '直播',
            product: '商品',
            article: '文章',
            question: '问题',
            answer: '回答',
            issue: 'Issue',
            pull: 'Pull Request',
            repo: '仓库',
            channel: '频道',
            playlist: '播放列表',
            page: '网页',
            wiki: '知识库',
            doc: '文档',
            sheet: '表格',
            slide: '幻灯片',
            guide: '指南',
            reference: '参考',
            mindmap: '思维导图',
            folder: '文件夹'
        };
        return labels[type] || type;
    },

    async fetchPageContent(url, timeout = 15000) {
        try {
            let html = '';
            
            // fetch 超时控制器
            const fetchWithTimeout = async (fetchUrl, opts = {}) => {
                const controller = new AbortController();
                const timer = setTimeout(() => controller.abort(), timeout);
                try {
                    const response = await fetch(fetchUrl, { ...opts, signal: controller.signal });
                    clearTimeout(timer);
                    return response;
                } catch (e) {
                    clearTimeout(timer);
                    throw e;
                }
            };
            
            const isElectron = !!(window.electronAPI && window.electronAPI.fetchUrl);
            // 部署环境（Vercel 等）：location 包含域名且非 file://
            const isDeployed = location.protocol.startsWith('http') && location.hostname !== '127.0.0.1' && location.hostname !== 'localhost';

            // === 1. Electron 环境：优先主进程 fetchUrl + 本地代理 ===
            if (isElectron) {
                try {
                    const result = await window.electronAPI.fetchUrl(url);
                    if (result.success && result.data) {
                        html = result.data;
                    }
                } catch (e) {
                    console.warn('electronAPI.fetchUrl 失败:', e.message);
                }

                if (!html || html.length < 50) {
                    const tryLocalProxy = async (proxyUrl) => {
                        try {
                            const response = await fetchWithTimeout(proxyUrl);
                            if (response.ok) {
                                const text = await response.text();
                                if (text && text.length > 50) return text;
                            }
                        } catch (e) {}
                        return '';
                    };
                    html = await tryLocalProxy('http://127.0.0.1:3000/fetch?url=' + encodeURIComponent(url));
                    if (!html && window.electronAPI.getProxyPort) {
                        try {
                            const port = await window.electronAPI.getProxyPort();
                            if (port && port !== 3000) {
                                html = await tryLocalProxy(`http://127.0.0.1:${port}/fetch?url=${encodeURIComponent(url)}`);
                            }
                        } catch (e) {}
                    }
                }
            }

            // === 2. Vercel 部署环境：使用同源 /api/fetch 代理 ===
            if ((!html || html.length < 50) && isDeployed) {
                try {
                    const proxyUrl = `/api/fetch?url=${encodeURIComponent(url)}`;
                    const response = await fetchWithTimeout(proxyUrl, { redirect: 'follow' });
                    if (response.ok) {
                        const text = await response.text();
                        if (text && text.length > 50) {
                            html = text;
                        }
                    }
                } catch (e) {
                    console.warn('Vercel 代理失败:', e.message);
                }
            }

            // === 3. 本地 file:// 环境：尝试本地代理（用户可能启动了 proxy-server.js）===
            if ((!html || html.length < 50) && !isElectron && !isDeployed) {
                try {
                    const proxyUrl = 'http://127.0.0.1:3000/fetch?url=' + encodeURIComponent(url);
                    const response = await fetchWithTimeout(proxyUrl);
                    if (response.ok) {
                        const text = await response.text();
                        if (text && text.length > 50) html = text;
                    }
                } catch (e) {}
            }

            // === 4. 公共 CORS 代理（最后兜底）===
            if (!html || html.length < 50) {
                const corsProxies = [
                    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
                    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
                ];

                html = await new Promise((resolve) => {
                    let resolved = false;
                    let settled = 0;
                    const result = (val) => {
                        if (!resolved) { resolved = true; resolve(val); }
                    };
                    corsProxies.forEach(async (proxyUrl) => {
                        try {
                            const controller = new AbortController();
                            const timer = setTimeout(() => controller.abort(), 8000);
                            const response = await fetch(proxyUrl, {
                                signal: controller.signal,
                                redirect: 'follow'
                            });
                            clearTimeout(timer);
                            if (!response.ok) throw new Error(`HTTP ${response.status}`);
                            const contentType = response.headers.get('content-type') || '';
                            let resultHtml = '';
                            if (contentType.includes('json')) {
                                const data = await response.json();
                                resultHtml = data.contents || data.text || data.html || data.response || '';
                            } else {
                                resultHtml = await response.text();
                            }
                            if (resultHtml && resultHtml.length > 100) {
                                result(resultHtml);
                            } else {
                                throw new Error('内容太短');
                            }
                        } catch (e) {
                            settled++;
                            if (settled === corsProxies.length) result('');
                        }
                    });
                });
            }

            if (!html || html.length < 50) {
                throw new Error('无法获取网页内容，请检查网络或链接是否有效');
            }
            
            // 对于 SPA 站点，尝试使用渲染后的 HTML（仅 Electron 环境）
            if (html && window.electronAPI && window.electronAPI.fetchRenderedUrl) {
                try {
                    const parsedUrl = new URL(url.startsWith('http') ? url : 'https://' + url);
                    const domain = parsedUrl.hostname;

                    const spaDomains = [
                        'developer.apple.com',
                        'xiaohongshu.com',
                        'www.xiaohongshu.com',
                        'juejin.cn',
                        'www.juejin.cn',
                        'zhuanlan.zhihu.com',
                        'www.zhihu.com',
                        'mp.weixin.qq.com',
                        'bilibili.com',
                        'www.bilibili.com',
                        'm.bilibili.com',
                        't.bilibili.com',
                        'coolapk.com',
                        'www.coolapk.com',
                        'feishu.cn',
                        'www.feishu.cn',
                        'my.feishu.cn',
                        'larksuite.com',
                        'www.larksuite.com'
                    ];

                    let needRender = false;

                    if (spaDomains.some(d => domain === d || domain.endsWith('.' + d))) {
                        needRender = true;
                    }

                    if (!needRender) {
                        const hasSpaMarker = html.includes('__NEXT_DATA__') ||
                                           html.includes('__INITIAL_STATE__') ||
                                           html.includes('id="root"') ||
                                           html.includes('id="app"') ||
                                           html.includes('data-reactroot') ||
                                           html.includes('ng-app');
                        if (hasSpaMarker) {
                            needRender = true;
                        }
                    }

                    if (!needRender) {
                        const bodyTextMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
                        const bodyText = bodyTextMatch ? bodyTextMatch[1].replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '').trim() : '';
                        if (bodyText.length < 800) {
                            needRender = true;
                        }
                    }

                    if (needRender) {
                        try {
                            const renderedResult = await window.electronAPI.fetchRenderedUrl(url);
                            if (renderedResult.success && renderedResult.data) {
                                html = renderedResult.data;
                            }
                        } catch (e) {
                            console.warn('渲染页面回退失败，使用原始HTML:', e.message);
                        }
                    }
                } catch (e) {
                    console.warn('检查SPA失败:', e.message);
                }
            } else if (html) {
                // 浏览器环境：从 HTML 中提取 __INITIAL_STATE__ / __NEXT_DATA__ 等 SPA 数据
                // 不需要渲染，直接用原始 HTML 解析（parseHtmlContent 会处理）
                console.log('浏览器环境，使用原始HTML解析，长度:', html.length);
            }
            
            return html;
        } catch (error) {
            console.error('获取网页内容失败:', error);
            throw error;
        }
    },

    parseWechatArticle: function(html) {
        try {
            const result = {
                title: '',
                content: '',
                images: [],
                videos: [],
                author: '',
                date: '',
                excerpt: ''
            };

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const titleEl = doc.querySelector('#activity-name') || doc.querySelector('.rich_media_title');
            if (titleEl) {
                result.title = titleEl.textContent.trim();
            }
            const ogTitle = doc.querySelector('meta[property="og:title"]');
            if (!result.title && ogTitle) {
                result.title = ogTitle.getAttribute('content')?.trim() || '';
            }

            const authorEl = doc.querySelector('#js_name') || doc.querySelector('.profile_nickname');
            if (authorEl) {
                result.author = authorEl.textContent.trim();
            }
            const metaAuthor = doc.querySelector('meta[name="author"]');
            if (!result.author && metaAuthor) {
                result.author = metaAuthor.getAttribute('content') || '';
            }

            const dateEl = doc.querySelector('#publish_time') || doc.querySelector('.rich_media_meta_text');
            if (dateEl) {
                result.date = dateEl.textContent.trim();
            }
            const metaDate = doc.querySelector('meta[property="article:published_time"]');
            if (!result.date && metaDate) {
                result.date = metaDate.getAttribute('content')?.split('T')[0] || '';
            }

            const descEl = doc.querySelector('meta[name="description"]') || doc.querySelector('meta[property="og:description"]');
            if (descEl) {
                result.excerpt = descEl.getAttribute('content')?.trim() || '';
            }

            let coverImage = '';
            const ogImage = doc.querySelector('meta[property="og:image"]') || doc.querySelector('meta[name="og:image"]');
            if (ogImage) {
                coverImage = ogImage.getAttribute('content')?.trim() || '';
            }
            
            if (!coverImage) {
                const scripts = doc.querySelectorAll('script');
                for (const script of scripts) {
                    const text = script.textContent || '';
                    const coverMatch = text.match(/msg_cdn_url\s*=\s*['"]([^'"]+)['"]/);
                    if (coverMatch && coverMatch[1]) {
                        coverImage = coverMatch[1];
                        break;
                    }
                    const coverMatch2 = text.match(/var\s+cover\s*=\s*['"]([^'"]+)['"]/);
                    if (coverMatch2 && coverMatch2[1]) {
                        coverImage = coverMatch2[1];
                        break;
                    }
                }
            }
            
            if (coverImage && !result.images.includes(coverImage)) {
                result.images.unshift(coverImage);
            }

            const contentEl = doc.querySelector('#js_content') || doc.querySelector('.rich_media_content');
            if (contentEl) {
                const clonedEl = contentEl.cloneNode(true);
                clonedEl.querySelectorAll('script, .qr_code_pc, .qr_code_pc_inner, #js_pc_qr_code, .rich_media_tool, .weui-dialog').forEach(el => el.remove());

                clonedEl.querySelectorAll('img').forEach(img => {
                    const src = img.getAttribute('data-src') || img.getAttribute('src') || '';
                    if (src && src.includes('mmbiz.qpic.cn')) {
                        img.setAttribute('src', src);
                        img.removeAttribute('data-src');
                        if (!result.images.includes(src)) {
                            result.images.push(src);
                        }
                    } else if (src && !src.includes('mmbiz') && src.startsWith('http')) {
                        if (!result.images.includes(src)) {
                            result.images.push(src);
                        }
                    }
                });

                clonedEl.querySelectorAll('img').forEach(img => {
                    if (!img.style.maxWidth) {
                        img.style.maxWidth = '100%';
                        img.style.height = 'auto';
                    }
                });

                result.contentHtml = clonedEl.innerHTML;
                result.content = clonedEl.textContent.trim().replace(/\s+/g, ' ');
                return result;
            }

            return result;
        } catch (e) {
            console.warn('微信公众号解析失败:', e);
            return null;
        }
    },

    parseXiaohongshu: function(html, url) {
        try {
            const result = {
                title: '',
                content: '',
                contentHtml: '',
                images: [],
                videos: [],
                pdfs: [],
                author: '',
                date: '',
                excerpt: '',
                isVideo: false,
                videoUrl: ''
            };
            
            if (url) {
                result.videoUrl = url;
            }

            function decodeJsonStr(s) {
                if (!s) return '';
                let result = s;
                result = result.replace(/\\u([0-9a-fA-F]{4})/g, function(m, hex) {
                    return String.fromCharCode(parseInt(hex, 16));
                });
                result = result.replace(/\\x([0-9a-fA-F]{2})/g, function(m, hex) {
                    return String.fromCharCode(parseInt(hex, 16));
                });
                result = result.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\t/g, '\t').replace(/\\r/g, '').replace(/\\\\/g, '\\').replace(/\\\//g, '/');
                return result;
            }

            function cleanTopicTags(text) {
                if (!text) return text;
                return text.replace(/\[话题\]/g, '');
            }

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const pageTitle = doc.querySelector('title')?.textContent || '';
            if (pageTitle.includes('你访问的页面不见了') || pageTitle.includes('404') || html.includes('errorCode=-510001') || html.includes('/404?source=note')) {
                result.error = 'not_found';
                result.errorMessage = '笔记不存在或已被删除';
                result.title = '笔记不存在';
                result.content = '<p style="color:#6B7280;font-size:14px;text-align:center;padding:20px;">📕 该小红书笔记不存在或已被删除，可能需要登录后才能查看</p>';
                return result;
            }

            const ogTitle = doc.querySelector('meta[property="og:title"]');
            if (ogTitle) {
                result.title = ogTitle.getAttribute('content')?.replace(/\s*-\s*小红书$/, '').trim() || '';
            }

            const ogDesc = doc.querySelector('meta[property="og:description"]');
            if (ogDesc) {
                result.excerpt = ogDesc.getAttribute('content')?.trim() || '';
            }

            const ogImages = doc.querySelectorAll('meta[property="og:image"]');
            ogImages.forEach(img => {
                const src = img.getAttribute('content');
                if (src) {
                    let cleanSrc = src.startsWith('//') ? 'https:' + src : src;
                    if (cleanSrc && !result.images.includes(cleanSrc) && !cleanSrc.includes('fe-platform') && !cleanSrc.includes('logo')) {
                        result.images.push(cleanSrc);
                    }
                }
            });

            if (pageTitle.includes('登录') || html.includes('登录探索更多内容') || html.includes('login-modal')) {
                if (!result.title && !result.excerpt && result.images.length === 0) {
                    result.error = 'login_required';
                    result.errorMessage = '需要登录才能查看';
                    result.title = '需要登录';
                    result.content = '<p style="color:#6B7280;font-size:14px;text-align:center;padding:20px;">📕 该笔记需要登录小红书账号才能查看完整内容</p>';
                    return result;
                }
            }

            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                const text = script.textContent || '';
                if (text.includes('imageList') && text.includes('urlDefault')) {
                    const imgMatches = text.match(/"urlDefault"\s*:\s*"([^"]*)"/g);
                    if (imgMatches) {
                        imgMatches.forEach(m => {
                            const url = decodeJsonStr(m.replace(/.*:\s*"/, '').replace(/"$/, ''));
                            if (url && !result.images.includes(url) && url.includes('xhscdn.com')) {
                                result.images.push(url);
                            }
                        });
                    }

                    const titleMatch = text.match(/"title"\s*:\s*"([^"]*)"/);
                    if (titleMatch && !result.title) {
                        result.title = cleanTopicTags(decodeJsonStr(titleMatch[1]).replace(/\n/g, '').trim());
                    }

                    const descMatch = text.match(/"desc"\s*:\s*"([^"]*)"/);
                    if (descMatch) {
                        const desc = cleanTopicTags(decodeJsonStr(descMatch[1]).trim());
                        if (desc.length > result.excerpt.length) {
                            result.excerpt = desc;
                        }
                    }

                    const userMatch = text.match(/"nickname"\s*:\s*"([^"]*)"/);
                    if (userMatch && !result.author) {
                        result.author = decodeJsonStr(userMatch[1]);
                    }

                    const timeMatch = text.match(/"time"\s*:\s*(\d+)/);
                    if (timeMatch && !result.date) {
                        const ts = parseInt(timeMatch[1]);
                        if (ts > 1000000000000) {
                            result.date = new Date(ts).toISOString().split('T')[0];
                        } else if (ts > 1000000000) {
                            result.date = new Date(ts * 1000).toISOString().split('T')[0];
                        }
                    }

                    const publishMatch = text.match(/"publishDate"\s*:\s*"([^"]*)"/);
                    if (publishMatch && !result.date) {
                        result.date = publishMatch[1].split('T')[0];
                    }
                }

                if (text.includes('pdf') || text.includes('fileList') || text.includes('attachment')) {
                    const pdfPatterns = [
                        /"fileName"\s*:\s*"([^"]+\.pdf[^"]*)"/gi,
                        /"name"\s*:\s*"([^"]+\.pdf[^"]*)"/gi,
                        /"file_name"\s*:\s*"([^"]+\.pdf[^"]*)"/gi
                    ];
                    const urlPatterns = [
                        /"fileUrl"\s*:\s*"([^"]+)"/gi,
                        /"url"\s*:\s*"([^"]+\.pdf[^"]*)"/gi,
                        /"downloadUrl"\s*:\s*"([^"]+)"/gi
                    ];
                    const pagePatterns = [
                        /"pageCount"\s*:\s*(\d+)/gi,
                        /"pageNum"\s*:\s*(\d+)/gi,
                        /"totalPage"\s*:\s*(\d+)/gi
                    ];

                    const pdfNames = [];
                    const pdfUrls = [];
                    const pdfPages = [];

                    pdfPatterns.forEach(pat => {
                        let m;
                        while ((m = pat.exec(text)) !== null) {
                            const name = decodeJsonStr(m[1]).replace(/\n/g, '');
                            if (!pdfNames.includes(name) && name.toLowerCase().endsWith('.pdf')) {
                                pdfNames.push(name);
                            }
                        }
                    });

                    urlPatterns.forEach(pat => {
                        let m;
                        while ((m = pat.exec(text)) !== null) {
                            const url = decodeJsonStr(m[1]);
                            if (!pdfUrls.includes(url) && (url.includes('.pdf') || url.includes('pdf'))) {
                                pdfUrls.push(url);
                            }
                        }
                    });

                    pagePatterns.forEach(pat => {
                        let m;
                        while ((m = pat.exec(text)) !== null) {
                            const pages = parseInt(m[1]);
                            if (!isNaN(pages) && pages > 0 && !pdfPages.includes(pages)) {
                                pdfPages.push(pages);
                            }
                        }
                    });

                    const maxPdfs = Math.max(pdfNames.length, pdfUrls.length);
                    for (let i = 0; i < maxPdfs; i++) {
                        const name = pdfNames[i] || (pdfUrls[i] ? '附件' + (i + 1) + '.pdf' : '');
                        const url = pdfUrls[i] || '';
                        const pages = pdfPages[i] || 0;
                        if (name || url) {
                            result.pdfs.push({ name: name, url: url, pages: pages });
                        }
                    }
                }
                
                if (text.includes('video') || text.includes('mp4') || text.includes('media')) {
                    const livePhotoMatch = text.match(/"type"\s*:\s*"livePhoto"/i) || text.match(/"type"\s*:\s*"live_photo"/i);
                    const isLivePhoto = livePhotoMatch !== null;
                    
                    if (!isLivePhoto) {
                        const videoPatterns = [
                            /"video"\s*:\s*"([^"]+\.mp4[^"]*)"/gi,
                            /"mediaUrl"\s*:\s*"([^"]+)"/gi,
                            /"url"\s*:\s*"([^"]+\.mp4[^"]*)"/gi,
                            /"videoUrl"\s*:\s*"([^"]+)"/gi,
                            /"masterUrl"\s*:\s*"([^"]+)"/gi
                        ];
                        videoPatterns.forEach(pat => {
                            let m;
                            while ((m = pat.exec(text)) !== null) {
                                const videoUrl = decodeJsonStr(m[1]);
                                if (videoUrl && !result.videos.includes(videoUrl) && (videoUrl.includes('.mp4') || videoUrl.includes('m3u8') || videoUrl.includes('xhscdn'))) {
                                    result.videos.push(videoUrl);
                                }
                            }
                        });
                        
                        const coverMatch = text.match(/"cover"\s*:\s*"([^"]+)"/i);
                        if (coverMatch) {
                            const coverUrl = decodeJsonStr(coverMatch[1]);
                            if (coverUrl && !result.images.includes(coverUrl)) {
                                result.images.unshift(coverUrl);
                            }
                        }
                        
                        const firstFrameMatch = text.match(/"firstFrame"\s*:\s*"([^"]+)"/i);
                        if (firstFrameMatch) {
                            const frameUrl = decodeJsonStr(firstFrameMatch[1]);
                            if (frameUrl && !result.images.includes(frameUrl)) {
                                result.images.unshift(frameUrl);
                            }
                        }
                        
                        if (result.videos.length > 0 || coverMatch || firstFrameMatch) {
                            result.isVideo = true;
                        }
                    }
                }
                
                if (!result.images.length) {
                    const posterMatch = text.match(/"poster"\s*:\s*"([^"]+)"/i);
                    if (posterMatch) {
                        const posterUrl = decodeJsonStr(posterMatch[1]);
                        if (posterUrl && !result.images.includes(posterUrl)) {
                            result.images.unshift(posterUrl);
                        }
                    }
                    
                    const thumbnailMatch = text.match(/"thumbnail"\s*:\s*"([^"]+)"/i);
                    if (thumbnailMatch) {
                        const thumbUrl = decodeJsonStr(thumbnailMatch[1]);
                        if (thumbUrl && !result.images.includes(thumbUrl)) {
                            result.images.unshift(thumbUrl);
                        }
                    }
                    
                    const imageUrlMatch = text.match(/"imageUrl"\s*:\s*"([^"]+)"/i);
                    if (imageUrlMatch) {
                        const imgUrl = decodeJsonStr(imageUrlMatch[1]);
                        if (imgUrl && !result.images.includes(imgUrl)) {
                            result.images.unshift(imgUrl);
                        }
                    }
                }
            });

            if (!result.images.length) {
                const metaImages = doc.querySelectorAll('meta');
                metaImages.forEach(meta => {
                    const prop = meta.getAttribute('property');
                    const name = meta.getAttribute('name');
                    if ((prop && prop.includes('image')) || (name && name.includes('image'))) {
                        const content = meta.getAttribute('content');
                        if (content && !result.images.includes(content)) {
                            const cleanContent = content.startsWith('//') ? 'https:' + content : content;
                            if (!cleanContent.includes('fe-platform') && !cleanContent.includes('logo')) {
                                result.images.push(cleanContent);
                            }
                        }
                    }
                });
            }

            const content = (result.excerpt || '').replace(/\t/g, '').replace(/\u00a0/g, ' ').replace(/ +/g, ' ');
            let htmlContent = content.replace(/\n/g, '<br>');

            const descSelectors = [
                '.note-content .desc',
                '.note-desc',
                '#detail-desc',
                '.content .desc',
                '[data-v-] .desc',
                '.note-text',
                '.detail-desc'
            ];
            for (const sel of descSelectors) {
                const el = doc.querySelector(sel);
                if (el && el.textContent.trim().length > result.excerpt.length) {
                    const domText = el.innerHTML.trim();
                    if (domText.length > htmlContent.length) {
                        htmlContent = domText;
                        result.excerpt = el.textContent.trim();
                    }
                    break;
                }
            }

            const authorSelectors = [
                '.user .nickname',
                '.author .name',
                '.user-nickname',
                '.nickname',
                '.user-name'
            ];
            for (const sel of authorSelectors) {
                const el = doc.querySelector(sel);
                if (el && el.textContent.trim() && !result.author) {
                    result.author = el.textContent.trim();
                    break;
                }
            }

            htmlContent = htmlContent.replace(/#([^\s#，。！？、,\.!?]+?)\[话题\]#?/g, (match, tag) => {
                const tagUrl = `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(tag)}&source=topic`;
                return `<a href="${tagUrl}" target="_blank" class="xhs-topic-link" style="color:#3B82F6;text-decoration:none;cursor:pointer;">#${tag}</a> `;
            });

            htmlContent = htmlContent.replace(/(^|<br>|[\s\u3000]*)#([^\s#，。！？、,.!?]+)(?=\s|$|<br>|[，。！？、,.!?])/g, (match, prefix, tag) => {
                const tagUrl = `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(tag)}&source=topic`;
                return `${prefix}<a href="${tagUrl}" target="_blank" class="xhs-topic-link" style="color:#3B82F6;text-decoration:none;cursor:pointer;">#${tag}</a>`;
            });

            result.content = '<p>' + htmlContent + '</p>';
            
            result.comment = null;
            try {
                const scripts = doc.querySelectorAll('script');
                for (const script of scripts) {
                    const text = script.textContent || '';
                    if (text.includes('comment') && text.includes('content') && text.length > 5000) {
                        const commentMatches = text.match(/"content"\s*:\s*"([^"]{10,})"/g);
                        const userMatches = text.match(/"nickname"\s*:\s*"([^"]{2,})"/g);
                        
                        if (commentMatches && commentMatches.length > 0) {
                            const firstComment = commentMatches[0].replace(/.*:\s*"/, '').replace(/"$/, '');
                            const decodedComment = decodeJsonStr(firstComment);
                            
                            let author = '';
                            if (userMatches && userMatches.length > 0) {
                                author = decodeJsonStr(userMatches[0].replace(/.*:\s*"/, '').replace(/"$/, ''));
                            }
                            
                            if (decodedComment && decodedComment.length > 5) {
                                result.comment = {
                                    author: author,
                                    content: decodedComment,
                                    avatar: '',
                                    fromScript: true
                                };
                                break;
                            }
                        }
                    }
                }
                
                if (!result.comment) {
                    const commentItemSelectors = [
                        '[class*=comment-item]',
                        '.comment-item',
                        '[class*=CommentItem]',
                        '[class*=list-item] [class*=content]',
                        '.comments-el > div > div',
                        '[class*=reply-item]'
                    ];
                    
                    for (const sel of commentItemSelectors) {
                        const items = doc.querySelectorAll(sel);
                        if (items.length > 0) {
                            for (const item of items) {
                                const text = item.textContent || '';
                                const cleanText = text.replace(/\s+/g, '').trim();
                                
                                if (cleanText.length > 10 && cleanText.length < 1000) {
                                    let author = '';
                                    let content = '';
                                    
                                    const authorEl = item.querySelector('[class*=name]') || item.querySelector('[class*=nickname]') || item.querySelector('[class*=user]');
                                    if (authorEl) author = authorEl.textContent.trim();
                                    
                                    const contentEl = item.querySelector('[class*=content]') || item;
                                    if (contentEl) content = contentEl.textContent.trim();
                                    
                                    if (content.length > 10) {
                                        result.comment = {
                                            author: author,
                                            content: content,
                                            avatar: item.querySelector('img')?.src || '',
                                            fromDom: true
                                        };
                                        break;
                                    }
                                }
                            }
                            if (result.comment) break;
                        }
                    }
                }
            } catch (e) {
                console.warn('提取评论失败:', e);
            }

            return result;
        } catch (e) {
            console.warn('小红书解析失败:', e);
            return null;
        }
    },

    parseBilibili: function(html, url) {
        try {
            const result = {
                title: '',
                content: '',
                contentHtml: '',
                images: [],
                videos: [],
                pdfs: [],
                author: '',
                date: '',
                excerpt: '',
                isVideo: false,
                videoUrl: ''
            };

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const pageTitle = doc.querySelector('title')?.textContent || '';
            if (pageTitle.includes('404') || pageTitle.includes('你访问的页面不见了')) {
                result.error = 'not_found';
                result.errorMessage = '内容不存在或已被删除';
                result.title = '内容不存在';
                result.content = '<p style="color:#6B7280;font-size:14px;text-align:center;padding:20px;">📺 该B站内容不存在或已被删除</p>';
                return result;
            }

            if (url) {
                result.videoUrl = url;
                if (url.includes('/video/') || url.includes('b23.tv')) {
                    result.isVideo = true;
                }
            }

            const ldJsonScripts = doc.querySelectorAll('script[type="application/ld+json"]');
            ldJsonScripts.forEach(script => {
                try {
                    const data = JSON.parse(script.textContent || '{}');
                    if (data['@type'] === 'VideoObject') {
                        if (data.name) {
                            result.title = data.name;
                        }
                        if (data.description) {
                            result.excerpt = data.description;
                        }
                        if (data.thumbnailUrl && Array.isArray(data.thumbnailUrl)) {
                            data.thumbnailUrl.forEach(img => {
                                let cleanImg = img;
                                if (cleanImg.startsWith('//')) {
                                    cleanImg = 'https:' + cleanImg;
                                }
                                cleanImg = cleanImg.replace(/@.*$/, '');
                                if (cleanImg && !result.images.includes(cleanImg)) {
                                    result.images.unshift(cleanImg);
                                }
                            });
                        }
                    } else if (data['@type'] === 'Article') {
                        if (data.headline) {
                            result.title = data.headline;
                        }
                        if (data.description) {
                            result.excerpt = data.description;
                        }
                        if (data.image) {
                            const images = Array.isArray(data.image) ? data.image : [data.image];
                            images.forEach(img => {
                                let cleanImg = typeof img === 'string' ? img : (img.url || '');
                                if (cleanImg.startsWith('//')) {
                                    cleanImg = 'https:' + cleanImg;
                                }
                                cleanImg = cleanImg.replace(/@.*$/, '');
                                if (cleanImg && !result.images.includes(cleanImg)) {
                                    result.images.push(cleanImg);
                                }
                            });
                        }
                    }
                } catch(e) {}
            });

            const ogTitle = doc.querySelector('meta[property="og:title"]');
            if (ogTitle) {
                const ogTitleText = ogTitle.getAttribute('content')?.replace(/\s*-\s*哔哩哔哩$/, '').replace(/\s*-\s*bilibili$/, '').trim() || '';
                if (ogTitleText && !result.title) {
                    result.title = ogTitleText;
                }
            }

            const ogDesc = doc.querySelector('meta[property="og:description"]');
            if (ogDesc) {
                const ogDescText = ogDesc.getAttribute('content')?.trim() || '';
                if (ogDescText && !result.excerpt) {
                    result.excerpt = ogDescText;
                }
            }

            const ogImages = doc.querySelectorAll('meta[property="og:image"]');
            ogImages.forEach(img => {
                const src = img.getAttribute('content');
                if (src) {
                    let cleanSrc = src.startsWith('//') ? 'https:' + src : src;
                    if (cleanSrc && !result.images.includes(cleanSrc) && !cleanSrc.includes('logo')) {
                        result.images.unshift(cleanSrc);
                    }
                }
            });

            if (url && result.isVideo) {
                const fullBvidMatch = url.match(/(BV[a-zA-Z0-9]{10,})/i);
                if (fullBvidMatch) {
                    const fullBvid = fullBvidMatch[1];
                    result.bvid = fullBvid;
                    
                    if (!result.title) {
                        result.title = `B站视频: ${fullBvid}`;
                    }
                    
                    if (!result.images || result.images.length === 0) {
                        result.images.push(`https://i0.hdslb.com/bfs/archive/${fullBvid}.jpg`);
                    }
                }
            }

            const scripts = doc.querySelectorAll('script');
            let videoData = null;
            let opusData = null;
            let articleData = null;
            let playInfoData = null;

            scripts.forEach(script => {
                const text = script.textContent || '';

                if (text.includes('window.__playinfo__') && !playInfoData) {
                    try {
                        const startIdx = text.indexOf('window.__playinfo__');
                        const braceStart = text.indexOf('{', startIdx);
                        if (braceStart > -1) {
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
                                
                                if (char === '\\' && inString) {
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
                                const jsonStr = text.substring(braceStart, endIdx);
                                const playInfo = JSON.parse(jsonStr);
                                playInfoData = playInfo;
                                if (playInfo.data?.durl?.[0]?.url) {
                                    result.videos.push(playInfo.data.durl[0].url);
                                }
                                if (playInfo.data?.dash?.video?.[0]?.baseUrl) {
                                    result.videos.push(playInfo.data.dash.video[0].baseUrl);
                                }
                                if (playInfo.data?.dash?.audio?.[0]?.baseUrl) {
                                    result.videos.push(playInfo.data.dash.audio[0].baseUrl);
                                }
                            }
                        }
                    } catch(e) {
                        console.warn('解析__playinfo__失败:', e.message);
                    }
                }

                if (text.includes('window.__INITIAL_STATE__')) {
                    try {
                        const startIdx = text.indexOf('window.__INITIAL_STATE__');
                        const braceStart = text.indexOf('{', startIdx);
                        if (braceStart > -1) {
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
                                
                                if (char === '\\' && inString) {
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
                                const jsonStr = text.substring(braceStart, endIdx);
                                const state = JSON.parse(jsonStr);
                                
                                if (state.videoData) {
                                    videoData = state.videoData;
                                }
                                if (state.article) {
                                    articleData = state.article;
                                }
                                if (state.opus) {
                                    opusData = state.opus;
                                }
                                
                                if (!opusData && state.dynamic) {
                                    opusData = state.dynamic;
                                }
                                
                                if (!videoData && state.videoInfo) {
                                    videoData = state.videoInfo;
                                }
                                
                                if (!videoData && state.mediaInfo) {
                                    videoData = state.mediaInfo;
                                }
                                
                                if (!videoData && state.pgcSeasonInfo) {
                                    videoData = state.pgcSeasonInfo;
                                }
                                
                                if (!videoData && state.h1Title && state.videoInfo) {
                                    videoData = state.videoInfo;
                                }
                            }
                        }
                    } catch(e) {
                        console.warn('解析__INITIAL_STATE__失败:', e.message);
                    }
                }

                if (text.includes('"videoData"') && !videoData) {
                    try {
                        const vdMatch = text.match(/"videoData"\s*:\s*({[\s\S]*?})/);
                        if (vdMatch) {
                            videoData = JSON.parse(vdMatch[1]);
                        }
                    } catch(e) {}
                }
                
                if ((text.includes('"opus"') || text.includes('"dynamic"')) && !opusData && text.length > 3000) {
                    try {
                        const opusMatch = text.match(/"opus"\s*:\s*({[\s\S]*?"pics"\s*:\s*\[)/);
                        if (opusMatch) {
                            const opusStr = opusMatch[1];
                            let braceCount = 0;
                            let endIdx = -1;
                            for (let i = 0; i < opusStr.length; i++) {
                                if (opusStr[i] === '{') braceCount++;
                                else if (opusStr[i] === '}') {
                                    braceCount--;
                                    if (braceCount === 0) {
                                        endIdx = i + 1;
                                        break;
                                    }
                                }
                            }
                            if (endIdx > 0) {
                                opusData = JSON.parse(opusStr.substring(0, endIdx));
                            }
                        }
                    } catch(e) {}
                }

                if ((text.includes('"bvid"') || text.includes('"aid"')) && !videoData && text.length > 5000) {
                    try {
                        const titleMatch = text.match(/"title"\s*:\s*"([^"]+)"/);
                        const descMatch = text.match(/"desc"\s*:\s*"([^"]*)"/);
                        const ownerMatch = text.match(/"owner"\s*:\s*{[^}]*"name"\s*:\s*"([^"]+)"/);
                        const picMatch = text.match(/"pic"\s*:\s*"([^"]+)"/);
                        
                        if (titleMatch && !result.title) {
                            result.title = titleMatch[1].trim();
                        }
                        if (descMatch) {
                            result.excerpt = descMatch[1].replace(/\\n/g, '\n').trim();
                        }
                        if (ownerMatch && !result.author) {
                            result.author = ownerMatch[1].trim();
                        }
                        if (picMatch) {
                            const picUrl = picMatch[1].startsWith('//') ? 'https:' + picMatch[1] : picMatch[1];
                            if (!result.images.includes(picUrl)) {
                                result.images.unshift(picUrl);
                            }
                        }
                    } catch(e) {}
                }
            });

            if (videoData) {
                result.isVideo = true;
                
                const titleSources = [
                    videoData.title,
                    videoData.longTitle,
                    videoData.share_subtitle,
                    videoData.bvid
                ];
                for (const t of titleSources) {
                    if (t && !result.title) {
                        result.title = String(t).trim();
                        break;
                    }
                }
                
                const descSources = [videoData.desc, videoData.vdesc, videoData.description];
                for (const d of descSources) {
                    if (d && d.length > (result.excerpt || '').length) {
                        result.excerpt = String(d).trim();
                    }
                }
                
                const authorSources = [
                    videoData.owner?.name,
                    videoData.owner?.uname,
                    videoData.author,
                    videoData.upName,
                    videoData.username
                ];
                for (const a of authorSources) {
                    if (a && !result.author) {
                        result.author = String(a).trim();
                        break;
                    }
                }
                
                const picSources = [
                    videoData.pic,
                    videoData.picUrl,
                    videoData.cover,
                    videoData.thumbnail,
                    videoData.poster
                ];
                for (const p of picSources) {
                    if (p) {
                        const picUrl = String(p).startsWith('//') ? 'https:' + String(p) : String(p);
                        if (picUrl.startsWith('http') && !result.images.includes(picUrl)) {
                            result.images.unshift(picUrl);
                            break;
                        }
                    }
                }
                
                if (videoData.pubdate) {
                    result.date = new Date(videoData.pubdate * 1000).toISOString();
                } else if (videoData.ctime) {
                    result.date = new Date(videoData.ctime * 1000).toISOString();
                }
            }
            
            if (!result.isVideo && result.videos && result.videos.length > 0) {
                result.isVideo = true;
            }
            
            if (result.isVideo && result.images.length === 0) {
                const ogImage = doc.querySelector('meta[property="og:image"]');
                if (ogImage) {
                    const imgUrl = ogImage.getAttribute('content');
                    if (imgUrl) {
                        const cleanImg = imgUrl.startsWith('//') ? 'https:' + imgUrl : imgUrl;
                        result.images.push(cleanImg);
                    }
                }
            }
            
            if (result.isVideo && (!result.title || result.title.includes('哔哩哔哩'))) {
                const ogTitle = doc.querySelector('meta[property="og:title"]');
                if (ogTitle) {
                    const title = ogTitle.getAttribute('content')?.replace(/\s*-\s*哔哩哔哩.*$/, '').replace(/\s*-\s*bilibili.*$/, '').trim();
                    if (title && title.length > 0) {
                        result.title = title;
                    }
                }
            }

            if (articleData) {
                if (articleData.title && !result.title) {
                    result.title = articleData.title;
                }
                if (articleData.content) {
                    result.content = articleData.content;
                    result.contentHtml = articleData.content;
                    result.excerpt = articleData.content.replace(/<[^>]*>/g, '').substring(0, 500);
                }
                if (articleData.authorName && !result.author) {
                    result.author = articleData.authorName;
                }
                if (articleData.images && Array.isArray(articleData.images)) {
                    articleData.images.forEach(img => {
                        if (img.url && !result.images.includes(img.url)) {
                            result.images.push(img.url);
                        }
                    });
                }
            }

            if (opusData) {
                try {
                    const opusDetail = opusData.detail || opusData;
                    
                    function extractOpusPics(pics) {
                        if (pics && Array.isArray(pics)) {
                            pics.forEach(pic => {
                                const url = pic.url || pic.src || pic.img_src || pic.bfs_src || pic;
                                if (url && typeof url === 'string' && !result.images.includes(url)) {
                                    result.images.push(url);
                                }
                            });
                        }
                    }
                    
                    function extractOpusContent(content) {
                        if (!content) return;
                        let text = typeof content === 'string' ? content : JSON.stringify(content);
                        text = text.replace(/\\n/g, '\n').replace(/\\"/g, '"');
                        if (text.length > (result.excerpt || '').length) {
                            result.excerpt = text.trim().substring(0, 500);
                        }
                        const htmlContent = '<p>' + text.replace(/\n/g, '<br>') + '</p>';
                        if (!result.contentHtml || htmlContent.length > result.contentHtml.length) {
                            result.content = htmlContent;
                            result.contentHtml = htmlContent;
                        }
                    }
                    
                    if (opusDetail.title && !result.title) {
                        result.title = opusDetail.title;
                    }
                    if (opusDetail.content) {
                        extractOpusContent(opusDetail.content);
                    }
                    if (opusDetail.user?.uname && !result.author) {
                        result.author = opusDetail.user.uname;
                    }
                    extractOpusPics(opusDetail.pics);
                    
                    if (opusDetail.modules) {
                        const modules = opusDetail.modules;
                        
                        if (modules.module_author) {
                            if (modules.module_author.face?.name && !result.author) {
                                result.author = modules.module_author.face.name;
                            }
                            if (modules.module_author.name?.text && !result.author) {
                                result.author = modules.module_author.name.text;
                            }
                        }
                        
                        if (modules.module_dynamic?.major?.opus) {
                            const opus = modules.module_dynamic.major.opus;
                            extractOpusPics(opus.pics);
                            if (opus.title && !result.title) {
                                result.title = opus.title;
                            }
                            if (opus.summary) {
                                extractOpusContent(opus.summary);
                            }
                            if (opus.text) {
                                extractOpusContent(opus.text);
                            }
                            if (opus.desc?.text) {
                                extractOpusContent(opus.desc.text);
                            }
                            if (opus.pics && Array.isArray(opus.pics) && opus.pics.length > 0) {
                                extractOpusPics(opus.pics);
                            }
                            if (opus.pic_infos && Array.isArray(opus.pic_infos)) {
                                extractOpusPics(opus.pic_infos);
                            }
                        }
                        
                        if (modules.module_dynamic?.major?.draw) {
                            const draw = modules.module_dynamic.major.draw;
                            extractOpusPics(draw.items || draw.pics || draw.pic_infos);
                        }
                        
                        if (modules.module_dynamic?.major?.article) {
                            const article = modules.module_dynamic.major.article;
                            if (article.title && !result.title) {
                                result.title = article.title;
                            }
                            if (article.desc) {
                                extractOpusContent(article.desc);
                            }
                            if (article.covers && Array.isArray(article.covers)) {
                                extractOpusPics(article.covers);
                            }
                        }
                        
                        if (modules.module_dynamic?.desc?.text) {
                            extractOpusContent(modules.module_dynamic.desc.text);
                        }
                    }
                    
                    if (opusDetail.item) {
                        const item = opusDetail.item;
                        if (item.description) {
                            extractOpusContent(item.description);
                        }
                        if (item.pictures && Array.isArray(item.pictures)) {
                            extractOpusPics(item.pictures);
                        }
                    }
                } catch(e) {
                    console.warn('解析opus数据失败:', e);
                }
            }

            if (!result.title) {
                const titleEl = doc.querySelector('title');
                if (titleEl) {
                    result.title = titleEl.textContent.replace(/\s*-\s*哔哩哔哩$/, '').replace(/\s*-\s*bilibili$/, '').trim();
                }
            }

            if (!result.content) {
                const contentSelectors = [
                    '.article-holder',
                    '.article-content',
                    '.read-content',
                    '[class*="article-content"]',
                    '[class*="read-content"]',
                    'article',
                    '.video-desc',
                    '[class*="video-desc"]',
                    '.desc',
                    '[class*="description"]',
                    '.opus-content',
                    '[class*="opus-content"]',
                    '.dynamic-content',
                    '[class*="dynamic-content"]',
                    '.main-content',
                    '.content'
                ];

                for (const sel of contentSelectors) {
                    const el = doc.querySelector(sel);
                    if (el && el.textContent.trim().length > 30) {
                        result.content = el.innerHTML;
                        result.contentHtml = el.innerHTML;
                        result.excerpt = el.textContent.trim().substring(0, 500);
                        break;
                    }
                }
            }

            if (!result.author) {
                const authorSelectors = [
                    '.up-name',
                    '.author-name',
                    '[class*="author"]',
                    '[class*="up-name"]',
                    '.username',
                    '.up-info-name',
                    '[class*="up-info"]',
                    '[class*="owner-info"]',
                    '.opus-author',
                    '[class*="opus-author"]',
                    '.up-detail-top a.up-name'
                ];
                for (const sel of authorSelectors) {
                    const el = doc.querySelector(sel);
                    if (el) {
                        result.author = el.textContent.trim();
                        break;
                    }
                }
            }

            if (!result.content && result.excerpt) {
                result.content = '<p>' + result.excerpt.replace(/\n/g, '<br>') + '</p>';
                result.contentHtml = result.content;
            }

            if (result.isVideo && result.images.length > 0 && !result.contentHtml) {
                const coverUrl = result.images[0];
                result.contentHtml = `
                    <div style="text-align:center;margin-bottom:16px;">
                        <img src="${coverUrl}" style="max-width:100%;height:auto;border-radius:12px;display:block;margin:0 auto;" />
                    </div>
                    ${result.excerpt ? `<p style="font-size:15px;color:#374151;line-height:1.7;">${result.excerpt.replace(/\n/g, '<br>')}</p>` : ''}
                `;
                result.content = result.contentHtml;
            }

            if (result.isVideo && result.images.length > 1) {
                const uniqueImages = [];
                const seen = new Set();
                for (const img of result.images) {
                    const normalized = img.replace(/@.*$/, '').replace(/^https?:\/\//, '').replace(/\/+$/, '');
                    if (!seen.has(normalized) && img && img.length > 0) {
                        seen.add(normalized);
                        uniqueImages.push(img);
                    }
                }
                result.images = uniqueImages.slice(0, 1);
            }

            return result;
        } catch (e) {
            console.warn('B站解析失败:', e);
            return null;
        }
    },

    fetchBilibiliApi: function(url) {
        try {
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
                videoUrl: ''
            };

            const bvidMatch = url.match(/(BV[a-zA-Z0-9]{10,})/i);
            const aidMatch = url.match(/\/av([0-9]+)/i);
            const opusMatch = url.match(/\/opus\/([0-9]+)/i);
            const readMatch = url.match(/\/read\/cv([0-9]+)/i);

            let apiUrl = '';
            let contentType = 'video';

            if (bvidMatch) {
                const bvid = bvidMatch[1];
                apiUrl = `https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`;
                contentType = 'video';
            } else if (aidMatch) {
                const aid = aidMatch[1];
                apiUrl = `https://api.bilibili.com/x/web-interface/view?aid=${aid}`;
                contentType = 'video';
            } else if (opusMatch) {
                const opusId = opusMatch[1];
                apiUrl = `https://api.bilibili.com/x/polymer/web-dynamic/v1/detail?id=${opusId}&type=1`;
                contentType = 'opus';
            } else if (readMatch) {
                const cvId = readMatch[1];
                apiUrl = `https://api.bilibili.com/x/article/viewinfo?id=${cvId}&mobi_app=pc&platform=pc`;
                contentType = 'article';
            }

            if (!apiUrl) {
                console.warn('B站API: 无法识别URL格式:', url);
                return null;
            }

            let responseData = null;

            try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', apiUrl, false);
                xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
                xhr.setRequestHeader('Referer', 'https://www.bilibili.com/');
                xhr.setRequestHeader('Origin', 'https://www.bilibili.com');
                xhr.timeout = 10000;

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            try {
                                responseData = JSON.parse(xhr.responseText);
                            } catch(e) {}
                        }
                    }
                };

                xhr.send();
            } catch(e) {
                console.warn('B站API: 请求异常:', e.message);
            }

            if (!responseData) {
                console.warn('B站API: 无响应数据');
                
                if (bvidMatch && contentType === 'video') {
                    const bvid = bvidMatch[1];
                    result.title = `B站视频: ${bvid}`;
                    result.isVideo = true;
                    result.videoUrl = url;
                    result.images.push(`https://i0.hdslb.com/bfs/archive/${bvid}.jpg`);
                    return result;
                }
                return null;
            }

            if (responseData.code !== 0) {
                console.warn('B站API: 返回错误, code:', responseData.code);
                
                if (bvidMatch && contentType === 'video') {
                    const bvid = bvidMatch[1];
                    result.title = `B站视频: ${bvid}`;
                    result.isVideo = true;
                    result.videoUrl = url;
                    result.images.push(`https://i0.hdslb.com/bfs/archive/${bvid}.jpg`);
                    return result;
                }
                return null;
            }

            if (contentType === 'video') {
                const data = responseData.data;
                if (data) {
                    result.title = data.title || '';
                    result.excerpt = data.desc || data.description || '';
                    result.author = data.owner?.name || data.owner?.uname || '';
                    result.isVideo = true;
                    result.videoUrl = url;

                    if (data.pic) {
                        const picUrl = data.pic.startsWith('//') ? 'https:' + data.pic : data.pic;
                        result.images.push(picUrl);
                    }

                    if (data.pubdate) {
                        result.date = new Date(data.pubdate * 1000).toISOString();
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
                }
            } else if (contentType === 'opus') {
                const data = responseData.data;
                if (data) {
                    const dynamic = data.item?.modules?.module_dynamic || data;
                    const opus = dynamic?.major?.opus || dynamic;

                    if (opus) {
                        result.title = opus.title || dynamic?.desc?.text || '';
                        result.excerpt = opus.summary || opus.text || dynamic?.desc?.text || '';
                        result.author = data.item?.modules?.module_author?.name?.text || data.item?.user?.uname || '';

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
                    }
                }
            } else if (contentType === 'article') {
                const data = responseData.data;
                if (data) {
                    result.title = data.title || '';
                    result.author = data.author_name || '';
                    result.excerpt = data.summary || '';

                    if (data.banner_url) {
                        result.images.push(data.banner_url);
                    }

                    if (data.images && Array.isArray(data.images)) {
                        data.images.forEach(img => {
                            if (img && !result.images.includes(img)) {
                                result.images.push(img);
                            }
                        });
                    }

                    if (result.title) {
                        let htmlContent = '';
                        if (result.images.length > 0) {
                            htmlContent += `<div style="margin-bottom:12px;"><img src="${result.images[0]}" style="max-width:100%;height:auto;border-radius:12px;display:block;margin:0 auto;" /></div>`;
                        }
                        if (result.excerpt) {
                            htmlContent += `<p style="font-size:15px;color:#374151;line-height:1.7;">${result.excerpt}</p>`;
                        }
                        result.contentHtml = htmlContent;
                        result.content = htmlContent;
                    }
                }
            }

            return (result.title || result.images.length > 0) ? result : null;
        } catch (e) {
            console.warn('B站API调用失败:', e.message);
            return null;
        }
    },

    parseFeishu: function(html, url) {
        try {
            const result = {
                title: '',
                content: '',
                contentHtml: '',
                images: [],
                videos: [],
                pdfs: [],
                author: '',
                date: '',
                excerpt: '',
                isVideo: false,
                videoUrl: ''
            };

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const titleSelectors = [
                'meta[property="og:title"]',
                'meta[name="title"]',
                'title',
                '.docx-title',
                '.wiki-title',
                'h1',
                '.article-title',
                '[class*="title"]',
                '.doc-title'
            ];
            for (const sel of titleSelectors) {
                const el = doc.querySelector(sel);
                if (el) {
                    let val = el.getAttribute('content') || el.textContent || '';
                    val = val.trim();
                    if (val && val.length > 0 && !val.includes('飞书') && !val.includes('Lark')) {
                        result.title = val;
                        break;
                    }
                }
            }

            const descEl = doc.querySelector('meta[name="description"]') || doc.querySelector('meta[property="og:description"]');
            if (descEl) {
                result.excerpt = descEl.getAttribute('content')?.trim() || '';
            }

            const scripts = doc.querySelectorAll('script');
            let pageData = null;
            for (const script of scripts) {
                const text = script.textContent || '';
                if (text.includes('window.__INITIAL_STATE__') || text.includes('window.__pageData__') || text.includes('window._pageData')) {
                    try {
                        const match = text.match(/(?:window\.__INITIAL_STATE__|window\.__pageData__|window\._pageData)\s*=\s*({[\s\S]*});/);
                        if (match) {
                            pageData = JSON.parse(match[1]);
                            break;
                        }
                    } catch(e) {}
                } else if (text.includes('"blocks"') && text.includes('"title"') && text.length > 5000) {
                    try {
                        const jsonMatch = text.match(/({[\s\S]*"blocks"[\s\S]*})/);
                        if (jsonMatch) {
                            pageData = JSON.parse(jsonMatch[1]);
                            break;
                        }
                    } catch(e) {}
                }
            }

            if (pageData) {
                if (!result.title) {
                    const titlePaths = ['title', 'data.title', 'page.title', 'document.title', 'wiki.title'];
                    for (const path of titlePaths) {
                        const parts = path.split('.');
                        let val = pageData;
                        for (const part of parts) {
                            val = val && val[part];
                        }
                        if (val && typeof val === 'string' && val.length > 0) {
                            result.title = val.trim();
                            break;
                        }
                    }
                }

                function extractBlocks(obj) {
                    if (!obj || typeof obj !== 'object') return '';
                    if (Array.isArray(obj)) {
                        return obj.map(extractBlocks).join('');
                    }
                    if (obj.blocks && Array.isArray(obj.blocks)) {
                        return obj.blocks.map(extractBlocks).join('');
                    }
                    if (obj.content && typeof obj.content === 'string') {
                        return '<p>' + obj.content.replace(/\n/g, '<br>') + '</p>';
                    }
                    if (obj.text && typeof obj.text === 'string') {
                        return '<p>' + obj.text.replace(/\n/g, '<br>') + '</p>';
                    }
                    if (obj.image_key || obj.imageToken || obj.imgUrl || obj.url) {
                        const imgUrl = obj.image_key || obj.imageToken || obj.imgUrl || obj.url;
                        if (typeof imgUrl === 'string') {
                            let fullUrl = imgUrl;
                            if (!fullUrl.startsWith('http')) {
                                if (fullUrl.startsWith('//')) {
                                    fullUrl = 'https:' + fullUrl;
                                } else {
                                    fullUrl = 'https://open.feishu.cn/open-apis/im/v1/images/' + imgUrl;
                                }
                            }
                            if (!result.images.includes(fullUrl)) {
                                result.images.push(fullUrl);
                            }
                            return `<p><img src="${fullUrl}" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:10px auto;" /></p>`;
                        }
                    }
                    if (obj.children) {
                        return extractBlocks(obj.children);
                    }
                    return '';
                }

                const htmlContent = extractBlocks(pageData);
                if (htmlContent && htmlContent.length > 50) {
                    result.contentHtml = htmlContent;
                    result.content = htmlContent;
                    result.excerpt = htmlContent.replace(/<[^>]*>/g, '').substring(0, 500).trim();
                }
            }

            if (!result.contentHtml) {
                const contentSelectors = [
                    '.docx-content',
                    '.wiki-content',
                    '.article-content',
                    '.rich-text',
                    '[class*="docx"] [class*="content"]',
                    '[class*="wiki"] [class*="content"]',
                    'article',
                    '#article-content',
                    '.main-content',
                    '.content',
                    '.doc-content',
                    '.docs-content',
                    '[class*="block"]',
                    '.protyle-wysiwyg'
                ];

                let contentEl = null;
                for (const sel of contentSelectors) {
                    const el = doc.querySelector(sel);
                    if (el && el.textContent.trim().length > 100) {
                        contentEl = el;
                        break;
                    }
                }

                if (!contentEl) {
                    const bodyEl = doc.body;
                    if (bodyEl) {
                        const clonedBody = bodyEl.cloneNode(true);
                        clonedBody.querySelectorAll('script, style, noscript, iframe, nav, header, footer, aside').forEach(s => s.remove());
                        if (clonedBody.textContent.trim().length > 100) {
                            contentEl = clonedBody;
                        }
                    }
                }

                if (contentEl) {
                    const clonedEl = contentEl.cloneNode(true);
                    clonedEl.querySelectorAll('script, style, noscript, iframe, svg').forEach(s => s.remove());
                    clonedEl.querySelectorAll('[class*="nav"], [class*="header"], [class*="footer"], [class*="sidebar"], [class*="toolbar"], [class*="menu"]').forEach(s => s.remove());

                    const imgElements = clonedEl.querySelectorAll('img');
                    imgElements.forEach(img => {
                        const attrs = ['data-src', 'data-lazy-src', 'data-original', 'src'];
                        let realSrc = '';
                        for (const attr of attrs) {
                            const val = img.getAttribute(attr);
                            if (val && val.length > 5 && !val.startsWith('data:') && !val.startsWith('blob:')) {
                                realSrc = val;
                                break;
                            }
                        }
                        if (realSrc) {
                            if (!realSrc.startsWith('http')) {
                                try {
                                    realSrc = new URL(realSrc, url).href;
                                } catch(e) {}
                            }
                            img.setAttribute('src', realSrc);
                            img.removeAttribute('data-src');
                            img.removeAttribute('data-lazy-src');
                            img.removeAttribute('data-original');
                            img.removeAttribute('data-srcset');
                            
                            if (!realSrc.includes('placeholder') && !realSrc.includes('logo') && !realSrc.includes('icon') && !realSrc.includes('avatar')) {
                                if (!result.images.includes(realSrc)) {
                                    result.images.push(realSrc);
                                }
                            }
                        } else {
                            img.remove();
                        }
                        
                        img.style.maxWidth = '100%';
                        img.style.height = 'auto';
                        img.style.display = 'block';
                        img.style.margin = '10px auto';
                        img.style.borderRadius = '8px';
                    });

                    clonedEl.querySelectorAll('a').forEach(a => {
                        const href = a.getAttribute('href') || '';
                        if (!href.startsWith('http') && !href.startsWith('#')) {
                            try {
                                a.setAttribute('href', new URL(href, url).href);
                            } catch(e) {}
                        }
                        a.setAttribute('target', '_blank');
                        a.setAttribute('rel', 'noopener noreferrer');
                    });

                    result.contentHtml = clonedEl.innerHTML;
                    result.content = clonedEl.innerHTML;
                }
            }

            if (!result.title && doc.title) {
                const pageTitle = doc.title.replace(/\s*-\s*飞书$/, '').replace(/\s*-\s*Feishu$/, '').replace(/\s*-\s*Lark$/, '').trim();
                if (pageTitle && pageTitle.length > 0) {
                    result.title = pageTitle;
                }
            }

            if (!result.excerpt && result.contentHtml) {
                result.excerpt = result.contentHtml.replace(/<[^>]*>/g, '').substring(0, 500).trim();
            }

            return result;
        } catch (e) {
            console.warn('飞书文档解析失败:', e);
            return null;
        }
    },

    parseJuejin: function(html, url) {
        try {
            const result = {
                title: '',
                content: '',
                contentHtml: '',
                images: [],
                videos: [],
                pdfs: [],
                author: '',
                date: '',
                excerpt: '',
                isVideo: false,
                videoUrl: ''
            };

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const contentSelectors = [
                '.article-content',
                '.markdown-body',
                '.article-content-wrap',
                '#article-root',
                '.post-content',
                '#article-content',
                '[class*="markdown"]',
                '[class*="article-content"]',
                'article'
            ];
            for (const sel of contentSelectors) {
                const el = doc.querySelector(sel);
                if (el && el.textContent.trim().length > 50) {
                    const clonedEl = el.cloneNode(true);
                    clonedEl.querySelectorAll('script, style, noscript, iframe').forEach(s => s.remove());
                    
                    clonedEl.querySelectorAll('.copy-code-btn, .code-block-header, .hljs-ln-numbers').forEach(s => s.remove());
                    
                    clonedEl.querySelectorAll('img').forEach(img => {
                        const attrs = ['data-src', 'data-lazy-src', 'data-original', 'data-srcset', 'src'];
                        let realSrc = '';
                        for (const attr of attrs) {
                            const val = img.getAttribute(attr);
                            if (val && val.length > 5 && !val.includes('data:') && !val.includes('blob:')) {
                                realSrc = val;
                                break;
                            }
                        }
                        if (realSrc) {
                            if (!realSrc.startsWith('http')) {
                                try {
                                    realSrc = new URL(realSrc, 'https://juejin.cn/').href;
                                } catch(e) {}
                            }
                            img.setAttribute('src', realSrc);
                            img.removeAttribute('data-src');
                            img.removeAttribute('data-lazy-src');
                            img.removeAttribute('data-original');
                            img.removeAttribute('data-srcset');
                            
                            if (!realSrc.includes('placeholder') && !realSrc.includes('logo') && !realSrc.includes('icon')) {
                                if (!result.images.includes(realSrc)) {
                                    result.images.push(realSrc);
                                }
                            }
                        }
                        
                        img.loading = 'lazy';
                        img.style.maxWidth = '100%';
                        img.style.height = 'auto';
                    });
                    
                    result.contentHtml = clonedEl.innerHTML;
                    break;
                }
            }

            const ogTitle = doc.querySelector('meta[property="og:title"]') || doc.querySelector('meta[name="title"]');
            if (ogTitle) {
                result.title = ogTitle.getAttribute('content') || '';
            }
            if (!result.title) {
                const titleEl = doc.querySelector('title') || doc.querySelector('h1');
                if (titleEl) {
                    result.title = titleEl.textContent.trim();
                }
            }

            const ogDesc = doc.querySelector('meta[property="og:description"]') || doc.querySelector('meta[name="description"]');
            if (ogDesc) {
                result.excerpt = ogDesc.getAttribute('content') || '';
            }

            const ogImage = doc.querySelector('meta[property="og:image"]');
            if (ogImage) {
                const imgUrl = ogImage.getAttribute('content');
                if (imgUrl && !imgUrl.includes('logo') && !imgUrl.includes('icon')) {
                    let cleanUrl = imgUrl;
                    if (!cleanUrl.startsWith('http')) {
                        cleanUrl = 'https:' + cleanUrl;
                    }
                    result.images.push(cleanUrl);
                }
            }

            const scripts = doc.querySelectorAll('script');
            let articleData = null;
            scripts.forEach(script => {
                const text = script.textContent || '';
                if (text.includes('__INITIAL_STATE__')) {
                    try {
                        const startIdx = text.indexOf('__INITIAL_STATE__');
                        const braceStart = text.indexOf('{', startIdx);
                        if (braceStart > -1) {
                            let braceCount = 0;
                            let endIdx = -1;
                            let inString = false;
                            let stringChar = '';
                            for (let i = braceStart; i < text.length; i++) {
                                const char = text[i];
                                if (char === '"' && !inString) {
                                    inString = true;
                                    stringChar = '"';
                                } else if (char === stringChar && inString) {
                                    inString = false;
                                    stringChar = '';
                                } else if (!inString) {
                                    if (char === '{') braceCount++;
                                    else if (char === '}') {
                                        braceCount--;
                                        if (braceCount === 0) {
                                            endIdx = i + 1;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (endIdx > 0) {
                                const jsonStr = text.substring(braceStart, endIdx);
                                const state = JSON.parse(jsonStr);
                                
                                function findArticleData(obj) {
                                    if (!obj || typeof obj !== 'object') return null;
                                    
                                    if (obj.article_info || obj.articleInfo || obj.post_info || obj.postInfo) {
                                        return obj.article_info || obj.articleInfo || obj.post_info || obj.postInfo;
                                    }
                                    
                                    if (obj.title && (obj.content || obj.mark_content || obj.markdown_content)) {
                                        return obj;
                                    }
                                    
                                    for (const key of Object.keys(obj)) {
                                        const val = obj[key];
                                        if (val && typeof val === 'object') {
                                            const found = findArticleData(val);
                                            if (found) return found;
                                        }
                                    }
                                    return null;
                                }
                                
                                articleData = findArticleData(state);
                                
                                if (!articleData) {
                                    if (state.article) articleData = state.article;
                                    else if (state.postDetail) articleData = state.postDetail;
                                    else if (state.data) articleData = state.data;
                                    else if (state.view) articleData = state.view;
                                }
                            }
                        }
                    } catch(e) {
                        console.warn('解析掘金__INITIAL_STATE__失败:', e.message);
                    }
                }
            });

            if (articleData) {
                if (articleData.title && !result.title) {
                    result.title = articleData.title;
                }
                if (articleData.brief_content && !result.excerpt) {
                    result.excerpt = articleData.brief_content;
                } else if (articleData.summary && !result.excerpt) {
                    result.excerpt = articleData.summary;
                }
                if (articleData.author && !result.author) {
                    result.author = articleData.author.user_name || articleData.author.name || articleData.author_user_name || '';
                } else if (articleData.author_info && !result.author) {
                    result.author = articleData.author_info.user_name || articleData.author_info.name || '';
                }
                
                const coverImg = articleData.cover_image || articleData.cover || articleData.article_cover || articleData.coverImg;
                if (coverImg) {
                    let coverUrl = coverImg;
                    if (Array.isArray(coverUrl)) {
                        coverUrl = coverUrl[0];
                    }
                    if (coverUrl && typeof coverUrl === 'string') {
                        if (!coverUrl.startsWith('http')) {
                            try {
                                coverUrl = new URL(coverUrl, 'https://juejin.cn/').href;
                            } catch(e) {}
                        }
                        if (!result.images.includes(coverUrl)) {
                            result.images.unshift(coverUrl);
                        }
                    }
                }
                
                const contentField = articleData.content || articleData.mark_content || articleData.markdown_content || articleData.article_content;
                if (contentField) {
                    let contentHtml = contentField;
                    if (contentHtml.startsWith('<') || contentHtml.includes('<p>') || contentHtml.includes('<img')) {
                    } else {
                        contentHtml = contentHtml.replace(/\n/g, '<br>');
                    }
                    
                    const contentParser = new DOMParser();
                    const contentDoc = contentParser.parseFromString(contentHtml, 'text/html');
                    const contentImages = contentDoc.querySelectorAll('img');
                    let hasUpdatedImages = false;
                    contentImages.forEach(img => {
                        let src = img.getAttribute('src') || img.getAttribute('data-src') || '';
                        if (src && !src.includes('placeholder') && !src.includes('logo') && !src.includes('icon')) {
                            if (!src.startsWith('http')) {
                                try {
                                    src = new URL(src, 'https://juejin.cn/').href;
                                } catch(e) {}
                            }
                            img.setAttribute('src', src);
                            img.removeAttribute('data-src');
                            hasUpdatedImages = true;
                            if (!result.images.includes(src)) {
                                result.images.push(src);
                            }
                        }
                    });
                    if (hasUpdatedImages) {
                        contentHtml = contentDoc.body.innerHTML;
                    }
                    result.contentHtml = contentHtml;
                }
            }

            if (!result.contentHtml) {
                const contentSelectors = [
                    '.article-content',
                    '.markdown-body',
                    '.post-content',
                    '#article-content',
                    '[class*="markdown"]',
                    '[class*="article-content"]'
                ];
                for (const sel of contentSelectors) {
                    const el = doc.querySelector(sel);
                    if (el && el.textContent.trim().length > 50) {
                        const clonedEl = el.cloneNode(true);
                        clonedEl.querySelectorAll('script, style, noscript').forEach(s => s.remove());
                        
                        clonedEl.querySelectorAll('img').forEach(img => {
                            const attrs = ['data-src', 'data-lazy-src', 'data-original', 'src'];
                            let realSrc = '';
                            for (const attr of attrs) {
                                const val = img.getAttribute(attr);
                                if (val && val.length > 5 && !val.includes('data:') && !val.includes('blob:')) {
                                    realSrc = val;
                                    break;
                                }
                            }
                            if (realSrc) {
                                img.setAttribute('src', realSrc);
                                img.removeAttribute('data-src');
                                img.removeAttribute('data-lazy-src');
                                img.removeAttribute('data-original');
                                
                                if (!realSrc.startsWith('http')) {
                                    try {
                                        const absoluteSrc = new URL(realSrc, 'https://juejin.cn/').href;
                                        img.setAttribute('src', absoluteSrc);
                                        if (!result.images.includes(absoluteSrc)) {
                                            result.images.push(absoluteSrc);
                                        }
                                    } catch(e) {}
                                } else {
                                    if (!result.images.includes(realSrc)) {
                                        result.images.push(realSrc);
                                    }
                                }
                            }
                        });
                        
                        result.contentHtml = clonedEl.innerHTML;
                        break;
                    }
                }
            }

            if (!result.contentHtml && result.excerpt) {
                result.contentHtml = '<p>' + result.excerpt + '</p>';
            }

            if (!result.author) {
                const authorSelectors = [
                    '.author-name',
                    '[class*="author"]',
                    '.username',
                    '[class*="username"]',
                    '.user-name'
                ];
                for (const sel of authorSelectors) {
                    const el = doc.querySelector(sel);
                    if (el) {
                        const text = el.textContent.trim();
                        if (text && text.length < 30) {
                            result.author = text;
                            break;
                        }
                    }
                }
            }

            return (result.title || result.contentHtml || result.images.length > 0) ? result : null;
        } catch (e) {
            console.warn('掘金解析失败:', e.message);
            return null;
        }
    },

    parseDouyin: function(html, url) {
        try {
            const result = {
                title: '',
                content: '',
                contentHtml: '',
                images: [],
                videos: [],
                author: '',
                date: '',
                excerpt: '',
                isVideo: true,
                videoUrl: url
            };

            if (!html) return null;

            // 提取 _ROUTER_DATA（抖音页面主数据源）
            const routerMatch = html.match(/window\._ROUTER_DATA\s*=\s*(\{.*?\})\s*<\/script>/s);
            if (routerMatch) {
                try {
                    let jsonText = routerMatch[1];
                    // 抖音数据中可能含未转义引号（HTML 中已转义为 \"），需要还原
                    // \u002F -> / 等
                    const decoded = jsonText
                        .replace(/\\"/g, '"')
                        .replace(/\\u002F/g, '/')
                        .replace(/\\n/g, '\n')
                        .replace(/\\r/g, '')
                        .replace(/\\t/g, '\t');
                    const data = JSON.parse(decoded);

                    // 递归查找视频信息（路径：loaderData['video_(id)/page'].videoInfoRes.item_list[0]）
                    const findItem = (obj, depth) => {
                        if (depth > 10) return null;
                        if (!obj || typeof obj !== 'object') return null;
                        if (Array.isArray(obj)) {
                            for (const v of obj) {
                                const r = findItem(v, depth + 1);
                                if (r) return r;
                            }
                            return null;
                        }
                        if (obj.video && obj.video.play_addr) return obj;
                        for (const k in obj) {
                            const r = findItem(obj[k], depth + 1);
                            if (r) return r;
                        }
                        return null;
                    };

                    const loaderData = data.loaderData || {};
                    let videoItem = null;
                    for (const path in loaderData) {
                        const candidate = findItem(loaderData[path], 0);
                        if (candidate) { videoItem = candidate; break; }
                    }

                    if (videoItem) {
                        // 标题（desc 优先于 title）
                        if (videoItem.desc) {
                            result.title = videoItem.desc;
                        } else if (videoItem.title) {
                            result.title = videoItem.title;
                        }

                        // 作者
                        if (videoItem.author) {
                            if (typeof videoItem.author === 'string') {
                                result.author = videoItem.author;
                            } else if (videoItem.author.nickname) {
                                result.author = videoItem.author.nickname;
                            }
                        }

                        // 发布时间
                        if (videoItem.create_time) {
                            const ts = parseInt(videoItem.create_time);
                            if (ts > 1000000000) {
                                result.date = new Date(ts * 1000).toISOString().split('T')[0];
                            }
                        }

                        // 封面图
                        if (videoItem.video && videoItem.video.cover && Array.isArray(videoItem.video.cover.url_list) && videoItem.video.cover.url_list.length > 0) {
                            result.images.push(videoItem.video.cover.url_list[0]);
                        } else if (videoItem.video && videoItem.video.dynamic_cover && Array.isArray(videoItem.video.dynamic_cover.url_list) && videoItem.video.dynamic_cover.url_list.length > 0) {
                            result.images.push(videoItem.video.dynamic_cover.url_list[0]);
                        }

                        // 视频地址（去除水印：将 playwm 替换为 play）
                        if (videoItem.video && videoItem.video.play_addr && Array.isArray(videoItem.video.play_addr.url_list)) {
                            const playUrls = videoItem.video.play_addr.url_list.map(u => 
                                u.replace(/\/playwm\//, '/play/')
                                 .replace(/playwm%2F/g, 'play%2F')
                                 .replace(/playwm/g, 'play')
                            );
                            // 保留带水印地址作为备选
                            result.videos = playUrls.filter(u => u && u.startsWith('http'));
                        }
                    }
                } catch (e) {
                    console.warn('抖音 _ROUTER_DATA 解析失败:', e.message);
                }
            }

            // 回退：用 og:title / og:image / og:video
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            if (!result.title) {
                const ogTitle = doc.querySelector('meta[property="og:title"]');
                if (ogTitle) result.title = ogTitle.getAttribute('content')?.trim() || '';
            }
            if (result.images.length === 0) {
                const ogImage = doc.querySelector('meta[property="og:image"]');
                if (ogImage) {
                    const imgUrl = ogImage.getAttribute('content');
                    if (imgUrl) result.images.push(imgUrl);
                }
            }
            if (!result.author) {
                const ogSiteName = doc.querySelector('meta[property="og:site_name"]');
                if (ogSiteName) result.author = ogSiteName.getAttribute('content')?.replace('@', '')?.trim() || '';
            }

            // 文案：去标题中的 #话题# 标签后保留为正文
            if (result.title) {
                const cleanDesc = result.title.replace(/#([^#\s]+)#/g, '').trim();
                result.content = cleanDesc;
                result.excerpt = cleanDesc;
            }

            // 兜底标题
            if (!result.title) {
                result.title = '抖音 · 视频';
            }

            return (result.title || result.videos.length > 0) ? result : null;
        } catch (e) {
            console.warn('抖音解析失败:', e.message);
            return null;
        }
    },

    parseCsdn: function(html, url) {
        try {
            const result = {
                title: '',
                content: '',
                contentHtml: '',
                images: [],
                videos: [],
                author: '',
                date: '',
                excerpt: '',
                rawHtml: html
            };

            if (!html) return null;

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // 标题
            const titleEl = doc.querySelector('h1.title-article') || 
                           doc.querySelector('article h1') || 
                           doc.querySelector('.article-title h1') ||
                           doc.querySelector('title');
            if (titleEl) {
                result.title = titleEl.textContent.trim();
                if (result.title.includes('- CSDN')) {
                    result.title = result.title.split('- CSDN')[0].trim();
                }
            }

            // 作者
            const authorEl = doc.querySelector('.article-bar__name') ||
                            doc.querySelector('.info-box .user-name') ||
                            doc.querySelector('.user-info-name');
            if (authorEl) {
                result.author = authorEl.textContent.trim();
            }

            // 发布时间
            const timeEl = doc.querySelector('.article-bar__time') ||
                          doc.querySelector('.info-box .time') ||
                          doc.querySelector('.time');
            if (timeEl) {
                const timeText = timeEl.textContent.trim();
                const dateMatch = timeText.match(/(\d{4})[-/年](\d{1,2})[-/月](\d{1,2})[日号]?/);
                if (dateMatch) {
                    result.date = `${dateMatch[1]}-${dateMatch[2].padStart(2, '0')}-${dateMatch[3].padStart(2, '0')}`;
                }
            }

            // 内容区域
            const contentEl = doc.querySelector('#article_content') ||
                             doc.querySelector('.article_content') ||
                             doc.querySelector('article .markdown-body') ||
                             doc.querySelector('.content');
            if (contentEl) {
                const clonedEl = contentEl.cloneNode(true);
                
                // 移除广告、导航、工具条等
                clonedEl.querySelectorAll('script, style, noscript, iframe, svg').forEach(el => el.remove());
                clonedEl.querySelectorAll('[class*="ad"], [class*="nav"], [class*="header"], [class*="footer"], [class*="sidebar"], [class*="toolbar"], [class*="menu"], [class*="recommend"], [class*="hot"], [class*="related"], [class*="comment"], [class*="praise"], [class*="like"], [class*="star"], [class*="heart"]').forEach(el => el.remove());

                // 截断"下一篇"之后的所有内容（包括图片和文字）
                const allElements = clonedEl.querySelectorAll('*');
                for (const el of allElements) {
                    if (el.textContent.includes('下一篇') || el.textContent.includes('相关推荐') || el.textContent.includes('猜你喜欢')) {
                        // 删除该元素及其之后的所有兄弟元素
                        let sibling = el.nextElementSibling;
                        while (sibling) {
                            const next = sibling.nextElementSibling;
                            sibling.remove();
                            sibling = next;
                        }
                        el.remove();
                        break;
                    }
                }

                // 过滤图片：只保留有意义的内容图片，过滤小图标
                const imgElements = clonedEl.querySelectorAll('img');
                imgElements.forEach(img => {
                    const attrs = ['data-src', 'data-lazy-src', 'data-original', 'src'];
                    let realSrc = '';
                    for (const attr of attrs) {
                        const val = img.getAttribute(attr);
                        if (val && val.length > 5 && !val.startsWith('data:') && !val.startsWith('blob:')) {
                            realSrc = val;
                            break;
                        }
                    }
                    
                    if (realSrc) {
                        if (!realSrc.startsWith('http')) {
                            try {
                                realSrc = new URL(realSrc, url).href;
                            } catch(e) {}
                        }
                        
                        // 过滤小图标：
                        // 1. URL中包含 icon、logo、avatar、badge、btn、arrow 等关键词
                        // 2. 尺寸小于 100x100 的图片（通过 URL 参数或属性判断）
                        // 3. CSDN特有的点赞、收藏图标等
                        const isBadIcon = 
                            realSrc.includes('icon') ||
                            realSrc.includes('logo') ||
                            realSrc.includes('avatar') ||
                            realSrc.includes('badge') ||
                            realSrc.includes('btn') ||
                            realSrc.includes('arrow') ||
                            realSrc.includes('praise') ||
                            realSrc.includes('like') ||
                            realSrc.includes('star') ||
                            realSrc.includes('heart') ||
                            realSrc.includes('thumb') ||
                            realSrc.includes('comment') ||
                            realSrc.includes('share') ||
                            realSrc.includes('follow') ||
                            realSrc.includes('collect') ||
                            realSrc.includes('gift') ||
                            realSrc.includes('coin') ||
                            realSrc.includes('eye') ||
                            realSrc.includes('read') ||
                            realSrc.includes('tag') ||
                            realSrc.includes('csdnimg.cn/imgextra') ||
                            realSrc.includes('csdnimg.cn/copilot') ||
                            realSrc.includes('csdnimg.cn/nav') ||
                            realSrc.includes('csdnimg.cn/toolbar') ||
                            realSrc.includes('csdnimg.cn/ad') ||
                            realSrc.includes('csdnimg.cn/avatar') ||
                            realSrc.includes('csdnimg.cn/community') ||
                            realSrc.includes('csdnimg.cn/pc') ||
                            realSrc.includes('csdnimg.cn/mobile') ||
                            realSrc.includes('.ico') ||
                            realSrc.includes('.svg');
                        
                        // 检查图片尺寸属性
                        const width = parseInt(img.getAttribute('width')) || parseInt(img.style.width) || 0;
                        const height = parseInt(img.getAttribute('height')) || parseInt(img.style.height) || 0;
                        const isSmallIcon = (width > 0 && height > 0 && width < 100 && height < 100);
                        
                        if (isBadIcon || isSmallIcon) {
                            img.remove();
                        } else {
                            img.setAttribute('src', realSrc);
                            img.removeAttribute('data-src');
                            img.removeAttribute('data-lazy-src');
                            img.removeAttribute('data-original');
                            img.removeAttribute('data-srcset');
                            
                            img.style.maxWidth = '100%';
                            img.style.height = 'auto';
                            img.style.display = 'block';
                            img.style.margin = '10px auto';
                            img.style.borderRadius = '8px';
                            
                            if (!result.images.includes(realSrc)) {
                                result.images.push(realSrc);
                            }
                        }
                    } else {
                        img.remove();
                    }
                });

                // 清理链接
                clonedEl.querySelectorAll('a').forEach(a => {
                    const href = a.getAttribute('href') || '';
                    if (!href.startsWith('http') && !href.startsWith('#')) {
                        try {
                            a.setAttribute('href', new URL(href, url).href);
                        } catch(e) {}
                    }
                    a.setAttribute('target', '_blank');
                    a.setAttribute('rel', 'noopener noreferrer');
                });

                result.contentHtml = clonedEl.innerHTML;
                result.content = clonedEl.textContent.trim();
            }

            // 兜底：从 og:image 获取封面图
            if (result.images.length === 0) {
                const ogImage = doc.querySelector('meta[property="og:image"]');
                if (ogImage) {
                    const imgUrl = ogImage.getAttribute('content');
                    if (imgUrl && !imgUrl.includes('icon') && !imgUrl.includes('logo')) {
                        const cleanUrl = imgUrl.startsWith('//') ? 'https:' + imgUrl : imgUrl;
                        result.images.push(cleanUrl);
                    }
                }
            }

            return (result.title || result.contentHtml || result.images.length > 0) ? result : null;
        } catch (e) {
            console.warn('CSDN解析失败:', e.message);
            return null;
        }
    },

    parseHupu: function(html, url) {
        try {
            const result = {
                title: '',
                content: '',
                contentHtml: '',
                images: [],
                videos: [],
                author: '',
                date: '',
                excerpt: '',
                rawHtml: html
            };

            if (!html) return null;

            // 虎扑新版是 Next.js SPA，内容在 __NEXT_DATA__ 脚本中
            let nextData = null;
            const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
            if (nextDataMatch) {
                try {
                    nextData = JSON.parse(nextDataMatch[1]);
                } catch(e) {
                    console.warn('虎扑 __NEXT_DATA__ 解析失败:', e.message);
                }
            }

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // 标题：优先从 __NEXT_DATA__ 获取，其次从 DOM 获取
            if (nextData) {
                const threadInfo = nextData.props?.pageProps?.threadInfo;
                const moduleConfigList = nextData.props?.pageProps?.threadData?.data?.moduleConfigList;
                
                if (threadInfo?.t_desc?.title) {
                    result.title = threadInfo.t_desc.title;
                } else if (threadInfo?.t_detail?.title) {
                    result.title = threadInfo.t_detail.title;
                } else if (moduleConfigList?.title?.moduleContent?.title) {
                    result.title = moduleConfigList.title.moduleContent.title;
                }
            }
            
            // 如果 __NEXT_DATA__ 中没有标题，尝试从 DOM 获取
            if (!result.title) {
                const titleEl = doc.querySelector('title');
                if (titleEl) {
                    let title = titleEl.textContent.trim();
                    title = title.replace(/-[^-]*虎扑社区$/, '').replace(/-[^-]*$/, '').trim();
                    result.title = title;
                }
            }
            
            // 优先从 wx-share-data-title meta 获取完整标题
            const wxShareTitleEl = doc.querySelector('meta[name="wx-share-data-title"]');
            if (wxShareTitleEl) {
                const wxTitle = wxShareTitleEl.getAttribute('content');
                if (wxTitle && wxTitle.length > result.title.length) {
                    result.title = wxTitle;
                }
            }

            // 作者
            if (nextData) {
                const authorName = nextData.props?.pageProps?.threadData?.data?.basicInfo?.author?.name;
                if (authorName) {
                    result.author = authorName;
                }
            }
            if (!result.author) {
                const authorEl = doc.querySelector('.bbs-user-wrapper-content-name-span');
                if (authorEl) {
                    result.author = authorEl.textContent.trim();
                }
            }

            // 内容：优先从 __NEXT_DATA__ 获取，其次从 DOM 获取
            let contentHtml = '';
            if (nextData) {
                const threadInfo = nextData.props?.pageProps?.threadInfo;
                const moduleConfigList = nextData.props?.pageProps?.threadData?.data?.moduleConfigList;
                
                if (threadInfo?.t_detail?.content) {
                    contentHtml = threadInfo.t_detail.content;
                } else if (moduleConfigList?.content?.moduleContent?.content) {
                    contentHtml = moduleConfigList.content.moduleContent.content;
                }
            }

            // 如果从 __NEXT_DATA__ 获取到内容，解析它
            if (contentHtml) {
                const contentDoc = parser.parseFromString('<div class="hupu-content">' + contentHtml + '</div>', 'text/html');
                const contentContainer = contentDoc.querySelector('.hupu-content');
                
                if (contentContainer) {
                    // 移除脚本和样式
                    contentContainer.querySelectorAll('script, style, noscript, iframe, svg').forEach(el => el.remove());

                    // 提取图片
                    const imgElements = contentContainer.querySelectorAll('img');
                    imgElements.forEach(img => {
                        let realSrc = img.getAttribute('data-origin') || 
                                      img.getAttribute('data_url') || 
                                      img.getAttribute('src') || '';
                        
                        if (realSrc && realSrc.length > 5 && !realSrc.startsWith('data:')) {
                            if (!realSrc.startsWith('http')) {
                                try {
                                    realSrc = new URL(realSrc, url).href;
                                } catch(e) {}
                            }
                            
                            // 清理阿里云 OSS 处理参数，保留原图
                            realSrc = realSrc.replace(/\?x-oss-process=image\/resize[^&]*/, '');
                            
                            img.setAttribute('src', realSrc);
                            img.removeAttribute('data-origin');
                            img.removeAttribute('data_url');
                            img.removeAttribute('data-src');
                            
                            img.style.maxWidth = '100%';
                            img.style.height = 'auto';
                            img.style.display = 'block';
                            img.style.margin = '10px auto';
                            img.style.borderRadius = '8px';
                            
                            if (!result.images.includes(realSrc)) {
                                result.images.push(realSrc);
                            }
                        } else {
                            img.remove();
                        }
                    });

                    // 清理链接
                    contentContainer.querySelectorAll('a').forEach(a => {
                        const href = a.getAttribute('href') || '';
                        if (!href.startsWith('http') && !href.startsWith('#')) {
                            try {
                                a.setAttribute('href', new URL(href, url).href);
                            } catch(e) {}
                        }
                        a.setAttribute('target', '_blank');
                        a.setAttribute('rel', 'noopener noreferrer');
                    });

                    result.contentHtml = contentContainer.innerHTML;
                    result.content = contentContainer.textContent.trim().replace(/\s+/g, ' ');
                }
            }

            // 如果 __NEXT_DATA__ 没有内容，尝试从 DOM 获取（旧版页面）
            if (!result.contentHtml) {
                const contentEl = doc.querySelector('.bbs-content.is_from_old_editor') ||
                                 doc.querySelector('.bbs-content');
                if (contentEl) {
                    const clonedEl = contentEl.cloneNode(true);
                    
                    clonedEl.querySelectorAll('script, style, noscript, iframe, svg').forEach(el => el.remove());

                    const imgElements = clonedEl.querySelectorAll('img');
                    imgElements.forEach(img => {
                        let realSrc = img.getAttribute('data-origin') || 
                                      img.getAttribute('data_url') || 
                                      img.getAttribute('src') || '';
                        
                        if (realSrc && realSrc.length > 5 && !realSrc.startsWith('data:')) {
                            if (!realSrc.startsWith('http')) {
                                try {
                                    realSrc = new URL(realSrc, url).href;
                                } catch(e) {}
                            }
                            
                            realSrc = realSrc.replace(/\?x-oss-process=image\/resize[^&]*/, '');
                            
                            img.setAttribute('src', realSrc);
                            img.removeAttribute('data-origin');
                            img.removeAttribute('data_url');
                            img.removeAttribute('data-src');
                            
                            img.style.maxWidth = '100%';
                            img.style.height = 'auto';
                            img.style.display = 'block';
                            img.style.margin = '10px auto';
                            img.style.borderRadius = '8px';
                            
                            if (!result.images.includes(realSrc)) {
                                result.images.push(realSrc);
                            }
                        } else {
                            img.remove();
                        }
                    });

                    clonedEl.querySelectorAll('a').forEach(a => {
                        const href = a.getAttribute('href') || '';
                        if (!href.startsWith('http') && !href.startsWith('#')) {
                            try {
                                a.setAttribute('href', new URL(href, url).href);
                            } catch(e) {}
                        }
                        a.setAttribute('target', '_blank');
                        a.setAttribute('rel', 'noopener noreferrer');
                    });

                    result.contentHtml = clonedEl.innerHTML;
                    result.content = clonedEl.textContent.trim().replace(/\s+/g, ' ');
                }
            }

            return (result.title || result.contentHtml || result.images.length > 0) ? result : null;
        } catch (e) {
            console.warn('虎扑解析失败:', e.message);
            return null;
        }
    },

    parseHtmlContent(html, url) {
        const result = {
            title: '',
            content: '',
            contentHtml: '',
            images: [],
            videos: [],
            author: '',
            date: '',
            excerpt: '',
            rawHtml: html
        };

        const parsedPlatform = this.detectPlatform(url);
        const platformKey = parsedPlatform?.platform;

        if (platformKey === 'douyin') {
            const dyResult = this.parseDouyin(html, url);
            if (dyResult) {
                Object.assign(result, dyResult);
            }
            return result;
        }

        if (platformKey === 'csdn') {
            const csdnResult = this.parseCsdn(html, url);
            if (csdnResult) {
                Object.assign(result, csdnResult);
            }
            return result;
        }

        if (platformKey === 'hupu') {
            const hupuResult = this.parseHupu(html, url);
            if (hupuResult) {
                Object.assign(result, hupuResult);
            }
            return result;
        }

        if (platformKey === 'xiaohongshu') {
            const xhsResult = this.parseXiaohongshu(html);
            if (xhsResult) {
                Object.assign(result, xhsResult);
                return result;
            }
        }

        if (platformKey === 'bilibili') {
            const biliResult = this.parseBilibili(html, url);
            if (biliResult) {
                Object.assign(result, biliResult);
            }
            
            const needFallback = (!result.title || result.title.length < 5) || 
                                (result.isVideo && (!result.images || result.images.length === 0)) ||
                                (url.includes('/opus/') && (!result.title || result.images.length === 0));
            
            if (needFallback && url.includes('/video/')) {
                const bvidMatch = url.match(/(BV[a-zA-Z0-9]{10,})/i);
                if (bvidMatch) {
                    const bvid = bvidMatch[1];
                    if (!result.title) result.title = `B站视频: ${bvid}`;
                    result.isVideo = true;
                    result.videoUrl = url;
                    if (!result.images || result.images.length === 0) {
                        result.images.push(`https://i0.hdslb.com/bfs/archive/${bvid}.jpg`);
                    }
                }
            }
            
            if (result.title || result.content || result.images.length > 0) {
                return result;
            }
        }

        if (platformKey === 'wechat') {
            const wxResult = this.parseWechatArticle(html);
            if (wxResult) {
                Object.assign(result, wxResult);
                return result;
            }
        }

        if (platformKey === 'juejin') {
            const juejinResult = this.parseJuejin(html, url);
            if (juejinResult && juejinResult.images && juejinResult.images.length > 0) {
                result.images = juejinResult.images;
            }
        }

        if (platformKey === 'feishu') {
            const feishuResult = this.parseFeishu(html, url);
            if (feishuResult) {
                Object.assign(result, feishuResult);
                return result;
            }
        }

        if (platformKey === 'general' || !platformKey) {
            const wxResult = this.parseWechatArticle(html);
            if (wxResult && wxResult.content) {
                Object.assign(result, wxResult);
                return result;
            }
        }

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const isImageRichSite = url.includes('coolapk.com') || 
                                     url.includes('ifanr.com') ||
                                     url.includes('zhihu.com') && !url.includes('zhuanlan.zhihu.com');
            
            if (window.Readability) {
                try {
                    const reader = new Readability(doc);
                    const article = reader.parse();
                    if (article) {
                        result.title = article.title || '';
                        result.content = article.content || '';
                        result.excerpt = article.excerpt || '';
                        result.author = article.byline || '';
                    }
                } catch (e) {
                    console.warn('Readability解析失败，使用备用方法:', e);
                }
            }
            
            if (isImageRichSite || !result.content) {
                let contentSelectors = [
                    'article',
                    '.article',
                    '.post-content',
                    '.article-content',
                    '.detail-content',
                    '#article-content',
                    '.rich-text',
                    '.content-detail',
                    '.main-content',
                    '.content',
                    'main',
                    '#main',
                    '#content',
                    '.entry-content',
                    '[class*="content"]'
                ];
                
                if (url.includes('coolapk.com')) {
                    contentSelectors = [
                        '.detail-article',
                        '.article-content',
                        '.feed-detail-content',
                        '.detail-content',
                        '#feed-detail',
                        '.feed-content',
                        '[class*="article-content"]',
                        '[class*="detail-content"]',
                        'article'
                    ];
                }
                
                if (url.includes('developer.apple.com') || url.includes('apple.com')) {
                    contentSelectors = [
                        '.article-content',
                        '.content',
                        'article',
                        '[role="main"]',
                        '.main-content',
                        '#main'
                    ];
                }
                
                if (url.includes('juejin.cn')) {
                    contentSelectors = [
                        '.article-content',
                        '.markdown-body',
                        '.article-content-wrap',
                        '#article-root',
                        'article'
                    ];
                }
                
                for (const selector of contentSelectors) {
                    const el = doc.querySelector(selector);
                    if (el && el.textContent.trim().length > 100) {
                        const clonedEl = el.cloneNode(true);
                        
                        const removeSelectors = [
                            'script', 'style', 'noscript', 'iframe', 'nav', 'footer', 'header',
                            '.advertisement', '.ad', '.ads', '.advert',
                            '.comment', '.comments', '.comment-list', '#comments',
                            '.sidebar', '.side-bar', '.aside',
                            '.share', '.share-btn', '.share-bar',
                            '.like', '.like-btn', '.like-count',
                            '.follow', '.follow-btn',
                            '.user-info', '.author-info', '.user-card',
                            '.download-app', '.app-download', '.download-bar',
                            '.app-promo', '.promo', '.banner',
                            '.toolbar', '.action-bar', '.action-area',
                            '.tags', '.tag-list', '.topic-list',
                            '.stats', '.stat-count', '.counts',
                            '.related', '.recommend', '.recommendation',
                            '.prev-next', '.pagination',
                            '[class*="ad-"]', '[class*="advert"]',
                            '[class*="comment"]', '[class*="sidebar"]',
                            '[class*="share"]', '[class*="follow"]',
                            '[class*="download"]', '[class*="promo"]',
                            '[class*="banner"]', '[id*="ad-"]',
                            '[class*="user-info"]', '[class*="author-info"]',
                            '[class*="like"]', '[class*="stats"]',
                            '[class*="related"]', '[class*="recommend"]'
                        ];
                        
                        if (url.includes('coolapk.com')) {
                            removeSelectors = removeSelectors.concat([
                                '.feed-top', '.feed-header',
                                '.feed-bottom', '.feed-footer', '.feed-actions',
                                '.open-app', '.open-in-app', '.app-tip',
                                '.coolapk-download', '.download-tip',
                                '[class*="open-app"]',
                                '[class*="open_in_app"]', '[class*="app_download"]',
                                '[class*="feed-top"]', '[class*="feed-header"]',
                                '[class*="feed-bottom"]', '[class*="feed-footer"]',
                                '[class*="feed-action"]'
                            ]);
                        }
                        
                        if (url.includes('developer.apple.com') || url.includes('apple.com/newsroom')) {
                            removeSelectors = removeSelectors.concat([
                                '.ac-globalnav', '.ac-localnav',
                                '.breadcrumb', '.breadcrumbs',
                                '.documentation-toc', '.toc',
                                '[class*="globalnav"]', '[class*="localnav"]',
                                '[class*="breadcrumb"]', '[class*="toc"]'
                            ]);
                        }
                        
                        removeSelectors.forEach(sel => {
                            try {
                                clonedEl.querySelectorAll(sel).forEach(node => node.remove());
                            } catch(e) {}
                        });
                        
                        clonedEl.querySelectorAll('img').forEach(img => {
                            const attrs = ['data-src', 'data-lazy-src', 'data-original', 'data-srcset', 'data-original-src', 'src'];
                            let realSrc = '';
                            for (const attr of attrs) {
                                const val = img.getAttribute(attr);
                                if (val && val.length > 5 && !val.includes('data:') && !val.includes('blob:')) {
                                    realSrc = val;
                                    break;
                                }
                            }
                            if (realSrc) {
                                if (realSrc.startsWith('//')) {
                                    realSrc = 'https:' + realSrc;
                                } else if (!realSrc.startsWith('http')) {
                                    try {
                                        realSrc = new URL(realSrc, url).href;
                                    } catch(e) {}
                                }
                                img.setAttribute('src', realSrc);
                                img.removeAttribute('data-src');
                                img.removeAttribute('data-lazy-src');
                                img.removeAttribute('data-original');
                                img.removeAttribute('data-srcset');
                            }
                            
                            img.loading = 'lazy';
                            img.style.maxWidth = '100%';
                            img.style.height = 'auto';
                        });
                        
                        clonedEl.querySelectorAll('a').forEach(a => {
                            a.removeAttribute('target');
                        });
                        
                        const textContent = clonedEl.textContent.trim();
                        if (textContent.length > 50) {
                            result.content = clonedEl.innerHTML;
                            result.contentHtml = clonedEl.innerHTML;
                            if (!result.title) {
                                const titleEl = doc.querySelector('title') || doc.querySelector('h1') || doc.querySelector('.title') || doc.querySelector('[class*="title"]');
                                result.title = titleEl ? titleEl.textContent.trim() : '';
                            }
                            break;
                        }
                    }
                }
            }

            if (!result.title) {
                const titleEl = doc.querySelector('title');
                result.title = titleEl ? titleEl.textContent.trim() : '';
            }

            if (!result.content) {
                const selectors = [
                    'article',
                    '.article',
                    '.post-content',
                    '.content',
                    '.main-content',
                    '.article-content',
                    '[class*="content"]',
                    'main',
                    '#main',
                    '#content',
                    '.entry-content'
                ];
                
                for (const selector of selectors) {
                    const el = doc.querySelector(selector);
                    if (el && el.textContent.trim().length > 100) {
                        result.content = el.innerHTML;
                        break;
                    }
                }
            }

            if (!result.content) {
                const body = doc.querySelector('body');
                if (body) {
                    const text = body.textContent;
                    if (text.length > 100) {
                        result.content = '<p>' + text.substring(0, 2000) + '</p>';
                    }
                }
            }

            const ogImage = doc.querySelector('meta[property="og:image"]') || doc.querySelector('meta[name="og:image"]');
            if (ogImage) {
                const ogImageUrl = ogImage.getAttribute('content')?.trim();
                if (ogImageUrl && ogImageUrl.startsWith('http') && !result.images.includes(ogImageUrl)) {
                    result.images.unshift(ogImageUrl);
                }
            }

            const imgElements = doc.querySelectorAll('img');
            imgElements.forEach(img => {
                // 优先检查 data-* 属性，避免 src 为占位符时被误用
                const attrs = ['data-src', 'data-lazy-src', 'data-original', 'data-srcset', 'data-original-src', 'data-img-url', 'data-image-src', 'src'];
                let src = '';
                for (const attr of attrs) {
                    const val = img.getAttribute(attr);
                    if (val && val.length > 5 && !val.includes('data:') && !val.includes('blob:')) {
                        src = val;
                        break;
                    }
                }
                
                if (!src) return;
                
                src = src.trim();
                
                if (src.includes('placeholder') || src.includes('logo') || src.includes('icon')) {
                    return;
                }
                // 酷安图片不过滤avatar，因为酷安正文图片可能包含avatar关键词
                
                if (src.startsWith('data:') || src.startsWith('blob:')) {
                    return;
                }
                
                let finalUrl = '';
                
                if (src.startsWith('http://') || src.startsWith('https://')) {
                    finalUrl = src;
                } else if (src.startsWith('//')) {
                    finalUrl = 'https:' + src;
                } else {
                    let baseUrl = url;
                    
                    const baseTag = doc.querySelector('base');
                    if (baseTag && baseTag.getAttribute('href')) {
                        const baseHref = baseTag.getAttribute('href');
                        if (baseHref.startsWith('http')) {
                            baseUrl = baseHref;
                        }
                    }
                    
                    if (!baseUrl || !baseUrl.startsWith('http')) {
                        const ogUrl = doc.querySelector('meta[property="og:url"]');
                        if (ogUrl && ogUrl.getAttribute('content')) {
                            const ogContent = ogUrl.getAttribute('content');
                            if (ogContent.startsWith('http')) {
                                baseUrl = ogContent;
                            }
                        }
                    }
                    
                    if (!baseUrl || !baseUrl.startsWith('http')) {
                        const canonical = doc.querySelector('link[rel="canonical"]');
                        if (canonical && canonical.getAttribute('href')) {
                            const canHref = canonical.getAttribute('href');
                            if (canHref.startsWith('http')) {
                                baseUrl = canHref;
                            }
                        }
                    }
                    
                    if (baseUrl && baseUrl.startsWith('http')) {
                        try {
                            finalUrl = new URL(src, baseUrl).href;
                        } catch(e) {
                            if (src.startsWith('/')) {
                                try {
                                    const parsedBase = new URL(baseUrl);
                                    finalUrl = parsedBase.protocol + '//' + parsedBase.host + src;
                                } catch(e2) {}
                            }
                        }
                    }
                }
                
                if (finalUrl && finalUrl.startsWith('http') && !result.images.includes(finalUrl)) {
                    result.images.push(finalUrl);
                }
            });

            const videoElements = doc.querySelectorAll('video');
            videoElements.forEach(video => {
                const src = video.src || (video.querySelector('source')?.src);
                if (src) {
                    result.videos.push(src);
                }
            });

            const metaAuthor = doc.querySelector('meta[name="author"]') || doc.querySelector('meta[property="article:author"]');
            if (metaAuthor) {
                result.author = metaAuthor.getAttribute('content') || '';
            }

            const metaDate = doc.querySelector('meta[name="date"]') || 
                            doc.querySelector('meta[property="article:published_time"]') ||
                            doc.querySelector('meta[property="og:updated_time"]');
            if (metaDate) {
                result.date = metaDate.getAttribute('content') || '';
            }

        } catch (error) {
            console.error('解析HTML内容失败:', error);
        }

        if (result.contentHtml && url && url.startsWith('http')) {
            try {
                const baseUrl = url;
                result.contentHtml = result.contentHtml.replace(/<img([^>]+)src=["']([^"']+)["']([^>]*)>/gi, (match, before, src, after) => {
                    let absoluteSrc = src;
                    if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('blob:')) {
                        if (src.startsWith('//')) {
                            absoluteSrc = 'https:' + src;
                        } else if (src.startsWith('/')) {
                            try {
                                const parsedBase = new URL(baseUrl);
                                absoluteSrc = parsedBase.protocol + '//' + parsedBase.host + src;
                            } catch(e) {}
                        } else {
                            try {
                                absoluteSrc = new URL(src, baseUrl).href;
                            } catch(e) {}
                        }
                    }
                    return `<img${before}src="${absoluteSrc}"${after}>`;
                });
            } catch(e) {
                console.warn('内容图片URL绝对化失败:', e.message);
            }
        }

        return result;
    },

    htmlToMarkdown(html) {
        if (!html) return '';
        
        let text = html;
        
        text = text.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
        text = text.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
        text = text.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
        text = text.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');
        text = text.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n');
        
        text = text.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
        
        text = text.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
        text = text.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
        text = text.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
        text = text.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
        
        text = text.replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');
        
        text = text.replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, '![图片]($1)');
        
        text = text.replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
            const items = content.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
            return items.map(item => '- ' + item.replace(/<\/?li[^>]*>/gi, '').replace(/<[^>]+>/g, '').trim()).join('\n') + '\n\n';
        });
        
        text = text.replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
            const items = content.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
            return items.map((item, idx) => (idx + 1) + '. ' + item.replace(/<\/?li[^>]*>/gi, '').replace(/<[^>]+>/g, '').trim()).join('\n') + '\n\n';
        });
        
        text = text.replace(/<br\s*\/?>/gi, '\n');
        text = text.replace(/<[^>]+>/g, '');
        
        text = text.replace(/\n{3,}/g, '\n\n');
        text = text.trim();
        
        // Decode unicode escape sequences like \u002F
        text = text.replace(/\\u([0-9a-fA-F]{4})/g, function(match, hex) {
            return String.fromCharCode(parseInt(hex, 16));
        });
        
        return text;
    },

    async extractFullContent(url) {
        const parsed = this.detectPlatform(url);
        if (!parsed) return null;

        // 使用解析后的纯 URL，避免传入带文案的文本导致请求失败
        const cleanUrl = parsed.url || url;

        const result = {
            ...parsed,
            title: '',
            content: '',
            contentHtml: '',
            images: [],
            videos: [],
            author: '',
            date: '',
            markdown: '',
            rawContent: null,
            isSnapshot: false,
            snapshotImage: '',
            comment: null,
            metadata: {
                sourceUrl: cleanUrl,
                platform: parsed.platform,
                platformName: parsed.platformName,
                platformEmoji: parsed.platformEmoji,
                author: '',
                publishDate: '',
                importTime: new Date().toISOString(),
                itemId: parsed.id || ''
            }
        };

        try {
            let html = '';
            let parsedContent = null;
            let biliApiResult = null;
            let biliApiSuccess = false;
            
            if (cleanUrl.includes('bilibili.com') && window.electronAPI && window.electronAPI.fetchBilibiliApi) {
                try {
                    console.log('B站内容，优先调用API:', cleanUrl);
                    const biliRes = await window.electronAPI.fetchBilibiliApi(cleanUrl);
                    if (biliRes && biliRes.success && biliRes.data) {
                        biliApiResult = biliRes.data;
                        biliApiSuccess = true;
                        console.log('B站API调用成功:', biliApiResult.title);
                    } else {
                        console.warn('B站API调用失败，回退到页面解析:', biliRes?.error);
                    }
                } catch(e) {
                    console.error('B站API调用异常，回退到页面解析:', e.message);
                }
            }
            
            html = await this.fetchPageContent(cleanUrl);
            
            if (cleanUrl.includes('xhslink.com') && html.length < 2000) {
                const redirectMatch = html.match(/href=["'](https?:\/\/www\.xiaohongshu\.com[^"']+)["']/i);
                if (redirectMatch && redirectMatch[1]) {
                    const realUrl = redirectMatch[1].replace(/&amp;/g, '&');
                    console.log('检测到小红书短链接，跳转到:', realUrl);
                    html = await this.fetchPageContent(realUrl);
                    result.metadata.sourceUrl = realUrl;
                }
            }
            
            parsedContent = this.parseHtmlContent(html, cleanUrl);
            
            if (biliApiSuccess && biliApiResult) {
                if (biliApiResult.title) {
                    parsedContent.title = biliApiResult.title;
                }
                if (biliApiResult.excerpt) {
                    parsedContent.excerpt = biliApiResult.excerpt;
                }
                if (biliApiResult.author) {
                    parsedContent.author = biliApiResult.author;
                }
                if (biliApiResult.images && biliApiResult.images.length > 0) {
                    const existingImgs = parsedContent.images || [];
                    const newImgs = biliApiResult.images.filter(img => !existingImgs.includes(img));
                    if (biliApiResult.isVideo) {
                        parsedContent.images = biliApiResult.images;
                    } else {
                        parsedContent.images = newImgs.concat(existingImgs);
                    }
                }
                if (biliApiResult.isVideo !== undefined) {
                    parsedContent.isVideo = biliApiResult.isVideo;
                }
                if (biliApiResult.videoUrl) {
                    parsedContent.videoUrl = biliApiResult.videoUrl;
                }
                if (biliApiResult.contentHtml) {
                    parsedContent.contentHtml = biliApiResult.contentHtml;
                    parsedContent.content = biliApiResult.contentHtml;
                }
                if (biliApiResult.date) {
                    parsedContent.date = biliApiResult.date;
                }
            }

            if (parsedContent.error) {
                result.title = parsedContent.title || `${parsed.platformName} · 解析失败`;
                result.contentHtml = parsedContent.content || '';
                result.content = this.htmlToMarkdown(result.contentHtml);
                result.error = parsedContent.error;
                result.errorMessage = parsedContent.errorMessage || '';
                return result;
            }

            result.title = parsedContent.title || `${parsed.platformName} · ${this.getTypeLabel(parsed.type)}`;
            result.author = parsedContent.author;
            result.date = parsedContent.date;
            result.images = parsedContent.images.slice(0, 20);
            result.videos = parsedContent.videos.slice(0, 5);
            result.rawContent = parsedContent;
            result.comment = parsedContent.comment || null;
            result.isVideo = parsedContent.isVideo || false;
            result.videoUrl = parsedContent.videoUrl || cleanUrl;
            result.excerpt = parsedContent.excerpt || '';
            result.contentHtml = parsedContent.contentHtml || '';

            if (parsedContent.contentHtml) {
                result.content = this.htmlToMarkdown(parsedContent.contentHtml);
            }

            const isVideoContent = parsedContent.isVideo || 
                                  result.isVideo ||
                                  parsed.type === 'video' || 
                                  (parsedContent.videos && parsedContent.videos.length > 0) ||
                                  (parsed.platform === 'douyin');

            let contentHtml = '';

            if (isVideoContent) {
                result.isVideo = true;
                let coverUrl = '';
                
                if (result.images && result.images.length > 0) {
                    coverUrl = result.images[0];
                }
                
                if (!coverUrl && parsedContent.images && parsedContent.images.length > 0) {
                    coverUrl = parsedContent.images[0];
                }
                
                if (!coverUrl && parsedContent.videos && parsedContent.videos.length > 0) {
                    const realVideoUrl = parsedContent.videos[0];
                    if (realVideoUrl.includes('xhscdn')) {
                        const paths = realVideoUrl.split('/');
                        const videoFileName = paths[paths.length - 1].split('?')[0];
                        const videoId = videoFileName.split('_')[0];
                        if (videoId) {
                            coverUrl = `https://ci.xiaohongshu.com/${videoId}?imageView2/2/w/1080/h/1440/format/jpg`;
                        }
                    }
                }
                
                if (!coverUrl && parsedContent.images && parsedContent.images.length > 0) {
                    coverUrl = parsedContent.images[0];
                }
                
                if (!coverUrl && cleanUrl.includes('bilibili.com/video/')) {
                    const bvidMatch = cleanUrl.match(/(BV[a-zA-Z0-9]{10,})/i);
                    if (bvidMatch) {
                        const bvid = bvidMatch[1];
                        coverUrl = `https://i0.hdslb.com/bfs/archive/${bvid}.jpg`;
                    }
                }
                
                const videoTitle = parsedContent.title || result.title;
                const videoDesc = parsedContent.excerpt || '';
                
                let videoUrls = parsedContent.videos || [];
                let audioUrls = [];
                let parsedCoverUrl = coverUrl;
                let originalVideoUrl = cleanUrl;
                let videoId = 'video_' + Math.random().toString(36).substr(2, 9);
                
                if (parsedCoverUrl) {
                    const idx = result.images.indexOf(parsedCoverUrl);
                    if (idx > 0) {
                        result.images.splice(idx, 1);
                    }
                    if (idx !== 0) {
                        result.images.unshift(parsedCoverUrl);
                    }
                } else if (result.images.length === 0) {
                    result.images = [];
                }

                const videoPlayerHtml = videoUrls.length > 0 
                    ? `<div id="${videoId}_container" style="position:relative;aspect-ratio:16/9;overflow:hidden;">
                         ${parsedCoverUrl ? `<div style="position:absolute;inset:0;background-image:url('${parsedCoverUrl}');background-size:cover;background-position:center;filter:blur(20px) brightness(0.4);transform:scale(1.1);"></div>` : `<div style="position:absolute;inset:0;background:linear-gradient(135deg,#1F2937,#374151);"></div>`}
                         <video id="${videoId}_player" style="position:relative;z-index:1;width:100%;height:100%;object-fit:contain;display:block;" controls poster="${parsedCoverUrl || ''}" preload="metadata">
                             <source src="${videoUrls[0]}" type="video/mp4">
                         </video>
                       </div>`
                    : `<div id="${videoId}_container" style="position:relative;aspect-ratio:16/9;overflow:hidden;cursor:pointer;" onclick="playVideoFromUrl('${encodeURIComponent(originalVideoUrl)}', '${videoId}')">
                         ${parsedCoverUrl 
                            ? `<img id="${videoId}_cover" src="${parsedCoverUrl}" style="width:100%;height:100%;object-fit:cover;display:block;" onerror="this.style.display='none';document.getElementById('${videoId}_placeholder').style.display='flex';" />
                               <div id="${videoId}_placeholder" style="position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:rgba(31,41,55,0.6);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);">
                                   <div style="text-align:center;color:rgba(255,255,255,0.7);">
                                       <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 8px;">
                                           <polygon points="23 7 16 12 23 17 23 7"/>
                                           <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                                       </svg>
                                       <div style="font-size:13px;">点击播放视频</div>
                                   </div>
                               </div>`
                            : `<div id="${videoId}_placeholder" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1F2937,#374151);">
                                   <div style="text-align:center;color:rgba(255,255,255,0.7);">
                                       <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin:0 auto 8px;">
                                           <polygon points="23 7 16 12 23 17 23 7"/>
                                           <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                                       </svg>
                                       <div style="font-size:13px;">点击播放视频</div>
                                   </div>
                               </div>`
                         }
                         <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3);">
                             <div style="width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,0.95);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,0.2);">
                                 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M8 5v14l11-7z" fill="#1F2937"/>
                                 </svg>
                             </div>
                         </div>
                       </div>`;

                const videoDownloadBtn = videoUrls.length > 0 
                    ? `<button onclick="downloadVideoFile('${encodeURIComponent(videoUrls[0])}', '${videoTitle.replace(/[\\/:*?"<>|]/g, '_')}.mp4')" style="flex:1;padding:10px 14px;background:#00AEEC;color:white;border:none;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:background 0.2s;" onmouseover="this.style.background='#0284c7'" onmouseout="this.style.background='#00AEEC'">
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                           <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                           <polyline points="7 10 12 15 17 10"/>
                           <line x1="12" y1="15" x2="12" y2="3"/>
                         </svg>
                         下载视频
                       </button>`
                    : `<button onclick="parseVideoAndDownload('${encodeURIComponent(originalVideoUrl)}', '${videoTitle.replace(/[\\/:*?"<>|]/g, '_')}', '${videoId}', this)" style="flex:1;padding:10px 14px;background:#00AEEC;color:white;border:none;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:background 0.2s;" onmouseover="this.style.background='#0284c7'" onmouseout="this.style.background='#00AEEC'">
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                           <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                           <polyline points="7 10 12 15 17 10"/>
                           <line x1="12" y1="15" x2="12" y2="3"/>
                         </svg>
                         解析并下载视频
                       </button>`;

                const audioDownloadBtn = audioUrls.length > 0 
                    ? `<button onclick="downloadVideoFile('${encodeURIComponent(audioUrls[0])}', '${videoTitle.replace(/[\\/:*?"<>|]/g, '_')}_audio.m4a')" style="flex:1;padding:10px 14px;background:#10B981;color:white;border:none;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:background 0.2s;" onmouseover="this.style.background='#059669'" onmouseout="this.style.background='#10B981'">
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                           <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                           <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                           <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                         </svg>
                         下载声音
                       </button>`
                    : '';
                
                const videoCardHtml = `
                    <div class="video-card" style="position:relative;border-radius:16px;overflow:hidden;margin:10px 0;">
                        ${parsedCoverUrl ? `<div style="position:absolute;inset:0;background-image:url('${parsedCoverUrl}');background-size:cover;background-position:center;filter:blur(20px) brightness(0.5);transform:scale(1.1);"></div>` : `<div style="position:absolute;inset:0;background:#1F2937;"></div>`}
                        <div style="position:relative;z-index:1;background:rgba(0,0,0,0.3);">
                            ${videoPlayerHtml}
                            <div style="padding:16px;padding-bottom:24px;">
                                <div style="font-size:17px;font-weight:700;color:#fff;line-height:1.5;margin-bottom:8px;text-shadow:0 2px 8px rgba(0,0,0,0.5);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;word-break:break-word;">${videoTitle}</div>
                                <div style="font-size:12px;color:rgba(255,255,255,0.7);line-height:1.5;margin-bottom:6px;">本视频导入自 ${parsed.platformName}</div>
                                ${parsedContent.date ? `<div style="font-size:12px;color:rgba(255,255,255,0.7);line-height:1.5;margin-bottom:8px;">视频发布时间：${parsedContent.date}</div>` : ''}
                                ${videoDesc ? `<div style="font-size:14px;color:rgba(255,255,255,0.85);line-height:1.6;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-shadow:0 1px 4px rgba(0,0,0,0.3);word-break:break-word;">${videoDesc.replace(/\n/g, '<br>')}</div>` : ''}
                                <div style="display:flex;gap:8px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.2);">
                                    ${videoDownloadBtn}
                                    ${audioDownloadBtn}
                                </div>
                                <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:8px;text-align:center;text-shadow:0 1px 4px rgba(0,0,0,0.3);">点击播放按钮播放视频，点击下载按钮保存文件</div>
                            </div>
                        </div>
                    </div>
                `;
                contentHtml = videoCardHtml;
            } else {
                const hasImagesInContent = parsedContent.contentHtml && (parsedContent.contentHtml.includes('<img') || parsedContent.content.includes('![') || parsedContent.content.includes('src='));

                if (parsedContent.contentHtml && parsedContent.contentHtml.trim().length > 0) {
                    contentHtml = this.cleanContentHtml(parsedContent.contentHtml, cleanUrl);
                } else if (parsedContent.content && parsedContent.content.trim().length > 0) {
                    contentHtml = this.cleanContentHtml(parsedContent.content, cleanUrl);
                }

                if (!hasImagesInContent && parsedContent.images && parsedContent.images.length > 0) {
                    const imagesHtml = parsedContent.images.map(imgUrl =>
                        `<p><img src="${imgUrl}" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:10px auto;" /></p>`
                    ).join('');
                    if (contentHtml) {
                        contentHtml = imagesHtml + contentHtml;
                    } else {
                        contentHtml = imagesHtml;
                    }
                }
            }

            if (parsedContent.pdfs && parsedContent.pdfs.length > 0) {
                const pdfCardsHtml = parsedContent.pdfs.map(pdf => {
                    const displayName = pdf.name || 'PDF 附件';
                    const pagesText = pdf.pages > 0 ? ` · ${pdf.pages}页` : '';
                    const url = pdf.url || '';
                    const cardHtml = url
                        ? `<a href="${url}" target="_blank" style="text-decoration:none;color:inherit;display:block;">
                             <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:#F3F4F6;border-radius:10px;margin:10px 0;border:1px solid #E5E7EB;">
                               <div style="width:40px;height:40px;background:#FF2442;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;font-weight:700;flex-shrink:0;">PDF</div>
                               <div style="flex:1;min-width:0;">
                                 <div style="font-size:14px;font-weight:500;color:#1F2937;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${displayName}</div>
                                 <div style="font-size:12px;color:#6B7280;margin-top:2px;">小红书附件${pagesText} · 点击查看</div>
                               </div>
                               <div style="color:#9CA3AF;font-size:18px;flex-shrink:0;">›</div>
                             </div>
                           </a>`
                        : `<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:#F3F4F6;border-radius:10px;margin:10px 0;border:1px solid #E5E7EB;">
                             <div style="width:40px;height:40px;background:#FF2442;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;font-weight:700;flex-shrink:0;">PDF</div>
                             <div style="flex:1;min-width:0;">
                               <div style="font-size:14px;font-weight:500;color:#1F2937;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${displayName}</div>
                               <div style="font-size:12px;color:#6B7280;margin-top:2px;">小红书附件${pagesText}</div>
                             </div>
                           </div>`;
                    return cardHtml;
                }).join('');
                if (contentHtml) {
                    contentHtml += '<div style="margin-top:8px;">' + pdfCardsHtml + '</div>';
                } else {
                    contentHtml = pdfCardsHtml;
                }
            }

            if (contentHtml && cleanUrl && cleanUrl.startsWith('http')) {
                try {
                    contentHtml = contentHtml.replace(/<img([^>]+)src=["']([^"']+)["']([^>]*)>/gi, (match, before, src, after) => {
                        let absoluteSrc = src;
                        if (!src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('blob:')) {
                            if (src.startsWith('//')) {
                                absoluteSrc = 'https:' + src;
                            } else if (src.startsWith('/')) {
                                try {
                                    const parsedBase = new URL(cleanUrl);
                                    absoluteSrc = parsedBase.protocol + '//' + parsedBase.host + src;
                                } catch(e) {}
                            } else {
                                try {
                                    absoluteSrc = new URL(src, cleanUrl).href;
                                } catch(e) {}
                            }
                        }
                        return `<img${before}src="${absoluteSrc}"${after}>`;
                    });
                } catch(e) {}
            }
            
            result.contentHtml = contentHtml;
            result.content = this.htmlToMarkdown(result.contentHtml);
            
            result.metadata.author = parsedContent.author || '';
            result.metadata.publishDate = (parsedContent.date || '').split('T')[0];
            
        } catch (error) {
            console.warn('无法提取完整内容，使用基础信息:', error);
            result.title = `${parsed.platformEmoji} ${parsed.platformName} · ${this.getTypeLabel(parsed.type)}`;
            result.content = '';
            result.contentHtml = '';
        }

        if (result.contentHtml && result.contentHtml.length > 0 && cleanUrl && cleanUrl.startsWith('http')) {
            try {
                const baseForAbsolute = cleanUrl;
                const lazyImgAttrs = ['src', 'data-src', 'data-lazy-src', 'data-original', 'data-srcset', 'data-actualsrc', 'data-thumb', 'data-preview', 'data-url', 'data-image', 'data-imgurl'];
                
                lazyImgAttrs.forEach(attr => {
                    const regex = new RegExp(`<img([^>]+)${attr}=["']([^"']+)["']([^>]*)>`, 'gi');
                    result.contentHtml = result.contentHtml.replace(regex, (match, before, src, after) => {
                        let absoluteSrc = src;
                        if (src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('blob:')) {
                            if (src.startsWith('//')) {
                                absoluteSrc = 'https:' + src;
                            } else if (src.startsWith('/')) {
                                try {
                                    const parsedBase = new URL(baseForAbsolute);
                                    absoluteSrc = parsedBase.protocol + '//' + parsedBase.host + src;
                                } catch(e) {}
                            } else {
                                try {
                                    absoluteSrc = new URL(src, baseForAbsolute).href;
                                } catch(e) {}
                            }
                        }
                        return `<img${before}${attr}="${absoluteSrc}"${after}>`;
                    });
                });

                result.contentHtml = result.contentHtml.replace(/url\(["']?([^"')\s]+)["']?\)/gi, (match, url) => {
                    if (!url || url.startsWith('http') || url.startsWith('data:') || url.startsWith('#')) {
                        return match;
                    }
                    let absoluteUrl = url;
                    if (url.startsWith('//')) {
                        absoluteUrl = 'https:' + url;
                    } else if (url.startsWith('/')) {
                        try {
                            const parsedBase = new URL(baseForAbsolute);
                            absoluteUrl = parsedBase.protocol + '//' + parsedBase.host + url;
                        } catch(e) {}
                    } else {
                        try {
                            absoluteUrl = new URL(url, baseForAbsolute).href;
                        } catch(e) {}
                    }
                    return match.replace(url, absoluteUrl);
                });
                
                if (result.images && Array.isArray(result.images) && result.images.length > 0) {
                    result.images = result.images.map(imgUrl => {
                        if (!imgUrl || imgUrl.startsWith('http') || imgUrl.startsWith('data:') || imgUrl.startsWith('blob:')) {
                            return imgUrl;
                        }
                        if (imgUrl.startsWith('//')) {
                            return 'https:' + imgUrl;
                        }
                        if (imgUrl.startsWith('/')) {
                            try {
                                const parsedBase = new URL(baseForAbsolute);
                                return parsedBase.protocol + '//' + parsedBase.host + imgUrl;
                            } catch(e) {
                                return imgUrl;
                            }
                        }
                        try {
                            return new URL(imgUrl, baseForAbsolute).href;
                        } catch(e) {
                            return imgUrl;
                        }
                    }).filter(Boolean);
                }
                
                if (result.videos && Array.isArray(result.videos) && result.videos.length > 0) {
                    result.videos = result.videos.map(videoUrl => {
                        if (!videoUrl || videoUrl.startsWith('http') || videoUrl.startsWith('data:') || videoUrl.startsWith('blob:')) {
                            return videoUrl;
                        }
                        if (videoUrl.startsWith('//')) {
                            return 'https:' + videoUrl;
                        }
                        if (videoUrl.startsWith('/')) {
                            try {
                                const parsedBase = new URL(baseForAbsolute);
                                return parsedBase.protocol + '//' + parsedBase.host + videoUrl;
                            } catch(e) {
                                return videoUrl;
                            }
                        }
                        try {
                            return new URL(videoUrl, baseForAbsolute).href;
                        } catch(e) {
                            return videoUrl;
                        }
                    }).filter(Boolean);
                }
            } catch(e) {
                console.warn('最终URL绝对化处理失败:', e.message);
            }
        }

        return result;
    },

    async extractWebpageSnapshot(url) {
        const parsed = this.detectPlatform(url);
        if (!parsed) return null;

        const cleanUrl = parsed.url || url;

        const result = {
            ...parsed,
            title: '',
            content: '',
            contentHtml: '',
            images: [],
            videos: [],
            author: '',
            date: '',
            markdown: '',
            rawContent: null,
            isSnapshot: true,
            snapshotImage: '',
            metadata: {
                sourceUrl: cleanUrl,
                platform: parsed.platform,
                platformName: parsed.platformName,
                platformEmoji: parsed.platformEmoji,
                author: '',
                publishDate: '',
                importTime: new Date().toISOString(),
                itemId: parsed.id || '',
                snapshot: true
            }
        };

        try {
            if (window.electronAPI && window.electronAPI.captureWebpage) {
                const captureResult = await window.electronAPI.captureWebpage(cleanUrl);
                if (captureResult && captureResult.success) {
                    result.title = captureResult.title || `${parsed.platformName} · 网页快照`;
                    result.snapshotImage = captureResult.dataUrl;
                    result.images = [captureResult.dataUrl];

                    const snapshotHtml = `
                        <div style="text-align:center; padding:10px 0;">
                            <img src="${captureResult.dataUrl}" style="max-width:100%; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.1);">
                        </div>
                        <p style="text-align:center; color:#9CA3AF; font-size:13px; margin-top:8px;">
                            🔗 网页快照 · <a href="${cleanUrl}" target="_blank" style="color:#3B82F6;">查看原文</a>
                        </p>
                    `;
                    result.contentHtml = snapshotHtml;
                    result.content = `![网页快照](${captureResult.dataUrl})\n\n🔗 [查看原文](${cleanUrl})`;
                }
            }
        } catch (error) {
            console.warn('网页快照失败:', error);
            result.title = `${parsed.platformEmoji} ${parsed.platformName} · 网页快照`;
        }

        if (!result.title) {
            result.title = `${parsed.platformEmoji} ${parsed.platformName} · 网页快照`;
        }

        return result;
    },

    async extractWebpageSegmentSnapshot(url) {
        const parsed = this.detectPlatform(url);
        if (!parsed) return null;

        const cleanUrl = parsed.url || url;

        const result = {
            ...parsed,
            title: '',
            content: '',
            contentHtml: '',
            images: [],
            videos: [],
            author: '',
            date: '',
            markdown: '',
            rawContent: null,
            isSegmentSnapshot: true,
            metadata: {
                sourceUrl: cleanUrl,
                platform: parsed.platform,
                platformName: parsed.platformName,
                platformEmoji: parsed.platformEmoji,
                author: '',
                publishDate: '',
                importTime: new Date().toISOString(),
                itemId: parsed.id || '',
                segmentSnapshot: true
            }
        };

        try {
            if (window.electronAPI && window.electronAPI.captureWebpageSegments) {
                const captureResult = await window.electronAPI.captureWebpageSegments(cleanUrl);
                if (captureResult && captureResult.success && captureResult.segments && captureResult.segments.length > 0) {
                    result.title = captureResult.title || `${parsed.platformName} · 分段快照`;
                    
                    const segmentImages = captureResult.segments.map(seg => seg.dataUrl);
                    result.images = segmentImages;
                    
                    let contentHtml = '';
                    let contentMd = '';
                    
                    captureResult.segments.forEach((seg, idx) => {
                        contentHtml += `<div style="text-align:center; margin: 12px 0;">
                            <img src="${seg.dataUrl}" style="max-width:100%; border-radius:12px; box-shadow:0 2px 12px rgba(0,0,0,0.08); display:block; margin:0 auto;">
                        </div>`;
                        contentMd += `![网页快照-${idx + 1}](${seg.dataUrl})\n\n`;
                    });
                    
                    contentHtml += `<p style="text-align:center; color:#9CA3AF; font-size:13px; margin-top:12px;">
                        🔗 分段网页快照 · 共 ${captureResult.totalSegments} 张 · <a href="${cleanUrl}" target="_blank" style="color:#3B82F6;">查看原文</a>
                    </p>`;
                    contentMd += `🔗 [查看原文](${cleanUrl})`;
                    
                    result.contentHtml = contentHtml;
                    result.content = contentMd;
                }
            }
        } catch (error) {
            console.warn('分段网页快照失败:', error);
            result.title = `${parsed.platformEmoji} ${parsed.platformName} · 分段快照失败`;
        }

        if (!result.title) {
            result.title = `${parsed.platformEmoji} ${parsed.platformName} · 分段快照`;
        }

        return result;
    },

    cleanContentHtml: function(html, baseUrl) {
        if (!html) return '';
        
        const parser = new DOMParser();
        const doc = parser.parseFromString('<div>' + html + '</div>', 'text/html');
        const container = doc.body.firstChild;
        
        // 移除无关元素
        container.querySelectorAll('script, style, noscript, iframe, svg, .qr_code_pc, .qr_code_pc_inner, #js_pc_qr_code, .rich_media_tool, .weui-dialog, .mp_profile_iframe, .weapp_image_link, .weapp_text_link, [class*="ad-"], [class*="banner"]').forEach(el => el.remove());
        
        // 处理图片：检查所有懒加载属性，确保显示真实图片URL
        container.querySelectorAll('img').forEach(img => {
            // 优先检查所有 data-* 懒加载属性，避免使用占位符 src
            const lazyAttrs = ['data-src', 'data-lazy-src', 'data-original', 'data-srcset', 'data-original-src', 'data-img-url', 'data-image-src', 'data-url', 'data-image', 'data-imgurl', 'data-actualsrc', 'data-thumb', 'data-preview'];
            let src = '';
            for (const attr of lazyAttrs) {
                const val = img.getAttribute(attr);
                if (val && val.length > 5 && !val.includes('data:') && !val.includes('blob:')) {
                    src = val;
                    break;
                }
            }
            // 如果没有找到懒加载URL，使用 src（但排除明显的占位符）
            if (!src) {
                const srcVal = img.getAttribute('src') || '';
                if (srcVal && srcVal.length > 5 && !srcVal.includes('data:') && !srcVal.includes('blob:')) {
                    src = srcVal;
                }
            }
            if (src) {
                let resolvedSrc = src;
                if (baseUrl && src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('blob:')) {
                    try {
                        resolvedSrc = new URL(src, baseUrl).href;
                    } catch(e) {}
                }
                img.setAttribute('src', resolvedSrc);
                img.removeAttribute('data-src');
                img.removeAttribute('data-lazy-src');
                img.removeAttribute('data-original');
                img.removeAttribute('data-srcset');
                img.removeAttribute('data-original-src');
                img.removeAttribute('data-img-url');
                img.removeAttribute('data-image-src');
                img.removeAttribute('data-url');
                img.removeAttribute('data-image');
                img.removeAttribute('data-imgurl');
                img.removeAttribute('data-actualsrc');
                img.removeAttribute('data-thumb');
                img.removeAttribute('data-preview');
                img.removeAttribute('data-ratio');
                img.removeAttribute('data-w');
                img.removeAttribute('data-type');
                if (!img.style.maxWidth) {
                    img.style.maxWidth = '100%';
                    img.style.height = 'auto';
                    img.style.display = 'block';
                    img.style.marginLeft = 'auto';
                    img.style.marginRight = 'auto';
                }
                if (img.getAttribute('data-width')) {
                    img.style.width = img.getAttribute('data-width') + 'px';
                }
            } else {
                img.remove();
            }
        });

        // 处理链接
        container.querySelectorAll('a').forEach(a => {
            const href = a.getAttribute('href') || '';
            if (href.startsWith('javascript:') || href.startsWith('#')) {
                const span = doc.createElement('span');
                span.textContent = a.textContent;
                a.replaceWith(span);
            } else {
                a.setAttribute('target', '_blank');
                a.setAttribute('rel', 'noopener noreferrer');
            }
        });

        // 安全的排版样式属性白名单（适用于所有元素）
        const allowedProps = [
            // 文字排版
            'font-size', 'font-weight', 'font-style', 'font-family',
            'color', 'line-height', 'letter-spacing', 'word-spacing',
            'text-align', 'text-indent', 'text-decoration', 'white-space',
            // 背景
            'background-color', 'background',
            // 盒模型
            'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
            'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
            // 边框
            'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
            'border-radius', 'border-color', 'border-style', 'border-width',
            // 布局
            'display', 'flex-direction', 'justify-content', 'align-items',
            'gap', 'flex-wrap',
            // 其他视觉效果
            'box-shadow', 'opacity', 'overflow'
        ];

        // 对所有元素统一处理内联样式（公众号用 section/div/p/span 等承载大量样式）
        container.querySelectorAll('*').forEach(el => {
            const style = el.getAttribute('style') || '';
            if (style) {
                let cleanStyle = '';
                const declarations = style.split(';');
                for (const decl of declarations) {
                    const [prop, val] = decl.split(':').map(s => s.trim());
                    if (prop && val && allowedProps.some(p => prop.toLowerCase().startsWith(p))) {
                        cleanStyle += prop + ': ' + val + '; ';
                    }
                }
                if (cleanStyle) {
                    el.setAttribute('style', cleanStyle.trim());
                } else {
                    el.removeAttribute('style');
                }
            }
        });

        // 移除危险的全局属性，但保留 data-src 等已被处理过的图片属性已转换完成
        container.querySelectorAll('*').forEach(el => {
            for (const attr of Array.from(el.attributes)) {
                const name = attr.name.toLowerCase();
                if (name.startsWith('on') || name.startsWith('data-v-') || name === 'class' || name === 'id') {
                    if (name !== 'style') {
                        el.removeAttribute(attr.name);
                    }
                }
            }
            const computedStyle = el.style;
            if (computedStyle.position === 'fixed' || computedStyle.position === 'absolute') {
                computedStyle.removeProperty('position');
            }
        });

        let resultHtml = container.innerHTML;
        // Decode unicode escape sequences like \u002F
        resultHtml = resultHtml.replace(/\\u([0-9a-fA-F]{4})/g, function(match, hex) {
            return String.fromCharCode(parseInt(hex, 16));
        });
        
        return resultHtml;
    },

    generateMarkdown: function(parsed, includeContent = false) {
        if (!parsed) return '';
        
        let result = '';
        
        result += `# ${parsed.title || `${parsed.platformEmoji} ${parsed.platformName}`}\n\n`;
        
        result += `> ${parsed.platformEmoji} [${parsed.platformName}](${parsed.url})\n\n`;
        
        if (parsed.author) {
            result += `**作者**: ${parsed.author}\n`;
        }
        if (parsed.date) {
            result += `**时间**: ${parsed.date}\n`;
        }
        if (parsed.type) {
            result += `**类型**: ${this.getTypeLabel(parsed.type)}\n`;
        }
        
        result += `\n---\n\n`;
        
        if (includeContent && parsed.markdown) {
            result += parsed.markdown;
        }
        
        if (parsed.images && parsed.images.length > 0) {
            result += `\n---\n\n`;
            result += `## 🖼️ 图片\n\n`;
            parsed.images.forEach(img => {
                result += `![图片](${img})\n\n`;
            });
        }
        
        if (parsed.videos && parsed.videos.length > 0) {
            result += `\n---\n\n`;
            result += `## 🎬 视频\n\n`;
            parsed.videos.forEach(video => {
                result += `[视频链接](${video})\n\n`;
            });
        }
        
        return result;
    },

    generateItemData: function(parsed, content = '') {
        if (!parsed) return null;
        
        const title = parsed.title || `${parsed.platformEmoji} ${parsed.platformName} · ${this.getTypeLabel(parsed.type)}`;
        const markdown = this.generateMarkdown(parsed, true);
        
        return {
            title: title,
            content: markdown,
            type: '灵感',
            metadata: {
                url: parsed.url,
                platform: parsed.platform,
                platformName: parsed.platformName,
                platformEmoji: parsed.platformEmoji,
                itemId: parsed.id,
                itemType: parsed.type,
                extractedAt: new Date().toISOString(),
                author: parsed.author || '',
                date: parsed.date || '',
                images: parsed.images || [],
                videos: parsed.videos || []
            }
        };
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = URL_PARSER;
}
