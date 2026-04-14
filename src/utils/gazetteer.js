/**
 * utils/gazetteer.js
 *
 * Loads the local German postal-code / city gazetteer and provides lookup
 * functions for resolving user search input to geographic coordinates.
 *
 * WHY a local gazetteer?
 * The nearest-partner finder must work without any external API dependency.
 * The gazetteer JSON (public/data/de-postal-gazetteer.json) is fetched once
 * at first use and then cached in module memory.
 *
 * Lookup priority:
 *   1. Exact postal-code match (preferred for 5-digit input)
 *   2. Exact city-name match (case-insensitive, trimmed)
 *   3. Normalised city match (umlauts → digraphs, lowercase)
 *   4. Fuse.js fuzzy match (optional — only if Fuse is importable)
 *
 * When multiple gazetteer entries match the same city name (e.g. multiple
 * PLZs for Berlin), we return all matches and let the caller pick the
 * centroid — or, for postal-code searches, we return the single exact match.
 *
 * The optional fallback geocoder (services/geocoderFallback.js) is called
 * by usePartnerFinder.js ONLY if this module returns no results.
 */

import Fuse from 'fuse.js'
import { normalizeGerman, normalizePostalCode } from '@/utils/normalize.js'

/** Path to the JSON file served from /public */
const GAZETTEER_URL = `${import.meta.env.BASE_URL}data/de-postal-gazetteer.json`

// ---------------------------------------------------------------------------
// Module-level cache so the JSON is only fetched once per page session
// ---------------------------------------------------------------------------
let _gazetteerData = null   // raw array of gazetteer entries
let _byPostalCode = null    // Map<string, GazetteerEntry>
let _cityList = null        // flat array of unique city name strings (for Fuse)
let _fuseInstance = null    // Fuse.js instance (created lazily)

/**
 * loadGazetteer()
 *
 * Fetches and caches the gazetteer JSON.
 * Subsequent calls return the cached data immediately.
 *
 * @returns {Promise<object[]>}
 */
export async function loadGazetteer() {
  if (_gazetteerData) return _gazetteerData

  const response = await fetch(GAZETTEER_URL)
  if (!response.ok) {
    throw new Error(
      `Ortsdaten konnten nicht geladen werden (HTTP ${response.status}).`
    )
  }

  _gazetteerData = await response.json()

  // Build a Map indexed by postal code for O(1) exact lookup
  _byPostalCode = new Map()
  for (const entry of _gazetteerData) {
    _byPostalCode.set(entry.postalCode, entry)
  }

  return _gazetteerData
}

/**
 * resolveByPostalCode(postalCode)
 *
 * Looks up a 5-digit German postal code in the local gazetteer.
 * The code is normalised to 5 digits before lookup.
 *
 * @param {string} postalCode
 * @returns {object|null} – single gazetteer entry or null
 */
export async function resolveByPostalCode(postalCode) {
  await loadGazetteer()
  const normalised = normalizePostalCode(postalCode)
  return _byPostalCode.get(normalised) ?? null
}

/**
 * resolveByCity(cityName)
 *
 * Attempts to find one or more gazetteer entries matching the given city name.
 *
 * Resolution order:
 *   1. Exact match on `city` field (trimmed, case-insensitive)
 *   2. Exact match on `normalizedCity` field
 *   3. Exact match on raw input normalised through normalizeGerman()
 *   4. Fuzzy match via Fuse.js (threshold 0.35)
 *
 * Returns an array because a city name may correspond to multiple postal-code
 * areas. The caller should use the first result (or compute a centroid).
 *
 * @param {string} cityName
 * @returns {Promise<object[]>} – array of matching gazetteer entries (may be empty)
 */
export async function resolveByCity(cityName) {
  await loadGazetteer()

  const input = cityName.trim()
  const inputLower = input.toLowerCase()
  const inputNorm = normalizeGerman(input)

  // --- Pass 1: exact match on stored city name (case-insensitive) ---
  const exactMatches = _gazetteerData.filter(
    (e) => e.city.toLowerCase() === inputLower
  )
  if (exactMatches.length > 0) return exactMatches

  // --- Pass 2: match on the normalizedCity field (umlaut-folded, lowercase) ---
  const normMatches = _gazetteerData.filter(
    (e) => e.normalizedCity === inputNorm
  )
  if (normMatches.length > 0) return normMatches

  /*
  // --- Pass 3: partial/alias match — city contains the input or vice-versa ---
  // Handles "Frankfurt" matching "Frankfurt am Main", etc.
  const partialMatches = _gazetteerData.filter(
    (e) =>
      e.city.toLowerCase().includes(inputLower) ||
      e.normalizedCity.includes(inputNorm)
  )
  if (partialMatches.length > 0) return partialMatches

  
  // --- Pass 4: Fuse.js fuzzy match as last resort ---
  const fuzzyResults = fuzzySearchCity(input)
  return fuzzyResults*/

  return []
}

/**
 * fuzzySearchCity(input)
 *
 * Runs a Fuse.js fuzzy search over the unique city names in the gazetteer.
 * Returns the gazetteer entries whose city name best matches the input.
 *
 * Fuse is initialised lazily on first call to avoid startup cost.
 * threshold 0.35 is moderately strict — it catches typos like "Hambrug"
 * but won't return nonsense for completely wrong inputs.
 *
 * @param {string} input
 * @returns {object[]} – matching gazetteer entries
 */
function fuzzySearchCity(input) {
  if (!_gazetteerData) return []

  // Build unique city-name list on first fuzzy call
  if (!_cityList) {
    const seen = new Set()
    _cityList = []
    for (const entry of _gazetteerData) {
      if (!seen.has(entry.city)) {
        seen.add(entry.city)
        _cityList.push({ city: entry.city })
      }
    }
  }

  // Initialise Fuse instance on first use
  if (!_fuseInstance) {
    _fuseInstance = new Fuse(_cityList, {
      keys: ['city'],
      threshold: 0.35,      // lower = stricter
      minMatchCharLength: 3,
      includeScore: true
    })
  }

  const fuseResults = _fuseInstance.search(input)
  if (fuseResults.length === 0) return []

  // Map back to full gazetteer entries for the best-matching city name
  const bestCityName = fuseResults[0].item.city
  return _gazetteerData.filter((e) => e.city === bestCityName)
}

/**
 * centroidOf(entries)
 *
 * Given multiple gazetteer entries for the same city (different PLZ areas),
 * returns the arithmetic mean coordinate. This avoids bias toward the first
 * alphabetical PLZ when a user types a large city like "Berlin".
 *
 * @param {object[]} entries
 * @returns {{ latitude: number, longitude: number, city: string }}
 */
export function centroidOf(entries) {
  if (entries.length === 0) return null
  if (entries.length === 1) return entries[0]

  const lat = entries.reduce((sum, e) => sum + e.latitude, 0) / entries.length
  const lng = entries.reduce((sum, e) => sum + e.longitude, 0) / entries.length

  return {
    ...entries[0],
    latitude: lat,
    longitude: lng
  }
}
