<script setup lang="ts">
import type { CardDTO } from '~~/shared/models';

defineProps<CardDTO>();
</script>

<template>
    <div class="card">
        <span class="card-title">{{ title }}</span>
        <span v-if="description != null" class="card-description">{{ description }}</span>
    </div>
</template>

<style scoped>
.card {
    background: var(--bg-surface);
    border-radius: 8px;
    padding: 12px;
    margin: 8px;
}

span {
    display: block;
}

.card-title {
    font-size: 13px;
    font-weight: 500;
}

.card-description {
    display: block;
    margin-top: 8px;
    color: var(--text-muted);
}
</style>