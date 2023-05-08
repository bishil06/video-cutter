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
    },
    requestOpenSelectDirectory() {
        return ipcRenderer.send('requestOpenSelectDirectory')
    },
    requestWriteMemoToNotion(dbId, relationId, memoTitle, hmsString) {
        return ipcRenderer.send('requestWriteMemoToNotion', [dbId, relationId, memoTitle, hmsString])
    },
    requestTrim(startHMS, duration, filename) {
        console.log(startHMS, duration, filename)
        return ipcRenderer.send('requestTrim', [startHMS, duration, filename])
    }
})