<script setup lang="ts">
import type { BoardOverview } from '~~/shared/models';

defineProps<BoardOverview>();
</script>

<template>
    <div class="board-card" @click="async () => await navigateTo(`/boards/${title}`)">
        <h2>{{ title }}</h2>
    </div>
</template>

<style scoped>
.board-card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 8px 0;
    border-radius: 4px;
}
</style>