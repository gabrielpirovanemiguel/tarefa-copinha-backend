import { NewsNotFoundError } from "@/use_cases/errors/news_not_found.js";
import { makeDeleteNewsUseCase } from "@/use_cases/factories/news/make_delete_news.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function deleteNews(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { newsPublicId } = z.object({ newsPublicId: z.string('ID da notícia é obrigatório') }).parse(request.params)
        const deleteNewsUseCase = makeDeleteNewsUseCase()
        await deleteNewsUseCase.execute({ newsPublicId, userPublicId: request.user.sub })

        return reply.status(200).send({ message: "Notícia deletada com sucesso." })
    } catch (error) {
        if (error instanceof NewsNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
