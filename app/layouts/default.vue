<script setup lang="ts">
import ThemeButton from '@/components/ThemeButton.vue';
</script>

<template>
    <div>
        <header>
            <h1>Organise Nuxt</h1>

            <div>
                <ThemeButton />
                <Icon name="material-symbols:menu" size="1.5em" />
            </div>
        </header>

        <slot />

        <footer>
            Made by Xander
        </footer>
    </div>
</template>

<style scoped>
header {
    display: flex;
    background-color: var(--bg-surface);
    align-items: center;
    justify-content: space-between;
    padding: 0px;
    margin: 0px;
}

header h1 {
    display: block;
}

header div {
    display: inline-block;
}

header div:hover {
    cursor: pointer;
    text-decoration: underline;
}

footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: var(--bg-surface);
    padding: 10px;
    text-align: center;
    margin-top: 20px;
}
</style>