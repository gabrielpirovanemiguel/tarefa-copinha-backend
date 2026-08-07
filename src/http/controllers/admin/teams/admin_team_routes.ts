import type { FastifyInstance } from "fastify";
import { createTeam } from "./create_team_controller.js";
import { verifyJWT } from "@/http/middlewares/verify-jwt.js";
import { verifyAdmin } from "@/http/middlewares/verify-admin.js";
import { updateTeam } from "./update_team_controller.js";
import { deleteTeam } from "./delete_team_controller.js";


export function adminTeamRoutes(app: FastifyInstance) {
    app.post('/', { onRequest: [verifyJWT, verifyAdmin] }, createTeam)
    app.put('/:teamPublicId', { onRequest: [verifyJWT, verifyAdmin] }, updateTeam)
    app.delete('/:teamPublicId', { onRequest: [verifyJWT, verifyAdmin] }, deleteTeam)
} 