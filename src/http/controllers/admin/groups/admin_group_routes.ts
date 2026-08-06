import type { FastifyInstance } from "fastify";
import { createGroup } from "./create_group_controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyAdmin } from "@/http/middlewares/verify-admin.js";


export function adminGroupRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJWT, verifyAdmin] }, createGroup)
} 