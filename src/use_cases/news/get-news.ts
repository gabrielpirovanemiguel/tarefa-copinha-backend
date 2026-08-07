import type { Prisma } from "@/@types/prisma/client.js";
import { NewsNotFoundError } from "../errors/news_not_found.js";
import type { NewsRepository } from "@/repositories/news_repository.js";

type GetNewsUseCaseRequest = {
  newsId: string;
}

type GetNewsUseCaseResponse = {
  news: Prisma.NewsGetPayload<{
    include: {
      author: true;
      group: true;
    };
  }>
}

export class GetNewsUseCase {
  constructor(private newsRepository: NewsRepository) {}

  async execute({
    newsId,
  }: GetNewsUseCaseRequest): Promise<GetNewsUseCaseResponse> {
    const news = await this.newsRepository.getNewsDetailsByPublicId(newsId);

    if (!news) {
      throw new NewsNotFoundError();
    }

    return { news };
  }
}

