<script setup lang="ts">
import { ref } from 'vue';
import { useBoardOverviewStore } from '~/stores/boardOverview';

const store = useBoardOverviewStore();

const boardTitle = ref('');

async function createBoard() {
    await store.createNewBoard(boardTitle.value);

    boardTitle.value = '';
}
</script>

<template>
    <div>
        <span>Create new Board</span>
        <input v-model="boardTitle" placeholder="Board Title">
        <button @click="createBoard">Create Board</button>
    </div>
</template>