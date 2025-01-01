/* 
 - Deobfuscated with <3
 - Rewind Launcher v2.1.1
*/

document.addEventListener("DOMContentLoaded", () => {
  const _0x3859bd = document.getElementById("storefront-image");
  const _0x232595 = document.getElementById("storefront-title");
  const _0x496a4a = document.getElementById("storefront-description");
  const _0x3cf475 = document.getElementById("loading-storefront");
  const _0x5d6c82 = document.getElementById("sigma");
  let _0x2ef62a = [];
  let _0x4a5731 = 0x0;
  let _0x68401e;
  let _0x48dac6 = true;
  function _0x14e99f() {
    fetch("https://services.rewindmp.xyz/api/launcher/v2/cdn/shop")
      .then((_0x2af7d7) => _0x2af7d7.json())
      .then((_0x1eb056) => {
        console.log(_0x1eb056);
        _0x2ef62a = [..._0x1eb056.featured1, ..._0x1eb056.featured2];
        if (_0x2ef62a.length > 0x0) {
          _0x575f6a();
        } else {
          console.error("No featured items available");
        }
      })
      ["catch"]((_0x2d3d83) =>
        console.error("Error fetching featured items:", _0x2d3d83)
      );
  }
  function _0x575f6a() {
    if (_0x2ef62a.length === 0x0) {
      console.error("No featured items available");
      return;
    }
    _0x68401e = setInterval(() => {
      if (_0x48dac6) {
        _0x48dac6 = false;
        _0x4a5731 = (_0x4a5731 + 0x1) % _0x2ef62a.length;
      }
      _0x55bb32(_0x2ef62a[_0x4a5731]);
      _0x4a5731 = (_0x4a5731 + 0x1) % _0x2ef62a.length;
    }, 0x2710);
    _0x55bb32(_0x2ef62a[_0x4a5731]);
    _0x4831e5();
  }
  async function _0x55bb32(_0x31d33c) {
    const _0x318acf = document.createElement("span");
    _0x318acf.textContent = " - " + _0x31d33c.type;
    _0x318acf.style.fontWeight = "normal";
    _0x232595.textContent = _0x31d33c.name;
    _0x232595.appendChild(_0x318acf);
    _0x496a4a.textContent = _0x31d33c.description;
    _0x5d6c82.classList = "storefront-item rarity-" + _0x31d33c.rarity;
    const _0x8b7062 = new Image();
    _0x8b7062.src = _0x31d33c.iconUrl;
    _0x3859bd.style.transition = "transform 1s ease-in-out";
    _0x3859bd.style.transform = "translateX(100%)";
    await delay(0x3e8);
    _0x3859bd.src = _0x8b7062.src;
    _0x3859bd.style.transition = "transform 1s ease-in-out";
    _0x3859bd.style.transform = "translateX(-100%)";
    await delay(0x64);
    _0x3859bd.style.transform = "translateX(0)";
    _0x4831e5();
  }
  async function _0x4831e5() {
    _0x3cf475.style.width = "0%";
    _0x3cf475.style.transition = "none";
    await delay(0x64);
    _0x3cf475.style.transition = "width 10s linear";
    _0x3cf475.style.width = "100%";
    await delay(0x2710);
  }
  _0x14e99f();
});
