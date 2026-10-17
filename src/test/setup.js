import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Node 22+ ships its own global localStorage, which shadows jsdom's and has no
// methods unless Node gets --localstorage-file. Swap in an in-memory Storage.
if (typeof globalThis.localStorage?.clear !== 'function') {
  const store = new Map()
  const memoryStorage = {
    get length() {
      return store.size
    },
    key: (i) => [...store.keys()][i] ?? null,
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
    clear: () => store.clear(),
  }
  Object.defineProperty(globalThis, 'localStorage', { value: memoryStorage, configurable: true })
}

afterEach(() => {
  cleanup()
})
