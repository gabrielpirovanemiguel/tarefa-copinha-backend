import { GroupPrismaRepository } from "@/repositories/prisma/group_prisma_repository.js"
import { UpdateGroupUseCase } from "@/use_cases/groups/update_group.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"

export function makeUpdateGroupUseCase() {
    const groupRepository = new GroupPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const updateGroupUseCase = new UpdateGroupUseCase(groupRepository, generateLogUseCase)
    return updateGroupUseCase
}
