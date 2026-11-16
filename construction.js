"use strict";

const buildQuote  = document.getElementById("build-quote");
const quoteText   = document.getElementById("build-quote-text");
const quoteSource = document.getElementById("build-quote-source");
const buildNote   = document.getElementById("build-note");
const noteTitle   = document.getElementById("build-note-title");
const noteText    = document.getElementById("build-note-text");
const imageLayer = document.getElementById("build-images");

// The whole presentation, in order. Space walks through this list.
//   tree:     load this tree (a key of `trees`) when the phase starts
//   keepTree: don't hide/redraw the tree; slides can still highlight parts of it
const phases = [
  { type: "slides", deck: buildSlides },
  { type: "solve" },
  { type: "slides", deck: explainSlides, tree: "pompeyNoWar", keepTree: true },
  { type: "solve" },
  { type: "slides", deck: conclusionSlides, keepTree: true },
  { type: "slides", deck: finalSlides, keepTree: false }
];

let phaseIndex = 0;
let currentDeck = buildSlides;
let slideIndex = 0;

function nextSlide() {
  if (slideIndex === currentDeck.length - 1) {
    if (phaseIndex < phases.length - 1) enterPhase(phaseIndex + 1);
  } else {
    showSlide(slideIndex + 1);
  }
}

function prevSlide() {
  if (slideIndex > 0) showSlide(slideIndex - 1);
}

function enterPhase(i) {
  phaseIndex = i;
  const phase = phases[i];

  if (phase.tree) loadTree(trees[phase.tree]);
  if (phase.tree || !phase.keepTree) resetSolve();   // keepTree keeps the solved look
  clearClass("spotlight");

  if (phase.type === "slides") {
    currentDeck = phase.deck;
    statusEl.textContent = "";
    document.getElementById("build-panel").hidden = false;
    document.getElementById("controls").hidden = true;
    showSlide(0);
  } else {
    clearClass("unbuilt");
    document.getElementById("build-panel").hidden = true;
    document.getElementById("controls").hidden = false;
  }
}

function showSlide(n) {
  slideIndex = n;
  const slide = currentDeck[n];

  clearClass("spotlight");
  if (!phases[phaseIndex].keepTree) {
    document.querySelectorAll("#tree svg > *").forEach(el => el.classList.add("unbuilt"));
    for (let i = 0; i <= n; i++) {
      for (const ref of currentDeck[i].reveal ?? []) {
        elementsFor(ref).forEach(el => el.classList.remove("unbuilt"));
      }
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

  document.querySelectorAll("#build-stage .slot").forEach(slot => slot.innerHTML = "");
  for (const img of slide.images ?? []) {
    const slot = document.querySelector(`#build-stage .slot-${img.position ?? "right"}`);
    if (!slot) throw new Error(`Unknown image position "${img.position}"`);

    const fig = document.createElement("figure");
    fig.className = "slide-figure";
    // (remove: if (img.width) fig.style.width = img.width;)

    const el = document.createElement("img");
    el.src = img.src;
    el.alt = img.alt ?? "";
    el.className = "slide-image";
    if (img.width) el.style.width = img.width;     // width goes back on the image
    fig.appendChild(el);

    if (img.caption) {
      const cap = document.createElement("figcaption");
      cap.className = "slide-caption";
      cap.innerHTML = img.caption;      // innerHTML so you can use <em> in captions
      fig.appendChild(cap);
    }
    slot.appendChild(fig);
  }
}



// Follows a path like "Demand Caesar disarm alone/Comply" down from the root.
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
    return node.els.filter(el => el !== node.payoffEl);
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

enterPhase(0);