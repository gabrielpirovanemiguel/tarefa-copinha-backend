import { ENTITY_TYPES, LOG_ACTIONS, type Group } from "@/@types/prisma/client.js"
import type { GroupRepository } from "@/repositories/group_repository.js"
import { GroupAlreadyExistsError } from "../errors/group_already_exists.js"
import { GroupNotFoundError } from "../errors/group_not_found.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"

interface DeleteGroupUseCaseRequest {
    userPublicId: string
    groupPublicId: string
    name?: string
}



export class DeleteGroupUseCase {
    constructor(
        private groupRepository: GroupRepository,
        private logRepository: GenerateLogUseCase
    ) { }
    async execute({
        userPublicId,
        groupPublicId,
    }: DeleteGroupUseCaseRequest): Promise<void> {
        try {
            const doesGroupExist = await this.groupRepository.getGroupByPublicId(groupPublicId)
            if (!doesGroupExist) throw new GroupNotFoundError()
            await this.groupRepository.deleteGroup({ publicId: groupPublicId })
            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.deleting,
                entityType: ENTITY_TYPES.group,
                entityId: doesGroupExist.id,
                description: `Grupo com o publicId ${groupPublicId} deletado.`
            })
        } catch (error) {
            throw error
        }

    }
}
