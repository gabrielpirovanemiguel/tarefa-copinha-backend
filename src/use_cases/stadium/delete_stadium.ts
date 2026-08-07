import { ENTITY_TYPES, LOG_ACTIONS } from "@/@types/prisma/client.js"
import type { StadiumRepository } from "@/repositories/stadium_repository.js"
import { StadiumNotFoundError } from "../errors/stadium_not_found.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"

interface DeleteStadiumUseCaseRequest {
    userPublicId: string
    stadiumPublicId: string
}

export class DeleteStadiumUseCase {
    constructor(
        private stadiumRepository: StadiumRepository,
        private logRepository: GenerateLogUseCase
    ) { }
    async execute({
        userPublicId,
        stadiumPublicId,
    }: DeleteStadiumUseCaseRequest): Promise<void> {
        try {
            const doesStadiumExist = await this.stadiumRepository.getStadiumByPublicId(stadiumPublicId)
            if (!doesStadiumExist) throw new StadiumNotFoundError()
            await this.stadiumRepository.deleteStadium({ publicId: stadiumPublicId })
            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.deleting,
                entityType: ENTITY_TYPES.stadium,
                entityId: doesStadiumExist.id,
                description: `Estádio com o publicId ${stadiumPublicId} deletado.`
            })
        } catch (error) {
            throw error
        }

    }
}
