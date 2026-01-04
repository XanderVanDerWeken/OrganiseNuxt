<script setup lang="ts">
import { useBoardStore } from '~/stores/board';

const route = useRoute();
const store = useBoardStore();

await store.loadBoard(route.params.title as string);
</script>

<template>
    <div v-if="store.board != null">
        <h2>{{ store.board!.title }}</h2>
        <div class="list-container">
            <ListComp
                v-for="list in store.board!.lists"
                :key="list.order"
                v-bind="list" />
        </div>
    </div>
    <div v-else>
        <p>Loading board...</p>
    </div>
</template>

<style scoped>
.list-container {
    display: flex;
    gap: 16px;
    flex-flow: row nowrap;
    overflow-x: auto;
    padding: 8px 0;
}
</style>