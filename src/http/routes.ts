import type { FastifyInstance } from "fastify";
import { adminRoutes } from "./routes/admin_routes.js";



export async function appRoutes(app: FastifyInstance) {
    app.register(adminRoutes, { prefix: '/admin' })
}