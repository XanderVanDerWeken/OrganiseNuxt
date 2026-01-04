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
        <div class="container">
            <div class="board-container">
                <BoardCard 
                    v-for="board in store.boards" 
                    :key="board.title" 
                    v-bind="board" 
                    class="board-card"/>
            </div>
            
            <NewBoard />
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 4px;
}

.board-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 8px;
    grid-row-gap: 8px; 
}

.board-card {
    background: var(--bg-surface);
    padding: 16px;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.15s ease;
}

.board-card:hover {
    background: var(--bg-surface-hover);
}
</style>