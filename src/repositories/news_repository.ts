import type { News, Prisma } from "@/@types/prisma/client.js";
import type { NewsInclude } from "@/@types/prisma/internal/prismaNamespaceBrowser.js";

interface ListNewsQuery {
  page?: number
  limit?: number
}

interface ListNewsResponse {
  data: News[]
  totalCount: number
  totalPages: number
  currentPage: number
}

export interface NewsRepository {
    createNews(data: Prisma.NewsCreateInput, include?: NewsInclude): Promise<News>
    getNewsByPublicId(publicId: string, include?: NewsInclude): Promise<News | null>
    getNewsDetailsByPublicId(publicId: string): Promise<Prisma.NewsGetPayload<{include: {author: true; group: true;};}> | null>
    updateNews(where: Prisma.NewsWhereUniqueInput, data: Prisma.NewsUpdateInput, include?: NewsInclude): Promise<News>
    findByGroup(groupId: number): Promise<News[]>
    findManyRecent(query: ListNewsQuery): Promise<ListNewsResponse>
}