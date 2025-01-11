/* 
 - Deobfuscated with <3
 - Rewind Launcher v3.0.5
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
    .then((_0x47bd06) => _0x47bd06.json())
    .then((_0x3549ff) => {
      newsData = _0x3549ff.news;
      startNewsCycle();
    })
    ["catch"]((_0x50bd8d) => console.error("Error fetching news:", _0x50bd8d));
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
async function updateNews(_0x233536) {
  newsTitle.textContent = _0x233536.title;
  newsDescription.textContent = _0x233536.description;
  const _0xe715d5 = new Image();
  _0xe715d5.src = _0x233536.imgurl;
  newsImage.style.transition = "transform 1s ease-in-out";
  newsImage.style.transform = "translateX(100%)";
  await setTimeout(0x3e8);
  newsImage.src = _0xe715d5.src;
  newsImage.style.transition = "transform 1s ease-in-out";
  newsImage.style.transform = "translateX(-100%)";
  await setTimeout(0x64);
  newsImage.style.transform = "translateX(0)";
  if (!_0x233536.playMusic || isMuted) {
    audio.pause();
  } else {
    audio.src = _0x233536.musicUrl;
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
function delay(_0x5e3bae) {
  return setTimeout(_0x5e3bae);
}
muteButton.addEventListener("click", () => {
  isMuted = !isMuted;
  if (isMuted) {
    audio.pause();
  } else {
    const _0xc27c18 = newsData[currentIndex];
    if (_0xc27c18 && !_0xc27c18.playMusic) {
      audio.play();
    }
  }
});
fetchNewsData();
