import { prisma } from "@/libs/prisma.js";
import type { Prisma } from "@/@types/prisma/browser.js";
import type { MatchRepository } from "../match_repository.js";


export class MatchPrismaRepository implements MatchRepository {
    async createMatch(data: Prisma.MatchCreateInput, include?: Prisma.MatchInclude) {
        return await prisma.match.create({ data, include })
    } 


    async getMatchByPublicId(publicId: string, include?: Prisma.MatchInclude) {
        return await prisma.match.findUnique({ where: { publicId }, include: include})
    }
}