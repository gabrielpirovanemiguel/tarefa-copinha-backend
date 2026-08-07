import { ENTITY_TYPES, LOG_ACTIONS, Prisma } from "@/@types/prisma/client.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"
import { MatchResultNotFoundError } from "../errors/match_result_not_found.js"
import type { MatchResultRepository } from "@/repositories/match_result_repository.js"
import type { TeamsResultRepository } from "@/repositories/teams_result_repository.js"
import type { MatchResultWithRelations } from "./create_match_result.js"

interface UpdateMatchResultUseCaseRequest {
    userPublicId: string
    matchResultPublicId: string
    teamAGols?: number
    teamBGols?: number
}

interface UpdateMatchResultUseCaseResponse {
    matchResult: MatchResultWithRelations
}

const matchResultInclude = {
    teamAResult: true,
    teamBResult: true,
    match: { include: { teamA: true, teamB: true } }
} satisfies Prisma.MatchResultInclude

export class UpdateMatchResultUseCase {
    constructor(
        private matchResultRepository: MatchResultRepository,
        private teamsResultRepository: TeamsResultRepository,
        private logRepository: GenerateLogUseCase,
    ) { }
    async execute({ userPublicId, matchResultPublicId, teamAGols, teamBGols }: UpdateMatchResultUseCaseRequest): Promise<UpdateMatchResultUseCaseResponse> {
        try {
            const doesMatchResultExist = await this.matchResultRepository.getMatchResultByPublicId(matchResultPublicId, matchResultInclude) as MatchResultWithRelations
            if (!doesMatchResultExist) throw new MatchResultNotFoundError()

            if (teamAGols !== undefined) {
                await this.teamsResultRepository.updateTeamAResult({ id: doesMatchResultExist.teamAResultId }, { goals: teamAGols })
            }
            if (teamBGols !== undefined) {
                await this.teamsResultRepository.updateTeamBResult({ id: doesMatchResultExist.teamBResultId }, { goals: teamBGols })
            }

            const matchResult = await this.matchResultRepository.getMatchResultByPublicId(matchResultPublicId, matchResultInclude) as MatchResultWithRelations

            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.updating,
                entityType: ENTITY_TYPES.matchResult,
                entityId: matchResult.id,
                oldValues: doesMatchResultExist,
                newValues: matchResult,
                description: `Resultado de partida com o publicId ${matchResultPublicId} atualizado.`
            })

            return { matchResult }
        } catch (error) {
            throw error
        }
    }
}
