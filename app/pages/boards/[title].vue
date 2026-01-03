<script setup lang="ts">
import { useBoardStore } from '~/stores/board';

const route = useRoute();
const store = useBoardStore();

await store.loadBoard(route.params.title as string);
</script>

<template>
    <div v-if="store.board != null">
        <h2>{{ store.board!.title }}</h2>
        <ListComp
            v-for="list in store.board!.lists"
            :key="list.order"
            v-bind="list" />
    </div>
    <div v-else>
        <p>Loading board...</p>
    </div>
</template>