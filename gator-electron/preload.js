const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchUrl: async (url) => {
        return await ipcRenderer.invoke('fetch-url', url);
    },
    fetchRenderedUrl: async (url) => {
        return await ipcRenderer.invoke('fetch-rendered-url', url);
    },
    getProxyPort: async () => {
        return await ipcRenderer.invoke('get-proxy-port');
    },
    captureWebpage: async (url) => {
        return await ipcRenderer.invoke('capture-webpage', url);
    },
    captureWebpageSegments: async (url) => {
        return await ipcRenderer.invoke('capture-webpage-segments', url);
    },
    openExternal: async (url) => {
        return await ipcRenderer.invoke('open-external', url);
    },
    downloadMedia: async (mediaUrl, filename) => {
        return await ipcRenderer.invoke('download-media', mediaUrl, filename);
    },
    parseVideoUrl: async (videoUrl) => {
        return await ipcRenderer.invoke('parse-video-url', videoUrl);
    },
    fetchBilibiliApi: async (url) => {
        return await ipcRenderer.invoke('fetch-bilibili-api', url);
    },
    downloadBilibiliVideo: async (videoUrl, filename) => {
        return await ipcRenderer.invoke('download-bilibili-video', videoUrl, filename);
    },
    onDownloadProgress: (callback) => {
        ipcRenderer.on('download-progress', (event, args) => {
            callback(args);
        });
    }
});
