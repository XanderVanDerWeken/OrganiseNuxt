<script setup lang="ts">
const modes = ['system', 'light', 'dark'];

const nextMode = (mode: string): string => {
    const currentIndex = modes.indexOf(mode);
    return modes[(currentIndex + 1) % modes.length] ?? 'system';
};

const getIcon = (mode: string) => {
    switch (mode) {
        case 'system':
            return 'material-symbols:computer';
        case 'light':
            return 'material-symbols:light-mode';
        case 'dark':
            return 'material-symbols:dark-mode';
        default:
            return 'material-symbols:computer';
    }
};
</script>

<template>
    <div>
        <button 
            @click="() => $colorMode.preference = nextMode($colorMode.preference)">
            <Icon :name="getIcon($colorMode.preference)" size='1.5em' />
        </button>
    </div>
</template>

<style scoped>
button {
    border: none;
    background-color: var(--layout-bg);
    color: var(--text);
    cursor: pointer;
    margin-right: 10px;
}

select {
    border: none;
    background-color: var(--layout-bg);
    color: var(--text);
}
</style>