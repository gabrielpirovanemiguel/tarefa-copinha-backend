import z from "zod";
import { prisma } from "@/libs/prisma.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import { LoginUseCase } from "@/use_cases/auth/login.js";
import { FastifyJwtService } from "@/services/jwt/fastify-jwt-service.js";
import { UserPrismaRepository } from "@/repositories/prisma/user_prisma_repository.js";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = bodySchema.parse(request.body);

  const useCase = new LoginUseCase(
    new UserPrismaRepository(),
    new FastifyJwtService(),
  );

  const result = await useCase.execute({
    email,
    password,
  });

  return reply.status(200).send(result);
}

export async function me(request: FastifyRequest, reply: FastifyReply) {
  const user = await prisma.user.findUnique({
    where: {
      publicId: request.user.sub,
    },
    select: {
      publicId: true,
      name: true,
      username: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    return reply.status(404).send({
      message: "User not found.",
    });
  }

  return reply.status(200).send(user);
}

export async function logout(_request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({
    message: "Logout successful.",
  });
}
