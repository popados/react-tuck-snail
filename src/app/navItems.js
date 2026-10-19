// The top navigation, in order. Add a screen here and it shows up in TopNav;
// entries without a page of their own render ComingSoonPage (see router.jsx).
// end: true makes "/" count as current only on the landing page itself.
export const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true, built: true },
  { to: '/calm', label: 'Emotional Check', built: true },
  { to: '/habits', label: 'Habits', built: true },
  { to: '/games', label: 'Games', built: true },
  { to: '/grounding', label: 'Grounding' },
  { to: '/insights', label: 'Insights', built: true },
  { to: '/profile', label: 'Profile' },
]
