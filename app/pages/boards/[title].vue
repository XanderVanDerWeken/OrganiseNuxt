<script setup lang="ts">
import { useBoardStore } from '~/stores/board';
import draggable from 'vuedraggable';

const route = useRoute();
const store = useBoardStore();

await store.loadBoard(route.params.title as string);
</script>

<template>
    <div v-if="store.board != null" class="board">
        <h2>{{ store.board!.title }}</h2>
        <div class="lists">
            <div v-for="list in store.board!.lists" :key="list.order" class="list">
                <span class="list-title">{{ list.title }}</span>

                <draggable
                    :list="list.cards"
                    item-key="id"
                    group="cards"
                    class="cards"
                    @change="store.saveBoard(store.board!)">
                    <template #item="{ element }">
                        <div class="card">
                            <span class="card-title">{{ element.title }}</span>
                            <span v-if="element.description != null" class="card-description">{{ element.description }}</span>
                        </div>
                    </template>
                </draggable>
            </div>
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

.list {
    flex: 0 0 280px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.list-title {
    font-size: 14px;
    font-weight: 600;
}

.cards {
    width: 280px;
    border-radius: 8px;
    padding: 8px;
}

.card {
    background: var(--bg-surface);
    border-radius: 8px;
    padding: 12px;
    margin: 8px;
}

.card span {
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