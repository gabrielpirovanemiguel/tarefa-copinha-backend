import type { FastifyInstance } from "fastify";
import { createNews } from "./create_news_controller.js";

export function adminNewsRoutes(app: FastifyInstance) {
    app.post('/', createNews)
}