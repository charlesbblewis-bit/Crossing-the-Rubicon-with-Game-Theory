const SVG_NS = "http://www.w3.org/2000/svg";
let game = trees.base;

function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
}

const SLOT_WIDTH = 180;    // horizontal space for each end point
const LEVEL_HEIGHT = 120;  // vertical distance between levels
const MARGIN = 40;         // space around the edges

// Places every node, and returns { leaves, depth } for the subtree it was given
function layout(node, depth, firstSlot) {
  node.y = MARGIN + depth * LEVEL_HEIGHT;

  if (node instanceof Outcome) {
    node.x = MARGIN + (firstSlot + 0.5) * SLOT_WIDTH;    // centre of its own column
    return { leaves: 1, depth: depth };
  }

  let slot = firstSlot;
  let deepest = depth;
  for (const child of Object.values(node.actions)) {
    const result = layout(child, depth + 1, slot);      // place the child's subtree first
    slot += result.leaves;                               // move along past its columns
    deepest = Math.max(deepest, result.depth);
  }

  const leaves = slot - firstSlot;
  node.x = MARGIN + (firstSlot + leaves / 2) * SLOT_WIDTH;   // centre over the children
  return { leaves: leaves, depth: deepest };
}


let svg;

function addText(x, y, content, cls, anchor = "middle") {
  const t = svgEl("text", { x: x, y: y, class: cls, "text-anchor": anchor });
  t.textContent = content;
  svg.appendChild(t);
  return t;
}

function drawEdges(node) {
  if (node instanceof Outcome) return;

  for (const [action, child] of Object.entries(node.actions)) {
    child.edgeEl = svgEl("line", {
      x1: node.x, y1: node.y, x2: child.x, y2: child.y, class: "edge"
    });
    svg.appendChild(child.edgeEl);

    const goesLeft = child.x < node.x;
    const actionLabel = addText(
      (node.x + child.x) / 2 + (goesLeft ? -10 : 10),
      (node.y + child.y) / 2,
      action,
      "action",
      goesLeft ? "end" : "start"
    );
    child.edgeEls = [child.edgeEl, actionLabel];
    drawEdges(child);                          // then do the same below this child
  }
}

function drawNodes(node) {
  if (node instanceof Outcome) {
    const rect = svgEl("rect", { x: node.x - 6, y: node.y - 6, width: 12, height: 12, class: "leaf" });
    svg.appendChild(rect);
    const outcomeLabel = addText(node.x, node.y + 28, node.outcome, "outcome");
    const payoffEl = addText(node.x, node.y + 46, "", "payoff");
    node.payoffParts = setPayoffText(payoffEl, node.payoffs);
    node.payoffEl = payoffEl;
    node.els = [rect, outcomeLabel, payoffEl];
    return;
  }

  node.circleEl = svgEl("circle", { cx: node.x, cy: node.y, r: 14, class: "decision" });
  svg.appendChild(node.circleEl);
  const playerLabel = addText(node.x, node.y - 22, node.player, "player");
  node.valueEl = addText(node.x + 22, node.y + 5, "", "value hidden", "start");
  node.els = [node.circleEl, playerLabel, node.valueEl];

  for (const child of Object.values(node.actions)) {
    drawNodes(child);
  }
}

function setPayoffText(textEl, payoffs) {
  textEl.textContent = "";                     
  const parts = {};
  Object.entries(payoffs).forEach(([player, value], i) => {
    if (i > 0) textEl.appendChild(document.createTextNode(", "));
    const span = svgEl("tspan", {});
    span.textContent = `${player} ${value}`;
    textEl.appendChild(span);
    parts[player] = span;
  });
  return parts;
}

// Clears the tree area and draws the given tree from scratch.
function loadTree(tree) {
  game = tree;
  const treeDiv = document.getElementById("tree");
  treeDiv.innerHTML = "";

  const { leaves, depth } = layout(game, 0, 0);
  svg = svgEl("svg", {
    width: 2 * MARGIN + leaves * SLOT_WIDTH,
    height: 2 * MARGIN + depth * LEVEL_HEIGHT + 50
  });
  treeDiv.appendChild(svg);

  drawEdges(game);
  drawNodes(game);
}

loadTree(trees.base);





