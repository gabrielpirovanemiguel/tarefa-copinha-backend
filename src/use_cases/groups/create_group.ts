import type { Group } from "@/@types/prisma/client.js"
import type { GroupRepository } from "@/respositories/group_repository.js"
import { GroupAlreadyExistsError } from "../errors/group_already_exists.js"

interface CreateGroupUseCaseRequest {
    name: string
}

interface CreateGroupUseCaseResponse {
    group: Group
}

export class CreateGroupUseCase {
    constructor(private groupRepository: GroupRepository) {}
    async execute({name}: CreateGroupUseCaseRequest): Promise<CreateGroupUseCaseResponse> {
        try {
            const doesGroupAlreadyExists = await this.groupRepository.findGroupWhereUnique({name})
            if (doesGroupAlreadyExists) throw new GroupAlreadyExistsError()
            const group = await this.groupRepository.createGroup({name})
            return {group}
        } catch (error) {
            throw error
        }

    }
}