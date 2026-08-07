import { MatchPrismaRepository } from "@/repositories/prisma/match_prisma_repository.js";
import { GetMatchDetailsUseCase } from "@/use_cases/matches/get-details.js";


export function makeGetMatchDetailsUseCase(){
    const matchRepository = new MatchPrismaRepository()
    const getMatchDetailsUseCase = new GetMatchDetailsUseCase(matchRepository)
    return getMatchDetailsUseCase
}