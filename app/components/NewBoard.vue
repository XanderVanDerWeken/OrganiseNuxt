<script setup lang="ts">
import { ref } from 'vue';
import { useBoardOverviewStore } from '~/stores/boardOverview';

const store = useBoardOverviewStore();

const boardTitle = ref('');
const isShowingForm = ref(false);

async function createBoard() {
    await store.createNewBoard(boardTitle.value);

    boardTitle.value = '';
}

function cancel() {
    isShowingForm.value = false;
    boardTitle.value = '';
}
</script>

<template>
    <div v-if="isShowingForm">
        <p>Create new Board</p>
        <input v-model="boardTitle" placeholder="Board Title"><br>
        <button @click="createBoard">Create Board</button>
        <button @click="cancel">Cancel</button>
    </div>
    <div v-else>
        <button @click="isShowingForm = true">+ New Board</button>
    </div>
</template>

<style scoped>
button {
    background-color: var(--accent);
    cursor: pointer;
}

button:hover {
    background: var(--accent-hover);
}
</style>