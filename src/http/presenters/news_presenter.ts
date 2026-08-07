import type { News } from "@/@types/prisma/client.js";
import type { NewsWithRelations } from "@/use_cases/news/create_news.js"


interface HTTPRawNews {
    id: string
    titulo: string
    textoAbertura: string
    textoCorpo: string
    urlImagemCapa: string
    tempoLeitura: string
    criadoEm: Date
    atualizadoEm: Date
}

interface HTTPNews {
    id: string
    titulo: string
    textoAbertura: string
    textoCorpo: string
    urlImagemCapa: string
    tempoLeitura: string
    autor: string
    grupo: string
    criadoEm: Date
    atualizadoEm: Date
}

export class NewsPresenter {
    static toHTTP(news: NewsWithRelations): HTTPNews
    static toHTTP(newsList: NewsWithRelations[]): HTTPNews[]
    static toHTTP(input: NewsWithRelations | NewsWithRelations[]): HTTPNews | HTTPNews[] {
        if (Array.isArray(input)) {
            return input.map((n) => this.toHTTP(n))
        }

        return {
            id: input.publicId,
            titulo: input.title,
            textoAbertura: input.openingText,
            textoCorpo: input.bodyText,
            urlImagemCapa: input.coverImageUrl,
            tempoLeitura: input.readingTime,
            autor: input.author.name,
            grupo: input.group.name,
            criadoEm: input.createdAt,
            atualizadoEm: input.updatedAt,
        }
    }

    static RawtoHTTP(news: News): HTTPRawNews
    static RawtoHTTP(newsList: News[]): HTTPRawNews[]
    static RawtoHTTP(input: News | News[]): HTTPRawNews | HTTPRawNews[] {
        if (Array.isArray(input)) {
            return input.map((n) => this.RawtoHTTP(n))
        }

        return {
            id: input.publicId,
            titulo: input.title,
            textoAbertura: input.openingText,
            textoCorpo: input.bodyText,
            urlImagemCapa: input.coverImageUrl,
            tempoLeitura: input.readingTime,
            criadoEm: input.createdAt,
            atualizadoEm: input.updatedAt,
        }
    }
}