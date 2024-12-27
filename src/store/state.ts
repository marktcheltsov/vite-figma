import { reactive } from 'vue'
import type { RectangleState } from './types'

export const state = reactive<RectangleState>({
  rectangles: [],
  selectedId: null
}) 