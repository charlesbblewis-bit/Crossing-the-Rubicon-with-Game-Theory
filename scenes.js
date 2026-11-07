// Shows one scene and hides all the others.
function showScene(id) {
  document.querySelectorAll(".scene").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Runs on the first key press or click, then switches itself off.
function leaveIntro() {
  document.removeEventListener("keydown", leaveIntro);
  document.removeEventListener("click", leaveIntro);
  showScene("atTheRiver");
}

document.addEventListener("keydown", leaveIntro);
document.addEventListener("click", leaveIntro);

let playerChoice = null;   // what the user chose at the Rubicon



document.getElementById("cross-btn").addEventListener("click", () => {
  playerChoice = "Cross";
  showScene("tree-scene");
});

document.getElementById("stay-btn").addEventListener("click", () => {
  playerChoice = "Comply";
  showScene("tree-scene");
});

