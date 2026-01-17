<script setup lang="ts">
const props = defineProps<{
    passwordId: string,
}>();

const passwordIsShown = ref(false);

function getPasswordType(): string {
    return passwordIsShown.value
        ? "text"
        : "password";
}

function showPasswordId() {
    return "show-" + props.passwordId;
}
</script>

<template>
    <label :for="passwordId">Password</label>
    <input :id="passwordId" :type="getPasswordType()" />

    <label :for="showPasswordId()">Show Password?</label>
    <input :id="showPasswordId()" v-model="passwordIsShown" type="checkbox" />
</template>
