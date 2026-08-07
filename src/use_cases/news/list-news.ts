import type { News } from "@/@types/prisma/client.js";
import type { NewsRepository } from "@/repositories/news_repository.js";

interface ListNewsUseCaseRequest {
    page: number
    limit: number
}

interface ListNewsUseCaseResponse {
    news: News[]
    totalCount: number
    totalPages: number
    currentPage: number
}

export class ListNewsUseCase {
    constructor(private newsRepository: NewsRepository) {}

    async execute({
        page,
        limit,
    }: ListNewsUseCaseRequest): Promise<ListNewsUseCaseResponse> {
    const {
        data: news,
        totalCount,
        totalPages,
        currentPage,
    } = await this.newsRepository.findManyRecent( { page, limit } );

    return {
        news,
        totalCount,
        totalPages,
        currentPage,
    };
}
}