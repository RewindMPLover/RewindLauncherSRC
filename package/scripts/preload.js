/* 
 - Deobfuscated with <3
 - Rewind Launcher v3.0.5
*/

window.addEventListener("DOMContentLoaded", () => {
  const _0x1d85ab = (_0x574465, _0x38cdae) => {
    const _0xc4fc69 = document.getElementById(_0x574465);
    if (_0xc4fc69) {
      _0xc4fc69.innerText = _0x38cdae;
    }
  };
  for (const _0x40723f of ["chrome", "node", "electron"]) {
    _0x1d85ab(_0x40723f + "-version", process.versions[_0x40723f]);
  }
});
