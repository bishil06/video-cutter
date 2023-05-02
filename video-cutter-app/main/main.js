const path = require('path');

const ffmpeg = require('fluent-ffmpeg')

const { app, BrowserWindow, ipcMain } = require('electron');
// const isDev = require('electron-is-dev');

const isDev = false

let win = null;

function createWindow() {
  console.log('create window')
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true
    },
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
  // Open the DevTools.
  win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

let count = 0;

ipcMain.on('path', (event, path) => {
    console.log('receive path', count+=1)

    ffmpeg.ffprobe(path, (err, metadata) => {
        console.log(err, metadata.format)
        if (win !== null) {
            win.webContents.send('D', metadata.format)
        }
    })
})