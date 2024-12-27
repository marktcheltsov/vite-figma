<template>
    <div 
        class="sand-box__content-item" 
        :class="{'sand-box__content-item_selected': checkSelectedId(item.id)}"
        :style="{
            backgroundColor: item.color, 
            width: item.width + 'px', 
            height: item.height + 'px', 
            left: item.x + 'px', 
            top: item.y + 'px',
        }"
        @mousedown="(e) => handleMouseEvent(e)"
    >
        <template v-if="checkSelectedId(item.id)">
            <div
                v-for="direction in directions"
                :key="direction"
                :class="`resize-handle resize-handle_${direction}`"
                @mousedown="(e) => handleResizeStart(e, direction)"
            ></div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { Rectangle } from '@/types/interfaces';
import { useDraggable } from '@/hooks/use-drag';
import { useResizable } from '@/hooks/use-resize';
import { useRectangleActions } from '@/store/actions';
import { directions } from '@/utils/resize-const';
const { item, containerRef } = defineProps<{
  item: Rectangle
  containerRef: HTMLElement | null
}>()

const { handleMouseDown } = useDraggable({ targetRef: containerRef, item });
const { handleResizeStart } = useResizable({ targetRef: containerRef, item });
const { checkSelectedId, setSelectedId } = useRectangleActions();

const handleMouseEvent = (e: MouseEvent) => {
  setSelectedId(item.id);
  // вот про что я говорил, setSelectedId(item.id); у меня было в хуке, а не тут
  handleMouseDown(e);
}

</script>

<style scoped>
.sand-box__content-item {
  position: absolute;
  cursor: move;
  user-select: none;

    &_selected {
        border: 2px solid #42b883;
    }
    
}

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

</style>
