const {app,BrowserWindow}=require('electron')
const {autoUpdater}=require('electron-updater')
const path=require('path')
let win;
function createWindow(){
    win=new BrowserWindow({
        webPreferences:{
            preload:path.join(__dirname,'preload.js')
        }
    })
    win.loadFile(path.join(__dirname,'index.html'))
}
app.on('ready',()=>{
    createWindow()
})
setInterval(()=>{
    autoUpdater.checkForUpdates();
},10000)
autoUpdater.on('checking-for-update',()=>{
    win.webContents.send('status','checking for updates')
})
autoUpdater.once('update-available',()=>{
    win.webContents.send('status','update available')
    autoUpdater.downloadUpdate();
})
autoUpdater.on('download-progress',(progress)=>{
    win.webContents.send('downloading',`downloading ${progress.percent}`)
})
autoUpdater.on('update-downloaded',()=>{
    win.webContents.send('status','downloaded')
    autoUpdater.quitAndInstall()
})
