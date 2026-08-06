import { ENTITY_TYPES, LOG_ACTIONS, type TeamAResult, type TeamBResult } from "@/@types/prisma/client.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"
import type { TeamsResultRepository } from "@/repositories/teams_result_repository.js"

interface CreateTeamResultUseCaseRequest {
    goalsTeam: number
    team: 'A' | 'B'
}

interface CreateTeamResultUseCaseResponse {
    teamResult: TeamAResult | TeamBResult
}

export class CreateTeamResultUseCase {
    constructor(private teamResultRepository: TeamsResultRepository, private logRepository: GenerateLogUseCase) { }
    async execute({ goalsTeam, team }: CreateTeamResultUseCaseRequest): Promise<CreateTeamResultUseCaseResponse> {
        try {
            let teamResult
            if (team === 'A') {
                teamResult = await this.teamResultRepository.createTeamAResult({ goals: goalsTeam })
            } else {
                teamResult = await this.teamResultRepository.createTeamBResult({ goals: goalsTeam })
            }

            await this.logRepository.execute({
                userId: 1,
                action: LOG_ACTIONS.creating,
                entityType: ENTITY_TYPES.teamResult,
                entityId: teamResult.id,
                newValues: goalsTeam,
                description: `Criando um resultado do time ${team}.`
            })

            return { teamResult }
        } catch (error) {
            throw error
        }
    }
}