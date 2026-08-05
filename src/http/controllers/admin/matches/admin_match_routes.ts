import type { FastifyInstance } from "fastify";
import { createMatch } from "./create_match_controller.js";


export function adminMatchRoutes(app: FastifyInstance) {
    app.post('/', createMatch)
} 