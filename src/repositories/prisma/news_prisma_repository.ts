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

    async findByGroup(groupId: number) {
        const news = await prisma.news.findMany({
            where: {
            groupId,
            },
        });

        return news;
    }

    async findManyRecent({
        page = 1,
        limit = 5
    }: {
        page?: number,
        limit?: number
    }
    ) {
        const skip = (page - 1) * limit;

        const [data, totalCount] = await Promise.all([
            prisma.news.findMany({
                orderBy: {
                    createdAt: "desc",
                },
                skip,
                take: limit,
            }),

            prisma.news.count(),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            data,
            totalCount,
            totalPages,
            currentPage: page,
        };
    }

    async getNewsDetailsByPublicId(publicId: string) {
    return prisma.news.findUnique({
        where: {
           publicId,
        },
            include: {
            author: true,
            group: true,
        },
    });
    }
}