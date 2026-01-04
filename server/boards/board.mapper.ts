/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BoardDTO } from "~~/shared/models";

export function toBoardDTO(board: any): BoardDTO {
  return {
    title: board.title,
    lists: board.lists.map(toListDTO),
  }
}

function toListDTO(list: any) {
    return {
        title: list.title,
        order: list.order,
        cards: list.cards.map(toCardDTO),
    };
}

function toCardDTO(card: any) {
    return {
        title: card.title,
        description: card.description || undefined,
        order: card.order,
    };
}