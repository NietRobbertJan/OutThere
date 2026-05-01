import { useState } from 'react'
import { loadState, saveState, completeQuest, useReroll, canReroll } from './data/gameState'
import { getRandomQuest, getHarderQuest, TIERS } from './data/quests'
import HomeScreen from './screens/HomeScreen'
import CompletionScreen from './screens/CompletionScreen'
import ProfileScreen from './screens/ProfileScreen'
import LeaderboardScreen from './screens/LeaderboardScreen'
import SettingsScreen from './screens/SettingsScreen'
import BottomNav from './components/BottomNav'

export default function App() {
  const [state, setState] = useState(() => {
    const s = loadState()
    if (!s.currentQuest) {
      s.currentQuest = getRandomQuest()
    }
    return s
  })
  const [tab, setTab] = useState('home')
  const [completedQuest, setCompletedQuest] = useState(null)

  function handleReroll() {
    if (!canReroll(state)) return
    const newState = useReroll({ ...state, currentQuest: getRandomQuest(state.currentQuest?.id) })
    setState(newState)
    saveState(newState)
  }

  function handleGoHarder() {
    const harder = getHarderQuest(state.currentQuest.tier)
    if (!harder) return
    const newState = { ...state, currentQuest: harder }
    setState(newState)
    saveState(newState)
  }

  function handleSubmitProof(proof) {
    const quest = { ...state.currentQuest, points: TIERS[state.currentQuest.tier].points }
    const newState = completeQuest(state, quest, proof)
    setState(newState)
    saveState(newState)
    setCompletedQuest(quest)
  }

  function handleNextQuest() {
    const newState = { ...state, currentQuest: getRandomQuest() }
    setState(newState)
    saveState(newState)
    setCompletedQuest(null)
    setTab('home')
  }

  function handleUpdateUsername(name) {
    const newState = { ...state, username: name }
    setState(newState)
    saveState(newState)
  }

  function handleResetProgress() {
    const fresh = { ...loadState(), currentQuest: getRandomQuest(), totalPoints: 0, completedQuests: [] }
    setState(fresh)
    saveState(fresh)
  }

  if (completedQuest) {
    return (
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <CompletionScreen
          quest={completedQuest}
          totalPoints={state.totalPoints}
          onNext={handleNextQuest}
        />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
      <div style={{ paddingBottom: 72 }}>
        {tab === 'home'        && <HomeScreen state={state} onReroll={handleReroll} onGoHarder={handleGoHarder} onSubmitProof={handleSubmitProof} />}
        {tab === 'profile'     && <ProfileScreen state={state} />}
        {tab === 'leaderboard' && <LeaderboardScreen state={state} />}
        {tab === 'settings'    && <SettingsScreen state={state} onUpdateUsername={handleUpdateUsername} onReset={handleResetProgress} />}
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  )
}
