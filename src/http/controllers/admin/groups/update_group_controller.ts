import { GroupPresenter } from "@/http/presenters/group_presenter.js";
import { GroupAlreadyExistsError } from "@/use_cases/errors/group_already_exists.js";
import { GroupNotFoundError } from "@/use_cases/errors/group_not_found.js";
import { UserNotFoundError } from "@/use_cases/errors/user_not_found.js";
import { makeUpdateGroupUseCase } from "@/use_cases/factories/groups/make_update_group.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const updateGroupBodySchema = z.object({
    name: z.string("O nome do grupo informado é inválido ou inexistente.").min(2, "O nome do grupo deve ter no mínimo 2 caracteres.").max(50, "O nome do grupo deve ter no máximo 50 caracteres.").optional(),
})

export async function updateGroup(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { name } = updateGroupBodySchema.parse(request.body)
        const { groupPublicId } = z.object({ groupPublicId: z.string() }).parse(request.params)
        const data = { name, groupPublicId, userPublicId: request.user.sub }
        const updateGroupUseCase = makeUpdateGroupUseCase()
        const { group } = await updateGroupUseCase.execute(data)

        return reply.status(201).send(GroupPresenter.toHTTP(group))
    } catch (error) {
        if (error instanceof GroupNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        if (error instanceof GroupAlreadyExistsError) {
            return reply.status(409).send({ message: error.message })
        }
        if (error instanceof UserNotFoundError) {
            return reply.status(404).send({ message: error.message })
        }
        throw error
    }
}
