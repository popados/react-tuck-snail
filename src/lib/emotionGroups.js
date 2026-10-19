// The one set of emotion categories used across the app: what to do with a
// feeling. The Emotional Check sidebar, its quick buttons and the home page
// Expressions section all group by these, in this order.
// ids are the expression ids from the calm home's mood list; color is the dot
// (the rt-* tokens in index.css, with light and dark values).
// more lists extra emotions offered only as quick buttons in Today's check-in,
// after the ids; the sidebar cards and the home page show ids only.
export const EMOTION_GROUPS = [
  {
    label: 'Acknowledge',
    color: 'bg-rt-acknowledge',
    ids: ['shell', 'happy', 'okay'],
    more: ['relieved', 'surprised'],
  },
  {
    label: 'Permit',
    color: 'bg-rt-permit',
    ids: ['tired', 'confused', 'sad'],
    more: ['bored', 'disappointed'],
  },
  {
    label: 'Direct',
    color: 'bg-rt-direct',
    ids: ['calm', 'anxious', 'focused', 'stressed'],
    more: ['determined', 'frustrated', 'overwhelmed'],
  },
  { label: 'Offer', color: 'bg-rt-offer', ids: ['lonely'], more: ['shy'] },
  {
    label: 'Keep',
    color: 'bg-rt-keep',
    ids: ['proud', 'grateful', 'curious'],
    more: ['content', 'excited', 'hopeful', 'playful'],
  },
]
