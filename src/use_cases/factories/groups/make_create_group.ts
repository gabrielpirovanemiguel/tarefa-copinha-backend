import { GroupPrismaRepository } from "@/repositories/prisma/group_prisma_repository.js"
import { CreateGroupUseCase } from "@/use_cases/groups/create_group.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"

export function makeCreateGroupUseCase() {
    const groupRepository = new GroupPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const createGroupUseCase = new CreateGroupUseCase(groupRepository, generateLogUseCase)
    return createGroupUseCase
}