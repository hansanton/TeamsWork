import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

// Simple in-memory cache to avoid hitting rate limits during polling
const cache: Record<string, { ts: number; data: any }> = {}
const TTL = 20 * 1000 // 20s

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const base = process.env.TICKETING_BASE_URL
    const key = process.env.TICKETING_API_KEY
    if (!base || !key) {
      return res.status(500).json({ error: true, message: 'Missing server env configuration' })
    }

  // Build proxied URL
  const path = req.query.path ? String(req.query.path) : '/tickets'
    // allow forwarding arbitrary query params from client except 'key'
    const clientQuery = { ...req.query }
    delete (clientQuery as any).path
    delete (clientQuery as any).key

  // Ensure we append the path to the base path (avoid leading-slash replacing the base path)
  const baseClean = base.replace(/\/$/, '')
  const pathClean = path.replace(/^\//, '')
  const url = `${baseClean}/${pathClean}`

    // create cache key
    const cacheKey = url + JSON.stringify(clientQuery)
    const now = Date.now()
    if (cache[cacheKey] && now - cache[cacheKey].ts < TTL) {
      return res.status(200).json(cache[cacheKey].data)
    }

    // Forward request to the Ticketing API, add the key as query param
    // Ensure timezone is provided (API requires it)
    const timezone = (clientQuery as any).timezone || process.env.TICKETING_TIMEZONE || '0'
    const params = { ...clientQuery, key, timezone }

    console.log('proxy ->', url, params)

    const apiRes = await axios.get(url, { params })
    cache[cacheKey] = { ts: now, data: apiRes.data }
    return res.status(apiRes.status).json(apiRes.data)
  } catch (err: any) {
    console.error('proxy error', err?.response?.data || err.message)
    const status = err?.response?.status || 500
    const data = err?.response?.data || { error: true, message: err.message }
    return res.status(status).json(data)
  }
}
