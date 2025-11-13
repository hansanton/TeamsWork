type Props = {
  title: string
  value: number
  tone?: 'neutral' | 'accent' | 'success'
  trend?: 'up' | 'down'
  percentChange?: number
  animate?: boolean
  showBadge?: boolean
  target?: number
}

function useAnimatedNumber(value: number) {
  const { useState, useEffect } = require('react')
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const from = display
    const to = value
    const duration = 700
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      const v = Math.round(from + (to - from) * eased)
      setDisplay(v)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return display
}

export default function KpiCard({ title, value, tone = 'neutral', trend, percentChange, animate, showBadge, target }: Props) {
  const baseClass = 'glass-card p-4 lg:p-6 rounded-2xl transition-all duration-500 hover:scale-[1.02]'
  const toneClass = tone === 'success' ? 'hover:shadow-glow-success' : tone === 'accent' ? 'hover:shadow-glow' : ''
  const animated = useAnimatedNumber(value)
  const pct = target ? Math.min(100, Math.round((value / target) * 100)) : 0

  return (
    <div className={`${baseClass} ${toneClass} ${animate ? 'animate-float' : ''}`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-xs lg:text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</div>
        {showBadge && (
          <div className="px-1.5 py-0.5 rounded-full text-xs font-semibold bg-success text-white animate-pulse">🔥</div>
        )}
      </div>

      <div className="flex items-end gap-3">
      <div className={`text-4xl lg:text-6xl font-display font-extrabold ${tone === 'success' ? 'text-success' : tone === 'accent' ? 'text-accent' : 'text-gray-900'}`}>{animated}</div>

        {trend && percentChange !== undefined && (
          <div className={`flex items-center gap-0.5 pb-1 lg:pb-2 ${trend === 'up' ? 'text-success' : 'text-accent'}`}>
            {trend === 'up' ? '↑' : '↓'} <span className="text-xs lg:text-sm font-medium">{percentChange}%</span>
          </div>
        )}
      </div>

      {target && (
        <div className="mt-2 lg:mt-4">
          <div className="w-full bg-white/10 rounded-full h-2 lg:h-3 overflow-hidden">
            <div className="h-2 lg:h-3 rounded-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
          <div className="text-xs text-gray-600 mt-1 lg:mt-2">{value} / {target} ({pct}%)</div>
        </div>
      )}
    </div>
  )
}
