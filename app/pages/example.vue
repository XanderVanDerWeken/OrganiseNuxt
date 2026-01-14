<script setup lang="ts">
import type { BoardDTO } from '~~/shared/models';
import draggable from 'vuedraggable';

const isEditMode = ref(false);

const board = ref<BoardDTO>({
    title: 'Example Board',
    lists: [
        {
            title: 'ToDo',
            order: 1,
            cards: [
                { title: 'Task 1', description: 'Description for Task 1', order: 1 },
                { title: 'Task 2', description: 'Description for Task 2', order: 2 }
            ],
        },
        {
            title: 'In Progress',
            order: 2,
            cards: [
                { title: 'Task 3', description: 'Description for Task 3', order: 1 },
                { title: 'Task 4', order: 2 },
                { title: 'Task 5', description: 'Description for Task 5', order: 3 }
            ],
        },
    ],
});

</script>

<template>
    <div>
        <h2>{{ board!.title }}</h2>
        <button @click="isEditMode = !isEditMode">Edit Mode</button>

        <div v-if="!isEditMode" class="board">
            <div class="lists">
                <div v-for="list in board!.lists" :key="list.order" class="list">
                    <span class="list-title">{{ list.title }}</span>

                    <draggable
                        :list="list.cards"
                        item-key="order"
                        group="cards"
                        class="cards">
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
            <div class="lists">
                <draggable
                    :list="board.lists"
                    item-key="order"
                    class="list">
                    <template #item="{ element }">
                        <span class="list-title">{{ element.title }}</span>
                    </template>
                </draggable>
            </div>
        </div>
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