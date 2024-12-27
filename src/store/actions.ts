import type { RectangleActions } from './types'
import { state } from './state'
import { Rectangle } from '@/types/interfaces'

export const useRectangleActions = (): RectangleActions => {
  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: `Квадрат ${state.rectangles.length + 1}`,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      color: '#11355A',
    }
    state.rectangles.push(newItem)
    state.selectedId = newItem.id
  }

  const deleteItem = (id: string) => {
    state.rectangles = state.rectangles.filter(rect => rect.id !== id)
    state.selectedId = null
  }

  const setSelectedId = (id: string | null) => {
    state.selectedId = id
  }

  const checkSelectedId = (id: string) => {
    return state.selectedId === id
  }

  const updateRectangle = (id: string, updates: Partial<Rectangle>) => {
    const rectangle = state.rectangles.find(r => r.id === id)
    if (rectangle) {
      Object.assign(rectangle, updates)
    }
  }

  return {
    addItem,
    deleteItem,
    setSelectedId,
    checkSelectedId,
    updateRectangle
  }
} 