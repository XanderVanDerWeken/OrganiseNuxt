<script setup lang="ts">
import type { Card } from '~~/shared/models';

defineProps<Card>();
</script>

<template>
    <div>
        <h3>{{ title }}</h3>
        <p v-if="description != null">{{ description }}</p>
    </div>
</template>