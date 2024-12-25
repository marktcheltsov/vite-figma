<template>
    <div v-if="selectedRectangle" class="sidebar-item-settings">
        <h2 class="sidebar-item-settings__title">{{ selectedRectangle.name }}</h2>
        <div class="sidebar-item-settings__color">
            <label for="color">Color</label>
            <input 
                type="color" 
                id="color" 
                v-model="selectedRectangle.color" 
            />
        </div>
        <div class="sidebar-item-settings__size">
            <label for="width">Width</label>
            <input 
                type="number" 
                id="width" 
                v-model="selectedRectangle.width" 
            />
            <label for="height">Height</label>
            <input 
                type="number" 
                id="height" 
                v-model="selectedRectangle.height" 
            />
        </div>
        <div class="sidebar-item-settings__position">
            <label for="x">X</label>
            <input 
                type="number" 
                id="x" 
                v-model="selectedRectangle.x" 
            />
            <label for="y">Y</label>
            <input 
                type="number" 
                id="y" 
                v-model="selectedRectangle.y" 
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { store } from '../../store/items';

const selectedRectangle = computed(() => 
    store.rectangles.find(rect => rect.id === store.selectedId)
);
</script>