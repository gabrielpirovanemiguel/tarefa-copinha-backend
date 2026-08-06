import type { News, Prisma } from "@/@types/prisma/client.js";
import type { NewsInclude } from "@/@types/prisma/internal/prismaNamespaceBrowser.js";

export interface NewsRepository {
    createNews(data: Prisma.NewsCreateInput, include?: NewsInclude): Promise<News>
}