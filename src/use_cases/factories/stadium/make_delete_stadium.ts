import { StadiumPrismaRepository } from "@/repositories/prisma/stadium_prisma_repository.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { DeleteStadiumUseCase } from "@/use_cases/stadium/delete_stadium.js"

export function makeDeleteStadiumUseCase() {
    const stadiumRepository = new StadiumPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const deleteStadiumUseCase = new DeleteStadiumUseCase(stadiumRepository, generateLogUseCase)
    return deleteStadiumUseCase
}
