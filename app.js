var electron = require("electron");
const { app, Menu, Tray } = require("electron");
const trayWindow = require("electron-tray-window");
const { ipcMain } = require("electron");
const csvFilePath = "./quotes.csv";

let tray = null;
app.on("ready", () => {
  tray = new Tray("./Quotes.ico");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Add Quote",
      click: () => {
        var newWindow = new electron.BrowserWindow({
          webPreferences: {
            nodeIntegration: true
          },
          width: 800,
          height: 600
        });
        newWindow.loadURL(`file://${__dirname}/index.html`);
      }
    },
    { label: "Item2", type: "radio" },
    { label: "Item3", type: "radio", checked: true },
    { label: "Item4", type: "radio" }
  ]);
  tray.setToolTip("Quotes collector.");
  tray.setContextMenu(contextMenu);
  // });
  // var mytrayWindow = new electron.BrowserWindow({
  //   webPreferences: {
  //     nodeIntegration: true
  //   },
  //   width: 400,
  //   height: 400,
  //   margin_x: 10,
  //   margin_y: 10
  // });

  // // mytrayWindow.setMenu(null);
  // mytrayWindow.loadURL(`file://${__dirname}/tray.html`);
  // trayWindow.setOptions({
  //   trayIconPath: "./Quotes.ico",
  //   window: mytrayWindow
  //   // windowUrl: `file://${__dirname}/tray.html`,
  // });

  // trayWindow.setWindowSize({
  //   width: 400,
  //   height: 400,
  //   margin_x: 10,
  //   margin_y: 10
  // });
});

ipcMain.on("needViewData", async event => {
  const csv = require("csvtojson");
  csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
      // console.log(jsonObj);
      event.reply("viewData", jsonObj);
    });
});

ipcMain.on("inputData", async (event, inputData) => {
  // console.log(inputData);
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
