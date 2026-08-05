import type { FastifyInstance } from "fastify";
import { createTeam } from "./create_team_controller.js";


export function adminTeamRoutes(app: FastifyInstance) {
    app.post('/', createTeam)
} 