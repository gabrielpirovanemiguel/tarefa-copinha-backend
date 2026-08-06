import type { StandingTeam } from "@/services/standings/standings-types.js";

export interface TeamRepository {
  findByGroup(groupId: number): Promise<StandingTeam[]>;
}
