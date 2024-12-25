import { ref } from 'vue'
import { store } from '../store/items'

export function useResizable() {
  const isResizing = ref(false)
  const resizeDirection = ref<string | null>(null)
  const startX = ref(0)
  const startY = ref(0)
  const startWidth = ref(0)
  const startHeight = ref(0)
  const startLeft = ref(0)
  const sandbox = document.querySelector('.sand-box__content')

  const handleResizeStart = (
    e: MouseEvent, 
    itemId: string, 
    direction: 'right' | 'left' | 'top' | 'bottom'
  ) => {
    e.stopPropagation()
    isResizing.value = true
    resizeDirection.value = direction
    store.selectedId = itemId

    const item = store.rectangles.find(r => r.id === itemId)
    if (item) {
      startX.value = e.clientX
      startY.value = e.clientY
      startWidth.value = item.width
      startHeight.value = item.height
      startLeft.value = item.x
    }
  }
const handleResizeMove = (e: MouseEvent) => {
  if (!isResizing.value || !store.selectedId) return
 
  const item = store.rectangles.find(r => r.id === store.selectedId)

  if (!item) return
  if (!sandbox) return

  const bounds = sandbox.getBoundingClientRect()
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
  }
}

  const handleResizeEnd = () => {
    isResizing.value = false
    resizeDirection.value = null
  }

  return {
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd
  }
}