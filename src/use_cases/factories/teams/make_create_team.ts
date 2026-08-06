import { GroupPrismaRepository } from "@/repositories/prisma/group_prisma_repository.js"
import { TeamPrismaRepository } from "@/repositories/prisma/team_prisma_repository.js"
import { CreateTeamUseCase } from "@/use_cases/teams/create_team.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"


export function makeCreateTeamUseCase() {
    const groupRepository = new GroupPrismaRepository()
    const teamRepository = new TeamPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const createTeamUseCase = new CreateTeamUseCase(teamRepository, groupRepository, generateLogUseCase)
    return createTeamUseCase
}