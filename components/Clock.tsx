import { useEffect, useState } from 'react'

export default function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const time = new Intl.DateTimeFormat('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(now)

  const date = new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(now)

  return (
    <div className="glass-card p-6 lg:p-8 rounded-2xl min-w-[400px] group transition-all duration-300">
      <div className="text-6xl lg:text-8xl font-display font-extrabold text-gray-800 tabular-nums tracking-tight glow-brand">
        {time}
      </div>
      <div className="text-xl lg:text-2xl text-gray-500 group-hover:text-brand/80 transition-colors duration-300 mt-2 capitalize">
        {date}
      </div>
    </div>
  )
}
