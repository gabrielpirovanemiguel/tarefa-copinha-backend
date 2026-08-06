import type { MatchResultWithRelations } from "@/use_cases/results/create_match_result.js"

interface HTTPMatchResult {
    id: string
    nomeTimeA: string
    placarTimeA: number
    nomeTimeB: string
    placarTimeB: number
    idPartida: string
    criadoEm: Date
}

export class MatchResultPresenter {
    static toHTTP(matchResult: MatchResultWithRelations): HTTPMatchResult
    static toHTTP(matchesResults: MatchResultWithRelations[]): HTTPMatchResult[]
    static toHTTP(input: MatchResultWithRelations | MatchResultWithRelations[]): HTTPMatchResult | HTTPMatchResult[] {
        if (Array.isArray(input)) {
            return input.map((mr) => this.toHTTP(mr))
        }

        return {
            id: input.publicId,
            nomeTimeA: input.match.teamA.name,
            placarTimeA: input.teamAResult.goals,
            nomeTimeB: input.match.teamB.name,
            placarTimeB: input.teamBResult.goals,
            idPartida: input.match.publicId,
            criadoEm: input.createdAt
        }
    }
}