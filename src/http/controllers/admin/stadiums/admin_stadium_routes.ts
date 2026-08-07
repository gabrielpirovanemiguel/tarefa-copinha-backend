import type { FastifyInstance } from "fastify";
import { createStadium } from "./create_stadium_controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyAdmin } from "@/http/middlewares/verify-admin.js";
import { updateStadium } from "./update_stadium_controller.js";
import { deleteStadium } from "./delete_stadium_controller.js";


export function adminStadiumRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJWT, verifyAdmin] }, createStadium)
    app.put('/:stadiumPublicId', { onRequest: [verifyJWT, verifyAdmin] }, updateStadium)
    app.delete('/:stadiumPublicId', { onRequest: [verifyJWT, verifyAdmin] }, deleteStadium)
} 