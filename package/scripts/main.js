/* 
 - Deobfuscated with <3
 - Rewind Launcher v3.0.5
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
const axios = require("axios");
const { execSync } = require("child_process");
const { setTimeout } = require("timers/promises");
const os = require("os");
const si = require("systeminformation");
const sudo = require("sudo-prompt");
let userData = null;
let currentPage = "Home";
let win;
function createWindow() {
  const _0xb050a6 = new BrowserWindow({
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
  win = _0xb050a6;
  Menu.setApplicationMenu(null);
  _0xb050a6.setMenu(null);
  _0xb050a6.loadFile("./package/pages/index.html");
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
const setLauncherToken = (_0x365b3b) => {
  fs.readFile(launcherDataPath, "utf8", (_0x2a413b, _0x10dcf9) => {
    if (_0x2a413b) {
      console.error("Error reading launcherdata.json:", _0x2a413b);
      return;
    }
    if (
      !_0x10dcf9 ||
      _0x10dcf9 == undefined ||
      _0x10dcf9 == null ||
      _0x10dcf9 == ""
    ) {
      _0x5bed30 = {};
      _0x5bed30.newToken;
      LauncherToken = _0x365b3b;
      fs.writeFile(launcherDataPath, JSON.stringify(_0x5bed30), (_0x229a36) => {
        if (_0x229a36) {
          console.error("Error updating launcherdata.json:", _0x229a36);
        } else {
          console.log("Launcher token updated successfully.");
        }
      });
      return;
    }
    let _0x5bed30 = JSON.parse(_0x10dcf9);
    _0x5bed30.newToken;
    LauncherToken = _0x365b3b;
    if (_0x365b3b == null || _0x365b3b == "") {
      _0x5bed30 = {};
    }
    fs.writeFile(launcherDataPath, JSON.stringify(_0x5bed30), (_0x3b6f59) => {
      if (_0x3b6f59) {
        console.error("Error updating launcherdata.json:", _0x3b6f59);
      } else {
        console.log("Launcher token updated successfully.");
      }
    });
  });
};
function showMessageBox(_0x50d822, _0x48d201) {
  dialog
    .showMessageBox(win, {
      type: "info",
      buttons: ["OK"],
      title: "Information",
      message: _0x50d822,
    })
    .then((_0x4f843d) => {
      console.log("Dialog closed", _0x4f843d);
      if (_0x48d201) {
        app.quit();
      }
    })
    ["catch"]((_0x589738) => {
      console.error("Dialog error", _0x589738);
    });
}
ipcMain.on("get-system-info", async (_0x141043) => {});
ipcMain.on("openpresent", async (_0x45cadc, _0x5eb7fa) => {
  const { codeName: _0xc93e28 } = _0x5eb7fa;
  await setTimeout(0x5dc);
  const _0x21d576 =
    "https://services.rewindmp.xyz/api/v1/winterfest/claimReqeust/" +
    _0xc93e28 +
    "/" +
    launcherTOKEN;
  console.log("Fetching URL:", _0x21d576);
  try {
    const _0x51dcfb = await fetch(_0x21d576);
    const _0x59f503 = await _0x51dcfb.text();
    console.log("Response from API:", _0x59f503);
    if (_0x59f503 !== "OK") {
      _0x45cadc.reply("present-opened", {
        success: false,
        message: _0x59f503,
      });
    } else {
      _0x45cadc.reply("present-opened", {
        success: true,
        message: "Present opened successfully",
      });
    }
  } catch (_0x2df44a) {
    console.error("Error occurred:", _0x2df44a);
    _0x45cadc.reply("present-opened", {
      success: false,
      message: _0x2df44a.message,
    });
  }
});
async function checkVpn(_0x52c42e) {
  const {
    publicIp: _0x27d893,
    publicIpv4: _0x25c6df,
    publicIpv6: _0x30ff9f,
  } = await import("public-ip");
  const _0xf37a77 = "https://proxycheck.io/v2/" + _0x52c42e + "?vpn=1&asn=1";
  const _0x4da101 = "http://ip-api.com/json/" + _0x52c42e;
  try {
    const [_0x351812, _0x17202c] = await Promise.all([
      axios.get(_0xf37a77),
      axios.get(_0x4da101),
    ]);
    const _0x5ddf2f = _0x351812.data;
    const _0x20719b = _0x17202c.data;
    const _0x4292c8 = _0x5ddf2f?.[_0x52c42e]?.["proxy"] !== "no";
    const _0x2afbb5 = _0x20719b?.["proxy"] === true;
    return !!(_0x4292c8 || _0x2afbb5);
  } catch (_0x4d727c) {
    return false;
  }
}
ipcMain.on("validateHwid", async (_0xe8c5eb, _0x20bbb8) => {
  const {
    publicIp: _0x150fe6,
    publicIpv4: _0xa80aad,
    publicIpv6: _0x2df75f,
  } = await import("public-ip");
  const { userData: _0x5d42cc } = _0x20bbb8;
  try {
    let _0x36ea60 = await _0xa80aad();
    const _0x3b7ae0 = await checkVpn(_0x36ea60);
    if (_0x3b7ae0) {
      _0xe8c5eb.reply("hwid-validated", false);
      setLauncherToken("");
      showMessageBox(
        "VPN Detected. Please disable your VPN and try again.",
        true
      );
      return;
    }
    const _0x28eeb9 = await si.memLayout();
    const _0x2ced4e = await si.diskLayout();
    const _0x3b39b4 = await si.cpu();
    const _0x2abbc4 = await si.bios();
    const _0x5c0b0b = await si.system();
    let _0x29d1d0 = _0x28eeb9
      .map((_0x1c9c35) => _0x1c9c35.serialNum)
      .filter(
        (_0x3a9b6c) =>
          _0x3a9b6c &&
          _0x3a9b6c.trim() &&
          _0x3a9b6c !== "0000" &&
          _0x3a9b6c !== "00000000" &&
          _0x3a9b6c !== "Unknown"
      );
    if (!_0x29d1d0.length) {
      try {
        const _0x5cb802 = execSync(
          "wmic memorychip get serialnumber"
        ).toString();
        _0x29d1d0 = _0x5cb802
          .split("\n")
          .slice(0x1)
          .map((_0x30701c) => _0x30701c.trim())
          .filter(
            (_0x284575) =>
              _0x284575 &&
              _0x284575 !== "0000" &&
              _0x284575 !== "00000000" &&
              _0x284575 !== "Unknown"
          );
      } catch (_0x3950d8) {
        console.error("Failed to get RAM serials from wmic:", _0x3950d8);
      }
    }
    _0x29d1d0 = _0x29d1d0.length ? _0x29d1d0.join(",") : "NO_RAM_SERIAL";
    let _0x5418a1 = _0x2ced4e
      .map((_0x4f5ef4) => _0x4f5ef4.serialNum)
      .filter(
        (_0x835ad9) =>
          _0x835ad9 &&
          _0x835ad9.trim() &&
          _0x835ad9 !== "0000" &&
          _0x835ad9 !== "00000000" &&
          _0x835ad9 !== "Unknown"
      );
    if (!_0x5418a1.length) {
      try {
        const _0x51bb4a = execSync(
          "wmic diskdrive get serialnumber"
        ).toString();
        _0x5418a1 = _0x51bb4a
          .split("\n")
          .slice(0x1)
          .map((_0x1b56a4) => _0x1b56a4.trim())
          .filter(
            (_0x4f3df6) =>
              _0x4f3df6 &&
              _0x4f3df6 !== "0000" &&
              _0x4f3df6 !== "00000000" &&
              _0x4f3df6 !== "Unknown"
          );
      } catch (_0x471f0d) {
        console.error("Failed to get Disk serials from wmic:", _0x471f0d);
      }
    }
    _0x5418a1 = _0x5418a1.length ? _0x5418a1.join(",") : "NO_DISK_SERIAL";
    let _0x20653f = _0x3b39b4.serial || _0x5c0b0b.uuid;
    if (!_0x20653f || _0x20653f === "Unknown") {
      try {
        _0x20653f = execSync("wmic cpu get processorid")
          .toString()
          .split("\n")[0x1]
          .trim();
      } catch (_0x2e0f3e) {
        console.error("Failed to get CPU ID from wmic:", _0x2e0f3e);
      }
    }
    if (!_0x20653f || _0x20653f === "Unknown") {
      try {
        const _0x3d1812 = execSync("wmic cpu get serialnumber").toString();
        const _0x3f9200 = _0x3d1812.split("\n")[0x1].trim();
        if (_0x3f9200 && _0x3f9200 !== "0000" && _0x3f9200 !== "00000000") {
          _0x20653f = _0x3f9200;
        }
      } catch (_0x4db0c1) {
        console.error("Failed to get CPU serial from wmic:", _0x4db0c1);
      }
    }
    _0x20653f = _0x20653f && _0x20653f !== "Unknown" ? _0x20653f : "NO_CPU_ID";
    const _0x4733d3 = _0x2abbc4.serial || "UNKNOWN";
    let _0x205aa5 = "";
    try {
      _0x205aa5 = execSync('wmic useraccount where name="%username%" get sid')
        .toString()
        .split("\n")[0x1]
        .trim();
    } catch (_0x205d9c) {
      console.error("Failed to get SID:", _0x205d9c);
    }
    if (!_0x205aa5) {
      _0xe8c5eb.reply("hwid-validated", false);
      showMessageBox(
        "Could not get a valid System ID. Please contact support.",
        true
      );
      return;
    }
    if (
      _0x29d1d0 === "NO_RAM_SERIAL" &&
      _0x5418a1 === "NO_DISK_SERIAL" &&
      _0x20653f === "NO_CPU_ID"
    ) {
      _0xe8c5eb.reply("hwid-validated", false);
      showMessageBox(
        "Could not get any valid hardware information. Please contact support.",
        true
      );
      return;
    }
    const _0x383563 =
      "https://services.rewindmp.xyz/api/v1/hwid/serials/" +
      _0x5d42cc.accountId +
      "/" +
      _0x36ea60 +
      "/" +
      _0x29d1d0 +
      "/" +
      _0x5418a1 +
      "/" +
      _0x205aa5 +
      "/" +
      _0x20653f +
      "/" +
      _0x4733d3;
    const _0x259835 = await fetch(_0x383563);
    const _0x36c335 = await _0x259835.text();
    if (_0x36c335 === "PostLogin") {
      _0xe8c5eb.reply("hwid-validated", true);
    } else {
      _0xe8c5eb.reply("hwid-validated", false);
      setLauncherToken("");
      if (
        _0x36c335 === "Account is banned" ||
        _0x36c335 === "Hardware is associated with a banned account" ||
        _0x36c335 === "Account banned due to multiple account detection"
      ) {
        showMessageBox(
          "Your account has been banned. Please contact support.",
          true
        );
      } else if (_0x36c335 === "Account not found") {
        showMessageBox("Account not found. Please try again.", true);
      } else {
        showMessageBox(_0x36c335, true);
      }
    }
  } catch (_0x4328b4) {
    console.error("Error during HWID validation:", _0x4328b4);
    _0xe8c5eb.reply("hwid-validated", false);
    showMessageBox(
      "Error validating hardware information. Please try again.",
      true
    );
  }
});
ipcMain.on("update", async (_0x42a24f, _0x3f099d) => {
  try {
    const _0x590b02 = path.join(
      os.homedir(),
      "Downloads",
      "UpdateToLatest.exe"
    );
    const _0x4674b4 = await fetch(_0x3f099d);
    if (!_0x4674b4.ok) {
      app.quit();
      return;
    }
    const _0xc3d2cc = fs.createWriteStream(_0x590b02);
    _0x4674b4.body.pipe(_0xc3d2cc);
    await new Promise((_0x188e00, _0x1fb45b) => {
      _0xc3d2cc.on("finish", _0x188e00);
      _0xc3d2cc.on("error", _0x1fb45b);
    });
    const _0x273f3f = {
      name: "RewindLauncher",
    };
    sudo.exec(_0x590b02, _0x273f3f, (_0x19c406, _0xc83606, _0x32c24b) => {
      if (_0x19c406) {
        console.error("Error running the update process:", _0x19c406);
        return;
      }
      console.log("stdout:", _0xc83606);
      console.error("stderr:", _0x32c24b);
      app.quit();
    });
  } catch (_0x36ec31) {
    console.error("Error installing update:", _0x36ec31);
    throw _0x36ec31;
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
ipcMain.on("minimize", async (_0x171f00) => {
  console.log("Minimize action received");
  const _0x21b80d = BrowserWindow.getFocusedWindow();
  if (_0x21b80d) {
    _0x21b80d.minimize();
  }
});
ipcMain.on("maximize", (_0x3b6781) => {
  console.log("Maximize action received");
  const _0x1b54f0 = BrowserWindow.getFocusedWindow();
  if (_0x1b54f0) {
    if (_0x1b54f0.isMaximized()) {
      _0x1b54f0.unmaximize();
    } else {
      _0x1b54f0.maximize();
    }
  }
});
ipcMain.on("close", (_0x12d1c6) => {
  console.log("Close action received");
  const _0x205425 = BrowserWindow.getFocusedWindow();
  if (_0x205425) {
    _0x205425.close();
  }
});
ipcMain.on("show-message-box", async (_0x16e2c7, _0x491986) => {
  dialog
    .showMessageBox(win, {
      type: "info",
      buttons: ["OK"],
      title: "Information",
      message: _0x491986,
    })
    .then((_0x1afe4e) => {
      console.log("Dialog closed", _0x1afe4e);
    })
    ["catch"]((_0x60f245) => {
      console.error("Dialog error", _0x60f245);
    });
});
ipcMain.handle("token_upload", async (_0x15a5d2, _0x325914) => {
  launcherTOKEN = _0x325914;
});
ipcMain.handle("userdata_upload", async (_0x5bb5c7, _0x252952) => {
  try {
    userData = _0x252952;
    return {
      success: true,
    };
  } catch (_0xf0a376) {
    console.error("Error uploading user data:", _0xf0a376);
    return {
      success: false,
      error: _0xf0a376.message,
    };
  }
});
ipcMain.handle("userdata_get", () => {
  return userData ? userData : null;
});
ipcMain.on("load-trailer", async (_0x1d6600) => {
  const _0x1309ce = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "FileVersions.json"
  );
  let _0x5e9abe;
  if (fs.existsSync(_0x1309ce)) {
    const _0x1a2d70 = fs.readFileSync(_0x1309ce, "utf-8");
    const _0x4a9ca5 = JSON.parse(_0x1a2d70);
    _0x5e9abe = _0x4a9ca5.TrailerVer;
  }
  if (globals.ForcePreviewTrailer) {
    currentPage = "Trailer";
    return win.loadFile("./package/pages/trailer.html");
  }
  if (_0x5e9abe !== 0x4) {
    fs.writeFileSync(
      _0x1309ce,
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
ipcMain.on("Home", async (_0x52d403) => {
  if (currentPage != "Home") {
    currentPage = "Home";
    win.loadFile("./package/pages/home.html");
  }
});
ipcMain.on("Servers", async (_0x1c31a9) => {
  if (currentPage != "Servers") {
    currentPage = "Servers";
    win.loadFile("./package/pages/servers.html");
  }
});
ipcMain.on("Winterfest", async (_0x506ab0) => {
  if (currentPage != "Winterfest") {
    currentPage = "Winterfest";
    win.loadFile("./package/pages/winterfest.html");
  }
});
ipcMain.on("Profile", async (_0x230ed2) => {
  if (currentPage != "Profile") {
    currentPage = "Profile";
    win.loadFile("./package/pages/profile.html");
  }
});
ipcMain.on("Shop", async (_0x522d9d) => {
  shell.openExternal("https://services.rewindmp.xyz/shop");
});
ipcMain.on("Library", async (_0xaed8d3) => {
  if (currentPage != "Library") {
    currentPage = "Library";
    win.loadFile("./package/pages/library.html");
  }
});
function sendStatusUpdateToRenderer(_0x18de36) {
  const _0x4a7440 = BrowserWindow.getFocusedWindow();
  if (_0x4a7440) {
    _0x4a7440.webContents.send("fn-status-update", _0x18de36);
  }
}
const coreServices = {
  UpdateFN_State: async (_0x59a8d4) => {
    sendStatusUpdateToRenderer(_0x59a8d4);
  },
  selectFolder: async () => {
    const _0xd18429 = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    return _0xd18429.filePaths[0x0];
  },
  MessagePopup: (_0x39f183) => {
    dialog
      .showMessageBox(win, {
        type: "info",
        buttons: ["OK"],
        title: "Information",
        message: _0x39f183,
      })
      .then((_0x35e1f8) => {
        console.log("Dialog closed", _0x35e1f8);
      })
      ["catch"]((_0x2f7e96) => {
        console.error("Dialog error", _0x2f7e96);
      });
  },
  log: (_0x454354) => {
    console.log(_0x454354);
  },
};
ipcMain.on("messagePopup", async (_0xb8dd45, _0x3d1874) => {
  dialog
    .showMessageBox(win, {
      type: "info",
      buttons: ["OK"],
      title: "Information",
      message: _0x3d1874,
    })
    .then((_0x294136) => {
      console.log("Dialog closed", _0x294136);
    })
    ["catch"]((_0x154f01) => {
      console.error("Dialog error", _0x154f01);
    });
});
ipcMain.on("launch-fn", async (_0x3fa292) => {
  Launch(coreServices, userData);
});
ipcMain.on("update-fn-path", async (_0x3aad9d) => {
  RewindAPI.UpdateGamePath(coreServices);
});
async function CheckBanStatus(_0x137e2) {
  try {
    const _0x205997 = await fetch(
      "https://services.rewindmp.xyz/api/v1/RewindBanCheck/" + _0x137e2
    );
    const _0x49368c = await _0x205997.text();
    return _0x49368c === "true";
  } catch (_0x293d04) {
    console.error("Error checking ban status:", _0x293d04);
    return false;
  }
}
async function HandleBanCheck() {
  const _0x5d043 = userData.accountId;
  if (!_0x5d043) {
    return;
  }
  const _0x56b80e = await CheckBanStatus(_0x5d043);
  if (_0x56b80e) {
    win.loadFile("./package/pages/banned.html");
    KillFortniteProcesses();
    setTimeout(() => {
      try {
        window.close();
      } catch (_0x3afe29) {
        console.error("Error closing launcher:", _0x3afe29);
      }
    }, 0x1388);
  }
}
function KillFortniteProcesses() {
  try {
    const _0xfbb731 = execSync("tasklist");
    const _0x2367e2 = _0xfbb731.toString().split("\n");
    _0x2367e2.forEach((_0x28ff30) => {
      if (_0x28ff30.toLowerCase().includes("fortnite")) {
        const _0x44ccfd = _0x28ff30.split(/\s+/);
        const _0x5a9535 = _0x44ccfd[0x1];
        try {
          execSync("taskkill /F /PID " + _0x5a9535);
          console.log("Killed Fortnite process (PID " + _0x5a9535 + ")");
        } catch (_0x3494a4) {
          console.error(
            "Error killing Fortnite process (PID " +
              _0x5a9535 +
              "): " +
              _0x3494a4.message
          );
        }
      }
    });
  } catch (_0x2522fe) {
    console.error("Error listing processes: " + _0x2522fe.message);
  }
}
function StartBanCheck() {
  HandleBanCheck();
  setInterval(HandleBanCheck, 0x1388);
}
app.on("ready", () => {
  StartBanCheck();
});
