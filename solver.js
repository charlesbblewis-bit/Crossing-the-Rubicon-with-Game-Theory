function solve(tree) {
  const order = [];
  const outcome = solveNode(tree, order);
  const path = [];
  let node = tree;
  while(node instanceof Decision) {
    path.push({node, action: node.choice});
    node = node.actions[node.choice];
  }
  return { outcome, path, order };
}

function solveNode(node, order) {
    if (node instanceof Outcome) {
        return node
    }
    if (node instanceof Decision) {
        let maxOutcome = null;
        let bestAction = null;
        for (const pair of Object.entries(node.actions)) {
            const currentOutcome = solveNode(pair[1], order);
            const currentAction = pair[0];
            if (maxOutcome == null) {
                maxOutcome = currentOutcome;
                bestAction = currentAction;
            }
            else {
                /////// LOOOOOK INTO TIES 
                if (currentOutcome.payoffs[node.player] > maxOutcome.payoffs[node.player]) {
                    maxOutcome = currentOutcome;
                    bestAction = currentAction;
                }
            }
        }
        node.choice = bestAction;
        node.value = maxOutcome;
        order.push({ node: node, action: bestAction, outcome: maxOutcome });
        return maxOutcome;
    }
}