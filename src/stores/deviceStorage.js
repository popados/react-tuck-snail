import { createJSONStorage } from 'zustand/middleware'

// Where the persisted stores live: this browser's localStorage. Next also runs
// the stores on the server while rendering, where there is no localStorage, so
// there they read nothing and write nowhere (the page content renders in the
// browser only; see src/app/ClientOnly.jsx).
const nowhere = { getItem: () => null, setItem: () => {}, removeItem: () => {} }

export const deviceStorage = createJSONStorage(() =>
  typeof window === 'undefined' ? nowhere : globalThis.localStorage,
)
