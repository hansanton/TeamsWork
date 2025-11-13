import { isResolved } from '../lib/status'

export default function Leaderboard({ items }: { items: any[] }) {
  // Simple per-assignee count of resolved tickets
  const counts: Record<string, number> = {}
  items.forEach(t => {
    const name = t.assignee?.name || 'Unassigned'
    if (isResolved(t.status)) {
      counts[name] = (counts[name] || 0) + 1
    }
  })
  const rows = Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,6)
  return (
    <div className="relative">
        {rows.length === 0 && (
          <div className="text-gray-600 text-center py-8">Nog geen resultaten</div>
        )}
      <ul className="space-y-4">
        {rows.map(([name, v], idx) => (
          <li 
            key={name} 
            className={`
              relative flex items-center justify-between p-4 rounded-xl
              backdrop-blur-sm transition-all duration-300
              ${idx === 0 
                ? 'bg-accent/20 hover:bg-accent/30' 
                : 'bg-white/5 hover:bg-white/10'
              }
              ${idx === 0 ? 'animate-float' : ''}
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                w-8 h-8 flex items-center justify-center rounded-lg
                font-display font-bold text-lg
                ${idx === 0 
                  ? 'bg-accent text-white' 
                  : 'bg-white/10 text-gray-600'
                }
              `}>
                {idx + 1}
              </div>
              <div>
                <div className="font-medium text-gray-900">{name}</div>
                <div className="text-sm text-gray-600">
                  {v} ticket{v === 1 ? '' : 's'} opgelost
                </div>
              </div>
            </div>
            {idx === 0 && (
              <div className="absolute -top-1 -right-1 px-2 py-1 rounded-full text-xs font-semibold bg-accent text-white shadow-glow animate-pulse">
                🏆 Top performer
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
