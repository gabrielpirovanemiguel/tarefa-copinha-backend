import type { FastifyInstance } from "fastify";
import { createGroup } from "./create_group_controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyAdmin } from "@/http/middlewares/verify-admin.js";
import { updateGroup } from "./update_group_controller.js";
import { deleteGroup } from "./delete_group_controller.js";


export function adminGroupRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJWT, verifyAdmin] }, createGroup)
    app.put('/:groupPublicId', { onRequest: [verifyJWT, verifyAdmin] }, updateGroup)
    app.delete('/:groupPublicId', { onRequest: [verifyJWT, verifyAdmin] }, deleteGroup)
} 