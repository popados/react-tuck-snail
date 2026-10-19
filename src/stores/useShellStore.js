import { create } from 'zustand'

// The tuckshell's output and command history. Kept in memory (not saved), so the
// session carries across pages but starts fresh on a reload. Lines use the same
// shape as Terminal: { type: 'cmd' | 'out' | 'dim' | 'gap', face, text }.
export const WELCOME = [
  { face: 'awake', text: "hi. i'm tuck. type help to see what i can do." },
  { type: 'dim', text: '# everything stays on this device' },
]

const MAX_LINES = 200
const MAX_HISTORY = 50

export const useShellStore = create((set) => ({
  lines: WELCOME,
  history: [],
  push: (...lines) => set((state) => ({ lines: [...state.lines, ...lines].slice(-MAX_LINES) })),
  clear: () => set({ lines: [] }),
  remember: (command) =>
    set((state) => ({ history: [...state.history, command].slice(-MAX_HISTORY) })),
}))
