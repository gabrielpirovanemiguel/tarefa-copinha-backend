import type { ENTITY_TYPES, LOG_ACTIONS } from "@/@types/prisma/enums.js"
import type { Prisma } from "@/@types/prisma/client.js"
import type { LogPrismaRepository } from "@/respositories/prisma/log_prisma_repository.js"

interface GenerateLogUseCaseRequest {
  adminId: number
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
        adminId,
        action,
        entityType,
        entityId,
        oldValues,
        newValues,
        description}: GenerateLogUseCaseRequest): Promise<void> {
        await this.logRepository.generateLog({
            action,
            entityType,
            entityId,
            oldValues,
            newValues,
            description,
            admin: { connect: { id: adminId } }
        })
    }
            
}
