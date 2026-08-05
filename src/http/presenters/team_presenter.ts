import type { Team } from "@/@types/prisma/client.js"

interface HTTPTeam {
    id: string
    nome: string
    abreviacao: string
    escudoUrl: string
    posicaoRanking: number
    vitorias: number
    derrotas: number
    empates: number
    golsPro: number
    golsContra: number
    saldoGols: number
    pontos: number
    criadoEm: Date
    atualizadoEm: Date
}

export class TeamPresenter {
    static toHTTP(team: Team): HTTPTeam
    static toHTTP(teams: Team[]): HTTPTeam[]
    static toHTTP(input: Team | Team[]): HTTPTeam | HTTPTeam[] {
        if (Array.isArray(input)) {
            return input.map((t) => this.toHTTP(t))
        }

        return {
            id: input.publicId,
            nome: input.name,
            abreviacao: input.abbreviation,
            escudoUrl: input.shieldImageUrl,
            posicaoRanking: input.rankingPosition,
            vitorias: input.wins,
            derrotas: input.losses,
            empates: input.draws,
            golsPro: input.goalsFor,
            golsContra: input.goalsAgainst,
            saldoGols: input.goalsDifference,
            pontos: input.points,
            criadoEm: input.createdAt,
            atualizadoEm: input.updatedAt,
        }
    }
}