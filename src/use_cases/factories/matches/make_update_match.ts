import { GroupPrismaRepository } from "@/repositories/prisma/group_prisma_repository.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { TeamPrismaRepository } from "@/repositories/prisma/team_prisma_repository.js"
import { StadiumPrismaRepository } from "@/repositories/prisma/stadium_prisma_repository.js"
import { MatchPrismaRepository } from "@/repositories/prisma/match_prisma_repository.js"
import { UpdateMatchUseCase } from "@/use_cases/matches/update_match.js"


export function makeUpdateMatchUseCase() {
    const matchRepository = new MatchPrismaRepository()
    const stadiumRepository = new StadiumPrismaRepository()
    const teamRepository = new TeamPrismaRepository()
    const groupRepository = new GroupPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const updateMatchUseCase = new UpdateMatchUseCase(matchRepository, stadiumRepository, teamRepository, groupRepository, generateLogUseCase)
    return updateMatchUseCase
}
