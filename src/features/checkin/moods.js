// The five check-in answers, in order, and what each one looks up:
// Tuck's face, the art file, his reply. From "One mood drives face, art and
// color" in the character build doc (docs/) and the Check-in Prototype lines.
// Okay has no art yet, so it uses the hero pose (a prototype decision).
export const MOODS = [
  {
    id: 'good',
    face: 'happy',
    art: '/mascot/tuck-happy.svg',
    alt: 'Tuck happy, stalks up, smiling',
    reply: "noted. glad today's a good one.",
  },
  {
    id: 'okay',
    face: 'awake',
    art: '/mascot/tuck-hero.svg',
    alt: 'Tuck the snail, side view, smiling with eye stalks up',
    reply: 'okay is a fine place to be.',
  },
  {
    id: 'tired',
    face: 'sleepy',
    art: '/mascot/tuck-sleepy.svg',
    alt: 'Tuck sleepy, stalks loose, eyes closed',
    reply: 'noted. rest counts too.',
  },
  {
    id: 'low',
    face: 'sad',
    art: '/mascot/tuck-sad.svg',
    alt: 'Tuck sad, stalks drooping, one tear',
    reply: 'thanks for telling me. low days count too.',
  },
  {
    id: 'shell',
    word: 'shell day',
    face: 'resting',
    art: '/mascot/tuck-tucked.svg',
    alt: 'Tuck fully retracted into its shell, resting',
    reply: "shell day. see you when you're back.",
    wide: true,
  },
]

export function moodById(id) {
  return MOODS.find((mood) => mood.id === id)
}
