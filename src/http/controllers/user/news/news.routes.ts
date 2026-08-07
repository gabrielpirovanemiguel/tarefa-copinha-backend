import type { FastifyInstance } from "fastify";
import { getNews } from "./get-news.controller.js";
import { listNewsByGroup } from "./list-news-by-group.controller.js";
import { listNews } from "./list-news.controller.js";

export async function userNewsRoutes(app: FastifyInstance){
    app.get('/:publicId', getNews)
    app.get('/group_filter', listNewsByGroup)
    app.get('/', listNews)
}