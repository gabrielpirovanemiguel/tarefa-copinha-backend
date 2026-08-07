import { prisma } from "@/libs/prisma.js";
import type { Prisma, STATUS_MATCH } from "@/@types/prisma/client.js";
import type { MatchRepository } from "../match_repository.js";


export class MatchPrismaRepository implements MatchRepository {
    async createMatch(data: Prisma.MatchCreateInput, include?: Prisma.MatchInclude) {
        return await prisma.match.create({ data, include })
    }


    async getMatchByPublicId(publicId: string, include?: Prisma.MatchInclude) {
        return await prisma.match.findUnique({ where: { publicId }, include: include })
    }

    async findByGroup(groupId: number) {
        const matches = await prisma.match.findMany({
            where: {
                groupId,
            },
            include: {
                matchResult: {
                    include: {
                        teamAResult: true,
                        teamBResult: true,
                    },
                },
            },
        });

        return matches.map((match) => ({
            id: match.id,

            teamAId: match.teamAId,
            teamBId: match.teamBId,

            teamAGoals: match.matchResult?.teamAResult.goals ?? 0,
            teamBGoals: match.matchResult?.teamBResult.goals ?? 0,

            finished: match.status === "encerrado",
        }));
    }

    async listByGroup(groupId: number){
        const matches = await prisma.match.findMany({where: { groupId }})
        return matches 
    }

    async filterByStatus(status?: STATUS_MATCH){
       const matches = await prisma.match.findMany({
        where: status ? { status } : {},
       });
       return matches
    }

    async getMatchDetails(publicId: string){
        const match = await prisma.match.findUnique({
            where: {
                publicId,
            },
            include: {
                group: true,
                teamA: true,
                teamB: true,
                stadium: true,
            },
        });
        return match
    }

}