<template>
    <div>
        <header>
            <h1>Organise Nuxt</h1>

            <div>
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
    background-color: #f5f5f5;
    align-items: center;
    justify-content: space-between;
    padding: 0px;
    margin: 0px;
}

header h1 {
    display: block;
}

header div {
    display: block;
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
    background-color: #f5f5f5;
    padding: 10px;
    text-align: center;
    margin-top: 20px;
}
</style>