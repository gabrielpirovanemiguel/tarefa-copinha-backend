import { ENTITY_TYPES, LOG_ACTIONS, type Prisma, type STATUS_MATCH } from "@/@types/prisma/client.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"
import type { StadiumRepository } from "@/repositories/stadium_repository.js"
import type { TeamRepository } from "@/repositories/team_repository.js"
import type { GroupRepository } from "@/repositories/group_repository.js"
import { StadiumNotFoundError } from "../errors/stadium_not_found.js"
import { TeamNotFoundError } from "../errors/team_not_found.js"
import { GroupNotFoundError } from "../errors/group_not_found.js"
import { MatchNotFoundError } from "../errors/match_not_found.js"
import { SameTeamError } from "../errors/same_team.js"
import type { MatchRepository } from "@/repositories/match_repository.js"
import type { MatchWithAllRelations } from "./create_match.js"

interface UpdateMatchUseCaseRequest {
    userPublicId: string
    matchPublicId: string
    groupPublicId?: string
    teamAPublicId?: string
    teamBPublicId?: string
    stadiumPublicId?: string
    date?: Date
    status?: STATUS_MATCH
}

interface UpdateMatchUseCaseResponse {
    match: MatchWithAllRelations
}

export class UpdateMatchUseCase {
    constructor(
        private matchRepository: MatchRepository,
        private stadiumRepository: StadiumRepository,
        private teamRepository: TeamRepository,
        private groupRepository: GroupRepository,
        private logRepository: GenerateLogUseCase) { }
    async execute({
        userPublicId,
        matchPublicId,
        groupPublicId,
        teamAPublicId,
        teamBPublicId,
        stadiumPublicId,
        date,
        status }: UpdateMatchUseCaseRequest): Promise<UpdateMatchUseCaseResponse> {
        try {
            const doesMatchExist = await this.matchRepository.getMatchByPublicId(matchPublicId, { group: true, teamA: true, teamB: true, stadium: true }) as MatchWithAllRelations
            if (!doesMatchExist) throw new MatchNotFoundError()

            let groupId = doesMatchExist.group.id
            if (groupPublicId) {
                const doesGroupExist = await this.groupRepository.getGroupByPublicId(groupPublicId)
                if (!doesGroupExist) throw new GroupNotFoundError()
                groupId = doesGroupExist.id
            }

            let teamAId = doesMatchExist.teamA.id
            if (teamAPublicId) {
                const doesTeamAExist = await this.teamRepository.findTeamWhereUnique({ publicId: teamAPublicId })
                if (!doesTeamAExist) throw new TeamNotFoundError(`O time A com o publicId ${teamAPublicId} não foi encontrado.`)
                teamAId = doesTeamAExist.id
            }

            let teamBId = doesMatchExist.teamB.id
            if (teamBPublicId) {
                const doesTeamBExist = await this.teamRepository.findTeamWhereUnique({ publicId: teamBPublicId })
                if (!doesTeamBExist) throw new TeamNotFoundError(`O time B com o publicId ${teamBPublicId} não foi encontrado.`)
                teamBId = doesTeamBExist.id
            }

            if (teamAId === teamBId) throw new SameTeamError()

            let stadiumId = doesMatchExist.stadium.id
            if (stadiumPublicId) {
                const doesStadiumExist = await this.stadiumRepository.getStadiumByPublicId(stadiumPublicId)
                if (!doesStadiumExist) throw new StadiumNotFoundError()
                stadiumId = doesStadiumExist.id
            }

            const data: Prisma.MatchUpdateInput = {
                date,
                status,
                group: { connect: { id: groupId } },
                teamA: { connect: { id: teamAId } },
                teamB: { connect: { id: teamBId } },
                stadium: { connect: { id: stadiumId } }
            }

            const match = await this.matchRepository.updateMatch({ publicId: matchPublicId }, data, { group: true, teamA: true, teamB: true, stadium: true }) as MatchWithAllRelations

            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.updating,
                entityType: ENTITY_TYPES.match,
                entityId: match.id,
                oldValues: doesMatchExist,
                newValues: match,
                description: `Partida com o publicId ${matchPublicId} atualizada.`
            })

            return { match }
        } catch (error) {
            throw error
        }

    }
}
