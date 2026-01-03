<script setup lang="ts">
import BoardCard from '@/components/BoardCard.vue';
import type { BoardOverview } from '~~/shared/models';

const boards: BoardOverview[] = await fetchBoardOverviews();

async function fetchBoardOverviews(): Promise<BoardOverview[]> {
    return await $fetch<BoardOverview[]>('/api/boards');
}
</script>

<template>
    <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the main landing page of the application.</p>
        <div class="board-list">
            <div v-for="board in boards" :key="board.title">
                <BoardCard v-bind="board"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.board-list {
    display: flex;
    flex-flow: row wrap;

    justify-content: space-around;
    align-items: stretch;
    align-content: flex-start;
    gap: 10px 20px;
}
</style>