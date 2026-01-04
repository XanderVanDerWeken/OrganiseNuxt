<script setup lang="ts">
import type { CardDTO } from '~~/shared/models';

defineProps<CardDTO>();
</script>

<template>
    <div class="card-container">
        <span class="card-title">{{ title }}</span>
        <span v-if="description != null" class="card-description">{{ description }}</span>
    </div>
</template>

<style scoped>
.card-container {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    margin-top: 10px;
    background-color: #9e9e9e;
}

.card-title {
    display: block;
    font-weight: 600;
}

.card-description {
    margin-top: 10px;
}
</style>