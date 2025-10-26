import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type MoviePageResponse = PageObjectResponse & {
    properties: {
        Title: { type: "title"; title: Array<{ text: { content: string } }> };
        Year: { type: "number"; number: number | null };
        Rating: { type: "number"; number: number | null };
        Genres: { type: "multi_select"; multi_select: Array<{ name: string }> };
        Watched: { type: "checkbox"; checkbox: boolean };
        Plot: { type: "rich_text"; rich_text: Array<{ text: { content: string } }> };
        Director: { type: "rich_text"; rich_text: Array<{ text: { content: string } }> };
        Actors: { type: "rich_text"; rich_text: Array<{ text: { content: string } }> };
        PosterUrl: { type: "url"; url: string | null };
    };
};

// Simple type for metadata from external source
export type metadata = {
    title: string;
    year: number;
    released: string;
    genres: string[];
    director: string;
    actors: string;
    plot: string;
    rating: number;
    posterUrl: string;
};

// Simple type for basic page info
export type page = {
    title: string;
    year: number;
    id: string;
};
