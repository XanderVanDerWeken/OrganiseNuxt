export interface BoardOverview {
    title: string;
}

export interface Board {
    title: string;
    lists: List[];
}

export interface List {
    title: string;
    order: number;
    cards: Card[];
}

export interface Card {
    title: string;
    description: string;
    order: number;
}
