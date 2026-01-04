<script setup lang="ts">
import { ref } from 'vue';

const boardTitle = ref('');

async function createBoard() {
    await useFetch('/api/boards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: boardTitle.value })
    });

    
}
</script>

<template>
    <div>
        <span>Create new Board</span>
        <input v-model="boardTitle" placeholder="Board Title">
        <button @click="createBoard">Create Board</button>
    </div>
</template>