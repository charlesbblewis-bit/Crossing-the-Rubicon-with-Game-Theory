"use strict";

const keyHint = document.getElementById("key-hint");

function inTreeScene() {
  return document.getElementById("tree-scene").classList.contains("active");
}

function inSlides() {
  return phases[phaseIndex].type === "slides";
}

function pressNext() {
  if (inSlides()) {
    nextSlide();
  } else if (solution === null) {
    document.getElementById("solve-btn").click();
  } else if (solveFinished()) {
    if (phaseIndex < phases.length - 1) enterPhase(phaseIndex + 1);
  } else {
    document.getElementById("step-btn").click();
  }
}

function pressBack() {
  if (inSlides()) prevSlide();
  else if (solution !== null) document.getElementById("back-btn").click();
}

function canGoBack() {
  if (inSlides()) return slideIndex > 0;
  return solution !== null && current > 0;
}

function updateHint() {
  const next = phases[phaseIndex + 1];
  let action = null;

  if (inSlides()) {
    const last = slideIndex === currentDeck.length - 1;
    action = last && next?.type === "solve" ? "start solving" : "continue";
  } else if (solution === null) {
    action = "solve the tree";
  } else if (solveFinished()) {
    action = next ? "continue" : null;        // nothing after the final solve
  } else {
    action = "step";
  }

  const parts = [];
  if (action) parts.push(`Press Space to ${action}`);
  if (canGoBack()) parts.push("← Back");
  keyHint.textContent = parts.join("  ·  ");
}

document.addEventListener("keydown", (e) => {
  if (!inTreeScene() || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.target.matches("input, textarea, select")) return;

  if (e.code === "Space" || e.code === "ArrowRight") {
    e.preventDefault();
    pressNext();
  } else if (e.code === "ArrowLeft" || e.code === "Backspace") {
    e.preventDefault();
    pressBack();
  } else {
    return;
  }
  updateHint();
});

updateHint();