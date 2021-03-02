import { app, BrowserWindow, ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import * as path from "path";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

const isDev = process.env.NODE_ENV === "development";
console.log(path.join(__dirname, "preload.js"));
function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
      // nodeIntegrationInWorker: false,
      // nodeIntegrationInSubFrames: false,
      // contextIsolation: true,
      // enableRemoteModule: false,
      // additionalArguments: [`storePath:${app.getPath("userData")}`],
      preload: path.resolve(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    window.webContents.openDevTools();
  }

  if (isDev) {
    window.loadURL(
      `http://${process.env.ELECTRON_WEBPACK_WDS_HOST}:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    );
  } else {
    window.loadFile(path.resolve(__dirname, "index.html"));
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
    console.log(mainWindow.webPreferences);
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();
});

ipcMain.on("check-for-update", (event, msg) => {
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});
autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});
ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});
