<script setup lang="ts">
import type { List } from '~~/shared/models';

defineProps<List>();
</script>

<template>
    <div>
        <span>{{ title }}</span>
        <CardComp
            v-for="card in cards"
            :key="card.order"
            v-bind="card" />
    </div>
</template>