import { NewsPresenter } from "@/http/presenters/news_presenter.js";
import { GroupNotFoundError } from "@/use_cases/errors/group_not_found.js";
import { UserNotFoundError } from "@/use_cases/errors/user_not_found.js";
import { makeUpdateNewsUseCase } from "@/use_cases/factories/news/make_update_news.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const updateNewsBodySchema = z.object({
    groupPublicId: z.string("O publicId do grupo informado é inválido ou inexistente.").max(50, "O publicId do grupo deve ter no máximo 50 caracteres.").optional(),
    title: z.string("O título informado é inválido ou inexistente.").min(2, "O título deve ter no mínimo 2 caracteres.").max(150, "O título deve ter no máximo 150 caracteres.").optional(),
    openingText: z.string("O texto de abertura informado é inválido ou inexistente.").optional(),
    bodyText: z.string("O texto do corpo informado é inválido ou inexistente.").min(1, "O texto do corpo não pode estar vazio.").optional(),
    coverImageUrl: z.url("A URL da imagem de capa informada é inválida.").optional(),
    readingTime: z.string("O tempo de leitura informado é inválido ou inexistente.").optional(),
})

export async function updateNews(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { groupPublicId, title, openingText, bodyText, coverImageUrl, readingTime } = updateNewsBodySchema.parse(request.body)
        const {newsPublicId} = z.object({ newsPublicId: z.string() }).parse(request.params)
        const data = {groupPublicId, title, openingText, bodyText, coverImageUrl, readingTime, newsPublicId, userPublicId: request.user.sub}
        const updateNewsUseCase = makeUpdateNewsUseCase()
        const { news } = await updateNewsUseCase.execute(data)

        return reply.status(201).send(NewsPresenter.toHTTP(news))
    } catch (error) {
        if (error instanceof GroupNotFoundError || error instanceof UserNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}