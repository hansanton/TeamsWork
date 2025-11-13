/**
 * Status helper: normalize ticket status values and check if closed/resolved
 */

export const isClosed = (rawStatus: any): boolean => {
  if (!rawStatus) return false
  const s = typeof rawStatus === 'string' ? rawStatus : (rawStatus.name || rawStatus.status || '')
  const v = String(s).trim().toLowerCase()
  // common closed/resolved status values in English and Dutch
  const closedValues = new Set([
    'resolved', 'closed', 'gesloten', 'opgelost', 'afgesloten', 
    'cancelled', 'annulled', 'wacht op klant', 'heropend'
  ])
  return closedValues.has(v)
}

export const isResolved = (rawStatus: any): boolean => {
  if (!rawStatus) return false
  const s = typeof rawStatus === 'string' ? rawStatus : (rawStatus.name || rawStatus.status || '')
  const v = String(s).trim().toLowerCase()
  // strictly resolved statuses (for leaderboard: count resolved, not just closed)
  const resolvedValues = new Set([
    'resolved', 'opgelost', 'gesloten', 'closed', 'afgesloten'
  ])
  return resolvedValues.has(v)
}
