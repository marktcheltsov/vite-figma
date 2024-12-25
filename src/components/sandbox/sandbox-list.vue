<template>
    <sandbox-item v-for="item in store.rectangles" :key="item.id" :item="item" />
</template>

<script setup lang="ts">

import SandboxItem from './sandbox-item.vue';
import { store } from '../../store/items';

</script>