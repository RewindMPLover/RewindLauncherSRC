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
async function loadProfileImage() {
  try {
    const _0x42ddfa = globals.profileUrl + userData.skin + "/icon.png";
    const _0x294831 = document.getElementById("ProfileImg");
    _0x294831.src = _0x42ddfa;
    document.getElementById("username").innerText = userData.username;
  } catch (_0x27502f) {
    console.error("Error fetching JSON data:", _0x27502f);
  }
}
async function InitiateCoreService() {
  try {
    const _0xe95e86 = await RewindAPI.bisFortniteOnline(userData.username);
    checkingserverState = false;
    const _0x47defe = document.getElementById("fn-status");
    if (_0xe95e86 === "Fortnite is UP!") {
      _0x47defe.innerText = "Launch";
      bFortniteOnline = true;
      checkingserverState = false;
    } else {
      _0x47defe.innerText = "Servers Offline!";
      checkingserverState = false;
    }
  } catch (_0x119e64) {
    console.error("Error checking Fortnite status:", _0x119e64);
    document.getElementById("fn-status").innerText = _0x119e64;
  }
}
ipcRenderer.invoke("userdata_get").then((_0x5abfb0) => {
  userData = _0x5abfb0;
  loadProfileImage();
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
  const _0x55fb0b = document.querySelectorAll(".menu-item button");
  _0x55fb0b.forEach((_0x5baf76) => {
    _0x5baf76.addEventListener("click", function () {
      const _0x42c77e = _0x5baf76.querySelector("span").textContent;
      console.log("Button clicked: " + _0x42c77e);
      ipcRenderer.send(_0x42c77e);
    });
  });
});
document.getElementById("launch-fn").addEventListener("click", async () => {
  if (!bFortniteOnline || checkingserverState) {
    return;
  }
  const _0x41aee1 = document.getElementById("fn-status");
  _0x41aee1.innerText = "Waiting for core services..";
  await setTimeout(0x1f4);
  ipcRenderer.send("launch-fn");
});
ipcRenderer.on("fn-status-update", (_0x45b29c, _0x118891) => {
  const _0x201bad = document.getElementById("fn-status");
  _0x201bad.innerText = _0x118891;
});
document.getElementById("profile-button").addEventListener("click", () => {
  ipcRenderer.send("Profile");
});
