import { TeamPrismaRepository } from "@/repositories/prisma/team_prisma_repository.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { DeleteTeamUseCase } from "@/use_cases/teams/delete_team.js"

export function makeDeleteTeamUseCase() {
    const teamRepository = new TeamPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const deleteTeamUseCase = new DeleteTeamUseCase(teamRepository, generateLogUseCase)
    return deleteTeamUseCase
}
