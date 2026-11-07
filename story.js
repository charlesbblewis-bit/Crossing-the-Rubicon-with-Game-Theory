const buildSlides = [
  {
    text: "Game theory",
    note: {
      title: "INSERT",
      text: "<p>INSERT</p>"
    },
  },

    {
    text: "Game Theory",
    note: {
      title: "INSERT",
      text: "<p>We shall build a tree which examines the choices of Caesar and his opponents (Pompey and much of the Senatorial elite)</p>"
    },
  },

  {
    text: "INSERT",
    quote: { text: "[exact words from your edition]", source: "INSERT" },
    highlight: [ { payoff: "Comply/Honour", player: "Opponents" },
                 { payoff: "Cross",         player: "Opponents" } ],
  },
  {
    text: "INSERT",
    reveal: [ { node: "" } ],
  },
  {
    text: "INSERT",
    reveal: [ { edge: "Cross" }, { node: "Cross" } ],
  },
  {
    text: "INSERT",
    reveal: [ { edge: "Comply" }, { node: "Comply" } ],
  },
  {
    text: "INSERT",
    reveal: [ { edge: "Comply/Honour" }, { node: "Comply/Honour" },
              { edge: "Comply/Exploit" }, { node: "Comply/Exploit" } ],
  },
  {
    text: "INSERT",
    reveal: [ { payoffs: "Cross" }, { payoffs: "Comply/Honour" }, { payoffs: "Comply/Exploit" } ],
  },
  {
    text: "INSERT",
    quote: { text: "[exact words from your edition]", source: "INSERT" },
    highlight: [ { payoff: "Comply/Honour", player: "Opponents" },
                 { payoff: "Cross",         player: "Opponents" } ],
  },
];