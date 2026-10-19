// The five check-in answers, in order, and what each one looks up:
// Tuck's face, the art file, his reply. From "One mood drives face, art and
// color" in the character build doc (docs/) and the Check-in Prototype lines.
// Okay has no art yet, so it uses the hero pose (a prototype decision).
// card is the mood card art, from the design system's mood cards.
export const MOODS = [
  {
    id: 'good',
    face: 'happy',
    art: '/mascot/tuck-happy.svg',
    card: '/mascot/tuck-card-good.svg',
    alt: 'Tuck happy, stalks up, smiling',
    reply: "noted. glad today's a good one.",
  },
  {
    id: 'okay',
    face: 'awake',
    art: '/mascot/tuck-hero.svg',
    card: '/mascot/tuck-card-okay.svg',
    alt: 'Tuck the snail, side view, smiling with eye stalks up',
    reply: 'okay is a fine place to be.',
  },
  {
    id: 'tired',
    face: 'sleepy',
    art: '/mascot/tuck-sleepy.svg',
    card: '/mascot/tuck-card-tired.svg',
    alt: 'Tuck sleepy, stalks loose, eyes closed',
    reply: 'noted. rest counts too.',
  },
  {
    id: 'low',
    face: 'sad',
    art: '/mascot/tuck-sad.svg',
    card: '/mascot/tuck-card-low.svg',
    alt: 'Tuck sad, stalks drooping, one tear',
    reply: 'thanks for telling me. low days count too.',
  },
  {
    id: 'shell',
    word: 'shell day',
    face: 'resting',
    art: '/mascot/tuck-tucked.svg',
    card: '/mascot/tuck-card-shell-day.svg',
    alt: 'Tuck fully retracted into its shell, resting',
    reply: "shell day. see you when you're back.",
    wide: true,
  },
]

export function moodById(id) {
  return MOODS.find((mood) => mood.id === id)
}
