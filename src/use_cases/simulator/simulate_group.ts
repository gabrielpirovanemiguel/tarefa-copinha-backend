import type { MatchRepository } from "@/repositories/match_repository.js";
import type { TeamRepository } from "@/repositories/team_repository.js";
import { StandingService } from "@/services/standings/standings-service.js";

interface SimulationMatch {
  matchId: number;
  teamAGoals: number;
  teamBGoals: number;
}

interface SimulationRequest {
  groupId: number;
  matches: SimulationMatch[];
}

export class SimulateGroupUseCase {
  constructor(
    private teamRepository: TeamRepository,
    private matchRepository: MatchRepository,
    private standingService: StandingService,
  ) {}

  async execute({ groupId, matches }: SimulationRequest) {
    const teams = await this.teamRepository.findByGroup(groupId);

    const groupMatches = await this.matchRepository.findByGroup(groupId);

    // Cópia para não alterar os dados originais
    const simulatedMatches = groupMatches.map((match) => ({ ...match }));

    // Aplica os resultados simulados
    for (const simulation of matches) {
      const match = simulatedMatches.find((m) => m.id === simulation.matchId);

      if (!match) continue;

      match.teamAGoals = simulation.teamAGoals;
      match.teamBGoals = simulation.teamBGoals;

      // O jogo passa a contar na simulação
      match.finished = true;
    }

    const standings = this.standingService.calculate(teams, simulatedMatches);

    return {
      standings,
    };
  }
}
