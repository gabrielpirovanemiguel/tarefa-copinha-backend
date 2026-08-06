import { NewsPrismaRepository } from "@/repositories/prisma/news_prisma_repository.js"
import { GroupPrismaRepository } from "@/repositories/prisma/group_prisma_repository.js"
import { UserPrismaRepository } from "@/repositories/prisma/user_prisma_repository.js"
import { CreateNewsUseCase } from "@/use_cases/news/create_news.js"
import { makeGenerateLogUseCase } from "../logs/make_generate_log.js"

export function makeCreateNewsUseCase() {
    const newsRepository = new NewsPrismaRepository()
    const groupRepository = new GroupPrismaRepository()
    const userRepository = new UserPrismaRepository()
    const generateLogUseCase = makeGenerateLogUseCase()
    return new CreateNewsUseCase(newsRepository, groupRepository, userRepository, generateLogUseCase)
}