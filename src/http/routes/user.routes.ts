import type { FastifyInstance } from "fastify";
import { userMatchesRoutes } from "../controllers/user/matches/matches.routes.js";
import { userNewsRoutes } from "../controllers/user/news/news.routes.js";
import { userTeamRoutes } from "../controllers/user/teams/teams.routes.js";

export async function userRoutes(app: FastifyInstance){
    app.register(userMatchesRoutes, { prefix: '/matches'})
    app.register(userNewsRoutes, { prefix: '/news'})
    app.register(userTeamRoutes, { prefix: '/teams'})
}