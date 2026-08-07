import { ENTITY_TYPES, LOG_ACTIONS, type Prisma } from "@/@types/prisma/client.js"
import { GroupNotFoundError } from "../errors/group_not_found.js"
import { NewsNotFoundError } from "../errors/news_not_found.js"
import type { NewsWithRelations } from "./create_news.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"
import type { GroupRepository } from "@/repositories/group_repository.js"
import type { NewsRepository } from "@/repositories/news_repository.js"

interface UpdateNewsUseCaseRequest {
    userPublicId: string
    newsPublicId: string
    groupPublicId?: string
    title?: string
    openingText?: string
    bodyText?: string
    coverImageUrl?: string
    readingTime?: string
}

interface UpdateNewsUseCaseResponse {
    news: NewsWithRelations
}

export class UpdateNewsUseCase {
    constructor(
        private newsRepository: NewsRepository,
        private groupRepository: GroupRepository,
        private logRepository: GenerateLogUseCase
    ) { }
    async execute({
        userPublicId,
        newsPublicId,
        groupPublicId,
        title,
        openingText,
        bodyText,
        coverImageUrl,
        readingTime
    }: UpdateNewsUseCaseRequest): Promise<UpdateNewsUseCaseResponse> {
        try {
            const doesNewsExist = await this.newsRepository.getNewsByPublicId(newsPublicId, { author: true, group: true })
            if (!doesNewsExist) throw new NewsNotFoundError()
            if (groupPublicId) {
                const doesGroupExist = await this.groupRepository.getGroupByPublicId(groupPublicId)
                if (!doesGroupExist) throw new GroupNotFoundError()
            }
            const data: Prisma.NewsUpdateInput = {
                title,
                openingText,
                bodyText,
                coverImageUrl,
                readingTime,
                group: groupPublicId ? { connect: { publicId: groupPublicId } } : undefined
            }
            const news = await this.newsRepository.updateNews({ publicId: newsPublicId }, data, { author: true, group: true }) as NewsWithRelations
            await this.logRepository.execute({
                userPublicId,
                action: LOG_ACTIONS.updating,
                entityType: ENTITY_TYPES.news,
                entityId: news.id,
                oldValues: doesNewsExist,
                newValues: news,
                description: `Notícia com o publicId ${newsPublicId} atualizada.`
            })
            return { news }
        } catch (error) {
            throw error
        }

    }
}