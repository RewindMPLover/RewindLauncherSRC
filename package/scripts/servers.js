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
async function loadProfileImage(_0x4eed30) {
  try {
    const _0x59a1b4 = document.getElementById("ProfileImg");
    _0x59a1b4.src = _0x4eed30;
    document.getElementById("username").innerText = userData.username;
  } catch (_0x1996b9) {
    console.error("Error fetching JSON data:", _0x1996b9);
  }
}
async function InitiateCoreService() {
  try {
    const _0x475704 = await RewindAPI.bisFortniteOnline(userData.username);
    checkingserverState = false;
    const _0x1dc625 = document.getElementById("fn-status");
    if (_0x475704 === "Fortnite is UP!") {
      _0x1dc625.innerText = "Launch";
      bFortniteOnline = true;
      checkingserverState = false;
    } else {
      _0x1dc625.innerText = "Servers Offline!";
      checkingserverState = false;
    }
  } catch (_0x295c22) {
    console.error("Error checking Fortnite status:", _0x295c22);
    document.getElementById("fn-status").innerText = _0x295c22;
  }
}
ipcRenderer.invoke("userdata_get").then((_0x35bdf8) => {
  userData = _0x35bdf8;
  loadProfileImage(_0x35bdf8.avatarUrl);
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
  const _0x5df3f2 = document.querySelectorAll(".menu-item button");
  _0x5df3f2.forEach((_0x1d9693) => {
    _0x1d9693.addEventListener("click", function () {
      const _0x1de04f = _0x1d9693.querySelector("span").textContent;
      console.log("Button clicked: " + _0x1de04f);
      ipcRenderer.send(_0x1de04f);
    });
  });
});
document.getElementById("launch-fn").addEventListener("click", async () => {
  if (!bFortniteOnline || checkingserverState) {
    return;
  }
  const _0x2bee7b = document.getElementById("fn-status");
  _0x2bee7b.innerText = "Waiting for core services..";
  await setTimeout(0x1f4);
  ipcRenderer.send("launch-fn");
});
ipcRenderer.on("fn-status-update", (_0x9e88d5, _0x37ea3d) => {
  const _0x56994 = document.getElementById("fn-status");
  _0x56994.innerText = _0x37ea3d;
});
document.getElementById("profile-button").addEventListener("click", () => {
  ipcRenderer.send("Profile");
});
