import type { FastifyInstance } from "fastify";
import { adminGroupRoutes } from "./groups/admin_group_routes.js";
import { adminTeamRoutes } from "./teams/admin_team_routes.js";
import { adminStadiumRoutes } from "./stadiums/admin_stadium_routes.js";
import { adminMatchRoutes } from "./matches/admin_match_routes.js";
import { adminMatchResultRoutes } from "./results/admin_match_result_routes.js";


export function adminRoutes(app: FastifyInstance) {
    app.register(adminGroupRoutes, { prefix: '/groups' })
    app.register(adminTeamRoutes, { prefix: '/teams' })
    app.register(adminStadiumRoutes, { prefix: '/stadiums' })
    app.register(adminMatchRoutes, { prefix: '/matches' })
    app.register(adminMatchResultRoutes, { prefix: '/matches-results' })
}