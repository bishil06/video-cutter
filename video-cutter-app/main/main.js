const path = require('path');

const ffmpeg = require('fluent-ffmpeg')
const { Client } = require("@notionhq/client") 

const { app, BrowserWindow, ipcMain, dialog } = require('electron');

// const isDev = require('electron-is-dev');

const isDev = false

let win = null;
let notionApiKey = null;
let client = null;

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
let lastVideoPath = null

ipcMain.on('path', (event, path) => {
    if (path === undefined) {
      path = lastVideoPath
    }
    else {
      lastVideoPath = path
    }
    
    console.log('receive path', count+=1, path)

    ffmpeg.ffprobe(path, (err, metadata) => {
        console.log(err, metadata)

        if (err !== null) {
          return console.error(err)
        }
        else if (win !== null) {
            win.webContents.send('D', metadata.format)
        }
    })
})

ipcMain.on('sendNotionApiKey', (event, key) => {
  notionApiKey = key
  try {
    client = new Client({ auth: key })
  } catch (error) {
    console.log('notion api auth error', key)
    return;
  }

  console.log('api start', client)
  
  client.search({
    filter: {
      value: 'database',
      property: 'object'
    }
  }).then(obj => {
    console.log(obj.results)
    if (win !== null) {
      win.webContents.send('sendNotionDbData', obj.results)
    }
  })
})

ipcMain.on('requestBangsongList', (e, bangsongDB) => {
  // 나중에 100개 이상의 요청도 수용할 수 있도록 수정해야함
  if (notionApiKey !== null && client !== null) {
    console.log('방송디비', bangsongDB)
    client.databases.query({
      database_id: bangsongDB.id,
      sorts: [{
        property: '방송시작날짜',
        direction: 'descending'
      }]
    }).then(({results}) => {
      if (win !== null) {
        win.webContents.send('sendBangsongList', results)
      }
    })
  }
})

function getMemoList(dbid, bangsongId, start_cursor) {
  return client.databases.query({ 
    database_id: dbid,
    start_cursor,
    filter: {
      property: "방송",
      relation: {
        contains: bangsongId
      }
    },
    sorts: [
      {
        property: "Duration",
        direction: "descending"
      }
    ]
  })
}

async function *getAllMemoList(dbid, bangsongId) {
  console.log('start')
  let next_cursor = undefined
  while (true) {
    const datalist = await getMemoList(dbid, bangsongId, next_cursor)
    yield * datalist.results
    
    if (datalist.has_more) {
      console.log('more request')
      next_cursor = datalist.next_cursor
    }
    else {
      break
    }
  }
}

ipcMain.on('requestMemoList', async (e, [memoDB, bangsong]) => {
  let results = []
  for await (const memo of getAllMemoList(memoDB.id, bangsong.id)) {
    results.push(memo)
  }

  if (win !== null) {
    win.webContents.send('sendMemoList', results)
  }
})

ipcMain.on('requestOpenSelectDirectory', () => {
  dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  }).then((r) => {
    
    console.log(r.filePaths)

    if (!r.canceled) {
      win.webContents.send('mainLog', `${r.filePaths[0]} ${path.join(r.filePaths[0], 'ffmpeg')}`)
      ffmpeg.setFfmpegPath(path.join(r.filePaths[0], 'ffmpeg'))
      ffmpeg.setFfprobePath(path.join(r.filePaths[0], 'ffprobe'))
      
      if (lastVideoPath !== null) {
        console.log('lastVideoPath', lastVideoPath)

        ipcMain.emit('path')
      }
      // 
    }
  })
})