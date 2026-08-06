import type { ENTITY_TYPES, LOG_ACTIONS } from "@/@types/prisma/enums.js"
import type { Prisma } from "@/@types/prisma/client.js"
import type { LogPrismaRepository } from "@/repositories/prisma/log_prisma_repository.js"
import { UserNotFoundError } from "../errors/user_not_found.js"
import type { UserRepository } from "@/repositories/user_repository.js"

interface GenerateLogUseCaseRequest {
    userPublicId: string
  action: LOG_ACTIONS
  entityType: ENTITY_TYPES
  entityId: number
  oldValues?: Prisma.InputJsonValue
  newValues?: Prisma.InputJsonValue
  description?: string
}

export class GenerateLogUseCase {
    constructor(private logRepository: LogPrismaRepository, private userRepository: UserRepository) {}
    async execute({
        userPublicId,
        action,
        entityType,
        entityId,
        oldValues,
        newValues,
        description}: GenerateLogUseCaseRequest): Promise<void> {
        try {
            const user = await this.userRepository.getUserByPublicId(userPublicId)
            if(!user) throw new UserNotFoundError()
            await this.logRepository.generateLog({
                action,
                entityType,
                entityId,
                oldValues,
                newValues,
                description,
                user: { connect: { id: user.id } }
            })
        } catch (error) {
            console.error(`Erro ao gerar o log: ${error}`)
        }
    }
            
}
