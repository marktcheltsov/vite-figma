<template>
    <div class="sidebar__content-item" :class="{ 'sidebar__content-item_active': item.id === store.selectedId }" @click="actions.setSelectedId(item.id)">
        <div class="sidebar__content-item-name">{{ item.name }}</div>
        <div v-if="item.id === store.selectedId" class="sidebar__content-delete">
            <button class="sidebar__content-delete-button" @click.stop="actions.deleteItem(item.id)">Удалить</button>
        </div>  
    </div>
</template>

<script setup lang="ts">
import { Rectangle } from '../../types/interfaces';
import { actions } from '../../store/items';
import { store } from '../../store/items';

const { item } = defineProps<{item: Rectangle}>();

</script> 
