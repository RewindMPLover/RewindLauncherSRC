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
async function loadProfileImage() {
  try {
    const _0x494f13 = globals.profileUrl + userData.skin + "/icon.png";
    const _0x84e6d = document.getElementById("ProfileImg");
    _0x84e6d.src = _0x494f13;
    document.getElementById("username").innerText = userData.username;
  } catch (_0x1746dc) {
    console.error("Error fetching JSON data:", _0x1746dc);
  }
}
async function InitiateCoreService() {
  try {
    const _0x2e290d = await RewindAPI.bisFortniteOnline(userData.username);
    checkingserverState = false;
    const _0x4b1495 = document.getElementById("fn-status");
    if (_0x2e290d === "Fortnite is UP!") {
      _0x4b1495.innerText = "Launch";
      bFortniteOnline = true;
      checkingserverState = false;
    } else {
      _0x4b1495.innerText = "Servers Offline!";
      checkingserverState = false;
    }
  } catch (_0x25d601) {
    console.error("Error checking Fortnite status:", _0x25d601);
    document.getElementById("fn-status").innerText = _0x25d601;
  }
}
ipcRenderer.invoke("userdata_get").then((_0x79b87e) => {
  userData = _0x79b87e;
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
  const _0x406551 = document.querySelectorAll(".menu-item button");
  _0x406551.forEach((_0x4cbc13) => {
    _0x4cbc13.addEventListener("click", function () {
      const _0x322646 = _0x4cbc13.querySelector("span").textContent;
      console.log("Button clicked: " + _0x322646);
      ipcRenderer.send(_0x322646);
    });
  });
});
document.getElementById("launch-fn").addEventListener("click", async () => {
  if (!bFortniteOnline || checkingserverState) {
    return;
  }
  const _0x5df8ac = document.getElementById("fn-status");
  _0x5df8ac.innerText = "Waiting for core services..";
  await setTimeout(0x1f4);
  ipcRenderer.send("launch-fn");
});
ipcRenderer.on("fn-status-update", (_0x237dba, _0x5ad79a) => {
  const _0x4e175e = document.getElementById("fn-status");
  _0x4e175e.innerText = _0x5ad79a;
});
document.getElementById("profile-button").addEventListener("click", () => {
  ipcRenderer.send("Profile");
});
