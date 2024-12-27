import type { Rectangle } from '@/types/interfaces'
import { ComputedRef } from 'vue'

export interface RectangleState {
  rectangles: Rectangle[]
  selectedId: string | null
}

export interface RectangleActions {
  addItem: () => void
  deleteItem: (id: string) => void
  setSelectedId: (id: string | null) => void
  checkSelectedId: (id: string) => boolean
  updateRectangle: (id: string, updates: Partial<Rectangle>) => void
}

export interface RectangleGetters {
  selectedRectangle: ComputedRef<Rectangle | undefined>
  rectangles: ComputedRef<Rectangle[]>
} 
