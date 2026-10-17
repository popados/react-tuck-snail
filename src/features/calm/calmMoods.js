// The calm home's fourteen Tucks, from images/Tuck Calm Home/index.html.
// bucket is which of the five check-in answers (and fixed mood colors) each one
// saves and charts as. scene, when present, is the larger art shown in the reply.
export const CALM_MOODS = {
  happy: {
    name: 'Good',
    face: '@_^^',
    img: 'tuck-happy',
    alt: 'Tuck happy, stalks up, smiling',
    bucket: 'good',
    when: 'a good day, big or small',
    line: 'glad. small wins count.',
  },
  proud: {
    name: 'Proud',
    face: '@_^^ *',
    img: 'tuck-proud',
    alt: 'Tuck proud, stalks tall, eyes smiling, a small spark',
    bucket: 'good',
    when: 'you did a thing, even after a hard week',
    line: 'look at you. that took something.',
    scene: 'tuck-scene-trail',
  },
  grateful: {
    name: 'Grateful',
    face: '@_^^ <3',
    img: 'tuck-grateful',
    alt: 'Tuck grateful, smiling eyes, a small heart',
    bucket: 'good',
    when: 'something or someone helped',
    line: 'thanks for noticing it. that counts.',
  },
  curious: {
    name: 'Curious',
    face: '@_o?',
    img: 'tuck-curious',
    alt: 'Tuck curious, stalks leaning forward, one eye wide',
    bucket: 'okay',
    when: 'something new is on your mind',
    line: 'ooh. tell me more, if you like.',
  },
  okay: {
    name: 'Okay',
    face: '@_oo',
    img: 'tuck-hero',
    alt: 'Tuck the snail, smiling with eye stalks up',
    bucket: 'okay',
    when: 'nothing big either way',
    line: 'okay is a fine place to be.',
  },
  calm: {
    name: 'Calm',
    face: '@_uu',
    img: 'tuck-calm',
    alt: 'Tuck calm, stalks relaxed, eyes softly closed',
    bucket: 'okay',
    when: 'settled, after a breath',
    line: 'nice and still. stay as long as you like.',
    scene: 'tuck-scene-still-water',
  },
  focused: {
    name: 'Focused',
    face: '@_==',
    img: 'tuck-focused',
    alt: 'Tuck focused, stalks straight, eyes half-lidded',
    bucket: 'okay',
    when: 'heads-down, in the work',
    line: "in the zone. i'll keep quiet.",
    scene: 'tuck-scene-lamp',
  },
  tired: {
    name: 'Tired',
    face: '@_--',
    img: 'tuck-sleepy',
    alt: 'Tuck sleepy, stalks loose, eyes closed',
    bucket: 'tired',
    when: 'low battery, sleepy',
    line: 'noted. rest counts too.',
    scene: 'tuck-scene-bedtime',
  },
  anxious: {
    name: 'Anxious',
    face: '@_oo;',
    img: 'tuck-anxious',
    alt: 'Tuck anxious, stalks wobbling, wide eyes, a sweat drop',
    bucket: 'low',
    when: 'worried, on edge',
    line: 'that sounds like a lot. one slow breath with me?',
  },
  stressed: {
    name: 'Stressed',
    face: '@_><',
    img: 'tuck-stressed',
    alt: 'Tuck stressed, wobbly stalks, squeezed eyes',
    bucket: 'low',
    when: 'too much at once',
    line: 'too much at once. pick one small thing, or none.',
  },
  confused: {
    name: 'Confused',
    face: '@_o0 ?',
    img: 'tuck-confused',
    alt: 'Tuck confused, uneven stalks and eyes, wobbly mouth',
    bucket: 'low',
    when: 'foggy, not sure what you feel',
    line: 'not sure is a real answer too.',
  },
  lonely: {
    name: 'Lonely',
    face: '@_..',
    img: 'tuck-lonely',
    alt: 'Tuck lonely, stalks drooping to one side, small eyes',
    bucket: 'low',
    when: 'missing people',
    line: "i'm glad you told me. is there someone you could message?",
  },
  sad: {
    name: 'Low',
    face: '@_;;',
    img: 'tuck-sad',
    alt: 'Tuck sad, stalks drooping, one tear',
    bucket: 'low',
    when: 'heavy, down',
    line: 'thanks for telling me. low days count too. 988 is there any time.',
  },
  shell: {
    name: 'Shell day',
    face: '(@)',
    img: 'tuck-tucked',
    alt: 'Tuck tucked into its shell, resting',
    bucket: 'shell',
    when: 'you need to hide away for a bit',
    line: 'shell day logged. that counts too.',
    scene: 'tuck-scene-shell-day',
  },
}

export const MOOD_GROUPS = [
  { label: 'Bright', color: 'bg-mood-good', ids: ['happy', 'proud', 'grateful', 'curious'] },
  { label: 'Steady', color: 'bg-mood-okay', ids: ['okay', 'calm', 'focused', 'tired'] },
  {
    label: 'Heavy',
    color: 'bg-mood-low',
    ids: ['anxious', 'stressed', 'confused', 'lonely', 'sad', 'shell'],
  },
]

export const USUAL_MOODS = ['okay', 'tired', 'calm', 'sad']

// The Tuck to show for a day saved from the landing page, which only knows the answer.
const BUCKET_TUCK = { good: 'happy', okay: 'okay', tired: 'tired', low: 'sad', shell: 'shell' }

export function tuckForDay(entry, detail) {
  if (!entry) return null
  return CALM_MOODS[detail] ? detail : BUCKET_TUCK[entry]
}

// Bar height (percent) and fill per answer in the week chart; lighter moods stand taller.
export const BUCKET_BAR = {
  good: { height: 'h-full', fill: 'bg-mood-good' },
  okay: { height: 'h-[80%]', fill: 'bg-mood-okay' },
  shell: { height: 'h-[66%]', fill: 'bg-mood-shell' },
  tired: { height: 'h-[56%]', fill: 'bg-mood-tired' },
  low: { height: 'h-[40%]', fill: 'bg-mood-low' },
}

export const HABITS = [
  {
    id: 'water',
    hint: 'a glass or a sip',
    face: '@_o?',
    line: 'water logged. small sips count.',
    scene: 'tuck-scene-water-break',
    alt: 'Tuck looking up at a glass of water',
  },
  {
    id: 'walk',
    hint: 'any pace, any length',
    face: '...@_^^',
    line: 'walk logged. snail pace is a pace.',
    scene: 'tuck-scene-trail',
    alt: 'Tuck in a pink scarf leaning forward',
  },
  {
    id: 'sleep',
    hint: 'screens off by 11',
    face: '@_--',
    line: 'noted. the code will still be here tomorrow.',
    scene: 'tuck-scene-bedtime',
    alt: 'Sleepy Tuck under a moon beside a closed laptop',
  },
  {
    id: 'break',
    hint: 'stretch, look away',
    face: '@_uu',
    line: 'break logged. good call.',
    scene: 'tuck-scene-still-water',
    alt: 'Tuck sitting calmly by still water',
  },
]

export function art(name) {
  return `/mascot/${name}.svg`
}
