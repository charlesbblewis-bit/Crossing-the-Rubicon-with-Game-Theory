"use strict";

const solveBtn = document.getElementById("solve-btn");
const stepBtn  = document.getElementById("step-btn");
const statusEl = document.getElementById("status");
const backBtn  = document.getElementById("back-btn");

const q = (action) => `‘${action}’`;   // wraps a branch name in quotes

let solution = null;   // what solve() returned: { outcome, path, order }
let steps = [];        // the list from buildSteps
let current = 0;       // index of the next step to show

solveBtn.addEventListener("click", () => {
  solution = solve(game);
  for (const entry of solution.order) {
    entry.node.valueParts = setPayoffText(entry.node.valueEl, entry.outcome.payoffs);
  }
  steps = buildSteps(solution.order);
  goTo(0);
});

stepBtn.addEventListener("click", () => goTo(current + 1));
backBtn.addEventListener("click", () => goTo(current - 1));

function buildSteps(order){
    const steps = [];
    for (const entry of order) {
        steps.push({ type: "options", entry: entry});
        steps.push({ type: "compare", entry: entry});
        steps.push({ type: "choose", entry: entry});
        steps.push({ type: "value", entry: entry});
    }
    steps.push({ type: "path"});
    return steps;
}

function clearClass(cls) {
  document.querySelectorAll("." + cls).forEach(el => el.classList.remove(cls));
}

function resetAll() {
  for (const cls of ["considering", "current", "compared", "chosen", "rejected", "on-path", "off-path"]) clearClass(cls);
  document.querySelectorAll(".value").forEach(el => el.classList.add("hidden"));
}

function applyStep(step) {
  clearClass("considering");
  clearClass("current");
  clearClass("compared");

  if (step.type === "path") {
    for (const s of solution.path) {
      s.node.actions[s.action].edgeEl.classList.add("on-path");
    }
    const onPath = new Set(solution.path.map(s => s.node));
    onPath.add(solution.outcome);
    markOffPath(game, onPath);

    const route = solution.path.map(s => `${s.node.player} ${q(s.action)}`).join(", ");
    statusEl.textContent = `Equilibrium: ${route} → ${solution.outcome.outcome}.` 
    return;
  }

  const node = step.entry.node;
  const chosen = step.entry.action;
  node.circleEl.classList.add("current");

  switch (step.type) {
    case "options":
      for (const child of Object.values(node.actions)) child.edgeEl.classList.add("considering");
      statusEl.textContent = `${node.player} can ${Object.keys(node.actions).map(q).join(" or ")}.`;
      break;

    case "choose":
      for (const [action, child] of Object.entries(node.actions)) {
        child.edgeEl.classList.add(action === chosen ? "chosen" : "rejected");
      }
      statusEl.textContent = `${node.player} chooses ${q(chosen)}.`;
      break;
      
    case "compare": {
      const lines = [];
      for (const [action, child] of Object.entries(node.actions)) {
        child.edgeEl.classList.add("considering");
        const isLeaf = child instanceof Outcome;
        const pieces = isLeaf ? child.payoffParts : child.valueParts;
        pieces[node.player].classList.add("compared");
        const value = (isLeaf ? child : child.value).payoffs[node.player];
        lines.push(`${q(action)} gives ${value}`);
      }
      statusEl.textContent = `For ${node.player}: ${lines.join(", ")}.`;
      break;
    }

    case "value": {
        node.valueEl.classList.remove("hidden");
        statusEl.textContent = `So this decision is worth: ${node.valueEl.textContent} (${step.entry.outcome.outcome}).`;
        break;
        }

    default:
      statusEl.textContent = `(${step.type}: not built yet)`;
  }
}

function goTo(n) {
  resetAll();
  for (let i = 0; i < n; i++) applyStep(steps[i]);
  current = n;
  if (n === 0) statusEl.textContent = `Solved: ${steps.length} steps. Press Step.`;
  stepBtn.disabled = current >= steps.length;
  backBtn.disabled = current === 0;
}

function markOffPath(node, onPath) {
  if (!onPath.has(node)) {
    node.els.forEach(el => el.classList.add("off-path"));
    if (node.edgeEls) node.edgeEls.forEach(el => el.classList.add("off-path"));
  }
  if (node instanceof Decision) {
    for (const child of Object.values(node.actions)) markOffPath(child, onPath);
  }
}

function resetSolve() {
  solution = null;
  steps = [];
  current = 0;
  statusEl.textContent = "";
  resetAll();
}

function solveFinished() {
  return solution !== null && current >= steps.length;
}