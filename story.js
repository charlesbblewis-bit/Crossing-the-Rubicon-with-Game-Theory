"use strict";

// Beats without an `image` keep the previous image on screen.
const historyBeats = [
  // Drawing 1 (Caesar victorious in Gaul)
  { image: "images/gaul.jpg",
    text: "In 52 BC, Julius Caesar is victorious, Gaul is, for the most part, conquered. Back in Rome, 20 days of thanksgiving are declared by the Senate." },
  { text: "After almost a decade of campaigning, Caesar is starting to look towards the future. A well-deserved triumph and his second consulship, as is right for a man so popular with the Roman people." },

  // Drawing 2 (Pompey in the Senate)
  { image: "images/rome.png",
    text: "While Caesar has been campaigning, however, Rome is in chaos. After the murder of Publius Clodius Pulcher and the resulting street violence, Pompey, the other leading man of Rome, is declared sole consul." },
  { text: "Once a great ally of Caesar’s, and his son-in-law, their relationship had started to break down. Pompey has drifted towards the conservatives, or <em>optimates</em>, who fear Caesar’s triumphant return to Rome as a grave threat to their power and the constitutional norms of the Republic." },
  { text: "To his enemies, Caesar is an existential risk. Already in his first consulship, they say, had he subverted traditions and forced through his laws - they could not allow him to return to Rome as a triumphant conqueror and claim the highest office of state." },

  // Drawing 3 (Caesar at the Rubicon)
  { image: "images/triumph.jpg",
    text: "Caesar’s allies pushed for joint disarmament of him and Pompey, while his enemies, more powerful in Rome, wanted him stripped of his <em>imperium</em> in the provinces early and forced to return home as a private citizen." },
  { text: "The door to the consulship was closing for Caesar, and so in January 49 BC, he chose to cross the Rubicon and launch Rome into civil war. What drove him to make that fateful decision, perhaps game theory can help explain." }
];

const buildSlides = [
  // ---------- Introduction to Game Theory ----------
  {
    note: { title: "Introduction to Game Theory", text: "We can’t see into the mind of Julius Caesar, even those who knew him well disagreed about his motives! After 2000 years, we have even less of a chance." },
    images: [
    { src: "images/Caesar 1.png", position: "right", width: "20vw", alt: "Julius Caesar" }
    ]
  },

  {
    note: { title: "Introduction to Game Theory", text: "Game theory, however, provides us a framework to analyse decisions. The idea isn’t new. Thucydides explained decisions by the incentives and expectations of the players, and even Cicero examined the possible choices of the Senate in 49 BC through a similar lens." },
    images: [
    { src: "images/nash.jpg", position: "right", width: "20vw", alt: "John Nash", caption: "John Nash, one of the fathers of game theory" }
    ]
  },
  {
    note: { title: "Introduction to Game Theory", text: "What game theory does is state the parameters and payoffs precisely. It forces the assumptions into the open, so you can ask which payoff or move order, if changed, would change the outcome. Naturally it will always rely on certain simplifications and assumptions, but if we are honest and considered about those choices, it can be a valuable tool for analysis to aid our understanding of the distant past." },
    images: [
    { src: "images/chess.jpg", position: "left", width: "20vw", alt: "Chess pieces"}
    ]
  },

  // ---------- Building the Model ----------
  {   // 5
    note: { title: "Building the Model", text: "We will begin by constructing a simple, sequential game tree to model the choices taken (and not taken) by Caesar and his opponents leading up to the civil war." }
  },
  {   // 6
    note: { title: "Building the Model", text: "One possible place to begin is the vote of the Senate, 370 to 22, in December 50 BC, calling for the joint disarmament of both Caesar and Pompey. The presiding consul at the time, Gaius Claudius Marcellus, hostile to Caesar, chose to invalidate the vote and dismiss the Senate. That decision will be our first node: ‘Agree to simultaneous disarmament’ or ‘Demand Caesar disarm alone’." },
    reveal:    [ { node: "" }, { edge: "Demand Caesar disarm alone" }, { edge: "Agree to simultaneous disarmament" } ],
    highlight: [ { node: "" }, { edge: "Demand Caesar disarm alone" }, { edge: "Agree to simultaneous disarmament" } ],
    quote: { text: "Then Curio put the question whether both should lay down their commands, and 22 senators voted in the negative while 370 went back to the opinion of Curio in order to avoid civil discord. Claudius then dismissed the Senate, exclaiming, \"Enjoy your victory and have Caesar for a master.\"", source: "Appian, The Civil Wars, 2.30" }
  },
  {   // 7
    note: { title: "Building the Model", text: "In a sequential tree, each ‘player’ takes turns making their decision, so for each of these branches, we need to record what we believe would be Caesar’s response." },
    reveal:    [ { node: "Demand Caesar disarm alone" }, { node: "Agree to simultaneous disarmament" } ],
    highlight: [ { node: "Demand Caesar disarm alone" }, { node: "Agree to simultaneous disarmament" } ]
  },
  {   // 8
    note: { title: "Building the Model", text: "For the sake of simplification, there are two possible options, the same for each branch: ‘Comply’ with the directive from Rome, or ‘Cross’ the Rubicon and start a civil war." },
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
    note: { title: "Building the Model", text: "Now we turn back to the opponents of Caesar. The idea of one, unified ‘opponents of Caesar’ is itself a major simplification. We know from sources of the many disagreements inside the anti-Caesarian camp, and the many different motives for opposing him. The more complications one adds to the model, though, the harder it becomes to construct and understand, and in the end, they did all act together." }
  },
  {   // 10
    note: { title: "Building the Model", text: "The final node of the ‘Opponents’ we will add is their response if Caesar complies with the demand for his sole disarmament. With their military advantage now secured, they could ‘Exploit’ the situation and deny Caesar, or they could ‘Honour’ his desire to run for, and likely win, the consulship." },
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
    note: { title: "Building the Model", text: "The final parts to be added to this tree are the outcomes themselves, and specifically the payoffs for each camp. It is the payoffs which determine what each side will choose, as a key assumption of game theory is that each side acts so as to maximise their own payoffs." }
  },
  {   // 12
    note: { title: "Building the Model", text: "The first outcome we shall look at is that where Caesar is allowed to run for consul. From the sources, including Caesar’s own writings, it is clear that this was his desired outcome. Given his success in Gaul, and his vast personal riches from the conquest, there was little doubt he would win." },
    reveal:    [ { node: "Demand Caesar disarm alone/Comply/Honour" }, { node: "Agree to simultaneous disarmament/Comply" } ],
    highlight: [ { node: "Demand Caesar disarm alone/Comply/Honour" }, { node: "Agree to simultaneous disarmament/Comply" } ],
    quote: { text: "He further proposed a compromise to his opponents, that after giving up eight legions and Transalpine Gaul, he be allowed to keep two legions and Cisalpine Gaul, or at least one legion and Illyricum, until he was elected consul.", source: "Suetonius, Life of Julius Caesar, 29" }
  },
  {   // 13
    note: { title: "Building the Model", text: "For a large number of the Pompeians though, this outcome was unimaginable. They knew the popularity of Caesar with the masses, and from his track record when consul in 59 BC, many of them feared greatly for their own personal fortunes as well as the survival of the Republic as a whole if he gained power." },
    highlight: [ { node: "Demand Caesar disarm alone/Comply/Honour" }, { node: "Agree to simultaneous disarmament/Comply" } ]
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
    note: { title: "Building the Model", text: "The next outcome to look at is where Caesar chooses to disarm alone and his opponents exploit their military advantage. The payoffs would obviously look very different. Caesar would likely not get any of what he desires, be it the consulship or a triumph for his victories in Gaul. Indeed there is even a possibility that he would be prosecuted and exiled, though that is much debated by modern scholars." },
    reveal:    [ { node: "Demand Caesar disarm alone/Comply/Exploit" } ],
    highlight: [ { node: "Demand Caesar disarm alone/Comply/Exploit" } ]
  },
  {   // 16
    note: { title: "Building the Model", text: "For his opponents, this is their ideal outcome, allowing them continued control of the top offices of state, and so to reflect this, the payoffs would be reversed: 1 for Caesar and 4 for his opponents." },
    reveal:    [ { payoffs: "Demand Caesar disarm alone/Comply/Exploit" } ],
    highlight: [ { node: "Demand Caesar disarm alone/Comply/Exploit" }, { payoffs: "Demand Caesar disarm alone/Comply/Exploit" } ]
  },
  {   // 17
    note: { title: "Building the Model", text: "Finally, the outcome which actually happened in history: Caesar choosing to cross the Rubicon and launching the Republic into devastating civil war. Of course we know the actual result of this decision: Caesar victorious and Pompey dead. But it is important to remember that to analyse these choices we need to look at what the actors themselves thought the most likely outcome to be. If they could actually see the future, I’m sure the Pompeians especially would have acted very differently!" },
    reveal:    [ { node: "Demand Caesar disarm alone/Cross" }, { node: "Agree to simultaneous disarmament/Cross" } ],
    highlight: [ { node: "Demand Caesar disarm alone/Cross" }, { node: "Agree to simultaneous disarmament/Cross" } ]
  },
  {   // 18
    note: { title: "Building the Model", text: "The expected result of the civil war was very much up in the air. Both sides appeared confident, at least from later writings. In Cicero’s letters during the crisis of 49 BC, he speaks of his confidence in military victory against Caesar, and yet Pompey’s decision to abandon Rome for the east indicates fear of facing Caesar’s far more seasoned army." },
    highlight: [ { node: "Demand Caesar disarm alone/Cross" }, { node: "Agree to simultaneous disarmament/Cross" } ]
  },
  {   // 19
    note: { title: "Building the Model", text: "Accordingly, we shall give both Caesar and his opponents a payoff of 2." },
    reveal:    [ { payoffs: "Demand Caesar disarm alone/Cross" }, { payoffs: "Agree to simultaneous disarmament/Cross" } ],
    highlight: [
      { node: "Demand Caesar disarm alone/Cross" }, { payoffs: "Demand Caesar disarm alone/Cross" },
      { node: "Agree to simultaneous disarmament/Cross" },  { payoffs: "Agree to simultaneous disarmament/Cross" }
    ]
  },
  {   // 20
    note: { title: "Building the Model", text: "It is important to note that the absolute size of these payoffs does not matter, but their relative magnitude compared to the other outcomes very much does. Assuming rationality, whether the payoffs of two outcomes are 100 compared to 1, or 2 compared to 1, the same choice will be made each time." }
  },
  {   // 21
    note: { title: "Building the Model", text: "Let’s look at one important assumption in terms of relative payoffs: that the Pompeian camp would prefer civil war to allowing Caesar to become consul. An important piece of evidence for this is in a letter from Cicero to his friend Atticus." },
    highlight: [
      { node: "Demand Caesar disarm alone/Comply/Honour" }, { payoffs: "Demand Caesar disarm alone/Comply/Honour" },
      { node: "Agree to simultaneous disarmament/Comply" },         { payoffs: "Agree to simultaneous disarmament/Comply" },
      { node: "Demand Caesar disarm alone/Cross" },         { payoffs: "Demand Caesar disarm alone/Cross" },
      { node: "Agree to simultaneous disarmament/Cross" },          { payoffs: "Agree to simultaneous disarmament/Cross" }
    ],
    quote: { text: "For your query as to the chance of a peaceful settlement, so far as I could tell from Pompey's full and detailed discourse, he does not even want peace. Pompey thinks that the constitution will be subverted even if Caesar is elected consul without an army;", source: "Cicero, Letters to Atticus, 7.8" }
  },

  // ---------- Solving the Model ----------
  {   // 22
    note: { title: "Solving the Model", text: "With the tree now constructed, it is time to determine the modelled outcome! The way to solve a sequential game tree is to work from the bottom up. Because we assume rationality, for a decision where the payoffs for each outcome are known, we know what choice the player will make. The other player then knows that if they allow their opponent to have that decision, what their own payoff will be as well." }
  },
  {   // 23
    note: { title: "Solving the Model", text: "Looking at the ‘Honour’ or ‘Exploit’ node for example, the Pompeian faction will always choose to ‘Exploit’ their advantage here, and so Caesar knows what his own payoff will be if he lets them have that option. To solve the tree, simply work from the bottom up until the payoffs of the initial decisions are known." },
    highlight: [
      { node: "Demand Caesar disarm alone/Comply" },
      { edge: "Demand Caesar disarm alone/Comply/Honour" }, { edge: "Demand Caesar disarm alone/Comply/Exploit" },
      { node: "Demand Caesar disarm alone/Comply/Honour" }, { payoffs: "Demand Caesar disarm alone/Comply/Honour" },
      { node: "Demand Caesar disarm alone/Comply/Exploit" }, { payoffs: "Demand Caesar disarm alone/Comply/Exploit" }
    ]
  }

];


// Slides 24-25. The explain phase loads tree 2 (pompeyNoWar) for the whole deck.
// Highlight paths must match the action names used in pompeyNoWar().
const explainSlides = [
  { note: { title: "Peace Above All Model", text: "Now let’s see how changing an assumption could change the modelled outcome. A key choice was to have Caesar’s opponents rank civil war as preferable to allowing him to return triumphant to Rome and become consul." },
    highlight: [
      { node: "Demand Caesar disarm alone/Comply/Honour" }, { payoffs: "Demand Caesar disarm alone/Comply/Honour" },
      { node: "Agree to simultaneous disarmament/Comply" },         { payoffs: "Agree to simultaneous disarmament/Comply" },
      { node: "Demand Caesar disarm alone/Cross" },         { payoffs: "Demand Caesar disarm alone/Cross" },
      { node: "Agree to simultaneous disarmament/Cross" },          { payoffs: "Agree to simultaneous disarmament/Cross" }
    ] },
  { note: { title: "Peace Above All Model", text: "If we flipped that assumption, could that have led to a different outcome? Solve the model again, and see what changes!" },
    highlight: [
      { node: "Demand Caesar disarm alone/Comply/Honour" }, { payoffs: "Demand Caesar disarm alone/Comply/Honour" },
      { node: "Agree to simultaneous disarmament/Comply" },         { payoffs: "Agree to simultaneous disarmament/Comply" },
      { node: "Demand Caesar disarm alone/Cross" },         { payoffs: "Demand Caesar disarm alone/Cross" },
      { node: "Agree to simultaneous disarmament/Cross" },          { payoffs: "Agree to simultaneous disarmament/Cross" }
    ] }
];

// Slides 27-31, shown after tree 2 is solved.
const conclusionSlides = [
  { note: { title: "Peace Above All Model", text: "Thus, according to this model, while Caesar was the one who crossed the Rubicon, war potentially could have been avoided if there was a strong desire for peace among his opponents." } },
  { note: { title: "Peace Above All Model", text: "That outcome actually is supported by a letter of Cicero, as he discusses his fruitless attempts to maintain peace." },
    quote: { text: "I desired to find a cure for this, and, as I think, could have done so; but I was hindered by the passions of particular people, for on both sides there are those who desire to fight.", source: "Cicero, Letters to Friends, 16.11" } },
  { note: { title: "Peace Above All Model", text: "That kind of insight shows the potential power of game theory. In this case, with a highly simplified model and a very complex situation, it may not be wholly persuasive, but the logic can be expanded to more closely fit the historical event, thus providing more convincing analysis." } },
  { note: { title: "Peace Above All Model", text: "By giving a structure and framework to these historical events, game theory can do two things: provide a clear and logical explanation for something which feels intuitively correct (like we did here!), but also, occasionally, throw up a result which goes against our initial impressions. Sometimes it may be simply due to a quirk in the model, but other times it could lead us to reexamine the sources and view the history in a new way." } },
  { note: { title: "Peace Above All Model", text: "Game theory is used today in so many applications, from matching organ donors, informing nuclear deterrence or even analysing penalty kicks in soccer, so why not let it help us better understand our past!" } }
];