import { ENTITY_TYPES, LOG_ACTIONS } from "@/@types/prisma/client.js"
import type { TeamRepository } from "@/repositories/team_repository.js"
import { TeamNotFoundError } from "../errors/team_not_found.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"

interface DeleteTeamUseCaseRequest {
    userPublicId: string
    teamPublicId: string
}

export class DeleteTeamUseCase {
    constructor(
        private teamRepository: TeamRepository,
        private logRepository: GenerateLogUseCase
    ) { }
    async execute({
        userPublicId,
        teamPublicId,
    }: DeleteTeamUseCaseRequest): Promise<void> {
        try {
            const doesTeamExist = await this.teamRepository.findTeamWhereUnique({ publicId: teamPublicId })
            if (!doesTeamExist) throw new TeamNotFoundError()
            await this.teamRepository.deleteTeam({ publicId: teamPublicId })
            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.deleting,
                entityType: ENTITY_TYPES.team,
                entityId: doesTeamExist.id,
                description: `Time com o publicId ${teamPublicId} deletado.`
            })
        } catch (error) {
            throw error
        }

    }
}
