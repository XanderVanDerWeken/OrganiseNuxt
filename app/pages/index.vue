<script setup lang="ts">
import BoardCard from '@/components/BoardCard.vue';
import NewBoard from '~/components/NewBoard.vue';
import { useBoardOverviewStore } from '~/stores/boardOverview';

const store = useBoardOverviewStore();

await store.loadBoards();
</script>

<template>
    <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the main landing page of the application.</p>
        <div class="board-list">
            <div v-for="board in store.boards" :key="board.title">
                <BoardCard v-bind="board"/>
            </div>
            <NewBoard />
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