import type { BoardDTO, BoardOverviewDTO } from "~~/shared/models";
import type { Board, Card, List } from "./board.models";

export function toBoardOverviewDTO(board: Board): BoardOverviewDTO {
    return {
        title: board.title,
    }
}

export function toBoardDTO(board: Board): BoardDTO {
    return {
        title: board.title,
        lists: board.lists?.map(toListDTO) ?? [],
    }
}

function toListDTO(list: List) {
    return {
        title: list.title,
        order: list.order,
        cards: list.cards?.map(toCardDTO) ?? [],
    };
}

function toCardDTO(card: Card) {
    return {
        title: card.title,
        description: card.description || undefined,
        order: card.order,
    };
}