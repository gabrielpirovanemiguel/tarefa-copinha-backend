import { ENTITY_TYPES, LOG_ACTIONS, type Group } from "@/@types/prisma/client.js"
import { GroupNotFoundError } from "../errors/group_not_found.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"
import type { NewsRepository } from "@/repositories/news_repository.js"
import { NewsNotFoundError } from "../errors/news_not_found.js"

interface DeleteNewsUseCaseRequest {
    userPublicId: string
    newsPublicId: string
}

export class DeleteNewsUseCase {
    constructor(
        private newsRepository: NewsRepository,
        private logRepository: GenerateLogUseCase
    ) { }
    async execute({
        userPublicId,
        newsPublicId,
    }: DeleteNewsUseCaseRequest): Promise<void> {
        try {
            const doesNewsExist = await this.newsRepository.getNewsByPublicId(newsPublicId)
            if (!doesNewsExist) throw new NewsNotFoundError()
            await this.newsRepository.deleteNews({ publicId: newsPublicId })
            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.deleting,
                entityType: ENTITY_TYPES.news,
                entityId: doesNewsExist.id,
                description: `Notícia com o publicId ${newsPublicId} deletada.`
            })
        } catch (error) {
            throw error
        }

    }
}
