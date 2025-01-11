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
async function loadProfileImage(_0x30ed80) {
  try {
    const _0x360be4 = document.getElementById("ProfileImg");
    _0x360be4.src = _0x30ed80;
    document.getElementById("username").innerText = userData.username;
  } catch (_0x4e97fd) {
    console.error("Error fetching JSON data:", _0x4e97fd);
  }
}
async function InitiateCoreService() {
  try {
    const _0x204722 = await RewindAPI.bisFortniteOnline(userData.username);
    checkingserverState = false;
    const _0x50e936 = document.getElementById("fn-status");
    if (_0x204722 === "Fortnite is UP!") {
      _0x50e936.innerText = "Launch";
      bFortniteOnline = true;
      checkingserverState = false;
    } else {
      _0x50e936.innerText = "Servers Offline!";
      checkingserverState = false;
    }
  } catch (_0x3b1088) {
    console.error("Error checking Fortnite status:", _0x3b1088);
    document.getElementById("fn-status").innerText = _0x3b1088;
  }
}
ipcRenderer.invoke("userdata_get").then((_0x4e952b) => {
  userData = _0x4e952b;
  loadProfileImage(_0x4e952b.avatarUrl);
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
  const _0x4364d0 = document.querySelectorAll(".menu-item button");
  _0x4364d0.forEach((_0x57e31b) => {
    _0x57e31b.addEventListener("click", function () {
      const _0x229d01 = _0x57e31b.querySelector("span").textContent;
      console.log("Button clicked: " + _0x229d01);
      ipcRenderer.send(_0x229d01);
    });
  });
});
document.getElementById("launch-fn").addEventListener("click", async () => {
  if (!bFortniteOnline || checkingserverState) {
    return;
  }
  const _0x170b7c = document.getElementById("fn-status");
  _0x170b7c.innerText = "Waiting for core services..";
  await setTimeout(0x1f4);
  ipcRenderer.send("launch-fn");
});
ipcRenderer.on("fn-status-update", (_0x34559d, _0x138481) => {
  const _0x434e45 = document.getElementById("fn-status");
  _0x434e45.innerText = _0x138481;
});
document.getElementById("profile-button").addEventListener("click", () => {
  ipcRenderer.send("Profile");
});
