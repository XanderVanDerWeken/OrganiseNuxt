<script setup lang="ts">
import type { BoardOverviewDTO } from '~~/shared/models';

defineProps<BoardOverviewDTO>();

async function toCard(title: string) {
    await navigateTo(`/boards/${title}`);
}
</script>

<template>
    <div @click="toCard(title)">
        <h2>{{ title }}</h2>
    </div>
</template>

<style scoped>
</style>