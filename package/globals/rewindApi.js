/* 
 - Deobfuscated with <3
 - Rewind Launcher v3.0.5
*/

const path = require("path");
const fs = require("fs");
async function SendGetRequest(_0xb39902, _0x3a0fdd) {
  const _0x1b2ff5 = "https://services.rewindmp.xyz" + _0xb39902;
  const _0x3deed8 = await fetch(_0x1b2ff5, {
    method: "GET",
  });
  let _0x521d99;
  if (_0x3a0fdd) {
    _0x521d99 = await _0x3deed8.json();
  } else {
    _0x521d99 = await _0x3deed8.text();
  }
  return _0x521d99;
}
async function SendGetRequestLocally(_0x5ac685, _0x34a63d) {
  const _0x1ce0c3 = "http://127.0.0.1:3551" + _0x5ac685;
  const _0x361991 = await fetch(_0x1ce0c3, {
    method: "GET",
  });
  let _0x187e34;
  if (_0x34a63d) {
    _0x187e34 = await _0x361991.json();
  } else {
    _0x187e34 = await _0x361991.text();
  }
  return _0x187e34;
}
async function SendPostRequest(_0x1bee30, _0x2befea) {
  const _0x5abb7f = "https://services.rewindmp.xyz" + _0x1bee30;
  const _0x4b9d0b = await fetch(_0x5abb7f, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_0x2befea),
  });
  let _0x589490 = await _0x4b9d0b.text();
  return _0x589490;
}
async function bisFortniteOnline(_0x50b8d5) {
  try {
    const _0x5a28ee = await SendGetRequest(
      "/api/v1/fnState/" + _0x50b8d5,
      false
    );
    return _0x5a28ee;
  } catch (_0x4ad4ac) {
    console.error("Error checking Fortnite online state:", _0x4ad4ac);
    return "error: " + _0x4ad4ac;
  }
}
async function checkForFolder(_0x2bd979, _0x1c6b67) {
  const _0x58e7a4 = path.join(_0x2bd979, _0x1c6b67);
  const _0x5bcc0d = await fs.promises
    .access(_0x58e7a4)
    .then(() => true)
    ["catch"](() => false);
  return _0x5bcc0d;
}
async function UpdateGamePath(_0x2f6ff8) {
  const _0x4af4a0 = path.join(
    process.env.APPDATA,
    "rewind-launcher",
    "gamedata.json"
  );
  const _0x536667 = await _0x2f6ff8.selectFolder();
  const _0xc00450 = await checkForFolder(_0x536667, "FortniteGame");
  const _0xe368d4 = await checkForFolder(_0x536667, "Engine");
  if (_0xc00450 && _0xe368d4) {
    _0x2f6ff8.MessagePopup("Path Updated to: " + _0x536667);
    fs.writeFileSync(
      _0x4af4a0,
      JSON.stringify(
        {
          gamepath: _0x536667,
        },
        null,
        0x4
      ),
      "utf8"
    );
  } else {
    _0x2f6ff8.UpdateFN_State("Launch");
    _0x2f6ff8.MessagePopup(
      "Path is missing folders. Make sure the path contains FortniteGame & Engine."
    );
    return;
  }
}
async function bAllowSerials(
  _0x1860a3,
  _0x550a11,
  _0x365bb0,
  _0x362736,
  _0x24f6f6,
  _0x4ae13b,
  _0x1d3ed5
) {
  try {
    _0x1860a3 = _0x1860a3.replace(/[^\w-]/g, "");
    _0x550a11 = _0x550a11.replace(/[^\d.]/g, "");
    _0x365bb0 = _0x365bb0.replace(/[^\w,-]/g, "");
    _0x362736 = _0x362736.replace(/[^\w,-]/g, "");
    _0x24f6f6 = _0x24f6f6.replace(/[^\w-]/g, "");
    _0x4ae13b = (_0x4ae13b || "UNKNOWN").replace(/[^\w-]/g, "");
    _0x1d3ed5 = (_0x1d3ed5 || "UNKNOWN").replace(/[^\w-]/g, "");
    if (!_0x1860a3 || !_0x550a11 || !_0x365bb0 || !_0x362736 || !_0x24f6f6) {
      console.error("Missing required fields:", {
        accountId: _0x1860a3,
        IpAddress: _0x550a11,
        RamSerial: _0x365bb0,
        DiskSerial: _0x362736,
        SID: _0x24f6f6,
      });
      throw new Error("Missing required hardware information");
    }
    console.log(
      "Sending HWID validation request to:",
      "/api/v1/hwid/serials/:accountId/:ipAddress/:ramSerial/:diskSerial/:sid/:cpuId/:biosSerial"
    );
    const _0x4763fc = await SendGetRequest(
      "/api/v1/hwid/serials/:accountId/:ipAddress/:ramSerial/:diskSerial/:sid/:cpuId/:biosSerial",
      false
    );
    console.log("HWID validation response:", _0x4763fc);
    if (typeof _0x4763fc === "object" && _0x4763fc.errorCode) {
      throw new Error(_0x4763fc.errorMessage || "API Error");
    }
    return _0x4763fc;
  } catch (_0x344205) {
    console.error("Error checking serial allowance state:", _0x344205);
    throw new Error(
      "Failed to validate hardware: " + (_0x344205.message || _0x344205)
    );
  }
}
const RewindAPI = {
  bisFortniteOnline: bisFortniteOnline,
  UpdateGamePath: UpdateGamePath,
  bAllowSerials: bAllowSerials,
};
module.exports = RewindAPI;
