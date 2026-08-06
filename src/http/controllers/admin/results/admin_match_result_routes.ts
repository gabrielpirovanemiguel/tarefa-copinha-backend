import type { FastifyInstance } from "fastify";
import { createMatchResult } from "./create_match_result_controller.js";


export function adminMatchResultRoutes(app: FastifyInstance) {
    app.post('/', createMatchResult)
} 