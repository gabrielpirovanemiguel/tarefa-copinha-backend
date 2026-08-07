import type { Prisma, TeamAResult, TeamBResult } from "@/@types/prisma/browser.js";

export interface TeamsResultRepository {
    createTeamAResult(data: Prisma.TeamAResultCreateInput): Promise<TeamAResult>
    createTeamBResult(data: Prisma.TeamBResultCreateInput): Promise<TeamBResult>
    updateTeamAResult(where: Prisma.TeamAResultWhereUniqueInput, data: Prisma.TeamAResultUpdateInput): Promise<TeamAResult>
    updateTeamBResult(where: Prisma.TeamBResultWhereUniqueInput, data: Prisma.TeamBResultUpdateInput): Promise<TeamBResult>
}