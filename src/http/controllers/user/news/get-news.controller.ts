import { NewsPresenter } from "@/http/presenters/news_presenter.js";
import { NewsNotFoundError } from "@/use_cases/errors/news_not_found.js";
import { makeGetNewsUseCase } from "@/use_cases/factories/news/make-get-news.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function getNews(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getNewsParamsSchema = z.object({
      publicId: z.uuid(),
    });

    const { publicId } = getNewsParamsSchema.parse(request.params);

    const getNewsUseCase = makeGetNewsUseCase();

    const { news } = await getNewsUseCase.execute({
      newsId: publicId,
    });

    return reply
      .status(200)
      .send(NewsPresenter.toHTTP(news));

  } catch (error) {
    if (error instanceof NewsNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
}