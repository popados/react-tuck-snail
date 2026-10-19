import { useEffect, useId, useState } from 'react'
import { formatDuration } from '@/lib/habitTime'

const BUTTON =
  'min-h-[44px] cursor-pointer rounded-sm border-2 border-line bg-canvas px-16 text-note text-ink'

// A habit's timer. With none set, a minutes field adds one. With one set, it
// counts down: start, pause, reset, or remove it. Slow and quiet; when time is
// up Tuck says so, and logging stays your choice.
export function HabitTimer({ habit, onSetTimer }) {
  const id = useId()
  const [minutes, setMinutes] = useState('10')
  const [error, setError] = useState(null)
  const total = (habit.timerMinutes ?? 0) * 60
  const [left, setLeft] = useState(total)
  const [running, setRunning] = useState(false)
  // Counting only while there is time left, so it stops by itself at 0:00.
  const ticking = running && left > 0

  useEffect(() => {
    if (!ticking) return undefined
    const tick = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(tick)
  }, [ticking])

  if (!habit.timerMinutes) {
    function add(event) {
      event.preventDefault()
      const value = Number(minutes)
      if (!Number.isInteger(value) || value < 1 || value > 120) {
        setError('a whole number of minutes, 1 to 120.')
        return
      }
      setError(null)
      setLeft(value * 60)
      onSetTimer(habit.id, value)
    }
    return (
      <form onSubmit={add} noValidate className="flex flex-col gap-6">
        <label htmlFor={`${id}-min`} className="text-note font-semibold">
          Add a timer
        </label>
        <div className="flex flex-wrap items-center gap-8">
          <input
            id={`${id}-min`}
            type="number"
            inputMode="numeric"
            min="1"
            max="120"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            aria-invalid={error ? 'true' : 'false'}
            className="min-h-[44px] w-[96px] rounded-sm border-2 border-line bg-canvas px-12 text-body text-ink"
          />
          <span className="text-note text-ink-muted">minutes</span>
          <button type="submit" className={BUTTON}>
            add timer
          </button>
        </div>
        {error && (
          <p role="alert" className="m-0 text-caption text-ink">
            {error}
          </p>
        )}
      </form>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <p className="m-0 text-note font-semibold">Timer · {habit.timerMinutes} min</p>
      <p
        role="timer"
        aria-label={`${habit.name} timer`}
        className="m-0 font-mono text-mono-lg tabular-nums"
      >
        {formatDuration(left)}
      </p>
      {left === 0 && (
        <p role="status" className="m-0 rounded-sm bg-moss-wash px-12 py-8 font-mono text-mono">
          @_^^ time&apos;s up. that counts.
        </p>
      )}
      <div className="flex flex-wrap gap-8">
        <button
          type="button"
          className={BUTTON}
          disabled={left === 0}
          onClick={() => setRunning(!ticking)}
        >
          {ticking ? 'pause' : 'start'}
        </button>
        <button
          type="button"
          className={BUTTON}
          onClick={() => {
            setRunning(false)
            setLeft(total)
          }}
        >
          reset
        </button>
        <button
          type="button"
          className={BUTTON}
          onClick={() => {
            setRunning(false)
            onSetTimer(habit.id, null)
          }}
        >
          remove timer
        </button>
      </div>
    </div>
  )
}
