import { MatchPrismaRepository } from "@/repositories/prisma/match_prisma_repository.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { DeleteMatchUseCase } from "@/use_cases/matches/delete_match.js"

export function makeDeleteMatchUseCase() {
    const matchRepository = new MatchPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const deleteMatchUseCase = new DeleteMatchUseCase(matchRepository, generateLogUseCase)
    return deleteMatchUseCase
}
