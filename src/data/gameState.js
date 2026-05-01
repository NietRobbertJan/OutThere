const STORAGE_KEY = 'outthere_save'

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return getInitialState()
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function getInitialState() {
  return {
    totalPoints: 0,
    completedQuests: [],   // array of { questId, tier, points, timestamp }
    currentQuest: null,    // the active quest object
    rerollsUsed: 0,
    lastRerollDate: null,
    username: 'Explorer',
  }
}

export const MAX_REROLLS_PER_DAY = 3

export function canReroll(state) {
  const today = new Date().toDateString()
  if (state.lastRerollDate !== today) return true
  return state.rerollsUsed < MAX_REROLLS_PER_DAY
}

export function useReroll(state) {
  const today = new Date().toDateString()
  const rerollsUsed = state.lastRerollDate === today ? state.rerollsUsed + 1 : 1
  return { ...state, rerollsUsed, lastRerollDate: today }
}

export function completeQuest(state, quest, proof) {
  const entry = {
    questId: quest.id,
    tier: quest.tier,
    points: quest.points,
    text: quest.text,
    timestamp: Date.now(),
    proof,
  }
  return {
    ...state,
    totalPoints: state.totalPoints + quest.points,
    completedQuests: [entry, ...state.completedQuests],
    currentQuest: null,
  }
}

export function getRank(points) {
  if (points < 200)  return { label: 'Couch Dweller',   icon: '🛋️',  next: 200 }
  if (points < 600)  return { label: 'Street Wanderer', icon: '🚶',  next: 600 }
  if (points < 1200) return { label: 'Urban Explorer',  icon: '🗺️',  next: 1200 }
  if (points < 2500) return { label: 'Chaos Agent',     icon: '⚡',  next: 2500 }
  if (points < 5000) return { label: 'Legend',          icon: '🔥',  next: 5000 }
  return { label: 'OutThere God', icon: '👁️', next: null }
}
