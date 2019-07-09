var electron = require("electron");
const trayWindow = require("electron-tray-window");
electron.app.on("ready", function() {
  var mainWindow = new electron.BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 600
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  var mytrayWindow = new electron.BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });

  // mytrayWindow.setMenu(null);
  mytrayWindow.loadURL(`file://${__dirname}/tray.html`);
  trayWindow.setOptions({
    trayIconPath: "./Quotes.ico",
    window: mytrayWindow
    // windowUrl: `file://${__dirname}/tray.html`,
  });

  trayWindow.setWindowSize({
    width: 400, //optional
    height: 400, //optional
    margin_x: 10, //optional
    margin_y: 10 //optional
  });
});
