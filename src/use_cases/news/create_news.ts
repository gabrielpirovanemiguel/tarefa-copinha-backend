import { ENTITY_TYPES, LOG_ACTIONS, Prisma } from "@/@types/prisma/client.js"
import type { GenerateLogUseCase } from "../logs/generate_log.js"
import type { NewsRepository } from "@/respositories/news_repository.js"
import type { GroupRepository } from "@/respositories/group_repository.js"
import type { UserRepository } from "@/respositories/user_repository.js"
import { GroupNotFoundError } from "../errors/group_not_found.js"
import { UserNotFoundError } from "../errors/user_not_found.js"

interface CreateNewsUseCaseRequest {
    authorPublicId: string
    groupPublicId: string
    title: string
    openingText: string
    bodyText: string
    coverImageUrl: string
    readingTime: string
}

const newsInclude = {
    author: true,
    group: true,
} satisfies Prisma.NewsInclude

export type NewsWithRelations = Prisma.NewsGetPayload<{ include: typeof newsInclude }>

interface CreateNewsUseCaseResponse {
    news: NewsWithRelations
}

export class CreateNewsUseCase {
    constructor(
        private newsRepository: NewsRepository,
        private groupRepository: GroupRepository,
        private userRepository: UserRepository,
        private logRepository: GenerateLogUseCase
    ) { }

    async execute({
        authorPublicId,
        groupPublicId,
        title,
        openingText,
        bodyText,
        coverImageUrl,
        readingTime
    }: CreateNewsUseCaseRequest): Promise<CreateNewsUseCaseResponse> {
        try {
            const author = await this.userRepository.getUserByPublicId(authorPublicId)
            if (!author) throw new UserNotFoundError()

            const group = await this.groupRepository.getGroupByPublicId(groupPublicId)
            if (!group) throw new GroupNotFoundError()

            const data: Prisma.NewsCreateInput = {
                title,
                openingText,
                bodyText,
                coverImageUrl,
                readingTime,
                author: { connect: { id: author.id } },
                group: { connect: { id: group.id } },
            }

            const news = await this.newsRepository.createNews(data, newsInclude) as NewsWithRelations

            await this.logRepository.execute({
                userId: 1,
                action: LOG_ACTIONS.creating,
                entityType: ENTITY_TYPES.news,
                entityId: news.id,
                newValues: {
                    authorId: author.id,
                    groupId: group.id,
                    title,
                    openingText,
                    bodyText,
                    coverImageUrl,
                    readingTime,
                },
            })


            return { news }
        } catch (error) {
            throw error
        }
    }
}