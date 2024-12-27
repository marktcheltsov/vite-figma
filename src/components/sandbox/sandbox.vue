<template>
  <main class="sand-box">
    <div class="sand-box__content" ref="containerRef">
      <sandbox-list :container-ref="containerRef" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import SandboxList from './sandbox-list.vue';

const containerRef = useTemplateRef<HTMLDivElement>('containerRef')
</script>

<style scoped>
.sand-box {
  width: 70%;
  height: 100vh;
  background-color: #ffffff;
  &__content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>
