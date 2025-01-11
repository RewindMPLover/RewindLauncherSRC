/* 
 - Deobfuscated with <3
 - Rewind Launcher v3.0.5
*/

document.addEventListener("DOMContentLoaded", () => {
  const _0x132426 = document.getElementById("storefront-image");
  const _0x3290d4 = document.getElementById("storefront-title");
  const _0x473058 = document.getElementById("storefront-description");
  const _0x3e76aa = document.getElementById("loading-storefront");
  const _0xe41335 = document.getElementById("sigma");
  let _0x3b9fa8 = [];
  let _0x369738 = 0x0;
  let _0x1e72ff;
  let _0x1771fc = true;
  function _0x177bb1() {
    fetch("https://services.rewindmp.xyz/api/launcher/v2/cdn/shop")
      .then((_0x5b2aeb) => _0x5b2aeb.json())
      .then((_0x395905) => {
        console.log(_0x395905);
        _0x3b9fa8 = [..._0x395905.featured1, ..._0x395905.featured2];
        if (_0x3b9fa8.length > 0x0) {
          _0x4363bf();
        } else {
          console.error("No featured items available");
        }
      })
      ["catch"]((_0x1962be) =>
        console.error("Error fetching featured items:", _0x1962be)
      );
  }
  function _0x4363bf() {
    if (_0x3b9fa8.length === 0x0) {
      console.error("No featured items available");
      return;
    }
    _0x1e72ff = setInterval(() => {
      if (_0x1771fc) {
        _0x1771fc = false;
        _0x369738 = (_0x369738 + 0x1) % _0x3b9fa8.length;
      }
      _0x2396b8(_0x3b9fa8[_0x369738]);
      _0x369738 = (_0x369738 + 0x1) % _0x3b9fa8.length;
    }, 0x2710);
    _0x2396b8(_0x3b9fa8[_0x369738]);
    _0x41852a();
  }
  async function _0x2396b8(_0x5cb770) {
    const _0x2433c5 = document.createElement("span");
    _0x2433c5.textContent = " - " + _0x5cb770.type;
    _0x2433c5.style.fontWeight = "normal";
    _0x3290d4.textContent = _0x5cb770.name;
    _0x3290d4.appendChild(_0x2433c5);
    _0x473058.textContent = _0x5cb770.description;
    _0xe41335.classList = "storefront-item rarity-" + _0x5cb770.rarity;
    const _0x219771 = new Image();
    _0x219771.src = _0x5cb770.iconUrl;
    _0x132426.style.transition = "transform 1s ease-in-out";
    _0x132426.style.transform = "translateX(100%)";
    await delay(0x3e8);
    _0x132426.src = _0x219771.src;
    _0x132426.style.transition = "transform 1s ease-in-out";
    _0x132426.style.transform = "translateX(-100%)";
    await delay(0x64);
    _0x132426.style.transform = "translateX(0)";
    _0x41852a();
  }
  async function _0x41852a() {
    _0x3e76aa.style.width = "0%";
    _0x3e76aa.style.transition = "none";
    await delay(0x64);
    _0x3e76aa.style.transition = "width 10s linear";
    _0x3e76aa.style.width = "100%";
    await delay(0x2710);
  }
  _0x177bb1();
});
