import type { StandingMatch } from "@/services/standings/standings-types.js";

export interface MatchRepository {
  findByGroup(groupId: number): Promise<StandingMatch[]>;
}
