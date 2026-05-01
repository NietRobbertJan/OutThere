import { useState } from 'react'

export default function SettingsScreen({ state, onUpdateUsername, onReset }) {
  const [username, setUsername] = useState(state.username || 'Explorer')
  const [saved, setSaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  function handleSaveUsername() {
    onUpdateUsername(username)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleReset() {
    if (!confirmReset) { setConfirmReset(true); return }
    onReset()
    setConfirmReset(false)
  }

  return (
    <div className="flex flex-col min-h-dvh safe-top safe-bottom px-5 pt-5">
      <h2 className="font-display text-4xl mb-1" style={{ color: 'var(--accent)' }}>SETTINGS</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Customise your experience</p>

      {/* Username */}
      <div className="rounded-2xl p-4 mb-4" style={{ background: 'var(--surface)' }}>
        <p className="text-sm font-medium mb-3">Username</p>
        <div className="flex gap-2">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="flex-1 rounded-xl px-3 py-2 text-sm"
            style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
            placeholder="Your name..."
            maxLength={20}
          />
          <button
            onClick={handleSaveUsername}
            className="px-4 py-2 rounded-xl text-sm font-medium"
            style={{ background: saved ? 'var(--accent)' : 'var(--surface2)', color: saved ? '#000' : 'var(--text)' }}
          >
            {saved ? '✓ Saved' : 'Save'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-2xl p-4 mb-4" style={{ background: 'var(--surface)' }}>
        <p className="text-sm font-medium mb-3">About OutThere</p>
        <div className="flex flex-col gap-2 text-sm" style={{ color: 'var(--muted)' }}>
          <div className="flex justify-between">
            <span>Version</span><span>0.1.0 beta</span>
          </div>
          <div className="flex justify-between">
            <span>Daily rerolls</span><span>3 per day</span>
          </div>
          <div className="flex justify-between">
            <span>AI verification</span><span>Coming soon</span>
          </div>
          <div className="flex justify-between">
            <span>Online leaderboard</span><span>Coming soon</span>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', border: '1px solid rgba(255,71,87,0.2)' }}>
        <p className="text-sm font-medium mb-1" style={{ color: '#ff4757' }}>Danger Zone</p>
        <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>This will wipe all your points and quest history.</p>
        <button
          onClick={handleReset}
          className="w-full py-3 rounded-xl text-sm font-medium"
          style={{
            background: confirmReset ? '#ff4757' : 'rgba(255,71,87,0.1)',
            color: confirmReset ? '#fff' : '#ff4757',
          }}
        >
          {confirmReset ? 'Tap again to confirm reset' : 'Reset all progress'}
        </button>
      </div>
    </div>
  )
}
