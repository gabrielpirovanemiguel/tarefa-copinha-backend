
type ListTeamsByGroupUseCaseResponse = {
    teams: Team[]
}

type ListTeamsByGroupUseCaseRequest = {
    groupId: string
}

export class ListTeamsByGroupUseCase {
    constructor(private teamsRepository: TeamsRepository) {}

    async execute(
        { groupId }: ListTeamsByGroupUseCaseRequest
    ): Promise<ListTeamsByGroupUseCaseResponse> 
    {
        const teams = await this.teamsRepository.listByGroup(groupId)
        return { teams }
    }
}
