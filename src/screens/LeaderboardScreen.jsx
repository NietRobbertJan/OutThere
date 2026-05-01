import { useState } from 'react'
import { getRank } from '../data/gameState'

const TABS = ['Global', 'Friends', 'Personal']

// Placeholder data
const GLOBAL_PLACEHOLDER = [
  { username: 'chaosking99',   points: 4850, rank: 'Legend' },
  { username: 'wanderlust_be', points: 3200, rank: 'Chaos Agent' },
  { username: 'streetrat',     points: 2900, rank: 'Chaos Agent' },
  { username: 'xplorer_jan',   points: 2100, rank: 'Chaos Agent' },
  { username: 'boldmoves',     points: 1800, rank: 'Urban Explorer' },
  { username: 'daredevil_br',  points: 1500, rank: 'Urban Explorer' },
  { username: 'gooutside_pls', points: 1100, rank: 'Urban Explorer' },
  { username: 'questmaster',   points:  900, rank: 'Street Wanderer' },
  { username: 'randomdude42',  points:  650, rank: 'Street Wanderer' },
  { username: 'newbie_out',    points:  300, rank: 'Street Wanderer' },
]

const FRIENDS_PLACEHOLDER = [
  { username: 'Sander',  points: 1200, rank: 'Urban Explorer' },
  { username: 'Lena',    points:  850, rank: 'Street Wanderer' },
  { username: 'Mathis',  points:  400, rank: 'Street Wanderer' },
]

export default function LeaderboardScreen({ state }) {
  const [activeTab, setActiveTab] = useState('Global')
  const rank = getRank(state.totalPoints)

  const myEntry = { username: state.username || 'You', points: state.totalPoints, rank: rank.label, isMe: true }

  function getList() {
    if (activeTab === 'Global') {
      const list = [...GLOBAL_PLACEHOLDER, myEntry].sort((a, b) => b.points - a.points)
      return list
    }
    if (activeTab === 'Friends') {
      const list = [...FRIENDS_PLACEHOLDER, myEntry].sort((a, b) => b.points - a.points)
      return list
    }
    // Personal best — just show your own history milestones
    return [myEntry]
  }

  const list = getList()
  const myPosition = list.findIndex(e => e.isMe) + 1

  return (
    <div className="flex flex-col min-h-dvh safe-top safe-bottom px-5 pt-5">
      <h2 className="font-display text-4xl mb-1" style={{ color: 'var(--accent)' }}>LEADERBOARD</h2>
      <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
        {activeTab === 'Global' ? '🌍 placeholder data — real backend coming soon' :
         activeTab === 'Friends' ? '👥 placeholder friends — invite system coming soon' :
         '👤 your personal score'}
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: activeTab === t ? 'var(--accent)' : 'var(--surface)',
              color: activeTab === t ? '#000' : 'var(--muted)',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Your position highlight */}
      {activeTab !== 'Personal' && (
        <div className="rounded-xl p-3 mb-4 flex items-center gap-3"
          style={{ background: 'rgba(184,255,87,0.08)', border: '1px solid rgba(184,255,87,0.2)' }}>
          <span className="font-display text-2xl" style={{ color: 'var(--accent)' }}>#{myPosition}</span>
          <div>
            <div className="text-sm font-medium">Your position</div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>{state.totalPoints} pts · {rank.label}</div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-2 overflow-y-auto pb-4">
        {list.map((entry, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{
              background: entry.isMe ? 'rgba(184,255,87,0.08)' : 'var(--surface)',
              border: entry.isMe ? '1px solid rgba(184,255,87,0.3)' : '1px solid transparent',
            }}
          >
            <span
              className="font-display text-xl w-8 text-center shrink-0"
              style={{ color: i === 0 ? '#ffd557' : i === 1 ? '#aaa' : i === 2 ? '#cd7f32' : 'var(--muted)' }}
            >
              {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
            </span>
            <div className="flex-1">
              <div className="text-sm font-medium">{entry.username}{entry.isMe ? ' (you)' : ''}</div>
              <div className="text-xs" style={{ color: 'var(--muted)' }}>{entry.rank}</div>
            </div>
            <div className="font-display text-xl" style={{ color: 'var(--accent)' }}>
              {entry.points.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
