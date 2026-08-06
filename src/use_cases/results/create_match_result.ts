import { ENTITY_TYPES, LOG_ACTIONS, Prisma } from "@/@types/prisma/client.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"
import { MatchNotFoundError } from "../errors/match_not_found.js"
import type { MatchResultRepository } from "@/repositories/match_result_repository.js"
import type { MatchRepository } from "@/repositories/match_repository.js"
import { makeCreateTeamsResultUseCase } from "../factories/results/make_create_teams_result.js"
import { MatchResultAlreadyExistsError } from "../errors/match_result_already_exists.js"


interface CreateMatchResultUseCaseRequest {
    userPublicId: string
    teamAGols: number
    teamBGols: number
    matchPublicId: string
}

interface CreateMatchResultUseCaseResponse {
    matchResult: MatchResultWithRelations
}


const matchResultInclude = {
    teamAResult: true,
    teamBResult: true,
    match: { include: { teamA: true, teamB: true } }
} satisfies Prisma.MatchResultInclude

export type MatchResultWithRelations = Prisma.MatchResultGetPayload<{ include: typeof matchResultInclude }>

export class CreateMatchResultUseCase {
    constructor(
        private matchResultRepository: MatchResultRepository,
        private matchRepository: MatchRepository,
        private logRepository: GenerateLogUseCase,
    ) { }
    async execute({ userPublicId, teamAGols, teamBGols, matchPublicId }: CreateMatchResultUseCaseRequest): Promise<CreateMatchResultUseCaseResponse> {
        try {
            const doesMatchExist = await this.matchRepository.getMatchByPublicId(matchPublicId, { matchResult: true }) as Prisma.MatchGetPayload<{ include: { matchResult: true } }>
            if (!doesMatchExist) throw new MatchNotFoundError()
            if (doesMatchExist.matchResult) throw new MatchResultAlreadyExistsError()

            const createTeamResult = makeCreateTeamsResultUseCase()
            const { teamResult: teamAResult } = await createTeamResult.execute({ userPublicId, goalsTeam: teamAGols, team: 'A' })
            const { teamResult: teamBResult } = await createTeamResult.execute({ userPublicId, goalsTeam: teamBGols, team: 'B' })
            const data: Prisma.MatchResultCreateInput = {
                teamAResult: { connect: { id: teamAResult.id } },
                teamBResult: { connect: { id: teamBResult.id } },
                match: { connect: { id: doesMatchExist.id } },
            }
            const matchResult = await this.matchResultRepository.createMatchResult(data, matchResultInclude) as MatchResultWithRelations
            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.creating,
                entityType: ENTITY_TYPES.matchResult,
                entityId: matchResult.id,
                newValues: {
                    teamAId: teamAResult.id,
                    teamBId: teamBResult.id,
                    matchId: doesMatchExist.id,
                }
            })

            return { matchResult }
        } catch (error) {
            throw error
        }
    }
}