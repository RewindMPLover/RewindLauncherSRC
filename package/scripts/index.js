/* 
 - Deobfuscated with <3
 - Rewind Launcher v2.1.1
*/

const { ipcRenderer } = require("electron");
const path = require("path");
const fs = require("fs");
const http = require("http");
const fetch = require("node-fetch");
let updateMirror = "";
const launcherDataPath = path.join(
  process.env.APPDATA,
  "rewind-launcher",
  "launcherdata.json"
);
const globals = require("../globals/globals.js");
let LauncherToken = "";
let Email = "";
let Username = "";
let Password = "";
document.getElementById("app-title").innerText =
  "Rewind (" + globals.CurrentVer + ")";
ipcRenderer.send("get-system-info");
const showMessageBox = (_0x417a84) => {
  ipcRenderer.send("show-message-box", _0x417a84);
};
let isUpdateCheckDone = false;
function checkForUpdates() {
  if (isUpdateCheckDone) {
    return;
  }
  isUpdateCheckDone = true;
  document.getElementById("main-container").style.display = "none";
  document.getElementById("update-required-container").style.display = "none";
  fetch(
    "https://services.rewindmp.xyz/api/cdn/launcherservice/v1?function=Update"
  )
    .then((_0x496739) => _0x496739.json())
    .then((_0x18a3b0) => {
      const _0x2784b6 = _0x18a3b0.CurrentBuild;
      if (_0x2784b6 !== globals.CurrentVer) {
        document.getElementById("update-check-overlay").style.display = "none";
        document.getElementById("update-required-container").style.display =
          "block";
        updateMirror = _0x18a3b0.UpdateMirrorLink;
      } else {
        document.getElementById("update-check-overlay").style.display = "none";
        document.getElementById("main-container").style.display = "block";
      }
    })
    ["catch"]((_0x45a83f) => {
      console.error("Error checking for updates:", _0x45a83f);
      document.getElementById("update-check-overlay").style.display = "none";
      document.getElementById("main-container").style.display = "none";
    });
}
window.onload = function () {
  checkForUpdates();
};
document
  .getElementById("install_update")
  .addEventListener("click", async () => {
    try {
      document.getElementById("state").innerText =
        "Installing Update, Please Wait..";
      ipcRenderer.send("update", updateMirror);
    } catch (_0x5e2d66) {
      document.getElementById("state").innerText = "Failed to install!";
    }
  });
document.getElementById("minimize").addEventListener("click", () => {
  ipcRenderer.send("minimize");
});
document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("close");
});
const startListener = () => {
  const _0x5591f0 = http.createServer((_0x1ca4b9, _0x18bc47) => {
    console.log("Request URL: " + _0x1ca4b9.url);
    if (_0x1ca4b9.url.startsWith("/received")) {
      const _0x4ec271 = new URL(
        _0x1ca4b9.url,
        "http://" + _0x1ca4b9.headers.host
      );
      const _0x14984f = _0x4ec271.searchParams.get("code");
      if (!_0x14984f) {
        _0x18bc47.writeHead(0x190, {
          "Content-Type": "text/plain",
        });
        _0x18bc47.end("No code provided!");
      } else {
        const _0x5654d2 = path.join(
          __dirname,
          "../authentication/finished.html"
        );
        fs.readFile(_0x5654d2, "utf8", (_0xd956a8, _0x242935) => {
          if (_0xd956a8) {
            console.error("Error reading HTML file:", _0xd956a8.message);
            _0x18bc47.writeHead(0x1f4, {
              "Content-Type": "text/plain",
            });
            _0x18bc47.end(
              "Internal Server Error: Could not load the HTML file"
            );
            return;
          }
          _0x18bc47.writeHead(0xc8, {
            "Content-Type": "text/html",
          });
          _0x18bc47.end(_0x242935);
        });
        handleDiscordCallback(_0x14984f);
      }
    } else {
      _0x18bc47.writeHead(0x194, {
        "Content-Type": "text/plain",
      });
      _0x18bc47.end("Not Found");
    }
  });
  _0x5591f0.listen(0x1a85, () => {
    console.log("Listening on port 6789");
  });
};
startListener();
const { shell } = require("electron");
let authWindow = null;
document.getElementById("authBtn").addEventListener("click", (_0xa8ed81) => {
  _0xa8ed81.preventDefault();
  const _0x270808 = document.getElementById("authBtn");
  _0x270808.innerText = "Starting Auth Window...";
  shell.openExternal(
    "https://discord.com/oauth2/authorize?client_id=1264925854908285069&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A6789%2Freceived&scope=guilds+identify"
  );
  _0x270808.innerText = "Waiting for response...";
  const _0x40ffbe = setInterval(() => {
    if (authWindow && authWindow.closed) {
      authWindow = null;
      _0x270808.innerText = "Authenticate with Discord";
      clearInterval(_0x40ffbe);
      console.log("Authentication window was closed by the user.");
    }
  }, 0x3e8);
  window.addEventListener("message", async (_0xd9b471) => {
    if (_0xd9b471.origin !== "http://127.0.0.1:6789") {
      return;
    }
    const { code: _0x46e4c5 } = _0xd9b471.data;
    if (_0x46e4c5) {
      clearInterval(_0x40ffbe);
      _0x270808.innerText = "Processing response...";
      await handleDiscordCallback(_0x46e4c5);
    }
  });
});
const initializeLauncherData = () => {
  fs.access(launcherDataPath, fs.constants.F_OK, (_0x25ebe1) => {
    if (_0x25ebe1) {
      const _0x19c458 = {
        launchertoken: "",
      };
      fs.mkdir(
        path.dirname(launcherDataPath),
        {
          recursive: true,
        },
        (_0x3bb22c) => {
          if (_0x3bb22c) {
            console.error("Error creating directory:", _0x3bb22c);
            return;
          }
          fs.writeFile(
            launcherDataPath,
            JSON.stringify(_0x19c458),
            (_0x38c366) => {
              if (_0x38c366) {
                console.error("Error writing file:", _0x38c366);
              } else {
                console.log("launcherdata.json created with default values.");
              }
            }
          );
        }
      );
    } else {
      fs.readFile(launcherDataPath, "utf8", (_0x48cceb, _0x4026c8) => {
        if (_0x48cceb) {
          console.error("Error reading launcherdata.json:", _0x48cceb);
          return;
        }
        if (
          !_0x4026c8 ||
          _0x4026c8 == undefined ||
          _0x4026c8 == null ||
          _0x4026c8 == ""
        ) {
          const _0x38d158 = {
            launchertoken: "",
          };
          fs.writeFile(
            launcherDataPath,
            JSON.stringify(_0x38d158),
            (_0x292830) => {
              if (_0x292830) {
                console.error("Error updating launcherdata.json:", _0x292830);
              } else {
                console.log("Launcher token updated successfully.");
              }
            }
          );
          setLauncherToken("");
          return;
        }
        const _0x3e953d = JSON.parse(_0x4026c8);
        LauncherToken = _0x3e953d.launchertoken;
        console.log("Launcher Token:", _0x3e953d.launchertoken);
        if (!globals.ForceRequireManualLogin) {
          AttempTokenSignin();
        }
      });
    }
  });
};
const setLauncherToken = (_0x49a931) => {
  fs.readFile(launcherDataPath, "utf8", (_0x3dc529, _0x494a46) => {
    if (_0x3dc529) {
      console.error("Error reading launcherdata.json:", _0x3dc529);
      return;
    }
    if (
      !_0x494a46 ||
      _0x494a46 == undefined ||
      _0x494a46 == null ||
      _0x494a46 == ""
    ) {
      _0x1417e2 = {};
      _0x1417e2.launchertoken = _0x49a931;
      LauncherToken = _0x49a931;
      fs.writeFile(launcherDataPath, JSON.stringify(_0x1417e2), (_0x264957) => {
        if (_0x264957) {
          console.error("Error updating launcherdata.json:", _0x264957);
        } else {
          console.log("Launcher token updated successfully.");
        }
      });
      return;
    }
    const _0x1417e2 = JSON.parse(_0x494a46);
    _0x1417e2.launchertoken = _0x49a931;
    LauncherToken = _0x49a931;
    if (_0x49a931 == null || _0x49a931 == "") {
      _0x1417e2 = {};
    }
    ipcRenderer.invoke("token_upload", _0x49a931);
    fs.writeFile(launcherDataPath, JSON.stringify(_0x1417e2), (_0x4605e9) => {
      if (_0x4605e9) {
        console.error("Error updating launcherdata.json:", _0x4605e9);
      } else {
        console.log("Launcher token updated successfully.");
      }
    });
  });
};
const handleDiscordCallback = async (_0x4c1e53) => {
  const _0x25267b = new XMLHttpRequest();
  const _0xe0c11a =
    "https://services.rewindmp.xyz/oauth/discordcallback/" + _0x4c1e53;
  if (authWindow) {
    authWindow.close();
  }
  _0x25267b.open("GET", _0xe0c11a, true);
  _0x25267b.onload = function () {
    if (_0x25267b.status >= 0xc8 && _0x25267b.status < 0x12c) {
      const _0x218220 = _0x25267b.responseText;
      if (_0x218220.includes("AUTH_ERROR")) {
        document.getElementById("authBtn").innerText = "Login Failed.";
        return showMessageBox(_0x218220);
      }
      document.getElementById("authBtn").innerText = "Logging in...";
      try {
        const _0x36fb1c = JSON.parse(_0x218220);
        if (!_0x36fb1c) {
          showMessageBox(_0x218220);
        }
        if (_0x36fb1c.Banned) {
          showMessageBox(
            "You are banned, You will login to the launcher. Launching will be disabled"
          );
          return;
        }
        const _0x486007 = {
          type: "login",
          email: _0x36fb1c.Email || "",
          username: _0x36fb1c.Username || "",
          skin: _0x36fb1c.CurrentSkin || "",
          hashedpassword: _0x36fb1c.Password || "",
          accountId: _0x36fb1c.AccountId || "",
          avatarUrl: _0x36fb1c.avatarUrl,
        };
        LauncherToken = _0x36fb1c.SignedToken;
        document.getElementById("authBtn").innerText = "Validating login...";
        ipcRenderer.send("validateHwid", {
          userData: _0x486007,
        });
        ipcRenderer.once("login", async (_0x42a506, _0x584279) => {
          setLauncherToken(_0x36fb1c.SignedToken);
          cont();
          ipcRenderer.invoke("userdata_upload", _0x486007);
          document.getElementById("authBtn").innerText =
            "Authentication Successful!";
        });
      } catch (_0x386cf7) {
        console.error("Error parsing forward response:", _0x386cf7);
        document.getElementById("authBtn").innerText = "Error occurred.";
      }
    } else {
      console.error("Failed to get forward response:", _0x25267b.responseText);
      document.getElementById("authBtn").innerText = "Authentication Failed.";
    }
  };
  _0x25267b.onerror = function () {
    console.error("Request error");
    document.getElementById("authBtn").innerText = "Authentication Failed.";
  };
  _0x25267b.send();
};
function AttempTokenSignin() {
  if (LauncherToken != "") {
    const _0x3ebf9f = new XMLHttpRequest();
    const _0x227fb1 =
      "https://services.rewindmp.xyz/oauth/tokencallback/" + LauncherToken;
    _0x3ebf9f.open("GET", _0x227fb1, true);
    _0x3ebf9f.onload = function () {
      if (_0x3ebf9f.status >= 0xc8 && _0x3ebf9f.status < 0x12c) {
        const _0x44011e = _0x3ebf9f.responseText;
        if (_0x44011e == "EXPIRED_TOKEN") {
          setLauncherToken("");
          LauncherToken = "";
          return;
        }
        document.getElementById("authBtn").innerText = "Logging in...";
        try {
          const _0x64b45c = JSON.parse(_0x44011e);
          if (_0x64b45c.Banned) {
            showMessageBox(
              "You are banned, You will login to the launcher. Launching will be disabled"
            );
            return;
          }
          if (_0x64b45c.Email) {
            Email = _0x64b45c.Email;
          }
          if (_0x64b45c.Password) {
            Password = _0x64b45c.Password;
          }
          if (_0x64b45c.Username) {
            Username = _0x64b45c.Username;
          }
          const _0x19656b = {
            type: "login",
            email: Email,
            username: Username,
            skin: _0x64b45c.CurrentSkin,
            hashedpassword: Password,
            avatarUrl: _0x64b45c.avatarUrl,
          };
          LauncherToken = _0x64b45c.SignedToken;
          setLauncherToken(_0x64b45c.SignedToken);
          cont();
          ipcRenderer.invoke("userdata_upload", _0x19656b);
        } catch (_0x43fa76) {
          console.error("Error parsing forward response:", _0x43fa76);
        }
      } else {
        console.error(
          "Failed to get forward response:",
          _0x3ebf9f.responseText
        );
      }
    };
    _0x3ebf9f.onerror = function () {
      console.error("Request error");
    };
    _0x3ebf9f.send();
  }
}
const cont = () => {
  ipcRenderer.send("load-trailer");
};
initializeLauncherData();
