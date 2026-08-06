import {
  LoginUseCase
} from "./chunk-3VVJZ6TC.js";
import {
  verifyJWT
} from "./chunk-ICPLS7RI.js";
import {
  PrismaUserRepository
} from "./chunk-PHVD5ASE.js";
import {
  prisma
} from "./chunk-EDHVKHAN.js";
import {
  env
} from "./chunk-ULMIM7XF.js";

// src/app.ts
import Fastify from "fastify";
import z2, { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";

// src/http/controllers/auth.controller.ts
import z from "zod";
async function login(request, reply) {
  const bodySchema = z.object({
    email: z.email(),
    password: z.string().min(6)
  });
  const { email, password } = bodySchema.parse(request.body);
  const useCase = new LoginUseCase(
    new PrismaUserRepository(),
    new FastifyJwtService()
  );
  const result = await useCase.execute({
    email,
    password
  });
  return reply.status(200).send(result);
}
async function me(request, reply) {
  const user = await prisma.user.findUnique({
    where: {
      publicId: request.user.sub
    },
    select: {
      publicId: true,
      name: true,
      username: true,
      email: true,
      role: true
    }
  });
  if (!user) {
    return reply.status(404).send({
      message: "User not found."
    });
  }
  return reply.status(200).send(user);
}
async function logout(_request, reply) {
  return reply.status(200).send({
    message: "Logout successful."
  });
}

// src/http/routes/auth.routes.ts
async function authRoutes(app2) {
  app2.post("/login", login);
  app2.post(
    "/logout",
    {
      preHandler: [verifyJWT]
    },
    logout
  );
  app2.get(
    "/me",
    {
      preHandler: [verifyJWT]
    },
    me
  );
}

// src/app.ts
var app = Fastify({ logger: true });
app.register(fastifyJwt, {
  secret: env.JWT_SECRET
});
app.decorate(
  "authenticate",
  async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch {
      reply.status(401).send({
        message: "Unauthorized."
      });
    }
  }
);
app.get("/health", async (request, reply) => {
  return reply.status(200).send({ status: "ok" });
});
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: z2.prettifyError(error).replace("\n ", "") });
  }
  if (error instanceof SyntaxError) {
    return reply.status(400).send({
      message: "O corpo da requisi\xE7\xE3o n\xE3o est\xE1 em formato JSON v\xE1lido. Verifique a estrutura dos dados enviados."
    });
  }
  return reply.status(500).send({ message: "Erro interno do servidor!" + error.message });
});
app.register(authRoutes, {
  prefix: "/auth"
});
app.register(simulatorRoutes, {
  prefix: "/simulator"
});

// src/services/jwt/fastify-jwt-service.ts
var FastifyJwtService = class {
  async sign(payload) {
    return app.jwt.sign(payload);
  }
};

export {
  FastifyJwtService,
  login,
  me,
  logout,
  authRoutes,
  app
};
//# sourceMappingURL=chunk-JRLSYFJZ.js.map