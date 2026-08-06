import {
  PrismaUserRepository
} from "./chunk-PHVD5ASE.js";
import {
  env
} from "./chunk-ULMIM7XF.js";

// src/use_cases/auth/login.ts
import bcrypt from "bcryptjs";

// src/app.ts
import Fastify from "fastify";
import z2, { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";

// src/http/controllers/auth.controller.ts
import z from "zod";

// src/services/jwt/fastify-jwt-service.ts
var FastifyJwtService = class {
  async sign(payload) {
    return app.jwt.sign(payload);
  }
};

// src/http/controllers/auth.controller.ts
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

// src/http/routes/auth.routes.ts
async function authRoutes(app3) {
  app3.post("/login", login);
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

// src/use_cases/auth/login.ts
var LoginUseCase = class {
  constructor(usersRepository, jwtService) {
    this.usersRepository = usersRepository;
    this.jwtService = jwtService;
  }
  usersRepository;
  jwtService;
  async execute({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials.");
    }
    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      throw new Error("Invalid credentials.");
    }
    const token = await this.jwtService.sign({
      sub: user.publicId,
      role: user.role
    });
    return {
      token,
      user: {
        publicId: user.publicId,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  }
};

export {
  LoginUseCase,
  FastifyJwtService,
  login,
  authRoutes,
  app
};
//# sourceMappingURL=chunk-MPN5VQ3L.js.map