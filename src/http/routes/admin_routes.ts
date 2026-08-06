import type { FastifyInstance } from "fastify";
import { adminGroupRoutes } from "../controllers/admin/groups/admin_group_routes.js";
import { adminTeamRoutes } from "../controllers/admin/teams/admin_team_routes.js";
import { adminStadiumRoutes } from "../controllers/admin/stadiums/admin_stadium_routes.js";
import { adminMatchRoutes } from "../controllers/admin/matches/admin_match_routes.js";
import { adminMatchResultRoutes } from "../controllers/admin/results/admin_match_result_routes.js";
import { adminNewsRoutes } from "../controllers/admin/news/admin_news_routes.js";



export function adminRoutes(app: FastifyInstance) {
    app.register(adminGroupRoutes, { prefix: '/groups' })
    app.register(adminTeamRoutes, { prefix: '/teams' })
    app.register(adminStadiumRoutes, { prefix: '/stadiums' })
    app.register(adminMatchRoutes, { prefix: '/matches' })
    app.register(adminMatchResultRoutes, { prefix: '/matches-results' })
    app.register(adminNewsRoutes, { prefix: '/news' }) 
}