import type { Prisma, MatchResult } from "@/@types/prisma/browser.js";

export interface MatchResultRepository {
    createMatchResult(data: Prisma.MatchResultCreateInput, include?: Prisma.MatchResultInclude): Promise<MatchResult>
}