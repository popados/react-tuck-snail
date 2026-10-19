import { CALM_MOODS, art } from '@/features/calm/calmMoods'
import { MoodButtons } from '@/features/calm/MoodButtons'
import { cx } from '@/lib/faces'

const PANEL = 'rounded-[12px] bg-art-ground leading-none'

// Shown in the panel once today's Tuck is saved: what it was stored as, and when.
function SavedAs({ savedAs }) {
  const time = savedAs.at
    ? new Date(savedAs.at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : null
  return (
    <p className="m-0 mt-8 inline-flex flex-wrap items-center gap-x-8 rounded-[10px] bg-moss-wash px-10 py-4 text-caption text-ink">
      <span>
        saved as <b className="font-mono font-semibold">{savedAs.answer}</b>
      </span>
      {time && (
        <>
          {' '}
          <span className="text-ink-muted">· {time}</span>
        </>
      )}
    </p>
  )
}

function Picked({ id, savedAs }) {
  const mood = CALM_MOODS[id]
  if (!mood) {
    return (
      <>
        <span className={PANEL}>
          <img
            src={art('tuck-curious')}
            alt="Tuck curious, waiting for your pick"
            className="block aspect-[200/140] h-auto w-full"
          />
        </span>
        <div>
          <p className="m-0 text-heading">Nothing picked yet</p>
          <p className="m-0 mt-2 text-note text-ink-muted">
            Choose a Tuck in the sidebar, or one of the moods below.
          </p>
        </div>
      </>
    )
  }
  return (
    <>
      <span className={PANEL}>
        <img src={art(mood.img)} alt={mood.alt} className="block aspect-[200/140] h-auto w-full" />
      </span>
      <div>
        <p className="m-0 text-heading">{mood.name}</p>
        <span className="font-mono text-mono whitespace-pre text-ink-muted">{mood.face}</span>
        <p className="m-0 mt-2 text-note text-ink-muted">{mood.when}</p>
        {savedAs && <SavedAs savedAs={savedAs} />}
      </div>
    </>
  )
}

function Reply({ draft, saved }) {
  const id = draft ?? saved
  const mood = CALM_MOODS[id]
  const isSaved = !draft && Boolean(saved)
  const scene = mood ? (mood.scene ?? mood.img) : 'tuck-scene-still-water'
  const alt = mood ? mood.alt : 'Tuck sitting calmly by still water, his reflection below'

  return (
    <div
      role="status"
      className={cx(
        'flex min-w-0 flex-col gap-12 rounded-[18px] p-16 min-[821px]:max-[1120px]:grid min-[821px]:max-[1120px]:grid-cols-[minmax(0,220px)_minmax(0,1fr)] min-[821px]:max-[1120px]:items-center',
        isSaved ? 'bg-moss-wash' : 'bg-tear-wash',
      )}
    >
      <div className="overflow-hidden rounded-sm bg-art-ground leading-none">
        <img src={art(scene)} alt={alt} className="block h-auto w-full" />
      </div>
      <div>
        <p className="m-0 font-mono text-mono">
          <span aria-hidden="true" className="whitespace-pre">
            {mood ? mood.face : '@_uu'}
          </span>
          {'  '}
          {!mood
            ? 'hi. no rush today.'
            : isSaved
              ? mood.line
              : `${mood.name.toLowerCase()}. save when ready.`}
        </p>
        {isSaved && (
          <p className="m-0 mt-8 text-caption text-ink-muted">
            saved on this device. pick another Tuck to change it.
          </p>
        )}
      </div>
    </div>
  )
}

// Today's check-in: the picked Tuck, every mood as a quick button, an optional
// note, save, and Tuck's reply beside it. The note is saved with the check-in and
// can be read again in "Your check-ins".
export function CalmCheckIn({
  picked,
  draft,
  saved,
  savedAs,
  onPick,
  onSave,
  canSave,
  note,
  onNoteChange,
}) {
  const changing = Boolean(draft) && draft !== saved
  const hint = !picked
    ? 'pick a Tuck in the sidebar or below'
    : changing
      ? 'you can change it any time today'
      : canSave
        ? 'save to add this note'
        : 'saved on this device'

  return (
    <section
      aria-labelledby="q"
      className="grid gap-x-32 gap-y-24 rounded-[22px] border-2 border-line bg-surface p-20 min-[821px]:p-24 min-[1121px]:grid-cols-[minmax(0,1fr)_minmax(0,360px)]"
    >
      <div className="flex min-w-0 flex-col gap-16">
        <h2 id="q" className="m-0 text-heading">
          Today's check-in
        </h2>
        <div
          role="status"
          className={cx(
            'grid grid-cols-[88px_minmax(0,1fr)] items-center gap-16 rounded-md border-2 border-line bg-canvas p-12 min-[821px]:grid-cols-[112px_minmax(0,1fr)]',
            !picked && 'border-dashed',
          )}
        >
          <Picked id={picked} savedAs={!draft || draft === saved ? savedAs : null} />
        </div>

        <MoodButtons picked={picked} onPick={onPick} />

        <div>
          <label htmlFor="calm-note" className="mb-6 block text-note font-semibold">
            Actions, Attitudes, Behaviors, Mannerisms, Patterns{' '}
            <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <textarea
            id="calm-note"
            value={note}
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder="a word or two is plenty"
            className="min-h-[60px] w-full resize-y rounded-sm border-2 border-line bg-canvas px-12 py-10 text-note text-ink"
          />
        </div>

        <div className="flex flex-wrap items-center gap-12">
          <button
            type="button"
            disabled={!canSave}
            onClick={onSave}
            className="min-h-[46px] cursor-pointer rounded-sm border-2 border-line bg-caramel-wash px-24 text-body font-semibold text-ink disabled:cursor-default disabled:opacity-55"
          >
            save check-in
          </button>
          <span className="text-note text-ink-muted">{hint}</span>
        </div>
      </div>

      <Reply draft={draft} saved={saved} />
    </section>
  )
}
