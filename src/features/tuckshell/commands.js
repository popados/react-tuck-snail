import { MOODS, moodById } from '@/lib/moods'
import { daysShownUpThisMonth, todayKey } from '@/stores/useCheckinStore'

// The tuckshell commands. runCommand is pure: it gets the typed text and a context
// of what it may touch, and returns the lines to print (plus what to do next).
// Output follows Tuck's voice: lowercase, short, starting with his face.

export const PAGES = {
  home: '/',
  check: '/calm',
  habits: '/habits',
  games: '/games',
  grounding: '/grounding',
  insights: '/insights',
  profile: '/profile',
}

const HABITS = {
  water: { face: '@_^^', text: 'water logged. small sips count.' },
  walk: { face: '...@_^^', text: 'walk logged. snail pace is a pace.' },
  sleep: { face: '@_--', text: 'noted. the code will still be here tomorrow.' },
  break: { face: '@_uu', text: 'break logged. good call.' },
}

const THEMES = ['auto', 'light', 'dark']

export const HELP = [
  { type: 'dim', text: 'commands:' },
  { type: 'dim', text: '  help              show this list' },
  { type: 'dim', text: '  checkin <mood>    good, okay, tired, low or shell' },
  { type: 'dim', text: "  today             today's check-in and this month" },
  { type: 'dim', text: '  log <habit>       water, walk, sleep or break' },
  { type: 'dim', text: `  open <page>       ${Object.keys(PAGES).join(', ')}` },
  { type: 'dim', text: '  theme <mode>      auto, light or dark' },
  { type: 'dim', text: '  clear             clear the screen' },
  { type: 'dim', text: '# up and down arrows bring back earlier commands' },
]

function checkin(arg, ctx) {
  const mood = moodById(arg)
  if (!mood) {
    return [
      {
        face: 'awake',
        text: `how are you today? checkin ${MOODS.map((m) => m.id).join(', ')}.`,
      },
    ]
  }
  ctx.checkIn(mood.id)
  const lines = [{ face: mood.face, text: mood.reply }]
  if (mood.id === 'low') {
    lines.push({ type: 'dim', text: '# need to talk to someone? call or text 988.' })
  }
  return lines
}

function today(ctx) {
  const mood = moodById(ctx.entries[todayKey()])
  const month = new Date().toLocaleString('en-US', { month: 'long' }).toLowerCase()
  return [
    mood
      ? { face: mood.face, text: `today: ${mood.word ?? mood.id}.` }
      : { face: 'awake', text: "no check-in yet today. that's fine." },
    {
      face: 'progress',
      text: `${daysShownUpThisMonth(ctx.entries)} days you showed up in ${month}.`,
    },
  ]
}

export function runCommand(input, ctx) {
  // People often type the tool's name first; tuckshell checkin tired works too.
  const words = input.trim().toLowerCase().split(/\s+/)
  if (words[0] === 'tuckshell') words.shift()
  const [command = '', arg] = words

  switch (command) {
    case '':
      return { lines: [] }
    case 'help':
      return { lines: HELP }
    case 'checkin':
      return { lines: checkin(arg, ctx) }
    case 'today':
      return { lines: today(ctx) }
    case 'log': {
      const habit = HABITS[arg]
      return {
        lines: [
          habit
            ? { face: habit.face, text: habit.text }
            : { face: 'awake', text: `log what? ${Object.keys(HABITS).join(', ')}.` },
        ],
      }
    }
    case 'open': {
      const path = PAGES[arg]
      if (!path) {
        return {
          lines: [{ face: 'awake', text: `open where? ${Object.keys(PAGES).join(', ')}.` }],
        }
      }
      return { lines: [{ face: 'happy', text: `opening ${arg}.` }], navigate: path }
    }
    case 'theme':
      if (!THEMES.includes(arg)) {
        return { lines: [{ face: 'awake', text: 'theme auto, light or dark?' }] }
      }
      ctx.setTheme(arg)
      return { lines: [{ face: 'resting', text: `theme set to ${arg}.` }] }
    case 'clear':
      return { lines: [], clear: true }
    default:
      return {
        lines: [
          {
            face: '@_o0 ?',
            faceLabel: 'tuck, confused',
            text: `"${command}" isn't a command i know. try help.`,
          },
        ],
      }
  }
}
