import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { MatchResultPrismaRepository } from "@/repositories/prisma/match_result_prisma_repository.js"
import { CreateMatchResultUseCase } from "@/use_cases/results/create_match_result.js"
import { MatchPrismaRepository } from "@/repositories/prisma/match_prisma_repository.js"
  
export function makeCreateMatchResultUseCase() {
    const matchResultRepository = new MatchResultPrismaRepository()
    const matchRepository = new MatchPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const createMatchResultUseCase = new CreateMatchResultUseCase(matchResultRepository, matchRepository, generateLogUseCase)
    return createMatchResultUseCase
}