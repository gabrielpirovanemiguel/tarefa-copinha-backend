import { StadiumPrismaRepository } from "@/repositories/prisma/stadium_prisma_repository.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { CreateStadiumUseCase } from "@/use_cases/stadium/create_stadium.js"


export function makeCreateStadiumUseCase() {
    const stadiumRepository = new StadiumPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const createStadiumUseCase = new CreateStadiumUseCase(stadiumRepository, generateLogUseCase)
    return createStadiumUseCase
}