/* 
 - Deobfuscated with <3
 - Rewind Launcher v2.1.1
*/

const newsTitle = document.querySelector(".news-title");
const newsDescription = document.querySelector(".news-description");
const newsImage = document.querySelector(".news-image img");
const muteButton = document.querySelector(".mute-button");
const loadingProgress = document.getElementById("loading-progress");
let newsData = [];
let currentIndex = 0x0;
let interval;
let ok = true;
let isMuted = true;
let audio = new Audio();
function fetchNewsData() {
  fetch(
    "https://services.rewindmp.xyz/api/cdn/launcherservice/v1?function=LauncherNews"
  )
    .then((_0x113a50) => _0x113a50.json())
    .then((_0x55db7f) => {
      newsData = _0x55db7f.news;
      startNewsCycle();
    })
    ["catch"]((_0x57548e) => console.error("Error fetching news:", _0x57548e));
}
function startNewsCycle() {
  if (newsData.length === 0x0) {
    return;
  }
  interval = setInterval(() => {
    if (ok) {
      ok = false;
      currentIndex = (currentIndex + 0x1) % newsData.length;
    }
    updateNews(newsData[currentIndex]);
    currentIndex = (currentIndex + 0x1) % newsData.length;
  }, 0x4e20);
  updateNews(newsData[currentIndex]);
  resetLoadingBar();
}
async function updateNews(_0xf70dce) {
  newsTitle.textContent = _0xf70dce.title;
  newsDescription.textContent = _0xf70dce.description;
  const _0x1000a4 = new Image();
  _0x1000a4.src = _0xf70dce.imgurl;
  newsImage.style.transition = "transform 1s ease-in-out";
  newsImage.style.transform = "translateX(100%)";
  await setTimeout(0x3e8);
  newsImage.src = _0x1000a4.src;
  newsImage.style.transition = "transform 1s ease-in-out";
  newsImage.style.transform = "translateX(-100%)";
  await setTimeout(0x64);
  newsImage.style.transform = "translateX(0)";
  if (!_0xf70dce.playMusic || isMuted) {
    audio.pause();
  } else {
    audio.src = _0xf70dce.musicUrl;
    audio.play();
  }
  resetLoadingBar();
}
async function resetLoadingBar() {
  loadingProgress.style.width = "0%";
  loadingProgress.style.transition = "none";
  await setTimeout(0x64);
  loadingProgress.style.transition = "width 20s linear";
  loadingProgress.style.width = "100%";
  await setTimeout(0x4e20);
}
function delay(_0x4429d4) {
  return setTimeout(_0x4429d4);
}
muteButton.addEventListener("click", () => {
  isMuted = !isMuted;
  if (isMuted) {
    audio.pause();
  } else {
    const _0xe2ad48 = newsData[currentIndex];
    if (_0xe2ad48 && !_0xe2ad48.playMusic) {
      audio.play();
    }
  }
});
fetchNewsData();
