import { ENTITY_TYPES, LOG_ACTIONS } from "@/@types/prisma/client.js"
import type { MatchRepository } from "@/repositories/match_repository.js"
import { MatchNotFoundError } from "../errors/match_not_found.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"

interface DeleteMatchUseCaseRequest {
    userPublicId: string
    matchPublicId: string
}

export class DeleteMatchUseCase {
    constructor(
        private matchRepository: MatchRepository,
        private logRepository: GenerateLogUseCase
    ) { }
    async execute({
        userPublicId,
        matchPublicId,
    }: DeleteMatchUseCaseRequest): Promise<void> {
        try {
            const doesMatchExist = await this.matchRepository.getMatchByPublicId(matchPublicId)
            if (!doesMatchExist) throw new MatchNotFoundError()
            await this.matchRepository.deleteMatch({ publicId: matchPublicId })
            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.deleting,
                entityType: ENTITY_TYPES.match,
                entityId: doesMatchExist.id,
                description: `Partida com o publicId ${matchPublicId} deletada. O resultado da partida e os resultados dos times associados, se existentes, foram removidos automaticamente.`
            })
        } catch (error) {
            throw error
        }

    }
}
