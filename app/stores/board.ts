import { defineStore } from 'pinia';
import type { BoardDTO, ListDTO, PutBoardDTO, PutCardDTO, PutListDTO } from '~~/shared/models';

export const useBoardStore = defineStore('board', {
    state: () => ({
        board: null as BoardDTO | null,
    }),

    actions: {
        async loadBoard(title: string) {
            this.board = await $fetch<BoardDTO>(`/api/boards/${encodeURI(title)}`);
        },

        async saveBoard(board: BoardDTO) {
            this.board = await $fetch<BoardDTO>(`/api/boards`, {
                method: 'PUT',
                body: {
                    // id: board.id, // TODO:
                    title: board.title,
                    lists: board.lists.map((list: ListDTO) => ({
                        id: list.id,
                        title: list.title,
                        order: list.order,
                        cards: list.cards.map((card: PutCardDTO) => ({
                            id: card.id,
                            title: card.title,
                            description: card.description,
                            order: card.order,
                        } as PutCardDTO)),
                    } as PutListDTO)),
                } as PutBoardDTO
            });
        },
    },
});