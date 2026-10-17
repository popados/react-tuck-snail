// The top navigation, in order. Add a screen here and it shows up in TopNav;
// entries without a page of their own render ComingSoonPage (see router.jsx).
export const NAV_ITEMS = [
  { to: '/', label: 'Landing (News)', end: true, built: true },
  { to: '/calm', label: 'Home', built: true },
  { to: '/habits', label: 'Habits' },
  { to: '/grounding', label: 'Grounding' },
  { to: '/emotional-check', label: 'Emotional Check' },
  { to: '/insights', label: 'Insights' },
  { to: '/profile', label: 'Profile' },
]
