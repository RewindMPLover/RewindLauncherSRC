/* 
 - Deobfuscated with <3
 - Rewind Launcher v2.1.1
*/

fetch(
  "https://services.rewindmp.xyz/api/cdn/launcherservice/v1?function=Winterfest"
)
  .then((_0x128a23) => _0x128a23.json())
  .then((_0x3e6ce2) => {
    const _0x532ce1 = document.querySelector(".winterfest-content");
    for (const _0x5adaee in _0x3e6ce2) {
      if (_0x3e6ce2.hasOwnProperty(_0x5adaee)) {
        const _0x26cb20 = _0x3e6ce2[_0x5adaee];
        const _0x4bff62 = document.createElement("li");
        _0x4bff62.classList.add("winterfest-item");
        _0x4bff62.tabIndex = 0x0;
        const _0x14d763 = document.createElement("button");
        const _0x1b09d7 = document.createElement("img");
        _0x1b09d7.src = "../assets/Present.png";
        _0x1b09d7.id = "servers";
        _0x1b09d7.alt = "Store Icon";
        const _0x33c844 = document.createElement("span");
        _0x14d763.appendChild(_0x1b09d7);
        _0x14d763.appendChild(_0x33c844);
        _0x4bff62.appendChild(_0x14d763);
        _0x532ce1.appendChild(_0x4bff62);
        _0x14d763.setAttribute("data-code-name", _0x26cb20.codeName);
        _0x14d763.addEventListener("click", async function () {
          const _0x55b661 = document.getElementById(
            "confirmation-modal-winterfest"
          );
          const _0x18a669 = document.getElementById("modal-message-winterfest");
          const _0x14639d = document.getElementById("open-button-winterfest");
          const _0x2c029b = document.getElementById("cancel-button-winterfest");
          _0x18a669.textContent =
            "Are you sure you want to open this present? Opening this present will deduct your tickets by one.";
          _0x55b661.style.display = "flex";
          _0x14639d.onclick = function () {
            _0x55b661.style.display = "none";
            const _0x1d1d23 = document.createElement("div");
            _0x1d1d23.classList.add("loading-overlay");
            const _0x2ce011 = document.createElement("img");
            _0x2ce011.src = "../assets/Present.png";
            _0x2ce011.classList.add("present-image");
            _0x1d1d23.appendChild(_0x2ce011);
            document.body.appendChild(_0x1d1d23);
            _0x1d1d23.style.display = "flex";
            _0x1d1d23.style.opacity = "1";
            ipcRenderer.send("openpresent", {
              codeName: _0x14d763.getAttribute("data-code-name"),
            });
            ipcRenderer.once("present-opened", async (_0x15fd52, _0x4be646) => {
              if (_0x4be646.success) {
                _0x2ce011.style.display = "none";
                const _0x17213f = document.createElement("div");
                _0x17213f.classList.add("loading-text");
                _0x17213f.textContent =
                  "Claimed Present, login to receive your reward!";
                _0x1d1d23.appendChild(_0x17213f);
                await setTimeout(0x1388);
                _0x1d1d23.style.display = "none";
              } else {
                _0x1d1d23.style.display = "none";
                const _0x2d5a38 = document.getElementById(
                  "error-modal-winterfest"
                );
                const _0x5173c3 = document.getElementById(
                  "error-message-winterfest"
                );
                const _0x2b2c7e = document.getElementById(
                  "ok-button-winterfest"
                );
                _0x5173c3.textContent =
                  "Failed to open present. Error: " + _0x4be646.message;
                _0x2d5a38.style.display = "flex";
                _0x2b2c7e.onclick = function () {
                  _0x2d5a38.style.display = "none";
                };
              }
            });
          };
          _0x2c029b.onclick = function () {
            _0x55b661.style.display = "none";
          };
        });
      }
    }
  })
  ["catch"]((_0x1ded23) =>
    console.error("Error fetching Winterfest data:", _0x1ded23)
  );
window.onclick = function (_0x1e957b) {
  const _0x3b71e6 = document.getElementById("confirmation-modal-winterfest");
  if (_0x1e957b.target === _0x3b71e6) {
    _0x3b71e6.style.display = "none";
  }
  const _0x1aeea9 = document.getElementById("error-modal-winterfest");
  if (_0x1e957b.target === _0x1aeea9) {
    _0x1aeea9.style.display = "none";
  }
};
