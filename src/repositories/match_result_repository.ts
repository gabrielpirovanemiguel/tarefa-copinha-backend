import type { Prisma, MatchResult } from "@/@types/prisma/browser.js";

export interface MatchResultRepository {
    createMatchResult(data: Prisma.MatchResultCreateInput, include?: Prisma.MatchResultInclude): Promise<MatchResult>
    getMatchResultByPublicId(publicId: string, include?: Prisma.MatchResultInclude): Promise<MatchResult | null>
    deleteMatchResult(where: Prisma.MatchResultWhereUniqueInput): Promise<void>
}