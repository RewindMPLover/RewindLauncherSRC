/* 
 - Deobfuscated with <3
 - Rewind Launcher v3.0.5
*/

fetch(
  "https://services.rewindmp.xyz/api/cdn/launcherservice/v1?function=Winterfest"
)
  .then((_0x3d74f1) => _0x3d74f1.json())
  .then((_0x2bdd7f) => {
    const _0x2bfa0b = document.querySelector(".winterfest-content");
    for (const _0x3d8ca2 in _0x2bdd7f) {
      if (_0x2bdd7f.hasOwnProperty(_0x3d8ca2)) {
        const _0x37ecb2 = _0x2bdd7f[_0x3d8ca2];
        const _0x376921 = document.createElement("li");
        _0x376921.classList.add("winterfest-item");
        _0x376921.tabIndex = 0x0;
        const _0x1fb37f = document.createElement("button");
        const _0x50d589 = document.createElement("img");
        _0x50d589.src = "../assets/Present.png";
        _0x50d589.id = "servers";
        _0x50d589.alt = "Store Icon";
        const _0xac08a6 = document.createElement("span");
        _0x1fb37f.appendChild(_0x50d589);
        _0x1fb37f.appendChild(_0xac08a6);
        _0x376921.appendChild(_0x1fb37f);
        _0x2bfa0b.appendChild(_0x376921);
        _0x1fb37f.setAttribute("data-code-name", _0x37ecb2.codeName);
        _0x1fb37f.addEventListener("click", async function () {
          const _0x43bcc5 = document.getElementById(
            "confirmation-modal-winterfest"
          );
          const _0x354945 = document.getElementById("modal-message-winterfest");
          const _0xa9fd8f = document.getElementById("open-button-winterfest");
          const _0x59191a = document.getElementById("cancel-button-winterfest");
          _0x354945.textContent =
            "Are you sure you want to open this present? Opening this present will deduct your tickets by one.";
          _0x43bcc5.style.display = "flex";
          _0xa9fd8f.onclick = function () {
            _0x43bcc5.style.display = "none";
            const _0x475951 = document.createElement("div");
            _0x475951.classList.add("loading-overlay");
            const _0x356bb3 = document.createElement("img");
            _0x356bb3.src = "../assets/Present.png";
            _0x356bb3.classList.add("present-image");
            _0x475951.appendChild(_0x356bb3);
            document.body.appendChild(_0x475951);
            _0x475951.style.display = "flex";
            _0x475951.style.opacity = "1";
            ipcRenderer.send("openpresent", {
              codeName: _0x1fb37f.getAttribute("data-code-name"),
            });
            ipcRenderer.once("present-opened", async (_0x3ce5fc, _0x5bdd08) => {
              if (_0x5bdd08.success) {
                _0x356bb3.style.display = "none";
                const _0x813c7d = document.createElement("div");
                _0x813c7d.classList.add("loading-text");
                _0x813c7d.textContent =
                  "Claimed Present, login to receive your reward!";
                _0x475951.appendChild(_0x813c7d);
                await setTimeout(0x1388);
                _0x475951.style.display = "none";
              } else {
                _0x475951.style.display = "none";
                const _0x4137db = document.getElementById(
                  "error-modal-winterfest"
                );
                const _0x51ef28 = document.getElementById(
                  "error-message-winterfest"
                );
                const _0x87b0bd = document.getElementById(
                  "ok-button-winterfest"
                );
                _0x51ef28.textContent =
                  "Failed to open present. Error: " + _0x5bdd08.message;
                _0x4137db.style.display = "flex";
                _0x87b0bd.onclick = function () {
                  _0x4137db.style.display = "none";
                };
              }
            });
          };
          _0x59191a.onclick = function () {
            _0x43bcc5.style.display = "none";
          };
        });
      }
    }
  })
  ["catch"]((_0x5be543) =>
    console.error("Error fetching Winterfest data:", _0x5be543)
  );
window.onclick = function (_0x3c24ec) {
  const _0x1e347e = document.getElementById("confirmation-modal-winterfest");
  if (_0x3c24ec.target === _0x1e347e) {
    _0x1e347e.style.display = "none";
  }
  const _0x2c9b78 = document.getElementById("error-modal-winterfest");
  if (_0x3c24ec.target === _0x2c9b78) {
    _0x2c9b78.style.display = "none";
  }
};
