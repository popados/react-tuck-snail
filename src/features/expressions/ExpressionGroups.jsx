import { ExpressionCard } from '@/components/ExpressionCard'
import { EMOTION_GROUPS } from '@/lib/emotionGroups'
import { cx } from '@/lib/faces'

// The home page's expressions, keyed by the same ids as lib/emotionGroups.js, so
// they group into the app's one set of categories. Art is in public/mascot.
const CARDS = {
  happy: { art: 'tuck-happy', name: 'Happy', face: '@_^^', alt: 'Tuck happy, stalks up, smiling' },
  proud: {
    art: 'tuck-proud',
    name: 'Proud',
    face: '@_^^ *',
    alt: 'Tuck proud, stalks tall, eyes smiling, a small spark',
  },
  grateful: {
    art: 'tuck-grateful',
    name: 'Grateful',
    face: '@_^^ <3',
    alt: 'Tuck grateful, smiling eyes, a small heart',
  },
  curious: {
    art: 'tuck-curious',
    name: 'Curious',
    face: '@_o?',
    alt: 'Tuck curious, stalks leaning forward, one eye wide',
  },
  focused: {
    art: 'tuck-focused',
    name: 'Focused',
    face: '@_==',
    alt: 'Tuck focused, stalks straight, eyes half-lidded',
  },
  lonely: {
    art: 'tuck-lonely',
    name: 'Lonely',
    face: '@_..',
    alt: 'Tuck lonely, stalks drooping to one side, small eyes',
  },
  anxious: {
    art: 'tuck-anxious',
    name: 'Anxious',
    face: '@_oo;',
    alt: 'Tuck anxious, stalks wobbling, wide eyes, a sweat drop',
  },
  stressed: {
    art: 'tuck-stressed',
    name: 'Stressed',
    face: '@_><',
    alt: 'Tuck stressed, wobbly stalks, squeezed eyes',
  },
}

// Groups in the app's order, keeping only the expressions shown here; a group
// with none of them (Permit, for now) is left out.
const GROUPS = EMOTION_GROUPS.map((group) => ({
  ...group,
  cards: group.ids.filter((id) => CARDS[id]).map((id) => CARDS[id]),
})).filter((group) => group.cards.length > 0)

// One row per group: the title (with its color dot) on top, its cards side by
// side below. auto-fill keeps every card the same width across rows.
export function ExpressionGroups() {
  return (
    <div className="flex flex-col gap-24">
      {GROUPS.map((group) => (
        <section
          key={group.label}
          aria-labelledby={`feel-${group.label}`}
          className="flex flex-col gap-8"
        >
          <h3 id={`feel-${group.label}`} className="m-0 flex items-center gap-8 text-label">
            <i aria-hidden="true" className={cx('size-12 rounded-full', group.color)} />
            {group.label}
          </h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-20 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {group.cards.map((card) => (
              <ExpressionCard
                key={card.art}
                mood={card.face}
                name={card.name}
                art={<img src={`/mascot/${card.art}.svg`} alt={card.alt} />}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
