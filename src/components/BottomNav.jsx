export default function BottomNav({ active, onChange }) {
  const tabs = [
    { id: 'home',        label: 'Quest',      icon: '⚡' },
    { id: 'leaderboard', label: 'Ranks',      icon: '🏆' },
    { id: 'profile',     label: 'Profile',    icon: '👤' },
    { id: 'settings',    label: 'Settings',   icon: '⚙️' },
  ]

  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex safe-bottom"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        maxWidth: 480,
        margin: '0 auto',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
      }}
    >
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="flex-1 flex flex-col items-center justify-center py-3 gap-0.5"
          style={{ opacity: active === tab.id ? 1 : 0.4 }}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-xs" style={{ color: active === tab.id ? 'var(--accent)' : 'var(--muted)' }}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  )
}
