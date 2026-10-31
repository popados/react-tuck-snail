import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Next's router only works inside the Next runtime; tests use src/test/testRouter.
vi.mock('next/navigation', async () => {
  const { usePathname, useRouter } = await import('@/test/testRouter')
  return {
    usePathname,
    useRouter,
    redirect: vi.fn(),
    notFound: vi.fn(),
  }
})
vi.mock('next/link', async () => {
  const { Link } = await import('@/test/testRouter')
  return { default: Link }
})

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
