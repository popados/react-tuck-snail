'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

// Renders its children in the browser only. Every page reads this device's
// localStorage and today's date in the viewer's time zone, neither of which the
// server knows, so the server sends the frame (nav) and the browser fills in the page.
export function ClientOnly({ children, fallback = null }) {
  const inBrowser = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
  return inBrowser ? children : fallback
}
