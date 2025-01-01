/* 
 - Deobfuscated with <3
 - Rewind Launcher v2.1.1
*/

const path = require("path");
const fs = require("fs");
async function SendGetRequest(_0x19ec81, _0x534370) {
  const _0x3bf6ac = "https://services.rewindmp.xyz" + _0x19ec81;
  const _0x2c9cee = await fetch(_0x3bf6ac, {
    method: "GET",
  });
  let _0x44eb57;
  if (_0x534370) {
    _0x44eb57 = await _0x2c9cee.json();
  } else {
    _0x44eb57 = await _0x2c9cee.text();
  }
  return _0x44eb57;
}
async function SendGetRequestLocally(_0x1bcc6c, _0x479d5b) {
  const _0x735224 = "http://127.0.0.1:3551" + _0x1bcc6c;
  const _0x8a64be = await fetch(_0x735224, {
    method: "GET",
  });
  let _0x4d9849;
  if (_0x479d5b) {
    _0x4d9849 = await _0x8a64be.json();
  } else {
    _0x4d9849 = await _0x8a64be.text();
  }
  return _0x4d9849;
}
async function bisFortniteOnline(_0x37fed9) {
  try {
    const _0x519110 = await SendGetRequest(
      "/api/v1/fnState/" + _0x37fed9,
      false
    );
    return _0x519110;
  } catch (_0x56dedf) {
    console.error("Error checking Fortnite online state:", _0x56dedf);
    return "error: " + _0x56dedf;
  }
}
async function checkForFolder(_0x30bda4, _0x1cfea9) {
  const _0x4fe840 = path.join(_0x30bda4, _0x1cfea9);
  const _0x45119f = await fs.promises
    .access(_0x4fe840)
    .then(() => true)
    ["catch"](() => false);
  return _0x45119f;
}
async function UpdateGamePath(_0x5c8f26) {
  const _0x346f93 = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "gamedata.json"
  );
  const _0x20623f = await _0x5c8f26.selectFolder();
  const _0x23c139 = await checkForFolder(_0x20623f, "FortniteGame");
  const _0x1a455b = await checkForFolder(_0x20623f, "Engine");
  if (_0x23c139 && _0x1a455b) {
    _0x5c8f26.MessagePopup("Path Updated to: " + _0x20623f);
    fs.writeFileSync(
      _0x346f93,
      JSON.stringify(
        {
          gamepath: _0x20623f,
        },
        null,
        0x4
      ),
      "utf8"
    );
  } else {
    _0x5c8f26.UpdateFN_State("Launch");
    _0x5c8f26.MessagePopup(
      "Path is missing folders. Make sure the path contains FortniteGame & Engine."
    );
    return;
  }
}
async function bAllowSerials(_0x3193f1, _0x1f92c7, _0x113bf4, _0x17a063) {
  try {
    _0x3193f1 = _0x3193f1.replace(/^\/+|\/+$/g, "");
    _0x1f92c7 = _0x1f92c7.replace(/^\/+|\/+$/g, "");
    _0x113bf4 = _0x113bf4.replace(/^\/+|\/+$/g, "");
    _0x17a063 = _0x17a063.replace(/^\/+|\/+$/g, "");
    let _0x4f169f = await SendGetRequest(
      "/api/v1/hwid/serials/" +
        _0x3193f1 +
        "/" +
        _0x1f92c7 +
        "/" +
        _0x113bf4 +
        "/" +
        _0x17a063,
      false
    );
    return _0x4f169f;
  } catch (_0x37c7f2) {
    console.error("Error checking serial allowance state:", _0x37c7f2);
    return "error: " + _0x37c7f2;
  }
}
const RewindAPI = {
  bisFortniteOnline: bisFortniteOnline,
  UpdateGamePath: UpdateGamePath,
  bAllowSerials: bAllowSerials,
};
module.exports = RewindAPI;
