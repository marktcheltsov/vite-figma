<template>
    <div v-if="selectedRectangle" class="sidebar-item-settings">
        <h2 class="sidebar-item-settings__title ">{{ selectedRectangle.name }}</h2>
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
import { useRectangleGetters } from '@/store/getters';

const { selectedRectangle } = useRectangleGetters();

</script>

<style scoped>
.sidebar-item-settings {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
  margin: 0 0 20px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }

  &__color,
  &__size,
  &__position {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__input {
    width: 100%;
    padding: 5px;
    border: 1px solid #e9ecef;
    border-radius: 5px;

    &_color {
      width: 100%;
      padding: 5px;
      border: 1px solid #e9ecef;
      border-radius: 5px;
    }

    &_number {
      width: 100%;
      padding: 5px;
      border: 1px solid #e9ecef;
      border-radius: 5px;
    }
  }
}
</style>