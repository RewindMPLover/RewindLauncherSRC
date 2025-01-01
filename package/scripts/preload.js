/* 
 - Deobfuscated with <3
 - Rewind Launcher v2.1.1
*/

window.addEventListener("DOMContentLoaded", () => {
  const _0xae3ff1 = (_0x1ce879, _0x15e423) => {
    const _0x3b6d50 = document.getElementById(_0x1ce879);
    if (_0x3b6d50) {
      _0x3b6d50.innerText = _0x15e423;
    }
  };
  for (const _0xf4b2c4 of ["chrome", "node", "electron"]) {
    _0xae3ff1(_0xf4b2c4 + "-version", process.versions[_0xf4b2c4]);
  }
});
