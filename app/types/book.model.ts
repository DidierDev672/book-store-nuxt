import type { Author } from "./author.model";
import type { Genre } from "./genre.model";

export interface Book {
    id: number;
    title: string;
    published_year: number;
    available: boolean;
    author: Author;
    genre: Genre;
}