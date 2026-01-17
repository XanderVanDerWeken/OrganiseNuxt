<script setup lang="ts">
import PasswordInput from '~/components/PasswordInput.vue';
</script>

<template>
    <div>
        <label for="username">Username</label>
        <input id="username" type="text" />

        <br/>

        <PasswordInput password-id="password" />
    </div>
</template>
