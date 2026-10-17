import { useId, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { NAV_ITEMS } from '@/app/navItems'
import { cx } from '@/lib/faces'

const ITEM =
  'flex min-h-[44px] items-center rounded-[12px] px-12 text-[15px] whitespace-nowrap text-ink no-underline hover:bg-surface'
const CURRENT = 'border-2 border-line bg-caramel-wash px-10 font-semibold'

// The top bar on every screen. All items show on wide screens; below 1180px they
// fold behind a "menu" button that expands the list. The current screen is
// marked by an outline and 600 weight as well as the wash, never color alone.
export function TopNav() {
  const listId = useId()
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b-2 border-line bg-canvas">
      <nav
        aria-label="main"
        className="mx-auto flex flex-wrap items-center gap-x-16 gap-y-8 px-16 py-12 min-[821px]:px-32"
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      >
        <Link to="/" className="flex items-center gap-10 text-ink no-underline">
          <img src="/mascot/tuck-avatar.svg" alt="" className="size-[34px]" />
          <span className="text-[19px] leading-[1.2] font-extrabold">
            Tuck Check-in
            <small className="block text-[12px] font-normal text-ink-muted">
              by Shellday Studio
            </small>
          </span>
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
          className="ml-auto inline-flex min-h-[44px] cursor-pointer items-center gap-8 rounded-[12px] border-2 border-line bg-surface px-12 font-mono text-[14px] text-ink min-[1180px]:hidden"
        >
          <span aria-hidden="true">{open ? '(@)' : '@_oo'}</span>
          {open ? 'close' : 'menu'}
        </button>

        <ul
          id={listId}
          className={cx(
            'm-0 w-full list-none flex-col gap-4 p-0 min-[1180px]:ml-auto min-[1180px]:flex min-[1180px]:w-auto min-[1180px]:flex-row min-[1180px]:items-center',
            open ? 'flex' : 'hidden',
          )}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) => cx(ITEM, isActive && CURRENT)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
