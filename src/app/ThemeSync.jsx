import { useEffect } from 'react'
import { useThemeStore } from '@/stores/useThemeStore'

// Mirrors the saved light/dark choice onto <html data-theme>, which the tokens
// in src/index.css read. 'auto' removes it so the OS setting wins.
export function ThemeSync() {
  const mode = useThemeStore((state) => state.mode)

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'auto') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', mode)
  }, [mode])

  return null
}
