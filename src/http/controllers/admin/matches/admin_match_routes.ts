import type { FastifyInstance } from "fastify";
import { createMatch } from "./create_match_controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyAdmin } from "@/http/middlewares/verify-admin.js";


export function adminMatchRoutes(app: FastifyInstance) {
    app.post('/', {onRequest: [verifyJWT, verifyAdmin]}, createMatch)
} 