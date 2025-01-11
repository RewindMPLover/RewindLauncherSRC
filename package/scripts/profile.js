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
    const _0x40b9df = globals.profileUrl + userData.skin + "/icon.png";
    const _0x4c2faa = document.getElementById("ProfileImg");
    _0x4c2faa.src = userData.avatarUrl;
    document.getElementById("storefront-image").src = _0x40b9df;
    document.getElementById("username").innerText = userData.username;
    document.getElementById("profile-title").innerText =
      "Hi " + userData.username + ", What would you like to change?";
    document.getElementById("profile-description").innerText =
      "Below are all the options, Enjoy!";
  } catch (_0x376e53) {
    console.error("Error fetching JSON data:", _0x376e53);
  }
}
async function InitiateCoreService() {
  try {
    const _0x540d85 = await RewindAPI.bisFortniteOnline(userData.username);
    checkingserverState = false;
    const _0x328903 = document.getElementById("fn-status");
    if (_0x540d85 === "Fortnite is UP!") {
      _0x328903.innerText = "Launch";
      bFortniteOnline = true;
      checkingserverState = false;
    } else {
      _0x328903.innerText = "Servers Offline!";
      checkingserverState = false;
    }
  } catch (_0x2f9c1a) {
    console.error("Error checking Fortnite status:", _0x2f9c1a);
    document.getElementById("fn-status").innerText = _0x2f9c1a;
  }
}
ipcRenderer.invoke("userdata_get").then((_0x1868ec) => {
  userData = _0x1868ec;
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
  const _0x66dc74 = document.querySelectorAll(".menu-item button");
  _0x66dc74.forEach((_0x38e63f) => {
    _0x38e63f.addEventListener("click", function () {
      const _0x246b8a = _0x38e63f.querySelector("span").textContent;
      console.log("Button clicked: " + _0x246b8a);
      ipcRenderer.send(_0x246b8a);
    });
  });
});
document.getElementById("launch-fn").addEventListener("click", async () => {
  if (!bFortniteOnline || checkingserverState) {
    return;
  }
  const _0x559da4 = document.getElementById("fn-status");
  _0x559da4.innerText = "Waiting for core services..";
  await setTimeout(0x1f4);
  ipcRenderer.send("launch-fn");
});
ipcRenderer.on("fn-status-update", (_0x50e611, _0xa2bc9e) => {
  const _0x5ac1b3 = document.getElementById("fn-status");
  _0x5ac1b3.innerText = _0xa2bc9e;
});
document.getElementById("profile-button").addEventListener("click", () => {
  ipcRenderer.send("Profile");
});
async function loadprofileHudImg(_0x3115b7) {
  try {
    const _0xa92855 = document.getElementById("storefront-image");
    if (busefn) {
      const _0x59ddf2 = globals.profileUrl + userData.skin + "/icon.png";
      _0xa92855.src = _0x59ddf2;
    } else {
      _0xa92855.src = _0x3115b7;
    }
    document.getElementById("username").innerText = userData.username;
  } catch (_0x20082f) {
    console.error("Error fetching JSON data:", _0x20082f);
  }
}
loadprofileHudImg(null);
document
  .getElementById("change-build-btn")
  .addEventListener("click", async () => {
    ipcRenderer.send("update-fn-path");
  });
