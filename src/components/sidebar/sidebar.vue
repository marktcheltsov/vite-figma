<template>
    <aside class="sidebar">
      <div class="sidebar__header">
        <h2 class="sidebar__header-title">Элементы</h2>
        <button class="sidebar__header-button" @click="addItem">Добавить</button>
      </div>
      <sidebar-item-settings />
      <sidebar-list :items="rectangles" /> 
    </aside>
  </template>

<script setup lang="ts">

import SidebarList from './sidebar-list.vue';
import SidebarItemSettings from './sidebar-item-settings.vue';

import { useRectangleGetters } from '@/store/getters';
import { useRectangleActions } from '@/store/actions';

const { rectangles } = useRectangleGetters();
const { addItem } = useRectangleActions();

</script>

<style scoped>
.sidebar {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  width: 30%;
  background-color: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    &-title {
      font-size: 20px;
      font-weight: 600;
      color: #fff;
    }

    &-button {
      padding: 10px 20px;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      background-color: #42b883;
      border-radius: 5px;
    }
  }
}
</style>