import { ENTITY_TYPES, LOG_ACTIONS, type Group } from "@/@types/prisma/client.js"
import type { GroupRepository } from "@/repositories/group_repository.js"
import { GroupAlreadyExistsError } from "../errors/group_already_exists.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"

interface CreateGroupUseCaseRequest {
    name: string
}

interface CreateGroupUseCaseResponse {
    group: Group
}

export class CreateGroupUseCase {
    constructor(private groupRepository: GroupRepository, private logRepository: GenerateLogUseCase) { }
    async execute({ name }: CreateGroupUseCaseRequest): Promise<CreateGroupUseCaseResponse> {
        try {
            const doesGroupAlreadyExists = await this.groupRepository.findGroupWhereUnique({ name })
            if (doesGroupAlreadyExists) throw new GroupAlreadyExistsError()
            const group = await this.groupRepository.createGroup({ name })
            await this.logRepository.execute({
                userId: 1,
                action: LOG_ACTIONS.creating,
                entityType: ENTITY_TYPES.group,
                entityId: group.id,
                newValues: { name }
            })
            return { group }
        } catch (error) {
            throw error
        }

    }
}