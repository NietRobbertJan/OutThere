import { useState } from 'react'
import { TIERS } from '../data/quests'
import { canReroll, MAX_REROLLS_PER_DAY } from '../data/gameState'
import { getRank } from '../data/gameState'

const TIER_COLOR = {
  easy:     '#b8ff57',
  medium:   '#ffd557',
  hard:     '#ff8c42',
  unhinged: '#ff4757',
}

export default function HomeScreen({ state, onReroll, onGoHarder, onSubmitProof }) {
  const [showProof, setShowProof] = useState(false)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [proofNote, setProofNote] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const quest = state.currentQuest
  const tier = quest ? TIERS[quest.tier] : null
  const color = quest ? TIER_COLOR[quest.tier] : '#b8ff57'
  const rank = getRank(state.totalPoints)
  const rerollsLeft = MAX_REROLLS_PER_DAY - (state.lastRerollDate === new Date().toDateString() ? state.rerollsUsed : 0)
  const canGoHarder = quest?.tier !== 'unhinged'

  function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    setPhotoFile(file)
    const reader = new FileReader()
    reader.onload = ev => setPhotoPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  async function handleSubmit() {
    if (!photoFile) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    onSubmitProof({ note: proofNote, hasPhoto: true })
    setSubmitting(false)
    setShowProof(false)
    setPhotoFile(null)
    setPhotoPreview(null)
    setProofNote('')
  }

  return (
    <div className="flex flex-col min-h-dvh safe-top safe-bottom px-5 pt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl tracking-wider" style={{ color: 'var(--accent)' }}>OUTTHERE</h1>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>{rank.icon} {rank.label} · {state.totalPoints} pts</p>
        </div>
        <div
          className="px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: color + '20', color }}
        >
          {tier?.emoji} {tier?.label} · +{tier?.points}pts
        </div>
      </div>

      {/* Quest card */}
      {quest && (
        <div
          className="rounded-3xl p-6 mb-4 flex-1 flex flex-col justify-between"
          style={{ background: 'var(--surface)', border: `1px solid ${color}30`, minHeight: 260 }}
        >
          <div>
            <p className="text-2xl font-medium leading-snug mb-6">{quest.text}</p>
            <div
              className="text-xs px-3 py-2 rounded-xl inline-block"
              style={{ background: 'var(--surface2)', color: 'var(--muted)' }}
            >
              📸 {quest.proofHint}
            </div>
          </div>

          {/* Action buttons */}
          {!showProof ? (
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => setShowProof(true)}
                className="w-full py-4 rounded-2xl font-display text-2xl tracking-wide pulse-glow"
                style={{ background: color, color: '#000' }}
              >
                I DID IT
              </button>
              <div className="flex gap-2">
                <button
                  onClick={onReroll}
                  disabled={rerollsLeft <= 0}
                  className="flex-1 py-3 rounded-xl text-sm font-medium"
                  style={{
                    background: 'var(--surface2)',
                    color: rerollsLeft > 0 ? 'var(--text)' : 'var(--muted)',
                  }}
                >
                  🎲 Reroll ({rerollsLeft} left)
                </button>
                {canGoHarder && (
                  <button
                    onClick={onGoHarder}
                    className="flex-1 py-3 rounded-xl text-sm font-medium"
                    style={{ background: 'var(--surface2)', color: '#ff8c42' }}
                  >
                    🔥 Go harder
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-6">
              <label className="block cursor-pointer">
                <div
                  className="w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-5"
                  style={{ borderColor: photoPreview ? color : 'var(--border)', background: 'var(--surface2)' }}
                >
                  {photoPreview
                    ? <img src={photoPreview} alt="proof" className="w-full max-h-44 object-cover rounded-xl" />
                    : <><span className="text-3xl mb-1">📷</span><span className="text-sm" style={{ color: 'var(--muted)' }}>Tap to add photo proof</span></>
                  }
                </div>
                <input type="file" accept="image/*" capture="environment" onChange={handlePhoto} className="hidden" />
              </label>
              <textarea
                value={proofNote}
                onChange={e => setProofNote(e.target.value)}
                placeholder="Add a note (optional)..."
                rows={2}
                className="w-full rounded-xl p-3 text-sm resize-none"
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowProof(false); setPhotoFile(null); setPhotoPreview(null) }}
                  className="flex-1 py-3 rounded-xl text-sm"
                  style={{ background: 'var(--surface2)', color: 'var(--muted)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!photoFile || submitting}
                  className="flex-1 py-3 rounded-xl font-medium text-sm"
                  style={{ background: photoFile ? color : 'var(--surface2)', color: photoFile ? '#000' : 'var(--muted)' }}
                >
                  {submitting ? 'Verifying...' : 'Submit proof'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
