<script setup lang="ts">
import type { ListDTO } from '~~/shared/models';

defineProps<ListDTO>();
</script>

<template>
    <div>
        <span class="list-title">{{ title }}</span>
        <div class="cards">
            <CardComp
                v-for="card in cards"
                :key="card.order"
                v-bind="card" />
        </div>
    </div>
</template>

<style scoped>
.list-title {
    font-size: 14px;
    font-weight: 600;
}

.cards {
    width: 280px;
    border-radius: 8px;
    padding: 8px;
}
</style>