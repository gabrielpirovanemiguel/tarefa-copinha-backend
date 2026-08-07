import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { MatchResultPrismaRepository } from "@/repositories/prisma/match_result_prisma_repository.js"
import { TeamsResultPrismaRepository } from "@/repositories/prisma/teams_result_prisma_repository.js"
import { UpdateMatchResultUseCase } from "@/use_cases/results/update_match_result.js"

export function makeUpdateMatchResultUseCase() {
    const matchResultRepository = new MatchResultPrismaRepository()
    const teamsResultRepository = new TeamsResultPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const updateMatchResultUseCase = new UpdateMatchResultUseCase(matchResultRepository, teamsResultRepository, generateLogUseCase)
    return updateMatchResultUseCase
}
