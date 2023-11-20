/* eslint-disable @typescript-eslint/indent */
import { create } from 'zustand'
import { uiColors } from '../theme/config'

export const useTheme = create<{
  mainColor: string
  changeMainColor: () => void
}>((set) => {
  return {
    mainColor: uiColors.green,
    changeMainColor: () => {
      const colorValues = Object.values(uiColors)
      const randomIndex = Math.floor(Math.random() * colorValues.length)
      const randomColor = colorValues[randomIndex]

      set({ mainColor: randomColor })
    },
    init: () => {
      set((state) => {
        state.changeMainColor()
        return state
      })
    }
  }
})
