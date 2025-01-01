/* 
 - Deobfuscated with <3
 - Rewind Launcher v2.1.1
*/

async function fetchLeaderboard() {
  try {
    const _0x5538de = await fetch(
      "https://services.rewindmp.xyz/api/cdn/launcherservice/v1?function=Leaderboard"
    );
    if (!_0x5538de.ok) {
      throw new Error("Failed to fetch leaderboard data.");
    }
    const _0x281c09 = await _0x5538de.json();
    if (!Array.isArray(_0x281c09)) {
      throw new Error("Leaderboard data is not an array.");
    }
    return _0x281c09;
  } catch (_0x58aa2d) {
    console.error("Error fetching leaderboard:", _0x58aa2d);
    return [];
  }
}
window.addEventListener("DOMContentLoaded", async () => {
  const _0x12f13c = document.getElementById("leaderboard-section");
  if (!_0x12f13c) {
    console.error("Leaderboard section not found in the DOM.");
    return;
  }
  try {
    const _0x597655 = await fetchLeaderboard();
    if (_0x597655.length === 0x0) {
      _0x12f13c.innerHTML = "<p>No leaderboard data available.</p>";
      return;
    }
    _0x597655.forEach((_0x18a8a0) => {
      const _0x4108fb = document.createElement("div");
      _0x4108fb.className = "leaderboard-item";
      let _0xc69995 = "";
      if (_0x18a8a0.rank === 0x1) {
        _0xc69995 = "gold";
      } else {
        if (_0x18a8a0.rank === 0x2) {
          _0xc69995 = "orange";
        } else if (_0x18a8a0.rank === 0x3) {
          _0xc69995 = "red";
        } else {
          _0xc69995 = "gray";
        }
      }
      _0x4108fb.innerHTML =
        '\n                <span class="rank ' +
        _0xc69995 +
        '">#' +
        _0x18a8a0.rank +
        '</span>\n                <span class="username">' +
        _0x18a8a0.username +
        '</span>\n                <span class="kills">' +
        _0x18a8a0.kills +
        " kills</span>\n            ";
      _0x12f13c.appendChild(_0x4108fb);
    });
  } catch (_0x35c95c) {
    console.error("Failed to fetch leaderboard data:", _0x35c95c);
    _0x12f13c.innerHTML = "<p>Failed to load leaderboard data.</p>";
  }
});
