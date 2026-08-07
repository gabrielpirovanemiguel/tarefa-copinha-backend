import { ENTITY_TYPES, LOG_ACTIONS, type Stadium } from "@/@types/prisma/client.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"
import type { StadiumRepository } from "@/repositories/stadium_repository.js"

interface CreateStadiumUseCaseRequest {
    userPublicId: string
    name: string
    city: string
    capacity: number
}

interface CreateStadiumUseCaseResponse {
    stadium: Stadium
}

export class CreateStadiumUseCase {
    constructor(private stadiumRepository: StadiumRepository, private logRepository: GenerateLogUseCase) { }
    async execute({ userPublicId, name, city, capacity }: CreateStadiumUseCaseRequest): Promise<CreateStadiumUseCaseResponse> {
        try {
            const data = { name, city, capacity }
            const stadium = await this.stadiumRepository.createStadium(data)
            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.creating,
                entityType: ENTITY_TYPES.stadium,
                entityId: stadium.id,
                newValues: data
            })
            return { stadium }
        } catch (error) {
            throw error
        }

    }
}