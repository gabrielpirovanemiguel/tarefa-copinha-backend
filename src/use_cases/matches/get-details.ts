
import type { Match } from "@/@types/prisma/client.js";
import { MatchNotFoundError } from "../errors/match_not_found.js";
import type { MatchRepository } from "@/repositories/match_repository.js";
import type { MatchWithAllRelations } from "./create_match.js";

type GetMatchDetailsUseCaseRequest = {
    matchId: string
}

type GetMatchDetailsUseCaseResponse = {
    match: MatchWithAllRelations
}

export class GetMatchDetailsUseCase {
  constructor(private matchesRepository: MatchRepository) {}

  async execute({ 
    matchId
  }: GetMatchDetailsUseCaseRequest)
  : Promise<GetMatchDetailsUseCaseResponse> {
    const match = await this.matchesRepository.getMatchDetails(matchId);

    if (!match) {
        throw new MatchNotFoundError()
    }

    return { match }
  }
}