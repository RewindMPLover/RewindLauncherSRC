/* 
 - Deobfuscated with <3
 - Rewind Launcher v2.1.1
*/

const path = require("path");
const fs = require("fs");
const http = require("http");
const fsPromises = require("fs").promises;
const globals = require("./globals.js");
const fetch = require("node-fetch");
const { execFile } = require("child_process");
const { setTimeout } = require("timers/promises");
const processs = require("child_process");
let gamePath = "";
let gameExecutable = null;
async function checkForFolder(_0x3bb77b, _0x573f5c) {
  const _0x1295aa = path.join(_0x3bb77b, _0x573f5c);
  const _0x37b302 = await fs.promises
    .access(_0x1295aa)
    .then(() => true)
    ["catch"](() => false);
  return _0x37b302;
}
async function install_injectsys() {
  const _0x1dee49 = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "Injector.exe"
  );
  const _0x8f7a75 = await fetch("https://services.rewindmp.xyz/files/Dll.exe");
  if (!_0x8f7a75.ok) {
    throw new Error("Failed to download file");
  }
  const _0x5e14f9 = fs.createWriteStream(_0x1dee49);
  _0x8f7a75.body.pipe(_0x5e14f9);
  await new Promise((_0x5cf3ed, _0x3a807f) => {
    _0x5e14f9.on("finish", _0x5cf3ed);
    _0x5e14f9.on("error", _0x3a807f);
  });
  console.log("Extraction completed successfully to:", _0x1dee49);
  return _0x1dee49;
}
async function install_memoryfix() {
  const _0x4992ee = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "memory.dll"
  );
  const _0x2efc4a = await fetch(
    "https://services.rewindmp.xyz/files/memory.dll"
  );
  if (!_0x2efc4a.ok) {
    throw new Error("Failed to download file");
  }
  const _0x43dbc7 = fs.createWriteStream(_0x4992ee);
  _0x2efc4a.body.pipe(_0x43dbc7);
  await new Promise((_0x1c6c43, _0x4522d2) => {
    _0x43dbc7.on("finish", _0x1c6c43);
    _0x43dbc7.on("error", _0x4522d2);
  });
  console.log("Extraction completed successfully to:", _0x4992ee);
  return _0x4992ee;
}
async function install_consoledll() {
  const _0x5aff15 = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "Console.dll"
  );
  const _0x44038d = await fetch(
    "https://services.rewindmp.xyz/files/console.dll"
  );
  if (!_0x44038d.ok) {
    throw new Error("Failed to download file");
  }
  const _0x29b61d = fs.createWriteStream(_0x5aff15);
  _0x44038d.body.pipe(_0x29b61d);
  await new Promise((_0x316f35, _0x47b00e) => {
    _0x29b61d.on("finish", _0x316f35);
    _0x29b61d.on("error", _0x47b00e);
  });
  console.log("Extraction completed successfully to:", _0x5aff15);
  return _0x5aff15;
}
let bstartAc = false;
const startAC_HTTP = () => {
  const _0x4edf = http.createServer((_0x557db5, _0x3cb908) => {
    console.log("Request URL: " + _0x557db5.url);
    if (_0x557db5.url.startsWith("/bAc")) {
      _0x3cb908.writeHead(0x194, {
        "Content-Type": "text/plain",
      });
      if (!bstartAc) {
        return _0x3cb908.end("No_Ac");
      }
      _0x3cb908.end("Active");
    } else {
      _0x3cb908.writeHead(0x194, {
        "Content-Type": "text/plain",
      });
      _0x3cb908.end("Not Found");
    }
  });
  _0x4edf.listen(0x1618, () => {
    console.log("Listening on port 5656");
  });
};
async function install_redirect() {
  const _0x106607 = path.join(
    gamePath,
    "Engine",
    "Binaries",
    "ThirdParty",
    "NVIDIA",
    "NVaftermath",
    "Win64",
    "GFSDK_Aftermath_Lib.x64.dll"
  );
  const _0x47f57a = await fetch(
    "https://services.rewindmp.xyz/files/redirect.dll"
  );
  if (!_0x47f57a.ok) {
    throw new Error("Failed to download file");
  }
  const _0xfb8025 = fs.createWriteStream(_0x106607);
  _0x47f57a.body.pipe(_0xfb8025);
  await new Promise((_0x285052, _0x185110) => {
    _0xfb8025.on("finish", _0x285052);
    _0xfb8025.on("error", _0x185110);
  });
  console.log("Extraction completed successfully to:", _0x106607);
  return _0x106607;
}
async function install_freezehandler() {
  const _0xdac57e = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "Freeze.exe"
  );
  const _0x466fbb = await fetch(
    "https://services.rewindmp.xyz/files/Freeze.exe"
  );
  if (!_0x466fbb.ok) {
    throw new Error("Failed to download file");
  }
  const _0x472175 = fs.createWriteStream(_0xdac57e);
  _0x466fbb.body.pipe(_0x472175);
  await new Promise((_0x2a45a8, _0x5e0fbe) => {
    _0x472175.on("finish", _0x2a45a8);
    _0x472175.on("error", _0x5e0fbe);
  });
  console.log("Extraction completed successfully to:", _0xdac57e);
  return _0xdac57e;
}
async function InstallRequiredFiles(_0x1273f0) {
  _0x1273f0.UpdateFN_State("Installing Redirect...");
  const _0x231244 = await install_redirect();
  _0x1273f0.UpdateFN_State("Installing Other Required Files...");
  const _0x52da47 = await install_freezehandler();
  return {
    dllpath: _0x231244,
    freezerpath: _0x52da47,
  };
}
async function Launch(_0x53d4f6, _0x2debdc) {
  try {
    const _0x5b9b75 = path.join(
      process.env.APPDATA,
      "rewind-launcher",
      "gamedata.json"
    );
    if (fs.existsSync(_0x5b9b75)) {
      const _0x52506a = fs.readFileSync(_0x5b9b75, "utf8");
      const _0x493c3a = JSON.parse(_0x52506a);
      if (_0x493c3a.gamepath && fs.existsSync(_0x493c3a.gamepath)) {
        gamePath = _0x493c3a.gamepath;
      } else {
        _0x53d4f6.UpdateFN_State("Waiting for path input...");
        const _0x57a1b8 = await _0x53d4f6.selectFolder();
        const _0x1b1b98 = await checkForFolder(_0x57a1b8, "FortniteGame");
        const _0x3ecf54 = await checkForFolder(_0x57a1b8, "Engine");
        if (_0x1b1b98 && _0x3ecf54) {
          gamePath = _0x57a1b8;
          fs.writeFileSync(
            _0x5b9b75,
            JSON.stringify(
              {
                gamepath: gamePath,
              },
              null,
              0x4
            ),
            "utf8"
          );
        } else {
          _0x53d4f6.UpdateFN_State("Launch");
          _0x53d4f6.MessagePopup(
            "Path is missing folders. Make sure the path contains FortniteGame & Engine."
          );
          return;
        }
      }
    } else {
      _0x53d4f6.UpdateFN_State("Waiting for path input...");
      const _0x50b436 = await _0x53d4f6.selectFolder();
      const _0x54406f = await checkForFolder(_0x50b436, "FortniteGame");
      const _0x51322f = await checkForFolder(_0x50b436, "Engine");
      if (_0x54406f && _0x51322f) {
        gamePath = _0x50b436;
        const _0x392191 = path.dirname(_0x5b9b75);
        if (!fs.existsSync(_0x392191)) {
          fs.mkdirSync(_0x392191, {
            recursive: true,
          });
        }
        fs.writeFileSync(
          _0x5b9b75,
          JSON.stringify(
            {
              gamepath: gamePath,
            },
            null,
            0x4
          ),
          "utf8"
        );
      } else {
        _0x53d4f6.UpdateFN_State("Launch");
        _0x53d4f6.MessagePopup(
          "Path is missing folders. Make sure the path contains FortniteGame & Engine."
        );
        return;
      }
    }
  } catch (_0x480278) {
    _0x53d4f6.MessagePopup(_0x480278.message);
  }
  _0x53d4f6.UpdateFN_State("Checking For Updates...");
  await setTimeout(0x3e8);
  const { dllpath: _0x27ff12, freezerpath: _0x30831e } =
    await InstallRequiredFiles(_0x53d4f6);
  startAC_HTTP();
  _0x53d4f6.UpdateFN_State("Launching...");
  const _0x2d9dd9 = [
    "-AUTH_TYPE=epic",
    "-AUTH_LOGIN=" + _0x2debdc.email,
    "-AUTH_PASSWORD=" + _0x2debdc.hashedpassword,
    "-epicapp=Fortnite",
    "-epicenv=Prod",
    "-epicportal",
    "-skippatchcheck",
    "-nobe",
    "-fromfl=eac",
    "-fltoken=3db3ba5dcbd2e16703f3978d",
    "-caldera=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiYmU5ZGE1YzJmYmVhNDQwN2IyZjQwZWJhYWQ4NTlhZDQiLCJnZW5lcmF0ZWQiOjE2Mzg3MTcyNzgsImNhbGRlcmFHdWlkIjoiMzgxMGI4NjMtMmE2NS00NDU3LTliNTgtNGRhYjNiNDgyYTg2IiwiYWNQcm92aWRlciI6IkVhc3lBbnRpQ2hlYXQiLCJub3RlcyI6IiIsImZhbGxiYWNrIjpmYWxzZX0.VAWQB67RTxhiWOxx7DBjnzDnXyyEnX7OljJm-j2d88G_WgwQ9wrE6lwMEHZHjBd1ISJdUO1UVUqkfLdU5nofBQ",
  ];
  const _0x131ebc = [
    "-AUTH_TYPE=epic",
    "-AUTH_LOGIN=" + _0x2debdc.email,
    "-AUTH_PASSWORD=" + _0x2debdc.hashedpassword,
    "-epicapp=Fortnite",
    "-epicenv=Prod",
    "-epicportal",
    "-skippatchcheck",
    "-nobe",
    "-fromfl=eac",
    "-fltoken=3db3ba5dcbd2e16703f3978d",
  ];
  const _0x32fef6 =
    gamePath +
    "\\FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping.exe";
  const _0x50ed3e = gamePath + "\\FortniteGame\\Binaries\\Win64";
  const _0xc53c59 =
    gamePath + "\\FortniteGame\\Binaries\\Win64\\FortniteLauncher.exe";
  const _0x46d590 =
    gamePath +
    "\\FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping_EAC.exe";
  const _0xe55cf7 = gamePath + "\\FortniteGame\\Content\\Paks";
  async function _0x57cd01() {
    try {
      const _0x198a5e = await fsPromises.readdir(_0xe55cf7);
      const _0x5c666e = _0x198a5e.filter((_0xda7faa) =>
        _0xda7faa.endsWith(".pak")
      );
      _0x5c666e.forEach((_0x2ee16f) => {
        if (!globals.originalPaks.includes(_0x2ee16f)) {
          console.log(_0x2ee16f);
        }
      });
      console.log("Returning true");
      return true;
    } catch (_0x3fd5d5) {
      console.error("Error reading the directory:", _0x3fd5d5);
      return false;
    }
  }
  const _0x1bcb86 = await _0x57cd01();
  console.log(_0x1bcb86);
  if (!_0x1bcb86) {
    _0x53d4f6.UpdateFN_State("Launch");
    return _0x53d4f6.MessagePopup(
      "Unverified files detected, please reinstall your game."
    );
  }
  try {
    const _0x3333fc = processs.spawn(_0xc53c59, _0x131ebc, {
      cwd: _0x50ed3e,
    });
    if (_0x3333fc) {
      console.log("Launcher client PID: " + _0x3333fc.pid);
      await execFile(
        _0x30831e,
        [String(_0x3333fc.pid)],
        (_0x14cf73, _0x5ed73c, _0x412062) => {
          if (_0x14cf73) {
            _0x53d4f6.MessagePopup("Error occured when starting launcher");
            console.error("Error: " + _0x14cf73.message);
            return;
          }
          if (_0x412062) {
            console.error("stderr: " + _0x412062);
          }
        }
      );
    } else {
      _0x53d4f6.MessagePopup("Failed to find Launcher executable");
    }
    const _0x29b590 = processs.spawn(_0x46d590, _0x131ebc, {
      cwd: _0x50ed3e,
    });
    if (_0x29b590) {
      console.log("Launcher client PID: " + _0x29b590.pid);
      await execFile(
        _0x30831e,
        [String(_0x29b590.pid)],
        (_0x18fd4c, _0x1a92bc, _0x39c558) => {
          if (_0x18fd4c) {
            console.error("Error: " + _0x18fd4c.message);
            return;
          }
          if (_0x39c558) {
            console.error("stderr: " + _0x39c558);
          }
        }
      );
    } else {
      _0x53d4f6.MessagePopup("Failed to find eac executable");
    }
    const _0x4d8a2e = processs.spawn(_0x32fef6, _0x2d9dd9, {
      cwd: _0x50ed3e,
    });
    gameExecutable = _0x4d8a2e;
    _0x4d8a2e.stdout.on("data", (_0x28e10b) => {
      const _0x4fd2b3 = _0x28e10b.toString();
      _0x53d4f6.log(_0x4fd2b3);
      if (_0x4fd2b3.includes("region ") && true) {
        _0x53d4f6.UpdateFN_State("Launched");
      }
      if (_0x4fd2b3.includes("AthenaLobby") && true) {
        bstartAc = true;
      }
    });
  } catch (_0x3fc30e) {
    _0x53d4f6.UpdateFN_State("Launch");
    _0x53d4f6.MessagePopup(
      "An Error happened while attempting to launch fortnite: " + _0x3fc30e
    );
  }
}
module.exports = {
  Launch: Launch,
};
