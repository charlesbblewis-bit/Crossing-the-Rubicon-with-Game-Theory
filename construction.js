"use strict";

const buildQuote  = document.getElementById("build-quote");
const quoteText   = document.getElementById("build-quote-text");
const quoteSource = document.getElementById("build-quote-source");
const buildBack   = document.getElementById("build-back");
const buildNext   = document.getElementById("build-next");
const buildNote = document.getElementById("build-note");
const noteTitle = document.getElementById("build-note-title");
const noteText  = document.getElementById("build-note-text");

let slideIndex = 0;

function showSlide(n) {
  slideIndex = n;
  const slide = buildSlides[n];
  document.querySelectorAll("#tree svg > *").forEach(el => el.classList.add("unbuilt"));
  clearClass("spotlight");
  for (let i = 0; i <= n; i++) {
    for (const ref of buildSlides[i].reveal ?? []) {
      elementsFor(ref).forEach(el => el.classList.remove("unbuilt"));
    }
  }
  for (const ref of slide.highlight ?? []) {
    elementsFor(ref).forEach(el => el.classList.add("spotlight"));
  }
  if (slide.quote) {
    quoteText.innerHTML = slide.quote.text;
    quoteSource.textContent = slide.quote.source;
    buildQuote.hidden = false;
  } else {
    buildQuote.hidden = true;
  }

  if (slide.note) {
    noteTitle.textContent = slide.note.title ?? "";
    noteTitle.hidden = !slide.note.title;
    noteText.innerHTML = slide.note.text;
    buildNote.hidden = false;
  } else {
    buildNote.hidden = true;
  }
  
  buildBack.disabled = n === 0;
  buildNext.textContent = n === buildSlides.length - 1 ? "Start solving" : "Next";
}

buildBack.addEventListener("click", () => showSlide(slideIndex - 1));


buildNext.addEventListener("click", () => {
  if (slideIndex === buildSlides.length - 1) finishBuild();
  else showSlide(slideIndex + 1);
});

// Swaps the construction panel for the solving controls.
function finishBuild() {
  clearClass("unbuilt");
  clearClass("spotlight");
  document.getElementById("build-panel").hidden = true;
  document.getElementById("controls").hidden = false;
}

// Follows a path like "Comply/Exploit" down from the root.
function nodeAt(path) {
  let node = game;
  if (path === "") return node;
  for (const action of path.split("/")) {
    if (!(node instanceof Decision) || !(action in node.actions)) {
      throw new Error(`Story path "${path}": no action "${action}" at this point`);
    }
    node = node.actions[action];
  }
  return node;
}

// Turns a slide reference into the SVG elements it refers to.
function elementsFor(ref) {
  if ("node" in ref) {
    const node = nodeAt(ref.node);
    return node.els.filter(el => el !== node.payoffEl);   // shape and labels, not payoffs
  }
  if ("edge" in ref)    return nodeAt(ref.edge).edgeEls;
  if ("payoffs" in ref) return [nodeAt(ref.payoffs).payoffEl];
  if ("payoff" in ref) {
    const part = nodeAt(ref.payoff).payoffParts?.[ref.player];
    if (!part) throw new Error(`No payoff for "${ref.player}" at "${ref.payoff}"`);
    return [part];
  }
  throw new Error(`Unknown story reference: ${JSON.stringify(ref)}`);
}

showSlide(0);