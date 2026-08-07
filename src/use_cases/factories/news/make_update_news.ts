import { NewsPrismaRepository } from "@/repositories/prisma/news_prisma_repository.js"
import { GroupPrismaRepository } from "@/repositories/prisma/group_prisma_repository.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"
import { UpdateNewsUseCase } from "@/use_cases/news/update_news.js"


export function makeUpdateNewsUseCase() {
    const newsRepository = new NewsPrismaRepository()
    const groupRepository = new GroupPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    return new UpdateNewsUseCase(newsRepository, groupRepository, generateLogUseCase)
}