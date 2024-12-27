import { onMounted, onUnmounted, ref } from 'vue'
import { Rectangle, ResizeDirection } from '@/types/interfaces'

interface ResizeOptions {
  targetRef: HTMLElement | null
  item: Rectangle
}

export function useResizable({targetRef, item}: ResizeOptions) {
  const isResizing = ref(false)
  const resizeDirection = ref<string | null>(null)
  const startX = ref(0)
  const startY = ref(0)
  const startWidth = ref(0)
  const startHeight = ref(0)
  const startLeft = ref(0)
  const startTop = ref(0)

  const handleResizeStart = (
    e: MouseEvent, 
    direction: ResizeDirection
  ) => {
    e.stopPropagation()
    isResizing.value = true
    resizeDirection.value = direction
    startX.value = e.clientX
    startY.value = e.clientY
    startWidth.value = item.width
    startHeight.value = item.height
    startLeft.value = item.x
    startTop.value = item.y
  }

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing.value) return
    if (!targetRef) return

    const bounds = targetRef.getBoundingClientRect()
    const deltaX = e.clientX - startX.value
    const deltaY = e.clientY - startY.value
    
    switch (resizeDirection.value) {
      case 'right':
        const maxRightWidth = bounds.width - item.x
        item.width = Math.max(50, Math.min(startWidth.value + deltaX, maxRightWidth))
        break

      case 'left':
        const newLeftWidth = Math.max(50, startWidth.value - deltaX)
        const maxLeftMove = startLeft.value + startWidth.value - 50
        if (newLeftWidth >= 50) {
          const newX = Math.max(0, Math.min(startLeft.value + deltaX, maxLeftMove))
          item.x = newX
          item.width = startLeft.value + startWidth.value - newX
        }
        break

      case 'bottom':
        const maxBottomHeight = bounds.height - item.y
        item.height = Math.max(50, Math.min(startHeight.value + deltaY, maxBottomHeight))
        break

      case 'top':
        const newHeight = startHeight.value - deltaY
        if (newHeight >= 50) {
          const maxTopMove = item.y + item.height - 50
          const newY = Math.max(0, Math.min(e.clientY, maxTopMove))
          item.y = newY
          item.height = startHeight.value + (startY.value - newY)
        }
        break

      case 'top-left':
        const newTopLeftWidth = Math.max(50, startWidth.value - deltaX)
        const newTopLeftHeight = Math.max(50, startHeight.value - deltaY)
        if (newTopLeftWidth >= 50 && newTopLeftHeight >= 50) {
          const maxTopLeftMoveX = startLeft.value + startWidth.value - 50
          const maxTopLeftMoveY = startTop.value + startHeight.value - 50
          item.x = Math.max(0, Math.min(startLeft.value + deltaX, maxTopLeftMoveX))
          item.y = Math.max(0, Math.min(startTop.value + deltaY, maxTopLeftMoveY))
          item.width = startLeft.value + startWidth.value - item.x
          item.height = startTop.value + startHeight.value - item.y
        }
        break

      case 'top-right':
        const newTopRightWidth = Math.max(50, startWidth.value + deltaX)
        const newTopRightHeight = Math.max(50, startHeight.value - deltaY)
        if (newTopRightWidth >= 50 && newTopRightHeight >= 50) {
          const maxTopRightMoveY = startTop.value + startHeight.value - 50
          item.y = Math.max(0, Math.min(startTop.value + deltaY, maxTopRightMoveY))
          item.width = newTopRightWidth
          item.height = startTop.value + startHeight.value - item.y
        }
        break

      case 'bottom-left':
        const newBottomLeftWidth = Math.max(50, startWidth.value - deltaX)
        const newBottomLeftHeight = Math.max(50, startHeight.value + deltaY)
        if (newBottomLeftWidth >= 50 && newBottomLeftHeight >= 50) {
          const maxBottomLeftMoveX = startLeft.value + startWidth.value - 50
          item.x = Math.max(0, Math.min(startLeft.value + deltaX, maxBottomLeftMoveX))
          item.width = startLeft.value + startWidth.value - item.x
          item.height = newBottomLeftHeight
        }
        break

      case 'bottom-right':
        const newBottomRightWidth = Math.max(50, startWidth.value + deltaX)
        const newBottomRightHeight = Math.max(50, startHeight.value + deltaY)
        if (newBottomRightWidth >= 50 && newBottomRightHeight >= 50) {
          item.width = newBottomRightWidth
          item.height = newBottomRightHeight
        }
        break
    }
  }

  const handleResizeEnd = () => {
    isResizing.value = false
    resizeDirection.value = null
  }

  onMounted(() => {
    if (!targetRef) return
    targetRef.addEventListener('mousemove', handleResizeMove);
    targetRef.addEventListener('mouseup', handleResizeEnd);
  })

  onUnmounted(() => {
    if (!targetRef) return
    targetRef.removeEventListener('mousemove', handleResizeMove);
    targetRef.removeEventListener('mouseup', handleResizeEnd);
  })  

  return {
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd
  }
}
