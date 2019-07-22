var electron = require("electron");
const trayWindow = require("electron-tray-window");
const { ipcMain } = require("electron");

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

ipcMain.on("inputData", async (event, inputData) => {
  console.log(inputData);
  let quote = inputData.quote;
  let author = inputData.author;
  const records = [{ quote, author }];
  const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: "quotes.csv",
    header: [
      { id: "quote", title: "QUOTE" },
      { id: "author", title: "AUTHOR" }
    ],
    append: true
  });
  csvWriter
    .writeRecords(records) // returns a promise
    .then(() => {
      console.log("...Done");
    });
});
