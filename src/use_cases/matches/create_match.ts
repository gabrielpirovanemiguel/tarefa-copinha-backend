import { ENTITY_TYPES, LOG_ACTIONS, Prisma, STATUS_MATCH } from "@/@types/prisma/client.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"
import type { StadiumRepository } from "@/repositories/stadium_repository.js"
import type { TeamRepository } from "@/repositories/team_repository.js"
import type { GroupRepository } from "@/repositories/group_repository.js"
import { StadiumNotFoundError } from "../errors/stadium_not_found.js"
import { TeamNotFoundError } from "../errors/team_not_found.js"
import { GroupNotFoundError } from "../errors/group_not_found.js"
import type { MatchRepository } from "@/repositories/match_repository.js"

interface CreateMatchUseCaseRequest {
    userPublicId: string
    groupPublicId: string
    teamAPublicId: string
    teamBPublicId: string
    stadiumPublicId: string
    date: Date
    status: STATUS_MATCH
}

export type MatchWithAllRelations = Prisma.MatchGetPayload<{
    include: { group: true; teamA: true; teamB: true; stadium: true }
}>

interface CreateMatchUseCaseResponse {
    match: MatchWithAllRelations
}

export class CreateMatchUseCase {
    constructor(
        private matchRepository: MatchRepository,
        private stadiumRepository: StadiumRepository,
        private teamRepository: TeamRepository,
        private groupRepository: GroupRepository,
        private logRepository: GenerateLogUseCase) { }
    async execute({
        userPublicId,
        groupPublicId,
        teamAPublicId,
        teamBPublicId,
        stadiumPublicId,
        date,
        status }: CreateMatchUseCaseRequest): Promise<CreateMatchUseCaseResponse> {
        try {
            const doesStadiumExist = await this.stadiumRepository.getStadiumByPublicId(stadiumPublicId)
            const doesTeamAExist = await this.teamRepository.findTeamWhereUnique({ publicId: teamAPublicId })
            const doesTeamBExist = await this.teamRepository.findTeamWhereUnique({ publicId: teamBPublicId })
            const doesGroupExist = await this.groupRepository.getGroupByPublicId(groupPublicId)
            if (!doesStadiumExist) throw new StadiumNotFoundError()
            if (!doesTeamAExist) throw new TeamNotFoundError(`O time A com o publicId ${teamAPublicId} não foi encontrado.`)
            if (!doesTeamBExist) throw new TeamNotFoundError(`O time B com o publicId ${teamBPublicId} não foi encontrado.`)
            if (!doesGroupExist) throw new GroupNotFoundError()
            const data = {
                date,
                status,
                group: { connect: { id: doesGroupExist.id } },
                teamA: { connect: { id: doesTeamAExist.id } },
                teamB: { connect: { id: doesTeamBExist.id } },
                stadium: { connect: { id: doesStadiumExist.id } }
            }
            const match = await this.matchRepository.createMatch(data, { group: true, teamA: true, teamB: true, stadium: true }) as MatchWithAllRelations
            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.creating,
                entityType: ENTITY_TYPES.match,
                entityId: match.id,
                newValues: data
            })
            return { match }
        } catch (error) {
            throw error
        }

    }
}