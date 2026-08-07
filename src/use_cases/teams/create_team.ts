import { ENTITY_TYPES, LOG_ACTIONS, type Team } from "@/@types/prisma/client.js"
import type { GroupRepository } from "@/repositories/group_repository.js"
import type { TeamRepository } from "@/repositories/team_repository.js"
import { GroupNotFoundError } from "../errors/group_not_found.js"
import { TeamAlreadyExistsError } from "../errors/team_already_exists.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"

interface CreateTeamUseCaseRequest {
    groupPublicId: string
    name: string
    abbreviation: string
    shieldImageUrl: string
    rankingPosition: number
    wins: number
    draws: number
    losses: number
    goalsFor: number
    goalsAgainst: number
    goalsDifference: number
    points: number
}

interface CreateTeamUseCaseResponse {
    team: Team
}

export class CreateTeamUseCase {
    constructor(
        private teamRepository: TeamRepository,
        private groupRepository: GroupRepository,
        private logRepository: GenerateLogUseCase
    ) { }
    async execute({
        groupPublicId,
        name,
        abbreviation,
        shieldImageUrl,
        rankingPosition,
        wins,
        draws,
        losses,
        goalsFor,
        goalsAgainst,
        goalsDifference,
        points
    }: CreateTeamUseCaseRequest): Promise<CreateTeamUseCaseResponse> {
        try {
            const doesGroupExists = await this.groupRepository.getGroupByPublicId(groupPublicId)
            if (!doesGroupExists) throw new GroupNotFoundError()
            const doesNameAlreadyExists = await this.teamRepository.findTeamWhereUnique({ name })
            const doesAbbreviationAlreadyExists = await this.teamRepository.findTeamWhereUnique({ abbreviation })
            if (doesNameAlreadyExists) throw new TeamAlreadyExistsError("Já existe um time com esse nome.")
            if (doesAbbreviationAlreadyExists) throw new TeamAlreadyExistsError("Já existe um time com essa abreviação.")
            const groupId = doesGroupExists.id
            const data = {
                name,
                abbreviation,
                shieldImageUrl,
                rankingPosition,
                wins,
                draws,
                losses,
                goalsFor,
                goalsAgainst,
                goalsDifference,
                points,
                group: {
                    connect: { id: groupId }
                }
            }

            const team = await this.teamRepository.createTeam(data)


            await this.logRepository.execute({
                userId: 1,
                action: LOG_ACTIONS.creating,
                entityType: ENTITY_TYPES.group,
                entityId: team.id,
                newValues: data
            })

            return { team }
        } catch (error) {
            throw error
        }
    }
}