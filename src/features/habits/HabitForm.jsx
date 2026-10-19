import { zodResolver } from '@hookform/resolvers/zod'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { DAYS, PERIODS, TIME_OPTIONS } from '@/lib/habitTime'
import { cx } from '@/lib/faces'

const schema = z.object({
  name: z.string().trim().min(1, 'give it a name.').max(40, 'keep it under 40 letters.'),
  time: z.enum(TIME_OPTIONS),
  period: z.enum(PERIODS),
  days: z.array(z.coerce.number()).min(1, 'pick at least one day.'),
})

const FIELD = 'rounded-sm border-2 border-line bg-canvas px-12 text-body text-ink'
const CHIP =
  'flex min-h-[44px] cursor-pointer items-center justify-center rounded-[12px] border-2 border-line bg-canvas px-12 font-mono text-[14px] text-ink has-[:checked]:border-[3px] has-[:checked]:bg-caramel-wash has-[:checked]:font-semibold has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink has-[:focus-visible]:outline-solid'

// "Add a little thing": name, a time from 1:00 to 12:30 with AM/PM, and the days
// it repeats each week. A timer can be added from the table after it is made.
export function HabitForm({ onSubmit, onCancel }) {
  const id = useId()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', time: '8:00', period: 'AM', days: [] },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-labelledby={`${id}-title`}
      className="flex flex-col gap-16 rounded-lg border-2 border-line bg-surface px-24 py-20"
    >
      <h3 id={`${id}-title`} className="m-0 text-label">
        Add a little thing
      </h3>

      <div className="flex flex-col gap-6">
        <label htmlFor={`${id}-name`} className="text-note font-semibold">
          Name
        </label>
        <input
          id={`${id}-name`}
          {...register('name')}
          placeholder="water, a short walk, screens off"
          aria-invalid={errors.name ? 'true' : 'false'}
          className={cx(FIELD, 'min-h-[44px]')}
        />
        {errors.name && (
          <p role="alert" className="m-0 text-caption text-ink">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-end gap-12">
        <div className="flex flex-col gap-6">
          <label htmlFor={`${id}-time`} className="text-note font-semibold">
            Time of day
          </label>
          <select id={`${id}-time`} {...register('time')} className={cx(FIELD, 'min-h-[44px]')}>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <fieldset className="m-0 flex border-0 p-0">
          <legend className="sr-only">AM or PM</legend>
          <div className="grid grid-cols-2 overflow-hidden rounded-full border-2 border-line">
            {PERIODS.map((p) => (
              <label
                key={p}
                className="flex min-h-[40px] min-w-[56px] cursor-pointer items-center justify-center bg-surface px-12 text-caption text-ink-muted has-[:checked]:bg-caramel-wash has-[:checked]:font-semibold has-[:checked]:text-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-4 has-[:focus-visible]:outline-ink has-[:focus-visible]:outline-solid"
              >
                <input type="radio" value={p} {...register('period')} className="sr-only" />
                {p}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <fieldset className="m-0 flex flex-col gap-6 border-0 p-0">
        <legend className="mb-6 text-note font-semibold">Repeats each week</legend>
        <div className="grid grid-cols-7 gap-6">
          {DAYS.map((day, i) => (
            <label key={day.name} className={CHIP}>
              <input
                type="checkbox"
                value={i}
                {...register('days')}
                aria-label={day.name}
                className="sr-only"
              />
              <span aria-hidden="true">{day.short}</span>
            </label>
          ))}
        </div>
        {errors.days && (
          <p role="alert" className="m-0 text-caption text-ink">
            {errors.days.message}
          </p>
        )}
      </fieldset>

      <div className="flex flex-wrap items-center gap-12">
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-[46px] cursor-pointer rounded-sm border-2 border-line bg-caramel-wash px-24 text-body font-semibold text-ink"
        >
          add it
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="min-h-[44px] cursor-pointer border-0 bg-transparent px-8 text-body text-ink-muted underline underline-offset-2"
        >
          not now
        </button>
        <span className="text-caption text-ink-muted">you can add a timer after.</span>
      </div>
    </form>
  )
}
