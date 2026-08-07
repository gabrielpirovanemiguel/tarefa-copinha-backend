import { NewsPresenter } from "@/http/presenters/news_presenter.js";
import { makeListNewsUseCase } from "@/use_cases/factories/news/make-list-news.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function listNews(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listNewsQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).max(100).default(10),
    });

    const { page, limit } = listNewsQuerySchema.parse(request.query);

    const listNewsUseCase = makeListNewsUseCase();

    const {
      news,
      totalCount,
      totalPages,
      currentPage,
    } = await listNewsUseCase.execute({
      page,
      limit,
    });

    return reply.status(200).send({
      news: NewsPresenter.RawtoHTTP(news),
      totalCount,
      totalPages,
      currentPage,
    });

  } catch (error) {
    throw error;
  }
}