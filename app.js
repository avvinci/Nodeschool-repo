var electron = require("electron");
const trayWindow = require("electron-tray-window");
electron.app.on("ready", function() {

  var mytrayWindow = new electron.BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 100,
    height: 100
  });

  // mytrayWindow.setMenu(null);
  mytrayWindow.loadURL(`file://${__dirname}/tray.html`);
  trayWindow.setOptions({
    trayIconPath: "./Quotes.ico",
    window: mytrayWindow
    // windowUrl: `file://${__dirname}/tray.html`,
  });

  trayWindow.setWindowSize({
    width: 400,
    height: 400, 
    margin_x: 10,
    margin_y: 10 
  });
});
