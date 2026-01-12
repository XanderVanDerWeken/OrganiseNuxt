<script setup lang="ts">
    import draggable from 'vuedraggable';

    const items1 = ref([
        { id: 1, name: 'Item 1', order: 1 },
        { id: 2, name: 'Item 2', order: 2 },
        { id: 3, name: 'Item 3', order: 3 },
        { id: 4, name: 'Item 4', order: 4 }
    ]);

    const items2 = ref([
        { id: 5, name: 'Item 5', order: 1 },
        { id: 6, name: 'Item 6', order: 2 },
        { id: 7, name: 'Item 7', order: 3 },
        { id: 8, name: 'Item 8', order: 4 }
    ]);

    function updateOrder(list: typeof items1.value) {
        list.forEach((item, index) => {
            item.order = index + 1;
        })
    }

    function printLists() {
        console.log('List 1:', items1.value);
        console.log('List 2:', items2.value);
    }
</script>

<template>
    <div>
        <button @click="printLists">Print Lists to Console</button>

        <h2>Draggable Items 1</h2>
        
        <draggable 
            :list="items1"
            item-key="id"
            group="items"
            @change="updateOrder(items1); updateOrder(items2);">
            <template #item="{ element }">
                <div class="container">
                    {{ element.name }} 
                </div>
            </template>
        </draggable>

        <h2>Draggable Items 2</h2>

        <draggable 
            :list="items2"
            item-key="id"
            group="items"
            @change="updateOrder(items1); updateOrder(items2);">
            <template #item="{ element }">
                <div class="container">
                    {{ element.name }} 
                </div>
            </template>
        </draggable>
    </div>
</template>

<style scoped>
    .container {
        padding: 4px;
        margin: 4px;
        background-color: var(--bg-surface);
    }
</style>