var electron = require('electron')

electron.app.on('ready', function(){
    var mainWindow = new electron.BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width:1000,
        height:700})
    mainWindow.loadURL(`file://${__dirname}/index.html`)
})