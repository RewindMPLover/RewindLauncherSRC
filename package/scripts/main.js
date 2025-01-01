/* 
 - Deobfuscated with <3
 - Rewind Launcher v2.1.1
*/


const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  shell,
} = require("electron");
const path = require("path");
const fs = require("fs");
const globals = require("../globals/globals.js");
const { Launch } = require("../globals/fortnite.js");
const RewindAPI = require("../globals/rewindApi.js");
const fetch = require("node-fetch");
const { setTimeout } = require("timers/promises");
const os = require("os");
const si = require("systeminformation");
const sudo = require("sudo-prompt");
let userData = null;
let currentPage = "Home";
let win;
function createWindow() {
  const _0x1934f8 = new BrowserWindow({
    width: 0x578,
    height: 0x316,
    minWidth: 0x578,
    minHeight: 0x316,
    frame: false,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
    },
  });
  win = _0x1934f8;
  Menu.setApplicationMenu(null);
  _0x1934f8.setMenu(null);
  _0x1934f8.loadFile("./package/pages/index.html");
}
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0x0) {
      createWindow();
    }
  });
});
const launcherDataPath = path.join(
  process.env.APPDATA,
  "rewind-launcher",
  "launcherdata.json"
);
const setLauncherToken = (_0x56902f) => {
  fs.readFile(launcherDataPath, "utf8", (_0x3c2cb4, _0xf4e22f) => {
    if (_0x3c2cb4) {
      console.error("Error reading launcherdata.json:", _0x3c2cb4);
      return;
    }
    if (
      !_0xf4e22f ||
      _0xf4e22f == undefined ||
      _0xf4e22f == null ||
      _0xf4e22f == ""
    ) {
      _0x2b521d = {};
      _0x2b521d.newToken;
      LauncherToken = _0x56902f;
      fs.writeFile(launcherDataPath, JSON.stringify(_0x2b521d), (_0x576476) => {
        if (_0x576476) {
          console.error("Error updating launcherdata.json:", _0x576476);
        } else {
          console.log("Launcher token updated successfully.");
        }
      });
      return;
    }
    let _0x2b521d = JSON.parse(_0xf4e22f);
    _0x2b521d.newToken;
    LauncherToken = _0x56902f;
    if (_0x56902f == null || _0x56902f == "") {
      _0x2b521d = {};
    }
    fs.writeFile(launcherDataPath, JSON.stringify(_0x2b521d), (_0x173eb1) => {
      if (_0x173eb1) {
        console.error("Error updating launcherdata.json:", _0x173eb1);
      } else {
        console.log("Launcher token updated successfully.");
      }
    });
  });
};
function showMessageBox(_0x1afce6, _0x161f9a) {
  dialog
    .showMessageBox(win, {
      type: "info",
      buttons: ["OK"],
      title: "Information",
      message: _0x1afce6,
    })
    .then((_0xae4f08) => {
      console.log("Dialog closed", _0xae4f08);
      if (_0x161f9a) {
        app.quit();
      }
    })
    ["catch"]((_0xbeb83) => {
      console.error("Dialog error", _0xbeb83);
    });
}
ipcMain.on("get-system-info", async (_0x336253) => {});
ipcMain.on("openpresent", async (_0x18caff, _0x19040d) => {
  const { codeName: _0x4efd64 } = _0x19040d;
  await setTimeout(0x5dc);
  const _0x4a415d =
    "https://services.rewindmp.xyz/api/v1/winterfest/claimReqeust/" +
    _0x4efd64 +
    "/" +
    launcherTOKEN;
  console.log("Fetching URL:", _0x4a415d);
  try {
    const _0x1898f5 = await fetch(_0x4a415d);
    const _0x1b40da = await _0x1898f5.text();
    console.log("Response from API:", _0x1b40da);
    if (_0x1b40da !== "OK") {
      _0x18caff.reply("present-opened", {
        success: false,
        message: _0x1b40da,
      });
    } else {
      _0x18caff.reply("present-opened", {
        success: true,
        message: "Present opened successfully",
      });
    }
  } catch (_0x3bbb71) {
    console.error("Error occurred:", _0x3bbb71);
    _0x18caff.reply("present-opened", {
      success: false,
      message: _0x3bbb71.message,
    });
  }
});
ipcMain.on("validateHwid", async (_0x3fc1c5, _0x5445c6) => {
  const {
    publicIp: _0x27417f,
    publicIpv4: _0x45c14a,
    publicIpv6: _0x35ad63,
  } = await import("public-ip");
  const { userData: _0x1d17d3 } = _0x5445c6;
  try {
    let _0x452374 = await _0x45c14a();
    const _0x189cbd = await si.memLayout();
    const _0x174d72 = await si.diskLayout();
    const _0x11a0ca = _0x189cbd
      .map((_0x3fc3d8) => _0x3fc3d8.serialNum)
      .join(", ");
    const _0x51d461 = _0x174d72
      .map((_0x5677cb) => _0x5677cb.serialNum)
      .join(", ");
    const _0x1ffde8 = await RewindAPI.bAllowSerials(
      _0x1d17d3.username,
      _0x452374,
      _0x11a0ca,
      _0x51d461
    );
    if (_0x1ffde8 === "PostLogin") {
      _0x3fc1c5.reply("login");
    } else {
      _0x3fc1c5.reply("failed");
      setLauncherToken("");
      showMessageBox(
        "Uh oh! Seems like you are banned from rewind, make a support ticket: " +
          _0x1ffde8,
        true
      );
    }
  } catch (_0x49bbf8) {
    console.log(_0x49bbf8);
  }
});
ipcMain.on("update", async (_0x454bac, _0x826092) => {
  try {
    const _0x317e08 = path.join(
      os.homedir(),
      "Downloads",
      "UpdateToLatest.exe"
    );
    const _0x1f1550 = await fetch(_0x826092);
    if (!_0x1f1550.ok) {
      app.quit();
      return;
    }
    const _0x27181b = fs.createWriteStream(_0x317e08);
    _0x1f1550.body.pipe(_0x27181b);
    await new Promise((_0x1894b5, _0x1e71d2) => {
      _0x27181b.on("finish", _0x1894b5);
      _0x27181b.on("error", _0x1e71d2);
    });
    const _0x87f833 = {
      name: "RewindLauncher",
    };
    sudo.exec(_0x317e08, _0x87f833, (_0x17b11e, _0x2e2254, _0x173ae0) => {
      if (_0x17b11e) {
        console.error("Error running the update process:", _0x17b11e);
        return;
      }
      console.log("stdout:", _0x2e2254);
      console.error("stderr:", _0x173ae0);
      app.quit();
    });
  } catch (_0x1d58dc) {
    console.error("Error installing update:", _0x1d58dc);
    throw _0x1d58dc;
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
ipcMain.on("minimize", async (_0x43268e) => {
  console.log("Minimize action received");
  const _0x1c76d1 = BrowserWindow.getFocusedWindow();
  if (_0x1c76d1) {
    _0x1c76d1.minimize();
  }
});
ipcMain.on("maximize", (_0x4d8d04) => {
  console.log("Maximize action received");
  const _0x457ca1 = BrowserWindow.getFocusedWindow();
  if (_0x457ca1) {
    if (_0x457ca1.isMaximized()) {
      _0x457ca1.unmaximize();
    } else {
      _0x457ca1.maximize();
    }
  }
});
ipcMain.on("close", (_0x58d99f) => {
  console.log("Close action received");
  const _0x50ea6e = BrowserWindow.getFocusedWindow();
  if (_0x50ea6e) {
    _0x50ea6e.close();
  }
});
ipcMain.on("show-message-box", async (_0x258ea4, _0x3ae571) => {
  dialog
    .showMessageBox(win, {
      type: "info",
      buttons: ["OK"],
      title: "Information",
      message: _0x3ae571,
    })
    .then((_0x4eaa5b) => {
      console.log("Dialog closed", _0x4eaa5b);
    })
    ["catch"]((_0x39aef3) => {
      console.error("Dialog error", _0x39aef3);
    });
});
ipcMain.handle("token_upload", async (_0x36fbcd, _0x4a35a5) => {
  launcherTOKEN = _0x4a35a5;
});
ipcMain.handle("userdata_upload", async (_0x4dbc47, _0xc2c7a1) => {
  userData = _0xc2c7a1;
});
ipcMain.handle("userdata_get", () => {
  return userData ? userData : null;
});
ipcMain.on("load-trailer", async (_0x333372) => {
  const _0x10af51 = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "FileVersions.json"
  );
  let _0x54d2d3;
  if (fs.existsSync(_0x10af51)) {
    const _0x1a330e = fs.readFileSync(_0x10af51, "utf-8");
    const _0x747601 = JSON.parse(_0x1a330e);
    _0x54d2d3 = _0x747601.TrailerVer;
  }
  if (globals.ForcePreviewTrailer) {
    currentPage = "Trailer";
    return win.loadFile("./package/pages/trailer.html");
  }
  if (_0x54d2d3 !== 0x4) {
    fs.writeFileSync(
      _0x10af51,
      JSON.stringify(
        {
          TrailerVer: 0x4,
        },
        null,
        0x2
      )
    );
    currentPage = "Trailer";
    win.loadFile("./package/pages/trailer.html");
  } else {
    win.loadFile("./package/pages/home.html");
  }
});
ipcMain.on("Home", async (_0x5ba18a) => {
  if (currentPage != "Home") {
    currentPage = "Home";
    win.loadFile("./package/pages/home.html");
  }
});
ipcMain.on("Servers", async (_0x3b4afa) => {
  if (currentPage != "Servers") {
    currentPage = "Servers";
    win.loadFile("./package/pages/servers.html");
  }
});
ipcMain.on("Winterfest", async (_0x22ecda) => {
  if (currentPage != "Winterfest") {
    currentPage = "Winterfest";
    win.loadFile("./package/pages/winterfest.html");
  }
});
ipcMain.on("Profile", async (_0x4db2c4) => {
  if (currentPage != "Profile") {
    currentPage = "Profile";
    win.loadFile("./package/pages/profile.html");
  }
});
ipcMain.on("Shop", async (_0x59b54f) => {
  shell.openExternal("https://services.rewindmp.xyz/shop");
});
ipcMain.on("Library", async (_0x4b3680) => {
  if (currentPage != "Library") {
    currentPage = "Library";
    win.loadFile("./package/pages/library.html");
  }
});
function sendStatusUpdateToRenderer(_0x28eeac) {
  const _0x4c2554 = BrowserWindow.getFocusedWindow();
  if (_0x4c2554) {
    _0x4c2554.webContents.send("fn-status-update", _0x28eeac);
  }
}
const coreServices = {
  UpdateFN_State: async (_0x1c4fd7) => {
    sendStatusUpdateToRenderer(_0x1c4fd7);
  },
  selectFolder: async () => {
    const _0x10ef33 = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    return _0x10ef33.filePaths[0x0];
  },
  MessagePopup: (_0xb32267) => {
    dialog
      .showMessageBox(win, {
        type: "info",
        buttons: ["OK"],
        title: "Information",
        message: _0xb32267,
      })
      .then((_0x7ec934) => {
        console.log("Dialog closed", _0x7ec934);
      })
      ["catch"]((_0x411c82) => {
        console.error("Dialog error", _0x411c82);
      });
  },
  log: (_0x489bf1) => {
    console.log(_0x489bf1);
  },
};
ipcMain.on("messagePopup", async (_0x50ca7f, _0x5d48f8) => {
  dialog
    .showMessageBox(win, {
      type: "info",
      buttons: ["OK"],
      title: "Information",
      message: _0x5d48f8,
    })
    .then((_0x1cced9) => {
      console.log("Dialog closed", _0x1cced9);
    })
    ["catch"]((_0x198e33) => {
      console.error("Dialog error", _0x198e33);
    });
});
ipcMain.on("launch-fn", async (_0x2d6c2e) => {
  Launch(coreServices, userData);
});
ipcMain.on("update-fn-path", async (_0x16f690) => {
  RewindAPI.UpdateGamePath(coreServices);
});
