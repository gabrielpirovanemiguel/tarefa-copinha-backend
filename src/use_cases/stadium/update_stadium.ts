import { ENTITY_TYPES, LOG_ACTIONS, type Stadium } from "@/@types/prisma/client.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"
import type { StadiumRepository } from "@/repositories/stadium_repository.js"
import { StadiumNotFoundError } from "../errors/stadium_not_found.js"

interface UpdateStadiumUseCaseRequest {
    userPublicId: string
    stadiumPublicId: string
    name?: string
    city?: string
    capacity?: number
}

interface UpdateStadiumUseCaseResponse {
    stadium: Stadium
}

export class UpdateStadiumUseCase {
    constructor(private stadiumRepository: StadiumRepository, private logRepository: GenerateLogUseCase) { }
    async execute({ userPublicId, stadiumPublicId, name, city, capacity }: UpdateStadiumUseCaseRequest): Promise<UpdateStadiumUseCaseResponse> {
        try {
            const doesStadiumExist = await this.stadiumRepository.getStadiumByPublicId(stadiumPublicId)
            if (!doesStadiumExist) throw new StadiumNotFoundError()

            const data = { name, city, capacity }
            const stadium = await this.stadiumRepository.updateStadium({ publicId: stadiumPublicId }, data)

            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.updating,
                entityType: ENTITY_TYPES.stadium,
                entityId: stadium.id,
                oldValues: doesStadiumExist,
                newValues: stadium,
                description: `Estádio com o publicId ${stadiumPublicId} atualizado.`
            })

            return { stadium }
        } catch (error) {
            throw error
        }

    }
}
