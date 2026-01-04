<script setup lang="ts">
import { useBoardStore } from '~/stores/board';

const route = useRoute();
const store = useBoardStore();

await store.loadBoard(route.params.title as string);
</script>

<template>
    <div v-if="store.board != null" class="board">
        <h2>{{ store.board!.title }}</h2>
        <div class="lists">
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
.board {
    height: 100%;
    overflow-x: auto;
}

.lists {
    display: flex;
    gap: 12px;
    padding: 12px;
}

ListComp {
    flex: 0 0 280px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
</style>