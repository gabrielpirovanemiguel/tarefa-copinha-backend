import type { FastifyInstance } from "fastify";
import { createStadium } from "./create_stadium_controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyAdmin } from "@/http/middlewares/verify-admin.js";


export function adminStadiumRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJWT, verifyAdmin] }, createStadium)
} 