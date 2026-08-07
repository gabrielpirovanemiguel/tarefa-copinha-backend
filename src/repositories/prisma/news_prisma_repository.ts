import type { Prisma } from "@/@types/prisma/client.js";
import type { NewsInclude } from "@/@types/prisma/models.js";
import type { NewsRepository } from "../news_repository.js";
import { prisma } from "@/libs/prisma.js";


export class NewsPrismaRepository implements NewsRepository {
    async createNews(data: Prisma.NewsCreateInput, include?: NewsInclude) {
        return await prisma.news.create({data,include})
    }

    async getNewsByPublicId(publicId: string, include?: NewsInclude) {
        return await prisma.news.findUnique({ where: { publicId }, include })
    }

    async updateNews(where: Prisma.NewsWhereUniqueInput, data: Prisma.NewsUpdateInput, include?: NewsInclude) {
        return await prisma.news.update({ where, data, include })
    }

    async deleteNews(where: Prisma.NewsWhereUniqueInput) {
        await prisma.news.delete({ where })
    }
}