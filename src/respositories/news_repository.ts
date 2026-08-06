import type { News, Prisma } from "@/@types/prisma/client.js";
import type { NewsInclude } from "@/@types/prisma/internal/prismaNamespaceBrowser.js";

export interface NewsRepository {
    createNews(data: Prisma.NewsCreateInput, include?: NewsInclude): Promise<News>
    getNewsByPublicId(publicId: string, include?: NewsInclude): Promise<News | null>
    updateNews(where: Prisma.NewsWhereUniqueInput, data: Prisma.NewsUpdateInput, include?: NewsInclude): Promise<News>
}