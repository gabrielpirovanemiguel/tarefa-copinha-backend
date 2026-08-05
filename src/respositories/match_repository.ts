import type { Match, Prisma} from "@/@types/prisma/client.js";

export interface MatchRepository {
    createMatch(data: Prisma.MatchCreateInput, include?: Prisma.MatchInclude): Promise<Match>
}