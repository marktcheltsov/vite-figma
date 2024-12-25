import { reactive } from 'vue'
import { Rectangle } from '../types/interfaces'

interface Store {
  rectangles: Rectangle[]
  selectedId: string | null
}

export const store = reactive<Store>({
  rectangles: [],
  selectedId: null
})

export const actions = {
  addItem() {
    const newItem: Rectangle = {
      id: Date.now().toString(),
      name: `Квадрат ${store.rectangles.length + 1}`,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      color: '#000'
    }
    store.rectangles.push(newItem)
    store.selectedId = newItem.id
  },

  deleteItem(id: string) {
    store.rectangles = store.rectangles.filter(rect => rect.id !== id)
    if (store.selectedId === id) {
      store.selectedId = null
    }
  },

  setSelectedId(id: string | null) {
    store.selectedId = id
  }
}
