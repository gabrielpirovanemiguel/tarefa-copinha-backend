import { MatchPrismaRepository } from "@/repositories/prisma/match_prisma_repository.js";
import { ListMatchesByGroupUseCase } from "@/use_cases/matches/list-by-group.js";


export function makeListMatchByGroupUseCase(){
    const matchRepository = new MatchPrismaRepository()
    const listMatchesByGroupUseCase = new ListMatchesByGroupUseCase(matchRepository)
    return listMatchesByGroupUseCase
}