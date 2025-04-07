export interface Book {
    id: number;
    title: string;
    authors: Author[];
    summaries: string[];
    img: string
}

export interface Author {
    doB: number;
    doD: number;
    name: string
}
