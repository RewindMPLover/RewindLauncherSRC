/* 
 - Deobfuscated with <3
 - Rewind Launcher v3.0.5
*/

async function fetchLeaderboard() {
  try {
    const _0x52214c = await fetch(
      "https://services.rewindmp.xyz/api/cdn/launcherservice/v1?function=Leaderboard"
    );
    if (!_0x52214c.ok) {
      throw new Error("Failed to fetch leaderboard data.");
    }
    const _0x1dd4a7 = await _0x52214c.json();
    if (!Array.isArray(_0x1dd4a7)) {
      throw new Error("Leaderboard data is not an array.");
    }
    return _0x1dd4a7;
  } catch (_0x4facd7) {
    console.error("Error fetching leaderboard:", _0x4facd7);
    return [];
  }
}
window.addEventListener("DOMContentLoaded", async () => {
  const _0x1875d2 = document.getElementById("leaderboard-section");
  if (!_0x1875d2) {
    console.error("Leaderboard section not found in the DOM.");
    return;
  }
  try {
    const _0x2baca3 = await fetchLeaderboard();
    if (_0x2baca3.length === 0x0) {
      _0x1875d2.innerHTML = "<p>No leaderboard data available.</p>";
      return;
    }
    _0x2baca3.forEach((_0x351720) => {
      const _0x153921 = document.createElement("div");
      _0x153921.className = "leaderboard-item";
      let _0x2190d0 = "";
      if (_0x351720.rank === 0x1) {
        _0x2190d0 = "gold";
      } else {
        if (_0x351720.rank === 0x2) {
          _0x2190d0 = "orange";
        } else if (_0x351720.rank === 0x3) {
          _0x2190d0 = "red";
        } else {
          _0x2190d0 = "gray";
        }
      }
      _0x153921.innerHTML =
        '\n                <span class="rank ' +
        _0x2190d0 +
        '">#' +
        _0x351720.rank +
        '</span>\n                <span class="username">' +
        _0x351720.username +
        '</span>\n                <span class="kills">' +
        _0x351720.kills +
        " kills</span>\n            ";
      _0x1875d2.appendChild(_0x153921);
    });
  } catch (_0x1f7291) {
    console.error("Failed to fetch leaderboard data:", _0x1f7291);
    _0x1875d2.innerHTML = "<p>Failed to load leaderboard data.</p>";
  }
});
