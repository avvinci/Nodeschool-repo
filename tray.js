var electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
var b = document.getElementById("viewMainWindow");

b.onclick = () => {
  createMainWindow();
};

function createMainWindow() {
  var newWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 600
  });
  newWindow.loadURL(`file://${__dirname}/index.html`);
}
