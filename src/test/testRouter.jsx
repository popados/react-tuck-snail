import { createContext, useContext, useState } from 'react'

// A tiny stand-in for the Next.js router, for tests (Next's own router needs the
// Next runtime). setup.js points next/navigation and next/link at it.
const RouterContext = createContext({ pathname: '/', push: () => {} })

export function TestRouter({ initialPath, onNavigate, children }) {
  const [pathname, setPathname] = useState(initialPath)
  const push = (to) => {
    onNavigate?.(to)
    setPathname(to)
  }
  return (
    <RouterContext.Provider value={{ pathname, push }}>
      {typeof children === 'function' ? children(pathname) : children}
    </RouterContext.Provider>
  )
}

export const usePathname = () => useContext(RouterContext).pathname

export function useRouter() {
  const { push } = useContext(RouterContext)
  return {
    push,
    replace: push,
    back: () => {},
    forward: () => {},
    refresh: () => {},
    prefetch: () => {},
  }
}

export function Link({ href, children, onClick, ...props }) {
  const { push } = useContext(RouterContext)
  return (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          event.preventDefault()
          push(href)
        }
      }}
      {...props}
    >
      {children}
    </a>
  )
}
