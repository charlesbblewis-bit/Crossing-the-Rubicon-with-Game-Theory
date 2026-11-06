// defining the two classes in the tree - outcome and decision
class Outcome {
    constructor(label, payoffs) {
        if (typeof label !== "string") throw new Error("An Outcome needs a text label");
        if (typeof payoffs !== "object") throw new Error(`Outcome "${label}" needs payoffs`)
        this.outcome = label;
        this.payoffs = payoffs;
    }
}

class Decision {
    constructor(player, label, actions) {
        if (typeof label !== "string") throw new Error("A Decision needs a text label");
        if (typeof player !== "string") throw new Error(`Decision "${label}" needs a label`);
        if (!actions || Object.keys(actions).lengths === 0) {
            throw new Error(`Decision "${label}" has no actions`)
        }

        for (const [name, child] of Object.entries(actions)) {
            if (!(child instanceof Decision || child instanceof Outcome)) {
                throw new Error(`Action "${name}" in "${label}" must lead to a Decision or an Outcome`);
            }
        }

        this.player = player;
        this.label = label;
        this.actions = actions;
        this.choice = null;
    }
}

