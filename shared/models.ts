export interface BoardOverviewDTO {
    title: string;
}

export interface BoardDTO {
    title: string;
    lists: ListDTO[];
}

export interface ListDTO {
    id: number;
    title: string;
    order: number;
    cards: CardDTO[];
}

export interface CardDTO {
    id: number;
    title: string;
    description?: string;
    order: number;
}

export interface BoardInput {
    id: number;
    title: string;
    lists: {
        id: number;
        title: string;
        order: number;
        cards: {
            id: number;
            title: string;
            description?: string;
            order: number;
        }[];
    }[];
};
