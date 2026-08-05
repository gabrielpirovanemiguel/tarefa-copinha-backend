import type { Prisma, Team } from "@/@types/prisma/client.js";




export interface TeamRepository {
    createTeam(data: Prisma.TeamCreateInput): Promise<Team>
}