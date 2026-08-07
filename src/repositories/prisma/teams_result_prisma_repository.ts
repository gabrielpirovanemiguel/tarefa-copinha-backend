import { prisma } from "@/libs/prisma.js";
import type { Prisma } from "@/@types/prisma/browser.js";
import type { TeamsResultRepository } from "../teams_result_repository.js";



export class TeamsResultPrismaRepository implements TeamsResultRepository {
    async createTeamAResult(data: Prisma.TeamAResultCreateInput) {
        return await prisma.teamAResult.create({ data });
    }

    async createTeamBResult(data: Prisma.TeamBResultCreateInput) {
        return await prisma.teamBResult.create({ data });
    }

    async updateTeamAResult(where: Prisma.TeamAResultWhereUniqueInput, data: Prisma.TeamAResultUpdateInput) {
        return await prisma.teamAResult.update({ where, data });
    }

    async updateTeamBResult(where: Prisma.TeamBResultWhereUniqueInput, data: Prisma.TeamBResultUpdateInput) {
        return await prisma.teamBResult.update({ where, data });
    }
}