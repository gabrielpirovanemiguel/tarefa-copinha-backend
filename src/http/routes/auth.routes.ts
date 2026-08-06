import type { FastifyInstance } from "fastify";

import { verifyJWT } from "../middlewares/verify-jwt.js";

import { login, logout, me } from "../controllers/auth.controller.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", login);

  app.post(
    "/logout",
    {
      preHandler: [verifyJWT],
    },
    logout,
  );

  app.get(
    "/me",
    {
      preHandler: [verifyJWT],
    },
    me,
  );
}
