import { GroupPrismaRepository } from "@/repositories/prisma/group_prisma_repository.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { DeleteGroupUseCase } from "@/use_cases/groups/delete_group.js"

export function makeDeleteGroupUseCase() {
    const groupRepository = new GroupPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const deleteGroupUseCase = new DeleteGroupUseCase(groupRepository, generateLogUseCase)
    return deleteGroupUseCase
}
