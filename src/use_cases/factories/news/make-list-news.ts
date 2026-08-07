import { NewsPrismaRepository } from "@/repositories/prisma/news_prisma_repository.js";
import { ListNewsUseCase } from "@/use_cases/news/list-news.js";

export function makeListNewsUseCase(){
    const NewsRepository = new NewsPrismaRepository()
    const getNewsDetailsUseCase = new ListNewsUseCase(NewsRepository)
    return getNewsDetailsUseCase
}