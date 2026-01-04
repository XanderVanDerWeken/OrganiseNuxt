<script setup lang="ts">
import type { ListDTO } from '~~/shared/models';

defineProps<ListDTO>();
</script>

<template>
    <div>
        <span class="list-title">{{ title }}</span>
        <div class="card-container">
            <CardComp
                v-for="card in cards"
                :key="card.order"
                v-bind="card" />
        </div>
    </div>
</template>

<style scoped>
.list-title {
    font-weight: 1000;
}

.card-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
}
</style>