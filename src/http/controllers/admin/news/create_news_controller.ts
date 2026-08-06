import { NewsPresenter } from "@/http/presenters/news_presenter.js";
import { GroupNotFoundError } from "@/use_cases/errors/group_not_found.js";
import { UserNotFoundError } from "@/use_cases/errors/user_not_found.js";
import { makeCreateNewsUseCase } from "@/use_cases/factories/news/make_create_news.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const createNewsBodySchema = z.object({
    authorPublicId: z.string("O publicId do autor informado é inválido ou inexistente.").min(1, "O publicId do autor deve ter no mínimo 1 caractere.").max(50, "O publicId do autor deve ter no máximo 50 caracteres."),
    groupPublicId: z.string("O publicId do grupo informado é inválido ou inexistente.").min(1, "O publicId do grupo deve ter no mínimo 1 caractere.").max(50, "O publicId do grupo deve ter no máximo 50 caracteres."),
    title: z.string("O título informado é inválido ou inexistente.").min(2, "O título deve ter no mínimo 2 caracteres.").max(150, "O título deve ter no máximo 150 caracteres."),
    openingText: z.string("O texto de abertura informado é inválido ou inexistente.").min(1, "O texto de abertura não pode estar vazio."),
    bodyText: z.string("O texto do corpo informado é inválido ou inexistente.").min(1, "O texto do corpo não pode estar vazio."),
    coverImageUrl: z.url("A URL da imagem de capa informada é inválida."),
    readingTime: z.string("O tempo de leitura informado é inválido ou inexistente.").min(1, "O tempo de leitura não pode estar vazio."),
})

export async function createNews(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const data = createNewsBodySchema.parse(request.body)
        const createNewsUseCase = makeCreateNewsUseCase()
        const { news } = await createNewsUseCase.execute({ ...data, userPublicId: request.user.sub })

        return reply.status(201).send(NewsPresenter.toHTTP(news))
    } catch (error) {
        if (error instanceof GroupNotFoundError || error instanceof UserNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}