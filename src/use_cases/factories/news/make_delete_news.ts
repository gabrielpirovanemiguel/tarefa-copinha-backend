import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { DeleteNewsUseCase } from "@/use_cases/news/delete_news.js"
import { NewsPrismaRepository } from "@/repositories/prisma/news_prisma_repository.js"

export function makeDeleteNewsUseCase() {
    const newsRepository = new NewsPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    const deleteNewsUseCase = new DeleteNewsUseCase(newsRepository, generateLogUseCase)
    return deleteNewsUseCase
}
