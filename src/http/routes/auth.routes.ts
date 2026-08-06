import type { FastifyInstance } from "fastify";

import { login } from "../controllers/auth.controller.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", login);
}
