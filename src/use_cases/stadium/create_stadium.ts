import { ENTITY_TYPES, LOG_ACTIONS, type Stadium } from "@/@types/prisma/client.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"
import type { StadiumRepository } from "@/respositories/stadium_repository.js"

interface CreateStadiumUseCaseRequest {
    name: string
    city: string
    capacity: number
}

interface CreateStadiumUseCaseResponse {
    stadium: Stadium
}

export class CreateStadiumUseCase {
    constructor(private stadiumRepository: StadiumRepository, private logRepository: GenerateLogUseCase) { }
    async execute({ name, city, capacity }: CreateStadiumUseCaseRequest): Promise<CreateStadiumUseCaseResponse> {
        try {
            const data = { name, city, capacity }
            const stadium = await this.stadiumRepository.createStadium(data)
            await this.logRepository.execute({
                userId: 1,
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