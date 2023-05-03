const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('api', {
    sendPath(path) {
        return ipcRenderer.send('path', path)
    },
    receiveData(ch, action) {
        return ipcRenderer.on(ch, action)
    },
    removeEventListener(ch, listener) {
        return ipcRenderer.removeListener(ch, listener)
    },
    sendNotionApiKey(key) {
        return ipcRenderer.send('sendNotionApiKey', key)
    },
    requestBangsongList(bangsongDB) {
        return ipcRenderer.send('requestBangsongList', bangsongDB)
    },
    requestMemoList(memoDB, bangsong) {
        return ipcRenderer.send('requestMemoList', [memoDB, bangsong])
    }
})