import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { LoginUseCase } from "@/use_cases/auth/login.js";
import { PrismaUserRepository } from "@/repositories/prisma-user-repository.js";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = bodySchema.parse(request.body);

  const useCase = new LoginUseCase(new PrismaUserRepository());

  const result = await useCase.execute({
    email,
    password,
  });

  return reply.status(200).send(result);
}
