import { NewsPrismaRepository } from "@/respositories/prisma/news_prisma_repository.js"
import { GroupPrismaRepository } from "@/respositories/prisma/group_prisma_repository.js"
import { UserPrismaRepository } from "@/respositories/prisma/user_prisma_repository.js"
import { CreateNewsUseCase } from "@/use_cases/news/create_news.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"

export function makeCreateNewsUseCase() {
    const newsRepository = new NewsPrismaRepository()
    const groupRepository = new GroupPrismaRepository()
    const userRepository = new UserPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    return new CreateNewsUseCase(newsRepository, groupRepository, userRepository, generateLogUseCase)
}