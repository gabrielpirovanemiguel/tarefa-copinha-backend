import type { Match } from "@/@types/prisma/client.js";
import { STATUS_MATCH } from "@/@types/prisma/enums.js";
import type { MatchRepository } from "@/repositories/match_repository.js";


type ListMatchesByStatusUseCaseResponse = {
    filteredMatches: Match[]
}

type ListMatchesByStatusUseCaseRequest = {
    filter?: STATUS_MATCH
}

export class ListMatchesByStatusUseCase {
    constructor(private matchesRepository: MatchRepository) {}

    async execute (
        { filter } : ListMatchesByStatusUseCaseRequest
    ): Promise<ListMatchesByStatusUseCaseResponse> 
    {
        const filteredMatches = await this.matchesRepository.filterByStatus(filter)
        return { filteredMatches }   
    }
}