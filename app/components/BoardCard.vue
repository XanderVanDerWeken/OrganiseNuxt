<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <div class="board-card">
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