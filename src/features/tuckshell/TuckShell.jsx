import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { TerminalLine } from '@/components/Terminal'
import { runCommand } from '@/features/tuckshell/commands'
import { useCheckinStore } from '@/stores/useCheckinStore'
import { useShellStore } from '@/stores/useShellStore'
import { useThemeStore } from '@/stores/useThemeStore'

// The interactive tuckshell, placed under the title of every page. Type a command and
// press Enter; "help" (or the help button) lists them. The output scrolls inside
// its own box and follows new lines; up and down recall earlier commands.
export function TuckShell() {
  const inputId = useId()
  const outputRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [recall, setRecall] = useState(null) // index into history while browsing

  const lines = useShellStore((state) => state.lines)
  const history = useShellStore((state) => state.history)
  const push = useShellStore((state) => state.push)
  const clear = useShellStore((state) => state.clear)
  const remember = useShellStore((state) => state.remember)
  const entries = useCheckinStore((state) => state.entries)
  const checkIn = useCheckinStore((state) => state.checkIn)
  const setTheme = useThemeStore((state) => state.setMode)

  // Keep the newest output in view.
  useEffect(() => {
    const output = outputRef.current
    if (output) output.scrollTop = output.scrollHeight
  }, [lines])

  function run(text) {
    const command = text.trim()
    if (!command) return
    remember(command)
    const result = runCommand(command, { entries, checkIn, setTheme })
    if (result.clear) clear()
    else push({ type: 'cmd', text: command }, ...result.lines)
    if (result.navigate) navigate(result.navigate)
  }

  function onSubmit(event) {
    event.preventDefault()
    run(value)
    setValue('')
    setRecall(null)
  }

  function onKeyDown(event) {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return
    if (history.length === 0) return
    event.preventDefault()
    const last = history.length - 1
    const next =
      event.key === 'ArrowUp'
        ? Math.max(0, recall === null ? last : recall - 1)
        : recall === null || recall >= last
          ? null
          : recall + 1
    setRecall(next)
    setValue(next === null ? '' : history[next])
  }

  return (
    <section aria-label="tuckshell" className="w-full min-w-0">
      <div className="overflow-hidden rounded-md border-2 border-term-edge bg-term-bg font-mono text-mono text-term-text">
        <div className="flex items-center gap-8 bg-term-bar px-16 py-4">
          <span aria-hidden="true" className="flex gap-8">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="size-12 rounded-full bg-term-dim opacity-60" />
            ))}
          </span>
          <span className="ml-10 text-mono-sm text-term-dim">~/tuck</span>
          <button
            type="button"
            onClick={() => {
              run('help')
              inputRef.current?.focus()
            }}
            className="ml-auto min-h-[44px] cursor-pointer rounded-sm border-0 bg-transparent px-12 font-mono text-mono-sm text-term-dim hover:text-term-text focus-visible:outline-term-text"
          >
            help
          </button>
        </div>

        <div
          ref={outputRef}
          role="log"
          aria-live="polite"
          aria-label="tuckshell output"
          tabIndex={0}
          className="max-h-[220px] overflow-auto px-20 pt-16 pb-8 break-words whitespace-pre-wrap focus-visible:outline-term-text focus-visible:-outline-offset-4"
        >
          {lines.map((line, i) => (
            <TerminalLine key={i} {...line} />
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="flex items-center gap-8 px-20 pb-12 focus-within:outline-2 focus-within:-outline-offset-4 focus-within:outline-term-text focus-within:outline-solid"
        >
          <label htmlFor={inputId} className="sr-only">
            tuckshell command
          </label>
          <span aria-hidden="true" className="text-term-tuck">
            $
          </span>
          <input
            id={inputId}
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="type help"
            className="min-h-[44px] min-w-0 flex-1 border-0 bg-transparent font-mono text-mono text-term-text caret-term-tuck outline-none placeholder:text-term-faint"
          />
        </form>
      </div>
    </section>
  )
}
