import { app, BrowserWindow } from "electron";
import path from "node:path";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    fullscreen: true,
    autoHideMenuBar: true,
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  createWindow();
  // 如果之间为12:00-12:30，无法启动
  // const d = new Date();
  // if (d.getHours() === 12 && d.getMinutes() < 30) {
  //   const res1 = await dialog.showMessageBox(win!, {
  //     type: "error",
  //     title: "Fuck you 王俊烨(yè)",
  //     message: "Nope",
  //     detail: "12:00-12:30 无法启动随机点名",
  //     buttons: ["我不服", "退出"],
  //   });
  //   if (res1.response === 0) {
  //     await dialog.showMessageBox({
  //       type: "question",
  //       title: "欸嘿",
  //       message: "欸嘿",
  //       buttons: ["「欸嘿」是什么意思啊！"],
  //     });
  //   }
  //   win?.close();
  //   app.quit();
  // }
});
