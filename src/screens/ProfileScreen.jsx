import { getRank } from '../data/gameState'
import { TIERS } from '../data/quests'

const TIER_COLOR = {
  easy: '#b8ff57', medium: '#ffd557', hard: '#ff8c42', unhinged: '#ff4757',
}

export default function ProfileScreen({ state }) {
  const rank = getRank(state.totalPoints)
  const progressPct = rank.next ? Math.min(100, (state.totalPoints / rank.next) * 100) : 100
  const byTier = { easy: 0, medium: 0, hard: 0, unhinged: 0 }
  state.completedQuests.forEach(q => { if (byTier[q.tier] !== undefined) byTier[q.tier]++ })

  return (
    <div className="flex flex-col min-h-dvh safe-top safe-bottom px-5 pt-5 overflow-y-auto">
      <h2 className="font-display text-4xl mb-1" style={{ color: 'var(--accent)' }}>PROFILE</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>How OutThere are you really?</p>

      {/* Rank card */}
      <div className="rounded-2xl p-5 mb-4 text-center" style={{ background: 'var(--surface)' }}>
        <div className="text-4xl mb-2">{rank.icon}</div>
        <div className="font-display text-5xl mb-1" style={{ color: 'var(--accent)' }}>
          {state.totalPoints.toLocaleString()}
        </div>
        <div className="text-sm mb-3" style={{ color: 'var(--muted)' }}>total points</div>
        <div className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-3"
          style={{ background: 'rgba(184,255,87,0.12)', color: 'var(--accent)' }}>
          {rank.label}
        </div>
        {rank.next && (
          <>
            <div className="h-1 rounded-full mb-1" style={{ background: 'var(--surface2)' }}>
              <div className="h-1 rounded-full" style={{ width: `${progressPct}%`, background: 'var(--accent)' }} />
            </div>
            <div className="text-xs" style={{ color: 'var(--muted)' }}>
              {rank.next - state.totalPoints} pts to next rank
            </div>
          </>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl p-4 text-center" style={{ background: 'var(--surface)' }}>
          <div className="font-display text-4xl">{state.completedQuests.length}</div>
          <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Quests done</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: 'var(--surface)' }}>
          <div className="font-display text-4xl">{byTier.unhinged}</div>
          <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Unhinged 🔴</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: 'var(--surface)' }}>
          <div className="font-display text-4xl">{byTier.hard}</div>
          <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Hard 🟠</div>
        </div>
        <div className="rounded-xl p-4 text-center" style={{ background: 'var(--surface)' }}>
          <div className="font-display text-4xl">{byTier.easy + byTier.medium}</div>
          <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Easy/Medium</div>
        </div>
      </div>

      {/* History */}
      {state.completedQuests.length > 0 && (
        <>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--muted)' }}>Recent quests</p>
          <div className="flex flex-col gap-2 pb-4">
            {state.completedQuests.slice(0, 15).map((q, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--surface)' }}>
                <span>{TIERS[q.tier].emoji}</span>
                <span className="text-sm flex-1 leading-snug" style={{ color: 'var(--muted)' }}>
                  {q.text.slice(0, 50)}{q.text.length > 50 ? '…' : ''}
                </span>
                <span className="text-sm font-medium shrink-0" style={{ color: TIER_COLOR[q.tier] }}>
                  +{q.points}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {state.completedQuests.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
          <div className="text-5xl mb-3">🛋️</div>
          <p style={{ color: 'var(--muted)' }}>No quests completed yet.</p>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Get off the couch.</p>
        </div>
      )}
    </div>
  )
}
