import { MatchResultPrismaRepository } from "@/repositories/prisma/match_result_prisma_repository.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { DeleteMatchResultUseCase } from "@/use_cases/results/delete_match_result.js"

export function makeDeleteMatchResultUseCase() {
    const matchResultRepository = new MatchResultPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const deleteMatchResultUseCase = new DeleteMatchResultUseCase(matchResultRepository, generateLogUseCase)
    return deleteMatchResultUseCase
}
