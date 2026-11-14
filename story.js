"use strict";

const buildSlides = [

  // ---------- Introduction to Game Theory ----------
  {
    note: { title: "Introduction to Game Theory", text: "We can’t see into the mind of Julius Caesar, even those who knew him well disagreed about his motives! 2000 years, we have even less of a chance." }
  },
  {
    note: { title: "Introduction to Game Theory", text: "Game theory, however, provides us a framework to analyse decisions and determine the rationale behind the actions taken. It is used to develop auction theory, match organ donors, even examine the rationale behind penalty kicks in soccer, and, of course, to aid in our understanding of ancient history." }
  },
  {
    note: { title: "Introduction to Game Theory", text: "Naturally it will always rely on certain simplifications and assumptions, but if honest and considered about those choices, it can be a valuable tool for analysis." }
  },
  {
    note: { title: "Introduction to Game Theory", text: "[Add something which goes into more explanation about what game theory is and why it is so useful, practically (e.g. rationality on both sides)]" }
  },

  // ---------- Building the Model ----------
  {   // 5
    note: { title: "Building the Model", text: "We will begin by constructing a simple, sequential game tree to model the choices taken (and not taken) of Caesar and his opponents leading up to the civil war. Even deciding where to start is a difficult choice though!" }
  },
  {   // 6
    note: { title: "Building the Model", text: "One possible place to begin is the vote of the Senate, 370 to 22, in December 50 BC, calling for the joint disarmament of both Caesar and Pompey. The presiding consul at the time, Gaius Claudius Marcellus, hostile to Caesar, chose, however, to invalidate the vote and dismissed the Senate. That decision will be our first node: agree to simultaneous disarmament or demand Caesar disarm alone." },
    reveal:    [ { node: "" }, { edge: "Demand Caesar disarm alone" }, { edge: "Agree to simultaneous disarmament" } ],
    highlight: [ { node: "" }, { edge: "Demand Caesar disarm alone" }, { edge: "Agree to simultaneous disarmament" } ],
    quote: { text: "[Source quote on the 370–22 vote and Marcellus dismissing the Senate]", source: "[Ancient author, work and section]" }
  },
  {   // 7
    note: { title: "Building the Model", text: "In a sequential tree, each ‘player’ takes turns making their decision, so for each of these branches, we need to record what we believe would be Caesar’s response." },
    reveal:    [ { node: "Demand Caesar disarm alone" }, { node: "Agree to simultaneous disarmament" } ],
    highlight: [ { node: "Demand Caesar disarm alone" }, { node: "Agree to simultaneous disarmament" } ]
  },
  {   // 8
    note: { title: "Building the Model", text: "For the sake of simplification, we see two possible options, the same for each branch. Comply with the legal directive or cross the Rubicon and start a civil war." },
    reveal: [
      { edge: "Demand Caesar disarm alone/Comply" }, { edge: "Demand Caesar disarm alone/Cross" },
      { edge: "Agree to simultaneous disarmament/Comply" },  { edge: "Agree to simultaneous disarmament/Cross" }
    ],
    highlight: [
      { edge: "Demand Caesar disarm alone/Comply" }, { edge: "Demand Caesar disarm alone/Cross" },
      { edge: "Agree to simultaneous disarmament/Comply" },  { edge: "Agree to simultaneous disarmament/Cross" }
    ]
  },
  {   // 9
    note: { title: "Building the Model", text: "Now we turn back to the opponents of Caesar. Of course, the idea of one, unified ‘opponents of Caesar’ is itself a major simplification. We know from sources of the many disagreements inside anti-Caesarian camp, and many different motives for opposing him; the more and more complications one adds to the model, though, the harder it becomes to construct and understand. It is also very possible to rationalise that in Caesar’s mind he was being opposed by one, unified faction and that drove his decision making." }
  },
  {   // 10
    note: { title: "Building the Model", text: "The final node of the Opponents we will add is their response if Caesar complies with the demand for his disarmament. With the numerical advantage they could choose to still honour his desire to run for, and likely win, the consulship or use their now military advantage to exploit the situation." },
    reveal: [
      { node: "Demand Caesar disarm alone/Comply" },
      { edge: "Demand Caesar disarm alone/Comply/Honour" }, { edge: "Demand Caesar disarm alone/Comply/Exploit" }
    ],
    highlight: [
      { node: "Demand Caesar disarm alone/Comply" },
      { edge: "Demand Caesar disarm alone/Comply/Honour" }, { edge: "Demand Caesar disarm alone/Comply/Exploit" }
    ]
  },
  {   // 11
    note: { title: "Building the Model", text: "The final things to be added to this tree are the outcomes themselves, and specifically the pay-offs for each camp. It is the payoffs which determine what each side will change, as we assume they act rationally, and so make the choices in order to maximise their own payoffs." }
  },
  {   // 12
    note: { title: "Building the Model", text: "The first outcome we shall look at is that where Caesar is allowed to run for consul. From the sources, including Caesar’s own writings, it is clear that this was his preferred outcome. Given his astounding success in Gaul, and his vast personal riches from the conquest, there is little doubt he would win." },
    reveal:    [ { node: "Demand Caesar disarm alone/Comply/Honour" }, { node: "Agree to simultaneous disarmament/Comply" } ],
    highlight: [ { node: "Demand Caesar disarm alone/Comply/Honour" }, { node: "Agree to simultaneous disarmament/Comply" } ],
    quote: { text: "[A quote from Caesar showing he wanted to stand for the consulship / protect his dignitas]", source: "[Caesar, work and section]" }
  },
  {   // 13
    note: { title: "Building the Model", text: "For the Pompeians though this outcome was unimaginable. They knew the popularity of Caesar with the masses, and from his track record when consul for the first time in 59 BC, many of them feared greatly for their own personal fortunes as well as the survival of the Republic as a whole if he gained power." },
    highlight: [ { node: "Demand Caesar disarm alone/Comply/Honour" }, { node: "Agree to simultaneous disarmament/Comply" } ],
    quote: { text: "[A quote showing Pompey or other anti-Caesarians not wanting Caesar in power, NOT the Atticus letter]", source: "[Author, work and section]" }
  },
  {   // 14
    note: { title: "Building the Model", text: "So to represent those views, if this outcome occurred in the model, Caesar would get a payoff of 4, compared to 1 for his opponents." },
    reveal: [ { payoffs: "Demand Caesar disarm alone/Comply/Honour" }, { payoffs: "Agree to simultaneous disarmament/Comply" } ],
    highlight: [
      { node: "Demand Caesar disarm alone/Comply/Honour" }, { payoffs: "Demand Caesar disarm alone/Comply/Honour" },
      { node: "Agree to simultaneous disarmament/Comply" },         { payoffs: "Agree to simultaneous disarmament/Comply" }
    ]
  },
  {   // 15
    note: { title: "Building the Model", text: "The next outcome to look at is where Caesar chooses to disarm alone and his opponents exploit their military advantage. The payoffs would obviously look very different - Caesar would likely not get any of what he desires, be it the consulship or a triumph for his victories in Gaul. Indeed there is even a chance that he would be prosecuted and exiled, though it that much debated in modern analysis." },
    reveal:    [ { node: "Demand Caesar disarm alone/Comply/Exploit" } ],
    highlight: [ { node: "Demand Caesar disarm alone/Comply/Exploit" } ]
  },
  {   // 16
    note: { title: "Building the Model", text: "For his opponents, this is the ideal outcome, allowing them likely control of the top offices of state with Caesar as a private citizen, and so to reflect the payoffs would be reversed: 1 for Caesar and 4 for his opponents." },
    reveal:    [ { payoffs: "Demand Caesar disarm alone/Comply/Exploit" } ],
    highlight: [ { node: "Demand Caesar disarm alone/Comply/Exploit" }, { payoffs: "Demand Caesar disarm alone/Comply/Exploit" } ]
  },
  {   // 17
    note: { title: "Building the Model", text: "Finally the outcome which actually happened in history - Caesar choosing to cross the Rubicon and launching the Republic into devastating civil war. Of course we know the actual outcome of this decision: Caesar victorious and Pompey dead. But it is important to remember that to analyse these choices we need to look at what most likely outcome of the war before it started. If they could see the future, I’m sure the Pompeians especially would have acted very differently!" },
    reveal:    [ { node: "Demand Caesar disarm alone/Cross" }, { node: "Agree to simultaneous disarmament/Cross" } ],
    highlight: [ { node: "Demand Caesar disarm alone/Cross" }, { node: "Agree to simultaneous disarmament/Cross" } ]
  },
  {   // 18
    note: { title: "Building the Model", text: "The result of the civil war was very much up in the air. Caesar had the advantage of loyal, battle hardened troops, but his opponents had control of Rome [finish, after appropriate research]" },
    highlight: [ { node: "Demand Caesar disarm alone/Cross" }, { node: "Agree to simultaneous disarmament/Cross" } ]
  },
  {   // 19
    note: { title: "Building the Model", text: "[from these quotes etc], we shall give Caesar and his opponents both a payoff of 2." },
    reveal:    [ { payoffs: "Demand Caesar disarm alone/Cross" }, { payoffs: "Agree to simultaneous disarmament/Cross" } ],
    highlight: [
      { node: "Demand Caesar disarm alone/Cross" }, { payoffs: "Demand Caesar disarm alone/Cross" },
      { node: "Agree to simultaneous disarmament/Cross" },  { payoffs: "Agree to simultaneous disarmament/Cross" }
    ]
  },
  {   // 20
    note: { title: "Building the Model", text: "It is important to note that the absolute magnitude of these payoffs do not matter, but their relative magnitude compared to the other outcomes very much does. Assuming rationality means whether the payoff of two outcomes are 100 compared to 1, or 2 compared to 1, the same choice will be made every time." }
  },
  {   // 21
    note: { title: "Building the Model", text: "Let's look at one important choice in terms of relative payoffs: that the Pompeian camps would prefer civil war compared to allowing Caesar to become consul. The key evidence for this is in a letter to Cicero from his friend Atticus, where he tells of a conversation he had with Pompey." },
    highlight: [
      { node: "Demand Caesar disarm alone/Comply/Honour" }, { payoffs: "Demand Caesar disarm alone/Comply/Honour" },
      { node: "Agree to simultaneous disarmament/Comply" },         { payoffs: "Agree to simultaneous disarmament/Comply" },
      { node: "Demand Caesar disarm alone/Cross" },         { payoffs: "Demand Caesar disarm alone/Cross" },
      { node: "Agree to simultaneous disarmament/Cross" },          { payoffs: "Agree to simultaneous disarmament/Cross" }
    ],
    quote: { text: "[The Pompey quote]", source: "[Cicero, Att. 7.8 (26 Dec 50)]" }
  },

  // ---------- Solving the Model ----------
  {   // 22
    note: { title: "Solving the Model", text: "With the tree now constructed, it is time to figure out the modelled outcome! The way to solve a sequential game tree is to work from the bottom up. Because we assume rationality, for a decision where the payoffs for each outcome is known, we know what choice the player will make (maximise their payoff). The other player then knows that if they allow their opponent to have that decision, what their own payoff will be as well." }
  },
  {   // 23
    note: { title: "Solving the Model", text: "Looking at the honour and exploit node for example, the Pompeian faction will always choose to exploit their advantage here, and so Caesar knows what his own payoff will be if he lets them make that decision. To solve the tree, simply work from the bottom until the payoffs of the initial decisions are known. Now click the solve bottom, and be guided through the process!" },
    highlight: [
      { node: "Demand Caesar disarm alone/Comply" },
      { edge: "Demand Caesar disarm alone/Comply/Honour" }, { edge: "Demand Caesar disarm alone/Comply/Exploit" },
      { node: "Demand Caesar disarm alone/Comply/Honour" }, { payoffs: "Demand Caesar disarm alone/Comply/Honour" },
      { node: "Demand Caesar disarm alone/Comply/Exploit" }, { payoffs: "Demand Caesar disarm alone/Comply/Exploit" }
    ]
  }

];