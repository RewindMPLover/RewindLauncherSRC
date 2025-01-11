/* 
 - Deobfuscated with <3
 - Rewind Launcher v3.0.5
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
let isUpdateCheckDone = false;
document.addEventListener("DOMContentLoaded", () => {
  try {
    document.getElementById("app-title").innerText =
      "Rewind (" + globals.CurrentVer + ")";
    ipcRenderer.send("get-system-info");
    const _0x2af8c4 = document.getElementById("update-check-overlay");
    if (_0x2af8c4) {
      _0x2af8c4.style.opacity = "0";
      _0x2af8c4.style.display = "flex";
      setTimeout(() => {
        _0x2af8c4.style.opacity = "1";
        checkForUpdates();
      }, 0x64);
    }
    initializeLauncherData();
  } catch (_0x36804f) {
    console.error("Error initializing:", _0x36804f);
  }
});
function checkForUpdates() {
  if (isUpdateCheckDone) {
    return;
  }
  isUpdateCheckDone = true;
  const _0x4b9d7b = document.getElementById("main-container");
  const _0x52227d = document.getElementById("update-required-container");
  const _0x1a2cd2 = document.getElementById("update-check-overlay");
  if (_0x4b9d7b) {
    _0x4b9d7b.style.display = "none";
  }
  if (_0x52227d) {
    _0x52227d.style.display = "none";
  }
  setTimeout(() => {
    fetch(
      "https://services.rewindmp.xyz/api/cdn/launcherservice/v1?function=Update"
    )
      .then((_0x389ab3) => _0x389ab3.json())
      .then((_0xf2c1bf) => {
        const _0x4076a3 = _0xf2c1bf.CurrentBuild;
        if (_0x4076a3 !== globals.CurrentVer) {
          if (_0x1a2cd2) {
            _0x1a2cd2.style.opacity = "0";
            setTimeout(() => {
              _0x1a2cd2.style.display = "none";
              if (_0x52227d) {
                _0x52227d.style.opacity = "0";
                _0x52227d.style.display = "flex";
                setTimeout(() => {
                  _0x52227d.style.opacity = "1";
                }, 0x32);
              }
            }, 0x12c);
          }
          updateMirror = _0xf2c1bf.UpdateMirrorLink;
        } else if (_0x1a2cd2) {
          _0x1a2cd2.style.opacity = "0";
          setTimeout(() => {
            _0x1a2cd2.style.display = "none";
            if (_0x4b9d7b) {
              _0x4b9d7b.style.opacity = "0";
              _0x4b9d7b.style.display = "block";
              setTimeout(() => {
                _0x4b9d7b.style.opacity = "1";
              }, 0x32);
            }
          }, 0x12c);
        }
      })
      ["catch"]((_0x44308e) => {
        console.error("Error checking for updates:", _0x44308e);
        if (_0x1a2cd2) {
          _0x1a2cd2.style.opacity = "0";
          setTimeout(() => {
            _0x1a2cd2.style.display = "none";
            if (_0x4b9d7b) {
              _0x4b9d7b.style.opacity = "0";
              _0x4b9d7b.style.display = "block";
              setTimeout(() => {
                _0x4b9d7b.style.opacity = "1";
              }, 0x32);
            }
          }, 0x12c);
        }
      });
  }, 0x320);
}
document
  .getElementById("install_update")
  .addEventListener("click", async () => {
    try {
      document.getElementById("state").innerText =
        "Installing Update, Please Wait..";
      ipcRenderer.send("update", updateMirror);
    } catch (_0x27954a) {
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
  const _0x2e56e1 = http.createServer((_0x31cd96, _0x424d0e) => {
    console.log("Request URL: " + _0x31cd96.url);
    if (_0x31cd96.url.startsWith("/received")) {
      const _0x6d8aab = new URL(
        _0x31cd96.url,
        "http://" + _0x31cd96.headers.host
      );
      const _0x441f0d = _0x6d8aab.searchParams.get("code");
      if (!_0x441f0d) {
        _0x424d0e.writeHead(0x190, {
          "Content-Type": "text/plain",
        });
        _0x424d0e.end("No code provided!");
      } else {
        const _0x869943 = path.join(
          __dirname,
          "../authentication/finished.html"
        );
        fs.readFile(_0x869943, "utf8", (_0x485e2a, _0x556b27) => {
          if (_0x485e2a) {
            console.error("Error reading HTML file:", _0x485e2a.message);
            _0x424d0e.writeHead(0x1f4, {
              "Content-Type": "text/plain",
            });
            _0x424d0e.end(
              "Internal Server Error: Could not load the HTML file"
            );
            return;
          }
          _0x424d0e.writeHead(0xc8, {
            "Content-Type": "text/html",
          });
          _0x424d0e.end(_0x556b27);
        });
        handleDiscordCallback(_0x441f0d);
      }
    } else {
      _0x424d0e.writeHead(0x194, {
        "Content-Type": "text/plain",
      });
      _0x424d0e.end("Not Found");
    }
  });
  _0x2e56e1.listen(0x1a85, () => {
    console.log("Listening on port 6789");
  });
};
startListener();
const { shell } = require("electron");
let authWindow = null;
document.getElementById("authBtn").addEventListener("click", (_0x36acb6) => {
  _0x36acb6.preventDefault();
  const _0x1109a4 = document.getElementById("authBtn");
  _0x1109a4.innerText = "Starting Auth Window...";
  shell.openExternal(
    "https://discord.com/oauth2/authorize?client_id=1264925854908285069&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A6789%2Freceived&scope=guilds+identify"
  );
  _0x1109a4.innerText = "Waiting for response...";
  const _0x17456b = setInterval(() => {
    if (authWindow && authWindow.closed) {
      authWindow = null;
      _0x1109a4.innerText = "Authenticate with Discord";
      clearInterval(_0x17456b);
      console.log("Authentication window was closed by the user.");
    }
  }, 0x3e8);
  window.addEventListener("message", async (_0x5962dd) => {
    if (_0x5962dd.origin !== "http://127.0.0.1:6789") {
      return;
    }
    const { code: _0x51b316 } = _0x5962dd.data;
    if (_0x51b316) {
      clearInterval(_0x17456b);
      _0x1109a4.innerText = "Processing response...";
      await handleDiscordCallback(_0x51b316);
    }
  });
});
const initializeLauncherData = () => {
  fs.access(launcherDataPath, fs.constants.F_OK, (_0x36989e) => {
    if (_0x36989e) {
      const _0x5e101d = {
        launchertoken: "",
      };
      fs.mkdir(
        path.dirname(launcherDataPath),
        {
          recursive: true,
        },
        (_0x3671db) => {
          if (_0x3671db) {
            console.error("Error creating directory:", _0x3671db);
            return;
          }
          fs.writeFile(
            launcherDataPath,
            JSON.stringify(_0x5e101d),
            (_0x21be81) => {
              if (_0x21be81) {
                console.error("Error writing file:", _0x21be81);
              } else {
                console.log("launcherdata.json created with default values.");
              }
            }
          );
        }
      );
    } else {
      fs.readFile(launcherDataPath, "utf8", (_0x46d88a, _0xe56d94) => {
        if (_0x46d88a) {
          console.error("Error reading launcherdata.json:", _0x46d88a);
          return;
        }
        if (
          !_0xe56d94 ||
          _0xe56d94 == undefined ||
          _0xe56d94 == null ||
          _0xe56d94 == ""
        ) {
          const _0x3efb53 = {
            launchertoken: "",
          };
          fs.writeFile(
            launcherDataPath,
            JSON.stringify(_0x3efb53),
            (_0x44edd6) => {
              if (_0x44edd6) {
                console.error("Error updating launcherdata.json:", _0x44edd6);
              } else {
                console.log("Launcher token updated successfully.");
              }
            }
          );
          setLauncherToken("");
          return;
        }
        const _0x60d818 = JSON.parse(_0xe56d94);
        LauncherToken = _0x60d818.launchertoken;
        console.log("Launcher Token:", _0x60d818.launchertoken);
        if (!globals.ForceRequireManualLogin) {
          AttempTokenSignin();
        }
      });
    }
  });
};
const setLauncherToken = (_0x44b10d) => {
  fs.readFile(launcherDataPath, "utf8", (_0x4a7bfb, _0x545b91) => {
    if (_0x4a7bfb) {
      console.error("Error reading launcherdata.json:", _0x4a7bfb);
      return;
    }
    let _0x30cbf1 = {};
    if (
      _0x545b91 &&
      _0x545b91 !== "undefined" &&
      _0x545b91 !== "null" &&
      _0x545b91 !== ""
    ) {
      try {
        _0x30cbf1 = JSON.parse(_0x545b91);
      } catch (_0x3cc747) {
        console.error("Error parsing launcherdata.json:", _0x3cc747);
      }
    }
    if (_0x44b10d === null || _0x44b10d === "") {
      _0x30cbf1 = {
        launchertoken: "",
      };
    } else {
      _0x30cbf1.launchertoken = _0x44b10d;
    }
    LauncherToken = _0x44b10d;
    ipcRenderer.invoke("token_upload", _0x44b10d);
    fs.writeFile(launcherDataPath, JSON.stringify(_0x30cbf1), (_0x51d8ce) => {
      if (_0x51d8ce) {
        console.error("Error updating launcherdata.json:", _0x51d8ce);
      } else {
        console.log("Launcher token updated successfully.");
      }
    });
  });
};
const handleDiscordCallback = async (_0x3eef18) => {
  const _0x59de1a = new XMLHttpRequest();
  const _0xa75679 =
    "https://services.rewindmp.xyz/oauth/discordcallback/" + _0x3eef18;
  console.log("Handling Discord callback with code:", _0x3eef18);
  if (authWindow) {
    authWindow.close();
    console.log("Auth window closed");
  }
  document.getElementById("authBtn").innerText = "Authenticating...";
  _0x59de1a.open("GET", _0xa75679, true);
  _0x59de1a.onload = async function () {
    console.log("HTTP Request Loaded", _0x59de1a.status);
    if (_0x59de1a.status >= 0xc8 && _0x59de1a.status < 0x12c) {
      const _0x5d3da1 = _0x59de1a.responseText;
      console.log("Response Content:", _0x5d3da1);
      try {
        if (_0x5d3da1.includes("AUTH_ERROR")) {
          document.getElementById("authBtn").innerText = "Login Failed";
          ipcRenderer.send("load-error-page");
          showMessageBox("Authentication error: " + _0x5d3da1);
          return;
        }
        const _0x1c755f = JSON.parse(_0x5d3da1);
        if (!_0x1c755f) {
          document.getElementById("authBtn").innerText = "Login Failed";
          ipcRenderer.send("load-error-page");
          showMessageBox("Invalid response: No user data");
          return;
        }
        if (_0x1c755f.Banned) {
          document.getElementById("authBtn").innerText = "Account Banned";
          window.location.href = "../pages/banned.html";
          return;
        }
        try {
          const _0x489487 = await fetch(
            "https://services.rewindmp.xyz/api/v1/ban/" + _0x1c755f.Username
          );
          const _0x3cf6b9 = await _0x489487.text();
          if (_0x3cf6b9 === "true") {
            document.getElementById("authBtn").innerText = "Account Banned";
            setLauncherToken("");
            window.location.href = "../pages/banned.html";
            return;
          }
        } catch (_0x2c1ed2) {
          console.error("Error checking ban status:", _0x2c1ed2);
          showMessageBox("Error checking ban status: " + _0x2c1ed2.message);
        }
        const _0x5228df = {
          type: "login",
          email: _0x1c755f.Email || "",
          username: _0x1c755f.Username || "",
          skin: _0x1c755f.CurrentSkin || "",
          hashedpassword: _0x1c755f.Password || "",
          accountId: _0x1c755f.AccountId || "",
          avatarUrl: _0x1c755f.avatarUrl || "",
        };
        LauncherToken = _0x1c755f.SignedToken;
        setLauncherToken(_0x1c755f.SignedToken);
        document.getElementById("authBtn").innerText = "Validating Login...";
        ipcRenderer
          .invoke("userdata_upload", _0x5228df)
          .then(() => {
            ipcRenderer.send("validateHwid", {
              userData: _0x5228df,
            });
            ipcRenderer.once("hwid-validated", (_0x385461, _0x595a77) => {
              if (_0x595a77) {
                document.getElementById("authBtn").innerText =
                  "Login Successful";
                cont();
              } else {
                document.getElementById("authBtn").innerText = "Login Failed";
                ipcRenderer.send("load-error-page");
                setLauncherToken("");
              }
            });
          })
          ["catch"]((_0xa94712) => {
            console.error("Failed to upload user data:", _0xa94712);
            showMessageBox("Failed to upload user data: " + _0xa94712.message);
            document.getElementById("authBtn").innerText = "Login Failed";
            ipcRenderer.send("load-error-page");
            setLauncherToken("");
          });
      } catch (_0x540dd3) {
        console.error("Error parsing response:", _0x540dd3);
        showMessageBox("Error parsing response: " + _0x540dd3.message);
        document.getElementById("authBtn").innerText = "Login Failed";
        ipcRenderer.send("load-error-page");
      }
    } else {
      console.error("Failed to get response:", _0x59de1a.responseText);
      showMessageBox("HTTP Request Failed: " + _0x59de1a.responseText);
      document.getElementById("authBtn").innerText = "Login Failed";
      ipcRenderer.send("load-error-page");
    }
  };
  _0x59de1a.onerror = function () {
    console.error("Request error");
    showMessageBox("Request error occurred.");
    document.getElementById("authBtn").innerText = "Login Failed";
    ipcRenderer.send("load-error-page");
  };
  _0x59de1a.send();
};
function showMessageBox(_0x4e5f46) {
  const { dialog: _0x4d5bd1 } = require("electron").remote;
  _0x4d5bd1.showMessageBoxSync({
    type: "error",
    title: "Error",
    message: _0x4e5f46,
  });
}
const cont = () => {
  ipcRenderer.send("load-trailer");
};
