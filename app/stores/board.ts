import { defineStore } from 'pinia';
import type { Board } from '~~/shared/models';

export const useBoardStore = defineStore('board', {
    state: () => ({
        board: null as Board | null,
    }),

    actions: {
        async loadBoard(title: string) {
            this.board = await $fetch<Board>(`/api/boards/${encodeURI(title)}`);
        },
    },
});