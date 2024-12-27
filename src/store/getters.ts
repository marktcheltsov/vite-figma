import { computed } from 'vue'
import type { RectangleGetters } from './types'
import { state } from './state'

export const useRectangleGetters = (): RectangleGetters => {
  const selectedRectangle = computed(() => 
    state.rectangles.find(rect => rect.id === state.selectedId)
  )

  const rectangles = computed(() => state.rectangles)

  return {
    selectedRectangle,
    rectangles
  }
} 