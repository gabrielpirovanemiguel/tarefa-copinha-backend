import { ENTITY_TYPES, LOG_ACTIONS } from "@/@types/prisma/client.js"
import type { MatchResultRepository } from "@/repositories/match_result_repository.js"
import { MatchResultNotFoundError } from "../errors/match_result_not_found.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"

interface DeleteMatchResultUseCaseRequest {
    userPublicId: string
    matchResultPublicId: string
}

export class DeleteMatchResultUseCase {
    constructor(
        private matchResultRepository: MatchResultRepository,
        private logRepository: GenerateLogUseCase
    ) { }
    async execute({
        userPublicId,
        matchResultPublicId,
    }: DeleteMatchResultUseCaseRequest): Promise<void> {
        try {
            const doesMatchResultExist = await this.matchResultRepository.getMatchResultByPublicId(matchResultPublicId)
            if (!doesMatchResultExist) throw new MatchResultNotFoundError()
            // O trigger "trg_delete_orphan_team_results" cuida de deletar automaticamente
            // os registros de TeamAResult e TeamBResult associados a este MatchResult.
            await this.matchResultRepository.deleteMatchResult({ publicId: matchResultPublicId })
            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.deleting,
                entityType: ENTITY_TYPES.matchResult,
                entityId: doesMatchResultExist.id,
                description: `Resultado de partida com o publicId ${matchResultPublicId} deletado.`
            })
        } catch (error) {
            throw error
        }

    }
}
