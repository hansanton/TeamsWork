import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts'

export default function TrendChart({ items }: { items: any[] }) {
  // bucket tickets by date (createdOn)
  const buckets: Record<string, number> = {}
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    buckets[d.toDateString()] = 0
  }

  items.forEach(t => {
    if (!t.createdOn) return
    const d = new Date(t.createdOn).toDateString()
    if (buckets[d] !== undefined) buckets[d] += 1
  })

  const data = Object.keys(buckets).map(k => ({ date: k.slice(4, 10), count: buckets[k] }))

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A59FFF" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#635BFF" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#635BFF"/>
              <stop offset="50%" stopColor="#8B85FF"/>
              <stop offset="100%" stopColor="#A59FFF"/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.2)"
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}
            tickMargin={10}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.2)"
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}
            tickMargin={10}
          />
          <Tooltip 
            contentStyle={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}
            labelStyle={{ color: 'white' }}
            itemStyle={{ color: '#635BFF' }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="url(#lineGradient)"
            strokeWidth={3}
            dot={false}
            activeDot={{ 
              r: 8, 
              stroke: '#A59FFF', 
              strokeWidth: 2,
              fill: 'rgba(165,159,255,0.2)'
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="none"
            fillOpacity={1}
            fill="url(#colorCount)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
