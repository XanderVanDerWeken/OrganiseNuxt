export interface Board {
    id: number;
    title: string;
    lists ?: List[];
}

export interface List {
    id: number;
    title: string;
    order: number;
    cards ?: Card[];
};

export interface Card {
    id: number;
    title: string;
    description ?: string;
    order: number;
}