<template>
    <sandbox-item v-for="item in rectangles" :key="item.id" :item="item" :container-ref="containerRef" />
</template>

<script setup lang="ts">
import SandboxItem from './sandbox-item.vue';
import { useRectangleGetters } from '@/store/getters';

defineProps<{containerRef: HTMLDivElement | null}>()

const { rectangles } = useRectangleGetters();
</script>

/* Основной стиль для всех ручек */
.resize-handle {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #42b883;
  border-radius: 50%;

  &_right {
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    cursor: e-resize;
  }

  &_left {
    left: -4px;
    top: 50%;
    transform: translateY(-50%);
    cursor: w-resize;
  }

  &_top {
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    cursor: n-resize;
  }

  &_bottom {
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    cursor: s-resize;
  }

  &_top-left {
    left: -4px;
    top: -4px;
    cursor: nw-resize;
  }

  &_top-right {
    right: -4px;
    top: -4px;
    cursor: ne-resize;
  }

  &_bottom-left {
    left: -4px;
    bottom: -4px;
    cursor: sw-resize;
  }

  &_bottom-right {
    right: -4px;
    bottom: -4px;
    cursor: se-resize;
  }
}
