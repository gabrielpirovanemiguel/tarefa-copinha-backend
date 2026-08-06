import type { ENTITY_TYPES, LOG_ACTIONS } from "@/@types/prisma/enums.js"
import type { Prisma } from "@/@types/prisma/client.js"
import type { LogPrismaRepository } from "@/respositories/prisma/log_prisma_repository.js"

interface GenerateLogUseCaseRequest {
  userId: number
  action: LOG_ACTIONS
  entityType: ENTITY_TYPES
  entityId: number
  oldValues?: Prisma.InputJsonValue
  newValues?: Prisma.InputJsonValue
  description?: string
}

export class GenerateLogUseCase {
    constructor(private logRepository: LogPrismaRepository) {}
    async execute({
        userId,
        action,
        entityType,
        entityId,
        oldValues,
        newValues,
        description}: GenerateLogUseCaseRequest): Promise<void> {
        try {
            await this.logRepository.generateLog({
                action,
                entityType,
                entityId,
                oldValues,
                newValues,
                description,
                user: { connect: { id: userId } }
            })
        } catch (error) {
            console.error(`Erro ao gerar o log: ${error}`)
        }
    }
            
}
