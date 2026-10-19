import { useState } from 'react'
import { HabitCalendar } from '@/features/habits/HabitCalendar'
import { HabitForm } from '@/features/habits/HabitForm'
import { HabitTable } from '@/features/habits/HabitTable'
import { LittleThings } from '@/features/habits/LittleThings'
import { SmallThings } from '@/features/habits/SmallThings'
import { TuckShell } from '@/features/tuckshell/TuckShell'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useHabitStore } from '@/stores/useHabitStore'

// Habits, the desktop view of images/mockups/habit-tracking-mockup.png: little-thing
// cards and an add form beside the selected habit's month calendar, then every
// habit in an expandable table. Saved on this device only.
export function HabitsPage() {
  useDocumentTitle('Habits')
  const habits = useHabitStore((state) => state.habits)
  const logs = useHabitStore((state) => state.logs)
  const addHabit = useHabitStore((state) => state.addHabit)
  const removeHabit = useHabitStore((state) => state.removeHabit)
  const setTimer = useHabitStore((state) => state.setTimer)
  const cycleDay = useHabitStore((state) => state.cycleDay)

  const [adding, setAdding] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const selected = habits.find((h) => h.id === selectedId) ?? habits[0]

  return (
    <main className="mx-auto flex w-full max-w-page flex-col gap-32 px-16 pt-24 pb-48 min-[821px]:px-32">
      <div className="flex flex-col gap-6">
        <h1 className="m-0 text-heading min-[821px]:text-title">Habits</h1>
        <p className="m-0 text-note text-ink-muted">
          Only what you did shows. Blanks are just days.
        </p>
      </div>
      <TuckShell />

      <div className="grid items-start gap-32 md:grid-cols-[minmax(0,1fr)_340px] lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="flex flex-col gap-20">
          <LittleThings
            habits={habits}
            logs={logs}
            selectedId={selected?.id}
            onSelect={setSelectedId}
            onCycle={(id) => cycleDay(id)}
            onAdd={() => setAdding(true)}
            adding={adding}
          />
          {adding && (
            <HabitForm
              onSubmit={(values) => {
                const habit = addHabit(values)
                setSelectedId(habit.id)
                setAdding(false)
              }}
              onCancel={() => setAdding(false)}
            />
          )}
        </div>

        {selected ? (
          <HabitCalendar habit={selected} log={logs[selected.id]} onCycle={cycleDay} />
        ) : (
          <section className="flex flex-col gap-8 rounded-xl border-2 border-dashed border-line px-24 py-20">
            <h2 className="m-0 text-heading">Your month</h2>
            <p className="m-0 text-note text-ink-muted">
              add a little thing and its month shows here, one circle a day.
            </p>
          </section>
        )}
      </div>

      <SmallThings />

      <HabitTable
        habits={habits}
        logs={logs}
        onSelect={setSelectedId}
        onCycle={(id) => cycleDay(id)}
        onSetTimer={setTimer}
        onRemove={removeHabit}
      />
    </main>
  )
}
