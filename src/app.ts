<<<<<<< HEAD
import Fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { env } from './env/index.js'
import { appRoutes } from './http/routes.js'
=======
import Fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import z, { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env/index.js";
import { authRoutes } from "@/http/routes/auth.routes.js";
>>>>>>> origin/main

export const app = Fastify({ logger: true });

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

<<<<<<< HEAD
app.get('/health', async (request, reply) => {
    return reply.status(200).send({ status: 'ok' })
})

app.register(appRoutes)

app.setErrorHandler((error: any, _request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: error.issues[0]?.message ?? 'Dados inválidos.'
        })
=======
app.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch {
      reply.status(401).send({
        message: "Unauthorized.",
      });
>>>>>>> origin/main
    }
  },
);

app.get("/health", async (request, reply) => {
  return reply.status(200).send({ status: "ok" });
});

app.setErrorHandler((error: any, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
<<<<<<< HEAD
        .status(500)
        .send({ message: 'Erro interno do servidor!' + error.message})
})
=======
      .status(400)
      .send({ message: z.prettifyError(error).replace("\n ", "") });
  }

  if (error instanceof SyntaxError) {
    return reply.status(400).send({
      message:
        "O corpo da requisição não está em formato JSON válido. Verifique a estrutura dos dados enviados.",
    });
  }

  return reply
    .status(500)
    .send({ message: "Erro interno do servidor!" + error.message });
});

app.register(authRoutes, {
  prefix: "/auth",
});
>>>>>>> origin/main
