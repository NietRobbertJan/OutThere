export const TIERS = {
  easy:     { label: 'Easy',     points: 50,  emoji: '🟢', color: '#b8ff57' },
  medium:   { label: 'Medium',   points: 100, emoji: '🟡', color: '#ffd557' },
  hard:     { label: 'Hard',     points: 200, emoji: '🟠', color: '#ff8c42' },
  unhinged: { label: 'Unhinged', points: 400, emoji: '🔴', color: '#ff4757' },
}

export const QUESTS = [
  // Easy
  { id: 'e1', tier: 'easy', text: 'Take a photo of the oldest looking building you can find within 5 minutes of where you are.', proofHint: 'Photo of the building' },
  { id: 'e2', tier: 'easy', text: 'Find something red outside that isn\'t a car or a sign. Photograph it.', proofHint: 'Photo of the red thing' },
  { id: 'e3', tier: 'easy', text: 'Walk to the nearest body of water and take a photo.', proofHint: 'Photo of the water' },
  { id: 'e4', tier: 'easy', text: 'Find a tree that looks interesting and take a photo of it.', proofHint: 'Photo of the tree' },
  { id: 'e5', tier: 'easy', text: 'Take a photo of something that makes you smile.', proofHint: 'The photo itself' },
  { id: 'e6', tier: 'easy', text: 'Find the highest point near you and photograph the view.', proofHint: 'Photo from the top' },
  { id: 'e7', tier: 'easy', text: 'Find an animal outside and get as close as possible before it runs away.', proofHint: 'Photo of the animal' },
  { id: 'e8', tier: 'easy', text: 'Buy something from a shop you\'ve never bought from before.', proofHint: 'Photo of what you bought' },

  // Medium
  { id: 'm1', tier: 'medium', text: 'Wave at a stranger and see if they wave back. Report the result.', proofHint: 'Selfie outside after doing it' },
  { id: 'm2', tier: 'medium', text: 'Find something floating in a body of water and photograph it.', proofHint: 'Photo of the floating object' },
  { id: 'm3', tier: 'medium', text: 'Eat something outside, on the ground, picnic style. Alone.', proofHint: 'Photo of your outdoor setup' },
  { id: 'm4', tier: 'medium', text: 'Ask a stranger what their favourite place in this town is.', proofHint: 'Selfie after doing it' },
  { id: 'm5', tier: 'medium', text: 'Find a spot you\'ve never stood in before and stand in it.', proofHint: 'Selfie at the new spot' },
  { id: 'm6', tier: 'medium', text: 'Order something from a menu without looking at what it is.', proofHint: 'Photo of what arrived' },
  { id: 'm7', tier: 'medium', text: 'Find something on the ground that tells a story. Photograph it.', proofHint: 'Close-up photo of the object' },

  // Hard
  { id: 'h1', tier: 'hard', text: 'Talk to the first stranger you see and keep the conversation going for at least 1 minute.', proofHint: 'Selfie after the conversation' },
  { id: 'h2', tier: 'hard', text: 'Give a genuine compliment to a complete stranger.', proofHint: 'Selfie after doing it' },
  { id: 'h3', tier: 'hard', text: 'Introduce yourself to a neighbour you\'ve never spoken to.', proofHint: 'Photo of their front door' },
  { id: 'h4', tier: 'hard', text: 'Say "you look like you\'re having a great day" to the next person you see.', proofHint: 'Selfie outside after doing it' },
  { id: 'h5', tier: 'hard', text: 'Stay completely still and silent for 3 full minutes somewhere busy outside.', proofHint: 'Photo of where you did it' },
  { id: 'h6', tier: 'hard', text: 'Eat something you\'ve always said you don\'t like.', proofHint: 'Photo of the food + your face' },

  // Unhinged
  { id: 'u1', tier: 'unhinged', text: 'Do something in public that makes at least 3 people look at you. Nothing illegal.', proofHint: 'Photo or video of the reaction' },
  { id: 'u2', tier: 'unhinged', text: 'Leave something unexpected behind somewhere public for a stranger to find.', proofHint: 'Photo of what you left and where' },
  { id: 'u3', tier: 'unhinged', text: 'Walk into a random shop, ask the employee for their best recommendation, buy it no questions asked.', proofHint: 'Photo of what you bought' },
  { id: 'u4', tier: 'unhinged', text: 'Ask a stranger to tell you something they\'ve never told anyone before.', proofHint: 'Selfie after the interaction' },
]

export const TIER_ORDER = ['easy', 'medium', 'hard', 'unhinged']

export function getRandomQuest(excludeId = null, tier = null) {
  let pool = QUESTS.filter(q => q.id !== excludeId)
  if (tier) pool = pool.filter(q => q.tier === tier)
  if (pool.length === 0) pool = QUESTS
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getHarderQuest(currentTier) {
  const idx = TIER_ORDER.indexOf(currentTier)
  if (idx >= TIER_ORDER.length - 1) return null
  const nextTier = TIER_ORDER[idx + 1]
  const pool = QUESTS.filter(q => q.tier === nextTier)
  return pool[Math.floor(Math.random() * pool.length)]
}
