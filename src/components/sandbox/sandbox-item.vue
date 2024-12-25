<template>
    <div 
        class="sand-box__content-item" 
        :class="{'sand-box__content-item_selected': item.id === store.selectedId}"
        :style="{
            backgroundColor: item.color, 
            width: item.width + 'px', 
            height: item.height + 'px', 
            left: item.x + 'px', 
            top: item.y + 'px'
        }"
        @mousedown="(e) => handleMouseDown(e, item.id)"
    >
        <div 
            v-if="item.id === store.selectedId"
            class="resize-handle"
            :class="`resize-handle-left`"
            @mousedown="(e) => handleResizeStart(e, item.id, 'left')"
        ></div>
        <div 
            v-if="item.id === store.selectedId"
            class="resize-handle"
            :class="`resize-handle-top`"
            @mousedown="(e) => handleResizeStart(e, item.id, 'top')"
        ></div>
        <div 
            v-if="item.id === store.selectedId"
            class="resize-handle"
            :class="`resize-handle-right`"
            @mousedown="(e) => handleResizeStart(e, item.id, 'right')"
        ></div>
        <div 
            v-if="item.id === store.selectedId"
            class="resize-handle"
            :class="`resize-handle-bottom`"
            @mousedown="(e) => handleResizeStart(e, item.id, 'bottom')"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { Rectangle } from '../../types/interfaces';
import { store } from '../../store/items';
import { useDraggable } from '../../hooks/use-drag';
import { useResizable } from '../../hooks/use-resize';
import { onMounted, onUnmounted } from 'vue';
defineProps<{item: Rectangle}>();

const { handleMouseDown, handleMouseMove, handleMouseUp } = useDraggable();
const { handleResizeMove, handleResizeEnd, handleResizeStart } = useResizable();

onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp) 
  document.addEventListener('mousemove', handleResizeMove)
  document.addEventListener('mouseup', handleResizeEnd)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleResizeMove)
  document.removeEventListener('mouseup', handleResizeEnd)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})

</script>