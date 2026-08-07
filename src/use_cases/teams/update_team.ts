import { ENTITY_TYPES, LOG_ACTIONS, type Team } from "@/@types/prisma/client.js"
import type { GroupRepository } from "@/repositories/group_repository.js"
import type { TeamRepository } from "@/repositories/team_repository.js"
import { GroupNotFoundError } from "../errors/group_not_found.js"
import { TeamAlreadyExistsError } from "../errors/team_already_exists.js"
import { TeamNotFoundError } from "../errors/team_not_found.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"

interface UpdateTeamUseCaseRequest {
    userPublicId: string
    teamPublicId: string
    groupPublicId?: string
    name?: string
    abbreviation?: string
    shieldImageUrl?: string
    rankingPosition?: number
    wins?: number
    draws?: number
    losses?: number
    goalsFor?: number
    goalsAgainst?: number
    goalsDifference?: number
    points?: number
}

interface UpdateTeamUseCaseResponse {
    team: Team
}

export class UpdateTeamUseCase {
    constructor(
        private teamRepository: TeamRepository,
        private groupRepository: GroupRepository,
        private logRepository: GenerateLogUseCase
    ) { }
    async execute({
        userPublicId,
        teamPublicId,
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
    }: UpdateTeamUseCaseRequest): Promise<UpdateTeamUseCaseResponse> {
        try {
            const doesTeamExist = await this.teamRepository.findTeamWhereUnique({ publicId: teamPublicId })
            if (!doesTeamExist) throw new TeamNotFoundError()

            if (groupPublicId) {
                const doesGroupExist = await this.groupRepository.getGroupByPublicId(groupPublicId)
                if (!doesGroupExist) throw new GroupNotFoundError()
            }

            if (name) {
                const doesNameAlreadyExist = await this.teamRepository.findTeamWhereUnique({ name })
                if (doesNameAlreadyExist && doesNameAlreadyExist.publicId !== teamPublicId) throw new TeamAlreadyExistsError("Já existe um time com esse nome.")
            }

            if (abbreviation) {
                const doesAbbreviationAlreadyExist = await this.teamRepository.findTeamWhereUnique({ abbreviation })
                if (doesAbbreviationAlreadyExist && doesAbbreviationAlreadyExist.publicId !== teamPublicId) throw new TeamAlreadyExistsError("Já existe um time com essa abreviação.")
            }

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
                group: groupPublicId ? { connect: { publicId: groupPublicId } } : undefined
            }

            const team = await this.teamRepository.updateTeam({ publicId: teamPublicId }, data)

            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.updating,
                entityType: ENTITY_TYPES.team,
                entityId: team.id,
                oldValues: doesTeamExist,
                newValues: team,
                description: `Time com o publicId ${teamPublicId} atualizado.`
            })

            return { team }
        } catch (error) {
            throw error
        }
    }
}
