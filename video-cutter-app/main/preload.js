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
    }
})