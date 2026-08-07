import { TeamPrismaRepository } from "@/repositories/prisma/team_prisma_repository.js";
import { ListTeamsByGroupUseCase } from "@/use_cases/teams/list-by-group.js";

export function makeListTeamsByGroupUseCase(){
    const teamRepository = new TeamPrismaRepository()
    const listTeamsByGroupUseCase = new ListTeamsByGroupUseCase(teamRepository)
    return listTeamsByGroupUseCase
}