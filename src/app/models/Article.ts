import { Source } from "./Source";
export class Article {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    source: Source;
}
