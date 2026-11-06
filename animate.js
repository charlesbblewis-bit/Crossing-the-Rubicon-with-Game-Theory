"use strict";

const solveBtn = document.getElementById("solve-btn");
const stepBtn  = document.getElementById("step-btn");
const statusEl = document.getElementById("status");

let solution = null;   // what solve() returned: { outcome, path, order }
let steps = [];        // the list from buildSteps
let current = 0;       // index of the next step to show

solveBtn.addEventListener("click", () => {
  resetAll();
  solution = solve(game);
  for (const entry of solution.order) {
    entry.node.valueParts = setPayoffText(entry.node.valueEl, entry.outcome.payoffs);
  }
  steps = buildSteps(solution.order);
  current = 0;
  stepBtn.disabled = false;
  statusEl.textContent = `Solved: ${steps.length} steps. Press Step.`;
});

stepBtn.addEventListener("click", () => {
  applyStep(steps[current]);
  current++;
  if (current === steps.length) stepBtn.disabled = true;
});

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
  for (const cls of ["considering", "current", "compared", "chosen", "rejected", "on-path"]) clearClass(cls);
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
    const route = solution.path.map(s => `${s.node.player} ${s.action}`).join(", ");
    statusEl.textContent = `Equilibrium: ${route} → ${solution.outcome.outcome}`;
    return;
  }

  const node = step.entry.node;
  const chosen = step.entry.action;
  node.circleEl.classList.add("current");

  switch (step.type) {
    case "options":
      for (const child of Object.values(node.actions)) child.edgeEl.classList.add("considering");
      statusEl.textContent = `${node.player} can ${Object.keys(node.actions).join(" or ")}.`;
      break;

    case "choose":
      for (const [action, child] of Object.entries(node.actions)) {
        child.edgeEl.classList.add(action === chosen ? "chosen" : "rejected");
      }
      statusEl.textContent = `${node.player} chooses ${chosen}.`;
      break;
      
    case "compare": {
      const lines = [];
      for (const [action, child] of Object.entries(node.actions)) {
        child.edgeEl.classList.add("considering");
        const isLeaf = child instanceof Outcome;
        const pieces = isLeaf ? child.payoffParts : child.valueParts;
        pieces[node.player].classList.add("compared");
        const value = (isLeaf ? child : child.value).payoffs[node.player];
        lines.push(`${action} gives ${value}`);
      }
      statusEl.textContent = `For ${node.player}: ${lines.join(", ")}.`;
      break;
    }
    
    case "value": {
        node.valueEl.classList.remove("hidden");
        statusEl.textContent = `So this decision is worth ${node.valueEl.textContent} (${step.entry.outcome.outcome}).`;
        break;
        }

    default:
      statusEl.textContent = `(${step.type}: not built yet)`;
  }
}