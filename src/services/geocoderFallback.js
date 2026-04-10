/**
 * services/geocoderFallback.js
 *
 * OPTIONAL external geocoder fallback for city names that cannot be resolved
 * by the local gazetteer.
 *
 * HOW IT WORKS:
 *   1. usePartnerFinder.js calls tryFallbackGeocode(input) only if the
 *      local gazetteer returns no matches.
 *   2. This module checks localStorage for a cached result first.
 *   3. On a cache miss it calls the Nominatim (OpenStreetMap) API.
 *   4. Successful results are stored in localStorage for future sessions.
 *
 * HOW TO ENABLE:
 *   Set the environment variable VITE_ENABLE_GEOCODER_FALLBACK=true
 *   in a .env file in the project root:
 *     VITE_ENABLE_GEOCODER_FALLBACK=true
 *
 *   If the variable is absent or false, tryFallbackGeocode() returns null
 *   immediately and no external request is ever made.
 *
 * NOMINATIM USAGE POLICY:
 *   - Nominatim is a free service. The policy requires a valid User-Agent
 *     and allows a maximum of 1 request per second.
 *   - For production deployments with significant traffic, consider setting
 *     up a self-hosted Nominatim instance or switching to a paid geocoder.
 *   - See: https://operations.osmfoundation.org/policies/nominatim/
 *
 * HOW TO SWAP THE GEOCODER:
 *   Replace the `callNominatim` function body with a call to any other
 *   geocoding API (e.g. Geoapify, OpenCage, Google Maps Geocoding API).
 *   The rest of the module (cache, enable flag, interface) stays the same.
 *   Just ensure the return value is { latitude, longitude, city }.
 *
 * localStorage key format:
 *   lvk_geocache_{normalised-input}
 */

import { normalizeGerman } from '@/utils/normalize.js'

/** Feature flag — read once at module load time */
const FALLBACK_ENABLED =
  import.meta.env.VITE_ENABLE_GEOCODER_FALLBACK === 'true'

/** LocalStorage key prefix */
const CACHE_PREFIX = 'lvk_geocache_'

/** Nominatim endpoint */
const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org/search'

/**
 * tryFallbackGeocode(input)
 *
 * Main public function called by usePartnerFinder.js.
 * Returns a coordinate object or null.
 *
 * @param {string} input – raw user query string (city name or postal code)
 * @returns {Promise<{latitude: number, longitude: number, city: string}|null>}
 */
export async function tryFallbackGeocode(input) {
  // Immediately return null if the fallback is disabled
  if (!FALLBACK_ENABLED) return null

  const cacheKey = CACHE_PREFIX + normalizeGerman(input)

  // --- Check localStorage cache ---
  const cached = readFromCache(cacheKey)
  if (cached) return cached

  // --- Call Nominatim ---
  try {
    const result = await callNominatim(input)
    if (result) {
      writeToCache(cacheKey, result)
    }
    return result
  } catch (err) {
    // Network errors should not crash the search — just return null
    console.warn('[geocoderFallback] Nominatim request failed:', err.message)
    return null
  }
}

/**
 * callNominatim(query)
 *
 * Calls the Nominatim Geocoding API and returns the top result
 * within Germany, or null if nothing is found.
 *
 * To replace with a different geocoder: change this function only.
 * Keep the return signature: { latitude, longitude, city } | null
 *
 * @param {string} query
 * @returns {Promise<{latitude: number, longitude: number, city: string}|null>}
 */
async function callNominatim(query) {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    addressdetails: '1',
    limit: '1',
    countrycodes: 'de'   // restrict to Germany
  })

  const url = `${NOMINATIM_BASE}?${params.toString()}`

  const response = await fetch(url, {
    headers: {
      // Nominatim requires a valid User-Agent identifying your application
      'User-Agent': 'LowVisionKreis/1.0 (https://www.low-vision-kreis.de)'
    }
  })

  if (!response.ok) {
    throw new Error(`Nominatim HTTP ${response.status}`)
  }

  const data = await response.json()
  if (!data || data.length === 0) return null

  const top = data[0]
  const lat = parseFloat(top.lat)
  const lng = parseFloat(top.lon)

  if (isNaN(lat) || isNaN(lng)) return null

  // Extract the city name from the Nominatim address object
  const addr = top.address || {}
  const city =
    addr.city || addr.town || addr.village || addr.county || top.display_name || query

  return { latitude: lat, longitude: lng, city }
}

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

/**
 * readFromCache(key)
 * Reads and JSON-parses a geocode result from localStorage.
 * Returns null on any read/parse error (e.g. storage disabled, malformed JSON).
 * @param {string} key
 * @returns {object|null}
 */
function readFromCache(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/**
 * writeToCache(key, value)
 * Stores a geocode result in localStorage as JSON.
 * Silently ignores write errors (e.g. private browsing with storage disabled).
 * @param {string} key
 * @param {object} value
 */
function writeToCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage quota exceeded or disabled — not critical
  }
}
