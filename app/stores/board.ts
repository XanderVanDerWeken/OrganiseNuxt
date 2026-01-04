import { defineStore } from 'pinia';
import type { BoardDTO } from '~~/shared/models';

export const useBoardStore = defineStore('board', {
    state: () => ({
        board: null as BoardDTO | null,
    }),

    actions: {
        async loadBoard(title: string) {
            this.board = await $fetch<BoardDTO>(`/api/boards/${encodeURI(title)}`);
        },
    },
});