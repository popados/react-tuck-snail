# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

pocket@shell: a habit and mood tracker web app starring Tuck the Snail. No account, no backend, no streaks. Everything is stored in the browser (localStorage). The repo also holds the brand, design system and launch docs (`docs/`) and the source mockups the pages are ported from (`images/`).

## Commands

```bash
npm run dev            # Vite dev server
npm run build          # production build into dist/
npm run preview        # serve dist/
npm test               # Vitest, run once
npm run lint           # ESLint
npm run format         # Prettier write (format:check to verify)

npx vitest run src/features/calm/CheckInLog.test.jsx   # one test file
npx vitest run -t "closes down to the 3"               # tests matching a name
```

Before finishing a change, run prettier on the touched files, `npm run lint`, `npm test` and `npm run build`.

## Constraints

- JavaScript only (JSX). No TypeScript. Don't change the stack: Vite, React 19, React Router (`react-router`, data router), Zustand, TanStack Query, React Hook Form + Zod v4, Tailwind v4, Vitest + Testing Library + jsdom.
- Style only with design-system tokens. Don't hard-code colors, don't use Tailwind's default palette, and don't use shadows. The tokens are in `src/index.css`, and `docs/design-system/USING-IN-CODE.md` maps tokens to classes.
- Never draw or approximate a logo. Use the image files in `public/logo/` and the mascot SVGs in `public/mascot/`.
- Don't commit, push or add a git remote unless asked.
- Copy follows Tuck's voice (README "Voice"): lowercase in the app and terminal, sentence case for headings, short sentences. Never say "missed", "failed" or show a streak count. No emoji. Never use red for notices.

## Architecture

- **Routing:** `src/app/router.jsx` exports `routes`, all nested under `AppLayout` (the top nav plus the page). `navItems.js` drives the nav. Entries with no built page get `ComingSoonPage`. `/calm` is the "Emotional Check" page.
- **Pages** (`src/pages/<Name>/`) compose **features** (`src/features/<area>/`: calm, checkin, habits, insights, tuckshell, expressions, shelf). Shared presentational pieces are in `src/components/`, and pure helpers are in `src/lib/`.
- **State:** Zustand stores in `src/stores/`, persisted to localStorage with `persist` + `createJSONStorage`:
  - `useCheckinStore` (`tuck-checkin`, version 1, with `migrate`): `log` holds every check-in as the record from `images/html_mockups/pocket-shell-check-in.html` (`{ id, at (local ISO with offset), day, answer, answerIntensity, words[], tags[], note, from }`). `entries` and `details` are a per-day index of that log and are updated alongside it. If the record shape changes, bump `version` and extend `migrateCheckins`.
  - `answer` is one of five plain buckets: good, okay, tired, low, shell. The specific Tuck that was picked (for example "overwhelmed") is stored in `words`. `recordTuck()` maps a record back to its Tuck.
  - Other stores: `useHabitStore` (habits + day log), `useShellStore` (tuckshell lines and history), `useThemeStore` (light/dark/auto), `useViewStore` (remembered view toggles).
- **Emotions:** `src/lib/emotionGroups.js` defines the five categories (Acknowledge, Permit, Direct, Offer, Keep) with their `rt-*` dot colors. `src/features/calm/calmMoods.js` defines every Tuck mood (name, ASCII face, art, bucket). Keep the categories consistent everywhere they appear.
- **tuckshell:** an interactive terminal (`src/features/tuckshell/`) placed under each page's title. Commands are in `commands.js`, and its output persists in `useShellStore`.
- **Theming:**
  - `src/index.css` defines the tokens as CSS variables, maps them to utilities in `@theme`, and redefines them for dark mode. Dark mode follows `prefers-color-scheme` unless `<html data-theme>` overrides it. `ThemeSync` writes `data-theme` from `useThemeStore`.
  - `index.html` sets `data-palette="low"`, so the low stimulation palette applies site-wide.
  - Tailwind's spacing base is 1px: `p-24` is 24px and `gap-8` is 8px.
- **Responsive tables:** below `sm`, tables turn into cards via `max-sm:` classes and `before:content-[attr(data-label)]`. They keep explicit `role="table"`, `role="row"` and `role="cell"` attributes so they stay accessible as cards.

## Testing

- `src/test/renderRoute.jsx` renders the real app at a path (`createMemoryRouter(routes)` + `ThemeSync`). Most page tests use it.
- Reset stores in `beforeEach`: call `localStorage.clear()` and also `useXStore.setState(...)`, because clearing storage does not reset in-memory state.
- `src/test/setup.js` swaps in an in-memory localStorage, because Node 22+ ships a global localStorage that shadows jsdom's. The `--localstorage-file` warning during test runs is expected.
- Vitest globals are on (`describe`, `it`, `vi` work without imports). The `@/` alias points to `src/`.
