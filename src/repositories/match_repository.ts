import type { Match, Prisma, STATUS_MATCH } from "@/@types/prisma/client.js";
import type { StandingMatch } from "@/services/standings/standings-types.js";
import type { MatchWithAllRelations } from "@/use_cases/matches/create_match.js";

export interface MatchRepository {
    createMatch(data: Prisma.MatchCreateInput, include?: Prisma.MatchInclude): Promise<Match>
    getMatchByPublicId(publicId: string, include?: Prisma.MatchInclude): Promise<Match | null>
    findByGroup(groupId: number): Promise<StandingMatch[]>;
    listByGroup(groupId: number) : Promise<Match[]>
    filterByStatus(status?: STATUS_MATCH) : Promise<Match[]>
    getMatchDetails(publicId: string) : Promise<MatchWithAllRelations | null>
}