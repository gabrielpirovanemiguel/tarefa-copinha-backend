import type { FastifyInstance } from "fastify";
import { createMatch } from "./create_match_controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyAdmin } from "@/http/middlewares/verify-admin.js";
import { updateMatch } from "./update_match_controller.js";
import { deleteMatch } from "./delete_match_controller.js";


export function adminMatchRoutes(app: FastifyInstance) {
    app.post('/', {onRequest: [verifyJWT, verifyAdmin]}, createMatch)
    app.put('/:matchPublicId', {onRequest: [verifyJWT, verifyAdmin]}, updateMatch)
    app.delete('/:matchPublicId', {onRequest: [verifyJWT, verifyAdmin]}, deleteMatch)
} 