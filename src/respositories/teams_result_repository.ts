import type { Prisma, TeamAResult, TeamBResult } from "@/@types/prisma/browser.js";

export interface TeamsResultRepository {
    createTeamAResult(data: Prisma.TeamAResultCreateInput): Promise<TeamAResult>
    createTeamBResult(data: Prisma.TeamBResultCreateInput): Promise<TeamBResult>
}