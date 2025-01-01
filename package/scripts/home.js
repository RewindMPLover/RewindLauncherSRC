/* 
 - Deobfuscated with <3
 - Rewind Launcher v2.1.1
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
async function loadProfileImage(_0x23b213) {
  try {
    const _0x216f1a = document.getElementById("ProfileImg");
    _0x216f1a.src = _0x23b213;
    document.getElementById("username").innerText = userData.username;
  } catch (_0x5348d7) {
    console.error("Error fetching JSON data:", _0x5348d7);
  }
}
async function InitiateCoreService() {
  try {
    const _0x444699 = await RewindAPI.bisFortniteOnline(userData.username);
    checkingserverState = false;
    const _0x54c15c = document.getElementById("fn-status");
    if (_0x444699 === "Fortnite is UP!") {
      _0x54c15c.innerText = "Launch";
      bFortniteOnline = true;
      checkingserverState = false;
    } else {
      _0x54c15c.innerText = "Servers Offline!";
      checkingserverState = false;
    }
  } catch (_0x345941) {
    console.error("Error checking Fortnite status:", _0x345941);
    document.getElementById("fn-status").innerText = _0x345941;
  }
}
ipcRenderer.invoke("userdata_get").then((_0x25818d) => {
  userData = _0x25818d;
  loadProfileImage(_0x25818d.avatarUrl);
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
  const _0x146d6f = document.querySelectorAll(".menu-item button");
  _0x146d6f.forEach((_0x11f576) => {
    _0x11f576.addEventListener("click", function () {
      const _0x4b2cc0 = _0x11f576.querySelector("span").textContent;
      console.log("Button clicked: " + _0x4b2cc0);
      ipcRenderer.send(_0x4b2cc0);
    });
  });
});
document.getElementById("launch-fn").addEventListener("click", async () => {
  if (!bFortniteOnline || checkingserverState) {
    return;
  }
  const _0x347217 = document.getElementById("fn-status");
  _0x347217.innerText = "Waiting for core services..";
  await setTimeout(0x1f4);
  ipcRenderer.send("launch-fn");
});
ipcRenderer.on("fn-status-update", (_0x5ccfc8, _0x3458a9) => {
  const _0x1525fc = document.getElementById("fn-status");
  _0x1525fc.innerText = _0x3458a9;
});
document.getElementById("profile-button").addEventListener("click", () => {
  ipcRenderer.send("Profile");
});