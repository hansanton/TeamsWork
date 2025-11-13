import useSWR from 'swr'
import axios from 'axios'
import KpiCard from '../components/KpiCard'
import TrendChart from '../components/TrendChart'
import Leaderboard from '../components/Leaderboard'
import Hero from '../components/Hero'
import Clock from '../components/Clock'
import { isClosed } from '../lib/status'
import { useMemo } from 'react'

const fetcher = (url: string) => axios.get(url).then(r => r.data)

export default function Dashboard() {
  const { data, error } = useSWR('/api/tickets?path=/tickets&limit=500&select=id,ticketId,status,createdOn,firstResolutionOn,lastUpdatedOn,assignee,priority', fetcher, { refreshInterval: 60000 })

  const stats = useMemo(() => {
    const items = data?.items || []

    const open = items.filter((t: any) => !isClosed(t.status)).length
    const resolvedToday = items.filter((t: any) => {
      if (!t.firstResolutionOn) return false
      const d = new Date(t.firstResolutionOn)
      const today = new Date()
      return d.toDateString() === today.toDateString()
    }).length
    
    const previousDayResolved = items.filter((t: any) => {
      if (!t.firstResolutionOn) return false
      const d = new Date(t.firstResolutionOn)
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return d.toDateString() === yesterday.toDateString()
    }).length

  const trend = (resolvedToday > previousDayResolved ? 'up' : 'down') as 'up'|'down'
    const percentChange = previousDayResolved ? Math.round((resolvedToday - previousDayResolved) / previousDayResolved * 100) : 0
    
    const newToday = items.filter((t: any) => {
      const d = new Date(t.createdOn)
      const today = new Date()
      return d.toDateString() === today.toDateString()
    }).length
    
    return { 
      open, 
      resolvedToday, 
      newToday, 
      trend,
      percentChange: Math.abs(percentChange),
      total: items.length 
    }
  }, [data])

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8 rounded-2xl animate-pulse">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Oeps! Er ging iets mis.</h2>
        <p className="text-gray-600">We proberen het zo weer.</p>
      </div>
    </div>
  )

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8 rounded-2xl animate-pulse">
        <div className="h-8 w-64 bg-white/20 rounded-lg mb-4"></div>
        <div className="h-4 w-48 bg-white/20 rounded-lg"></div>
      </div>
    </div>
  )

  return (
    <div className="h-screen flex flex-col overflow-hidden font-sans select-none">
      {/* Fixed header - compact */}
      <header className="flex-none py-2 px-4 lg:py-3 lg:px-6">
        <div className="max-w-[2000px] mx-auto">
          <div className="flex items-start justify-between gap-4 lg:gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 lg:gap-4 flex-wrap">
                <h1 className="text-2xl lg:text-4xl font-display font-extrabold text-gray-900 tracking-tight glow-brand">Solid Systems — Customer Service</h1>
                <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-success animate-pulse-slow" aria-hidden/>
              </div>
            </div>
            <Clock />
          </div>

          {/* Hero below header - compact */}
          <div className="mt-2 lg:mt-3">
            <Hero 
              openCount={stats.open} 
              deltaText={`${stats.resolvedToday} resolved today — ${stats.percentChange}% ${stats.trend === 'up' ? 'improvement' : 'vs yesterday'}`} 
              subtitle={`Total tickets: ${stats.total}`}
              className="max-w-[600px]"
            />
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto py-3 px-4 lg:py-4 lg:px-6">
        <div className="max-w-[2000px] mx-auto space-y-3 lg:space-y-4">

          {/* KPI Cards */}
          <section className="kpi-grid">
            <KpiCard 
              title="Open tickets" 
              value={stats.open} 
              trend={stats.trend}
              percentChange={stats.percentChange}
              tone="neutral" 
            />
            <KpiCard 
              title="Nieuwe vandaag" 
              value={stats.newToday} 
              tone="accent"
              animate={true}
            />
            <KpiCard 
              title="Opgelost vandaag" 
              value={stats.resolvedToday} 
              tone="success"
              showBadge={stats.resolvedToday > 10}
            />
          </section>

          {/* Charts & Leaderboard */}
          <section className="chart-grid">
            <div className="lg:col-span-2 glass-card p-4 lg:p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-2 lg:mb-4">
                <h2 className="text-lg lg:text-xl font-display font-bold text-gray-800">Tickets trend</h2>
                <div className="flex gap-2">
                  <span className="px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-white/10">7 dagen</span>
                </div>
              </div>
              <div className="h-[250px] lg:h-[300px]">
                <TrendChart items={data.items || []} />
              </div>
            </div>

            <div className="glass-card p-4 lg:p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-2 lg:mb-4">
                <h2 className="text-lg lg:text-xl font-display font-bold text-gray-800">Leaderboard</h2>
                <div className="px-2 py-1 rounded-full text-xs lg:text-sm font-medium bg-accent text-white">
                  TOP {Math.min(5, stats.resolvedToday)}
                </div>
              </div>
              <Leaderboard items={data.items || []} />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
