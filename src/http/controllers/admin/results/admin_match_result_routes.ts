import type { FastifyInstance } from "fastify";
import { createMatchResult } from "./create_match_result_controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyAdmin } from "@/http/middlewares/verify-admin.js";
import { updateMatchResult } from "./update_match_result_controller.js";
import { deleteMatchResult } from "./delete_match_result_controller.js";


export function adminMatchResultRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJWT, verifyAdmin] }, createMatchResult)
    app.put('/:matchResultPublicId', { onRequest: [verifyJWT, verifyAdmin] }, updateMatchResult)
    app.delete('/:matchResultPublicId', { onRequest: [verifyJWT, verifyAdmin] }, deleteMatchResult)
} 