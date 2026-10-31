import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { deviceStorage } from '@/stores/deviceStorage'

// How parts of a page were left, saved on this device so they stay that way.
// logExpanded: "Your check-ins" shows every check-in (true) or only the 3 most
// recently dated (false).
export const useViewStore = create(
  persist(
    (set) => ({
      logExpanded: true,
      setLogExpanded: (logExpanded) => set({ logExpanded }),
    }),
    { name: 'tuck-view', storage: deviceStorage },
  ),
)
