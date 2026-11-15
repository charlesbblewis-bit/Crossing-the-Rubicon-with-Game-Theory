"use strict";

const historyScene  = document.getElementById("history");
const historyText   = document.getElementById("history-text");
const historyLayers = [document.getElementById("history-bg-a"), document.getElementById("history-bg-b")];

let beatIndex = 0;
let historyReady = false;   // ignores the keypress that opened this scene
let shownImage = null;
let frontLayer = 0;

// Cross-fades by loading the new image on the hidden layer and swapping.
function setHistoryImage(src) {
  if (!src || src === shownImage) return;
  shownImage = src;
  const back = 1 - frontLayer;
  historyLayers[back].style.backgroundImage = `url("${src}")`;
  historyLayers[back].classList.add("visible");
  historyLayers[frontLayer].classList.remove("visible");
  frontLayer = back;
}

function showBeat(n) {
  beatIndex = n;
  let image = null;
  for (let i = 0; i <= n; i++) {            // same replay idea as the slides
    if (historyBeats[i].image) image = historyBeats[i].image;
  }
  setHistoryImage(image);

  historyText.innerHTML = historyBeats[n].text;
  historyText.classList.remove("show");
  void historyText.offsetWidth;             // restarts the fade-in animation
  historyText.classList.add("show");
}

function startHistory() {
  startMusic();
  showScene("history");
  showBeat(0);
  setTimeout(() => { historyReady = true; }, 0);
}

function endHistory() {
  historyReady = false;
  setTimeout(() => showScene("tree-scene"), 0);
}

document.addEventListener("keydown", (e) => {
  if (!historyReady || !historyScene.classList.contains("active")) return;
  if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;

  if (e.code === "Space" || e.code === "ArrowRight") {
    e.preventDefault();
    if (beatIndex < historyBeats.length - 1) showBeat(beatIndex + 1);
    else endHistory();
  } else if (e.code === "ArrowLeft" || e.code === "Backspace") {
    e.preventDefault();
    if (beatIndex > 0) showBeat(beatIndex - 1);
  }
});