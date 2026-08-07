import { prisma } from "@/libs/prisma.js";
import type { Prisma } from "@/@types/prisma/browser.js";
import type { MatchResultRepository } from "../match_result_repository.js";

export class MatchResultPrismaRepository implements MatchResultRepository {
    async createMatchResult(data: Prisma.MatchResultCreateInput, include?: Prisma.MatchResultInclude) {
        return await prisma.matchResult.create({ data, include});
    }
    async getMatchResultByPublicId(publicId: string, include?: Prisma.MatchResultInclude) {
        return await prisma.matchResult.findUnique({ where: { publicId }, include });
    }

    async deleteMatchResult(where: Prisma.MatchResultWhereUniqueInput) {
        await prisma.matchResult.delete({ where });
    }
}