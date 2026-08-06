import type { FastifyInstance } from "fastify";

import { simulateGroup } from "../controllers/simulator.controller.js";

export async function simulatorRoutes(app: FastifyInstance) {
  app.post("/", simulateGroup);
}
