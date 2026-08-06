import type { Prisma } from "@/@types/prisma/client.js";
import type { NewsInclude } from "@/@types/prisma/models.js";
import type { NewsRepository } from "../news_repository.js";
import { prisma } from "@/libs/prisma.js";


export class NewsPrismaRepository implements NewsRepository {
    async createNews(data: Prisma.NewsCreateInput, include?: NewsInclude) {
        return await prisma.news.create({data,include})
    }
}