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
                /^(?:https?:\/\/)?(?:www\.)?bilibili\.com\/live\/([0-9]+)/i
            ],
            parse: function(url) {
                for (const pattern of this.patterns) {
                    const match = url.match(pattern);
                    if (match) {
                        const isLive = url.includes('/live/');
                        return {
                            platform: 'bilibili',
                            platformName: this.name,
                            platformEmoji: this.emoji,
                            id: match[1],
                            url: url,
                            type: isLive ? 'live' : 'video'
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
            name: '微信公众号',
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
            page: '网页'
        };
        return labels[type] || type;
    },

    async fetchPageContent(url, timeout = 15000) {
        try {
            let html = '';
            
            if (window.electronAPI && window.electronAPI.fetchUrl) {
                const result = await window.electronAPI.fetchUrl(url);
                if (result.success) {
                    html = result.data;
                } else {
                    throw new Error(result.error || '获取失败');
                }
            } else {
                const localProxy = 'http://127.0.0.1:3000/fetch?url=' + encodeURIComponent(url);
                try {
                    const response = await fetch(localProxy, { timeout: timeout });
                    if (response.ok) {
                        html = await response.text();
                    }
                } catch (e) {
                    console.log('本地代理不可用，尝试其他方案:', e.message);
                }
                
                if (!html) {
                    const proxyPort = window.electronAPI ? await window.electronAPI.getProxyPort() : 0;
                    if (proxyPort) {
                        const proxyUrl = `http://127.0.0.1:${proxyPort}?url=${encodeURIComponent(url)}`;
                        const response = await fetch(proxyUrl, { timeout: timeout });
                        html = await response.text();
                    } else {
                        const corsProxies = [
                            `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
                            `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
                            `https://corsproxy.io/?${encodeURIComponent(url)}`,
                            `https://cors.bridged.cc/${encodeURIComponent(url)}`,
                            `https://api.allorigins.xyz/raw?url=${encodeURIComponent(url)}`
                        ];
                        
                        let lastError = null;
                        for (const proxyUrl of corsProxies) {
                            try {
                                const response = await fetch(proxyUrl, { timeout: timeout });
                                if (!response.ok) continue;
                                
                                const contentType = response.headers.get('content-type') || '';
                                if (contentType.includes('json')) {
                                    const data = await response.json();
                                    html = data.contents || data.text || data.html || data.response || '';
                                } else {
                                    html = await response.text();
                                }
                                
                                if (html && html.length > 100) break;
                            } catch (e) {
                                lastError = e;
                                continue;
                            }
                        }
                        
                        if (!html || html.length <= 100) {
                            throw lastError || new Error('无法获取网页内容（请启动本地代理服务器）');
                        }
                    }
                }
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

            const contentEl = doc.querySelector('#js_content') || doc.querySelector('.rich_media_content');
            if (contentEl) {
                contentEl.querySelectorAll('script, style, .qr_code_pc, .qr_code_pc_inner, #js_pc_qr_code, .rich_media_tool, .weui-dialog').forEach(el => el.remove());

                contentEl.querySelectorAll('img').forEach(img => {
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

                contentEl.querySelectorAll('img').forEach(img => {
                    if (!img.style.maxWidth) {
                        img.style.maxWidth = '100%';
                        img.style.height = 'auto';
                    }
                });

                result.content = contentEl.innerHTML;
            }

            return result;
        } catch (e) {
            console.warn('微信公众号解析失败:', e);
            return null;
        }
    },

    parseXiaohongshu: function(html) {
        try {
            const result = {
                title: '',
                content: '',
                images: [],
                videos: [],
                pdfs: [],
                author: '',
                date: '',
                excerpt: ''
            };

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
                        result.title = decodeJsonStr(titleMatch[1]).replace(/\n/g, '').trim();
                    }

                    const descMatch = text.match(/"desc"\s*:\s*"([^"]*)"/);
                    if (descMatch) {
                        const desc = decodeJsonStr(descMatch[1]).trim();
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
            });

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

            return result;
        } catch (e) {
            console.warn('小红书解析失败:', e);
            return null;
        }
    },

    parseHtmlContent(html, url) {
        const result = {
            title: '',
            content: '',
            images: [],
            videos: [],
            author: '',
            date: '',
            excerpt: '',
            rawHtml: html
        };

        const parsedPlatform = this.detectPlatform(url);
        const platformKey = parsedPlatform?.platform;

        if (platformKey === 'xiaohongshu') {
            const xhsResult = this.parseXiaohongshu(html);
            if (xhsResult) {
                Object.assign(result, xhsResult);
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

            const imgElements = doc.querySelectorAll('img');
            imgElements.forEach(img => {
                let src = img.getAttribute('src') || img.getAttribute('data-src') || img.getAttribute('data-lazy-src') || '';
                if (src && !src.includes('placeholder') && !src.includes('logo')) {
                    if (url && src && !src.startsWith('http') && !src.startsWith('data:') && !src.startsWith('blob:')) {
                        try {
                            src = new URL(src, url).href;
                        } catch(e) {}
                    }
                    result.images.push(src);
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

        // Apple developer pages: force screenshot mode (hotlink protection breaks images)
        if (cleanUrl.includes('developer.apple.com')) {
            try {
                const snapshotResult = await this.extractWebpageSnapshot(cleanUrl);
                if (snapshotResult && snapshotResult.snapshotImage && snapshotResult.snapshotImage.length > 100) {
                    return snapshotResult;
                }
            } catch(e) {
                console.warn('Apple screenshot mode failed:', e);
            }
            console.warn('Apple screenshot failed, trying normal extraction');
        }

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
            const html = await this.fetchPageContent(cleanUrl);
            const parsedContent = this.parseHtmlContent(html, cleanUrl);

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

            const hasImagesInContent = parsedContent.content && (parsedContent.content.includes('<img') || parsedContent.content.includes('![') || parsedContent.content.includes('src='));
            let contentHtml = '';

            if (parsedContent.content && parsedContent.content.trim().length > 0) {
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

            result.contentHtml = contentHtml;
            // Apple developer pages: images already converted to data URLs in fetch-rendered-url
            // No additional handling needed
            result.content = this.htmlToMarkdown(result.contentHtml);
            
            result.metadata.author = parsedContent.author || '';
            result.metadata.publishDate = parsedContent.date || '';
            
        } catch (error) {
            console.warn('无法提取完整内容，使用基础信息:', error);
            result.title = `${parsed.platformEmoji} ${parsed.platformName} · ${this.getTypeLabel(parsed.type)}`;
            result.content = '';
            result.contentHtml = '';
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

    cleanContentHtml: function(html, baseUrl) {
        if (!html) return '';
        
        const parser = new DOMParser();
        const doc = parser.parseFromString('<div>' + html + '</div>', 'text/html');
        const container = doc.body.firstChild;
        
        // 移除无关元素
        container.querySelectorAll('script, style, noscript, iframe, svg, .qr_code_pc, .qr_code_pc_inner, #js_pc_qr_code, .rich_media_tool, .weui-dialog, .mp_profile_iframe, .weapp_image_link, .weapp_text_link, [class*="ad-"], [class*="banner"]').forEach(el => el.remove());
        
        // 处理图片：data-src → src，确保显示
        container.querySelectorAll('img').forEach(img => {
            const src = img.getAttribute('data-src') || img.getAttribute('src') || '';
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

        return container.innerHTML;
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
