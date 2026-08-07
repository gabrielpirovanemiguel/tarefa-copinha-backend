import type { Prisma, Team } from "@/@types/prisma/client.js";
import type { StandingTeam } from "@/services/standings/standings-types.js";




export interface TeamRepository {
    findByGroup(groupId: number): Promise<StandingTeam[]>;
    createTeam(data: Prisma.TeamCreateInput): Promise<Team>
    findTeamWhereUnique(where: Prisma.TeamWhereUniqueInput, include?: Prisma.TeamInclude): Promise<Team | null>
    updateTeam(where: Prisma.TeamWhereUniqueInput, data: Prisma.TeamUpdateInput, include?: Prisma.TeamInclude): Promise<Team>
    deleteTeam(where: Prisma.TeamWhereUniqueInput): Promise<void>
}