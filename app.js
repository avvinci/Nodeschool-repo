const {
  BrowserWindow,
  app,
  Menu,
  Tray,
  ipcMain,
  globalShortcut
} = require("electron");

// const trayWindow = require("electron-tray-window");
const csvFilePath = "./quotes.csv";

let tray = null,
  mytrayWindow = null;
app.on("ready", () => {
  globalShortcut.register("CommandOrControl+Y", () => {
    console.log(`The global shortkey was pressed!`);
    createTrayWindow();
  });

  tray = new Tray("./Quotes.ico");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Add Quote",
      click: () => {
        createMainWindow();
      }
    },
    { label: "ViewQuotes" },
    { label: "Settings" }
  ]);
  tray.setToolTip("Quotes collector.");
  tray.setContextMenu(contextMenu);
  tray.on("click", () => {
    console.log("tray clicked");
    createTrayWindow();
  });
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

function createTrayWindow() {
  if (mytrayWindow) return;
  mytrayWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 700,
    height: 500,
    margin_x: 10,
    margin_y: 10
  });
  mytrayWindow.setMenu(null);
  mytrayWindow.loadURL(`file://${__dirname}/index.html`);
}

app.on("will-quit", () => {
  // Unregister a shortcut.
  globalShortcut.unregister("CommandOrControl+Y");

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
