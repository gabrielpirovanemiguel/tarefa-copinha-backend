import { prisma } from "@/libs/prisma.js";
import type { TeamRepository } from "../team_repository.js";
import type { Prisma } from "@/@types/prisma/browser.js";


export class TeamPrismaRepository implements TeamRepository {
    async createTeam(data: Prisma.TeamCreateInput) {
        return await prisma.team.create({ data })
    } 
}