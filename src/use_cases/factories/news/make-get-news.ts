import { NewsPrismaRepository } from "@/repositories/prisma/news_prisma_repository.js";
import { GetNewsUseCase } from "@/use_cases/news/get-news.js";


export function makeGetNewsUseCase(){
    const NewsRepository = new NewsPrismaRepository()
    const getNewsDetailsUseCase = new GetNewsUseCase(NewsRepository)
    return getNewsDetailsUseCase
}