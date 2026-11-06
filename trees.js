function baseTree() {
  const consul = new Outcome("Caesar becomes consul", { Caesar: 3, Opponents: 1 });
  const ruined = new Outcome("Caesar is eaten alive",      { Caesar: 1, Opponents: 3 });
  const war    = new Outcome("War",                   { Caesar: 2, Opponents: 2 });

  const opponentsDecide = new Decision("Opponents", "Caesar has been eaten alive",
    { Honour: consul, Exploit: ruined });

  return new Decision("Caesar", "Senate's demand: disband by a fixed date",
    { Comply: opponentsDecide, Cross: war });
}

const trees = {
    base : baseTree()
};