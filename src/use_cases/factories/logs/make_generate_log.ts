import { LogPrismaRepository } from "@/repositories/prisma/log_prisma_repository.js"
import { UserPrismaRepository } from "@/repositories/prisma/user_prisma_repository.js"
import { GenerateLogUseCase } from "@/use_cases/logs/generate_log.js"

export function makeGenerateLogUseCase() {
    const logRepository = new LogPrismaRepository()
    const userRepository = new UserPrismaRepository()
    const generateLogUseCase = new GenerateLogUseCase(logRepository, userRepository)
    return generateLogUseCase
}