import type { FastifyInstance } from "fastify";
import { createNews } from "./create_news_controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyAdmin } from "@/http/middlewares/verify-admin.js";
import { updateNews } from "./update_news_controller.js";
import { deleteNews } from "./delete_news_controller.js";

export function adminNewsRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJWT, verifyAdmin] }, createNews)
    app.put('/:newsPublicId', { onRequest: [verifyJWT, verifyAdmin] }, updateNews)
    app.delete('/:newsPublicId', { onRequest: [verifyJWT, verifyAdmin] }, deleteNews)
}