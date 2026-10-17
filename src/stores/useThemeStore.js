import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

// Light or dark, saved on this device. 'auto' follows the OS setting; the
// choice is applied as data-theme on <html> by ThemeSync (src/app/ThemeSync.jsx).
export const THEME_MODES = ['auto', 'light', 'dark']

export const useThemeStore = create(
  persist(
    (set) => ({
      mode: 'auto',
      setMode: (mode) => set({ mode }),
    }),
    { name: 'tuck-theme', storage: createJSONStorage(() => localStorage) },
  ),
)
