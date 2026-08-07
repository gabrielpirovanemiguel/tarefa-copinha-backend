import { MatchPrismaRepository } from "@/repositories/prisma/match_prisma_repository.js";
import { ListMatchesByStatusUseCase } from "@/use_cases/matches/list-by-status.js";


export function makeListMatchByStatusUseCase(){
    const matchRepository = new MatchPrismaRepository()
    const listMatchesByStatusUseCase = new ListMatchesByStatusUseCase(matchRepository)
    return listMatchesByStatusUseCase
}