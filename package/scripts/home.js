/* 
 - Deobfuscated with <3
 - Rewind Launcher v3.0.5
*/

const { ipcRenderer } = require("electron");
const globals = require("../globals/globals.js");
const RewindAPI = require("../globals/rewindApi.js");
const { setTimeout } = require("timers/promises");
document.getElementById("app-title").innerText =
  "Rewind (" + globals.CurrentVer + ")";
let bFortniteOnline = false;
let checkingserverState = true;
let userData;
async function loadProfileImage(_0x14a8c6) {
  try {
    const _0x49a03e = document.getElementById("ProfileImg");
    _0x49a03e.src = _0x14a8c6;
    document.getElementById("username").innerText = userData.username;
  } catch (_0x300f5a) {
    console.error("Error fetching JSON data:", _0x300f5a);
  }
}
async function InitiateCoreService() {
  try {
    const _0x493fe6 = await RewindAPI.bisFortniteOnline(userData.username);
    checkingserverState = false;
    const _0x187b81 = document.getElementById("fn-status");
    if (_0x493fe6 === "Fortnite is UP!") {
      _0x187b81.innerText = "Launch";
      bFortniteOnline = true;
      checkingserverState = false;
    } else {
      _0x187b81.innerText = "Servers Offline!";
      checkingserverState = false;
    }
  } catch (_0x4c8205) {
    console.error("Error checking Fortnite status:", _0x4c8205);
    document.getElementById("fn-status").innerText = _0x4c8205;
  }
}
ipcRenderer.invoke("userdata_get").then((_0x34c35d) => {
  userData = _0x34c35d;
  loadProfileImage(_0x34c35d.avatarUrl);
  InitiateCoreService();
});
document.getElementById("app-title").innerText =
  "Rewind (" + globals.CurrentVer + ")";
document.getElementById("minimize").addEventListener("click", () => {
  ipcRenderer.send("minimize");
});
document.getElementById("close").addEventListener("click", () => {
  ipcRenderer.send("close");
});
document.getElementById("minimize").addEventListener("click", () => {
  ipcRenderer.send("minimize");
});
document.addEventListener("DOMContentLoaded", function () {
  const _0x4130a4 = document.querySelectorAll(".menu-item button");
  _0x4130a4.forEach((_0x499781) => {
    _0x499781.addEventListener("click", function () {
      const _0x3248df = _0x499781.querySelector("span").textContent;
      console.log("Button clicked: " + _0x3248df);
      ipcRenderer.send(_0x3248df);
    });
  });
});
document.getElementById("launch-fn").addEventListener("click", async () => {
  if (!bFortniteOnline || checkingserverState) {
    return;
  }
  const _0x2a1ca4 = document.getElementById("fn-status");
  _0x2a1ca4.innerText = "Waiting for core services..";
  await setTimeout(0x1f4);
  ipcRenderer.send("launch-fn");
});
ipcRenderer.on("fn-status-update", (_0x15d138, _0x3e816e) => {
  const _0x53edd3 = document.getElementById("fn-status");
  _0x53edd3.innerText = _0x3e816e;
});
document.getElementById("profile-button").addEventListener("click", () => {
  ipcRenderer.send("Profile");
});
