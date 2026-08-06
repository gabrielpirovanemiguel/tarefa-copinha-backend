// src/use_cases/simulator/simulate-group.ts
var SimulateGroupUseCase = class {
  constructor(teamRepository, matchRepository, standingService) {
    this.teamRepository = teamRepository;
    this.matchRepository = matchRepository;
    this.standingService = standingService;
  }
  teamRepository;
  matchRepository;
  standingService;
  async execute({ groupId, matches }) {
    const teams = await this.teamRepository.findByGroup(groupId);
    const groupMatches = await this.matchRepository.findByGroup(groupId);
    const simulatedMatches = groupMatches.map((match) => ({ ...match }));
    for (const simulation of matches) {
      const match = simulatedMatches.find((m) => m.id === simulation.matchId);
      if (!match) continue;
      match.teamAGoals = simulation.teamAGoals;
      match.teamBGoals = simulation.teamBGoals;
      match.finished = true;
    }
    const standings = this.standingService.calculate(teams, simulatedMatches);
    return {
      standings
    };
  }
};

export {
  SimulateGroupUseCase
};
//# sourceMappingURL=chunk-JYFMQMM4.js.map