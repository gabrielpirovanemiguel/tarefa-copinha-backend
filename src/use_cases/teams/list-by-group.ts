import type { Team } from "@/@types/prisma/client.js";
import type { TeamRepository } from "@/repositories/team_repository.js";

type ListTeamsByGroupUseCaseResponse = {
    teams: Team[]
}

type ListTeamsByGroupUseCaseRequest = {
    groupId: number
}

export class ListTeamsByGroupUseCase {
    constructor(private teamsRepository: TeamRepository) {}

    async execute(
        { groupId }: ListTeamsByGroupUseCaseRequest
    ): Promise<ListTeamsByGroupUseCaseResponse> 
    {
        const teams = await this.teamsRepository.listByGroup(groupId)
        return { teams }
    }
}
