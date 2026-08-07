import { NewsPresenter } from "@/http/presenters/news_presenter.js";
import { makeListNewsByGroupUseCase } from "@/use_cases/factories/news/make-list-news-by-group.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";

export async function listNewsByGroup(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listNewsByGroupParamsSchema = z.object({
      groupId: z.coerce.number(),
    });

    const { groupId } = listNewsByGroupParamsSchema.parse(request.params);

    const listNewsByGroupUseCase = makeListNewsByGroupUseCase();

    const { news } =
      await listNewsByGroupUseCase.execute({
        groupId,
      });

    return reply.status(200).send({
      news: NewsPresenter.RawtoHTTP(news),
    });

  } catch (error) {
    throw error;
  }
}