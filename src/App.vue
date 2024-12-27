<script setup lang="ts">
import TheSidebar from './components/sidebar/sidebar.vue'
import TheSandbox from './components/sandbox/sandbox.vue'
</script>

<template>
  <div class="main-layout">
    <TheSidebar />
    <TheSandbox />
  </div>
</template>

<style>
  .main-layout {
    display: flex;
    width: 100%;
    height: 100vh;
  }

</style>
