import { onMounted, onUnmounted, ref } from 'vue'
import { Rectangle } from '@/types/interfaces'

interface DragOptions {
  targetRef: HTMLElement | null
  item: Rectangle
}

export function useDraggable({ targetRef, item }: DragOptions) {
  const isDragging = ref(false)
  const startX = ref(0)
  const startY = ref(0)

  const handleMouseDown = (e: MouseEvent) => {
    isDragging.value = true
    startX.value = e.clientX
    startY.value = e.clientY
    startX.value -= item.x
    startY.value -= item.y
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return
    if (!targetRef) return

    const bounds = targetRef.getBoundingClientRect()
    const newX = e.clientX - startX.value
    const newY = e.clientY - startY.value

    item.x = Math.max(0, Math.min(newX, bounds.width - item.width))
    item.y = Math.max(0, Math.min(newY, bounds.height - item.height))
  }

  const handleMouseUp = () => {
    isDragging.value = false
  }

  onMounted(() => {
    if (!targetRef) return  
    targetRef.addEventListener('mousemove', handleMouseMove);
    targetRef.addEventListener('mouseup', handleMouseUp);
  })

  onUnmounted(() => {
    if (!targetRef) return
    targetRef.removeEventListener('mousemove', handleMouseMove);
    targetRef.removeEventListener('mouseup', handleMouseUp);
  })

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }
}