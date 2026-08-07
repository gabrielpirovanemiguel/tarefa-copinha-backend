import { prisma } from "@/libs/prisma.js";
import type { TeamRepository } from "../team_repository.js";
import type { Prisma } from "@/@types/prisma/browser.js";


export class TeamPrismaRepository implements TeamRepository {
    async createTeam(data: Prisma.TeamCreateInput) {
        return await prisma.team.create({ data })
    }
    async findTeamWhereUnique(where: Prisma.TeamWhereUniqueInput, include?: Prisma.TeamInclude) {
        return await prisma.team.findUnique({ where, include })
    }
    async updateTeam(where: Prisma.TeamWhereUniqueInput, data: Prisma.TeamUpdateInput, include?: Prisma.TeamInclude) {
        return await prisma.team.update({ where, data, include })
    }
    async deleteTeam(where: Prisma.TeamWhereUniqueInput) {
        await prisma.team.delete({ where })
    }
    async findByGroup(groupId: number) {
        const teams = await prisma.team.findMany({where: {groupId}})
        return teams.map((team) => ({
            id: team.id,
            publicId: team.publicId,
            name: team.name,
            abbreviation: team.abbreviation,
        }))
    }
}