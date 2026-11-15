function baseTree() {
  const consul   = new Outcome("Caesar consul",    { Caesar: 4, Opponents: 1 });
  const shutOut  = new Outcome("Caesar shut out",  { Caesar: 1, Opponents: 4 });
  const war1     = new Outcome("War",              { Caesar: 2, Opponents: 2 });
  const war2     = new Outcome("War",              { Caesar: 2, Opponents: 2 });
  const bothDown = new Outcome("Caesar consul", { Caesar: 4, Opponents: 1 });

  const afterComply = new Decision("Opponents", "Caesar has disarmed alone", { Honour: consul, Exploit: shutOut });
  const caesarAlone = new Decision("Caesar", "Demand: Caesar disarms alone", { Comply: afterComply, Cross: war1 });
  const caesarBoth  = new Decision("Caesar", "Demand: both disarm",          { Comply: bothDown,    Cross: war2 });

  return new Decision("Opponents", "Choose the demand", { "Demand Caesar disarm alone": caesarAlone, "Agree to simultaneous disarmament": caesarBoth });
}

function pompeyNoWar() {
  const consul   = new Outcome("Caesar consul",    { Caesar: 3, Opponents: 1 });
  const shutOut  = new Outcome("Caesar shut out",  { Caesar: 1, Opponents: 4 });
  const war1     = new Outcome("War",              { Caesar: 2, Opponents: 0 });
  const war2     = new Outcome("War",              { Caesar: 2, Opponents: 0 });
  const bothDown = new Outcome("Caesar consul", { Caesar: 3, Opponents: 1 });

  const afterComply = new Decision("Opponents", "Caesar has disarmed alone", { Honour: consul, Exploit: shutOut });
  const caesarAlone = new Decision("Caesar", "Demand: Caesar disarms alone", { Comply: afterComply, Cross: war1 });
  const caesarBoth  = new Decision("Caesar", "Demand: both disarm",          { Comply: bothDown,    Cross: war2 });

  return new Decision("Opponents", "Choose the demand", { "Demand Caesar disarm alone": caesarAlone, "Agree to simultaneous disarmament": caesarBoth });
}

const trees = {
    base : baseTree(),
    pompeyNoWar : pompeyNoWar()
};