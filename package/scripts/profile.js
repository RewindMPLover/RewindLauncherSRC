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
    const _0x3e90d6 = globals.profileUrl + userData.skin + "/icon.png";
    const _0x56bf80 = document.getElementById("ProfileImg");
    _0x56bf80.src = userData.avatarUrl;
    document.getElementById("storefront-image").src = _0x3e90d6;
    document.getElementById("username").innerText = userData.username;
    document.getElementById("profile-title").innerText =
      "Hi " + userData.username + ", What would you like to change?";
    document.getElementById("profile-description").innerText =
      "Below are all the options, Enjoy!";
  } catch (_0x5ea7b1) {
    console.error("Error fetching JSON data:", _0x5ea7b1);
  }
}
async function InitiateCoreService() {
  try {
    const _0x91ed6d = await RewindAPI.bisFortniteOnline(userData.username);
    checkingserverState = false;
    const _0x10fee5 = document.getElementById("fn-status");
    if (_0x91ed6d === "Fortnite is UP!") {
      _0x10fee5.innerText = "Launch";
      bFortniteOnline = true;
      checkingserverState = false;
    } else {
      _0x10fee5.innerText = "Servers Offline!";
      checkingserverState = false;
    }
  } catch (_0x36de18) {
    console.error("Error checking Fortnite status:", _0x36de18);
    document.getElementById("fn-status").innerText = _0x36de18;
  }
}
ipcRenderer.invoke("userdata_get").then((_0x5b090f) => {
  userData = _0x5b090f;
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
  const _0x272c5c = document.querySelectorAll(".menu-item button");
  _0x272c5c.forEach((_0x4ed1e6) => {
    _0x4ed1e6.addEventListener("click", function () {
      const _0x2fe6d6 = _0x4ed1e6.querySelector("span").textContent;
      console.log("Button clicked: " + _0x2fe6d6);
      ipcRenderer.send(_0x2fe6d6);
    });
  });
});
document.getElementById("launch-fn").addEventListener("click", async () => {
  if (!bFortniteOnline || checkingserverState) {
    return;
  }
  const _0x1a4ec3 = document.getElementById("fn-status");
  _0x1a4ec3.innerText = "Waiting for core services..";
  await setTimeout(0x1f4);
  ipcRenderer.send("launch-fn");
});
ipcRenderer.on("fn-status-update", (_0x542479, _0x2347e0) => {
  const _0x2a4163 = document.getElementById("fn-status");
  _0x2a4163.innerText = _0x2347e0;
});
document.getElementById("profile-button").addEventListener("click", () => {
  ipcRenderer.send("Profile");
});
async function loadprofileHudImg(_0x25edf6) {
  try {
    const _0x1c74e1 = document.getElementById("storefront-image");
    if (busefn) {
      const _0x509106 = globals.profileUrl + userData.skin + "/icon.png";
      _0x1c74e1.src = _0x509106;
    } else {
      _0x1c74e1.src = _0x25edf6;
    }
    document.getElementById("username").innerText = userData.username;
  } catch (_0x26df93) {
    console.error("Error fetching JSON data:", _0x26df93);
  }
}
loadprofileHudImg(null);
document
  .getElementById("change-build-btn")
  .addEventListener("click", async () => {
    ipcRenderer.send("update-fn-path");
  });
