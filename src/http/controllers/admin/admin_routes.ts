import type { FastifyInstance } from "fastify";
import { adminGroupRoutes } from "./groups/admin_group_routes.js";
import { adminTeamRoutes } from "./teams/admin_team_routes.js";


export function adminRoutes(app: FastifyInstance) {
    app.register(adminGroupRoutes, { prefix: '/groups' })
    app.register(adminTeamRoutes, { prefix: '/teams' })
}