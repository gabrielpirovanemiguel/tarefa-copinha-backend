import { StadiumPrismaRepository } from "@/repositories/prisma/stadium_prisma_repository.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { UpdateStadiumUseCase } from "@/use_cases/stadium/update_stadium.js"


export function makeUpdateStadiumUseCase() {
    const stadiumRepository = new StadiumPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const updateStadiumUseCase = new UpdateStadiumUseCase(stadiumRepository, generateLogUseCase)
    return updateStadiumUseCase
}
