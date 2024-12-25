<template>
    <aside class="sidebar">
      <div class="sidebar__header">
        <h2 class="sidebar__header-title">Элементы</h2>
        <button class="sidebar__header-button" @click="actions.addItem">Добавить</button>
      </div>
      <sidebar-item-settings />
      <sidebar-list :items="store.rectangles" /> 
    </aside>
  </template>

<script setup lang="ts">

import SidebarList from './sidebar-list.vue';
import SidebarItemSettings from './sidebar-item-settings.vue';

import { store } from '../../store/items';
import { actions } from '../../store/items';

</script>