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

export interface PutBoardDTO {
    id ?: number;
    title: string;
    lists: PutListDTO[];
}

export interface PutListDTO {
    id ?: number;
    title: string;
    order: number;
    cards: PutCardDTO[];
}

export interface PutCardDTO {
    id ?: number;
    title: string;
    description ?: string;
    order: number;
}
