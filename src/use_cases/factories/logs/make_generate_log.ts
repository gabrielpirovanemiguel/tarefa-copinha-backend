import { LogPrismaRepository } from "@/repositories/prisma/log_prisma_repository.js"
import { GenerateLogUseCase } from "@/use_cases/logs/generate_log.js"

export function makeGenerateLogUseCase() {
    const logRepository = new LogPrismaRepository()
    const generateLogUseCase = new GenerateLogUseCase(logRepository)
    return generateLogUseCase
}