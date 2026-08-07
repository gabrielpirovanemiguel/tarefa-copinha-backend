import { NewsPrismaRepository } from "@/repositories/prisma/news_prisma_repository.js";
import { ListNewsByGroupUseCase} from "@/use_cases/news/list-news-by-group.js";


export function makeListNewsByGroupUseCase(){
    const NewsRepository = new NewsPrismaRepository()
    const getNewsDetailsUseCase = new ListNewsByGroupUseCase(NewsRepository)
    return getNewsDetailsUseCase
}