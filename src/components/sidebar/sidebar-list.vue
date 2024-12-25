<template>
    <div class="sidebar__content">
        <div v-if="items.length" class="sidebar__list-header">
            <h2 class="sidebar__list-header-title">Ваши элементы</h2>
        </div> 
        <div v-else class="sidebar__list-header"></div>
        <div class="sidebar__list">
            <sidebar-item v-for="item in items" :key="item.id" :item="item" />
        </div>
    </div>
</template>

<script setup lang="ts">
import SidebarItem from './sidebar-item.vue';
import { Rectangle } from '../../types/interfaces';

const { items } = defineProps<{items: Rectangle[]}>();  

</script>
