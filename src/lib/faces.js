// Tuck's ASCII text forms: the logo in text. Use them exactly; never edit a form.
// See "The text forms" in docs/tuck-design-system.md.
export const FACES = {
  map: '@',
  awake: '@_oo',
  happy: '@_^^',
  sleepy: '@_--',
  sad: '@_;;',
  surprised: '@_OO',
  stressed: '@_><',
  shy: '@_',
  resting: '(@)',
  progress: '...@_^^',
}

// What a screen reader says for each face, so "@_^^" is never spelled out.
const SAY = {
  '@': 'tuck',
  '@_oo': 'tuck, awake',
  '@_^^': 'tuck, happy',
  '@_--': 'tuck, sleepy',
  '@_;;': 'tuck, sad',
  '@_OO': 'tuck, surprised',
  '@_><': 'tuck, stressed',
  '@_': 'tuck, shy',
  '(@)': 'tuck, resting',
  '...@_^^': 'tuck, making progress',
}

// A mood name or a raw face in, the face to print out.
export function faceFor(mood) {
  return FACES[mood] ?? mood
}

// A mood name or a raw face in, the words to read aloud out.
export function sayFace(mood) {
  const face = faceFor(mood)
  return SAY[face] ?? `tuck, ${face}`
}

// Tailwind's cn-style join: drops falsy entries.
export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}
