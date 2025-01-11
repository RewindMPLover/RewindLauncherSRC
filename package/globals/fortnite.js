/* 
 - Deobfuscated with <3
 - Rewind Launcher v3.0.5
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
async function checkForFolder(_0x7ccbfc, _0x2ae0ad) {
  const _0x408fd1 = path.join(_0x7ccbfc, _0x2ae0ad);
  const _0x4309b1 = await fs.promises
    .access(_0x408fd1)
    .then(() => true)
    ["catch"](() => false);
  return _0x4309b1;
}
async function install_injectsys() {
  const _0x3ca316 = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "Injector.exe"
  );
  const _0x128db5 = await fetch("https://services.rewindmp.xyz/files/Dll.exe");
  if (!_0x128db5.ok) {
    throw new Error("Failed to download file");
  }
  const _0x1fb95e = fs.createWriteStream(_0x3ca316);
  _0x128db5.body.pipe(_0x1fb95e);
  await new Promise((_0x304b56, _0x1ee55e) => {
    _0x1fb95e.on("finish", _0x304b56);
    _0x1fb95e.on("error", _0x1ee55e);
  });
  console.log("Extraction completed successfully to:", _0x3ca316);
  return _0x3ca316;
}
async function install_memoryfix() {
  const _0x1b89f3 = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "memory.dll"
  );
  const _0x50427d = await fetch(
    "https://services.rewindmp.xyz/files/memory.dll"
  );
  if (!_0x50427d.ok) {
    throw new Error("Failed to download file");
  }
  const _0xb5f92e = fs.createWriteStream(_0x1b89f3);
  _0x50427d.body.pipe(_0xb5f92e);
  await new Promise((_0x5eaf06, _0x5251b3) => {
    _0xb5f92e.on("finish", _0x5eaf06);
    _0xb5f92e.on("error", _0x5251b3);
  });
  console.log("Extraction completed successfully to:", _0x1b89f3);
  return _0x1b89f3;
}
async function install_consoledll() {
  const _0x544fb4 = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "Console.dll"
  );
  const _0x3598f7 = await fetch(
    "https://services.rewindmp.xyz/files/console.dll"
  );
  if (!_0x3598f7.ok) {
    throw new Error("Failed to download file");
  }
  const _0x2def3e = fs.createWriteStream(_0x544fb4);
  _0x3598f7.body.pipe(_0x2def3e);
  await new Promise((_0x335eb0, _0x2755a4) => {
    _0x2def3e.on("finish", _0x335eb0);
    _0x2def3e.on("error", _0x2755a4);
  });
  console.log("Extraction completed successfully to:", _0x544fb4);
  return _0x544fb4;
}
let bstartAc = false;
const startAC_HTTP = () => {
  try {
    const _0x37cc9a = http.createServer((_0x3a5a89, _0x42fab8) => {
      console.log("Request URL: " + _0x3a5a89.url);
      if (_0x3a5a89.url.startsWith("/bAc")) {
        _0x42fab8.writeHead(0x194, {
          "Content-Type": "text/plain",
        });
        if (!bstartAc) {
          return _0x42fab8.end("No_Ac");
        }
        _0x42fab8.end("Active");
      } else {
        _0x42fab8.writeHead(0x194, {
          "Content-Type": "text/plain",
        });
        _0x42fab8.end("Not Found");
      }
    });
    _0x37cc9a.listen(0x1618, () => {
      console.log("Listening on port 5656");
    });
  } catch (_0x23c696) {}
};
async function install_redirect() {
  const _0x41095a = path.join(
    gamePath,
    "Engine",
    "Binaries",
    "ThirdParty",
    "NVIDIA",
    "NVaftermath",
    "Win64",
    "GFSDK_Aftermath_Lib.x64.dll"
  );
  const _0x294ae0 = await fetch(
    "https://services.rewindmp.xyz/files/redirect.dll"
  );
  if (!_0x294ae0.ok) {
    throw new Error("Failed to download file");
  }
  const _0x13b9d4 = fs.createWriteStream(_0x41095a);
  _0x294ae0.body.pipe(_0x13b9d4);
  await new Promise((_0x31b99b, _0x519bb5) => {
    _0x13b9d4.on("finish", _0x31b99b);
    _0x13b9d4.on("error", _0x519bb5);
  });
  console.log("Extraction completed successfully to:", _0x41095a);
  return _0x41095a;
}
async function install_freezehandler() {
  const _0x2ac8af = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "Freeze.exe"
  );
  const _0x17c34f = await fetch(
    "https://services.rewindmp.xyz/files/Freeze.exe"
  );
  if (!_0x17c34f.ok) {
    throw new Error("Failed to download file");
  }
  const _0xfb44d6 = fs.createWriteStream(_0x2ac8af);
  _0x17c34f.body.pipe(_0xfb44d6);
  await new Promise((_0x5cef4e, _0x599920) => {
    _0xfb44d6.on("finish", _0x5cef4e);
    _0xfb44d6.on("error", _0x599920);
  });
  console.log("Extraction completed successfully to:", _0x2ac8af);
  return _0x2ac8af;
}
async function InstallRequiredFiles(_0xfece30) {
  _0xfece30.UpdateFN_State("Installing Redirect...");
  const _0x58dbda = await install_redirect();
  _0xfece30.UpdateFN_State("Installing Other Required Files...");
  const _0xbbcc00 = await install_freezehandler();
  return {
    dllpath: _0x58dbda,
    freezerpath: _0xbbcc00,
  };
}
async function Launch(_0x28fa5e, _0x6269b7) {
  try {
    const _0x443f58 = path.join(
      process.env.APPDATA,
      "rewind-launcher",
      "gamedata.json"
    );
    if (fs.existsSync(_0x443f58)) {
      const _0x4bb337 = fs.readFileSync(_0x443f58, "utf8");
      const _0x5442f1 = JSON.parse(_0x4bb337);
      if (_0x5442f1.gamepath && fs.existsSync(_0x5442f1.gamepath)) {
        gamePath = _0x5442f1.gamepath;
      } else {
        _0x28fa5e.UpdateFN_State("Waiting for path input...");
        const _0x598a8a = await _0x28fa5e.selectFolder();
        const _0x29f34f = await checkForFolder(_0x598a8a, "FortniteGame");
        const _0xedb0a9 = await checkForFolder(_0x598a8a, "Engine");
        if (_0x29f34f && _0xedb0a9) {
          gamePath = _0x598a8a;
          fs.writeFileSync(
            _0x443f58,
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
          _0x28fa5e.UpdateFN_State("Launch");
          _0x28fa5e.MessagePopup(
            "Path is missing folders. Make sure the path contains FortniteGame & Engine."
          );
          return;
        }
      }
    } else {
      _0x28fa5e.UpdateFN_State("Waiting for path input...");
      const _0x55d88c = await _0x28fa5e.selectFolder();
      const _0x37c3be = await checkForFolder(_0x55d88c, "FortniteGame");
      const _0x3b508a = await checkForFolder(_0x55d88c, "Engine");
      if (_0x37c3be && _0x3b508a) {
        gamePath = _0x55d88c;
        const _0x6c6eb4 = path.dirname(_0x443f58);
        if (!fs.existsSync(_0x6c6eb4)) {
          fs.mkdirSync(_0x6c6eb4, {
            recursive: true,
          });
        }
        fs.writeFileSync(
          _0x443f58,
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
        _0x28fa5e.UpdateFN_State("Launch");
        _0x28fa5e.MessagePopup(
          "Path is missing folders. Make sure the path contains FortniteGame & Engine."
        );
        return;
      }
    }
  } catch (_0x1a3de9) {
    _0x28fa5e.MessagePopup(_0x1a3de9.message);
  }
  _0x28fa5e.UpdateFN_State("Checking For Updates...");
  await setTimeout(0x3e8);
  const { dllpath: _0x50c9f4, freezerpath: _0x3b05a4 } =
    await InstallRequiredFiles(_0x28fa5e);
  startAC_HTTP();
  _0x28fa5e.UpdateFN_State("Launching...");
  const _0xe60278 = [
    "-AUTH_TYPE=epic",
    "-AUTH_LOGIN=" + _0x6269b7.email,
    "-AUTH_PASSWORD=" + _0x6269b7.hashedpassword,
    "-epicapp=Fortnite",
    "-epicenv=Prod",
    "-epicportal",
    "-skippatchcheck",
    "-nobe",
    "-fromfl=eac",
    "-fltoken=3db3ba5dcbd2e16703f3978d",
    "-caldera=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiYmU5ZGE1YzJmYmVhNDQwN2IyZjQwZWJhYWQ4NTlhZDQiLCJnZW5lcmF0ZWQiOjE2Mzg3MTcyNzgsImNhbGRlcmFHdWlkIjoiMzgxMGI4NjMtMmE2NS00NDU3LTliNTgtNGRhYjNiNDgyYTg2IiwiYWNQcm92aWRlciI6IkVhc3lBbnRpQ2hlYXQiLCJub3RlcyI6IiIsImZhbGxiYWNrIjpmYWxzZX0.VAWQB67RTxhiWOxx7DBjnzDnXyyEnX7OljJm-j2d88G_WgwQ9wrE6lwMEHZHjBd1ISJdUO1UVUqkfLdU5nofBQ",
  ];
  const _0x523916 = [
    "-AUTH_TYPE=epic",
    "-AUTH_LOGIN=" + _0x6269b7.email,
    "-AUTH_PASSWORD=" + _0x6269b7.hashedpassword,
    "-epicapp=Fortnite",
    "-epicenv=Prod",
    "-epicportal",
    "-skippatchcheck",
    "-nobe",
    "-fromfl=eac",
    "-fltoken=3db3ba5dcbd2e16703f3978d",
  ];
  const _0x3d74a7 =
    gamePath +
    "\\FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping.exe";
  const _0x2cc41e = gamePath + "\\FortniteGame\\Binaries\\Win64";
  const _0x53fdf3 =
    gamePath + "\\FortniteGame\\Binaries\\Win64\\FortniteLauncher.exe";
  const _0x3a73ff =
    gamePath +
    "\\FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping_EAC.exe";
  const _0x31fa13 = gamePath + "\\FortniteGame\\Content\\Paks";
  async function _0x14f184() {
    try {
      const _0x71b18a = await fsPromises.readdir(_0x31fa13);
      const _0x40dcd9 = _0x71b18a.filter((_0x237466) =>
        _0x237466.endsWith(".pak")
      );
      _0x40dcd9.forEach((_0x327e95) => {
        if (!globals.originalPaks.includes(_0x327e95)) {
          console.log(_0x327e95);
        }
      });
      console.log("Returning true");
      return true;
    } catch (_0x22d846) {
      console.error("Error reading the directory:", _0x22d846);
      return false;
    }
  }
  const _0x9dacaa = await _0x14f184();
  console.log(_0x9dacaa);
  if (!_0x9dacaa) {
    _0x28fa5e.UpdateFN_State("Launch");
    return _0x28fa5e.MessagePopup(
      "Unverified files detected, please reinstall your game."
    );
  }
  try {
    const _0x734eb8 = processs.spawn(_0x53fdf3, _0x523916, {
      cwd: _0x2cc41e,
    });
    if (_0x734eb8) {
      console.log("Launcher client PID: " + _0x734eb8.pid);
      await execFile(
        _0x3b05a4,
        [String(_0x734eb8.pid)],
        (_0x45017b, _0x188e4e, _0x5cae7e) => {
          if (_0x45017b) {
            _0x28fa5e.MessagePopup("Error occured when starting launcher");
            console.error("Error: " + _0x45017b.message);
            return;
          }
          if (_0x5cae7e) {
            console.error("stderr: " + _0x5cae7e);
          }
        }
      );
    } else {
      _0x28fa5e.MessagePopup("Failed to find Launcher executable");
    }
    const _0x35f1a1 = processs.spawn(_0x3a73ff, _0x523916, {
      cwd: _0x2cc41e,
    });
    if (_0x35f1a1) {
      console.log("Launcher client PID: " + _0x35f1a1.pid);
      await execFile(
        _0x3b05a4,
        [String(_0x35f1a1.pid)],
        (_0xe8a5c7, _0x550d5c, _0x5eef72) => {
          if (_0xe8a5c7) {
            console.error("Error: " + _0xe8a5c7.message);
            return;
          }
          if (_0x5eef72) {
            console.error("stderr: " + _0x5eef72);
          }
        }
      );
    } else {
      _0x28fa5e.MessagePopup("Failed to find eac executable");
    }
    const _0x5ddab3 = processs.spawn(_0x3d74a7, _0xe60278, {
      cwd: _0x2cc41e,
    });
    gameExecutable = _0x5ddab3;
    _0x5ddab3.stdout.on("data", (_0x3b431d) => {
      const _0x26c718 = _0x3b431d.toString();
      _0x28fa5e.log(_0x26c718);
      if (_0x26c718.includes("region ") && true) {
        _0x28fa5e.UpdateFN_State("Launched");
      }
      if (_0x26c718.includes("AthenaLobby") && true) {
        bstartAc = true;
      }
    });
  } catch (_0x5cbfb0) {
    _0x28fa5e.UpdateFN_State("Launch");
    _0x28fa5e.MessagePopup(
      "An Error happened while attempting to launch fortnite: " + _0x5cbfb0
    );
  }
}
module.exports = {
  Launch: Launch,
};
