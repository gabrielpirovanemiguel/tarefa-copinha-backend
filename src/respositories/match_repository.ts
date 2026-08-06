import type { Match, Prisma} from "@/@types/prisma/client.js";

export interface MatchRepository {
    createMatch(data: Prisma.MatchCreateInput, include?: Prisma.MatchInclude): Promise<Match>
    getMatchByPublicId(publicId: string, include?: Prisma.MatchInclude): Promise<Match | null>
}