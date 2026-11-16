"use strict";

const music = new Audio("audio/mondamusic.mp3");
music.loop = true;
music.volume = 0.25;           

const musicBtn = document.getElementById("music-btn");
let musicOn = true;

function startMusic() {
  if (musicOn) music.play().catch(err => console.log("Music failed:", err.name, err.message));
}

function toggleMusic() {
  musicOn = !musicOn;
  if (musicOn) music.play().catch(err => console.log("Music failed:", err.name, err.message));
  else music.pause();
  musicBtn.textContent = musicOn ? "♪" : "♪̸";   // a struck-through note when muted
}

musicBtn.addEventListener("click", () => {
  toggleMusic();
  musicBtn.blur();            // otherwise Space would press this button again
});

document.addEventListener("keydown", (e) => {
  if (e.code !== "KeyM" || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.target.matches("input, textarea, select")) return;
  toggleMusic();
});

music.addEventListener("error", () => console.log("Audio file error:", music.error?.code, music.src));