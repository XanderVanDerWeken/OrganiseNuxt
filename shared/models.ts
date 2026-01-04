export interface BoardOverviewDTO {
    title: string;
}

export interface BoardDTO {
    title: string;
    lists: ListDTO[];
}

export interface ListDTO {
    title: string;
    order: number;
    cards: CardDTO[];
}

export interface CardDTO {
    title: string;
    description?: string;
    order: number;
}
