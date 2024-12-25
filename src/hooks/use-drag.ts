import { ref } from 'vue'
import { store } from '../store/items'

export function useDraggable() {
  const isDragging = ref(false)
  const startX = ref(0)
  const startY = ref(0)

  const handleMouseDown = (e: MouseEvent, itemId: string) => {
    isDragging.value = true
    store.selectedId = itemId
    
    startX.value = e.clientX
    startY.value = e.clientY

    const item = store.rectangles.find(r => r.id === itemId)

    if (item) {
      startX.value -= item.x
      startY.value -= item.y
    }

  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value || !store.selectedId) return
    
    const item = store.rectangles.find(r => r.id === store.selectedId)

    if (!item) return

    const sandbox = document.querySelector('.sand-box__content')
    
    if (!sandbox) return

    const bounds = sandbox.getBoundingClientRect()
    const newX = e.clientX - startX.value
    const newY = e.clientY - startY.value

    item.x = Math.max(0, Math.min(newX, bounds.width - item.width))
    item.y = Math.max(0, Math.min(newY, bounds.height - item.height))
  }

  const handleMouseUp = () => {
    isDragging.value = false
  }


  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }
}