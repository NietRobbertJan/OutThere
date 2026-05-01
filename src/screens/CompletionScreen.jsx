import { TIERS } from '../data/quests'
import { getRank } from '../data/gameState'

const TIER_COLOR = {
  easy:     '#b8ff57',
  medium:   '#ffd557',
  hard:     '#ff8c42',
  unhinged: '#ff4757',
}

export default function CompletionScreen({ quest, totalPoints, onNext }) {
  const tier = TIERS[quest.tier]
  const color = TIER_COLOR[quest.tier]
  const rank = getRank(totalPoints)

  return (
    <div className="flex flex-col min-h-dvh safe-top safe-bottom items-center justify-center px-6 text-center">
      <div className="slide-up flex flex-col items-center gap-4">
        <div className="text-7xl mb-2">⚡</div>

        <div className="font-display text-6xl" style={{ color }}>
          +{tier.points}
        </div>
        <div className="text-lg font-medium">Quest complete!</div>

        <div
          className="rounded-2xl p-4 w-full text-left mt-2"
          style={{ background: 'var(--surface)', border: `1px solid ${color}30` }}
        >
          <div className="text-xs mb-2" style={{ color: 'var(--muted)' }}>{tier.emoji} {tier.label}</div>
          <p className="text-sm leading-snug">{quest.text}</p>
        </div>

        <div className="mt-2">
          <div className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Total points</div>
          <div className="font-display text-4xl" style={{ color: 'var(--accent)' }}>{totalPoints.toLocaleString()}</div>
          <div className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{rank.icon} {rank.label}</div>
        </div>

        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl font-display text-2xl tracking-wide mt-4"
          style={{ background: 'var(--accent)', color: '#000' }}
        >
          NEXT QUEST
        </button>
      </div>
    </div>
  )
}
