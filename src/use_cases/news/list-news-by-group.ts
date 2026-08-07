import type { News } from "@/@types/prisma/client.js";
import type { NewsRepository } from "@/repositories/news_repository.js";

interface ListNewsUseCaseRequest {
    groupId: number
}

interface ListNewsUseCaseResponse {
    news: News[]
}

export class ListNewsByGroupUseCase {
    constructor(private newsRepository: NewsRepository) {}

    async execute({
        groupId,
    }: ListNewsUseCaseRequest)
    : Promise<ListNewsUseCaseResponse> {
        const news = await this.newsRepository.findByGroup( groupId );

        return { news }
    }
}