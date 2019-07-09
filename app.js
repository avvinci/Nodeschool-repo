var electron = require('electron')
const { app, Menu, Tray } = require('electron')
let tray = null
let window = undefined

electron.app.on('ready', function(){
    var mainWindow = new electron.BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width:1000,
        height:700})
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    createTray() ; 
    createWindow();

})

const createWindow = () => {
    window = new electron.BrowserWindow({
        width: 320,
        height: 450,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        transparent: true,
    });
    window.loadURL(`file://${__dirname}/tray.html`)
    
}


const createTray = () => {
    tray = new Tray('./Quotes.ico')
    tray.setToolTip('Quotes App.')
    tray.on('click', function (event) {
        toggleWindow();
    })
}
const toggleWindow = () => {
    window.isVisible() ? window.hide() : showWindow();
}
const showWindow = () => {
    const position = getWindowPosition();
    window.setPosition(position.x, position.y, false);
    window.show();
}
const getWindowPosition = () => {
    const windowBounds = window.getBounds();
    const trayBounds = tray.getBounds();
    
    // Center window horizontally below the tray icon
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
    // Position window 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4)
    return {x: x, y: y}
}
