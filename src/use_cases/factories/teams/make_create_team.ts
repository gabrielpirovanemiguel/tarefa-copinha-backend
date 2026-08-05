import { GroupPrismaRepository } from "@/respositories/prisma/group_prisma_repository.js"
import { TeamPrismaRepository } from "@/respositories/prisma/team_prisma_repository.js"
import { CreateTeamUseCase } from "@/use_cases/teams/create_team.js"


export function makeCreateTeamUseCase() {
    const groupRepository = new GroupPrismaRepository()
    const teamRepository = new TeamPrismaRepository()
    const createTeamUseCase = new CreateTeamUseCase(teamRepository, groupRepository)
    return createTeamUseCase
}