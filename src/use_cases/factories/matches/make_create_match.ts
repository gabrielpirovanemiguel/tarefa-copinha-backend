import { GroupPrismaRepository } from "@/respositories/prisma/group_prisma_repository.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { TeamPrismaRepository } from "@/respositories/prisma/team_prisma_repository.js"
import { StadiumPrismaRepository } from "@/respositories/prisma/stadium_prisma_repository.js"
import { MatchPrismaRepository } from "@/respositories/prisma/match_prisma_repository.js"
import { CreateMatchUseCase } from "@/use_cases/matches/create_match.js"


export function makeCreateMatchUseCase() {
    const matchRepository = new MatchPrismaRepository()
    const stadiumRepository = new StadiumPrismaRepository()
    const teamRepository = new TeamPrismaRepository()
    const groupRepository = new GroupPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const createMatchUseCase = new CreateMatchUseCase(matchRepository, stadiumRepository, teamRepository, groupRepository, generateLogUseCase)
    return createMatchUseCase
}