
import type { Match } from "@/@types/prisma/client.js";
import type { MatchRepository } from "@/repositories/match_repository.js";

type ListMatchesByGroupUseCaseResponse = {
    matches: Match[]   
}

type ListMatchesByGroupUseCaseRequest = {
    groupId: number
}

export class ListMatchesByGroupUseCase {
    constructor(private matchesRepository: MatchRepository){}

    async execute(
        { groupId } : ListMatchesByGroupUseCaseRequest
    ): Promise<ListMatchesByGroupUseCaseResponse> 
    {
        const matches = await this.matchesRepository.listByGroup(groupId)
        return { matches }
    }
}
