import { CreateTeamResultUseCase } from "@/use_cases/results/create_team_result.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { TeamsResultPrismaRepository } from "@/respositories/prisma/teams_result_prisma_repository.js"
  
export function makeCreateTeamsResultUseCase() {
    const teamResultRepository = new TeamsResultPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const createTeamsResultUseCase = new CreateTeamResultUseCase(teamResultRepository, generateLogUseCase)
    return createTeamsResultUseCase
}