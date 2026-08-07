import { GroupPrismaRepository } from "@/repositories/prisma/group_prisma_repository.js"
import { TeamPrismaRepository } from "@/repositories/prisma/team_prisma_repository.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { UpdateTeamUseCase } from "@/use_cases/teams/update_team.js"


export function makeUpdateTeamUseCase() {
    const groupRepository = new GroupPrismaRepository()
    const teamRepository = new TeamPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const updateTeamUseCase = new UpdateTeamUseCase(teamRepository, groupRepository, generateLogUseCase)
    return updateTeamUseCase
}
