import { ENTITY_TYPES, LOG_ACTIONS, type Group } from "@/@types/prisma/client.js"
import type { GroupRepository } from "@/repositories/group_repository.js"
import { GroupAlreadyExistsError } from "../errors/group_already_exists.js"
import { GroupNotFoundError } from "../errors/group_not_found.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"

interface UpdateGroupUseCaseRequest {
    userPublicId: string
    groupPublicId: string
    name?: string
}

interface UpdateGroupUseCaseResponse {
    group: Group
}

export class UpdateGroupUseCase {
    constructor(
        private groupRepository: GroupRepository,
        private logRepository: GenerateLogUseCase
    ) { }
    async execute({
        userPublicId,
        groupPublicId,
        name
    }: UpdateGroupUseCaseRequest): Promise<UpdateGroupUseCaseResponse> {
        try {
            const doesGroupExist = await this.groupRepository.getGroupByPublicId(groupPublicId)
            if (!doesGroupExist) throw new GroupNotFoundError()
            if (name) {
                const doesGroupAlreadyExists = await this.groupRepository.findGroupWhereUnique({ name })
                if (doesGroupAlreadyExists && doesGroupAlreadyExists.publicId !== groupPublicId) throw new GroupAlreadyExistsError()
            }
            const data = {
                name
            }
            const group = await this.groupRepository.updateGroup({ publicId: groupPublicId }, data)
            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.updating,
                entityType: ENTITY_TYPES.group,
                entityId: group.id,
                oldValues: doesGroupExist,
                newValues: group,
                description: `Grupo com o publicId ${groupPublicId} atualizado.`
            })
            return { group }
        } catch (error) {
            throw error
        }

    }
}
