import { GroupPrismaRepository } from "@/respositories/prisma/group_prisma_repository.js"
import { CreateGroupUseCase } from "@/use_cases/groups/create_group.js"


export function makeCreateGroupUseCase() {
    const groupRepository = new GroupPrismaRepository()
    const createGroupUseCase = new CreateGroupUseCase(groupRepository)
    return createGroupUseCase
}