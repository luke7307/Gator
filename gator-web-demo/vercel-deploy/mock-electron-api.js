/**
 * Gator Web Demo - Mock Electron API
 * 在浏览器环境下模拟 Electron 的 electronAPI
 * 让同一套 app.js 可以在纯浏览器中运行
 *
 * 使用方式：在 index.html 中，在 app.js 之前加载此文件
 *   <script src="mock-electron-api.js"></script>
 */

(function () {
  if (window.electronAPI) return;

  // ===== 演示数据（10条灵感笔记）=====
  function createDemoNotes() {
    const now = Date.now();
    return [
      {
        id: 'demo-001',
        title: '📕 夏天的风我永远记得，清清楚楚的说你爱我',
        content: '暑假的海边，夕阳把整片天空都染成了橙红色。海浪拍打着沙滩，远处有几个孩子在捡贝壳。那一刻觉得，人生中最珍贵的东西，往往是免费的。\n\n#治愈 #海边 #夏日',
        type: '效率',
        images: [
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
          'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
          'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&q=80'
        ],
        videos: [],
        isVideo: false,
        createdAt: now - 2 * 3600 * 1000,
        updatedAt: now - 2 * 3600 * 1000,
        metadata: {
          sourceUrl: 'https://www.xiaohongshu.com/explore/demo001',
          platform: 'xiaohongshu',
          platformName: '小红书',
          platformEmoji: '📕',
          author: '旅行小日记',
          publishDate: '2024-07-10'
        }
      },
      {
        id: 'demo-002',
        title: '📺 【4K修复】周杰伦 - 晴天 MV 官方完整版',
        content: '故事的小黄花，从出生那年就飘着，童年的荡秋千，随记忆一直晃到现在。\n\n#音乐 #怀旧 #4K',
        type: '效率',
        images: [
          'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80'
        ],
        videos: [
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        ],
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        createdAt: now - 5 * 3600 * 1000,
        updatedAt: now - 5 * 3600 * 1000,
        metadata: {
          sourceUrl: 'https://www.bilibili.com/video/BVdemo002',
          platform: 'bilibili',
          platformName: '哔哩哔哩',
          platformEmoji: '📺',
          author: '华语音乐现场',
          publishDate: '2024-06-15'
        }
      },
      {
        id: 'demo-003',
        title: '💬 为什么越来越多的年轻人开始断舍离？',
        content: '断舍离不是简单的扔东西，而是一种生活态度的转变。当我们学会放下那些不再需要的物品时，也在为更重要的事情腾出空间。\n\n从物质到精神，从外在到内在，断舍离的本质是重新审视自己与世界的关系。\n\n#生活方式 #极简 #思考',
        type: '效率',
        images: [
          'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80'
        ],
        videos: [],
        isVideo: false,
        createdAt: now - 8 * 3600 * 1000,
        updatedAt: now - 8 * 3600 * 1000,
        metadata: {
          sourceUrl: 'https://mp.weixin.qq.com/s/demo003',
          platform: 'wechat',
          platformName: '公众号',
          platformEmoji: '💬',
          author: '慢生活研究所',
          publishDate: '2024-07-08'
        }
      },
      {
        id: 'demo-004',
        title: '📱 新入手的机械键盘，敲起来太爽了！',
        content: '佳达隆G银Pro轴体，PBT键帽，三模连接。打字手感绝了，声音也不大，办公室用完全没问题。配列是75%的，不占地方，桌面瞬间干净了好多。\n\n#数码 #键盘 #外设',
        type: '效率',
        images: [
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
          'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80'
        ],
        videos: [],
        isVideo: false,
        createdAt: now - 12 * 3600 * 1000,
        updatedAt: now - 12 * 3600 * 1000,
        metadata: {
          sourceUrl: 'https://www.coolapk.com/feed/demo004',
          platform: 'coolapk',
          platformName: '酷安',
          platformEmoji: '📱',
          author: '数码爱好者',
          publishDate: '2024-07-05'
        }
      },
      {
        id: 'demo-005',
        title: '🎵 夏天的风我永远记得 清清楚楚的说你爱我',
        content: '夏天的风我永远记得，清清楚楚的说你爱我\n\n#青春 #纯情 #治愈',
        type: '效率',
        images: [
          'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80'
        ],
        videos: [
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
        ],
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        createdAt: now - 24 * 3600 * 1000,
        updatedAt: now - 24 * 3600 * 1000,
        metadata: {
          sourceUrl: 'https://v.douyin.com/demo005/',
          platform: 'douyin',
          platformName: '抖音',
          platformEmoji: '🎵',
          author: '夏日限定',
          publishDate: '2024-07-04'
        }
      },
      {
        id: 'demo-006',
        title: '📄 2024 Q3 产品规划文档',
        content: '**一、产品定位**\n\nGator 是一款灵感采集与知识管理工具，帮助用户快速收集、整理和回顾互联网上的优质内容。\n\n**二、核心目标**\n\n1. 提升内容采集效率 30%\n2. 优化内容展示与检索体验\n3. 建立跨平台内容联动能力\n\n#产品 #规划 #文档',
        type: '效率',
        images: [
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
        ],
        videos: [],
        isVideo: false,
        createdAt: now - 36 * 3600 * 1000,
        updatedAt: now - 36 * 3600 * 1000,
        metadata: {
          sourceUrl: 'https://my.feishu.cn/wiki/demo006',
          platform: 'feishu',
          platformName: '飞书文档',
          platformEmoji: '📄',
          author: '产品团队',
          publishDate: '2024-07-01'
        }
      },
      {
        id: 'demo-007',
        title: '📕 人善被人欺，请赐予我和她一样刻薄的能力',
        content: '职场上遇到的那些奇葩事，有些人真的是越善良越被欺负。学会说不，是成长的第一步。\n\n#职场 #成长 #思考',
        type: '效率',
        images: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'
        ],
        videos: [],
        isVideo: false,
        createdAt: now - 48 * 3600 * 1000,
        updatedAt: now - 48 * 3600 * 1000,
        metadata: {
          sourceUrl: 'https://www.xiaohongshu.com/explore/demo007',
          platform: 'xiaohongshu',
          platformName: '小红书',
          platformEmoji: '📕',
          author: '职场观察家',
          publishDate: '2024-06-28'
        }
      },
      {
        id: 'demo-008',
        title: '❓ 如何系统地学习前端开发？万字长文总结',
        content: '前端开发的学习路径可以分为四个阶段：入门基础、进阶框架、工程化、全栈能力。每个阶段都有对应的重点和避坑指南。\n\n#前端 #学习 #编程',
        type: '效率',
        images: [
          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80'
        ],
        videos: [],
        isVideo: false,
        createdAt: now - 72 * 3600 * 1000,
        updatedAt: now - 72 * 3600 * 1000,
        metadata: {
          sourceUrl: 'https://www.zhihu.com/question/demo008',
          platform: 'zhihu',
          platformName: '知乎',
          platformEmoji: '❓',
          author: '前端老司机',
          publishDate: '2024-06-25'
        }
      },
      {
        id: 'demo-009',
        title: '📺 两人拿着棍子妻子从一开始就盯着男子看 男子棍棍用尽全力直到妻子离开才反应过来',
        content: '社会百态系列视频，记录生活中的真实瞬间。\n\n#社会 #生活 #真实',
        type: '效率',
        images: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
        ],
        videos: [
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
        ],
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        createdAt: now - 96 * 3600 * 1000,
        updatedAt: now - 96 * 3600 * 1000,
        metadata: {
          sourceUrl: 'https://www.bilibili.com/video/BVdemo009',
          platform: 'bilibili',
          platformName: '哔哩哔哩',
          platformEmoji: '📺',
          author: '社会观察',
          publishDate: '2024-06-20'
        }
      },
      {
        id: 'demo-010',
        title: '🥇 深入理解 JavaScript 闭包：从原理到实践',
        content: '闭包是 JavaScript 中最重要的概念之一，也是面试高频考点。本文从作用域链讲起，深入分析闭包的本质、常见应用场景以及需要注意的内存问题。\n\n#JavaScript #前端 #原理',
        type: '效率',
        images: [
          'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80'
        ],
        videos: [],
        isVideo: false,
        createdAt: now - 120 * 3600 * 1000,
        updatedAt: now - 120 * 3600 * 1000,
        metadata: {
          sourceUrl: 'https://juejin.cn/post/demo010',
          platform: 'juejin',
          platformName: '掘金',
          platformEmoji: '🥇',
          author: '前端架构师',
          publishDate: '2024-06-18'
        }
      }
    ];
  }

  // ===== 初始化演示数据到 localStorage =====
  const INIT_FLAG = 'gator_web_demo_initialized';
  const STORAGE_KEY = 'gator_items_v4';
  const TAGS_KEY = 'gator_tags_v4';
  const NOTEBOOK_KEY = 'gator_notebooks_v2';

  if (!localStorage.getItem(INIT_FLAG)) {
    // 初始化笔记数据
    const demoNotes = createDemoNotes();
    localStorage.setItem(STORAGE_KEY + '_notebook_default', JSON.stringify(demoNotes));

    // 初始化标签
    const demoTags = [
      { id: 'tag_uncategorized_default', name: '未分类', emoji: '📋', editable: false, deletable: false, system: true },
      { id: 'tag_efficiency', name: '效率', emoji: '⚡', editable: true, deletable: true },
      { id: 'tag_reading', name: '阅读', emoji: '📚', editable: true, deletable: true },
      { id: 'tag_tech', name: '技术', emoji: '💻', editable: true, deletable: true },
      { id: 'tag_life', name: '生活', emoji: '🌈', editable: true, deletable: true },
      { id: 'tag_work', name: '工作', emoji: '💼', editable: true, deletable: true },
      { id: 'tag_idea', name: '灵感', emoji: '💡', editable: true, deletable: true }
    ];
    localStorage.setItem(TAGS_KEY, JSON.stringify(demoTags));

    // 初始化笔记本
    const notebooks = [
      { id: 'notebook_default', name: '全部灵感', emoji: '📒', createdAt: Date.now(), order: 0 }
    ];
    localStorage.setItem(NOTEBOOK_KEY, JSON.stringify(notebooks));
    localStorage.setItem('gator_current_notebook', 'notebook_default');

    localStorage.setItem(INIT_FLAG, '1');
  }

  // ===== Mock Electron API =====
  window.electronAPI = {
    getProxyPort: function () {
      return Promise.resolve(0);
    },

    openExternal: function (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return Promise.resolve(true);
    },

    downloadMedia: function (mediaUrl, filename) {
      const a = document.createElement('a');
      a.href = mediaUrl;
      a.download = filename || 'media';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return Promise.resolve({ success: true, path: mediaUrl });
    },

    downloadBilibiliVideo: function (pageUrl, filename) {
      window.open(pageUrl, '_blank', 'noopener,noreferrer');
      return Promise.resolve({ success: true, url: pageUrl });
    },

    parseVideoUrl: function (pageUrl) {
      return Promise.resolve({ success: false, message: '浏览器演示版不支持视频解析，请使用桌面版' });
    },

    fetchRenderedUrl: function (url) {
      const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
      return fetch(proxyUrl)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          return {
            success: true,
            html: data.contents,
            url: url
          };
        })
        .catch(function (err) {
          return { success: false, error: err.message };
        });
    },

    captureWebpage: function (url) {
      return Promise.resolve({ success: false, message: '浏览器演示版不支持截图功能' });
    },

    captureWebpageSegments: function (url) {
      return Promise.resolve({ success: false, message: '浏览器演示版不支持分段截图功能' });
    }
  };

  console.log('%c🐊 Gator Web Demo 已加载', 'color:#10b981;font-weight:bold;font-size:14px;');
  console.log('演示数据已注入 localStorage，共 ' + (JSON.parse(localStorage.getItem(STORAGE_KEY + '_notebook_default') || '[]')).length + ' 条');
})();
