'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ThemeSync } from '@/app/ThemeSync'
import { makeQueryClient } from '@/lib/queryClient'

// Every app-wide provider goes here, so the root layout stays small. One query
// client per browser tab (and per server request), never shared between them.
export function Providers({ children }) {
  const [queryClient] = useState(makeQueryClient)
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeSync />
      {children}
    </QueryClientProvider>
  )
}
