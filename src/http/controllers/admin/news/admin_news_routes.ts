import type { FastifyInstance } from "fastify";
import { createNews } from "./create_news_controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyAdmin } from "@/http/middlewares/verify-admin.js";

export function adminNewsRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJWT, verifyAdmin] }, createNews)
}