import type { Match, Stadium} from "@/@types/prisma/client.js"
import type { MatchWithAllRelations } from "@/use_cases/matches/create_match.js"

interface HTTPMatch {
    id: string
    data: Date
    status: string
    grupo: string
    timeA: string
    timeB: string
    estadio: string
    criadoEm: Date
    atualizadoEm: Date
}

export class MatchPresenter {
    static toHTTP(match: MatchWithAllRelations): HTTPMatch
    static toHTTP(matches: MatchWithAllRelations[]): HTTPMatch[]
    static toHTTP(input: MatchWithAllRelations | MatchWithAllRelations[]): HTTPMatch | HTTPMatch[] {
        if (Array.isArray(input)) {
            return input.map((m) => this.toHTTP(m))
        }

        return {
            id: input.publicId,
            data: input.date,
            status: input.status,
            grupo: input.group.name,
            timeA: input.teamA.name,
            timeB: input.teamB.name,
            estadio: input.stadium.name,
            criadoEm: input.createdAt,
            atualizadoEm: input.updatedAt,
        }
    }
}