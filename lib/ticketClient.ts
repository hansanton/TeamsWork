import axios from 'axios'

const base = process.env.TICKETING_BASE_URL
const key = process.env.TICKETING_API_KEY

if (!base || !key) {
  // in dev this may happen; callers must handle
}

export async function fetchTickets(params: Record<string, any> = {}) {
  const url = `${base}/tickets`
  const res = await axios.get(url, { params: { ...params, key } })
  return res.data
}
