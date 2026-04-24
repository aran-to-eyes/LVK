import { normalizeGerman } from '@/utils/normalize.js'

const CACHE_PREFIX = 'lvk_geocache_'
const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org/search'

export async function geocode(input) {
  const cacheKey = CACHE_PREFIX + normalizeGerman(input)

  const cached = readCache(cacheKey)
  if (cached) return cached

  try {
    const result = await callNominatim(input)
    if (result) writeCache(cacheKey, result)
    return result
  } catch (err) {
    console.warn('[geocode] Nominatim failed:', err.message)
    return null
  }
}

async function callNominatim(query) {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    addressdetails: '1',
    limit: '1',
    countrycodes: 'de'
  })

  const response = await fetch(`${NOMINATIM_BASE}?${params}`, {
    headers: { 'User-Agent': 'LowVisionKreis/1.0 (https://www.low-vision-kreis.de)' }
  })

  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = await response.json()
  if (!data?.length) return null

  const top = data[0]
  const lat = parseFloat(top.lat)
  const lng = parseFloat(top.lon)
  if (isNaN(lat) || isNaN(lng)) return null

  const addr = top.address || {}
  const city = addr.city || addr.town || addr.village || addr.county || top.display_name || query

  return { latitude: lat, longitude: lng, city }
}

function readCache(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function writeCache(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { }
}
