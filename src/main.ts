import { app, BrowserWindow, globalShortcut, screen } from "electron";

import { startTimer, pauseTimer, getTimerStatus } from "./timer.ts";

let win: BrowserWindow | null = null;
let isOverlayVisible = true;

function createWindow() {
  const { width } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: 300,
    height: 100,
    x: width - 300,
    y: 0,
    frame: true,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
  win.setIgnoreMouseEvents(true);
}

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register("CommandOrControl+X", () => {
    if (getTimerStatus()) {
      pauseTimer();
    } else {
      startTimer();
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
