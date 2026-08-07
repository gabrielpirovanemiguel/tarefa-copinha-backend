import { GroupPresenter } from "@/http/presenters/group_presenter.js";
import { GroupAlreadyExistsError } from "@/use_cases/errors/group_already_exists.js";
import { makeCreateGroupUseCase } from "@/use_cases/factories/groups/make_create_group.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const createGroupBodySchema = z.object({
    name: z.string("O nome do grupo informado é inválido ou inexistente.").min(2, "O nome do grupo deve ter no mínimo 2 caracteres.").max(50, "O nome do grupo deve ter no máximo 50 caracteres.")
})

export async function createGroup( 
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { name } = createGroupBodySchema.parse(request.body)
        const createGroupUseCase = makeCreateGroupUseCase()
        const {group} = await createGroupUseCase.execute({name, userPublicId: request.user.sub})
        
        return reply.status(201).send(GroupPresenter.toHTTP(group))
    } catch (error) {
        if (error instanceof GroupAlreadyExistsError) {
            return reply.status(409).send({message: error.message})
        }
        throw error
    }
}