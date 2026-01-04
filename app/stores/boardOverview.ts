import { defineStore } from 'pinia';
import type { BoardOverviewDTO } from '~~/shared/models';

export const useBoardOverviewStore = defineStore('boardOverview', {
    state: () => ({
        boards: [] as BoardOverviewDTO[],
        loading: false,
    }),

    actions: {
        async loadBoards() {
            this.loading = true
            this.boards = await $fetch('/api/boards')
            this.loading = false
        },

        async createNewBoard(title: string) {
            const newBoard = await $fetch<BoardOverviewDTO>('/api/boards', {
                method: 'POST',
                body: { title },
            });
            this.boards.push(newBoard);
        },
    }
});