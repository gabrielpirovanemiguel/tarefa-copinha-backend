import type { Match, Prisma } from "@/@types/prisma/client.js";
import type { StandingMatch } from "@/services/standings/standings-types.js";

export interface MatchRepository {
    createMatch(data: Prisma.MatchCreateInput, include?: Prisma.MatchInclude): Promise<Match>
    getMatchByPublicId(publicId: string, include?: Prisma.MatchInclude): Promise<Match | null>
    updateMatch(where: Prisma.MatchWhereUniqueInput, data: Prisma.MatchUpdateInput, include?: Prisma.MatchInclude): Promise<Match>
    findByGroup(groupId: number): Promise<StandingMatch[]>;
}